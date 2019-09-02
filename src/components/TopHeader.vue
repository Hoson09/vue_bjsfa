<template>
  <div class="topheader">
    <div class="th-l" @click="backAction">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="th-title">{{ title }}</div>
    <div class="th-r"><slot name="r">右侧插槽</slot></div>
  </div>
</template>

<script>
export default {
  name: "topheader",
  data() {
    return {};
  },
  props: ["title", "backurl"],
  methods: {
    backAction() {
      if (this.backurl) {
        this.$router.push(this.backurl);
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.topheader {
  display: flex;
  justify-content: space-between;
  line-height: $top-height;
  color: #fff;
  font-size: $text-size-best;
  background-color: $act-color;
  .th-title {
    text-align: center;
    flex: 1 1 auto;
  }
  .th-l {
    padding-left: px2rem(25);
  }
  .th-r {
    padding-right: px2rem(25);
  }
  .iconfont::before {
    font-size: $text-size-best;
  }
}
</style>
