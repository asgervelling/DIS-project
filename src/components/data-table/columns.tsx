import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "../ui/button";

export type Transaction = {
  date: string;
  billNo: string;
  revenue: number;
  items: number;
  profit: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex align-middle">
          <div className="flex align-middle">Date</div>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a = new Date(rowA.getValue<string>("date")).getTime();
      const b = new Date(rowB.getValue<string>("date")).getTime();
      return a - b;
    },
  },
  {
    accessorKey: "billNo",
    header: "Bill No.",
  },
  {
    accessorKey: "revenue",
    header: () => <div className="text-right">Revenue</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("revenue"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right">{formatted}</div>;
    },
  },
  {
    accessorKey: "items",
    header: () => <div className="text-right">Items</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("items"));
      return <div className="text-right">{amount}</div>;
    },
  },
  {
    accessorKey: "profit",
    header: () => <div className="text-right">Profit</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("profit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
