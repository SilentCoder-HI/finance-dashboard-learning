import companies from "./dummy/companies.json";
import users from "./dummy/users.json";
import customers from "./dummy/customers.json";
import invoices from "./dummy/invoices.json";
import orders from "./dummy/orders.json";

export { companies, users, customers, invoices, orders };

export const getCompanyById = (id: string) => companies.find((c: any) => c.id === id);
export const getUserById = (id: string) => users.find((u: any) => u.id === id);
export const getUsersByCompany = (companyId: string | null) => users.filter((u: any) => u.companyId === companyId);
export const getCustomersByCompany = (companyId: string) => customers.filter((c: any) => c.companyId === companyId);
export const getInvoicesByCompany = (companyId: string) => invoices.filter((i: any) => i.companyId === companyId);
export const getOrdersByCompany = (companyId: string) => orders.filter((o: any) => o.companyId === companyId);



export const getSuperUserData = () => ({
  companies,
  users,
  customers,
  invoices,
  orders,
});

export const getCompanyUserData = (companyId: string) => ({
  company: getCompanyById(companyId),
  users: getUsersByCompany(companyId),
  customers: getCustomersByCompany(companyId),
  invoices: getInvoicesByCompany(companyId),
  orders: getOrdersByCompany(companyId),
});
