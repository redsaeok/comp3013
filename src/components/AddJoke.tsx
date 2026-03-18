import { useState } from "react";

export default function AddJoke() {
    const [setup, setSetup] = useState("");
    const [punchline, setPunchline] = useState("");

    return (
        <form className="shadow-md rounded-md p-6 w-sm max-w-sm mx-auto mt-20">
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
