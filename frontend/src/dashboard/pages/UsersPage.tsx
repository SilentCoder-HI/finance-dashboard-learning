import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../store";
import { getUsersByCompany, getSuperUserData } from "@Data/data";
import { fetchCompanyusers } from "../../src/services/userService";
import { Button, TableRow, TableCell, TableBody } from "@mui/material";
import {
  createColumnHelper,
  columnVisibilityFeature,
  flexRender,
  tableFeatures,
  useTable
} from "@tanstack/react-table";
import { Edit } from "lucide-react";
export interface User {
  _id?: string;
  id?: string;
  name: string;
  username: string;
  email: string;
  role: string;
  companyId?: string | { _id: string; name: string } | null;
  isActive: boolean;
}
const columnHelper = createColumnHelper<any, any>();
const features = tableFeatures({
  columnVisibilityFeature,
})



export default function UsersPage() {
  const [user, setUser] = useState<User[]>([])
  const [loading, setloading] = useState(true)
  const [error, setError] = useState("")

  const data = user
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "Row Number",
        header: "#",
        cell: ({ row }) => row.index + 1
      }),
      columnHelper.accessor('name', { header: "Name" }),
      columnHelper.accessor('email', { header: "Email" }),
      columnHelper.accessor('role', { header: "Role" }),
      columnHelper.accessor('isActive', { header: "Status" }),
      columnHelper.display({
        id: "Manage",
        header: "Manage",
        cell: ({ row }) => (

          <Edit className="text-blue-400 cursor-pointer" />
        )
      })
    ],
    []
  )


  const table = useTable({
    data,
    columns,
    features,
  })
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setError("");
        const rows = await Promise.all([
          fetchCompanyusers(),
          new Promise((resolve) => setTimeout(resolve, 1500))
        ])
        setUser(rows ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setloading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="overflow-x-auto rounded-2xl border border-white/50 bg-white/40 shadow-lg backdrop-blur-xl">
        <table className="w-full text-left text-sm">
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableCell key={h.id} sx={{ fontWeight: 700, cursor: "pointer" }}>
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableBody>
            {loading ? (
              [0, 1, 2, 3, 4, 5].map((row) => (
                <TableRow key={row}>
                  {["w-6", "w-32", "w-44", "w-20", "w-16", "w-6"].map((width, cell) => (
                    <TableCell key={cell}>
                      <div
                        className={`h-4 ${width} animate-pulse rounded-md bg-gray-300/60`}
                        style={{ animationDelay: `${row * 120}ms` }}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </table>
      </div>
    </div >
  );
}
