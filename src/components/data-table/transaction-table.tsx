"use client";
import { usePeriod } from "@/context/period-context";
import { DataTable } from ".";
import { columns } from "./columns";
import { useKpi } from "@/hooks/use-kpi";
import { Transactions } from "@/app/api/transactions/route";

export default function TransactionTable() {
  const { period } = usePeriod();
  const { data, error, isLoading } = useKpi<Transactions>(
    "/api/transactions",
    period
  );

  if (error) return <>Error: {error}</>;
  if (isLoading) return <DataTable columns={columns} data={[]} />
  if (!data) return <>[404]</>;

  return <DataTable columns={columns} data={data.transactions} />
}
