"use client";
import { RevenuePair } from "@/app/api/total-revenue/route";
import { usePeriod } from "@/context/period-context";
import { useKpi } from "@/hooks/use-kpi";
import KPICard from "./kpi-card";

export default function TotalRevenue() {
  const { period } = usePeriod();
  const { data, error, isLoading } = useKpi<RevenuePair>(
    "/api/total-revenue",
    period
  );

  if (isLoading || error || !data)
    return (
      <KPICard
        label="Total Revenue"
        value={isLoading ? "Loading..." : error ? `${String(error).slice(0, 23)}` : "-"}
        current={undefined}
        previous={undefined}
      />
    );

  const current = Number(data.current.total_revenue);
  const previous = Number(data.previous.total_revenue);

  if (!Number.isFinite(current) || !Number.isFinite(previous)) {
    return (
      <KPICard
        label="Total Revenue"
        value={Number.isFinite(current) ? `$${current.toFixed(2)}` : "-"}
        current={current}
        previous={previous}
      />
    );
  } else {
    return (
      <KPICard
        label="Total Revenue"
        value={`₹${current.toFixed(2)}`}
        current={current}
        previous={previous}
      />
    );
  }
}
