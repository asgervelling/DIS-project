/**
 * <number> ::= <integer> | <float>
 * 
 * See ../integer.ts and ../float.ts for their grammars.
 */
import { choice } from "arcsecond";

import { float } from "./float";
import { integer } from "./integer";

export const number = choice([integer, float]);
