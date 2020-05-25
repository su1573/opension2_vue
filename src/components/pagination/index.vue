<template>
    <div class="pagination-wrapper">
        <el-pagination
                :current-page="currentPage"
                :page-sizes="[20]"
                :pager-count="5"
                :page-size="pageSize"
                :total="c_total"
                layout="total,sizes,prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: "Pagination",
        components: {},
        props: {
            resetPage: {
                type: Boolean
            },
            c_total: {
                type: Number,
                default: 0
            },
            searchForm: {
                type: Object
            }
        },
        data() {
            return {
                pageSize: 20,
                currentPage: 1
            };
        },
        mounted() {
          this.$emit("query", { pageNum: this.currentPage, pageSize: this.pageSize });
        },
        watch: {
            resetPage(newData, oldData) {
                this.currentPage = 1;
            }
        },
        activated() {
            this.currentPage = 1;
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.$emit("query", {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    searchForm: this.searchForm
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$emit("query", {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    searchForm: this.searchForm
                });
            }
        }
    };
</script>
<style lang="scss" scoped>
    .pagination-wrapper {
        position: relative;
        height: 44px;
    }
</style>
