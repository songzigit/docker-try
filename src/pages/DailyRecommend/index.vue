<template>
  <div>
    <h1>DailyRecommend</h1>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import axios from "axios";
import api from "@/api";

import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["songId"]),
  },
  created(){
    this.getRecommends();
  },
  methods: {
    ...mapMutations(["setSong"]),
    /**
     *
     */
    getRecommends() {
      axios.get(api.dailyRecommend).then(({ status, data }) => {
        if (status === 200) {
          console.log(data);
        }
      });
    },
  },
};
</script>
