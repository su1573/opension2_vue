<template>
    <img :src="require('@/assets/images/' + logoSrc)" class="logo_a" alt=""/>
</template>
<script>
    import {mapGetters} from "vuex"
    export default {
        computed:{
            ...mapGetters(["sidebar"]),
            logoSrc(){
                return this.sidebar.opened?this.$config.system.logo:"logo_s.png";
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@/styles/variables.scss";

    .logo_a {
        /*float:left;
        margin-top: 20px;
        margin-left: 14px;*/
        // background: $themeColor;
        padding:13px 26px 16px 26px;
        width: 100%;
        //display: block;
        //padding-top: 5px;
        //margin: 0 auto;
        // margin: 20px 0 19px;
        //height: 45px;
    }

    /*.logo_text {
      font-family: LiSu, KaiTi, KaiTi_GB2312;
      color: #333;
      font-size: 28px;
      padding: 0;
      margin: 0;
      width: 100%;
      text-align: center;
    }*/
</style>
