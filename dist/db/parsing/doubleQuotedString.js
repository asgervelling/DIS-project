"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doubleQuotedString = void 0;
/**
 * <doubleQuotedString> ::= '"' <characters> '"'
 * <characters>         ::= <character> <characters> | ε
 * <character>          ::= <escapedQuote> | <unescapedChar>
 * <escapedQuote>       ::= '\' '"' | '\' "'"
 * <unescapedChar>      ::= ? any character except '"' ?
 */
const arcsecond_1 = require("arcsecond");
const unescapedChar = (0, arcsecond_1.anyCharExcept)((0, arcsecond_1.char)('"'))
    .map((x) => `${x}`);
const escapedQuote = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.str)("\\"), (0, arcsecond_1.anyOfString)(`"'`)])
    .map((xs) => xs.join(""));
const character = (0, arcsecond_1.choice)([escapedQuote, unescapedChar]);
const characters = (0, arcsecond_1.many)(character)
    .map((xs) => xs.join(""));
exports.doubleQuotedString = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)('"'), characters, (0, arcsecond_1.char)('"')])
    .map(([, string,]) => string.trim());
