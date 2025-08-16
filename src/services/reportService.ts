import axiosClient from '../apis/axiosClient';
import endpoints from '../apis/endpoints';
import { CustomerReportTs, CreateReportPayload } from '../types/reportTypes';

// GET reports
export const getReports = async (): Promise<CustomerReportTs[]> => {
  const res = await axiosClient.get<CustomerReportTs[]>(endpoints.reports);
  return res?.data ?? [];
};

// POST create new report
export const createReport = async (
  payload: CreateReportPayload,
): Promise<CustomerReportTs> => {
  const res = await axiosClient.post<CustomerReportTs>(
    endpoints.reports,
    payload,
  );
  return res?.data!;
};

// PATCH update existing report (payment, due, boilerRate)
export const updateReport = async (
  id: string,
  payload: Partial<Pick<CustomerReportTs, 'payment' | 'due' | 'boilerRate'>>,
): Promise<{
  message: string;
  result: {
    acknowledged: boolean;
    matchedCount: number;
    modifiedCount: number;
  };
}> => {
  const res = await axiosClient.patch<{
    message: string;
    result: {
      acknowledged: boolean;
      matchedCount: number;
      modifiedCount: number;
    };
  }>(`${endpoints.reports}/${id}`, payload);

  return res?.data!;
};
