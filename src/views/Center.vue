<template>
    <div>
        <div>个人中心</div>
        <div>
            <img class="userImg" :src="$store.state.user.userImg">
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
        </div>
        <div>当前用户：{{$store.state.user.name}}<a href="javascript:;" @touchstart="handleToLogout">退出</a></div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员<a href="/admin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通会员</div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Center',
    methods: {
        handleToLogout() {
            this.axios.get('/api2/users/logout').then(res => {
                var status = res.data.status;
                if(status === 0) {
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME', {
                        name: '',
                        isAdmin: false,
                        userImg: ''
                    })
                    this.$router.push('/mine/login');
                };
            });
        },
        handleToUpload(ev) {
            var file = ev.target.files[0];
            var param = new FormData();
            param.append('file', file, file.name);
            var config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.axios.post('/api2/users/uploadUserImg', param, config).then(res => {
                var status = res.data.status;
                var This = this;
                if(status === 0) {
                    this.$message({
                        type: 'success',
                        message: '上传成功'
                    });
                    This.$store.commit('user/USER_NAME', {
                        name: res.data.data.username,
                        isAdmin: res.data.data.isAdmin,
                        userImg: res.data.data.userImg
                    });
                }else {
                    this.$message.error('上传失败');
                }
            });
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.get('/api2/users/getUser').then(res => {
            var status = res.data.status;
            if(status === 0){
                next(vm => {
                    localStorage.setItem('name', res.data.data.username);
                    localStorage.setItem('isAdmin', res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME', {
                        name: res.data.data.username,
                        isAdmin: res.data.data.isAdmin,
                        userImg: res.data.data.userImg
                    });
                });
            }else {
                next('/mine/login');
            }
        });
    },
}
</script>

<style scoped>
.userImg { width: 100px; height: 100px; border-radius: 50%; margin: 0 auto; overflow: hidden;}
</style>