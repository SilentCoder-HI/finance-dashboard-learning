// backend/src/model/customer.ts
import { Schema, model, type InferSchemaType } from "mongoose";

const customerSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: String,
    phone: String,
    city: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);
customerSchema.index({ companyId: 1, name: 1 });

export type CustomerDoc = InferSchemaType<typeof customerSchema>;
export const Customer = model("Customer", customerSchema);
