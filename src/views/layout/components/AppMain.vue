<template>
  <section class="app-main">
    <el-scrollbar class="app-container">
      <transition name="fade" mode="out-in">
        <!-- 全部缓存 -->
        <div class="app-main-container">
          <keep-alive :exclude="['Home', 'Redirect']">
            <router-view :key="key" />
          </keep-alive>
        </div>
        <!-- 有选择性的缓存 -->
        <!-- <keep-alive :include="cachedViews">
          <router-view :key="key"/>
        </keep-alive> -->
      </transition>
    </el-scrollbar>
  </section>
</template>

<script>
export default {
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
};
</script>

<style lang="scss" scoped>
// .app-main {
//   /*50 = navbar  */
//   min-height: calc(100vh - 50px);
//   position: relative;
//   overflow: visible;
//   > div {
//     height: calc(100vh - 80px);
//     // padding-bottom: 60px;
//   }
// }
.app-main {
        //min-height: calc(100vh - 50px);
        /* position: relative;
         overflow: visible;
         min-height: 576px;*/
        position: absolute;
        left: 0;
        right: 0;
        top: 80px;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;

        > div {
            height: calc(100vh - 80px);
            // padding-bottom: 60px;
        }

        .app-main-container {
            background: #fff;
            padding: 0 25px 0;
            margin-bottom: 30px;
        }
    }
</style>
