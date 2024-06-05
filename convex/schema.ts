import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    podcasts: defineTable({
        user: v.id('users'),
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioURL: v.optional(v.string()),
        audioStorageId: v.optional(v.id('_storage')),
        imgURL: v.optional(v.string()),
        imgStorageId: v.optional(v.id('_storage')),
        author: v.string(),
        authorId: v.string(),
        authorImgURL: v.string(),
        voicePrompt: v.string(),
        imgPrompt: v.string(),
        voiceType: v.string(),
        audioDuration: v.number(),
        views: v.number(),
    })
    .searchIndex('search_author', { searchField: 'author' })
    .searchIndex('search_title', { searchField: 'podcastTitle' })
    .searchIndex('search_body', { searchField: 'podcastDescription' }),
    users: defineTable({
        email: v.string(),
        imgURL: v.string(),
        clerkId: v.string(),
        name: v.string(),
    }),
})