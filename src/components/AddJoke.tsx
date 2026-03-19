import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { db } from "#/db"
import { joke } from "#/db/schema";
import { authClient } from "#/lib/auth-client";
import { useNavigate } from "@tanstack/react-router";
import { auth } from "#/lib/auth";
import { getRequestHeaders } from "@tanstack/react-start/server";


type TNewJoke = {
    setup: string;
    punchline: string;
    userId: string;
}

const addJoke = createServerFn( {method: "POST"})
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
        throw new Error("Expected FormData");
    }

    return {
        setup: data.get("setup")?.toString() || "",
        punchline: data.get("punchline")?.toString() || "",
    }
  })
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({
        headers: getRequestHeaders(),
    })

    if( !session?.user?.id) {
        throw new Error("Unauthorized");
    }

    console.log("Received data:", data);
    console.log("Setup: ", data.setup);
    console.log("Punchline: ", data.punchline);
    console.log("Session UserId: ", session.user.id);

    await db.insert(joke).values({
      setup: data.setup,
      punchline: data.punchline,
      likeCount: 0,
      userId: session.user.id
    });

    return { success: true };
  })



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

    return (
        <form onSubmit={handleJoke} className="shadow-md rounded-md p-6 w-sm max-w-sm mx-auto mt-20">
            <ul>
            <li><h3>SHIP A PUNCHLINE</h3>
            <h1>Add a New Joke</h1>
            <p>Drop in a setup and punchline.  Once it saves, you will be redirected back to the collection.</p>
            </li>
            <li>
                <label htmlFor="setup">
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
                <label htmlFor="punchline">
                    Punchline
                    <input
                        onChange={(e) => setPunchline(e.target.value)}
                        type="text"
                        id="punchline"
                        name="punchline"
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-4"
                        required
                    />
                </label>
            </li>
            <li>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Save Joke
                </button>
            </li>
            </ul>
        </form>
    )
}
