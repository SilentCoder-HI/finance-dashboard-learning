// backend/src/model/auditLog.ts  (who changed whose permissions, deletes, exports)
import { Schema, model, type InferSchemaType } from "mongoose";

const auditLogSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", default: null, index: true },
    actorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    targetUserId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    action: { type: String, required: true }, // e.g. "permissions.update", "invoice.delete"
    before: { type: Schema.Types.Mixed, default: null },
    after: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
auditLogSchema.index({ companyId: 1, createdAt: -1 });

export type AuditLogDoc = InferSchemaType<typeof auditLogSchema>;
export const AuditLog = model("AuditLog", auditLogSchema);
