import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db"
import { joke } from "#/db/schema";
import { desc } from "drizzle-orm";

export const getJokes = createServerFn( {method: "GET"}).handler(async () => {
  const jokes = await db.select().from(joke).orderBy(desc(joke.likeCount), desc(joke.updatedAt));
  return jokes;
})