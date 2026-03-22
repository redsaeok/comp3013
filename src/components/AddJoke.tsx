import { useState } from "react";
import { authClient } from "#/lib/auth-client";
import { Link, useNavigate } from "@tanstack/react-router";
import { addJoke } from "#/services/jokes";




export default function AddJoke() {
    const [setup, setSetup] = useState("");
    const [punchline, setPunchline] = useState("");
    const navigate = useNavigate();
    const { data: session } = authClient.useSession();

    async function handleJoke(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (!setup || !punchline) {
            alert("Please fill in both the setup and punchline.");
            return;
        }

        if (!session) {
            alert("You must be logged in to add a joke.");
            return;
        }

        await addJoke({data: formData});

        alert("Joke added successfully!");
        navigate({ to: "/" });
    }


    if (!session) {
        return (
            <div className="shadow-md rounded-2xl border border-gray-200 inset-shadow-xs p-6 w-sm 2xl:w-2xl max-w-sm 2xl:max-w-2xl mx-auto mt-20">
                <h1 className="text-3xl font-bold">Sign in to add a joke</h1>
                <p className="my-4 text-sm">Joke submission is available to signed-in users only.</p>

                <div className="flex flex-row gap-2 mt-2">
                    <Link
                    to="/login"
                    className="inline-flex items-center gap-2 rounded-md px-3 py-1.5  bg-linear-to-b from-amber-500 to-amber-700 no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2 hover:from-amber-800 hover:to-amber-800"
                    activeProps={{ className: "nav-link is-active" }}
                    >
                    <span className="text-white font-bold text-sm">Sign in</span>
                    </Link>

                    <Link
                    to="/register"
                    className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-orange-50 px-3 py-1.5 no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2 hover:bg-orange-100"
                    activeProps={{ className: "nav-link is-active" }}
                    >
                    <span className="text-gray-800 font-bold text-sm">Create account</span>
                    </Link>
                </div>

            </div>
        )
    }


    return (
        <main className="page-wrap px-4 pb-20 mb-20 pt-14">
        <section className="mb-5 border border-gray-200 shadow-xs bg-linear-to-tr from-orange-50 from-40% to-orange-100 rise-in relative overflow-hidden rounded-2xl px-6 py-10 sm:px-10 sm:py-14">
        <form onSubmit={handleJoke} className="lg:w-[55%]">
            <ul>
            <li><h3 className="text-sm text-orange-900 font-bold pb-3">FRESHLY DEPLOYED HUMOR</h3>
            <h1 className="text-4xl font-bold">Add a New Joke</h1>
            <p className="mt-1 mb-3">Drop in a setup and punchline.  Once it saves, you will be redirected back to the collection.</p>
            </li>
            <li>
                <label className="font-bold" htmlFor="setup">
                    Setup
                    <input
                        onChange={(e) => setSetup(e.target.value)}
                        type="text"
                        id="setup"
                        name="setup"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-4"
                        required
                    />
                </label>
            </li>
            <li>
                <label className="font-bold" htmlFor="punchline">
                    Punchline
                    <textarea
                        onChange={(e) => setPunchline(e.target.value)}
                        rows={4}
                        id="punchline"
                        name="punchline"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-4"
                        required
                    />
                </label>
            </li>
            <li>
                <button type="submit" className="bg-linear-to-b from-amber-700 to-amber-800 text-white font-bold px-4 py-2 rounded-md hover:from-amber-800 hover:to-amber-800 cursor-pointer">
                    Save Joke
                </button>
            </li>
            </ul>
        </form>
        </section>
        </main>
    )
}
