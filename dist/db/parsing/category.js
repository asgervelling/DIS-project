"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
/**
 * Category might have to parse a string literal, we'll have to see.
 * Haven't checked out all 140000 records yet.
 *
 * /**
 * <category>           ::= <doubleQuotedString>
 * <doubleQuotedString> ::= [defined in ../doubleQuotedString.ts]
 */
const double_quoted_string_1 = require("./double-quoted-string");
exports.category = double_quoted_string_1.doubleQuotedString;
console.log(exports.category.run('"BEVERAGE"'));
