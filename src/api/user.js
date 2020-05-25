import http from "@/common/request";
import config from "@/common/config";

export default {
  /**
   * 登录
   * @param {json} option 登录信息
   */
  login(info, success, fail) {
    http.get("/api/login", info, success, fail);
  },
  /**
   * 登录统一认证
   * @param {json} option 登录统一认证
   */
  loginCas(info, success, fail) {
    let uri = window.location.href;
    http.get("/api/loginCas?uri=" + uri, info, success, fail);
  },
  /**
   * 登出
   * @param {json} option
   */
  logout(info, success, fail) {
    window.location.href=config.http.casOutUrl+"?service=" + config.http.baseUrl + "/home";

  }
};
