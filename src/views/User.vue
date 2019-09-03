<template>
  <div class="user">
    <topheader title="SFA" backurl="">
      <router-link to="/user" slot="r" class="iconfont icon-user"></router-link
    ></topheader>
    <h1>这里是user</h1>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
export default {
  name: 'user',
  data() {
    return {};
  },
  components: {
    topheader: TopHeader
  }
};
</script>
<style scoped lang="scss"></style>
