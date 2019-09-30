<template>
  <div class="subcart">
    <topheader title="提交订单">
      <div slot="r"></div>
    </topheader>
    <div class="bd">
      <div class="address">
        <div class="address-hd">
          <div class="usr">
            <span>收货人:</span><span>{{ curOrderShop.bossName }}</span>
          </div>
          <span class="phone">{{ curOrderShop.phone }}</span>
        </div>
        <div class="address-bd">
          <i class="icon iconfont icon-location"></i>
          <span class="address-content">
            {{ curOrderShop.address }}
          </span>
        </div>
      </div>
      <div
        v-for="wareHouse in getCurCartData.wareHouse"
        :key="wareHouse.wareHouseID"
        class="wareHouse-content"
      >
        <template v-if="wareHouse.checked">
          <div
            v-for="good in wareHouse.goods"
            :key="good.goodsInfo.id"
            class="goods-content"
          >
            <template v-if="good.checked">
              <div class="goods-wrap">
                <div class="img-box">
                  <img :src="good.goodsInfo.img" :alt="good.goodsInfo.title" />
                </div>
                <div class="goods-content-box">
                  <div class="goods-title">{{ good.goodsInfo.title }}</div>
                  <div class="goods-middle">{{ wareHouse.wareHouseName }}</div>
                  <div class="goods-bottom">
                    <div class="g-b-l">
                      价格:<span>
                        {{ good.goodsInfo.monery * good.counts }}元
                      </span>
                    </div>
                    <div class="g-b-r">
                      数量:<span>{{ good.counts }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="remark-content">
            备注:<span>{{ wareHouse.remark }}</span>
          </div>
        </template>
      </div>
    </div>
    <div class="bt">
      <div class="bt-l">
        合计:<span>{{ getSumMoney }}元</span>
      </div>
      <div class="b-r">
        确定
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'subcart',
  data() {
    return {};
  },
  components: {
    topheader: TopHeader
  },
  computed: {
    ...mapState(['curOrderShop']),
    ...mapGetters(['getCurCartData']),
    getSumMoney() {
      let money = 0;
      this.getCurCartData.wareHouse.forEach(w => {
        if (w.checked) {
          w.goods.forEach(g => {
            if (g.checked) {
              money += g.counts * g.goodsInfo.monery;
            }
          });
        }
      });
      return money;
    }
  }
};
</script>
<style scoped lang="scss">
.subcart {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  font-size: px2rem(28);
  background-color: #fff;
  color: #000;
  .topheader {
    width: 100%;
    flex: 0;
  }
  .bd {
    flex: 1;
    overflow: scroll;
    .address {
      padding: px2rem(26) px2rem(28);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #ccc;
      background-color: #fafafa;
      .address-hd {
        line-height: 1.5;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .address-bd {
        font-size: px2rem(24);
        line-height: 1.5;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        color: #757575;
        i {
          flex: 0;
          font-size: px2rem(24);
          line-height: 1.5;
        }
        .address-content {
          flex: 1;
          //英文字母的换行习惯问题???!!!
          word-break: break-all;
          margin-left: px2rem(12);
        }
      }
    }
    .wareHouse-content {
      padding-left: px2rem(28);
      border-bottom: px2rem(1) solid #ccc;
      .goods-content {
        .goods-wrap {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: px2rem(1) solid #ccc;
          .img-box {
            margin: px2rem(20) 0;
            flex: 0 0 px2rem(124);
            height: px2rem(124);
            border: px2rem(1) solid #ccc;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .goods-content-box {
            margin: px2rem(20) 0;
            flex: 1;
            line-height: px2rem(28);
            margin-left: px2rem(28);
            font-size: px2rem(24);
            .goods-title {
              margin-bottom: px2rem(15);
            }
            .goods-middle {
              font-size: px2rem(20);
              color: #757575;
              margin-bottom: px2rem(15);
            }
            .goods-bottom {
              display: flex;
              justify-content: space-between;
              align-items: center;
              line-height: px2rem(34);
              .g-b-l {
                span {
                  font-size: px2rem(28);
                  color: $danger;
                  margin-left: px2rem(14);
                }
              }
              .g-b-r {
                margin-right: px2rem(28);
              }
            }
          }
        }
      }
      .remark-content {
        line-height: px2rem(28);
        padding: px2rem(20) 0;
        span {
          margin-left: px2rem(28);
        }
      }
    }
  }
  .bt {
    flex: 0 0 px2rem(112);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: px2rem(1) solid #ccc;
    padding: 0 px2rem(28);
    .bt-l {
      flex: 1;
      line-height: px2rem(112);
      span {
        font-size: px2rem(32);
        margin-left: px2rem(14);
        color: $danger;
      }
    }
    .b-r {
      flex: 0 0 px2rem(168);
      line-height: px2rem(70);
      text-align: center;
      color: #fff;
      background-color: $act-color;
      border-radius: 5%;
    }
  }
}
</style>
