import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
} from "@tanstack/react-table";
import {
  Table as TremorTable,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Flex,
  Text,
} from "@tremor/react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";

export function Table<T>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnDef<T>[];
}) {
  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 5 } },
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <TremorTable marginTop="mt-6">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeaderCell
                    key={header.id}
                    textAlignment={
                      header.column.id === "amount_in_usdt"
                        ? "text-right"
                        : "text-left"
                    }
                    //   colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHeaderCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell
                      key={cell.id}
                      textAlignment={
                        cell.column.id === "amount_in_usdt"
                          ? "text-right"
                          : "text-left"
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </TremorTable>
      <div className="h-2" />
      <Flex justifyContent="justify-end">
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft
              color={!table.getCanPreviousPage() ? "#6B7280" : "#374151"}
              size={24}
            />
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft
              color={!table.getCanPreviousPage() ? "#6B7280" : "#374151"}
              size={24}
            />
          </button>
        </div>
        <span className="flex items-center gap-1 mx-4">
          <Text>Page</Text>
          <Text>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Text>
        </span>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight
            color={!table.getCanNextPage() ? "#6B7280" : "#374151"}
            size={24}
          />
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight
            color={!table.getCanNextPage() ? "#6B7280" : "#374151"}
            size={24}
          />
        </button>
      </Flex>
    </div>
  );
}
