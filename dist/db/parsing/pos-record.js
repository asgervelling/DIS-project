"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posRecord = void 0;
/**
 * A record in our point-of-sales (POS) dataset from an indian café
 * (data/Cafe_Data_20_rows.csv).
 *
 * <posRecord> ::= <date> "," <billNo> "," <itemDesc> ","
 *                 <integer> "," <number> "," <number> ","
 *                 <number> "," <number> "," <category>
 *
 * All these nonterminals are defined in this folder.
 */
const arcsecond_1 = require("arcsecond");
const date_1 = require("./date");
const item_desc_1 = require("./item-desc");
const bill_no_1 = require("./bill-no");
const integer_1 = require("./integer");
const number_1 = require("./number");
const category_1 = require("./category");
exports.posRecord = (0, arcsecond_1.sequenceOf)([
    date_1.date,
    (0, arcsecond_1.char)(","),
    bill_no_1.billNo,
    (0, arcsecond_1.char)(","),
    item_desc_1.itemDesc,
    (0, arcsecond_1.char)(","),
    integer_1.integer,
    (0, arcsecond_1.char)(","),
    number_1.number,
    (0, arcsecond_1.char)(","),
    number_1.number,
    (0, arcsecond_1.char)(","),
    number_1.number,
    (0, arcsecond_1.char)(","),
    number_1.number,
    (0, arcsecond_1.char)(","),
    category_1.category,
]).map(([date, , billNo, , itemDesc, , quantity, , rate, , tax, , discount, , total, , category,]) => ({
    date,
    billNo,
    itemDesc,
    quantity,
    rate,
    tax,
    discount,
    total,
    category,
}));
console.log(exports.posRecord.run(`"Thu Apr 01 2010 15:21:34 GMT+0200 (Central European Summer Time)","G0470118","MASALA CHAI CUTTING           ","1","40","9.5","0","49.5","BEVERAGE"`));
