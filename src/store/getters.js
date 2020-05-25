const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  activeTab: state => state.tagsView.activeTab, // 父级选中菜单name值
  getRoutes: state => state.getRoutes,
  getRoutes_routers: state => state.getRoutes.routers, // 获取所有从后台请求来的路由
  childRouters: state => state.getRoutes.childRouters,
  themecolor: state => state.theme.themecolor,
  clickCount: state =>  state.tagsView.clickCount
};
export default getters;
