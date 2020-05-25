// import { login, logout, getInfo } from "@/api/login"
import { getToken, setToken, removeToken } from "@/utils/auth";
import api from "@/api";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 登录
    Login({ commit }, data) {
      return new Promise(resolve => {
        setToken(data.token);
        commit("SET_TOKEN", data.token);
        resolve();
      });
    },
    // 从统一认证登录
    loginCas() {
      return new Promise(resolve => {
        api.User.loginCas(result => {
          ("loginCas.result:" + result);
          resolve(result);
        });
      });
    },
    // 获取用户信息和菜单
    GetInfo({ commit }) {
      return new Promise(resolve => {
        api.Sys.Menu.list(result => {
          if (result.status === 200) {
            const data = result.data;
            commit("SET_NAME", data.name);
          }
          resolve(result);
        });
      });
    },

    // 登出
    logout({ commit }) {
      return new Promise(resolve => {
        api.User.logout(result => {
          //console.log("logout.result:" + result);
          resolve(result);
        });
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        removeToken();
        resolve();
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
