/**
 * <float>           ::= '"' <decimal> '"'
 * <decimal>         ::= "0" <frac> | <signedDecimal>
 * <signedDecimal>   ::= <negativeDecimal> | <positiveDecimal>
 * <negativeDecimal> ::= "-" <positiveDecimal>
 * <positiveDecimal> ::= <nonzero> <digits> <frac>
 * <frac>            ::= "." <digits>
 * <digits>          ::= <digit> <digits> | ε
 * <nonZero>         ::= "1" | "2" | ... | "9"
 * <digit>           ::= "0" | <nonZero>
*/
import { char, choice, sequenceOf } from "arcsecond";

import { digits, nonZero } from "./digits";

const frac = sequenceOf([char("."), digits])
  .map((xs) => xs.join(""));
const positiveDecimal = sequenceOf([nonZero, digits, frac])
  .map((xs) => xs.join(""));
const negativeDecimal = sequenceOf([char("-"), positiveDecimal])
  .map((xs) => xs.join(""));
const signedDecimal = choice([negativeDecimal, positiveDecimal]);
const decimal = choice([
  sequenceOf([char("0"), frac]).map((xs) => xs.join("")),
  signedDecimal
]);
export const float = sequenceOf([char('"'), decimal, char('"')])
  .map(([, f, ]) => Number(f));

// console.log(float.run('"0.0"'));
// console.log(float.run('"2.324001"'));
// console.log(float.run('"-2.324001"'));
// console.log(float.run('"0.123456"'));

// console.log(float.run('"0"'));
// console.log(float.run('"-0.00"'));
// console.log(float.run('".1"'));
// console.log(float.run('"1"'));
