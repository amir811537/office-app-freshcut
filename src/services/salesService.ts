// services/salesService.ts
import { ApiResponse } from './../types/auth.types';
import axiosClient from '../apis/axiosClient';
import endpoints from '../apis/endpoints';

export type GetSalesParams = {
  page?: number;
  limit?: number;
  startDate?: string; // ISO date string
  endDate?: string; // ISO date string
  status?: 'paid' | 'partial' | 'unpaid';
  customerId?: string;
  employeeId?: string;
};

export type SalePayload = {
  customerId: string;
  employeeId: string;
  productName: string;
  uom: string;
  quantity: number;
  price: number;
  paidAmount?: number;
  notes?: string;
};

// Create a new sale
export const createSale = async (
  payload: SalePayload,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.post<ApiResponse<any>>(
      endpoints.sales,
      payload,
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Get all sales (with optional filters/pagination)
export const getAllSales = async (
  params: GetSalesParams = {},
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.get<ApiResponse<any>>(endpoints.sales, {
      params,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Get a single sale by ID
export const getSaleById = async (
  id: string,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.get<ApiResponse<any>>(
      `${endpoints.sales}/${id}`,
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Update a sale by ID
export const updateSale = async (
  id: string,
  payload: Partial<SalePayload>,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.put<ApiResponse<any>>(
      `${endpoints.sales}/${id}`,
      payload,
    );
    return res.data;
  } catch (error: any) {
    console.log('error is ', JSON.stringify(error, null, 2));
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Delete a sale by ID
export const deleteSale = async (
  id: string,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.delete<ApiResponse<any>>(
      `${endpoints.sales}/${id}`,
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Get sales summary (startDate/endDate optional)
export const getSalesSummary = async (
  params: { startDate?: string; endDate?: string } = {},
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.get<ApiResponse<any>>(
      `${endpoints.sales}/summary`,
      { params },
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};
