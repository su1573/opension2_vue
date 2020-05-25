import { validatenull } from "./validate";
import store from "@/store/index.js";

/**
 * 动态处理后台传入的路由
 * @param {*} router
 * @param {*} menu
 */
export const initMenu = (router, menu) => {
  //console.log("ADD_ROUTERS1");
  if (menu.length === 0) {
    return;
  }
  const menus = formatRoutes(menu);
  const unfound = {
    path: "*",
    component: () => import("@/views/404"),
    hidden: true
  };
  menus.push(unfound);
  router.addRoutes(menus);
  store.commit("ADD_ROUTERS", menus);
};

/**
 * 拼接赋值路由，格式↓↓↓
 *
 * 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * hidden: true // (默认 false)
 * redirect: "noredirect"  当设置 noredirect 的时候该路由在面包屑导航中不可被点击
 * 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 * 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 * 若你想不管路由下面的 children 声明的个数都显示你的根路由
 * 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * alwaysShow: true
 * name: "router-name" //设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta: {
 *   roles: ["admin", "editor"] //设置该路由进入的权限，支持多个权限叠加
 *   title: "title" //设置该路由在侧边栏和面包屑中展示的名字
 *   icon: "svg-name" //设置该路由的图标
 *   noCache: true //如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
 * }
 * @param {Array} aMenu
 */
export const formatRoutes = aMenu => {
  const aRouter = [];
  aMenu.forEach(oMenu => {
    const {
      title,
      // pid, // 父级id - 待定
      // cid, // 子级id - 待定
      path, // url 中显示的路由
      component, // 对应文件名-带上父级菜单名。"/" 隔开
      name, // 汉字 - 对应页面显示的菜单名
      icon, // 图标 - 打算动fontawesome选取
      childrens,
      nameEgl // 二级菜单
    } = oMenu;
    if (!validatenull(component)) {
      const oRouter = {
        path: path,
        // pid: pid,
        // cid: cid,
        component(resolve) {
          let componentPath = "";
          if (component === "Layout") {
            require(["../views/layout/Layout"], resolve);
            return;
          } else {
            componentPath = component;
          }
          require([`../views/${componentPath}`], resolve); // .vue
        },
        name: name,
        icon: icon,
        nameEgl: nameEgl,
        meta: {
          icon: icon,
          title: title,
          nameEgl: nameEgl
        }
        // ,
        // children: validatenull(childrens) ? "" : formatRoutes(childrens)
      };
      if (!validatenull(childrens)) {
        oRouter.children = formatRoutes(childrens);
      }
      aRouter.push(oRouter);
    }
  });
  return aRouter;
};

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i];
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id);
          }
        }
      }
    }
  }
};

/**
 * 总体路由处理器
 */
// export const resolveUrlPath = (url, name) => {
//   let reqUrl = url
//   if (url.indexOf("#") !== -1 && url.indexOf("http") === -1) {
//     const port = reqUrl.substr(reqUrl.indexOf(":"))
//     reqUrl = `/myiframe/urlPath?src=${baseUrl}${port}${reqUrl.replace("#", "").replace(port, "")}}&name=${name}`
//   } else if (url.indexOf("http") !== -1) {
//     reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`
//   } else {
//     reqUrl = `${reqUrl}`
//   }
//   return reqUrl
// }

/**
 * 总体路由设置器
 */
export const setUrlPath = $route => {
  let value = "";
  if ($route.query.src) {
    value = $route.query.src;
  } else {
    value = $route.path;
  }
  return value;
};

/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = "";
  if (validatenull(dic)) return value;
  if (typeof value === "string" || typeof value === "number") {
    let index = 0;
    index = findArray(dic, value);
    if (index !== -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach(ele => {
      index = findArray(dic, ele);
      if (index !== -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
};

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value === value) {
      return i;
    }
  }
  return -1;
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, typeof len === "number" ? len : 4);
  if (date) random = random + Date.now();
  return random;
};
