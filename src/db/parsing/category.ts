/**
 * Category might have to parse a string literal, we'll have to see.
 * Haven't checked out all 140000 records yet.
 * 
 * /**
 * <category>           ::= <doubleQuotedString>
 * <doubleQuotedString> ::= [defined in ../doubleQuotedString.ts]
 */
import { doubleQuotedString } from "./double-quoted-string";

export const category = doubleQuotedString;

// console.log(category.run('"BEVERAGE"'));