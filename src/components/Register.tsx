import { authClient } from "#/lib/auth-client";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {


        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const { data, error } = await authClient.signUp.email({
            email, // user email address
            password, // user password -> min 8 characters by default
            name, // user display name            
            callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
        }, {
            onRequest: (ctx) => {
                //show loading
                console.log(ctx);
            },
            onSuccess: (ctx) => {
                console.log( ctx );
                //redirect to the dashboard or sign in page
                navigate({ to: "/" });
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        });

        console.log("Register response", { data, error });
    }


    return (
        <form onSubmit={handleSubmit} className="shadow-md rounded-md p-6 w-sm max-w-sm mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <ul>

                <li>
                    <label htmlFor="name">
                        Name
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            id="name"
                            name="name"
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-4"
                            required
                        />
                    </label>
                </li>

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
                    <label htmlFor="confirmPassword">
                        Confirm Password
                        <input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full border border-gray-300 rounded-md p-2 mt-1 mb-4"
                            required
                        />
                    </label>
                </li>
                <li>
                    <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition">Register</button>
                </li>
            </ul>
        </form>
    );
}