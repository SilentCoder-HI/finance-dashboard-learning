import { useMemo, useState } from "react";
import type { SortingState } from "@tanstack/react-table";
import { Box, Button, Chip, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
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
} from "@tanstack/react-table";

import { useAppSelector } from "../../store";
import { getInvoicesByCompany, getSuperUserData } from "@Data/data";
import { MetricCard } from "@Components/ui/cards";

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
  const user = useAppSelector((state) => state.auth.user);

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);

  const invoices = useMemo(() => {
    if (!user) return [];
    if (user.role === "superadmin") return getSuperUserData().invoices;
    if (!user.companyId) return [];
    return getInvoicesByCompany(String(user.companyId));
  }, [user]);

  const data = useMemo(() => invoices, [invoices]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("invoiceNumber", { header: "Invoice ID" }),
      columnHelper.accessor("issueDate", { header: "Issue Date" }),
      columnHelper.accessor("dueDate", { header: "Due Date" }),
      columnHelper.accessor("customerName", { header: "Customer" }),
      columnHelper.accessor("description", { header: "Description" }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => `$${Number(info.getValue()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      }),
      columnHelper.accessor("paidAmount", {
        header: "Paid",
        cell: (info) => `$${Number(info.getValue()).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const status = info.getValue();
          let color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' = 'default';

          if (status === 'paid') color = 'success';
          else if (status === 'pending') color = 'secondary';
          else if (status === 'overdue') color = 'error';
          else if (status === 'draft') color = 'info';
          else if (status === 'cancelled') color = 'warning';

          return (
            <Chip
              label={status}
              color={color}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />
          );
        },
      }),
    ],
    []
  );

  const table = useTable({
    data,
    columns,
    features,
    state: { globalFilter, pagination, sorting },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
  });

  if (!user) return <Box sx={{ p: 4 }}>Please log in.</Box>;

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Invoices ({data.length})</Typography>
        <TextField size="small" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search" />
      </Box>
      <Box className="grid grid-cols-3 gap-9 my-10">
        <MetricCard design=" p-5" title="Total Rev" value="2" accent="balck"/>
        <MetricCard design=" p-5" title="Total Rev" value="2" accent="balck"/>
        <MetricCard design=" p-5" title="Total Rev" value="2" accent="balck"/>
      </Box>
      <Paper variant="outlined" sx={{ overflow: "hidden" }}>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableCell key={h.id} onClick={h.column.getToggleSortingHandler()} sx={{ fontWeight: 700, cursor: "pointer" }}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous</Button>
        <Typography>Page {table.state.pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}</Typography>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </Box>
    </Box>
  );
}
