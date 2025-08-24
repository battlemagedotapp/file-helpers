import { handleGetImage } from '@battlemagedotapp/convex-upload-helpers/server'
import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'

const http = httpRouter()

http.route({
  path: '/getImage',
  method: 'GET',
  handler: httpAction(handleGetImage),
})

export default http
