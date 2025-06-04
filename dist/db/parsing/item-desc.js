"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemDesc = void 0;
/**
 * <itemDesc>           ::= <doubleQuotedString>
 * <doubleQuotedString> ::= [defined in ../doubleQuotedString.ts]
 */
const double_quoted_string_1 = require("./double-quoted-string");
exports.itemDesc = double_quoted_string_1.doubleQuotedString;
