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
  between,
  char,
  choice,
  many,
  sequenceOf,
  str,
} from "arcsecond";

const unescapedChar = anyCharExcept(char('"'));
const escapedQuote = sequenceOf([str("\\"), anyOfString(`"'`)])
  .map((xs) => xs.join(""));
const character = choice([escapedQuote, unescapedChar]);
const characters = many(character);
const doubleQuotedString = between(char('"'))(char('"'))(characters);
