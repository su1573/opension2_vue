import http from "@/common/request";

export default {
  /**
   * 反洗钱系统，九个模块菜单
   * @param {*} success
   * @param {*} fail
   */
  list(success, fail) {
    http.get("/api/sys/menu/list", success, fail);
    // http.get("/mock/aml/menu2", success, fail);
    // http.get("/mock/aml/menu3", success, fail);
    // http.get("/mock/aml/menu4", success, fail);
  }
};
