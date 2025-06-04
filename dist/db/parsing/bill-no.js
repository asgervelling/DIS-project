"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billNo = void 0;
/**
 * <billNo> ::= '"' <letter> + <digit> <digit> <digit> <digit> <digit> <digit> <digit> '"'
 */
const arcsecond_1 = require("arcsecond");
const billNoInner = (0, arcsecond_1.sequenceOf)([arcsecond_1.letter, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit])
    .map((xs) => xs.join(""));
exports.billNo = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)('"'), billNoInner, (0, arcsecond_1.char)('"')])
    .map(([, b,]) => b);
// console.log(billNo.run('"G0470115"'))
// console.log(billNo.run('"N0470115"'))
// console.log(billNo.run('"G04701152"'))
