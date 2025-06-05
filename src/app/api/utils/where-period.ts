import { Period } from "@/period";

/**
 * Hacky solution to an urgent problem: Querying by period.
 * You can use this function to create a WHERE clause from a Period,
 * as long as you have joined with `transactions tr` (with that alias).
 * It is the transactions relation that has the date attribute.
 */
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