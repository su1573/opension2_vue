<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initChart();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["大额交易", "可疑交易", "黑名单", "人工录入"]
        },
        calculable: true,
        series: [
          {
            name: "数据统计",
            type: "pie",
            roseType: "radius",
            radius: [15, 65],
            center: ["50%", "38%"],
            data: [
              { value: 320, name: "大额交易" },
              { value: 240, name: "可疑交易" },
              { value: 149, name: "黑名单" },
              { value: 100, name: "人工录入" }
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600
          }
        ]
      });
    }
  }
};
</script>
