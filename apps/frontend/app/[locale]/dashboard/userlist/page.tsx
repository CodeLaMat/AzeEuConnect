"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchAllManagedUsers } from "@/store/adminUserSlice";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ManageUsersTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector(
    (state: RootState) => state.adminUsers
  );
  const t = useTranslations("dashboard.manageUsers.userList");
  const locale = useLocale();
  const router = useRouter();

  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    dispatch(fetchAllManagedUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const roleMatch =
        roleFilter === "ALL" || user.role?.name?.toUpperCase() === roleFilter;
      return roleMatch;
    });
  }, [users, roleFilter]);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: t("name"),
        accessorFn: (row) =>
          `${row.profile?.firstName || ""} ${row.profile?.lastName || ""}`,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.profile?.image || ""} />
              <AvatarFallback>
                {row.original.profile?.firstName?.[0]}
                {row.original.profile?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <span>{`${row.original.profile?.firstName || ""} ${
              row.original.profile?.lastName || ""
            }`}</span>
          </div>
        ),
      },
      {
        header: t("email"),
        accessorKey: "email",
      },
      {
        header: t("role"),
        accessorFn: (row) => row.role?.name,
      },
      {
        header: t("phone"),
        accessorFn: (row) => row.profile?.phone || "-",
      },
      {
        header: t("nationality"),
        accessorFn: (row) => row.profile?.nationality || "-",
      },
      {
        header: t("language"),
        accessorFn: (row) => row.profile?.preferredLanguage || "-",
      },
      {
        header: t("actions.edit"),
        cell: ({ row }) => (
          <button
            onClick={() =>
              router.push(
                `/${locale}/dashboard/manage-users/${row.original.id}`
              )
            }
            className="text-blue-600 hover:underline font-medium"
          >
            {t("actions.edit")}
          </button>
        ),
      },
    ],
    [locale, router, t]
  );

  const table = useReactTable({
    data: filteredUsers,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-3xl font-bold text-blue-700">{t("title")}</h2>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder={t("email")}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-xs"
          />

          <Tabs defaultValue="ALL" onValueChange={setRoleFilter}>
            <TabsList>
              <TabsTrigger value="ALL">All</TabsTrigger>
              <TabsTrigger value="ADMIN">Admin</TabsTrigger>
              <TabsTrigger value="USER">User</TabsTrigger>
              <TabsTrigger value="CONSULTANT">Consultant</TabsTrigger>
              <TabsTrigger value="SERVICE_PROVIDER">Provider</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
