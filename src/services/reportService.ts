import axiosClient from '../apis/axiosClient';
import endpoints from '../apis/endpoints';
import { CustomerReportTs } from '../types/reportTypes';

export const getReports = async (): Promise<CustomerReportTs[]> => {
  const res = await axiosClient.get<CustomerReportTs[]>(endpoints.reports);

  return res?.data;
};
