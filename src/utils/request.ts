import axios from "axios";
import { message } from 'antd';

const request = axios.create({
    timeout: 3000,
    // headers: { 'X-Custom-Header': 'foobar' }
});
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status
    switch (status) {
        case 401:
            message.warning('401,缺少token认证');
            break;
        case 403:
            message.warning('403,访客无权限操作');
            break;
        case 404:
            message.warning('404,页面错误');
            break;
        case 408:
            message.warning('408,请求超时');
            break;
        default:
            message.warning('未知错误');
            break;
    }
    return Promise.reject(error);
});

export default request