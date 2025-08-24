import * as convex_server from 'convex/server';
import { GenericActionCtx } from 'convex/server';
import * as convex_values from 'convex/values';
import { GenericValidator } from 'convex/values';

declare const filesTableFields: {
    name: convex_values.VString<string, "required">;
    storageId: convex_values.VId<convex_values.GenericId<"_storage">, "required">;
    type: convex_values.VString<string | undefined, "optional">;
    size: convex_values.VFloat64<number | undefined, "optional">;
    uploadedBy: convex_values.VId<convex_values.GenericId<"users">, "required">;
};
declare function filesTable(fields?: Record<string, GenericValidator>): convex_server.TableDefinition<convex_values.VObject<{
    size?: number | undefined;
    type?: string | undefined;
    name: string;
    storageId: convex_values.GenericId<"_storage">;
    uploadedBy: convex_values.GenericId<"users">;
}, {
    name: convex_values.VString<string, "required">;
    storageId: convex_values.VId<convex_values.GenericId<"_storage">, "required">;
    type: convex_values.VString<string | undefined, "optional">;
    size: convex_values.VFloat64<number | undefined, "optional">;
    uploadedBy: convex_values.VId<convex_values.GenericId<"users">, "required">;
}, "required", "name" | "storageId" | "size" | "uploadedBy" | "type">, {
    by_storage_id: ["storageId", "_creationTime"];
    by_uploaded_by: ["uploadedBy", "_creationTime"];
}, {}, {}>;

declare function handleGetImage(ctx: GenericActionCtx<any>, request: Request): Promise<Response>;

export { filesTable, filesTableFields, handleGetImage };
