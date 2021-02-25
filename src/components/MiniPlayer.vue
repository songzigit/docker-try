<template>
  <div class="mini-player" @click="showPlayer">
    底部播放器
  </div>
</template>
<style lang="scss" scoped>
  .mini-player {
    background-color: rebeccapurple;
    height: 40px;
  }
</style>
<script>
export default {
  methods:{
    showPlayer(){
      this.$router.push('main-player');
    }
  }
}
</script>
