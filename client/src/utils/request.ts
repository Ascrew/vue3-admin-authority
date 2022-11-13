import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
import { useStore } from "@/store";

// import qs from 'qs'

const showStatus = (status: number) => {
  let message = "";
  switch (status) {
    case 400:
      message = "请求错误(400)";
      break;
    case 401:
      message = "未授权，请重新登录(401)";
      break;
    case 403:
      message = "拒绝访问(403)";
      break;
    case 404:
      message = "请求出错(404)";
      break;
    case 408:
      message = "请求超时(408)";
      break;
    case 500:
      message = "服务器错误(500)";
      break;
    case 501:
      message = "服务未实现(501)";
      break;
    case 502:
      message = "网络不可用(502)";
      break;
    case 503:
      message = "服务不可用(503)";
      break;
    case 504:
      message = "网络超时(504)";
      break;
    case 505:
      message = "HTTP版本不受支持";
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}, 请检查网络或联系管理员!`;
};

// 声明一个Map 用于存储每个请求的标识和取消函数
// const pending = new Map()
/**
 * 添加请求
 * @param {Obejct} config
 */
// const addPending = (config: AxiosRequestConfig) => {
//   const url = [
//     config.method,
//     config.url,
//     qs.stringify(config.params),
//     qs.stringify(config.data)
//   ].join('&')
//   config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
//     // 如果pending中不存在当前请求,则添加进去
//     if (!pending.has(url)) {
//       pending.set(url, cancel)
//     }
//   })
// }

/**
 * 移除请求
 * @param { Object } config
 */
// const removePending = (config: AxiosRequestConfig) => {
//   const url = [
//     config.method,
//     config.url,
//     qs.stringify(config.params),
//     qs.stringify(config.data)
//   ].join('&')
//   config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
//     // 如果pending中存在当前请求标识,需要取消当前请求,并且移除
//     if (!pending.has(url)) {
//       const cancel = pending.get(url)
//       cancel(url)
//       pending.delete(url)
//     }
//   })
// }

/**
 * 清空 pending 中的请求,(在路由跳转时调用)
 */
// export const clearPending = () => {
//   for (const [url, cancel] of pending) {
//     cancel(url)
//     pending.clear()
//   }
// }

const service = axios.create({
  baseURL: "/",
  headers: {
    get: {
      "Content-Type": "application/x-www-fomr-urlencoded;charset=utf-8",
    },
    post: {
      "Content-Type": "application/json;charset=utf-8",
    },
  },
  timeout: 30000,
  // 是否跨站点访问控制请求
  withCredentials: true,
  transformRequest: [
    (data) => {
      data = JSON.stringify(data);
      return data;
    },
  ],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true;
  },
  transformResponse: [
    (data) => {
      if (typeof data === "string" && data.startsWith("{")) {
        data = JSON.parse(data);
      }
      return data;
    },
  ],
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 获取token，并将其添加至请求中
    if (useStore().state.user.token) {
      config.headers.Authorization =
        "Bearer " + JSON.parse(useStore().state.user.token);
    }
    // const token = localStorage.getItem("access_token");
    // if (token) {
    // }
    return config;
  },
  (error) => {
    // 异常抛出
    // error.data = {};
    // error.data.msg = "服务器异常，请联系管理员！";
    return Promise.resolve(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const status = response.status;
    let msg = "";
    if (status < 200 || status >= 300) {
      // 处理http错误,抛到业务代码
      msg = showStatus(status);
      if (typeof response.data === "string") {
        response.data = { msg };
      } else {
        response.data.msg = msg;
      }
    }
    return response.data;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log("listen error", error);
    } else {
      // handle error code
      // 错误抛到业务
      error.data = {};
      error.data.msg = "请求超时或服务器异常,请检查网络或联系管理员!";
      ElMessage.error(error.data.msg);
    }
    return Promise.reject(error);
  }
);

export default service;
