import axios from "axios";
import { Loading, Message } from "element-ui";
import config from "@/common/config";

//全局设置baseURL.
// axios.defaults.baseURL = config.http.baseURL;
// axios.defaults.headers = { Authorization: Cookies.get("token") }
// axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
let loading;

function startLoading() {
  // 加载Element loading 动画
  loading = Loading.service({
    lock: true,
    text: "Loading...",
    target: document.querySelector(".loading-area") // 设置加载动画区域
  });
}

function endLoading() {
  // 使用Element loading-close 方法
  loading.close();
}

let needLoadingRequestCount = 0;

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// 请求前拦截
axios.interceptors.request.use(
  config => {
    showFullScreenLoading();
    return config;
  },
  error => {
    console.warn(error);
    tryHideFullScreenLoading();
    return Promise.reject("请求配置失败!");
  }
);

// 设置response统一处理
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      location.href = "/";
      return Promise.reject(response.data);
    }
  },
  error => {
    // http失败
    tryHideFullScreenLoading();
    switch (error.response.status) {
      case 403:
        // router.push({ path: "/login" });
        //console.log("from:1");
        window.location.href = encodeURI(
          config.http.casUrl + "?service=" + config.http.baseUrl + "/home"
        );
        return;
      case 401:
       //console.log("from:2");
        window.location.href = encodeURI(
          config.http.casUrl + "?service=" + config.http.baseUrl + "/home"
        );
        return;
      case 404:
        return Promise.reject("404-不存在的接口");
      case 500:
        return Promise.reject("服务器出错，请稍后重试");
      default:
        // return Promise.reject(error.response.data.msg[0])
        return Promise.reject(error.response.status);
    }
  }
);

export default {
  /**
   * 发送post请求(form表单)
   * @param {string} url 地址
   * @param {object} data 请求数据
   * @param {Function} done 成功回调
   * @param {Function} fail 失败回调(可选)
   */
  post(url, data, done, fail) {
    return axios({
      method: "post",
      url,
      // data: qs.stringify(data),
      data: data,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then(data => done(data))
      .catch(error => {
        if (fail) {
          fail(error);
        } else {
          Message.error({
            message: error
          });
        }
      });
  },
  /**
   * 发送post请求(body流)
   * @param {string} url 地址
   * @param {object} data 请求数据
   * @param {Function} done 成功回调
   * @param {Function} fail 失败回调(可选)
   */
  postBody(url, data, done, fail) {
    return axios
      .post(url, data)
      .then(data => done(data))
      .catch(error => {
        if (fail) {
          fail(error);
        } else {
          Message.error({
            message: error
          });
        }
      });
  },
  /**
   * 发送get请求
   * @param {string} url 请求地址
   * @param {object} data 请求数据(可选)
   * @param {Function} done 成功回调
   * @param {Function} fail 失败回调(可选)
   */
  get(url, ...options) {
    let params, done, fail;
    if (typeof options[0] === "object") {
      params = options[0];
      done = options[1];
      fail = options[2];
    } else {
      params = {};
      done = options[0];
      fail = options[1];
    }
    return axios({
      method: "get",
      url,
      params, // get 请求时带的参数
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(data => done(data))
      .catch(error => {
        if (fail) {
          fail(error);
        } else {
          Message.error({
            message: error
          });
        }
      });
  },
  put(url, data, done, fail) {
    return axios({
      method: "put",
      url,
      data: data,
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(data => done(data))
      .catch(error => {
        if (fail) {
          fail(error);
        } else {
          Message.error({
            message: error
          });
        }
      });
  }
};
