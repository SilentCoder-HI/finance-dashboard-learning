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

import { invoices } from './../data/invoices';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Day1LearningPage } from './day1';
import { Day2LearningPage } from './day2';
import { Day3LearningPage } from './day3';
import { Day4LearningPage } from './day4';
import { Day5LearningPage } from './day5';
import { Day6LearningPage } from './day6';
import { Invoices } from './Invoices';
import Login from './login';
import { useDispatch } from 'react-redux';
import { logout, useAppSelector } from './../store/store';
import Profile from './profile';
import Sidenav from '../components/sidenav';

import type { PageId } from "../components/sidenav"
import { Tally4, Menu } from 'lucide-react';
function App() {
    const [activePage, setActivePage] = useState<PageId>('overview');
    const dispacth = useDispatch()

    const user = useAppSelector((state) => state.auth.user)

    if (!user) {
        return <Login />
    }
    const [sideNav, setsideNav] = useState(true)
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

        <div className="relative h-screen overflow-hidden">
            <div className="pointer-events-none fixed inset-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-200/40 to-blue-400/50" />
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-200/40 to-blue-400/50" />

                <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-blue-300/90 blur-[120px]" />

                <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-blue-500/50 blur-[140px]" />
            </div>


            <div className="relative h-full z-10 flex gap-5 p-4">

                <Box className='rounded-2xl overflow-x-hidden w-[350px] border border-white/60 bg-white/40 p-5 backdrop-blur-xl shadow-lg overflow-y-auto no-scrollbar' component="nav" aria-label="Dashboard pages">
                    <Box className="flex justify-between">
                        <Typography variant="subtitle1" className='text-slate-900 py-2 text-xl font-semibold tracking-tight'>
                            FW.
                        </Typography>
                        <Button onClick={()=>setsideNav(!sideNav)}>

                        {sideNav ? <Menu /> : <Tally4 /> }
                        </Button>
                    </Box>
                    <Sidenav activePage={activePage} setActivePage={setActivePage} />
                </Box>
                <Box className="rounded-2xl h-full border border-white/60 bg-white/40 p-5 w-full backdrop-blur-xl shadow-lg overflow-y-auto no-scrollbar">
                    {activePage === 'invoices' ? (
                        <Invoices />
                    ) : activePage === "profile" ? (
                        <Profile />
                    ) : activePage === 'day-1' ? (
                        <Day1LearningPage />
                    ) : activePage === 'day-2' ? (
                        <Day2LearningPage />
                    ) : activePage === 'day-3' ? (
                        <Day3LearningPage />
                    ) : activePage === 'day-4' ? (
                        <Day4LearningPage />
                    ) : activePage === 'day-5' ? (
                        <Day5LearningPage />
                    ) : activePage === 'day-6' ? (
                        <Day6LearningPage />
                    ) : <>
                        <Box className="rounded-2xl border  border-white/60 bg-white/40 p-4 flex justify-between shadow-lg ">
                            <Box className="bg-transparent">
                                <Typography variant="h4" className="text-slate-900 text-2xl font-semibold">
                                    Finance overview
                                </Typography>
                                <Typography variant="body2" className="text-slate-600 text-sm">
                                    Revenue visibility and billing performance
                                </Typography>


                            </Box>
                            <ButtonGroup orientation="horizontal" variant="contained" sx={{ mt: 2 }}>
                                <Button>Filter</Button>
                                <Button>Export</Button>
                                <Button onClick={() => dispacth(logout())}>Logout</Button>
                            </ButtonGroup>
                        </Box>

                        <Box className="py-5 w-full" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
                            <Box
                                component="section"
                                className='w-full'
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
                                <Card className="rounded-2xl border border-white/60 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-transform duration-200 hover:scale-[1.02]">
                                    <CardContent>
                                        <Typography variant="h6" className="text-slate-600 font-semibold mb-2 text-base">
                                            Total Revenue
                                        </Typography>
                                        <Typography variant="h4" className="tabular-nums text-slate-900 text-2xl font-semibold">
                                            {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-2xl border border-white/60 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-transform duration-200 hover:scale-[1.02]">
                                    <CardContent>
                                        <Typography variant="h6" className="text-slate-600 font-semibold mb-2 text-base">
                                            Total Paid
                                        </Typography>
                                        <Typography variant="h4" className="tabular-nums text-slate-900 text-2xl font-semibold">
                                            {totalPaid}
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card className="rounded-2xl border border-white/60 bg-white/40 p-6 shadow-lg backdrop-blur-xl transition-transform duration-200 hover:scale-[1.02]">
                                    <CardContent>
                                        <Typography variant="h6" className="text-slate-600 font-semibold mb-2 text-base">
                                            Total Overdue
                                        </Typography>
                                        <Typography variant="h4" className="tabular-nums text-red-500 text-2xl font-semibold">
                                            {totalOverdue}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>

                        <Box component="section" sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2, flexWrap: 'wrap' }}>
                                <Box>
                                    <Typography variant="h4" className="text-slate-900 text-2xl font-semibold">
                                        Revenue by month
                                    </Typography>
                                    <Typography variant="body2" className="text-slate-600 text-sm">
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
                                    <FormControl size="small" sx={{ minWidth: 120, backgroundColor: 'rgba(255,255,255,0.6)' }}>
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
                            <Box className="rounded-2xl border border-white/60 bg-white/40 p-3 shadow-lg backdrop-blur-xl transition-transform duration-200 hover:scale-[1.01]" sx={{ width: '100%', height: 360, minWidth: 0 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(15,23,42,0.08)" />
                                        <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <YAxis tickFormatter={(value: number) => `$${value / 1000}k`} tick={{ fill: '#475569', fontSize: 12 }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            formatter={(value) =>
                                                typeof value === 'number'
                                                    ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`
                                                    : String(value ?? '')
                                            }
                                        />
                                        <Legend />
                                        <Bar dataKey="selectedYearRevenue" fill="#3b82f6" name={`${selectedYear} Revenue`} radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="previousYearRevenue" fill="#64748b" name={`${previousYear} Revenue`} radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </Box>
                    </>}
                </Box>
            </div>
        </div>
    );
}

export default App;
