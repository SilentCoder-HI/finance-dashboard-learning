import companiesJson from "../../../Data/dummy/companies.json";
import usersJson from "../../../Data/dummy/users.json";
import customersJson from "../../../Data/dummy/customers.json";
import invoicesJson from "../../../Data/dummy/invoices.json";
import ordersJson from "../../../Data/dummy/orders.json";

export type Company = { id: string; name: string; industry: string; website: string };
export type User = { id: string; name: string; username: string; email: string; role: "superadmin" | "admin" | "accountant" | "viewer"; companyId: string | null; isActive: boolean };
export type Customer = { id: string; companyId: string; name: string; email: string; phone: string; city: string; status: string };
export type Invoice = { id: string; companyId: string; invoiceNumber: string; customerId: string; customerName: string; description: string; amount: number; paidAmount: number; status: string; issueDate: string; dueDate: string; paidDate: string | null };
export type Order = { id: string; companyId: string; orderNumber: string; customerId: string; amount: number; status: string };

const companies = companiesJson as Company[];
const users = usersJson as User[];
const customers = customersJson as Customer[];
const invoices = invoicesJson as Invoice[];
const orders = ordersJson as Order[];

export const getAllCompanies = () => companies;
export const getCompanyById = (id: string) => companies.find((c) => c.id === id);

export const getUsersByCompany = (companyId: string | null) => users.filter((u) => u.companyId === companyId);
export const getUserById = (id: string) => users.find((u) => u.id === id);
export const getUsersByRole = (role: User["role"]) => users.filter((u) => u.role === role);

export const getCustomersByCompany = (companyId: string) => customers.filter((c) => c.companyId === companyId);
export const getCustomerById = (id: string) => customers.find((c) => c.id === id);

export const getInvoicesByCompany = (companyId: string) => invoices.filter((i) => i.companyId === companyId);
export const getInvoiceById = (id: string) => invoices.find((i) => i.id === id);

export const getOrdersByCompany = (companyId: string) => orders.filter((o) => o.companyId === companyId);
export const getOrderById = (id: string) => orders.find((o) => o.id === id);


export const getSuperUserData = () => ({
  companies: getAllCompanies(),
  users: users,
  customers: customers,
  invoices: invoices,
  orders: orders,
});

export const getCompanyUserData = (companyId: string) => ({
  company: getCompanyById(companyId),
  users: getUsersByCompany(companyId),
  customers: getCustomersByCompany(companyId),
  invoices: getInvoicesByCompany(companyId),
  orders: getOrdersByCompany(companyId),
});
