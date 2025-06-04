"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCsvRecord = toCsvRecord;
function toCsvRecord(r) {
    return [
        r.date, r.billNo, r.itemDesc, r.quantity, r.rate,
        r.tax, r.discount, r.total, r.category
    ].join(",").split(",").map((s) => `"${s}"`).join(",");
}
