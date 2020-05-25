import http from "@/common/request";

export default {
  /**
   * 查询
   */
  list(data, success, fail) {
    http.postBody("/api/sysmanage/opSysUser/list", data, success, fail);
  },
  /**
   * 增加
   */
  add(data, success, fail) {
    http.postBody("/api/sysmanage/opSysUser/add", data, success, fail);
  },
  /**
   * 更新
   */
  update(data, success, fail) {
    http.postBody("/api/sysmanage/opSysUser/update", data, success, fail);
  },
  /**
   * 删除
   */
  remove(data, success, fail) {
    http.postBody("/api/sysmanage/opSysUser/remove", data, success, fail);
  },
  /**
   * 批量删除
   */
  batchRemove(data, success, fail) {
    http.postBody("/api/sysmanage/opSysUser/batchRemove", data, success, fail);
  }
};
