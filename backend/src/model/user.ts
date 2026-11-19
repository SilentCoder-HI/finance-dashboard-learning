// backend/src/model/user.ts
import { Schema, model, type InferSchemaType } from "mongoose";

export const ROLES = ["superadmin", "admin", "accountant", "viewer"] as const;
export type Role = (typeof ROLES)[number];

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "viewer", required: true },
    // null only for the platform superadmin
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
      index: true,
      required: function (this: { role?: string }) {
        return this.role !== "superadmin";
      },
    },
    isActive: { type: Boolean, default: true },

    // per-user exceptions on top of the role: final = role + grant - deny
    permissionOverrides: {
      grant: { type: [String], default: [] },
      deny: { type: [String], default: [] },
    },
  },
  { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof userSchema>;
export const User = model("User", userSchema);
