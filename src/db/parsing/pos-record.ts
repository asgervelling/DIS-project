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
import { char, sequenceOf } from "arcsecond";

import { date } from "./date";
import { itemDesc } from "./item-desc";
import { billNo } from "./bill-no";
import { integer } from "./integer";
import { number } from "./number";
import { category } from "./category";

export const posRecord = sequenceOf([
  date,
  char(","),
  billNo,
  char(","),
  itemDesc,
  char(","),
  integer,
  char(","),
  number,
  char(","),
  number,
  char(","),
  number,
  char(","),
  number,
  char(","),
  category,
]).map(
  ([
    date,
    ,
    billNo,
    ,
    itemDesc,
    ,
    quantity,
    ,
    rate,
    ,
    tax,
    ,
    discount,
    ,
    total,
    ,
    category,
  ]) => ({
    date,
    billNo,
    itemDesc,
    quantity,
    rate,
    tax,
    discount,
    total,
    category,
  })
);

// console.log(posRecord.run(
//   `"Thu Apr 01 2010 15:21:34 GMT+0200 (Central European Summer Time)","G0470118","MASALA CHAI CUTTING           ","1","40","9.5","0","49.5","BEVERAGE"`
// ))