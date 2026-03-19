import { authClient } from "#/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "#/db";
import { joke } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";
import  JokeCard from "#/components/JokeCard";


const getJokes = createServerFn( {method: "GET"}).handler(async () => {
  const jokes = await db.select().from(joke);
  return jokes;
})

export const Route = createFileRoute("/")({ 
  component: App,
  loader: async() => {
    const jokes = await getJokes();
    return { jokes };
  }  
});



function App() {
  const { jokes : jokeList } = Route.useLoaderData();
  console.log(jokeList);

  const { data: session } = authClient.useSession();
  if (!session) {
    return (
      <main className="page-wrap px-4 pb-8 pt-14">
        Welcome to DevJokes! Please Login
      </main>      
    );
  }

  return (
    <main className="page-wrap px-4 pb-8 pt-14">

      {
        jokeList.map((j) => (
          <JokeCard key={j.id} jokeCardProp={j} />
        ))
      }

      <h3>{session.user.email}</h3>
    </main>
    
  );
}
