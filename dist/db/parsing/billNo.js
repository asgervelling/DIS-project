"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billNo = void 0;
/**
 * <billNo> ::= '"' "G" + <digit> <digit> <digit> <digit> <digit> <digit> <digit> '"'
 */
const arcsecond_1 = require("arcsecond");
const billNoInner = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)("G"), arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit])
    .map((xs) => xs.join(""));
exports.billNo = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)('"'), billNoInner, (0, arcsecond_1.char)('"')])
    .map(([, b,]) => b);
console.log(exports.billNo.run('"G0470115"'));
