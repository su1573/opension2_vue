<template>
    <div class="tags-view-container">
        <!--<scrollpane ref="scrollPane" class="tags-view-wrapper">-->
        <div class="tags-view-wrapper">
            <router-link
                    v-for="tag in visitedViews"
                    ref="tag"
                    :class="isActive(tag) ? 'active' : ''"
                    :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                    :key="tag.path"
                    tag="span"
                    class="tags-view-item"
                    @click.middle.native="closeSelectedTag(tag)"
                    :data-path="tag.path"
                    @contextmenu.prevent.native="openMenu(tag, $event)"
            >
                {{ $t('Navbars.'+tag.meta.nameEgl) }}
                <span :class="['base',tag.path === '/home'?'':'el-icon-close']"
                      @click.prevent.stop="closeSelectedTag(tag)"
                ></span>
            </router-link>
        </div>
        <!-- </scrollpane>-->
        <ul
                v-show="visible"
                :style="{ left: left + 'px', top: top + 'px' }"
                class="contextmenu"
        >
            <!-- <li @click="refreshSelectedTag(selectedTag)">刷新</li> -->
            <li @click="closeSelectedTag(selectedTag)">{{$t('global.Close')}}</li>
            <li @click="closeOthersTags">{{$t('global.CloseOthers')}}</li>
            <li @click="closeAllTags">{{$t('global.CloseAll')}}</li>
        </ul>
    </div>
</template>

