"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePeriod } from "@/context/period-context";
import { useKpi } from "@/hooks/use-kpi";
import { SalesTimeSeries } from "@/app/api/sales-over-time/route";

const chartConfig = {
  visitors: {
    label: "Sales",
  },
  mobile: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function SalesOverTimeChart() {
  const { period } = usePeriod();
  const { data, error, isLoading } = useKpi<SalesTimeSeries>(
    "/api/sales-over-time",
    period
  );

  // if (error) return <>Error: {error}</>;
  // if (isLoading || !data) return <>Loading...</>;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Sales</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last {period}
          </span>
          <span className="@[540px]/card:hidden">Last {period}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          {error ? (
            <>Error: {`${error}`}</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data === undefined ? (
            <>No data.</>
          ) : (
            <AreaChart data={data.sales}>
              <defs>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
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
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="var(--color-border)"
                strokeOpacity={0.8}
              />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis
                dataKey="revenue"
                className="pl-0"
                tickLine={false}
                axisLine={false}
                tick={{ dx: -5 }}
                width={40}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
                    }}
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="revenue"
                type="monotoneX"
                fill="url(#fillMobile)"
                stroke="var(--color-mobile)"
                stackId="a"
                isAnimationActive={false}
              />
            </AreaChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
