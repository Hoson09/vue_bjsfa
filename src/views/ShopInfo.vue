<template>
  <div class="shopinfo">
    <topheader title="店内活动">
      <div slot="r">
        <span @click="stopVisit">结束拜访</span>
      </div>
    </topheader>
    <div class="shop-info-bd">
      <h3 class="shop-title">{{ shopInfoItem.name }}</h3>
      <div class="shop-progress">
        <div class="shop-sales">
          <div class="l">
            <i class="icon iconfont icon-xiaoliangzuigao"></i>
            <span>本月至今的销售量</span>
          </div>
          <div class="r">
            {{ sales.MonthSales.toFixed(0) }}
          </div>
        </div>
        <div class="shop-sales">
          <div class="l">
            <i class="icon iconfont icon-xiaoliangpaixu"></i>
            <span>过往半年的平均销售量</span>
          </div>
          <div class="r">
            {{ sales.MonthAvgSales.toFixed(0) }}
          </div>
        </div>
        <div class="progress">
          <div class="progress-hd">
            <div class="l">
              <i class="icon iconfont icon-80"></i>
              <span>核心分销完成率</span>
            </div>
            <div class="r">
              <span>{{ sales.DivSalesPercent.toFixed(0) }}</span
              ><i class="icon iconfont icon-80"></i>
            </div>
          </div>
          <div class="progress-bd">
            <div
              class="progress-bd-val"
              :style="{ width: `${sales.DivSalesPercent.toFixed(0)}%` }"
            ></div>
          </div>
        </div>
      </div>
      <div class="history-wrap">
        <div class="history-hd">
          历史拜访备注:
        </div>
        <textarea
          type="text"
          class="history-text"
          placeholder="点击填写历史备注~"
        ></textarea>
      </div>
      <div class="btn-wrap">
        <div class="btn">
          <router-link :to="`/order/${this.$route.params.id}`">
            下单
          </router-link>
        </div>
        <div class="btn">
          <router-link :to="`/signin/${this.$route.params.id}`">
            商店签到
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import service from '../service/index';
import { mapState } from 'vuex';
export default {
  name: 'shopinfo',
  data() {
    return {
      shopInfoItem: null,
      sales: {
        DivSalesPercent: 0,
        MonthAvgSales: 0,
        MonthSales: 0,
        id: 0
      }
    };
  },
  computed: {
    ...mapState(['Shops'])
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
      //拿到店铺的销售进度
      service
        .getShopInfo(this.$route.params.id)
        .then(res => {
          console.log(res.data);
          //直接生成数据。
          // this.sales = res.data;
          //缓动生成数据产生动画效果
          //eslint-disable-next-line
          TweenLite.to(this.sales, 0.5, res.data);
        })
        .catch(err => {
          console.log(err);
        });
      //拿到当前店铺的信息。
      this.shopInfoItem = this.Shops.find(
        item => item.id == this.$route.params.id
      );
    }
  }
};
</script>
<style scoped lang="scss">
.shopinfo {
  font-size: $text-size-top;
  color: #000;
  height: 100%;
  background-color: #fff;
  .shop-title {
    font-size: $text-size-top;
    line-height: px2rem(84);
    background-color: $search-bgc;
    border-bottom: px2rem(1) solid #ccc;
    text-indent: 1em;
  }
  .shop-progress {
    background-color: #fff;
    padding-left: px2rem(28);
    .shop-sales {
      padding-right: px2rem(20);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: px2rem(1) solid #ccc;
      .l {
        flex: 1;
        line-height: px2rem(110);
        i {
          font-size: $text-size-top;
          margin-right: px2rem(20);
        }
      }
      .r {
        flex: 0 0 px2rem(100);
        text-align: right;
        line-height: px2rem(110);
      }
    }
    .progress {
      padding-bottom: px2rem(32);
      padding-right: px2rem(20);
      .progress-hd {
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
          font-size: $text-size-top;
          margin-right: px2rem(20);
        }
        .l {
          flex: 1;
          line-height: px2rem(96);
        }
        .r {
          flex: 0 0 px2rem(100);
          text-align: right;
          line-height: px2rem(110);
          i {
            margin-right: 0;
          }
        }
      }
      .progress-bd {
        height: px2rem(12);
        border-radius: px2rem(6);
        background-color: #e4e4e4;
        .progress-bd-val {
          height: px2rem(12);
          border-radius: px2rem(6);
          background: linear-gradient(to right, #868ce4, #57c988);
          width: 61%;
        }
      }
    }
  }
  .history-wrap {
    background-color: #fafafa;
    border-bottom: px2rem(1) solid #ccc;
    .history-hd {
      border-top: px2rem(1) solid #ccc;
      border-bottom: px2rem(1) solid #ccc;
      text-indent: 1em;
      line-height: px2rem(66);
    }
    .history-text {
      padding: px2rem(20) px2rem(28);
      width: 100%;
      box-sizing: border-box;
      line-height: $text-size-top;
      font-size: $text-size-top;
      border: none;
      height: px2rem(160);
      background-color: #fff;
      &::-webkit-input-placeholder {
        color: #ccc;
      }
    }
  }
  .btn-wrap {
    margin-top: px2rem(170);
    .btn {
      font-size: $text-size-best;
      width: px2rem(480);
      line-height: px2rem(84);
      text-align: center;
      margin: 0 auto;
      border: px2rem(2) solid $act-color;
      border-radius: px2rem(5);
      color: $act-color;
      background-color: #fff;
      &:last-child {
        background-color: $act-color;
        color: #fff;
        margin-top: px2rem(54);
      }
    }
  }
}
</style>
