/**
 * <billNo> ::= '"' "G" + <digit> <digit> <digit> <digit> <digit> <digit> <digit> '"'
 */
import { char, digit, sequenceOf } from "arcsecond";

const billNoInner = sequenceOf([char("G"), digit, digit, digit, digit, digit, digit, digit])
  .map((xs) => xs.join(""));

export const billNo = sequenceOf([char('"'), billNoInner, char('"')])
  .map(([, b, ]) => b);

// console.log(billNo.run('"G0470115"'))
// console.log(billNo.run('"G04701152"'))