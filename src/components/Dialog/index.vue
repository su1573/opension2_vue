<template>
  <div>
    <div
      v-fullScreen
      v-dialogDrag
      v-show="activeDialog"
      class="el-dialog query_dialog"
    >
      <div class="el-dialog__header">
        <div>
          <span class="query_dialog_title">
            <i class="iconfont icon-yingyongguanli" />
            <span>查询条件</span>
          </span>
          <span class="query_dialog_tool pull-right">
            <i
              :class="
                full ? 'iconfont icon-huanyuanhuabu' : 'iconfont icon-quanping'
              "
              @click="full = !full"
            />
            <slot name="close-dialog" />
          </span>
        </div>
      </div>
      <el-scrollbar ref="s_bar">
        <div class="el-dialog__body">
          <slot />
        </div>
      </el-scrollbar>
      <div class="el-dialog__footer">
        <div class="dialog-footer">
          <slot name="queryBtn" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      default: 300
    },
    activeDialog: {
      type: null,
      default: false
    }
  },
  data() {
    return {
      full: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.s_bar.$el.style.height = this.d_height + "px" || "300px";
    });
  }
};
</script>
<style lang="scss" scoped>
@import "./query-dialog.scss";
</style>
