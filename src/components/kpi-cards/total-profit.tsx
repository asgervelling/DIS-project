"use client";
import { usePeriod } from "@/context/period-context";
import { useKpi } from "@/hooks/use-kpi";
import KPICard from "./kpi-card";
import { ProfitPair } from "@/app/api/total-profit/route";

export default function TotalProfit() {
  const { period } = usePeriod();
  const { data, error, isLoading } = useKpi<ProfitPair>(
    "/api/total-profit",
    period
  );

  if (isLoading || error || !data)
    return (
      <KPICard
        label="Total Profit"
        value={isLoading ? "Loading..." : error ? `${String(error).slice(0, 23)}` : "-"}
        current={undefined}
        previous={undefined}
      />
    );

  const current = Number(data.current.total_profit);
  const previous = Number(data.previous.total_profit);

  if (!Number.isFinite(current) || !Number.isFinite(previous)) {
    return (
      <KPICard
        label="Total Profit"
        value={Number.isFinite(current) ? `$${current.toFixed(2)}` : "-"}
        current={current}
        previous={previous}
      />
    );
  } else {
    return (
      <KPICard
        label="Total Profit"
        value={`₹${current.toFixed(2)}`}
        current={current}
        previous={previous}
      />
    );
  }
}
