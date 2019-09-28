<template>
  <div class="cartview">
    <topheader :title="shopName">
      <div slot="r"></div>
    </topheader>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import { mapState } from 'vuex';
export default {
  name: 'cartview',
  data() {
    return {
      shopName: ''
    };
  },
  created() {
    this.shopName = this.curOrderShop.name;
  },
  computed: {
    ...mapState(['curOrderShop'])
  },
  components: {
    topheader: TopHeader
  }
};
</script>
<style scoped lang="scss"></style>
