const theme = {
  state: {
    themecolor: "darkblue" // 默认为20a0ff
  },
  mutations: {
    setThemeColor(state, curcolor) {
      // 更新主题颜色
      state.themecolor = curcolor;
    }
  }
};
export default theme;
