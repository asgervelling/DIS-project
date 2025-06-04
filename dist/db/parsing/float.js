"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.float = void 0;
/**
 * <float>           ::= '"' <decimal> '"'
 * <decimal>         ::= "0" <frac> | <signedDecimal>
 * <signedDecimal>   ::= <negativeDecimal> | <positiveDecimal>
 * <negativeDecimal> ::= "-" <positiveDecimal>
 * <positiveDecimal> ::= <nonzero> <digits> <frac>
 * <frac>            ::= "." <digits>
 * <digits>          ::= <digit> <digits> | ε
 * <nonZero>         ::= "1" | "2" | ... | "9"
 * <digit>           ::= "0" | <nonZero>
*/
const arcsecond_1 = require("arcsecond");
const digits_1 = require("./digits");
const frac = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)("."), digits_1.digits])
    .map((xs) => xs.join(""));
const positiveDecimal = (0, arcsecond_1.sequenceOf)([digits_1.nonZero, digits_1.digits, frac])
    .map((xs) => xs.join(""));
const negativeDecimal = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)("-"), positiveDecimal])
    .map((xs) => xs.join(""));
const signedDecimal = (0, arcsecond_1.choice)([negativeDecimal, positiveDecimal]);
const decimal = (0, arcsecond_1.choice)([
    (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)("0"), frac]).map((xs) => xs.join("")),
    signedDecimal
]);
exports.float = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)('"'), decimal, (0, arcsecond_1.char)('"')])
    .map(([, f,]) => Number(f));
// console.log(float.run('"0.0"'));
// console.log(float.run('"2.324001"'));
// console.log(float.run('"-2.324001"'));
// console.log(float.run('"0.123456"'));
// console.log(float.run('"0"'));
// console.log(float.run('"-0.00"'));
// console.log(float.run('".1"'));
// console.log(float.run('"1"'));
