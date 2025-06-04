"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.date = void 0;
/**
 * <date> ::= '"' <innerDate> '"'
 *
 * <innerDate>  ::= <dayOfWeek> " " <month> " " <day> " " <year> " " <time> " " <tzOffset> " " <tzName>
 * <dayOfWeek>  ::= "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
 * <month>      ::= "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec"
 * <day>        ::= <digit> <digit>
 * <year>       ::= <digit> <digit> <digit> <digit>
 * <time>       ::= <digit> <digit> ":" <digit> <digit> ":" <digit> <digit>
 * <tzOffset>   ::= "GMT" <sign> <digit> <digit> <digit> <digit>
 * <tzName>     ::= "(" <tzChars> ")"
 * <tzChars>    ::= <tzChar> <tzChars> | ε
 * <tzChar>     ::= <letter> | " "
 * <letter>     ::= "A" | "B" | ... | "Z" | "a" | "b" | ... | "z"
 * <digit>      ::= "0" | "1" | ... | "9"
 * <sign>       ::= "+" | "-"
 */
const arcsecond_1 = require("arcsecond");
const sign = (0, arcsecond_1.choice)([(0, arcsecond_1.char)("+"), (0, arcsecond_1.char)("-")]);
const tzChar = (0, arcsecond_1.choice)([arcsecond_1.letter, (0, arcsecond_1.char)(" ")]);
const tzChars = (0, arcsecond_1.many)(tzChar)
    .map((xs) => xs.join(""));
const tzName = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)("("), tzChars, (0, arcsecond_1.char)(")")])
    .map(([p0, name, p1]) => `${p0}${name}${p1}`);
const tzOffset = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.str)("GMT"), sign, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit])
    .map((xs) => xs.join(""));
const time = (0, arcsecond_1.sequenceOf)([arcsecond_1.digit, arcsecond_1.digit, (0, arcsecond_1.char)(":"), arcsecond_1.digit, arcsecond_1.digit, (0, arcsecond_1.char)(":"), arcsecond_1.digit, arcsecond_1.digit])
    .map((xs) => xs.join(""));
const year = (0, arcsecond_1.sequenceOf)([arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit, arcsecond_1.digit])
    .map((xs) => xs.join(""));
const month = (0, arcsecond_1.choice)([
    (0, arcsecond_1.str)("Jan"), (0, arcsecond_1.str)("Feb"), (0, arcsecond_1.str)("Mar"),
    (0, arcsecond_1.str)("Apr"), (0, arcsecond_1.str)("May"), (0, arcsecond_1.str)("Jun"),
    (0, arcsecond_1.str)("Jul"), (0, arcsecond_1.str)("Aug"), (0, arcsecond_1.str)("Sep"),
    (0, arcsecond_1.str)("Oct"), (0, arcsecond_1.str)("Nov"), (0, arcsecond_1.str)("Dec"),
]);
const day = (0, arcsecond_1.sequenceOf)([arcsecond_1.digit, arcsecond_1.digit])
    .map((xs) => xs.join(""));
const dayOfWeek = (0, arcsecond_1.choice)([
    (0, arcsecond_1.str)("Mon"), (0, arcsecond_1.str)("Tue"), (0, arcsecond_1.str)("Wed"),
    (0, arcsecond_1.str)("Thu"), (0, arcsecond_1.str)("Fri"), (0, arcsecond_1.str)("Sat"),
    (0, arcsecond_1.str)("Sun"),
]);
const innerDate = (0, arcsecond_1.sequenceOf)([
    dayOfWeek, (0, arcsecond_1.char)(" "), month, (0, arcsecond_1.char)(" "), day, (0, arcsecond_1.char)(" "),
    year, (0, arcsecond_1.char)(" "), time, (0, arcsecond_1.char)(" "), tzOffset, (0, arcsecond_1.char)(" "), tzName
]).map((xs) => xs.join(""));
exports.date = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.char)('"'), innerDate, (0, arcsecond_1.char)('"')])
    .map(([, d,]) => new Date(d));
// console.log(date.run('"Thu Apr 01 2010 15:15:11 GMT+0200 (Central European Summer Time)"'));
