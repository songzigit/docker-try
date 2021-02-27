<template>
  <div>
    <div @click="login">立即登录</div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  methods: {
    login() {
      this.$router.push("login");
    },
  },
};
</script>
