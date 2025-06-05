import { Period } from "@/period";

export type IntervalPair<T> = { current: T; previous: T };

const p: IntervalPair<{ total_revenue: string | undefined }> = {
  current: { total_revenue: "0" },
  previous: { total_revenue: undefined }
}

/**
 * Given a Period, return two SQL intervals,
 * - One for the Period selected, and
 * - one for the period before the most recent period
 *   of the same length.
 * 
 * Return an IntervalPair, where `previous` and `current`
 * are conditions for WHERE clauses.
 */
export function intervalPair(period: Period | string): IntervalPair<string> {
  switch (period) {
    case "24h":
      return {
        current: "tr.date >= now() - interval '1 day'",
        previous: "tr.date >= now() - interval '2 day' AND tr.date < now() - interval '1 day'"
      };
    case "7d":
      return {
        current: "tr.date >= now() - interval '7 days'",
        previous: "tr.date >= now() - interval '14 days' AND tr.date < now() - interval '7 days'"
      };
    case "30d":
      return {
        current: "tr.date >= now() - interval '30 days'",
        previous: "tr.date >= now() - interval '60 days' AND tr.date < now() - interval '30 days'"
      };
    case "1y":
      return {
        current: "tr.date >= now() - interval '1 year'",
        previous: "tr.date >= now() - interval '2 years' AND tr.date < now() - interval '1 year'"
      };
    default:
      throw new Error("Invalid period " + period);
  }
}
