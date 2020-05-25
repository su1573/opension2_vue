import "babel-polyfill";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "./directives.js"; // 自定义插件js
import i18n from './i18n/i18n'

import "element-ui/lib/theme-chalk/index.css";

import "@/permission"; // 权限控制

import "@/styles/index.scss"; // 全局css
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "./plugins/element.js";
import config from "./common/config";
import api from "./api";

import qs from "qs";
import Axios from "axios";
Vue.prototype.$qs = qs;
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;
Vue.prototype.$config = config;
// Vue.prototype.$http = http;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  i18n, 
  render: h => h(App)
}).$mount("#app");