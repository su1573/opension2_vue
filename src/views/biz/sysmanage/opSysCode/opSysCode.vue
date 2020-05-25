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
    
        <el-table-column prop="lastoptdate" :label="$t('AppMain.Lastoptdate')" width="180" />
        <el-table-column prop="lastopttime" :label="$t('AppMain.Lastopttime')" width="180" />
        <el-table-column prop="linkcodetype" :label="$t('AppMain.Linkcodetype')" width="180" />
        <el-table-column prop="customerserviceper" :label="$t('AppMain.Customerserviceper')" width="180" />
        <el-table-column prop="codetype" :label="$t('AppMain.Codetype')" width="180" />
        <el-table-column prop="code" :label="$t('AppMain.Code')" width="180" />
        <el-table-column prop="codename" :label="$t('AppMain.Codename')" width="180" />
        <el-table-column prop="linkcode" :label="$t('AppMain.Linkcode')" width="180" />
        <el-table-column prop="sortorder" :label="$t('AppMain.Sortorder')" width="180" />
        <el-table-column prop="othersign" :label="$t('AppMain.Othersign')" width="180" />
        <el-table-column prop="createoperator" :label="$t('AppMain.Createoperator')" width="180" />
        <el-table-column prop="createoptdate" :label="$t('AppMain.Createoptdate')" width="180" />
        <el-table-column prop="createopttime" :label="$t('AppMain.Createopttime')" width="180" />
        <el-table-column prop="lastoperator" :label="$t('AppMain.Lastoperator')" width="180" />
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
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Lastoptdate')">
          <el-input v-model="form.lastoptdate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Lastopttime')">
          <el-input v-model="form.lastopttime" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Linkcodetype')">
          <el-input v-model="form.linkcodetype" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Customerserviceper')">
          <el-input v-model="form.customerserviceper" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Codetype')">
          <el-input v-model="form.codetype" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Code')">
          <el-input v-model="form.code" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Codename')">
          <el-input v-model="form.codename" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Linkcode')">
          <el-input v-model="form.linkcode" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Sortorder')">
          <el-input v-model="form.sortorder" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Othersign')">
          <el-input v-model="form.othersign" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Createoperator')">
          <el-input v-model="form.createoperator" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Createoptdate')">
          <el-input v-model="form.createoptdate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Createopttime')">
          <el-input v-model="form.createopttime" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Lastoperator')">
          <el-input v-model="form.lastoperator" autocomplete="off" />
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
import opSysCodeApi from "@/api/biz/sysmanage/opSysCode/opSysCode.js";

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
                {label: "Lastoptdate",
        value: "lastoptdate",
        type: "date"},
                        {label: "Lastopttime",
        value: "lastopttime",
        type: "undefined"},
                        {label: "Linkcodetype",
        value: "linkcodetype",
        type: "undefined"},
                        {label: "Customerserviceper",
        value: "customerserviceper",
        type: "undefined"},
                        {label: "Codetype",
        value: "codetype",
        type: "undefined"},
                        {label: "Code",
        value: "code",
        type: "undefined"},
                        {label: "Codename",
        value: "codename",
        type: "undefined"},
                        {label: "Linkcode",
        value: "linkcode",
        type: "undefined"},
                        {label: "Sortorder",
        value: "sortorder",
        type: "undefined"},
                        {label: "Othersign",
        value: "othersign",
        type: "undefined"},
                        {label: "Createoperator",
        value: "createoperator",
        type: "undefined"},
                        {label: "Createoptdate",
        value: "createoptdate",
        type: "date"},
                        {label: "Createopttime",
        value: "createopttime",
        type: "undefined"},
                        {label: "Lastoperator",
        value: "lastoperator",
        type: "undefined"}              ],
      form: { 
                lastoptdate: "",
                lastopttime: "",
                linkcodetype: "",
                customerserviceper: "",
                codetype: "",
                code: "",
                codename: "",
                linkcode: "",
                sortorder: "",
                othersign: "",
                createoperator: "",
                createoptdate: "",
                createopttime: "",
                lastoperator: "",
                p_end_flag: ""
      },
      queryForm: {
                lastoptdate: "",
                lastopttime: "",
                linkcodetype: "",
                customerserviceper: "",
                codetype: "",
                code: "",
                codename: "",
                linkcode: "",
                sortorder: "",
                othersign: "",
                createoperator: "",
                createoptdate: "",
                createopttime: "",
                lastoperator: "",
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
      opSysCodeApi.list(arr, result => {
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
        opSysCodeApi.update(arr, result => {
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
            lastoptdate: row.lastoptdate
          };
          opSysCodeApi.remove(arr, result => {
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
