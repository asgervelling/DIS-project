"use client";
import { usePeriod } from "@/context/period-context";
import { useKpi } from "@/hooks/use-kpi";
import KPICard from "./kpi-card";
import { CostPair } from "@/app/api/total-cost/route";

export default function TotalCost() {
  const { period } = usePeriod();
  const { data, error, isLoading } = useKpi<CostPair>(
    "/api/total-cost",
    period
  );

  if (isLoading || error || !data)
    return (
      <KPICard
        label="Profit Margin"
        value={isLoading ? "Loading..." : error ? `${String(error).slice(0, 23)}` : "-"}
        current={undefined}
        previous={undefined}
      />
    );

  const current = Number(data.current.total_cost);
  const previous = Number(data.previous.total_cost);

  console.log("Total cost:", period, current, previous);

  if (!Number.isFinite(current) || !Number.isFinite(previous)) {
    return (
      <KPICard
        label="Total Cost"
        value={Number.isFinite(current) ? `$${current.toFixed(2)}` : "-"}
        current={current}
        previous={previous}
      />
    );
  } else {
    return (
      <KPICard
        label="Total Cost"
        value={`₹${current.toFixed(2)}`}
        current={current}
        previous={previous}
      />
    );
  }
}
