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
    
        <el-table-column prop="operator" :label="$t('AppMain.Operator')" width="180" />
        <el-table-column prop="makedate" :label="$t('AppMain.Makedate')" width="180" />
        <el-table-column prop="maketime" :label="$t('AppMain.Maketime')" width="180" />
        <el-table-column prop="usercode" :label="$t('AppMain.Usercode')" width="180" />
        <el-table-column prop="username" :label="$t('AppMain.Username')" width="180" />
        <el-table-column prop="comcode" :label="$t('AppMain.Comcode')" width="180" />
        <el-table-column prop="password" :label="$t('AppMain.Password')" width="180" />
        <el-table-column prop="email" :label="$t('AppMain.Email')" width="180" />
        <el-table-column prop="phone" :label="$t('AppMain.Phone')" width="180" />
        <el-table-column prop="userdescription" :label="$t('AppMain.Userdescription')" width="180" />
        <el-table-column prop="userstate" :label="$t('AppMain.Userstate')" width="180" />
        <el-table-column prop="validstartdate" :label="$t('AppMain.Validstartdate')" width="180" />
        <el-table-column prop="validenddate" :label="$t('AppMain.Validenddate')" width="180" />
        <el-table-column prop="logonwrongnumber" :label="$t('AppMain.Logonwrongnumber')" width="180" />
        <el-table-column prop="lastlogondate" :label="$t('AppMain.Lastlogondate')" width="180" />
        <el-table-column prop="lockstatus" :label="$t('AppMain.Lockstatus')" width="180" />
        <el-table-column prop="alterpassworddate" :label="$t('AppMain.Alterpassworddate')" width="180" />
        <el-table-column prop="onlinestate" :label="$t('AppMain.Onlinestate')" width="180" />
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
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Operator')">
          <el-input v-model="form.operator" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Makedate')">
          <el-input v-model="form.makedate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Maketime')">
          <el-input v-model="form.maketime" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Usercode')">
          <el-input v-model="form.usercode" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Username')">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Comcode')">
          <el-input v-model="form.comcode" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Password')">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Email')">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Phone')">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Userdescription')">
          <el-input v-model="form.userdescription" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Userstate')">
          <el-input v-model="form.userstate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Validstartdate')">
          <el-input v-model="form.validstartdate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Validenddate')">
          <el-input v-model="form.validenddate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Logonwrongnumber')">
          <el-input v-model="form.logonwrongnumber" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Lastlogondate')">
          <el-input v-model="form.lastlogondate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Lockstatus')">
          <el-input v-model="form.lockstatus" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Alterpassworddate')">
          <el-input v-model="form.alterpassworddate" autocomplete="off" />
        </el-form-item>
                <el-form-item :label-width="formLabelWidth" :label="$t('AppMain.Onlinestate')">
          <el-input v-model="form.onlinestate" autocomplete="off" />
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
import opSysUserApi from "@/api/biz/sysmanage/opSysUser/opSysUser.js";

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
                {label: "Operator",
        value: "operator",
        type: "undefined"},
                        {label: "Makedate",
        value: "makedate",
        type: "date"},
                        {label: "Maketime",
        value: "maketime",
        type: "undefined"},
                        {label: "Usercode",
        value: "usercode",
        type: "undefined"},
                        {label: "Username",
        value: "username",
        type: "undefined"},
                        {label: "Comcode",
        value: "comcode",
        type: "undefined"},
                        {label: "Password",
        value: "password",
        type: "undefined"},
                        {label: "Email",
        value: "email",
        type: "undefined"},
                        {label: "Phone",
        value: "phone",
        type: "undefined"},
                        {label: "Userdescription",
        value: "userdescription",
        type: "undefined"},
                        {label: "Userstate",
        value: "userstate",
        type: "undefined"},
                        {label: "Validstartdate",
        value: "validstartdate",
        type: "date"},
                        {label: "Validenddate",
        value: "validenddate",
        type: "date"},
                        {label: "Logonwrongnumber",
        value: "logonwrongnumber",
        type: "undefined"},
                        {label: "Lastlogondate",
        value: "lastlogondate",
        type: "date"},
                        {label: "Lockstatus",
        value: "lockstatus",
        type: "undefined"},
                        {label: "Alterpassworddate",
        value: "alterpassworddate",
        type: "date"},
                        {label: "Onlinestate",
        value: "onlinestate",
        type: "undefined"}              ],
      form: { 
                operator: "",
                makedate: "",
                maketime: "",
                usercode: "",
                username: "",
                comcode: "",
                password: "",
                email: "",
                phone: "",
                userdescription: "",
                userstate: "",
                validstartdate: "",
                validenddate: "",
                logonwrongnumber: "",
                lastlogondate: "",
                lockstatus: "",
                alterpassworddate: "",
                onlinestate: "",
                p_end_flag: ""
      },
      queryForm: {
                operator: "",
                makedate: "",
                maketime: "",
                usercode: "",
                username: "",
                comcode: "",
                password: "",
                email: "",
                phone: "",
                userdescription: "",
                userstate: "",
                validstartdate: "",
                validenddate: "",
                logonwrongnumber: "",
                lastlogondate: "",
                lockstatus: "",
                alterpassworddate: "",
                onlinestate: "",
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
      opSysUserApi.list(arr, result => {
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
        opSysUserApi.update(arr, result => {
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
            operator: row.operator
          };
          opSysUserApi.remove(arr, result => {
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
