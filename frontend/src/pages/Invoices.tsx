import { useMemo, useState } from 'react';
import type { SortingState } from '@tanstack/react-table';
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table';

import { invoices } from '../data/invoices';
import type { Invoice } from '../types/invoice';
import { MetricCard } from '../components/ui/cards';
const features = tableFeatures({
  columnVisibilityFeature,
  globalFilteringFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
});

const columnHelper = createColumnHelper<any, any>();

export function Invoices() {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo<Invoice[]>(() => invoices, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'Invoice ID',
        cell: (info) => <Typography variant="body2" sx={{ fontWeight: 700 }}>{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: (info) => <Typography variant="body2">{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('customer', {
        header: 'Customer',
        cell: (info) => <Typography variant="body2">{info.getValue()}</Typography>,
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
        cell: (info) => <Typography variant="body2">${info.getValue().toFixed(2)}</Typography>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';

          if (status === 'Paid') color = 'success';
          else if (status === 'Pending') color = 'secondary';
          else if (status === 'Overdue') color = 'error';
          else if (status === 'Draft') color = 'info';

          return <Chip label={status} color={color} size="small" />;
        },
      }),
    ],
    []
  );

  const table = useTable({
    data,
    columns,
    features,
    state: {
      globalFilter,
      pagination,
      sorting,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue ?? '').trim().toLowerCase();
      if (!search) return true;

      const id = String(row.getValue<string>('id') ?? '').toLowerCase();
      const customer = String(row.getValue<string>('customer') ?? '').toLowerCase();
      return id.includes(search) || customer.includes(search);
    },
  });

  const totalRevenue = data.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidCount = data.filter((invoice) => invoice.status === 'Paid').length;
  const overdueCount = data.filter((invoice) => invoice.status === 'Overdue').length;
  const averageInvoice = data.length ? totalRevenue / data.length : 0;

  const rows = table.getRowModel().rows;

  return (
    <Box sx={{ p: 4, background: '#f8fafc', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: 1300, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
              Invoices
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569' }}>
              Search, sort, and review invoice records
            </Typography>
          </Box>
          <TextField
            size="small"
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Search by ID or customer"
            sx={{ minWidth: 280, backgroundColor: '#fff' }}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 4 }}>
          <MetricCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} accent="#6366f1" />
          <MetricCard title="Paid Invoices" value={String(paidCount)} accent="#22c55e" />
          <MetricCard title="Overdue" value={String(overdueCount)} accent="#ef4444" />
          <MetricCard title="Average Invoice" value={`$${averageInvoice.toFixed(2)}`} accent="#f59e0b" />
        </Box>
        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table size="small">
            <TableHead sx={{ backgroundColor: '#eef2ff' }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      sx={{
                        fontWeight: 700,
                        color: '#334155',
                        cursor: header.column.getCanSort() ? 'pointer' : 'default',
                        userSelect: 'none',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b' }}>
                          {header.column.getIsSorted() === 'asc'
                            ? '↑'
                            : header.column.getIsSorted() === 'desc'
                              ? '↓'
                              : '↕'}
                        </Typography>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id} hover>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                    No invoices match the current filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, flexWrap: 'wrap', gap: 2 }}>
          <Button variant="outlined" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600 }}>
            Page {table.state.pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
          </Typography>
          <Button variant="outlined" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
