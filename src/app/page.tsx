"use client";
import { SampleChart } from "@/components/sample-chart";
import { DataTable } from "@/components/data-table";
import * as mockData from "@/components/data-table/mock-data";
import { columns } from "@/components/data-table/columns";
import { PeriodPicker } from "@/components/period-picker";
import * as kpiCards from "@/components/kpi-cards";

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
        <SampleChart />
        <SampleChart />
      </div>
      {/* Row 3 */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
        <DataTable columns={columns} data={mockData.transactions} />
      </div>
    </>
  );
}
