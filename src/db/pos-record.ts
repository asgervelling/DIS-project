/**
 * A record from data/Cafe_Data_20_rows.csv.
 */
export type PosRecord = {
  date: Date;
  billNo: string;
  itemDesc: string;
  quantity: number;
  rate: number;
  tax: number;
  discount: number;
  total: number;
  category: string;
};
