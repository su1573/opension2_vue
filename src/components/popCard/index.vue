<template>
  <div>
    <el-popover placement="right" width="400" trigger="click">
      <!-- :title="popTitle" -->
      <slot name="popContent" />
      <slot slot="reference" name="refer" />
      <!-- <el-button slot="reference" slot-name="refer"></el-button> -->
    </el-popover>
  </div>
</template>
<script>
export default {
  name: "PopCard",
  props: {
    popTitle: {
      type: String,
      default: "今日信息"
    }
    // popContent: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped></style>
