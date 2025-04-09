import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

export const doSomething = httpAction(async (ctx, request) => {
  const { data, type } = await request.json();

  switch (type) {
    case "user.created":
      // Handle user created event
      await ctx.runMutation(internal.users.createUser, {
        clerkId: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email_addresses[0].email_address,
        imageUrl: data.image_url,
        username: data.username,
        followersCount: 0, // Default value
      });
      // You can also use ctx.db.insert directly if you prefer???

      console.log("User created:", data);
      break;
    case "user.updated":
      // Handle user updated event
      console.log("User updated:", data);
      break;
  }

  return new Response(null, { status: 200 });
});

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: doSomething,
});

// https://majestic-grouse-2.convex.cloud
// https://majestic-grouse-2.convex.site/clerk-users-webhook
export default http;
