<template>
    <div>
        <el-table :data="nowTabData" border style="width: 100%">
            <el-table-column prop="_id" label="id"></el-table-column>
            <el-table-column prop="date" label="注册日期"></el-table-column>
            <el-table-column prop="userImg" label="用户头像">
                <template slot-scope="scope">
                    <img class="userimg" :src="scope.row.userImg">
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户姓名"></el-table-column>
            <el-table-column prop="password" label="用户密码"></el-table-column>
            <el-table-column prop="email" label="用户邮箱"></el-table-column>
            <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleToFreeze(scope.$index, scope.row)">{{scope.row.isFreeze ? '已冻结' : '未冻结'}}</el-button>
                    <el-button type="danger" size="small" @click="handleToDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page" background layout="prev, pager, next" :current-page.sync="currentPage" :page-size="pageSize" :total="tableData.length"></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'AdminUsers',
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 5
        }
    },
    mounted() {
        this.axios.get('/api2/admin/usersList').then(res => {
            var status = res.data.status;
            if(status === 0) {
                this.tableData = res.data.data.usersList;
            }
        });
    },
    computed: {
        nowTabData() {
            return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize) || [];
        }
    },
    methods: {
        handleToFreeze(index, row) {
            this.axios.post('/api2/admin/updateFreeze', {
                email: row.email,
                isFreeze: !row.isFreeze
            }).then(res => {
                var status = res.data.status;
                if(status === 0) {
                    if(row.isFreeze) {
                        this.$message({
                            message: '取消冻结用户',
                            type: 'success'
                        });
                    }else {
                        this.$message({
                            message: '成功冻结用户',
                            type: 'success'
                        });
                    }
                    this.tableData[index].isFreeze = !row.isFreeze;
                }else {
                    this.$message.error('冻结操作失败');
                }
            });
        },
        handleToDelete(index, row) {
            this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.axios.post('/api2/admin/deleteUser', {
                    email: row.email
                }).then(res => {
                    var status = res.data.status;
                    if(status === 0) {
                        this.tableData.splice(index, 1);
                    }else {
                        this.$message.error('账号删除失败');
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        }
    }
}
</script>

<style scoped>
.userimg { width: 50px; height: 50px; border-radius: 50%; margin: 0 auto; overflow: hidden;}
.page { margin-top: 20px;}
</style>