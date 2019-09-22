<template>
    <div class="findpassword_body">
        <div class="findpassword_email">
            <input class="findpassword_text" type="text" placeHolder="邮箱/Email" v-model="email" />
            <button @touchstart="handleToVerify">{{VerifyInfo}}</button>
        </div>
        <div class="findpassword_password">
            <input class="findpassword_text" type="password" placeHolder="请输入您的密码" v-model="password" />
        </div>
        <div class="findpassword_verify">
            <input class="findpassword_text" type="text" placeHolder="验证码" v-model="verify" />
        </div>
        <div class="findpassword_btn">
            <input type="submit" value="确定修改" @touchstart="handleToFindPassword" />
        </div>
        <div class="findpassword_link">
            <router-link to="/mine/login">已有账号，去登录</router-link>
            <router-link to="/mine/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FindPassword',
    data() {
        return {
            email: '',
            password: '',
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
        handleToFindPassword() {
            this.axios.post('/api2/users/findPassword', {
                email: this.email,
                password: this.password,
                verify: this.verify
            }).then(res => {
                var status = res.data.status;
                var This = this;
                if(status === 0) {
                    this.$message({
                        type: 'success',
                        message: '修改密码成功'
                    });
                    This.$router.push('/mine/login')
                }else {
                    this.$message.error('修改密码失败');
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
#content .findpassword_body { width:100%;}
.findpassword_body .findpassword_text { width:100%; height: 40px; border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.findpassword_body .findpassword_email {position: relative;}
.findpassword_body .findpassword_email button { width: auto;height: 40px; position: absolute; top: 0; right: 0; padding: 0 5px; background: #e54847;border: 1px solid #fff; border-radius: 3px; color: white;font-size: 14px;}
.findpassword_body .findpassword_btn { height:50px; margin:10px;}
.findpassword_body .findpassword_btn input { width:100%; height:100%; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.findpassword_body .findpassword_link { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content:space-between;}
.findpassword_body .findpassword_link a { text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>