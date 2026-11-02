import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { Invoice } from '../../types/invoice';

type RevenueChartProps = {
  data: Invoice[];
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="id" tick={{ fontSize: 11 }} />
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
          labelFormatter={(label) => `Invoice ${label}`}
        />
        <Legend />
        <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} name="Invoice Amount" />
      </BarChart>
    </ResponsiveContainer>
  );
}
