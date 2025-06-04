/**
 * <doubleQuotedString> ::= '"' <characters> '"'
 * <characters>         ::= <character> <characters> | ε
 * <character>          ::= <escapedQuote> | <unescapedChar>
 * <escapedQuote>       ::= '\' '"' | '\' "'"
 * <unescapedChar>      ::= ? any character except '"' ?
 */
import {
  anyCharExcept,
  anyOfString,
  char,
  choice,
  many,
  sequenceOf,
  str,
} from "arcsecond";

const unescapedChar = anyCharExcept(char('"'))
  .map((x) => `${x}`);
const escapedQuote = sequenceOf([str("\\"), anyOfString(`"'`)])
  .map((xs) => xs.join(""));
const character = choice([escapedQuote, unescapedChar]);
const characters = many(character)
  .map((xs) => xs.join(""));

export const doubleQuotedString =
  sequenceOf([char('"'), characters, char('"')])
  .map(([, string, ]) => string);
