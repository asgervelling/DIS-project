"use client";
import { PeriodPicker } from "@/components/period-picker";
import * as kpiCards from "@/components/kpi-cards";
import { SalesOverTimeChart } from "@/components/sales-over-time-chart";
import Top5ProductsBarChart from "@/components/top-5-products-bar-chart";
import TransactionTable from "@/components/data-table/transaction-table";

export default function Page() {
  return (
    <>
      {/* Row 0 */}
      <div className="flex flex-1 flex-row-reverse">
        <PeriodPicker />
      </div>
      {/* Row 1 */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <kpiCards.TotalRevenue />
        <kpiCards.TotalCost />
        <kpiCards.TotalProfit />
        <kpiCards.ProfitMargin />
      </div>
      {/* Row 2 */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <SalesOverTimeChart />
        <Top5ProductsBarChart />
      </div>
      {/* Row 3 */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <TransactionTable />
      </div>
    </>
  );
}
