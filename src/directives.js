import Vue from "vue";

// v-dialogDrag: 弹窗拖拽
Vue.directive("dialogDrag", {
  bind(el, binding, vnode, oldVnode) {
    const dragDom = el;
    const dialogHeaderEl = el.querySelector(".el-dialog__header");

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = e => {
      const appMain_dom = document.body.getElementsByClassName("app-main")[0];
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      if (
        dragDom.clientWidth >= appMain_dom.clientWidth &&
        dragDom.offsetLeft === 0
      ) {
        return false;
      }
      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes("%")) {
        styL =
          +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
        styT =
          +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
      } else {
        styL = +sty.left.replace(/\px/g, "");
        styT = +sty.top.replace(/\px/g, "");
      }

      document.onmousemove = function(e) {
        e.preventDefault();
        el.classList.add("move");
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        let m_l = l + styL;
        let m_t = t + styT;
        if (m_l <= 0) {
          m_l = 0;
        }
        if (m_l >= appMain_dom.clientWidth - el.clientWidth - 20) {
          m_l = appMain_dom.clientWidth - el.clientWidth - 20;
        }
        if (m_t <= 0) {
          m_t = 0;
        }
        if (m_t >= appMain_dom.clientHeight - el.clientHeight) {
          m_t = appMain_dom.clientHeight - el.clientHeight;
        }
        dragDom.style.left = `${m_l}px`;
        dragDom.style.top = `${m_t}px`;
      };
      document.onmouseup = function(e) {
        el.classList.remove("move");
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});

// v-fullScreen: 弹框自框架内全屏显示
Vue.directive("fullScreen", {
  bind(el, binding, vnode, oldVnode) {
    const fullScreen_dom =
      el.querySelector(".icon-quanping") ||
      el.querySelector(".icon-icon-huanyuanhuabu");
    const dialog_dom = el;

    fullScreen_dom.onmousedown = e => {
      fullScreen_dom.onmousemove = function(e) {
        document.onmousemove = null;
        e.preventDefault();
      };
      fullScreen_dom.onmouseup = function(e) {
        if (binding.value === undefined || !binding.value.full) {
          dialog_dom.style.top = `${0}px`;
          dialog_dom.style.left = `${0}px`;
          dialog_dom.style.width = "100%";
          dialog_dom.style.height = "100%";
          binding.value = { full: true };
          el.classList.add("full");
        } else {
          dialog_dom.style.top = "50px";
          dialog_dom.style.left = "25%";
          dialog_dom.style.width = "50%";
          dialog_dom.style.height = "auto";
          binding.value = { full: false };
          el.classList.remove("full");
        }
      };
    };
  }
});

// v-resizeTable: 表格高度自适应
Vue.directive("resizeTable", {
  bind(el, binding, vnode, oldVnode) {
    const $el = el;
    setTimeout(() => {
      $el.style.height = window.innerHeight - $el.offsetTop - 140 + "px";
    }, 300);
    // 监听窗口大小变化
    window.onresize = function() {
      $el.style.height = window.innerHeight - $el.offsetTop - 140 + "px";
    };
  }
});
