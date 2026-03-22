import { auth } from "#/lib/auth";
import { createServerFn } from "@tanstack/react-start";
import { db } from "#/db"
import { getRequestHeaders } from "@tanstack/react-start/server";
import { joke } from "#/db/schema";

export const addJoke = createServerFn( {method: "POST"})
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