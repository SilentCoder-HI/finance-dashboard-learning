import data from "../../../Data/Invoices/data.json" with { type: "json" };
import type { Invoice } from "../types/invoice.js";

export const allInvoices:Invoice[] = data as Invoice[];

// only one customer's invoices
export const getInvoicesByCustomer = (customer: string): Invoice[] => {
  return allInvoices.filter((invoice) => invoice.customer === customer);
};