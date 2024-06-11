import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const getUrl = mutation({
    args: {
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
})

export const createPodcast = mutation({
    args: {
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioURL: v.string(),
        imageURL: v.string(),
        voiceType: v.string(),
        imagePrompt: v.string(),
        voicePrompt: v.string(),
        views: v.number(),
        audioDuration: v.number(),
        audioStorageId: v.id('_storage'),
        imageStorageId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError('User not authenticated')
        }

        const user = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('email'), identity.email))
            .collect();

        if (user.length === 0) {
            throw new ConvexError('User not found')
        }

        const podcast = await ctx.db.insert('podcasts', {
            audioStorageId: args.audioStorageId,
            user: user[0]._id,
            podcastTitle: args.podcastTitle,
            podcastDescription: args.podcastDescription,
            audioURL: args.audioURL,
            imgURL: args.imageURL,
            imgStorageId: args.imageStorageId,
            author: user[0].name,
            authorId: user[0].clerkId,
            voicePrompt: args.voicePrompt,
            imgPrompt: args.imagePrompt,
            voiceType: args.voiceType,
            views: args.views,
            authorImgURL: user[0].imgURL,
            audioDuration: args.audioDuration,
        })

        return podcast;
    }
})