<template>
  <div class="noticedetail">
    <topheader title="公告信息">
      <div slot="r"></div>
    </topheader>
    <h1>这是通知详情页 {{ $route.params.id }}</h1>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
export default {
  name: 'noticedetail',
  data() {
    return {};
  },
  created() {
    // console.log(this.$router.history.current.name);
    this.$store.commit('setUrlName', this.$router.history.current.name);
  },
  components: {
    topheader: TopHeader
  }
};
</script>
<style scoped lang="scss"></style>
