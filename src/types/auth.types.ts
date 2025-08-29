// src/types/auth.ts
export type Role = 'admin' | 'employee';

export interface User {
  _id: string;
  userName: string;
  email: string;
  fullName: string;
  phone: string;
  role: Role;
  employeeCode: string;
}

export interface AuthPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data: T;
}
