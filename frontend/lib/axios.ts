import axios from 'axios';
import { signOut, getSession } from 'next-auth/react';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 當收到 401 且該請求尚未重試過
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 嘗試從 NextAuth 獲取新的 Session (這會自動觸發 jwt callback 進行刷新)
        const session = await getSession();

        if (session?.accessToken) {
          // 如果拿到新的 Token，更新請求標頭並重試
          originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }

      // 如果刷新也失敗，才執行強制登出
      await signOut({ callbackUrl: '/' });
    }
    return Promise.reject(error);
  }
);
export default api;

