import http from "@/common/request";

export default {
  /**
   * 测试数据
   */
  list(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/debwsc/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  flhgshyzx(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/flhgshyzx/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  gzghgl(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/gzghgl/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  txrygl(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/txrygl/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  hmdcxjtc(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/hmd/hmdcxjtc/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  hmddr(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/hmd/hmddr/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  debwsc(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/debwsc/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  delr(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/delr/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  desh(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/desh/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  de_sfyc(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/de_sfyc/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  khfxdjcp(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/hmd/khfxdj/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  khzsjgl(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/khzsjgl/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  sbkh(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/sbkh/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  cdgl(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/cdgl/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  qxgl(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/qxgl/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  rwfwgl(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/rwfwgl/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  },
  /**
   * 测试数据
   */
  yhgl(opt, success, fail) {
    var offset = (opt.page - 1) * opt.pageSize;
    http.get(
      "/api/jybs/yhgl/list?offset=" + offset + "&limit=" + opt.pageSize,
      success,
      fail
    );
  }
};
