export interface CustomerReportTs {
  _id: string;
  name: string;
  date: string; // could be Date type if you plan to parse it
  address: string;
  phone: string;
  boilerRate: string; // looks numeric but stored as string
  todaySell: number;
  payment: string | number; // if it's always numeric, change to number
  due: number;
  boilerQtykg: string; // stored as string, could convert to number
  boilerQtypes: string; // same here
}
