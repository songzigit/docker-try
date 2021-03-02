<template>
  <div
    class="progress"
    ref="progress"
    @touchmove="dragProgress"
    @click.stop="jumpProgress"
  >
    <div class="passed" :style="{ width: percent * clientWidth + 'px' }"></div>
    <div class="pointer" ref="pointer"></div>
  </div>
</template>
<style lang="scss" scoped>
.progress {
  display: flex;
  width: 100%;
  height: 1px;
  background-color: #999;
  .passed {
    background-color: rgb(200, 200, 200);
  }
  .pointer {
    width: 5px;
    height: 5px;
    background-color: red;
    border-radius: 50%;
    position: relative;
    top: -2px;
  }
}
</style>
<script>
export default {
  props: ["percent"],
  data() {
    return {
      progress: null, // 进度条控件
      clientX: 0, // 进度条到左边边框的距离
      clientWidth: 0, // 进度条宽度
    };
  },
  created() {
    this.$nextTick(function () {
      this.progress = this.$refs.progress;
      this.getProgressBounding();
    });
  },
  methods: {
    /**
     * 拖动改变进度
     */
    dragProgress(e) {
      if (!this.clientWidth) {
        this.getProgressBounding();
      }
      const { clientX } = e.targetTouches[0];
      const percent = (clientX - this.clientX) / this.clientWidth;
      this.setValue(percent);
    },

    /**
     * 跳到指定进度
     */
    jumpProgress(e) {
      if (!this.clientWidth) {
        this.getProgressBounding();
      }
      const { clientX } = e;
      const percent = (clientX - this.clientX) / this.clientWidth;
      this.setValue(percent);
    },

    /**
     * 获取进度条的包裹矩形
     */
    getProgressBounding() {
      const { x, width } = this.progress.getBoundingClientRect();
      this.clientX = x;
      this.clientWidth = width;
    },

    /**
     * 改变进度值
     */
    setValue(val) {
      if (!val) {
        return;
      }
      this.$emit("progressChange", val < 0 ? 0 : val > 1 ? 1 : val);
    },
  },
};
</script>
