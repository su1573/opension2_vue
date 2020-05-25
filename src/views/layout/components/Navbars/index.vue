<template> 
<div>
      <el-menu class="navbar">
    <img class="toggle-img"
          :src="sidebar.opened?require('@/assets/images/closed.png'):require('@/assets/images/open.png')" :alt="sidebar.opened?'收起':'展开'"
          @click="toggleSideBar"/>
          <i v-if="isShowArrow" :class="['iconfont','iconGroup7',isEnd?'disabled':'']" @click="doBefore()"></i>
        <article class="container" ref="container">
            <Tags-View :is-long="sidebar.opened" ref="tagsView"/>
        </article>
        <i v-if="isShowArrow"
           :class="['iconfont','iconGroup10',hiddenIndex<0?'disabled':'']"
           @click="doNext()"></i>
  </el-menu>
</div>

</template>

<script>
import { mapGetters } from "vuex";
import TagsView from "./TagsView";

export default {
  components: {
    TagsView
  },
   data() {
    return {
      // tagItem: {data: []},
      // hiddenIndex: -1,
      isShowArrow: false,
      // isEnd: false,
      // endIndex: null,
      // containerWidth: undefined
    }
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    doBefore() {
        if (this.isEnd) {
            return;
        }
        if (this.hiddenIndex >= this.tagItem.data.length - 1) {
            this.hiddenIndex = this.tagItem.data.length - 1;
            return;
        }
        this.hiddenIndex++;
        this.tagItem.data[this.hiddenIndex].style.transition = "0.28s display linear";
        this.tagItem.data[this.hiddenIndex].style.display = "none";

    },
    doNext() {
        if (this.hiddenIndex < 0) {
            this.hiddenIndex = -1;
            return;
        }
        this.tagItem.data[this.hiddenIndex].style.transition = "0.28s display linear";
        this.tagItem.data[this.hiddenIndex].style.display = "inline-block";
        this.hiddenIndex--;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/variables.scss";

.navbar {
    height: $navHeight;
    line-height: $navHeight;
    border-radius: 0 !important;
    padding-left: 25px;
    position: fixed;
    top: 0;
    padding-top: 24px;
    box-sizing: content-box;
    border-bottom: 1px solid #D9D9D9;
    .navbar.el-menu {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        z-index: 1400;
        height: 31px;
        width: 100%;
    }
    .container {
        width: 100%;
        padding-right: 28.6%;
        outline: none;
        height: 32px;
        overflow: hidden;
        //overflow-y: visible;
    }

    .toggle-img {
        width: 12px;
        height: 60px;
        position: absolute;
        top: 17px;
        left: -3px;
        outline: none;
    }



    .iconfont {
        color: rgba(0, 0, 0, 0.25);
        font-size: 10px;
        cursor: pointer;

        &.disabled {
            cursor: text;

            &:hover {
                color: rgba(0, 0, 0, .25);
            }
        }

        &:hover {
            color: rgba(0, 0, 0, .65);
        }

        &.iconGroup7 {
            position: absolute;
            top: 24px;
            left: 50px;

            &.sidebar-icon {
                position: absolute;
                top: 0;
                left: -3px;
                color: #fff;
                font-size: 2px;
            }
        }

        &.iconGroup10 {
            position: absolute;
            top: 24px;
            right: 28%;

            &.sidebar-icon {
                position: absolute;
                top: 0;
                left: -3px;
                color: #fff;
                font-size: 2px;
            }
        }

        &.iconshousuo {
            color: #000;
            font-size: 20px;
            margin-right: 20px;
            cursor: pointer;

            &:hover {
                color: $themeColor
            }
        }
    }

    .hamburger-container {
        line-height: $navHeight + 10px;
        height: 100%;
        padding: 0 10px;
    }

    &.el-menu {
        width: 118px;
        height: 35px;
    }

    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }

    &.el-menu {
        //position: fixed;
        display: flex;
        z-index: 1000;
        // top: $headerHeight;
        //top: 60px;
        height: 31px;
        width: 100%;
        // tag
        .tags-view-container {
            display: inline-block;
            overflow-x: hidden;
            //overflow-y: visible;
        }
    }
}
</style>

