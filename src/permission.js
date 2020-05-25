import router from "./router";
import store from "./store/index";
import NProgress from "nprogress"; // Progress 进度条
import "nprogress/nprogress.css"; // Progress 进度条样式
import { Message } from "element-ui";
import { initMenu } from "@/utils/common"; // 初始化菜单，addRoutes
import config from "@/common/config"; // 初始化菜单，addRoutes

window.document.title = config.system.name;

//const whiteList = ["/login"]; // 不重定向白名单
router.beforeEach((to, from, next) => {
  debugger;
  NProgress.start();
  let uri = window.location.href;
  //("uri:" + uri);
  let jwttoken = getCookie("jwttoken");
  //console.log("jwttoken:" + jwttoken);
  //先判断系统内有无jwttoken.
  //如果有，直接执行后续操作。
  let casLoginURL = encodeURI(
    config.http.casUrl + "?service=" + config.http.baseUrl + "/home"
  );
  //有jwttoken,但是ticket没有
  if (!validatenull(jwttoken) && uri.indexOf("ticket=") == -1) {
    if (!store.getters.name) {
      store
        .dispatch("GetInfo")   //20191117 sph dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据   commit：同步操作，数据提交至 mutations ，可用于登录成功后读取用户信息写到缓存里
        .then(res => {
          if (res.status === 200) {
            initMenu(router, res.data.data); // 动态添加可访问路由表addRouters
            next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
          } else {
            setCookie("jwttoken", "", 0);
            // next("/login"); // 否则全部重定向到登录页
            window.location.href = casLoginURL;
          }
          NProgress.done();
        })
        .catch(err => {
          store.dispatch("FedLogOut").then(() => {
            Message.error(err || "验证失败，请重新登录");
            // next({ path: "/" });
            window.location.href = casLoginURL;
          });
        });
    } else {
      next();
    }
  } else {
    //如果jwttoken为空。
    //先判断有没有ticket
    //如果有ticket，表示是从统一认证过来的。直接进入后台进行判断。
    if (uri.indexOf("ticket=") != -1) {
      //进入项目后台通过tiket获取登录、权限相关信息。
      store
        .dispatch("loginCas")
        .then(result => {
          if (result.data.code !== 0) {
            Message.error(result.data.msg);
            window.location.href = config.http.casIndex;
          } else if (result.status === 200) {
            var jwttoken = result.headers.jwttoken;
            var userName = result.data.userName;
            //console.log("jwttoken_perm:" + jwttoken);
            //console.log("userName:" + userName);
            //setCookie("jwttoken", jwttoken, 1);
            store
              .dispatch("Login", userName)
              .then(() => {
                window.location.href = config.http.baseUrl + "/home";
              })
              .catch(error => {
                Message.error(error);
                window.location.href = config.http.casIndex;
              });
          } else {
            Message.error(result.data.msg);
            window.location.href = config.http.casIndex;
          }
        })
        .catch(err => {
          store.dispatch("FedLogOut").then(() => {
            Message.error(err || "获取系统权限失败，请联系管理员！");
            window.location.href = config.http.casIndex;
          });
        });
    } else {
      //转跳统一认证登录。
      window.location.href = casLoginURL;
    }
  }
});

router.afterEach(result => {
  //console.log("afterEach:" + result);
  NProgress.done(); // 结束Progress
});

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (
      val === "null" ||
      val == null ||
      val === "undefined" ||
      val === undefined ||
      val === ""
    )
      return true;
    return false;
  }
  return false;
}

export function getCookie(name) {
  var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

//设置cookie
/**
 * 设置cookie
 * name cookie的名称
 * value cookie的值
 * day cookie的过期时间
 */
export function setCookie(name, value, hours) {
  var d = new Date();
  if (hours != 0) {
    d.setTime(d.getTime() + 60 * 60 * 1000 * hours);
  }
  window.document.cookie =
    name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
