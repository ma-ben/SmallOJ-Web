<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Username:</label>&nbsp;
        <input type="text" id="username" v-model="username" autocomplete="username" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>&nbsp;&nbsp;
        <input type="password" id="password" v-model="password" autocomplete="current-password" />
      </div>
      <button type="submit" style="color:aqua">Login</button>
    </form>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>
  
<script>

import { useCookies } from 'vue3-cookies';


export default {
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    login() {
      // // 这里可以添加登录逻辑
      if (this.username.trim() === '') this.errorMessage = '用户名不能为空';
      else if (this.password.trim() === '') this.errorMessage = '密码不能为空';
      else {
        this.errorMessage = '';   // 清空错误信息
        // 发送 GET 请求，只需要指定相对路径
        this.$api.get('/api/user/login', {
          params: {
            username: this.username,
            password: this.password
          }
        })
          .then(response => {

            localStorage.setItem('token', response.data.token);
            // location.reload();
            //等待一秒
            setTimeout(() => {
              location.href = '/homepage';
            }, 1000);

            console.log(response.data);
            this.cookies.set("userid", response.data.id);
            this.cookies.set("username", response.data.username);
            if (response.data.status_code === "Success") {
              window.alert('登录成功');
            } else {
              window.alert("登录失败\n" + response.data.status_msg);
            }

          })
          .catch(error => {
            console.error(error);
          });
      }
    },
  },
};
</script>
  
<style>
.error-message {
  color: red;
}
</style>