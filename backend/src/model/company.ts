import { Schema, model, type InferSchemaType } from "mongoose";

const companySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    businessType: { type: String, required: true }, // software-house | retail | logistics
    currency: { type: String, required: true, default: "USD" },
    timezone: { type: String, default: "UTC" },
    modules: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type CompanyDoc = InferSchemaType<typeof companySchema>;
export const Company = model("Company", companySchema);