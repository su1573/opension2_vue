<template>
  <div class="full-calendar-header">
    <div class="header-left">
      <slot name="header-left" />
    </div>
    <div class="header-center">
      <span class="prev-month" @click.stop="goPrev"
        ><i class="el-icon-caret-left"
      /></span>
      <span class="title">{{ title }}</span>
      <span class="next-month" @click.stop="goNext"
        ><i class="el-icon-caret-right"
      /></span>
    </div>
    <el-date-picker
      v-model="pickVlue"
      :clearable="false"
      :editable="false"
      class="fc_picker"
      type="month"
      @change="pickDate"
    />
    <div class="header-right">
      <slot name="header-right" />
    </div>
  </div>
</template>
<script type="text/babel">
// import dateFunc from './dateFunc'
import moment from "moment";

export default {
  props: {
    currentMonth: {
      type: null,
      default: ""
    },
    titleFormat: {
      type: null,
      default: ""
    },
    firstDay: {
      type: null,
      default: ""
    },
    monthNames: {
      type: null,
      default: ""
    },
    locale: {
      type: null,
      default: ""
    }
  },
  data() {
    return {
      leftArrow: "<",
      rightArrow: ">",
      pickVlue: ""
    };
  },
  computed: {
    title() {
      if (!this.currentMonth) return;
      return this.currentMonth.locale(this.locale).format("YYYY [年] M [月] ");
    }
  },
  methods: {
    goPrev() {
      const newMonth = moment(this.currentMonth)
        .subtract(1, "months")
        .startOf("month");
      this.$emit("change", newMonth);
    },
    goNext() {
      const newMonth = moment(this.currentMonth)
        .add(1, "months")
        .startOf("month");
      this.$emit("change", newMonth);
    },
    pickDate(val) {
      // console.log(this.pickVlue)

      const a = moment(this.pickVlue).startOf("month");

      const newMonth = moment(a)
        .add(0, "months")
        .startOf("month");
      this.$emit("change", newMonth);
    }
  }
};
</script>
<style lang="scss">
.full-calendar-header {
  display: flex;
  align-items: center;
  .header-left,
  .header-right {
    flex: 1;
  }
  .header-center {
    flex: 3;
    text-align: center;
    .title {
      margin: 0 10px;
      font-size: 24px;
    }
    .prev-month,
    .next-month {
      cursor: pointer;
    }
  }
}
</style>
