import { constantRouterMap } from "@/router";
import { validatenull, validateURL } from "@/utils/validate";
// import axios from 'axios'
import api from "@/api";

const getRoutes = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    childRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap;
      // state.childRouters = constantRouterMap[0]
    },
    ADD_ROUTERS: (state, addRouters) => {
      //console.log("ADD_ROUTERS2");
      state.routers = constantRouterMap.concat(addRouters); 
      //console.log(99999999999,addRouters);// concat() 连接两个数组
    },
    ChangeRouters: (state, newRouters) => {
      state.childRouters = newRouters;
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        resolve();
      });
    },
    // 获取系统菜单
    GetMenu({ commit }) {
      return new Promise(resolve => {
        api.Test.menulist(response => {
          if (response.status === 200) {
            const data = response.data.data; // 产生的data多一层
            data.forEach(ele => {
              if (ele.childrens) {
                ele.childrens.forEach(child => {
                  if (!validatenull(child.component)) {
                    if (validateURL(child.path)) {
                      child.path = `${child.path}`;
                    } else {
                      child.path = `${ele.path}${child.path}`;
                    }
                  }
                });
              }
            });
            commit("SET_ROUTERS", data);
            resolve(data);
          }
        });
        // axios.get('/demo/sys/menu/list') // 测试菜单
        // axios.get('/api/test/menulist') // 测试菜单
        // axios.get('/api/menu/list') // 测试菜单
        // axios.get('/api/aml/menu') // 反洗钱系统菜单
        // .then(response => {
        //   console.log(response)
        //   if (response.status === 200) {
        //     const data = response.data.data // 产生的data多一层
        //     data.forEach(ele => {
        //       if (ele.childrens) {
        //         ele.childrens.forEach(child => {
        //           if (!validatenull(child.component)) {
        //             if (validateURL(child.path)) {
        //               child.path = `${child.path}`
        //             } else {
        //               child.path = `${ele.path}${child.path}`
        //             }
        //           }
        //         })
        //       }
        //     })
        //     commit('SET_ROUTERS', data)
        //     resolve(data)
        //   }
        // })
      });
    }
  }
};

export default getRoutes;
