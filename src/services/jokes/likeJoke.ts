import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db"
import { joke } from "#/db/schema";
import { eq, sql } from "drizzle-orm";

export const likeJoke = createServerFn( {method: "POST"} )
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
        throw new Error("Expected FormData");
    }

    if (!data.get("jokeId")) {
        throw new Error("Joke ID is required");
    }

    // We should validate jokeId is a number
    // We should validate jokeId is in the database

    return {
        jokeId: data.get("jokeId")?.toString() || "",
    }
  })
  .handler(async ({ data }) => {
    console.log("Received data for like: ", data);

    const jokeId = data.jokeId;
    
    try {
        await db
            .update(joke)
            .set({ 
                likeCount: sql`${joke.likeCount} + 1`,
                updatedAt: new Date(),
            })
            .where(eq(joke.id, Number(jokeId)));

    } catch (error) {
        console.error("Error updating like count: ", error);
        return { success: false, error: "Failed to update like count" };
    }
    
    return { success: true };

  });
