//import { authClient } from "#/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "#/db";
import { joke } from "#/db/schema";
import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";
import JokeBin from "#/components/JokeBin";


export const getJokes = createServerFn( {method: "GET"}).handler(async () => {
  const jokes = await db.select().from(joke).orderBy(desc(joke.likeCount), desc(joke.updatedAt));
  return jokes;
})

export const Route = createFileRoute("/")({ 
  component: App,
  loader: async() => {
    const jokes = await getJokes();
    return jokes;
  }  
});



function App() {
  const jokes = Route.useLoaderData();
  //console.log(jokes);
  //const { data: session } = authClient.useSession();

  return (
    <main className="page-wrap px-4 pb-20 mb-20 pt-14">
      <section className="mb-5 border border-gray-200 shadow-xs bg-linear-to-tr from-orange-50 from-40% to-orange-100 rise-in relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex flex-col">
          <h3 className="text-sm text-orange-900 font-bold pb-3">FRESHLY DEPLOYED HUMOR</h3>
          <div className="flex flex-row gap-4 mb-6">
            <div className="flex flex-col flex-1">
              <h1 className="text-4xl pb-3">Welcome to DevJokes, where commits come with chuckles.</h1>
              <p>Browse the hottest jokes, vote the funniest one to the top, and keep your debugging sessions dangerously entertaining.</p>
              <div className="flex flex-row gap-4 mt-6">
                <span className="border rounded-xl shadow-xs border-gray-300 bg-orange-100 text-orange-900 px-5 text-sm font-bold">PUNCHLINE POWERED</span>            
                <span className="border rounded-xl shadow-xs border-gray-300 bg-cyan-50 text-gray-600 px-5 text-sm font-bold">COMMUNITY VOTED</span>            
              </div>
            </div>
            <div className="flex-1 hidden lg:block">
              <div className="grid gap-4 grid-cols-2 mb-5">
                {
                  [
                    [
                      "🤣",
                      "CRASH CACKLER",
                      "from-orange-100 to-orange-200",
                    ],                    
                    [
                      "😂",
                      "PUN PILOT",
                      "from-cyan-100 to-cyan-200",
                    ],

                    [
                      "😆",
                      "LOOP LAUGHTER",
                      "from-pink-100 to-pink-200"
                    ],
                    [
                      "😹",
                      "MERGE MEOWER",
                      "from-yellow-100 to-yellow-200"
                    ]
                  ].map(([emoji, label, color]) => (
                    <div key={label} className={`border-gray-100 shadow-2xl border rounded-xl bg-linear-to-r ${color} text-gray-800 px-5 py-3 text-sm font-bold flex flex-col`}>
                      <span className="text-lg">{emoji}</span>
                      <span>{label}</span>
                    </div>
                  ))
                }
              </div>
              <div className="border rounded-4xl shadow-sm border-gray-200 pl-2 bg-orange-50">
                <span className="text-sm">Drop a joke and join the chaos</span>
              </div>
            </div>            
          </div>
        </div>
      </section>


      {
          jokes.length === 0 && (
            <section className="border border-gray-200 shadow-xs bg-amber-50 rounded-2xl p-6 text-gray-400 italic">
              No jokes found.
            </section>
          )
      }

      {      
        0 !== jokes.length && (
          <JokeBin jokes={jokes} />
        )
      }

    </main>
    
  );
}
