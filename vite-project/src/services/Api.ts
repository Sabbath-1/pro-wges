import axios from 'axios';

const API_URL = 'http://localhost:3000';

const Api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});

// TypeScript interfaces
interface UserData {
  name: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  message: string;
  user: User;
}

interface CurrentUserResponse {
  authenticated: boolean;
  user?: User;
}

// API functions with types
export const register = async (userData: UserData): Promise<AuthResponse> => {
  const response = await Api.post('/users/register', userData);
  return response.data;
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await Api.post('/users/login', credentials);
  return response.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const response = await Api.post('/users/logout');
  return response.data;
};

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const response = await Api.get('/users/current');
  return response.data;
};

export default Api;