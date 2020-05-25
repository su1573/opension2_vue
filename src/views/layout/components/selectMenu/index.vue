<template>
  <el-select
    v-model="value"
    filterable
    remote
    clearable
    reserve-keyword
    placeholder="请输入菜单名称"
    @change="changeMenu"
  >
    <select-item v-for="group in list" :key="group.name" :item="group" />
  </el-select>
</template>
<script>
import { mapGetters } from "vuex";
import selectItem from "./selectItem";

export default {
  name: "SelectMenu",
  components: {
    "select-item": selectItem
  },
  data() {
    return {
      value: [],
      list: [],
      loading: false,
      states: []
    };
  },
  computed: {
    ...mapGetters({
      menuList: "getRoutes"
    })
  },
  mounted() {
    this.list = this.menuList.routers.filter(item => !item.hidden);
  },
  methods: {
    changeMenu(val) {
      this.$router.push(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select /deep/ {
  float: right;
  margin-right: 30px;
  .el-input {
    input {
      height: 30px !important;
      line-height: 30px !important;
      border-radius: 20px;
    }
  }
}
.el-select-dropdown {
  .el-select-dropdown__item {
    height: 25px;
    line-height: 25px;
  }
}
.el-select-group__wrap {
  padding-bottom: 17px;
  &:not(:last-of-type)::after {
    bottom: 5px;
  }
  &:not(:last-of-type) {
    padding-bottom: 10px;
  }
}
</style>
