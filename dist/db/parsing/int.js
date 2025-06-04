"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arcsecond_1 = require("arcsecond");
/**
 * <int>         ::= "0" | <signedInt>
 * <signedInt>   ::= <negativeInt> | <positiveInt>
 * <negativeInt> ::= "-" <positiveInt>
 * <positiveInt> ::= <nonzero> <digits>
 * <digits>      ::= <digit> <digits> | ε
 * <nonZero>     ::= "1" | "2" | ... | "9"
 * <digit>       ::= "0" | <nonZero>
 */
const digit = (0, arcsecond_1.choice)([
    (0, arcsecond_1.char)("0"), (0, arcsecond_1.char)("1"), (0, arcsecond_1.char)("2"), (0, arcsecond_1.char)("3"), (0, arcsecond_1.char)("4"),
    (0, arcsecond_1.char)("5"), (0, arcsecond_1.char)("6"), (0, arcsecond_1.char)("7"), (0, arcsecond_1.char)("8"), (0, arcsecond_1.char)("9")
]);
const nonZero = (0, arcsecond_1.choice)([
    (0, arcsecond_1.char)("1"), (0, arcsecond_1.char)("2"), (0, arcsecond_1.char)("3"), (0, arcsecond_1.char)("4"),
    (0, arcsecond_1.char)("5"), (0, arcsecond_1.char)("6"), (0, arcsecond_1.char)("7"), (0, arcsecond_1.char)("8"), (0, arcsecond_1.char)("9")
]);
const digits = (0, arcsecond_1.many)(digit)
    .map((xs) => xs.join(""));
const positiveInt = (0, arcsecond_1.sequenceOf)([nonZero, digits])
    .map((xs) => xs.join(""));
const negativeInt = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)("-"), positiveInt])
    .map((xs) => xs.join(""));
console.log(positiveInt.run("123"));
console.log(positiveInt.run("0123"));
console.log(positiveInt.run("100123"));
console.log(negativeInt.run("100123"));
console.log(negativeInt.run("-100123"));
console.log(negativeInt.run("-0"));
