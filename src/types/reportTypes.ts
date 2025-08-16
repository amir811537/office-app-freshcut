// reportTypes.ts

// What API returns
export interface CustomerReportTs {
  _id: string;
  name: string;
  date: string;
  address: string;
  phone: string;
  boilerRate: string;
  todaySell: number;
  payment: number;
  due: number;
  boilerQtykg: string;
  boilerQtypes: string;
}

// What we send when creating
export interface CreateReportPayload {
  name: string;
  date: string;
  address: string;
  phone: string;
  boilerRate: string;
  todaySell: number;
  payment: number;
  due: number;
  boilerQtykg: string;
  boilerQtypes: string;
}
