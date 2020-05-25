<template>
      <article>
        <logo/>
        <el-menu
                :default-active="defaultActive"
                :collapse="isCollapse"
                class="el-menu-vertical-demo"
                :unique-opened="true"
                text-color="rgba(255,255,255,.65)"
                active-text-color="#fff">
            <template v-for="item in menus" :ref="`menu-${item.name}`">
                <el-submenu v-if="item.children" :index="item.name">
                    <template slot="title">
                        <i :class="[item.icon]" style="margin-right:10px;color: rgba(255, 255, 255, 0.65);"></i>
                        <span>{{$t('Sidebar.'+item.nameEgl)}}</span>
                    </template>
                    <template v-for="(child,ind) in item.children">
                        <RouterLink :to="child.path" @click.native='jump'>
                            <el-menu-item :index="child.name" :class="['submenu-item',isCollapse?'is-collapse':'']">
                                {{$t('Sidebar.'+child.meta.nameEgl)}}
                                <!--{{child.meta.title}}-->
                            </el-menu-item>
                        </RouterLink>
                        <template v-if="child.children">
                            <el-submenu :index="child.name"> 
                                <template slot="title">{{child.meta.title}} 0000</template>
                                <RouterLink :to="child.children.path">
                                    <el-menu-item :index="child.children.name"
                                                  :class="['submenu-item',isCollapse?'is-collapse':'']">
                                        {{$t('Sidebar.'+child.meta.nameEgl)}}
                                    </el-menu-item>
                                </RouterLink>
                            </el-submenu>
                        </template>
                    </template>
                </el-submenu>
                <RouterLink v-else :to="item.path">
                    <el-menu-item :ref="`menu-${item.name}`" :index="item.name">
                        <i :class="[item.icon]"></i>
                        <span slot="title">{{$t('Sidebar.'+item.nameEgl)}}</span>
                    </el-menu-item>
                </RouterLink>
            </template>
        </el-menu>
    </article>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import SidebarItem from "./SidebarItem";
import logo from "@/views/layout/components/logo";
import { networkInterfaces } from 'os';

export default {
  data() {
    return {
     clickCount:0
    };
  },
  watch: {
    clickCountData(name) {
      if(name == 0){
           this.clickCount =0
      }
       
    }
  },
  components: { SidebarItem, logo },
  computed: {
     ...mapGetters({
      getRoutes: "getRoutes",
      sidebar: "sidebar",
      defaultActive: "activeTab",
      clickCountData: 'clickCount'
    }),
    isCollapse() {
      return !this.sidebar.opened;
    },
    menus() {
      const menus = [];
      this.getRoutes.routers.forEach(item => {
        if (item.meta) {
          menus.push({
            title: item.meta.title,
            icon: item.icon,
            name: item.name,
            nameEgl: item.nameEgl,
            ...item.children ? {children: item.children} : {}
          });
        }
      });
      return menus;
    }
  },
  mounted() {},
  created() {},
  methods: {
    ...mapMutations(["clickCountfun"]),
    jump() {
      if (this.$store.state.tagsView.visitedViews.length == 10){ 
        this.clickCount++;
      }else if (this.$store.state.tagsView.visitedViews.length <10){
        this.clickCount=0;
      }
      if(this.clickCount>1){
           this.clickCountfun(2)
      }
      console.log(88, this.clickCount)
      if(this.clickCountData>1){
        this.$message({
            message: this.$t('global.OpenTooManyTags'),
            type: 'warning'
         });
      }
     }
  }
};
</script>
<style lang="scss" scoped>
.sidebar_top {
  height: 110px;
  background: #fff;
}
</style>
