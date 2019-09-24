<template>
  <div class="shopinfo">
    <topheader title="店内活动">
      <div slot="r">
        <span @click="stopVisit">结束拜访</span>
      </div>
    </topheader>
    <div class="shop-info-bd">
      <h3></h3>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import service from '../service/index';
export default {
  name: 'shopinfo',
  data() {
    return {};
  },
  created() {
    this.initInfo();
  },
  components: {
    topheader: TopHeader
  },
  methods: {
    stopVisit() {
      this.$router.go(-1);
    },
    initInfo() {
      //这个是在url主干上的所以用params，那些？后面的则在query来获取。
      console.log(this.$route.params.id);
      service
        .getShopInfo(this.$route.params.id)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss"></style>
