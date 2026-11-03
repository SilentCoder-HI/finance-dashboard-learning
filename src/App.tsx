import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { invoices } from './data/invoices';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Day1LearningPage } from './pages/day1';
import { Day2LearningPage } from './pages/day2';
import { FinanceDashboardDay2 } from './day-2/FinanceDashboard';

function App() {
  const [activePage, setActivePage] = useState<'overview' | 'invoices' | 'day-1' | 'day-2'>('overview');

  const totalRevenue = invoices.reduce((acc, invoice) => acc + invoice.amount, 0);

  const totalPaid = invoices.filter((invoice) => invoice.status === "Paid").length;
  const totalOverdue = invoices.filter((invoice) => invoice.status === "Overdue").length;

  const availableYears = useMemo(
    () => [...new Set(invoices.map((invoice) => Number(invoice.date.slice(0, 4))))]
      .filter(Number.isFinite)
      .sort((a, b) => a - b),
    [],
  );
  const [selectedYear, setSelectedYear] = useState(
    () => availableYears[availableYears.length - 1] ?? new Date().getFullYear(),
  );
  const chartData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, index) => ({
      month: new Date(2000, index).toLocaleString('en-US', { month: 'short' }),
      selectedYearRevenue: 0,
      previousYearRevenue: 0,
    }));

    for (const invoice of invoices) {
      const invoiceYear = Number(invoice.date.slice(0, 4));
      const monthIndex = Number(invoice.date.slice(5, 7)) - 1;
      if (monthIndex < 0 || monthIndex > 11) continue;

      if (invoiceYear === selectedYear) {
        months[monthIndex].selectedYearRevenue += invoice.amount;
      } else if (invoiceYear === selectedYear - 1) {
        months[monthIndex].previousYearRevenue += invoice.amount;
      }
    }

    return months;
  }, [selectedYear]);

  const previousYear = selectedYear - 1;
  const yearOptions = availableYears.length > 0 ? availableYears : [selectedYear];
  const selectedYearIndex = yearOptions.indexOf(selectedYear);

  return (

    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
      <Box component="nav" aria-label="Dashboard pages" sx={{ backgroundColor: 'white', width: { xs: '30%', md: '20%' }, minHeight: '100vh', p: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0f172a' }}>
          Finance workspace
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#64748b', fontWeight: 700 }}>
          APPLICATION
        </Typography>
        <ButtonGroup orientation="vertical" variant="outlined" sx={{ mt: 2, width: '100%' }}>
          <Button
            variant={activePage === 'overview' ? 'contained' : 'outlined'}
            onClick={() => setActivePage('overview')}
          >
            Main Dashboard
          </Button>
          <Button
            variant={activePage === 'invoices' ? 'contained' : 'outlined'}
            onClick={() => setActivePage('invoices')}
          >
            Invoices
          </Button>
        </ButtonGroup>
        <Typography variant="caption" sx={{ display: 'block', mt: 3, color: '#64748b', fontWeight: 700 }}>
          LEARNING JOURNEY
        </Typography>
        <ButtonGroup orientation="vertical" variant="outlined" sx={{ mt: 2, width: '100%' }}>
          <Button
            variant={activePage === 'day-1' ? 'contained' : 'outlined'}
            onClick={() => setActivePage('day-1')}
          >
            Day 1 — Learning Journey
          </Button>
          <Button
            variant={activePage === 'day-2' ? 'contained' : 'outlined'}
            onClick={() => setActivePage('day-2')}
          >
            Day 2 — Learning Journey
          </Button>
        </ButtonGroup>

      </Box>
      <Box sx={{ backgroundColor: 'white', width: { xs: '70%', md: '80%' }, minWidth: 0, minHeight: '100vh', p: { xs: 2, md: 3 } }}>
        {activePage === 'invoices' ? <FinanceDashboardDay2 /> : activePage === 'day-1' ? <Day1LearningPage /> : activePage === 'day-2' ? <Day2LearningPage /> : <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap', borderBottom: "1px solid #e2e8f0", pb: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
              Finance Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569' }}>
              Revenue visibility and billing performance
            </Typography>


          </Box>
          <ButtonGroup orientation="horizontal" variant="contained" sx={{ mt: 2 }}>
            <Button>Filter</Button>
            <Button>Export</Button>
          </ButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
          <Box
            component="section"
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',               // mobile: 1 card per row
                sm: 'repeat(2, 1fr)',    // tablet: 2 per row
                md: 'repeat(3, 1fr)',    // desktop: 3 per row
              },
              gap: 2,
              mb: 4,
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Total Revenue
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#6366f1' }}>
                  {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Total Paid
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#22c55e' }}>
                  {totalPaid}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Total Overdue
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ef4444' }}>
                  {totalOverdue}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box component="section" sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Revenue by Month
              </Typography>
              <Typography variant="body2" sx={{ color: '#475569' }}>
                Compare {selectedYear} revenue with {previousYear}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                disabled={selectedYearIndex <= 0}
                onClick={() => setSelectedYear(yearOptions[selectedYearIndex - 1])}
                aria-label="Select previous available year"
              >
                Previous
              </Button>
              <FormControl size="small" sx={{ minWidth: 120, backgroundColor: '#fff' }}>
                <InputLabel id="revenue-year-label">Year</InputLabel>
                <Select
                  labelId="revenue-year-label"
                  value={selectedYear}
                  label="Year"
                  onChange={(event) => setSelectedYear(Number(event.target.value))}
                >
                  {yearOptions.map((yearOption) => (
                    <MenuItem key={yearOption} value={yearOption}>{yearOption}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                disabled={selectedYearIndex < 0 || selectedYearIndex >= yearOptions.length - 1}
                onClick={() => setSelectedYear(yearOptions[selectedYearIndex + 1])}
                aria-label="Select next available year"
              >
                Next
              </Button>
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: 360, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value: number) => `$${value / 1000}k`} />
                <Tooltip
                  formatter={(value) =>
                    typeof value === 'number'
                      ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                      : String(value ?? '')
                  }
                />
                <Legend />
                <Bar dataKey="selectedYearRevenue" fill="#6366f1" name={`${selectedYear} Revenue`} radius={[4, 4, 0, 0]} />
                <Bar dataKey="previousYearRevenue" fill="#94a3b8" name={`${previousYear} Revenue`} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        </>}
      </Box>
    </Box>
  );
}

export default App;
