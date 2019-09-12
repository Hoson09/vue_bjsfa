<template>
  <div class="visitshop">
    <topheader title="进店拜访">
      <div slot="r"></div>
    </topheader>
    <tabview :hd-titles="['计划内', '计划外']"></tabview>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
export default {
  name: 'visitshop',
  data() {
    return {};
  },
  components: {
    topheader: TopHeader
  }
};
</script>
<style scoped lang="scss"></style>
