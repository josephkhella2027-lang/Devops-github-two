import axios, { type Method } from "axios";

export interface Users {
  id?: number | string;
  username: string;
  email: string;
  password: string;
}
export interface RegisterInputType {
  username: string;
  email: string;
  password: string;
  rePassword: string;
}
export interface SaveInputType {
  id?: number | string;
  username: string;
  email: string;
  password: string;
}

export interface LoginInputType {
  username: string;
  password: string;
}

export interface InitialStateUsersType {
  users: Users[];
  user: Users | null;
  token: string | null;
}

export interface InitialStateLoadingType {
  loading: boolean;
  error: string[] | null;
  successMessage: string | null;
  field: string[] | null;
}

export async function ApiHeader<T>(
  method: Method,
  endpoint: string,
  data?: unknown,
): Promise<T> {
  const token = localStorage.getItem("token");

  const apiUrl = `http://localhost:5400/api/${endpoint}`;

  const response = await axios<T>({
    method,
    url: apiUrl,
    data,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  return response.data;
}
