import Vue from "vue";
import Vuex from "vuex";
import app from "@/store/modules/app";
import user from "@/store/modules/user";
import tagsView from "@/store/modules/tagsView";
import getters from "@/store/getters";
import getRoutes from "@/store/modules/getRoutes";
import theme from "@/store/modules/theme";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    getRoutes,
    theme
  },
  getters
});

export default store;
