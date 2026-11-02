import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import type { Invoice } from '../../types/invoice';

type CustomerMixChartProps = {
  data: Invoice[];
};

const COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#ef4444', '#a78bfa'];

export function CustomerMixChart({ data }: CustomerMixChartProps) {
  const chartData = data.slice(0, 5).map((item) => ({
    name: item.customer,
    value: item.amount,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
          {chartData.map((entry, index) => (
            <Cell key={`${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']} />
      </PieChart>
    </ResponsiveContainer>
  );
}
