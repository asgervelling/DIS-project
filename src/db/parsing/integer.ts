import { char, choice, many, sequenceOf } from "arcsecond";

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
const digit = choice([
  char("0"), char("1"), char("2"), char("3"), char("4"),
  char("5"), char("6"), char("7"), char("8"), char("9")
]);
const nonZero = choice([
  char("1"), char("2"), char("3"), char("4"),
  char("5"), char("6"), char("7"), char("8"), char("9")
]);
const digits = many(digit)
  .map((xs) => xs.join(""));
const positiveInt = sequenceOf([nonZero, digits])
  .map((xs) => xs.join(""));
const negativeInt = sequenceOf([char("-"), positiveInt])
  .map((xs) => xs.join(""));
const signedInt = choice([negativeInt, positiveInt]);
const int = choice([char("0"), signedInt]);

export const integer = sequenceOf([char('"'), int, char('"')])
  .map(([, n, ]) => Number(n));

// console.log(positiveInt.run("123"));
// console.log(positiveInt.run("0123"));
// console.log(positiveInt.run("100123"));
// console.log(negativeInt.run("100123"));
// console.log(negativeInt.run("-100123"));
// console.log(negativeInt.run("-0"));