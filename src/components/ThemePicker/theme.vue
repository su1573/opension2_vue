<template>
  <div class="mulColor">
    <!-- <el-radio-group v-model="themecolor" >
      <el-radio label="red">红色</el-radio>
      <el-radio label="darkblue">深蓝</el-radio>
      <el-radio label="purple">紫色</el-radio>
      <el-radio label="green">绿色</el-radio>
      <el-radio label="gold">黄色</el-radio>
      <el-radio label="lightblue">浅蓝</el-radio>
    </el-radio-group> -->
    <el-dropdown @command="handleCommand">
      <el-button plain type="primary">
        更换主题<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="red">红色</el-dropdown-item>
        <el-dropdown-item command="darkblue">深蓝</el-dropdown-item>
        <el-dropdown-item command="purple">紫色</el-dropdown-item>
        <el-dropdown-item command="green">绿色</el-dropdown-item>
        <el-dropdown-item command="gold">黄色</el-dropdown-item>
        <el-dropdown-item command="lightblue">浅蓝</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<style lang="scss" scoped>
.el-button.el-button--primary {
  &,
  &:hover {
    border: none;
    background: rgba(255, 255, 255, 0.5);
    color: #6b6b6b;
    height: 40px;
    border-radius: 45px;
  }
}
</style>

<script>
import { toggleClass } from "@/utils/index";
export default {
  data() {
    return {};
  },
  computed: {
    themecolor: {
      get() {
        return this.$store.state.theme.themecolor;
      },
      set(val) {
        this.$emit("setTheme", val);
        this.$store.commit("setThemeColor", val);
      }
    }
  },
  watch: {
    themecolor: {
      handler() {
        toggleClass(document.body, "custom-" + this.themecolor);
      }
    }
  },
  mounted() {
    toggleClass(document.body, "custom-" + this.themecolor);
  },
  methods: {
    handleCommand(command) {
      this.themecolor = command;
    }
  }
};
</script>
