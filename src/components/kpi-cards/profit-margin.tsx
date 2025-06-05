"use client";
import { usePeriod } from "@/context/period-context";
import { useKpi } from "@/hooks/use-kpi";
import KPICard from "./kpi-card";
import { MarginPair } from "@/app/api/profit-margin/route";

export default function ProfitMargin() {
  const { period } = usePeriod();
  const { data, error, isLoading } = useKpi<MarginPair>(
    "/api/profit-margin",
    period
  );

  if (isLoading || error || !data)
    return (
      <KPICard
        label="Total Cost"
        value={isLoading ? "Loading..." : error ? `${String(error).slice(0, 23)}` : "-"}
        current={undefined}
        previous={undefined}
      />
    );

  const current = Number(data.current.profit_margin);
  const previous = Number(data.previous.profit_margin);

  if (!Number.isFinite(current) || !Number.isFinite(previous)) {
    return (
      <KPICard
        label="Profit Margin"
        value={Number.isFinite(current) ? `${current.toFixed(2)}%` : "-"}
        current={current}
        previous={previous}
      />
    );
  }

  return (
    <KPICard
      label="Profit Margin"
      value={`${current.toFixed(2)}%`}
      current={current}
      previous={previous}
    />
  );
}
