<template>
  <div v-show="showDrawer">这是drawer</div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["showDrawer"]),
  },
};
</script>
<style lang="scss">
</style>