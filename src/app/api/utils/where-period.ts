import { Period } from "@/period";

// Give the transaction an alias 'tr'
export function whereClauseOfPeriod(period: Period | string): string {
  switch (period) {
    case "24h": return "WHERE tr.date >= now() - interval '1 day'";
    case "7d": return "WHERE tr.date >= now() - interval '7 days'";
    case "30d": return "WHERE tr.date >= now() - interval '30 days'";
    case "ytd": return "WHERE tr.date >= date_trunc('year', now())";
    case "1y": return "WHERE tr.date >= now() - interval '1 year'";
    case "all": return "";
    default: throw new Error("Invalid period " + period);
  }
}