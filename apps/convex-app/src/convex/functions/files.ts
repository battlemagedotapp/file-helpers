import { mutation } from '@/convex/_generated/server'
import { v } from 'convex/values'

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

export const saveFile = mutation({
  args: {
    name: v.string(),
    storageId: v.id('_storage'),
    type: v.optional(v.string()),
    size: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.query('users').first()
    if (!user) {
      throw new Error('User not found')
    }
    const fileId = await ctx.db.insert('files', {
      name: args.name,
      storageId: args.storageId,
      type: args.type,
      size: args.size,
      uploadedBy: user._id,
    })
    return fileId
  },
})

export const deleteFile = mutation({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    const file = await ctx.db
      .query('files')
      .withIndex('by_storage_id', (q) => q.eq('storageId', args.storageId))
      .unique()
    if (!file) {
      throw new Error('File not found')
    }
    const user = await ctx.db.query('users').first()
    if (!user) {
      throw new Error('User not found')
    }
    if (file.uploadedBy !== user._id) {
      throw new Error('Not authorized to delete this file')
    }
    await ctx.storage.delete(args.storageId)
    await ctx.db.delete(file._id)
  },
})
