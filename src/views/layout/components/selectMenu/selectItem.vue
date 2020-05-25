<template>
  <div>
    <template v-if="!item.children || item.children.length <= 0">
      <el-option :label="item.meta.title" :value="item.path" />
    </template>
    <el-option-group v-else :label="item.meta.title">
      <template v-for="child in item.children">
        <select-item
          v-if="child.children && child.children.length > 0"
          :item="child"
          :key="child.path"
        />
        <el-option
          v-else
          :key="child.name"
          :label="child.meta.title"
          :value="child.path"
        />
      </template>
    </el-option-group>
  </div>
</template>

<script>
export default {
  name: "SelectItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      onlyOneChild: null
    };
  }
};
</script>
