<template>
  <div class="menucell">
    <router-link :to="url">
      <div class="img-box"><img :src="imgurl" :alt="menuname" /></div>
      <div class="title-box">{{ menuname }}</div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "menucell",
  props: ["menuname", "imgurl", "url"],
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.menucell {
  padding-top: px2rem(72);
  text-align: center;
  .img-box {
    width: px2rem(62);
    height: px2rem(62);
    margin: 0 auto px2rem(36);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title-box {
    font-size: $text-size-mid;
    line-height: $text-size-mid;
  }
}
</style>
