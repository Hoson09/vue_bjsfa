<template>
  <div class="cartview">
    <topheader :title="shopName">
      <div slot="r" class="edit-btn">编辑</div>
    </topheader>
    <warehouse
      v-for="wareHouse in curShopCart.wareHouse"
      :key="wareHouse.wareHouseID"
      :wareHouseData="wareHouse"
    ></warehouse>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import { mapState } from 'vuex';
import WareHouse from '../components/WareHouse';
export default {
  name: 'cartview',
  data() {
    return {
      shopName: '',
      curShopCart: null
    };
  },
  created() {
    this.shopName = this.curOrderShop.name;
    console.log(this.cartData);
    this.curShopCart = this.cartData.find(
      item => item.shopId == this.curOrderShop.id
    );
  },
  computed: {
    ...mapState(['curOrderShop', 'cartData'])
  },
  components: {
    topheader: TopHeader,
    warehouse: WareHouse
  }
};
</script>
<style scoped lang="scss">
.cartview {
  height: 100%;
  background-color: #fff;
  .edit-btn {
    color: #fff;
    font-size: px2rem(28);
  }
}
</style>
