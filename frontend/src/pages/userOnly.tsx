import { Box, Chip, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography, type SelectChangeEvent } from '@mui/material';
import { MetricCard } from '../components/ui/cards';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../store/store';
import type { Invoice } from '../types/invoice';

const statuses = ['All', 'Paid', 'Pending', 'Overdue', 'Draft'] as const;

export function UserOnly() {

    const user = useAppSelector((state) => state.auth.user)
    const [invoices, setInvoices] = useState<Invoice[]>([])

    const loadData = async () => {
        try {
            const res = await fetch("http://localhost:2000/invoices", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({})
            })
            console.log(res)
            const data = (await res.json()) as Invoice[]
            if (!res.ok) {
                return null
            }
            setInvoices(data)
        } catch (error) {

        }
    }

    useEffect(() => {
        loadData();
    })

    const [selectedCustomer, setSelectedCustomer] = useState(user?.name ?? '');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<(typeof statuses)[number]>('All');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedCustomer(event.target.value);
    };

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatusFilter(event.target.value as (typeof statuses)[number]);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const customerInvoices = useMemo(
        () => invoices.filter((invoice) => invoice.customer === selectedCustomer),
        [selectedCustomer],
    );

    const data = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return customerInvoices.filter((invoice) => {
            const matchesStatus = statusFilter === 'All' || invoice.status === statusFilter;
            const matchesSearch =
                !query ||
                invoice.id.toLowerCase().includes(query) ||
                invoice.customer.toLowerCase().includes(query) ||
                invoice.status.toLowerCase().includes(query) ||
                invoice.date.toLowerCase().includes(query);

            return matchesStatus && matchesSearch;
        });
    }, [customerInvoices, searchQuery, statusFilter]);

    const totalAmount = customerInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const paidAmount = customerInvoices
        .filter((invoice) => invoice.status === 'Paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0);
    const overdueAmount = customerInvoices
        .filter((invoice) => invoice.status === 'Overdue')
        .reduce((sum, invoice) => sum + invoice.amount, 0);

    return (
        <Box sx={{ maxWidth: '100%', mx: 'auto', py: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 2, mb: 3 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        {selectedCustomer || 'Customer invoices'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Filter, search, and review invoices for one customer at a time.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, alignItems: { xs: 'stretch', sm: 'center' } }}>
                    <input
                        type="text"
                        placeholder="Search invoices"
                        value={searchQuery}
                        onChange={handleSearch}
                        style={{
                            width: '100%',
                            minWidth: 220,
                            padding: '8.5px 14px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            outline: 'none',
                            background: 'white',
                            color: 'black'
                        }}
                    />

                    <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            value={statusFilter}
                            label="Status"
                            onChange={handleStatusChange}
                        >
                            {statuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 4 }}>
                <MetricCard accent="#6366f1" title="Total" value={`$${totalAmount.toFixed(2)}`} />
                <MetricCard accent="#22c55e" title="Paid" value={`$${paidAmount.toFixed(2)}`} />
                <MetricCard accent="#ef4444" title="Overdue" value={`$${overdueAmount.toFixed(2)}`} />
            </Box>

            <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#eef2ff' }}>
                        <TableRow>
                            {['Invoice ID', 'Date', 'Customer', 'Amount', 'Status'].map((header) => (
                                <TableCell key={header} sx={{ fontWeight: 700, color: '#334155' }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((invoice) => (
                                <TableRow key={invoice.id} hover>
                                    <TableCell>{invoice.id}</TableCell>
                                    <TableCell>{invoice.date}</TableCell>
                                    <TableCell>{invoice.customer}</TableCell>
                                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={invoice.status}
                                            color={
                                                invoice.status === 'Paid'
                                                    ? 'success'
                                                    : invoice.status === 'Pending'
                                                        ? 'secondary'
                                                        : invoice.status === 'Overdue'
                                                            ? 'error'
                                                            : 'info'
                                            }
                                            size="small"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                    No invoices match the current filters.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}
