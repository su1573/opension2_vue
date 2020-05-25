<template>
    <div>
        <div :class="isShowSearch?'tool':'toolHidden'">
            <section v-show="isShowSearch" class="btn-group">
                <el-button type="primary" size="mini" @click="queryBtn">
                    <!--<i class="iconfont iconkaishichaxun"></i>-->{{$t('global.Search')}}
                </el-button>
                <el-button type="primary" size="mini" @click="doReset">
                    <!--<i class="iconfont iconzhongzhi"></i>-->{{$t('global.Reset')}}
                </el-button>
            </section>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from "vuex";
    import ShadowButton from "@/components/ShadowButton"
    /*import button from "@/assets/images/button.png"
    import button_danger from "@/assets/images/button_danger.png"*/

    export default {
        name: "Tool",
        components: {
            ShadowButton
        },
        props: {
            shows: {
                type: Array,
                default: function () {
                },
            },
            isShowSearch: {
                type: Boolean,
                default: true
            },
            tableHeight: {
                default: null,
                validator(val) {
                    return (typeof val === "number" || typeof val === "object")
                }
            },
            shadowButtons: {
                type: Array,
                default: () => {
                    return [{
                        iconClass: "iconxingzhuang", title: "导出Excel", callback: () => {
                        }
                    }]
                }
            }
        },
        data() {
            return {
                queryData: {
                    show: false
                },
                /*button:button,
                exportFontStyle:{
                    position:"absolute",
                    top:"10px",
                    right:"29px",
                    color:"#FFF",
                    cursor:"pointer"
                }*/
            };
        },
        computed: {
            ...mapGetters({
                getQueryData: "queryData",
                activeD: "activeDialog",
                dialogList: "dialogList"
            }),
            top() {
                return this.tableHeight + 50;
            },
            exportBtnStyle() {
                return {
                    'z-index': 9999,
                    top: `${this.top}px!important`,
                    opacity: this.tableHeight ? 1 : 0,
                    position: "absolute",
                    // display: "inline-block",
                    height: 0,
                }
            }
        },
        methods: {
            refreshBtn() {
                const _fullPath = this.$router.currentRoute.fullPath;
                this.$router.replace({
                    path: "/redirect" + _fullPath + "?key=" + Math.random
                });
            },
            queryBtn() {
                this.$emit("doQueryBtn", {});
                if (this.$parent.$parent.$refs.pagination) {
                    this.$parent.$parent.$refs.pagination.currentPage = 1
                } else if (this.$parent.$parent.$parent.$refs.pagination) {
                    this.$parent.$parent.$parent.$refs.pagination.currentPage = 1
                }
            },
            importBtn() {
                this.$emit("import", {"": ""});
            },
            /* query() {
                 this.$emit("query", {
                     pageNum: this.currentPage,
                     pageSize: this.pageSize
                 });
             },*/
            isShow(opt) {
                if (!this.shows) return true;
                return !this.shows.filter(item => item === opt).length > 0;
            },
            doReset() {
                this.$emit("doReset");
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@/styles/variables.scss";

    .tool, .toolHidden {
        white-space: nowrap;
        position: relative;
        height: 28px;
        // #b3d8ff
        .btn-group {
            position: absolute;
            right: 52px;
            top: -13px;
        }

        .el-button-group {
            .el-button--primary:not(:first-child):not(:last-child) {
                border-left-color: #b3d8ff;
                border-right-color: #b3d8ff;
            }
        }

        .el-button-group .el-button--primary:last-child {
            border-left-color: #b3d8ff;
        }
    }

    .toolHidden {
        height: 0;
        margin-bottom: 0;
        border-bottom: none;
    }

    .iconfont {
        font-size: 12px;
        // padding-right: 5px;
    }
</style>
