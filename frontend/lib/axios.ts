import axios from 'axios';
import { signOut } from 'next-auth/react';

const api = axios.create({ baseURL: '/api' });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 這裡強制執行登出以觸發重新導向
      await signOut({ callbackUrl: '/' });
    }
    return Promise.reject(error);
  }
);
export default api;
