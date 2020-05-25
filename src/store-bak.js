import Vue from "vue";
import Vuex from "vuex";
import store from "./store"; //注册store

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 初始化状态
    count: 0
  },
  mutations: {
    // 处理状态
    increment(state, payload) {
      state.count += payload.step || 1;
    }
  },
  actions: {
    // 提交改变后的状态
    increment(context, param) {
      context.state.count += param.step;
      context.commit("increment", context.state.count); //提交改变后的state.count值
    },
    incrementStep({ state, commit, rootState }) {
      if (rootState.count < 100) {
        //调用increment()方法
        store.dispatch("increment", {
          step: 10
        });
      }
    }
  }
});
