import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "./views/layout/Layout";

export const constantRouterMap = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  {
    path: "",
    component: Layout,
    redirect: "home",
    hidden: true,
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/home.vue"),
        meta: { title: "首页", icon: "example", nameEgl: "home" }
      }
    ]
  }
];

export default new Router({
  // mode: "history", //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
