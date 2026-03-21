import { db } from "#/db";
import { joke } from "#/db/schema";
import { auth } from "#/lib/auth";
import { authClient } from "#/lib/auth-client";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql, type InferSelectModel } from "drizzle-orm";
import { useNavigate } from "node_modules/@tanstack/react-router";
import { getRequestHeaders } from "node_modules/@tanstack/start-server-core/dist/esm/request-response";
import { useState } from "react";

type TJoke = InferSelectModel<typeof joke>;

type TJokeCardProps = {
    jokeCardProp: TJoke;
    isTopJoke: boolean;
}

const deleteJoke = createServerFn( {method: "POST"} )
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
        throw new Error("Expected FormData");
    }

    if (!data.get("jokeId")) {
        throw new Error("Joke ID is required");
    }

    return {
        jokeId: data.get("jokeId")?.toString() || "",
    }
  })
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({
        headers: getRequestHeaders(),        
    })

    if( !session?.user?.id) {
        throw new Error("Unauthorized");
    }

    console.log("Received data for delete: ", data);

    const jokeId = data.jokeId;
    
    try {
        await db
            .delete(joke)
            .where(sql`${joke.id} = ${Number(jokeId)} and ${joke.userId} = ${session.user.id}`);

    } catch (error) {
        console.error("Error deleting joke: ", error);
        return { success: false, error: "Failed to delete joke" };
    }
    
    return { success: true };

  });

const addLike = createServerFn( {method: "POST"} )
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
        throw new Error("Expected FormData");
    }

    if (!data.get("jokeId")) {
        throw new Error("Joke ID is required");
    }

    // We should validate jokeId is a number
    // We should validate jokeId is in the database

    return {
        jokeId: data.get("jokeId")?.toString() || "",
    }
  })
  .handler(async ({ data }) => {
    console.log("Received data for like: ", data);

    const jokeId = data.jokeId;
    
    try {
        await db
            .update(joke)
            .set({ 
                likeCount: sql`${joke.likeCount} + 1`,
                updatedAt: new Date(),
            })
            .where(eq(joke.id, Number(jokeId)));

    } catch (error) {
        console.error("Error updating like count: ", error);
        return { success: false, error: "Failed to update like count" };
    }
    
    return { success: true };

  });


const removeLike = createServerFn( {method: "POST"} )
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
        throw new Error("Expected FormData");
    }

    if (!data.get("jokeId")) {
        throw new Error("Joke ID is required");
    }

    // We should validate jokeId is a number
    // We should validate jokeId is in the database

    return {
        jokeId: data.get("jokeId")?.toString() || "",
    }
  })
  .handler(async ({ data }) => {
    console.log("Received data for like: ", data);

    const jokeId = data.jokeId;
    
    try {
        await db
            .update(joke)
            .set({ likeCount: sql`${joke.likeCount} - 1`, updatedAt: new Date() }) 
            .where(eq(joke.id, Number(jokeId)));

    } catch (error) {
        console.error("Error updating like count: ", error);
        return { success: false, error: "Failed to update like count" };
    }
    
    return { success: true };

  });  

export default function JokeCard( { jokeCardProp, isTopJoke }: TJokeCardProps) {
    const [action, setAction] = useState("");
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();        

        const formData = new FormData(event.currentTarget);

        if (formData.get("action") === "like") {
            const val = await addLike({data: formData});
            console.log(val);
        } else if (formData.get("action") === "dislike") {
            const val = await removeLike({data: formData});
            console.log(val);
        } else if (formData.get("action") === "delete") {
            const val = await deleteJoke({data: formData});
            console.log(val);
        }
        

        navigate({ to: "/" });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="jokeId" value={jokeCardProp.id} />
            <input type="hidden" name="action" value={action} />  
            <div className="grid gap4 grid-cols-[min-content_auto] shadow-lg inset-shadow-sm rounded-2xl p-6  mx-auto mt-2">
                <span></span>
                <h3 className="font-bold ml-5">{jokeCardProp.setup}</h3>
                <div className="rounded-md flex flex-col justify-evenly px-1 border border-gray-100 inset-shadow-xs shadow-sm">
                    <input onClick={() => setAction("like")} type="submit" className="text-center my-1" value="👍" />
                    <span className="text-center">{jokeCardProp.likeCount}</span>
                    <input onClick={() => setAction("dislike")} type="submit" className="text-center my-1" value="👎" />
                </div>
                <div className="flex flex-col gap-2 mt-2 ml-5 justify-evenly items-start">                    
                    <p>{jokeCardProp.punchline}</p>

                    <div className="flex flex-row gap-2">
                    {                        
                        isTopJoke && (
                            <span className="text-left shadow-sm rounded-xl text-xs p-0.5 px-2 bg-orange-100">★ TOP JOKE</span>
                        )
                    }        

                    {                        
                        session?.user?.id === jokeCardProp.userId && (
                            <input onClick={() => setAction("delete")} type="submit" className="text-left shadow-sm rounded-xl text-xs p-0.5 px-2 bg-red-200" value="🗑️ Delete"/>
                        )
                    }        
                    </div>                                  
                </div>                
            </div>

        </form>
    )
}