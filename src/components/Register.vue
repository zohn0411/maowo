<template>
    <div class="register_body">
        <div class="register_email">
            <input class="register_text" type="text" placeHolder="Email" v-model="email" />
            <button :disabled="disabled" @touchstart="handleToVerify">{{VerifyInfo}}</button>
        </div>
        <div class="register_user">
            <input class="register_text" type="text" placeHolder="用户名" v-model="username" />
        </div>
        <div class="register_password">
            <input class="register_text" type="password" placeHolder="请输入您的密码" v-model="password" />
        </div>
        <div class="register_password2">
            <input class="register_text" type="password" placeHolder="再次输入密码" v-model="password2" />
        </div>
        <div class="register_verify">
            <input class="register_text" type="text" placeHolder="验证码" v-model="verify" />
        </div>
        <div class="register_btn">
            <input type="submit" value="注册" @touchstart="handleToRegister" />
        </div>
        <div class="register_link">
            <router-link to="/mine/login">已有账号，去登录</router-link>
            <router-link to="/mine/findpassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            username: '',
            password: '',
            password2: '',
            verify: '',
            VerifyInfo: '发送验证码',
            disabled: false
        }
    },
    methods: {
        handleToVerify() {
            if(this.disabled) {return;}
            this.axios.get(`/api2/users/verify?email=${this.email}`).then(res => {
                var status = res.data.status;
                var This = this;
                if(status === 0) {
                    this.$message({
                        type: 'success',
                        message: '验证码发送成功'
                    });
                    This.countDown();
                }else {
                    this.$message.error('验证码已发送失败');
                }
            });
        },
        handleToRegister() {
            this.axios.post(`/api2/users/register`, {
                email: this.email,
                username: this.username,
                password: this.password,
                password2: this.password2,
                verify: this.verify
            }).then(res => {
                var status = res.data.status;
                var This = this;
                if(status === 0) {
                    this.$message({
                        type: 'success',
                        message: '注册猫窝成功!'
                    });
                    This.$router.push('/mine/login')
                }else {
                    this.$message.error(`${res.data.msg}`);
                }
            })
        },
        countDown() {
            this.disabled = true;
            var count = 60;
            var timer = setInterval(()=> {
                count--;
                this.VerifyInfo = `剩余${count}`;
                if(count === 0) {
                    this.disabled = false;
                    count = 60;
                    this.VerifyInfo = '发送验证码';
                    clearInterval(timer);
                }
            }, 1000);
        }
    }
}
</script>

<style scoped>
#content .register_body { width:100%;}
.register_body .register_text { width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.register_body .register_email {position: relative;}
.register_body .register_email button { width: auto;height: 40px; position: absolute; top: 0; right: 0; padding: 0 5px; background: #e54847;border: 1px solid #fff; border-radius: 3px; color: white;font-size: 14px;}
.register_body .register_btn { height:50px; margin:10px;}
.register_body .register_btn input { width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.register_body .register_link { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content:space-between;}
.register_body .register_link a { text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>
