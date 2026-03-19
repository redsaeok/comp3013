import { joke } from "#/db/schema";
import type { InferSelectModel } from "drizzle-orm";

type TJoke = InferSelectModel<typeof joke>;

type TJokeCardProps = {
    jokeCardProp: TJoke;
}

export default function JokeCard( { jokeCardProp }: TJokeCardProps) {
    return (
        <div className="shadow-md rounded-md p-6 w-sm max-w-sm mx-auto mt-20">
            <h3>{jokeCardProp.setup}</h3>
            <p>{jokeCardProp.punchline}</p>
            <span>
                Likes: {jokeCardProp.likeCount} 👍 or 👎.
            </span>
            <span>🗑️ Delete</span>
        </div>
    )
}