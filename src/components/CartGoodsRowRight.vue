<template>
  <div class="cgrr">
    <div class="r">
      <img :src="good.goodsInfo.img" :alt="good.goodsInfo.title" />
    </div>
    <div class="l">
      <div class="title">{{ good.goodsInfo.title }}</div>
      <div class="content">仓库信息:{{ wareHouseName.wareHouseName }}</div>
      <div class="bottom">
        <div class="b-r">
          价格: <span>{{ getPrice }}元</span>
        </div>
        <div class="b-l">
          <input @click="countReduce" type="button" value="-" />
          <input
            type="number"
            name="num"
            id="num"
            disabled
            v-model.number="good.counts"
          />
          <input @click="countAdd" type="button" value="+" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: 'cgrr',
  props: ['good', 'wareHouseName'],
  data() {
    return {};
  },
  computed: {
    getPrice() {
      return this.good.counts * this.good.goodsInfo.monery;
    }
  },
  methods: {
    ...mapMutations(['addGoodCount']),
    countReduce() {
      // console.log(Number(this.counts));
      let tempcount = Number(this.good.counts);
      tempcount -= 1;
      // console.log(tempcount <= 1);
      if (tempcount < 1) {
        this.good.counts = 1;
        return;
      }
      this.good.counts = tempcount;
      let fromData = {
        goodID: this.good.goodsInfo.id,
        count: parseInt(tempcount),
        wareHouseID: this.wareHouseName.wareHouseID
      };
      this.addGoodCount(fromData);
    },
    countAdd() {
      let tempcount = Number(this.good.counts);
      tempcount += 1;
      if (tempcount >= this.good.goodsInfo.number) {
        tempcount = this.good.goodsInfo.number;
      }
      this.good.counts = tempcount;
      let fromData = {
        goodID: this.good.goodsInfo.id,
        count: parseInt(tempcount),
        wareHouseID: this.wareHouseName.wareHouseID
      };
      this.addGoodCount(fromData);
    }
  }
};
</script>
<style scoped lang="scss">
.cgrr {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .r {
    margin-right: px2rem(28);
    flex: 0 0 px2rem(124);
    height: px2rem(124);
    border: px2rem(1) solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .l {
    flex: 1;
    color: #000;
    font-size: px2rem(24);
    .title {
      line-height: px2rem(24);
      margin-bottom: px2rem(17);
    }
    .content {
      line-height: px2rem(24);
      margin-bottom: px2rem(17);
      color: #888;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: px2rem(46);
      .b-r {
        span {
          color: $danger;
          font-size: px2rem(28);
        }
      }
      .b-l {
        input {
          vertical-align: middle;
          font-size: px2rem(28);
          line-height: px2rem(46);
          height: px2rem(46);
          width: px2rem(46);
          background-color: #fff;
          outline: none;
          border: px2rem(1) solid #000;
          border-radius: px2rem(10);
          margin: 0 px2rem(8);
          text-align: center;
          &:nth-child(2) {
            width: px2rem(100);
          }
        }
      }
    }
  }
}
</style>
