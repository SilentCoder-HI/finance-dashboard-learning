// backend/src/model/invoice.ts
import { Schema, model, type InferSchemaType } from "mongoose";

export const INVOICE_STATUSES = ["draft", "pending", "paid", "overdue", "cancelled"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

const invoiceSchema = new Schema(
  {
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    invoiceNumber: { type: String, required: true },
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    customerName: { type: String, required: true }, // denormalised for table search
    description: String,
    amount: { type: Number, required: true }, // INTEGER, minor units (cents)
    paidAmount: { type: Number, default: 0 }, // INTEGER, minor units
    status: { type: String, enum: INVOICE_STATUSES, required: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    paidDate: { type: Date, default: null },
  },
  { timestamps: true }
);
invoiceSchema.index({ companyId: 1, invoiceNumber: 1 }, { unique: true });
invoiceSchema.index({ companyId: 1, issueDate: -1 });
invoiceSchema.index({ companyId: 1, status: 1 });

export type InvoiceDoc = InferSchemaType<typeof invoiceSchema>;
export const Invoice = model("Invoice", invoiceSchema);
