"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./pos-record"), exports);
__exportStar(require("./parse-error"), exports);
// import { posRecord } from "./pos-record";
// const last_row_result = posRecord.run('"Thu Apr 01 2010 16:54:32 GMT+0200 (Central European Summer Time)","G0470140","MIAMI MELONS                  ","1","85","20.19","0","105.19","BEVERAGE"');
// if (!last_row_result.isError) {
//   console.log(last_row_result.result);
//   console.log("Success");
// } else {
//   console.log(last_row_result);
// }
