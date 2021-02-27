<template>
  <div>
    <form class="list flex-col form">
      <input
        type="text"
        placeholder="请输入邮箱账号"
        class="form-item"
        v-model="email"
        required
        pattern="^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$"
      />
      <input
        type="text"
        placeholder="请输入密码"
        class="form-item"
        v-model="passw"
        required
      />
      <button class="form-item login-btn" @click="login">登录</button>
    </form>
  </div>
</template>
<style lang="scss" scoped>
@import "@/style/varibles";
.form {
  margin: 10px 20px;
}
.form-item {
  line-height: 36px;
  margin-bottom: 10px;
}
.login-btn {
  border-radius: 20px;
  border: none;
  background-color: $main-color;
  color: #fff;
}
</style>
<script>
import axios from "axios";
import api from "@/api";

export default {
  data() {
    return {
      email: "", // 邮箱
      passw: "", // 密码
    };
  },
  methods: {
    /**
     * 点击去登录
     */
    login() {
      axios
        .get(api.emailLogin, {
          params: {
            email: this.email,
            password: this.passw,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            console.log(data);
          }
        });
    },
  },
};
</script>
