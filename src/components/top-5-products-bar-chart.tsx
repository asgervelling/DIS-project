"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Top5Products } from "@/app/api/top-5-products/route";
import { useKpi } from "@/hooks/use-kpi";
import { usePeriod } from "@/context/period-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

const chartConfig = {
  profit: {
    label: "Profit",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export default function Top5ProductsBarChart() {
  const { period } = usePeriod();
  const { data, error, isLoading } = useKpi<Top5Products>(
    "/api/top-5-products",
    period
  );

  if (error) return <>Error: {error}</>;
  if (isLoading) return <>Loading...</>;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Top 5 Products by Profit</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            In the last {period}
          </span>
          <span className="@[540px]/card:hidden">Last {period}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart data={data?.top5}>
              <defs>
                <linearGradient id="fillProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-chart-1)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="item"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  value.length > 10 ? value.slice(0, 10) + "…" : value
                }
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => value}
                    formatter={(value) => `Profit: ${Number(value).toFixed(2)}`}
                  />
                }
              />
              <Bar
                dataKey="profit"
                fill="url(#fillProfit)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
}
