import axios from 'axios';
import { router } from 'expo-router';

import { onLogout } from './authStorage';
import { showMessage } from './messages';

import { ApiRequestOptions } from '@/api/core/ApiRequestOptions';
import { BaseHttpRequest } from '@/api/core/BaseHttpRequest';
import { CancelablePromise } from '@/api/core/CancelablePromise';
import { request as __request } from '@/api/core/request';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await onLogout();

      router.replace('/login');

      setTimeout(() => {
        showMessage({
          type: 'warning',
          title: 'Sua sessão expirou!',
          message: 'Faça login novamente para continuar',
        });
      }, 2000);
    }
    return Promise.reject(error);
  },
);

export class CustomAxiosClient extends BaseHttpRequest {
  axiosInstance = axiosInstance;

  public override request<T>(options: ApiRequestOptions): CancelablePromise<T> {
    return __request(this.config, options, this.axiosInstance);
  }
}
