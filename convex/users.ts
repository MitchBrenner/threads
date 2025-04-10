import { internal } from "./_generated/api";
import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

// GET all users
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    username: v.union(v.string(), v.null()),
    bio: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    followersCount: v.number(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      ...args,
      username: args.username || `${args.firstName}${args.lastName}`,
    });
    return userId;
  },
});
