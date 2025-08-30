import axiosClient from '../apis/axiosClient';
import endpoints from '../apis/endpoints';
import { ApiResponse, AuthPayload, User } from '../types/auth.types';

export const signupUser = async (
  payload: Omit<User, '_id' | 'employeeCode' | 'role'> & { password: string },
): Promise<ApiResponse<AuthPayload>> => {
  console.log(axiosClient.defaults.baseURL+endpoints.signup);
  try {
    const res = await axiosClient.post<ApiResponse<AuthPayload>>(
      endpoints.signup,
      payload,
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser=async(payload:any,setIsLoading:any)=>{
  setIsLoading(true);
  try {
    const res=await axiosClient.post(endpoints.login,payload);
    setIsLoading(false);
    return res.data;
  } catch (error:any) {
    setIsLoading(false);
    return error.response.data;
  }
}

export const logoutUser = async (setIsLoading:any): Promise<ApiResponse<null>> => {
  setIsLoading(true);
  try {
    const res = await axiosClient.post<ApiResponse<null>>(endpoints.logout);
    setIsLoading(false);
    return res.data;
  } catch (error: any) {
    setIsLoading(false);
    return error.response.data;
  }
};


