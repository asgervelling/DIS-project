import { PosRecord } from "./pos-record";

export function toCsvRecord(r: PosRecord): string {
  return [
    r.date, r.billNo, r.itemDesc, r.quantity, r.rate,
    r.tax, r.discount, r.total, r.category
  ].join(",").split(",").map((s) => `"${s}"`).join(",");
}