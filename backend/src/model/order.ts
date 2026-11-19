// backend/src/model/order.ts  (for order:read / order:write permissions)
import { Schema, model, type InferSchemaType } from "mongoose";

export const ORDER_STATUSES = ["new", "processing", "shipped", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

const orderSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    orderNumber: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    customerName: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        unitPrice: { type: Number, required: true }, // INTEGER, minor units
      },
    ],
    total: { type: Number, required: true }, // INTEGER, minor units
    status: { type: String, enum: ORDER_STATUSES, default: "new" },
    orderDate: { type: Date, required: true },
  },
  { timestamps: true }
);
orderSchema.index({ companyId: 1, orderNumber: 1 }, { unique: true });
orderSchema.index({ companyId: 1, orderDate: -1 });

export type OrderDoc = InferSchemaType<typeof orderSchema>;
export const Order = model("Order", orderSchema);
