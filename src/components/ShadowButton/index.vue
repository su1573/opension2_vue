<template>
    <article>
        <div v-if="type&&isShowButton" :class="['export-btn',isShowSearch?'isShow':'isHide']" :style="exportBtnStyle">
            <!--<input type="image" :src="imgSrc" :alt="title"/>-->
            <div @click="disabled?null:$emit('doCallback')" class="click-range">
                <div :class="['fontStyle',disabled?'white':'']" :style="typefaceColor"><i
                        :class="['iconfont',iconClass,'fontStyle']"></i>{{title}}
                </div>
            </div>
        </div>
        <el-button v-else @click="disabled?null:$emit('doCallback')" :style="exportBtnStyle" type="primary">
            {{title}}
        </el-button>
    </article>
</template>

<script>
    import button from "@/assets/images/button.png"
    import button_danger from "@/assets/images/button_danger.png"
    import button_cancel from "@/assets/images/button_cancel.png"
    import button_white from "@/assets/images/button-white.png"

    export default {
        name: "ShadowButton",
        props: {
            regcomplete: {
                type: String
            },
            socIsLeaf: {
                type: String
            },
            iconClass: {
                type: String
            },
            title: {
                type: String,
                required: true
            },
            type: {
                type: String,
            },
            isFixed: {
                type: Boolean,
                default: false
            },
            isShowSearch: {
                type: Boolean,
                default: true
            },
            index: {
                type: Number
            },
            isShow: {
                type: Boolean
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isShowButton() {
                return this.regcomplete === 'Y' && this.socIsLeaf === 'Y' || !this.regcomplete && !this.socIsLeaf;
            },
            imgInfo() {
                //index=0,按钮居左，数值增大，按钮靠右移动，两个按钮间距至少相差1
                switch (this.type) {
                    case 'primary':
                        return {
                            url: button,
                            color: '#FFFFFF',
                            index1: this.index ? (this.index * 9.4 + 8) : (this.isFixed ? 22.4 : 3.8),
                            isShow: this.isShow ? 'hidden' : 'inherit'
                        };
                    case 'danger':
                        return {
                            url: button_danger,
                            color: '#FFFFFF',
                            index1: this.index ? (this.index * 9.4 + 8) : (this.isFixed ? 22.4 : 3.8),
                            isShow: this.isShow ? 'hidden' : 'inherit'
                        };
                    case 'cancel':
                        return {
                            url: button_cancel,
                            color: '#FFFFFF',
                            index1: this.index ? (this.index * 9.4 + 8) : (this.isFixed ? 22.4 : 3.8),
                            isShow: this.isShow ? 'hidden' : 'inherit'
                        };
                    case 'white':
                        return {
                            url: button_white,
                            color: '#005C8D',
                            index1: this.index ? (this.index * 9.4 + 8) : (this.isFixed ? 22.4 : 3.8),
                            isShow: this.isShow ? 'hidden' : 'inherit'
                        };
                    default:
                        return {
                            index1: this.index ? (this.index * 9.4 + 8) : (this.isFixed ? 22.4 : 3.8),
                            isShow: this.isShow ? 'hidden' : 'inherit'
                        }
                }
            },

            exportBtnStyle() {
                return {
//                    top: `${this.top}px!important`,
//                    opacity: this.tableHeight ? 1 : 0,
                    //position: "fixed",
                    // display: "inline-block",
                    width: "84px",
                    height: "38px",
                    "line-height": "38px",
                    padding: 0,
                    ...
                        this.isFixed ? {position: "fixed", bottom: "0"} : {
                            'margin': '10px 0',
                            position: "absolute",
                            bottom: "10px"
                        },
                    ...
                    this.imgInfo.url && {
                        background: this.disabled ? "" : `url(${this.imgInfo.url}) no-repeat`,
                    },
                    'background-position': '0 0',
                    left:
                        `${this.imgInfo.index1}%`,
                    visibility:
                        `${this.imgInfo.isShow}`
                }
            },
            typefaceColor() {
                return {
                    color: this.disabled ? 'rgba(0,0,0,0.55)' : `${this.imgInfo.color}`,
                    'border': this.disabled ? "1px solid rgba(0,0,0,0.55)" : "none"

                }
            }
        },
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "@/styles/variables.scss";

    .export-btn {
        //margin-left:$sidebarWidth;
        width: 84px;
        height: 38px;
        z-index: 999;
        display: inline-block !important;
        background-size: 84px 38px !important;
        /*cursor: pointer;*/

        &.isShow {
            transition: none;
        }

        &.isHide {
            transition: .2s linear;
        }
    }

    .fontStyle {
        width: 84px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        margin-right: 5px;

        &.white {
            height: 36px;
            border-radius: 5px;
            cursor: text;
        }
    }

    .iconfont {
        left: 15px !important;
        transform: translateX(0) !important;
        font-size: 13px;
    }

    .click-range {
        cursor: pointer;
        height: 38px;
        width: 84px
    }
</style>
