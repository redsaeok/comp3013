// JokeBin.tsx
import { joke } from "#/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import JokeCard from "./JokeCard";

type TJoke = InferSelectModel<typeof joke>;

type JokeBinProps = {
  jokes: TJoke[];
};

export default function JokeBin({ jokes }: JokeBinProps) {
  const top3 = jokes.slice(0, 3);
  const rest = jokes.slice(3);

  return (
    <div className="flex flex-col border border-gray-200 shadow-xs bg-amber-50 rounded-2xl p-6 ">
      <h1 className="text-2xl font-bold">📫 Joke Bin</h1>
      <p className="mt-5">★ TOP 3 JOKES</p>
      
      {
        top3.map((j) => (
          <JokeCard key={j.id} jokeCardProp={j} isTopJoke={true} />
        ))
      }

      { 0 !== rest.length && (
        <>
          <p className="mt-5">MORE JOKES</p>
          { rest.map((j) => (
            <JokeCard key={j.id} jokeCardProp={j} isTopJoke={false} />
          )) }
        </>
      )}

    </div>
  );
}