/**
 * <digits>      ::= <digit> <digits> | ε
 * <nonZero>     ::= "1" | "2" | ... | "9"
 * <digit>       ::= "0" | <nonZero>
 */
import { char, choice, many } from "arcsecond";

export const digit = choice([
  char("0"), char("1"), char("2"), char("3"), char("4"),
  char("5"), char("6"), char("7"), char("8"), char("9")
]);
export const nonZero = choice([
  char("1"), char("2"), char("3"), char("4"),
  char("5"), char("6"), char("7"), char("8"), char("9")
]);
export const digits = many(digit)
  .map((xs) => xs.join(""));