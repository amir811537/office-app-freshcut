import { ApiResponse } from './../types/auth.types';
import axiosClient from '../apis/axiosClient';
import endpoints from '../apis/endpoints';

export type GetCustomersParams = {
  page?: number;
  limit?: number;
  search?: string;
  minDue?: number;
};

export type CustomerPayload = {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  customerType: string;
  defaultProductName?: string;
  defaultUOM?: string;
  defaultPrice?: number;
  previousDue?: number;
  dueLimit: number;
  isActive?: boolean;
};

// Create a new customer
export const createCustomer = async (
  payload: CustomerPayload,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.post<ApiResponse<any>>(
      endpoints.customers,
      payload,
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Get all customers (with optional query params)
export const getAllCustomers = async (
  params: GetCustomersParams = {},
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.get<ApiResponse<any>>(endpoints.customers, {
      params,
    });
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Update a customer by ID
export const updateCustomer = async (
  id: string,
  payload: Partial<CustomerPayload>,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.put<ApiResponse<any>>(
      `${endpoints.customers}/${id}`,
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

// Delete (soft-delete) a customer by ID
export const deleteCustomer = async (
  id: string,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.delete<ApiResponse<any>>(
      `${endpoints.customers}/${id}`,
    );
    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};

// Get single customer by ID
export const getCustomerById = async (
  id: string,
  setIsLoading?: (loading: boolean) => void,
): Promise<ApiResponse<any> | null> => {
  try {
    setIsLoading?.(true);
    const res = await axiosClient.get<ApiResponse<any>>(
      `${endpoints.customers}/${id}`,
    );

    return res.data;
  } catch (error: any) {
    return error?.response?.data || null;
  } finally {
    setIsLoading?.(false);
  }
};
