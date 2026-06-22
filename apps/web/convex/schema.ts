import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  orderEvents: defineTable({
    orderId: v.string(),
    status: v.string(),
    message: v.string(),
    timestamp: v.number(),
  }).index('by_order', ['orderId']),

  marketplaceActivity: defineTable({
    type: v.union(v.literal('purchase'), v.literal('new_listing'), v.literal('drop')),
    artworkId: v.string(),
    artworkTitle: v.string(),
    userId: v.optional(v.string()),
    timestamp: v.number(),
  }),

  notifications: defineTable({
    userId: v.string(),
    type: v.string(),
    title: v.string(),
    body: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  }).index('by_user', ['userId']),
});
