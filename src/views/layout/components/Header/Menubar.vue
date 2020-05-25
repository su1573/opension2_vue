<template>
  <div class="menuBar">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in menus"
        :key="index"
        :name="item.name"
      >
        <div slot="label" class="tab_label">
          <i :class="'fa ' + item.icon" />
          <span>{{ item.title }}</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      menus: [
 
      ],
      activeTab: ""
    };
  },
  computed: {
    ...mapGetters(["name", "getRoutes"]),
    activeName: {
      get: function() {
        return this.$store.getters.activeTab;
      },
      set: function(newVal) {
        this.handleClick();
        if (newVal === "home") {
          this.$store.commit("ChangeRouters", []);
        }
        this.$store.dispatch("updateActiveTab", newVal);
      }
    }
  },
  mounted() {
    this.forFun(this.getRoutes.routers);
  },
  methods: {
    ...mapMutations(["ChangeRouters"]),
    handleClick() {
      //console.log('this.getRoutes.routers', this.getRoutes.routers)
      const newArr = this.getRoutes.routers.filter(
        item => item.name === this.activeName
      );
      //console.log('newArr22222', newArr)
      if (newArr.length > 0) {
        if (newArr[0].children) {
          this.ChangeRouters(newArr[0].children);
        }
      }
    },
    forFun(arr) {
      //console.log('arr3333', arr)
      arr.forEach(element => {
        //console.log('every444', element)
        if (element.meta) {
          const opt = {
            title: element.meta.title,
            icon: element.icon,
            name: element.name
          };
          this.menus.push(opt);
          //console.log(888, this.menus)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.menuBar {
  width: auto;
  float: left;
}
.el-tabs /deep/ {
  padding-left: 20px;
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__nav {
    line-height: 60px;
  }
  .el-tabs__item {
    padding: 0 15px;
    &.is-top:last-child {
      padding-right: 15px;
    }
    height: 50px;
    .tab_label {
      text-align: left;
      position: relative;
      padding-left: 28px;
      i {
        font-size: 25px;
        position: absolute;
        left: 0;
      }
      span {
        font-size: 16px;
        line-height: 0px;
      }
    }
  }
  .el-tabs__nav-wrap::after {
    background: unset;
  }
}
</style>
