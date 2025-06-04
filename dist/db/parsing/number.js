"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.number = void 0;
/**
 * <number> ::= <integer> | <float>
 *
 * See ../integer.ts and ../float.ts for their grammars.
 */
const arcsecond_1 = require("arcsecond");
const float_1 = require("./float");
const integer_1 = require("./integer");
exports.number = (0, arcsecond_1.choice)([integer_1.integer, float_1.float]);
