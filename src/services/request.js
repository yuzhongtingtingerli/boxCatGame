// api.js

import axios from "axios";

// 创建一个 axios 实例
const apiInstance = axios.create({});

// 请求拦截器
apiInstance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么
    // 例如，可以在请求头中添加 token
    // config.headers['Authorization'] = 'Bearer ' + getToken();
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
apiInstance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response;
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

// 封装请求方法
export const request = async (url, method = "get", data = null) => {
  try {
    const response = await apiInstance.request({
      url,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    // 处理请求错误
    throw error;
  }
};
