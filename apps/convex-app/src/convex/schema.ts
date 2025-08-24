import { filesTable } from '@battlemagedotapp/convex-upload-helpers/server'
import { defineSchema } from 'convex/server'
import { users } from './tables/users'

const schema = defineSchema({
  users,
  files: filesTable(),
})

export default schema
