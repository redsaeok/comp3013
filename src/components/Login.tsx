import { authClient } from "#/lib/auth-client";
import { useState } from "react";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const { data, error } = await authClient.signIn.email({
            /**
             * The user email
             */
            email,
            /**
             * The user password
             */
            password,
            /**
             * A URL to redirect to after the user verifies their email (optional)
             */
            callbackURL: "/",
            /**
             * remember the user session after the browser is closed. 
             * @default true
             */
            rememberMe: false
        }, {
            //callbacks
        })

        if (error) {
            alert("Invalid username or password");
            console.log("Login error", error);
            return;
        } else {
            console.log("Login success", data);
        }
    }

    return (
        <form className="shadow-md rounded-md p-6 w-sm max-w-sm mx-auto mt-20" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <ul>
                <li>
                    <label htmlFor="email">
                        Email
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-4"
                            required
                        />
                    </label>
                </li>
                <li>
                    <label htmlFor="password">
                        Password
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-4"
                            required
                        />
                    </label>
                </li>
                <li>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </li>
            </ul>
        </form>
    )
}