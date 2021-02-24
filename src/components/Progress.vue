<template>
  <div class="progress" ref="progress">
    <div class="passed" :style="{ width: passedLen + 'px' }"></div>
    <div class="none"></div>
  </div>
</template>
<style lang="scss" scoped>
.progress {
  display: flex;
  width: 100%;
  height: 1px;
  background-color: red;
  .passed {
    background-color: #fff;
  }
  .none {
    background-color: #999;
    flex: 1;
  }
}
</style>
<script>
export default {
  props: ["percent"],
  computed: {
    passedLen: function () {
      return 0;
    },
  },
};
</script>
