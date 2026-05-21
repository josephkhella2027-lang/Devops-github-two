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

export interface InitialStateUsersType {
  users: Users[];
}

export interface InitialStateLoadingType {
  loading: boolean;
  error: null | string;
  successMessage: string | null;
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
