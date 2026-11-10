export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export interface Invoice {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: InvoiceStatus;
}
