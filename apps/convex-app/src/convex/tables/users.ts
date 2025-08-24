import { defineTable } from 'convex/server'
import { v } from 'convex/values'

export const users = defineTable({
  name: v.optional(v.string()),
  email: v.optional(v.string()),
})
