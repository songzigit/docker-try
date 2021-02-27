<template>
  <div>
    <h1 @click="toPage">每日推荐</h1>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  methods: {
    toPage() {
      this.$router.push("daily-recommend");
    },
  },
};
</script>
