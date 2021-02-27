<template>
  <div>
    <div class="page" v-show="!showThird">
      <div class="content"></div>
      <div>
        <button>手机号登录</button>
        <ul class="list login-list" @click="thirdLogin">
          <li data-type="wechat" class="list-item">微信</li>
          <li data-type="qq" class="list-item">QQ</li>
          <li data-type="weibo" class="list-item">微博</li>
          <li data-type="netease" class="list-item">网易</li>
        </ul>
      </div>
    </div>
    <Third v-show="showThird" />
  </div>
</template>
<style lang="scss" scoped>
.login-list {
  line-height: 50px;
}
</style>
<script>
import Third from "@/pages/Login/Third";
export default {
  components: { Third },
  data() {
    return {
      showThird: false, // 是否展示第三方登录页
    };
  },
  methods: {
    /**
     * 跳转第三方登录
     */
    thirdLogin(e) {
      const { type = "" } = e.target.dataset;
      switch (type) {
        case "netease":
          this.showThird = true;
          break;
        default:
          break;
      }
    },
  },
};
</script>
