"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.digits = exports.nonZero = exports.digit = void 0;
/**
 * <digits>      ::= <digit> <digits> | ε
 * <nonZero>     ::= "1" | "2" | ... | "9"
 * <digit>       ::= "0" | <nonZero>
 */
const arcsecond_1 = require("arcsecond");
exports.digit = (0, arcsecond_1.choice)([
    (0, arcsecond_1.char)("0"), (0, arcsecond_1.char)("1"), (0, arcsecond_1.char)("2"), (0, arcsecond_1.char)("3"), (0, arcsecond_1.char)("4"),
    (0, arcsecond_1.char)("5"), (0, arcsecond_1.char)("6"), (0, arcsecond_1.char)("7"), (0, arcsecond_1.char)("8"), (0, arcsecond_1.char)("9")
]);
exports.nonZero = (0, arcsecond_1.choice)([
    (0, arcsecond_1.char)("1"), (0, arcsecond_1.char)("2"), (0, arcsecond_1.char)("3"), (0, arcsecond_1.char)("4"),
    (0, arcsecond_1.char)("5"), (0, arcsecond_1.char)("6"), (0, arcsecond_1.char)("7"), (0, arcsecond_1.char)("8"), (0, arcsecond_1.char)("9")
]);
exports.digits = (0, arcsecond_1.many)(exports.digit)
    .map((xs) => xs.join(""));
