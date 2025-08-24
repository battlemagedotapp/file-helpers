import { defineTable } from 'convex/server'
import { v, type GenericValidator } from 'convex/values'

export const filesTableFields = {
  name: v.string(),
  storageId: v.id('_storage'),
  type: v.optional(v.string()),
  size: v.optional(v.number()),
  uploadedBy: v.id('users'),
}

export function filesTable(fields: Record<string, GenericValidator> = {}) {
  return defineTable({
    ...filesTableFields,
    ...fields,
  })
    .index('by_storage_id', ['storageId'])
    .index('by_uploaded_by', ['uploadedBy'])
}
