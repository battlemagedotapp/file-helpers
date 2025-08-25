// src/server/filesTable.ts
import { defineTable } from "convex/server";
import { v } from "convex/values";
var filesTableFields = {
  name: v.string(),
  storageId: v.id("_storage"),
  type: v.optional(v.string()),
  size: v.optional(v.number()),
  uploadedBy: v.id("users")
};
function filesTable(fields = {}) {
  return defineTable({
    ...filesTableFields,
    ...fields
  }).index("by_storage_id", ["storageId"]).index("by_uploaded_by", ["uploadedBy"]);
}

// src/server/http.ts
async function handleGetImage(ctx, request) {
  const { searchParams } = new URL(request.url);
  const storageId = searchParams.get("storageId");
  if (!storageId) {
    return new Response("Storage ID is required", { status: 400 });
  }
  try {
    const blob = await ctx.storage.get(storageId);
    if (blob === null) {
      return new Response("Image not found", { status: 404 });
    }
    return new Response(blob, {
      headers: {
        "Content-Type": blob.type || "image/jpeg",
        "Cache-Control": "public, max-age=31536000"
      }
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
async function handleGetAudio(ctx, request) {
  const { searchParams } = new URL(request.url);
  const storageId = searchParams.get("storageId");
  if (!storageId) {
    return new Response("Storage ID is required", { status: 400 });
  }
  try {
    const blob = await ctx.storage.get(storageId);
    if (blob === null) {
      return new Response("Audio not found", { status: 404 });
    }
    return new Response(blob, {
      headers: {
        "Content-Type": blob.type || "audio/mpeg",
        "Cache-Control": "public, max-age=31536000"
      }
    });
  } catch (error) {
    console.error("Error serving audio:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
export {
  filesTable,
  filesTableFields,
  handleGetAudio,
  handleGetImage
};
//# sourceMappingURL=index.mjs.map