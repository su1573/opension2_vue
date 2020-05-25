<template>
  <el-header>
    <!-- <img :src="'../../../../assets/images/'+$config.system.logo" class="user-avatar"> -->
    <!-- <img src="../../../../assets/images/picc_aml_logo.png" class="sys-logo"> -->
    <!-- <h3>{{ $config.system.name }}</h3> -->
    <!-- <menubar/> -->
    <div  style="text-align:right">
      <!-- <el-tooltip content="更换主题" effect="dark" placement="bottom">

      </el-tooltip>-->
       <span class="lang">
        <el-dropdown @command="handleCommand">
         <span class="user" style="margin-right:10px;"><i class="fa fa-adjust" style="margin-right:5px;"></i>{{$t('global.InTheSkin')}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="red">{{$t('global.red')}}</el-dropdown-item>
            <el-dropdown-item command="darkblue">{{$t('global.darkblue')}}</el-dropdown-item>
            <el-dropdown-item command="purple">{{$t('global.purple')}}</el-dropdown-item>
            <el-dropdown-item command="green">{{$t('global.green')}}</el-dropdown-item>
            <el-dropdown-item command="gold">{{$t('global.gold')}}</el-dropdown-item>
            <el-dropdown-item command="lightblue">{{$t('global.lightblue')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span class="lang">
        <el-dropdown>
         <span class="user" style="margin-right:10px;"><i class="fa fa-exchange" style="margin-right:5px;"></i>{{$t('global.ChangeLanguage')}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">{{$t('global.chinese')}}</el-dropdown-item>
            <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale == 'en'">{{$t('global.english')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <span class="user" ><i class="iconfont iconguanli"></i>{{ name }}</span>
      <el-button class="link" type="text" @click="logout"><i class="iconfont iconexct"></i>{{$t('global.Logout')}}</el-button>
      <!-- <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ name }}22222</span>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>修改密码</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </el-header>
</template>
<script>
import { mapGetters } from "vuex";
import Menubar from "./Menubar.vue";
import { toggleClass } from "@/utils/index";
import ThemePicker from "@/components/ThemePicker";
export function setCookie(name, value, hours) {
  var d = new Date();
  if (hours != 0) {
    d.setTime(d.getTime() + 60 * 60 * 1000 * hours);
  }
  window.document.cookie =
    name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
export function removeCookie() {
  setCookie("jwttoken", "", 0);
  setCookie("token", "", 0);
}
import {removeToken} from "@/utils/auth.js"

export default {
  components: {
    Menubar,
    ThemePicker
  },
  data() {
    return {};
  },
  
  computed: {
    ...mapGetters(["avatar", "name"]),
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
    this.$store.dispatch("GetInfo");
    toggleClass(document.body, "custom-" + this.themecolor);
  },
  methods: {
    toggleLang(lang) {
      if(lang == 'zh'){
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: '切换为中文！',
          type: 'success'
        })
      } else if (lang == 'en') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
      }
    },
    logout() {
      removeToken();
      removeToken("jwttoken");
      removeToken("JSESSIONID");
      this.$store.dispatch("logout").then(() => {
        //location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
    },
    handleCommand(command) {
      this.themecolor = command;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";
.el-header {
  color: #999999;
  position: fixed;
  width:350px;
  margin-right: 10px;
  top: 10px;
  right: 20px;
  display: block;
  z-index: 1999;
  background: #fff;
  height: auto !important;
  padding: 0;

  .iconfont {
      font-size: 14px;
      margin-right: 4px;
  }

  .user {
      color: #999999;
  }

  .link {
      margin-left: 10px;
  }
}
h3,
.avatar-wrapper span {
  display: inline-block;
  margin: 0;
}
h3 {
  float: left;
}
.right_menu {
  float: right;
  height: 100%;
  > div {
    display: inline-block;
    margin-right: 10px;
    color: #fff;
  }
  .el-dropdown-selfdefine {
    height: 40px;
    background: rgba(255, 255, 255, 0.5);
    line-height: 40px;
    padding: 0 10px;
    border-radius: 45px;
    color: #6b6b6b;
  }
}
.el-dropdown-menu__item {
  line-height: 20px;
}
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
