import type { GenericActionCtx } from 'convex/server'
import type { Id } from 'node_modules/convex/dist/esm-types/values/value'

export async function handleGetImage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: GenericActionCtx<any>,
  request: Request,
) {
  const { searchParams } = new URL(request.url)
  const storageId = searchParams.get('storageId') as Id<'_storage'>

  if (!storageId) {
    return new Response('Storage ID is required', { status: 400 })
  }

  try {
    const blob = await ctx.storage.get(storageId)
    if (blob === null) {
      return new Response('Image not found', { status: 404 })
    }

    return new Response(blob, {
      headers: {
        'Content-Type': blob.type || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error serving file:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

export async function handleGetAudio(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: GenericActionCtx<any>,
  request: Request,
) {
  const { searchParams } = new URL(request.url)
  const storageId = searchParams.get('storageId')! as Id<'_storage'>

  if (!storageId) {
    return new Response('Storage ID is required', { status: 400 })
  }

  try {
    const blob = await ctx.storage.get(storageId)
    if (blob === null) {
      return new Response('Audio not found', { status: 404 })
    }

    return new Response(blob, {
      headers: {
        'Content-Type': blob.type || 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error serving audio:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
