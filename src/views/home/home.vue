<template>
  <div class="components-container">
    <el-row :gutter="20" class="top_row">
      <el-col :span="8">
        <el-card class="box-card card_liked" shadow="hover">
          <el-button type="gradient" round> 添加快捷菜单 +</el-button>
          <el-button type="gradient" round style="top:50px;">
            删除快捷菜单 -</el-button
          >
          <el-scrollbar>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="大额交易报送-大额提数" />
              <el-checkbox label="大额交易报送-大额上报管理" />
              <el-checkbox label="可疑交易报送-可疑提数" />
              <el-checkbox label="可疑交易报送-可疑录入" />
              <el-checkbox label="黑名单管理-黑名单查询及剔除" />
              <el-checkbox label="客户管理-客户管理与识别" />
              <el-checkbox label="客户管理-客户风险等级划分" />
              <el-checkbox label="数据统计分析" />
            </el-checkbox-group>
          </el-scrollbar>
        </el-card>
        <i class="iconfont icon-user-manager iconfont_bg iconfont_bg--1" />
      </el-col>
      <el-col :span="16">
        <el-card class="box-card red_card_two" shadow="hover">
          <el-row>
            <el-col :span="12">
              <div class="card_title">待处理客户统计</div>
              <div class="card_content">
                <h2>320<span>条</span></h2>
                <p>最新优先级高待处理客户数</p>
              </div>
              <i class="iconfont icon-bar iconfont_bg iconfont_bg--2" />
            </el-col>
            <el-col :span="12">
              <el-button type="gradient" round> 查看详情 ></el-button>
              <pie-chart height="215px" />
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card" shadow="hover">
          <el-button type="gradient" round> 查看详情 ></el-button>
          <div class="chart-wrapper">
            <raddar-chart />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <el-card class="box-card">
          <el-button type="gradient" round> 查看详情 ></el-button>
          <div slot="header">
            <span>任务进度</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >更多<i class="iconfont icon-icon_rukou"
            /></el-button>
          </div>
          <div>
            <el-steps :active="1">
              <el-step title="步骤 1" icon="el-icon-edit" />
              <el-step title="步骤 2" icon="el-icon-upload" />
              <el-step title="步骤 3" icon="el-icon-picture" />
            </el-steps>
            <el-table
              :data="tableData2"
              :row-class-name="tableRowClassName"
              size="mini"
              border
              style="width: 100%"
            >
              <el-table-column prop="date" label="日期" width="150" />
              <el-table-column prop="name" label="姓名" width="180" />
              <el-table-column prop="address" label="地址" />
              <el-table-column label="操作">
                <template>
                  <el-button type="primary" size="mini">查看</el-button>
                  <el-button type="warning" size="mini">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card chart_wrap">
          <div slot="header">
            <span>数据可视化</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多<i class="iconfont icon-icon_rukou"/></el-button>
          </div>
          <div class="chart-container">
            <Chart height="100%" width="100%"/>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import countTo from "vue-count-to";
import Chart from "@/components/Charts/lineMarker";

import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import Theme from "@/components/ThemePicker";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};

export default {
  name: "Home",
  components: {
    countTo,
    Chart,
    RaddarChart,
    PieChart,
    BarChart,
    Theme
  },
  data() {
    return {
      startVal: 0,
      endVal: 2017,
      checkList: [],
      lineChartData: lineChartData.newVisitis,
      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    resize() {
      //console.log("resize");
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/variables.scss";
.top_row .el-card {
  height: 220px;
  /deep/ .el-card__body {
    padding: 0;
    height: 100%;
  }
  &.card_liked {
    overflow: hidden;
    position: relative;
    // border: solid 2px $themeHoverA;
    /deep/ .el-card__body {
      .el-scrollbar {
        height: 190px;
        margin-top: 20px;
      }
    }
    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 15px;
      // background: $themeBgA;
    }
    .el-checkbox-group {
      padding: 0 10px;
      label {
        display: block;
        border-bottom: solid 1px #eee;
        margin-left: 0px;
      }
    }
  }
  &.red_card_two {
    border: none;
    .el-row {
      height: 100%;
      div.el-col {
        height: 100%;
      }
      & > div.el-col:first-of-type {
        // background: $themeBg45;
        color: #fff;
        text-align: center;
        * {
          margin: 0;
          padding: 0;
          // text-shadow: 0 0 3px $themeHover;
        }
        .card_title {
          text-align: left;
          line-height: 30px;
          font-size: 18px;
          padding: 5px 0 0 10px;
        }
        .card_content {
          h2 {
            margin-top: 35px;
            font-size: 40px;
            span {
              font-size: 14px;
              position: absolute;
            }
          }
          p {
            font-size: 12px;
            line-height: 30px;
          }
        }
      }
      & > div.el-col:last-of-type {
        // border: solid 2px $themeHoverA;
        border-left: none;
        margin-left: -1px;
      }
    }
  }
}
.el-table /deep/ {
  .el-table .success-row {
    background: #f0f9eb;
  }
  .warning-row {
    background: #fdf5e6;
  }
}

.countNum {
  font-size: 30px;
  display: inline-block;
  margin: 10px 0;
  text-align: center;
  font-weight: 500;
}
.el-row:not(:first-of-type) {
  margin-top: 10px;
}
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 320px);
}
.btm-card {
  height: calc(100vh - 335px);
}
.chart_wrap .el-card_body {
  padding: 0;
  background: #fff;
}
.box-card {
  position: relative;
}
button.el-button--gradient {
  position: absolute;
  right: -20px;
  height: 30px;
  width: auto;
  line-height: 30px;
  padding: 0 25px;
  z-index: 10;
  top: 10px;
}
.iconfont_bg {
  position: absolute;
  top: 20px;
  font-size: 200px;
  left: -88px;
  opacity: 0.1;
}
</style>
