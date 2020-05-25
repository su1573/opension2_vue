<template>
  <div>
    <!-- <tool @doQueryBtn="doQuery" /> -->
    <SearchTableItem :queryForm="queryFormData" :doQuery="query" :tableHeight="tableHeight"/>
    <el-table
      v-resizeTable
      ref="filterTable"
      :data="tableData"
      :height="100"
      stripe
      size="mini"
      border
      style="width: 100%;margin-top:15px;"
    >
    
        <el-table-column prop="menuid" :label="$t('AppMain.Menuid')" width="180" />
        <el-table-column prop="menuname" :label="$t('AppMain.Menuname')" width="180" />
        <el-table-column prop="upmenuid" :label="$t('AppMain.Upmenuid')" width="180" />
        <el-table-column prop="topmenuid" :label="$t('AppMain.Topmenuid')" width="180" />
        <el-table-column prop="menulevel" :label="$t('AppMain.Menulevel')" width="180" />
        <el-table-column prop="sortorder" :label="$t('AppMain.Sortorder')" width="180" />
        <el-table-column prop="linkpath" :label="$t('AppMain.Linkpath')" width="180" />
        <el-table-column prop="childcount" :label="$t('AppMain.Childcount')" width="180" />
        <el-table-column prop="userdescription" :label="$t('AppMain.Userdescription')" width="180" />
        <el-table-column prop="operator" :label="$t('AppMain.Operator')" width="180" />
        <el-table-column prop="makedate" :label="$t('AppMain.Makedate')" width="180" />
        <el-table-column prop="maketime" :label="$t('AppMain.Maketime')" width="180" />
        <el-table-column prop="state" :label="$t('AppMain.State')" width="180" />
        <el-table-column prop="iconskin" :label="$t('AppMain.Iconskin')" width="180" />
        <el-table-column fixed="right" :label="$t('global.Action')" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleClick(scope.row);dialogFormVisible = true;isEdit=false">{{$t('global.Details')}}</el-button>
          <el-button size="mini" type="text" @click="handleClick(scope.row);dialogFormVisible = true;isEdit=true">{{$t('global.Edit')}}</el-button>
          <el-button size="mini" type="text" @click="deleteClick(scope.row)">{{$t('global.Delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :c_total="total" @query="query" ref="pagination" :searchForm="searchForm"  />
    <el-dialog :visible.sync="dialogFormVisible" :title="$t('global.Show')+$t('global.Details')">
      <el-form :model="form" :inline="true" size="mini" :disabled="!isEdit">
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Menuid')">
          <el-input v-model="form.menuid" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Menuname')">
          <el-input v-model="form.menuname" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Upmenuid')">
          <el-input v-model="form.upmenuid" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Topmenuid')">
          <el-input v-model="form.topmenuid" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Menulevel')">
          <el-input v-model="form.menulevel" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Sortorder')">
          <el-input v-model="form.sortorder" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Linkpath')">
          <el-input v-model="form.linkpath" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Childcount')">
          <el-input v-model="form.childcount" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Userdescription')">
          <el-input v-model="form.userdescription" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Operator')">
          <el-input v-model="form.operator" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Makedate')">
          <el-input v-model="form.makedate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Maketime')">
          <el-input v-model="form.maketime" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.State')">
          <el-input v-model="form.state" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Iconskin')">
          <el-input v-model="form.iconskin" autocomplete="off" />
        </el-form-item>
              </el-form> 
      <div slot="footer" class="dialog-footer">
        <el-button v-show="isEdit" plain @click="dialogFormVisible = false">{{$t('global.Cancel')}}</el-button>
        <el-button type="primary" @click="update()">{{$t('global.Confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import QueryDialog from "@/components/Dialog";
import SearchTableItem from "@/components/SearchTableItem";
import Tool from "@/components/Tool";
import opSysMenuApi from "@/api/biz/sysmanage/opSysMenu/opSysMenu.js";

export default {
  name: "TestA",
  components: {
    pagination,
    QueryDialog,
    Tool,
    SearchTableItem
  },
  data() {
    return {
      tableHeight: null,
      isEdit: false,
      activeDialog: false,
      dialogFormVisible: false,
      tableData: [],
      total: 0,
      formLabelWidth: "90px",
      searchForm: null,
      queryFormData: [
                {label: "Menuid",
        value: "menuid",
        type: "undefined"},
                        {label: "Menuname",
        value: "menuname",
        type: "undefined"},
                        {label: "Upmenuid",
        value: "upmenuid",
        type: "undefined"},
                        {label: "Topmenuid",
        value: "topmenuid",
        type: "undefined"},
                        {label: "Menulevel",
        value: "menulevel",
        type: "undefined"},
                        {label: "Sortorder",
        value: "sortorder",
        type: "undefined"},
                        {label: "Linkpath",
        value: "linkpath",
        type: "undefined"},
                        {label: "Childcount",
        value: "childcount",
        type: "undefined"},
                        {label: "Userdescription",
        value: "userdescription",
        type: "undefined"},
                        {label: "Operator",
        value: "operator",
        type: "undefined"},
                        {label: "Makedate",
        value: "makedate",
        type: "date"},
                        {label: "Maketime",
        value: "maketime",
        type: "undefined"},
                        {label: "State",
        value: "state",
        type: "undefined"},
                        {label: "Iconskin",
        value: "iconskin",
        type: "undefined"}              ],
      form: { 
                menuid: "",
                menuname: "",
                upmenuid: "",
                topmenuid: "",
                menulevel: "",
                sortorder: "",
                linkpath: "",
                childcount: "",
                userdescription: "",
                operator: "",
                makedate: "",
                maketime: "",
                state: "",
                iconskin: "",
                p_end_flag: ""
      },
      queryForm: {
                menuid: "",
                menuname: "",
                upmenuid: "",
                topmenuid: "",
                menulevel: "",
                sortorder: "",
                linkpath: "",
                childcount: "",
                userdescription: "",
                operator: "",
                makedate: "",
                maketime: "",
                state: "",
                iconskin: "",
                p_end_flag: ""
      }
    };   
  },
  activated() {
      this.query({searchForm: this.searchForm});
  },
  watch: {
    tableData() {
      this.$nextTick(() => {
          this.tableHeight = this.$el.offsetHeight;
      })
    }
  },
  methods: {
    query(opt) {
      let {pageSize = this.$refs.pagination.pageSize, pageNum = 1, isUse, searchForm} = opt;
          let arr = {
            offset: '',
            limit: ''
          };
          if (isUse) {
              arr = this.searchForm;
              pageNum = this.currentPage;
          } else {
              arr = searchForm || {};
              this.searchForm = searchForm || {};
          }
          arr.offset = (pageNum - 1) * pageSize;
          arr.limit = pageSize;
      opSysMenuApi.list(arr, result => {
        if (result.status === 200) {
          this.tableData = result.data.rows;
          this.total = result.data.total;
        }
        this.activeDialog = false;
      });
    },
    handleClick(row) {
      this.form = row;
    },
    update() {
      if (this.isEdit) {
        let arr = this.form;
        this.dialogFormVisible = false;
        opSysMenuApi.update(arr, result => {
          this.$message({
            type: "success",
            message: this.$t('global.UpdateSuccess')
          });
        });
      } else {
        this.dialogFormVisible = false;
      }
    },
    deleteClick(row) {
      this.$confirm(this.$t('global.ConfirmDelete'), this.$t('global.Warn'), {
        confirmButtonText: this.$t('global.Confirm'),
        cancelButtonText: this.$t('global.Cancel'),
        type: "warning"
      })
        .then(() => {
          // 请求后台，成功后调用
          var arr = {
            menuid: row.menuid
          };
          opSysMenuApi.remove(arr, result => {
            if (result.status === 200) {
              this.$message({
                type: "success",
                message: this.$t('global.DeleteSuccess')
              });
              this.query({pageSize:10,pageNum:1});
            } else {
              this.$message({
                type: "fail",
                message: this.$t('global.DeleteFailure')
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t('global.DeleteCanceled')
          });
        });
    }
  }
};
</script>
