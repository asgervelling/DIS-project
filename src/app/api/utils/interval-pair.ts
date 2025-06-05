import * as fs from "node:fs";

import { Period } from "@/period";

export type IntervalPair<T> = { current: T; previous: T };

const { cutoff } = JSON.parse(fs.readFileSync("data/cutoff.json", "utf8"));

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
  const cutoffDate = new Date(cutoff);
  const pad = (n: number) => n.toString().padStart(2, "0");

  // Create a timestamp from the cutoff date
  const year = `${cutoffDate.getFullYear()}`;
  const month = pad(cutoffDate.getMonth() + 1);
  const date = pad(cutoffDate.getDate());
  const hour = pad(cutoffDate.getHours());
  const min = pad(cutoffDate.getMinutes());
  const s = pad(cutoffDate.getSeconds());
  const cutoffTimestamp = `timestamp '${year}-${month}-${date} ${hour}:${min}:${s}'`;
  
  switch (period) {
    case "24h":
      return {
        current: `tr.date >= ${cutoffTimestamp} - interval '1 day'`,
        previous: `tr.date >= ${cutoffTimestamp} - interval '2 day' AND tr.date < ${cutoffTimestamp} - interval '1 day'`,
      };
    case "7d":
      return {
        current: `tr.date >= ${cutoffTimestamp} - interval '7 days'`,
        previous: `tr.date >= ${cutoffTimestamp} - interval '14 days' AND tr.date < ${cutoffTimestamp} - interval '7 days'`,
      };
    case "30d":
      return {
        current: `tr.date >= ${cutoffTimestamp} - interval '30 days'`,
        previous: `tr.date >= ${cutoffTimestamp} - interval '60 days' AND tr.date < ${cutoffTimestamp} - interval '30 days'`,
      };
    case "ytd":
      return {
        current: `tr.date >= date_trunc('year', ${cutoffTimestamp})`,
        previous: `tr.date >= date_trunc('year', ${cutoffTimestamp} - interval '1 year') AND tr.date < date_trunc('year', ${cutoffTimestamp})`,
      };
    case "1y":
      return {
        current: `tr.date >= ${cutoffTimestamp} - interval '1 year'`,
        previous: `tr.date >= ${cutoffTimestamp} - interval '2 years' AND tr.date < ${cutoffTimestamp} - interval '1 year'`,
      };
    case "all":
      return {
        current: "true",
        previous: "false",
      };
    default:
      throw new Error("Invalid period " + period);
  }
}
