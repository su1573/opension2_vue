<template>
   <div class="searchTableItem">
        <div class="icon-left">
            <h2 class="card-title" @click="toggleSearch">
                <i :class="['iconfont ','my-iconfont',isShowSearch?'iconGroup10-copy':'iconGroup10']"></i>{{$t('global.Search')}}
            </h2>
            <tool :isShowSearch="isShowSearch" key="claims-tool"
                  @doQueryBtn="query" @doReset="doReset()" :shadowButtons="shadowButtons"/>
        </div>
        <el-collapse-transition>
            <el-card v-if="isShowSearch" shadow="hover">
                <el-form :class="['clearfix',isShowSearch?'active':'']" key="cmsForm" size="mini" :inline="true"
                         label-position="right" label-width="110px">
                    <el-col :span="8" v-for="(item,index) in queryForm" :key="index">
                        <el-form-item v-if="item.type==='undefined'" :label="$t('AppMain.'+(item.label))" 
                        :key="index">
                            <el-input :data-msg="item.length?'limit':''" v-on:input="inp(item.value,$event)" 
                                      :maxlength="item.length?item.length:''" v-model="searchForm[item.value]"/>
                        </el-form-item>
                        <el-form-item v-if="item.type=='RADIO'" :label="$t('AppMain.'+(item.label))" :key="index" >
                            <el-radio-group v-model="searchForm[item.value]" @change="radioChange" >
                                <el-radio :label="'y'">是</el-radio>
                                <el-radio :label="'n'">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="item.type==='SELECT'" :label="$t('AppMain.'+(item.label))" :key="index" >
                             <el-select v-model="searchForm[item.value]" filterable :placeholder="$t('global.pleaseSelect')"   size="small" style="width:209px;">
                                <el-option
                                 v-for="option in item.children"
                                :key="`${option.value}+${index}`"
                                :label="option.label"
                                :value="option.label">
                                <span>{{ option.label }}</span>-<span>{{ option.value }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if="item.type==='radio'" :label="$t('AppMain.'+(item.label))" :key="index">
                            <el-radio-group v-model="searchForm[item.value]">
                                <el-radio v-for="(option) in item.children" :label="option.value" :key="option.value">
                                    {{option.label}}
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item v-if="item.type==='date'" :label="$t('AppMain.'+(item.label))" 
                                      :key="index">
                            <el-date-picker v-model="searchForm[item.value]" type="date" value-format="yyyy-MM-dd"
                                            :placeholder="$t('global.selectDate')" width="209"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="item.type==='year'" :label="$t('AppMain.'+(item.label))" :key="index">
                            <el-date-picker v-model="searchForm[item.value]" type="year" value-format="yyyy"
                                            :placeholder="$t('global.selectDate')" width="209"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="item.type==='month'" :label="$t('AppMain.'+(item.label))" :key="index">
                            <el-date-picker v-model="searchForm[item.value]" type="month" value-format="yyyyMM"
                                            :placeholder="$t('global.selectYears')"  width="209"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="item.type==='daterange'" :label="$t('AppMain.'+(item.label))"
                                      :key="index">
                            <el-date-picker v-model="searchForm['startDate']"
                                            :class="[searchForm['startDate']?'datePick hasValue':'datePick']"
                                            type="date"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                            <span class="date-range-divider">至</span>
                            <el-date-picker v-model="searchForm['endDate']"
                                            :class="[searchForm['endDate']?'datePick hasValue':'datePick']"
                                            type="date"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item v-if="item.type==='dayTime'" :key="index">
                            <el-select v-model="searchForm['label']" class="short-select" clearable>
                                <el-option v-for="(it,ind) in item.label" :key="it.label" :label="it.label"
                                           :value="it.value"></el-option>
                            </el-select>
                          >
                            <el-input class="short-input" :value="label.day"
                                      @input="(val)=>handleNumber('day',val)"></el-input>
                            日
                            <el-input class="short-input" :value="label.time"
                                      @input="(val)=>handleNumber('time',val)"></el-input>
                            时
                        </el-form-item>
                    </el-col>
                </el-form>
                <!--</transition-group>-->
            </el-card>
        </el-collapse-transition>
    </div>
</template>

<script>
    import Vue from "vue"
    import {mapGetters} from "vuex"
    import Tool from "@/components/Tool";

    export default {
        name: "SearchTableItem",
        components: {
            Tool
        },
        props: {
            searchOnly: String,
            queryForm: Array,
            doQuery: Function,
            shadowButtons: {
                type: Array
            }
        },
        data() {
            let searchForm = {};
            this.queryForm.forEach((item) => {
                if (item.default) {
                    return searchForm[item.value] = item.default;
                }
                searchForm[item.value] = ""
            });
            return {
                isShowSearch: false,
                searchForm,
                showHeight: null,
                hiddenHeight: null,
                label: {
                    day: "",
                    time: ""
                }
            }
        },
        watch: {
            'searchForm.label'(val, preVal) {
                if (val === "") {
                    this.label = {time: "", day: ""};
                    Vue.delete(this.searchForm, "");
                }
                if (val !== preVal) {
                    Vue.delete(this.searchForm, preVal);
                }
            },
            'label.time'(val) {
                const newVal = `${val}`.replace(/.\D/g, "");
                if (newVal > 23) {
                    const str = newVal.slice(0, 2);
                    if (newVal.length >= 2) {
                        this.label.time = str > 23 ? 23 : str;
                    }
                } else {
                    this.label.time = newVal;
                }
            }
        },
        mounted() {
            if (this.searchForm.onlyBussiness === "") {
                this.searchForm.onlyBussiness = "n"
            }
            //console.log(8888888888888888888888, this.queryForm)
        },
        methods: {
            handleNumber(key, val) {
                this.label[key] = `${val}`.replace(/\D/g, "");
            },
            radioChange(a) {
                if (a === "y") {
                    this.queryForm[7].isShow = true;
                    this.queryForm[8].isShow = true;
                    this.queryForm[9].isShow = true;
                } else if (a === "n") {
                    this.queryForm[7].isShow = undefined;
                    this.queryForm[8].isShow = undefined;
                    this.queryForm[9].isShow = undefined;
                }
            },
            inp(data) {
                if (event.currentTarget.dataset.msg === "limit") {
                    this.searchForm[data] = this.searchForm[data].replace(/[^0-9.]/g, '')
                }
            },
            query() {
                var s = this.searchForm.onlyBussiness;
                Object.keys(this.searchForm).forEach(key => {
                    if (this.searchForm[key] === null || this.searchForm[key] === "") {
                        Vue.delete(this.searchForm, key);
                    } else if (key === "label" && this.searchForm.label !== "") {
                        const newKey = this.searchForm[key];
                        this.searchForm[newKey] = (this.label.day ? `${this.label.day}日` : "0日") + (this.label.time ? `${this.label.time}时` : "0时");
                    } else {
                        this.searchForm[key] = `${this.searchForm[key]}`.trimLeft().trimRight();
                    }
                });
                this.doQuery({
                    searchForm: this.searchForm,
                    pageNum: 1,
                    pageSize: this.$parent.$parent.$refs.pagination ? this.$parent.$parent.$refs.pagination.pageSize : 20
                });
            },
            toggleSearch() {
                this.isShowSearch = !this.isShowSearch;
            },
            doReset() {
             this.queryForm.forEach((item) => {
                    if (item.default) {
                        return this.searchForm[item.value] = item.default;
                    }
                    this.searchForm[item.value] = "";
                    if (item.type === "RADIO") {
                        this.searchForm[item.value] = "";
                        this.radioChange("n");
                    }
                    if (Array.isArray(item.label)) {
                        this.label = {
                            day: "",
                            time: ""
                        }
                        Vue.delete(this.searchForm, "label");
                        item.label.forEach(lab => {
                            Vue.delete(this.searchForm, lab.value);
                        })
                    }
                });
                Vue.delete(this.searchForm, "startDate");
                Vue.delete(this.searchForm, "endDate");
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/csss">
    @import "@/styles/variables.scss";

    .datePick.el-input--suffix {
        width: 105px !important;
    }


    .searchTableItem {
        .short-input {
            width: 70px !important;
        }

        .short-select {
            width: 118px !important;
            margin: 0 20px 0 -6px !important;
            display: inline-block !important;
        }

        .card-title {
            display: inline-block;
            margin: 0 43px 0 10px;
            font-style: normal;
            font-weight: 400;
            height: 18px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
            line-height: 22px;
            vertical-align: text-top;
        }

        .my-iconfont {
            color: rgba(0, 0, 0, 0.65);
            margin: 0 15px;
            font-size: 10px;
        }

        .el-form--inline .el-form-item {
            margin-right: 0;
        }
    }

    .el-card /deep/ {
        .el-card__header {
            border: none !important;
            line-height: 36px;
            height: 36px;
            box-sizing: border-box;
            background: #F5F5F5;
            padding: 0 10px 0 20px;
        }

        .el-card__body {
            padding: 0 30px 0 10px;

            .active {
                padding: 20px 0;
            }

            .date-range-divider {
                font-size: 12px;
                color: #666;
                margin: 0 3px;
            }

            .el-form-item__content, .el-input--mini.el-input__inner {
                width: 209px;
            }
        }

    }

    .icon-left {
        height: 32px;
        margin-bottom: 7px;
    }

    .icon-left i {
        float: left;
        margin-top: 5px;
    }

    .el-date-editor--daterange.el-input__inner {
        width: 209px;
    }

    .el-form-item--mini.el-form-item {
        margin-bottom: 10px;
    }

    .el-form-item--mini .el-form-item__content .el-input--mini {
        width: 209px;
    }

    .el-form-item--mini .el-form-item__content .el-select--mini {
        width: 209px;
    }
 .el-form-item .el-select {
    width: 100%;
  }
    .el-card .el-card__body .active {
        padding: 10px 0 0 0;
    }
</style>
