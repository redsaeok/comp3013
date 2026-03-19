import { db } from "#/db";
import { joke } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { eq, sql, type InferSelectModel } from "drizzle-orm";
import { useNavigate } from "node_modules/@tanstack/react-router/dist/esm/useNavigate";
import { useState } from "react";

type TJoke = InferSelectModel<typeof joke>;

type TJokeCardProps = {
    jokeCardProp: TJoke;
}

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
            .set({ likeCount: sql`${joke.likeCount} + 1` })
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
            .set({ likeCount: sql`${joke.likeCount} - 1` })
            .where(eq(joke.id, Number(jokeId)));

    } catch (error) {
        console.error("Error updating like count: ", error);
        return { success: false, error: "Failed to update like count" };
    }
    
    return { success: true };

  });  

export default function JokeCard( { jokeCardProp }: TJokeCardProps) {
    const [action, setAction] = useState("");
    const navigate = useNavigate();
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();        

        const formData = new FormData(event.currentTarget);

        if (formData.get("action") === "like") {
            const val = await addLike({data: formData});
            console.log(val);
        } else if (formData.get("action") === "dislike") {
            const val = await removeLike({data: formData});
            console.log(val);
        }

        navigate({ to: "/" });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="jokeId" value={jokeCardProp.id} />
            <input type="hidden" name="action" value={action} />        
            <div className="flex flex-row shadow-md rounded-md p-6 w-sm max-w-sm xl:w-xl xl:max-w-xl mx-auto mt-5">
                <div className="flex flex-row rounded-sm shadow-sm">
                    <div className="rounded-md flex flex-col justify-evenly px-1">
                        <input onClick={() => setAction("like")} type="submit" className="text-center" value="👍" />
                        <span className="text-center">{jokeCardProp.likeCount}</span>
                        <input onClick={() => setAction("dislike")} type="submit" className="text-center" value="👎" />
                    </div>

                </div>
                <div className="flex flex-col gap-2 mt-2 ml-5">
                    <h3 className="font-bold">{jokeCardProp.setup}</h3>
                    <p>{jokeCardProp.punchline}</p>        
                    <span>🗑️ Delete</span>                
                </div>
            </div>
        </form>
    )
}