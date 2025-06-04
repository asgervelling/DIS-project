"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.integer = void 0;
const arcsecond_1 = require("arcsecond");
const digits_1 = require("./digits");
/**
 * <integer>     ::= '"' <int> '"'
 * <int>         ::= "0" | <signedInt>
 * <signedInt>   ::= <negativeInt> | <positiveInt>
 * <negativeInt> ::= "-" <positiveInt>
 * <positiveInt> ::= <nonzero> <digits>
 * <digits>      ::= <digit> <digits> | ε
 * <nonZero>     ::= "1" | "2" | ... | "9"
 * <digit>       ::= "0" | <nonZero>
 */
const positiveInt = (0, arcsecond_1.sequenceOf)([digits_1.nonZero, digits_1.digits])
    .map((xs) => xs.join(""));
const negativeInt = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)("-"), positiveInt])
    .map((xs) => xs.join(""));
const signedInt = (0, arcsecond_1.choice)([negativeInt, positiveInt]);
const int = (0, arcsecond_1.choice)([(0, arcsecond_1.char)("0"), signedInt]);
exports.integer = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)('"'), int, (0, arcsecond_1.char)('"')])
    .map(([, n,]) => Number(n));
// console.log(positiveInt.run("123"));
// console.log(positiveInt.run("0123"));
// console.log(positiveInt.run("100123"));
// console.log(negativeInt.run("100123"));
// console.log(negativeInt.run("-100123"));
// console.log(negativeInt.run("-0"));
