<template>
  <div class="goodlistitem">
    <div class="l">
      <img :src="goods.img" :alt="goods.title" />
    </div>
    <div class="r">
      <div class="good-title">{{ goods.title }}</div>
      <div class="good-content">
        <span>编码:{{ goods.serial }}</span>
        <span>规格:{{ goods.packageDimensions }}</span>
      </div>
      <div class="good-bottom">
        <div class="good-price">
          价格:<span class="pricetxt">{{ goods.monery }}</span>
        </div>
        <div class="good-total">
          <span>库存:{{ goods.number }}</span>
          <i class="icon iconfont icon-icon-refresh"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodlistitem',
  props: ['goods'],
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
.goodlistitem {
  padding: px2rem(20) 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border-bottom: px2rem(1) solid #ccc;
  .l {
    flex: 0 0 px2rem(124);
    height: px2rem(124);
    border: px2rem(1) solid #ccc;
    margin-right: px2rem(28);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .r {
    flex: 1;
    text-align: left;
    font-size: px2rem(20);
    color: #666;
    i {
      font-size: px2rem(28);
      color: #000;
    }
    .good-title {
      font-size: px2rem(26);
      color: #000;
      margin-bottom: px2rem(12);
      line-height: px2rem(26);
    }
    .good-content {
      margin-bottom: px2rem(44);
      line-height: px2rem(20);
      span:first-child {
        margin-right: px2rem(55);
      }
    }
    .good-bottom {
      overflow: hidden;
      line-height: px2rem(26);
      .good-price {
        float: left;
        .pricetxt {
          color: $danger;
          font-size: px2rem(26);
          margin-left: px2rem(20);
        }
      }
      .good-total {
        float: right;
        span {
          margin-right: px2rem(20);
        }
      }
    }
  }
}
</style>
