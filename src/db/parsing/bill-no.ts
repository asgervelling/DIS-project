/**
 * <billNo> ::= '"' <letter> + <digit> <digit> <digit> <digit> <digit> <digit> <digit> '"'
 */
import { char, digit, sequenceOf, letter } from "arcsecond";

const billNoInner = sequenceOf([letter, digit, digit, digit, digit, digit, digit, digit])
  .map((xs) => xs.join(""));

export const billNo = sequenceOf([char('"'), billNoInner, char('"')])
  .map(([, b, ]) => b);

// console.log(billNo.run('"G0470115"'))
// console.log(billNo.run('"N0470115"'))
// console.log(billNo.run('"G04701152"'))