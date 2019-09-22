<template>
    <div class="login_body">
        <div class="login_usersname">
            <input class="login_text" type="text" placeHolder="账户名/手机号/Email" v-model="username" />
        </div>
        <div class="login_password">
            <input class="login_text" type="password" placeHolder="请输入您的密码" v-model="password" />
        </div>
        <div class="login_verifyimg">
            <input class="login_text" type="text" placeHolder="请输入您的验证码" v-model="verifyImg" />
            <img src="/api2/users/verifyImg" @touchstart="handleToVerifyImg">
        </div>
        <div class="login_btn">
            <input type="submit" value="登录" @touchstart="handleToLogin" />
        </div>
        <div class="login_link">
            <router-link to="/mine/register">立即注册</router-link>
            <router-link to="/mine/findpassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            verifyImg: ''
        }
    },
    methods: {
        handleToLogin() {
            this.axios.post('/api2/users/login', {
                username: this.username,
                password: this.password,
                verifyImg: this.verifyImg
            }).then(res => {
                var status = res.data.status;
                var This = this;
                if(status === 0) {
                    this.$message({
                        type: 'success',
                        message: '登录成功!'
                    });
                    this.$router.push('/mine/center');
                }else {
                    this.$message.error(`${res.data.msg}`);
                }
            });
        },
        handleToVerifyImg(ev) {
            ev.target.src = `/api2/users/verifyImg?${Math.random()}`;
        }
    }
}
</script>

<style scoped>
#content .login_body{  width:100%;}
.login_body .login_text{ width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.login_verifyimg { position: relative;}
.login_verifyimg img { width: auto;height: 45px;position: absolute;top: -5px;right: 0;padding: 0 5px;color: white;font-size: 14px;}
.login_body .login_btn{ height:50px; margin:10px;}
.login_body .login_btn input{ width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.login_body .login_link{ display: flex; justify-content:space-between;}
.login_body .login_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>