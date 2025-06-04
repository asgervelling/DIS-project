"use client";

import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SampleChart } from "@/components/sample-chart";
import { DataTable } from "@/components/data-table";
import * as mockData from "@/components/data-table/mock-data";
import { columns } from "@/components/data-table/columns";
import { PeriodPicker } from "@/components/period-picker";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {/* Row 0 */}
          <div className="grid md:grid-cols-4">
            <PeriodPicker />
          </div>
          {/* Row 1 */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            {/* <DummyKPICard
              label="Total Revenue"
              value="$1250.23"
              pctChange={9.34}
            /> */}
            <DummyCard />
            <DummyKPICard
              label="Total Cost"
              value="$387.98"
              pctChange={-2.61}
            />
            <DummyKPICard
              label="Total Profit"
              value="$862.25"
              pctChange={5.44}
            />
            <DummyKPICard
              label="Profit Margin"
              value="69.97%"
              pctChange={3.12}
            />
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

type DummyKPICardProps = {
  label: string;
  value: string;
  pctChange: number;
};

function DummyKPICard({ label, value, pctChange }: DummyKPICardProps) {
  return (
    <Card>
      <CardHeader className="relative">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {pctChange === 0 ? (
              <>
                <MinusIcon className="size-3" />
                {`+${pctChange}%`}
              </>
            ) : pctChange > 0 ? (
              <>
                <TrendingUpIcon className="size-3" />
                {`+${pctChange}%`}
              </>
            ) : (
              <>
                <TrendingDownIcon className="size-3" />
                {`${pctChange}%`}
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      {/* <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

function DummyCard() {
  return (
    <Card>
      <CardHeader className="relative">
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          $1,250.00
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
            +12.5%
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
