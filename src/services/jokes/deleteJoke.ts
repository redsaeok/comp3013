import { auth } from "#/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db"
import { getRequestHeaders } from "@tanstack/react-start/server";
import { joke } from "#/db/schema";
import { sql } from "drizzle-orm";

export const deleteJoke = createServerFn( {method: "POST"} )
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
        throw new Error("Expected FormData");
    }

    if (!data.get("jokeId")) {
        throw new Error("Joke ID is required");
    }

    return {
        jokeId: data.get("jokeId")?.toString() || "",
    }
  })
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({
        headers: getRequestHeaders(),        
    })

    if( !session?.user?.id) {
        throw new Error("Unauthorized");
    }

    console.log("Received data for delete: ", data);

    const jokeId = data.jokeId;
    
    try {
        await db
            .delete(joke)
            .where(sql`${joke.id} = ${Number(jokeId)} and ${joke.userId} = ${session.user.id}`);

    } catch (error) {
        console.error("Error deleting joke: ", error);
        return { success: false, error: "Failed to delete joke" };
    }
    
    return { success: true };

  });