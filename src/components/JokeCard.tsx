import { joke } from "#/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type TJoke = InferSelectModel<typeof joke>;

type TJokeCardProps = {
    jokeCardProp: TJoke;
}

export default function JokeCard( { jokeCardProp }: TJokeCardProps) {
    return (
        <div className="flex flex-row shadow-md rounded-md p-6 w-sm max-w-sm xl:w-xl xl: max-w-xl mx-auto mt-5">
            <div className="flex flex-row rounded-sm shadow-sm">
                <div className="rounded-md flex flex-col justify-evenly px-1">
                    <span className="text-center">👍</span>
                    <span className="text-center">{jokeCardProp.likeCount}</span>
                    <span className="text-center">👎</span>
                </div>

            </div>
            <div className="flex flex-col gap-2 mt-2 ml-5">
                <h3 className="font-bold">{jokeCardProp.setup}</h3>
                <p>{jokeCardProp.punchline}</p>        
                <span>🗑️ Delete</span>                
            </div>
        </div>
    )
}