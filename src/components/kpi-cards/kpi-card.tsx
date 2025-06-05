import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IntervalPair } from "@/app/api/utils/interval-pair";

export type KPICardProps = {
  label: string;
  value: string | undefined;
} & IntervalPair<number | undefined>;

export default function KPICard({
  label,
  value,
  previous,
  current,
}: KPICardProps) {
  return (
    <Card>
      <CardHeader className="relative">
        <CardDescription>{label}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        <ChangeBadge current={current} previous={previous} />
      </CardHeader>
    </Card>
  );
}

/**
 * Badge that shows change since last Period, i.e. [↗9.23%]
 */
function ChangeBadge({ current, previous }: IntervalPair<number | undefined>) {
  if (current === undefined || previous === undefined || previous === 0) {
    return null;
  }
  
  const pctChange = (current / previous - 1) * 100;

  return (
    <div className="absolute right-4 top-4">
      <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
        {pctChange > 0 ? (
          <>
            <TrendingUpIcon className="size-3" />
            {`+${pctChange.toFixed(2)}%`}
          </>
        ) : (
          <>
            <TrendingDownIcon className="size-3" />
            {`${pctChange.toFixed(2)}%`}
          </>
        )}
      </Badge>
    </div>
  );
}
