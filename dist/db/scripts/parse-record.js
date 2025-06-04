"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arcsecond_1 = require("arcsecond");
// "date","Bill Number ","Item Desc","Quantity","Rate","Tax","Discount","Total","Category"
const exampleRecord = '"Thu Apr 01 2010 15:15:11 GMT+0200 (Central European Summer Time)","G0470115","QUA  MINERAL WATER(1000ML)    ","1","50","11.88","0","61.88","BEVERAGE"';
const doubleQuote = (0, arcsecond_1.char)('"');
const betweenDoubleQuotes = (0, arcsecond_1.between)(doubleQuote)(doubleQuote)((0, arcsecond_1.many)((0, arcsecond_1.anyCharExcept)((0, arcsecond_1.char)('"'))));
const quotedString = '"Thu Apr 01 2010 15:15:11 GMT+0200 (Central European Summer Time)"';
// console.log(betweenDoubleQuotes.run(quotedString))
const escapedQuote = (0, arcsecond_1.sequenceOf)([(0, arcsecond_1.str)("\\"), (0, arcsecond_1.anyOfString)(`"'`)])
    .map((xs) => xs.join(""));
const doubleQuotedString = (0, arcsecond_1.sequenceOf)([
    (0, arcsecond_1.char)('"'),
    (0, arcsecond_1.many)((0, arcsecond_1.choice)([escapedQuote, (0, arcsecond_1.anyCharExcept)((0, arcsecond_1.char)('"'))]))
        .map((xs) => xs.join("")),
    (0, arcsecond_1.char)('"'),
]).map(([, s,]) => s);
console.log(doubleQuotedString.run(exampleRecord));
