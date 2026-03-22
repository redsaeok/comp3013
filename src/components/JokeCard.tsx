import { joke } from "#/db/schema";
import { authClient } from "#/lib/auth-client";
import { type InferSelectModel } from "drizzle-orm";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { deleteJoke, likeJoke, dislikeJoke } from "#/services/jokes";

type TJoke = InferSelectModel<typeof joke>;

type TJokeCardProps = {
    jokeCardProp: TJoke;
    isTopJoke: boolean;
}

export default function JokeCard( { jokeCardProp, isTopJoke }: TJokeCardProps) {
    const [action, setAction] = useState("");
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();
    
    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();        

        const formData = new FormData(event.currentTarget);

        if (formData.get("action") === "like") {
            const val = await likeJoke({data: formData});
            console.log(val);
        } else if (formData.get("action") === "dislike") {
            const val = await dislikeJoke({data: formData});
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