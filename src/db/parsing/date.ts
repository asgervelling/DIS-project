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
import { char, choice, digit, letter, many, sequenceOf, str } from "arcsecond";

const sign = choice([char("+"), char("-")]);
const tzChar = choice([letter, char(" ")]);
const tzChars = many(tzChar)
  .map((xs) => xs.join(""));
const tzName = sequenceOf([char("("), tzChars, char(")")])
  .map(([p0, name, p1]) => `${p0}${name}${p1}`);
const tzOffset = sequenceOf([str("GMT"), sign, digit, digit, digit, digit])
  .map((xs) => xs.join(""));
const time = sequenceOf([digit, digit, char(":"), digit, digit, char(":"), digit, digit])
  .map((xs) => xs.join(""));
const year = sequenceOf([digit, digit, digit, digit])
  .map((xs) => xs.join(""));
const month = choice([
  str("Jan"), str("Feb"), str("Mar"),
  str("Apr"), str("May"), str("Jun"),
  str("Jul"), str("Aug"), str("Sep"),
  str("Oct"), str("Nov"), str("Dec"),
]);
const day = sequenceOf([digit, digit])
  .map((xs) => xs.join(""));
const dayOfWeek = choice([
  str("Mon"), str("Tue"), str("Wed"),
  str("Thu"), str("Fri"), str("Sat"),
  str("Sun"),
]);
const innerDate = sequenceOf([
  dayOfWeek, char(" "), month, char(" "), day, char(" "),
  year, char(" "), time, char(" "), tzOffset, char(" "), tzName
]).map((xs) => xs.join(""));

export const date = sequenceOf([char('"'), innerDate, char('"')])
  .map(([, d, ]) => new Date(d));

// console.log(date.run('"Thu Apr 01 2010 15:15:11 GMT+0200 (Central European Summer Time)"'));
