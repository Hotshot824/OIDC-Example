import axios from 'axios';
import { signOut, getSession } from 'next-auth/react';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 errors that haven't been retried yet.
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const session = await getSession();

      // If the session is missing, or the refresh token attempt failed,
      // the authentication state is invalid. Trigger sign out.
      if (!session?.accessToken || session.error === "RefreshAccessTokenError") {
        throw new Error("Token expired");
      }

      // Retry the original request with the new access token.
      originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;
      return api(originalRequest);
    } catch (e) {
      // Force sign out if session recovery fails.
      await signOut({ callbackUrl: '/' });
      return Promise.reject(error);
    }
  }
);
export default api;