<script>
    import scrollpane from "@/components/ScrollPane";
    import { mapGetters, mapMutations } from "vuex";

    export default {
        components: {scrollpane},
        props: {
            isLong: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tagsData: [],
                visible: false,
                top: 0,
                left: 0,
                selectedTag: {},
                tagViews_W: 500
            };
        },
        computed: {
//  visitedViews() {
//    console.log(this.$routes);
//    console.log(this.$store.state.tagsView.visitedViews);
//    return this.$store.state.tagsView.visitedViews;
//  },
            visitedViews() {
                //console.log(55555)
               this.tagsData = this.$store.state.tagsView.visitedViews;
                var checkNum = 0;
                for (var i = 0; i < this.tagsData.length; i++) {
                    if (this.tagsData[i].path == "/processPoolPerDetail" || this.tagsData[i].path == "/hetongliebiao" || this.tagsData[i].path == "/hetongxiangqing" || this.tagsData[i].path == "/claimDetailone" || this.tagsData[i].path == "/billDetailone") {
                        checkNum++;
                    }
                   
                }
               
                ;
                for (var i = 0; i < this.tagsData.length; i++) {
                    if (this.tagsData[i].path == "/processPoolPerDetail" || this.tagsData[i].path == "/hetongliebiao" || this.tagsData[i].path == "/hetongxiangqing" || this.tagsData[i].path == "/claimDetailone" || this.tagsData[i].path == "/billDetailone") {
                      if (checkNum > 1) {
                            this.tagsData.splice(i, 1);
                            checkNum--;
                            i--;
                        }
                    }
                }
                ;
                // if(this.tagsData.length < 3){
                //   return 
                // }
                //console.log(' this.tagsData222',  this.tagsData)
                  return this.tagsData
               
            },
            ...mapGetters(["dialogList", "activeDialog"])
        },
        watch: {
            $route() {
                this.addViewTags();
                //this.moveToCurrentTag();
                // this.changeDialog()
            },
            visible(value) {
                if (value) {
                    document.body.addEventListener("click", this.closeMenu);
                } else {
                    document.body.removeEventListener("click", this.closeMenu);
                }
            }
//             tagsData: {
//               handler(newName) {
//                 if (newName.length > 9) {
//                     this.$message({
//                         message: this.$t('global.openTooMany'),
//                         type: 'warning'
//                      });
//                   }
//                 }
//             }
        },
        mounted() {
            this.addViewTags();
        },
        methods: {
             ...mapMutations(["clickCountfun"]),
            isActive(route) {
                return route.path === this.$route.path;
            },
            changeDialog() {
                const {name} = this.$route;
                const newArr = this.dialogList.filter(item => item.name === name);
                if (newArr.length > 0) {
                    this.$store.dispatch("set_dialog_active", {
                        name: newArr[0].name,
                        status: newArr[0].status
                    });
                }
            },
            addViewTags() {
                const {name} = this.$route;
                if (name) {
                    this.$store.dispatch("addView", this.$route);
                }
                return false;
            },
            refreshSelectedTag(view) {
                // 刷新功能有问题，刷新之后进入404页
                this.$store.dispatch("delCachedView", view).then(() => {
                    const {fullPath} = view;
                    this.$nextTick(() => {
                        this.$router.replace({
                            path: "/redirect" + fullPath
                        });
                    });
                });
            },
            closeSelectedTag(view) {
                this.clickCountfun(0)
                this.$store.dispatch("delView", view).then(({visitedViews}) => {
                    if (this.isActive(view)) {
                        const latestView = visitedViews.slice(-1)[0];
                        if (latestView) {
                            this.$router.push(latestView);
                        } else {
                            this.$router.push("/");
                        }
                    }
                });
                // this.$store.dispatch('del_dialog_list', this.$route.name)
            },
            closeOthersTags() {
                this.$router.push(this.selectedTag);
                this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
                    //this.moveToCurrentTag();
                });
            },
            closeAllTags() {
                this.$store.dispatch("delAllViews");
                this.$router.push("/");
            },
            openMenu(tag, e) {
                const menuMinWidth = 105;
                const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
                const offsetWidth = this.$el.offsetWidth; // container width
                const maxLeft = offsetWidth - menuMinWidth; // left boundary
                const left = e.clientX - offsetLeft + 15; // 15: margin right

                if (left > maxLeft) {
                    this.left = maxLeft;
                } else {
                    this.left = left;
                }
                this.top = e.clientY - 60;

                this.visible = true;
                this.selectedTag = tag;
            },
            closeMenu() {
                this.visible = false;
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/variables.scss";

    .tags-view-container {
        box-sizing: border-box;
        width: 100%;

        .tags-view-wrapper {
            white-space: nowrap;
            overflow: hidden;

            .tags-view-item {
                display: inline-block;
                //position: relative;
                cursor: pointer;
                height: $navHeight;
                line-height: $navHeight;
                border-radius: 4px 4px 0 0;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-bottom: none;
                background: rgba(0, 0, 0, 0.02);
                color: rgba(0, 0, 0, 0.65);
                padding: 0 8px;
                font-size: 13px;
                font-weight: 500;
                box-sizing: border-box;
                margin-right: 2px;

                &::before {
                    content: "";
                    // background: $themeBgA;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }

                //margin-left: 5px;
                //margin-top: 4px;
                &:first-of-type {
                    //margin-left: 15px;
                }

                &:last-of-type {
                    // margin-right: 15px;
                }

                &.active {
                    background-color: #fff;
                    color: #005C8D;
                    font-weight: 500;
                    height: 32px;
                    // border-color: $themeHover;
                }
            }
        }

        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 100;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 0px 0px 5px 0 rgba(0, 0, 0, 0.3);
            line-height: 15px;

            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;

                &:hover {
                    background: #eee;
                }
            }
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    //reset element css of el-icon-close
    .tags-view-wrapper {
        .tags-view-item {
            .base {
                width: 20px;
                height: 20px;
                font-size: 20px;
                vertical-align: -3px;
                border-radius: 50%;
                text-align: center;
                display: inline-block;
                transition: all 0.28s cubic-bezier(0.645, 0.045, 0.355, 1);
                transform-origin: 100% 50%;

                &.el-icon-close {
                    &:before {
                        transform: scale(0.6);
                        display: inline-block;
                        vertical-align: 0;
                    }

                    &:hover {
                        background-color: #b4bccc;
                        color: #fff;
                    }
                }
            }
        }
    }
</style>
