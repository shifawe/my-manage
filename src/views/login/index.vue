<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">欢迎登录</h3>
      </div>

      <el-form-item prop="username">
        
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        >
          <span slot="prefix" class="svg-container">
            <svg-icon icon-class="user" />
          </span>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
       
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        >
          <span slot="prefix" class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <span slot="suffix" class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-input>
        
      </el-form-item>

      <el-button :loading="loading" type="primary" style="font-weight:800;width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin"> 登 录 </el-button>

      <div class="tips">
        <span>欢迎登录 用户名：admin  密码：shifawei</span>
      </div>
      <div class="logo">
        <svg-icon icon-class="logo-niao" />
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码至少是6位字母或数字符号组成'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'shifawei'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#606266;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;

    input {
      background: transparent;
      -webkit-appearance: none;
      padding: 12px 5px 12px 45px;
      color: $light_gray;
      height: 47px;

    }
  }

  .el-form-item {
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#1976d2;
$dark_gray:#606266;
$light_gray:#1976d2;
body{overflow: hidden;}
.login-container {
  min-height: 100%; width: 100%;
  background-color: $bg; overflow: hidden;
  background: linear-gradient(145deg,#0d47a1,#42a5f5);// ang:(#0d47a1 #42a5f5)  ,ps :001d26 00c8ff
  &:after{
    position: fixed; content: '';left:0;bottom:0;width:100%;
    background-color:#fff;height:500px;transform: skewY(8deg);
    background-size: 100%;opacity: .85; transform-origin: 0%;
  }
  
  .login-form {
    position: absolute;border-radius: 4px;
    max-width: 100%;margin: 0 auto;background:#fff;overflow: hidden;
    top: 50%;left:50%;padding: 35px 35px 0;z-index: 800;
    width: 400px;height:360px;
    margin-left: -200px;margin-top: -200px;
    
  }

  .tips {
    font-size: 14px; color: #1976d2; margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .logo{
    position: absolute;top:85px;
    svg{
      font-size: 20px;
    }
  }
  .svg-container {
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;height:34px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 4px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
