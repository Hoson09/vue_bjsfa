<template>
  <div class="goodselectview">
    <topheader title="产品选择">
      <div slot="r"></div>
    </topheader>
    <div class="content-top">
      <div class="hd">
        <goodlistitem :goods="goods" :totalVisible="false"></goodlistitem>
      </div>
      <div class="bd">
        <div class="des-row">
          <div class="l">
            <span>仓库:</span>
          </div>
          <div class="r">
            <span>{{ wareHouseName }}</span>
            <i class="icon iconfont icon-angle-right"></i>
          </div>
        </div>
        <div class="des-row">
          <div class="l">
            <span>库存:</span>
          </div>
          <div class="r">
            <span>{{ goods.number }}</span>
          </div>
        </div>
        <div class="des-row">
          <div class="l">
            <span>数量:</span>
          </div>
          <div class="r">
            <span>
              <i
                @click="countReduce"
                class="icon iconfont icon-weibiaoti512 inputBtn"
              ></i>
            </span>
            <span>
              <input
                type="number"
                v-model.number="counts"
                @input="inputClick"
              />
            </span>
            <span>
              <i
                @click="countAdd"
                class="icon iconfont icon-weibiaoti511 inputBtn"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-bottom">
      <div class="btn-cancel" @click="$router.go(-1)">取消</div>
      <div class="btn-add" @click="addToCart">加入购物车</div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import GoodListItem from '../components/GoodListItem';
import service from '../service/index';
export default {
  name: 'goodselectview',
  data() {
    return {
      goods: {},
      counts: 0,
      wareHouseName: ''
    };
  },
  created() {
    this.goods = this.$store.state.Goods.find(
      item => item.id == this.$route.params.id
    );
    //先获取仓库的id: this.goods.warehouseId
    if (this.$store.state.wearHouse.length <= 0) {
      //如果vuex中这个数组没有值需要网络请求得到这个值
      service
        .loadWearHouse()
        .then(res => {
          this.$store.commit('initWearHouse', res.data);
          this.wareHouseName = res.data.find(
            item => item.id == this.goods.warehouseId
          ).reponame;
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.wareHouseName = this.$store.state.wearHouse.find(
      item => item.id == this.goods.warehouseId
    ).reponame;
  },
  components: {
    topheader: TopHeader,
    goodlistitem: GoodListItem
  },
  methods: {
    addToCart() {
      //跳转到新页面
      this.$router.push(`/cart/${this.$route.params.id}`);
    },
    countAdd() {
      let tempcount = Number(this.counts);
      tempcount += 1;
      if (tempcount >= this.goods.number) {
        tempcount = this.goods.number;
      }
      this.counts = tempcount;
    },
    countReduce() {
      if (!this.counts || Number(this.counts) < 0) {
        this.counts = 0;
        return;
      }
      let tempcount = Number(this.counts);
      tempcount -= 1;
      this.counts = tempcount;
    },
    inputClick() {
      // console.log('input实时数据:', this.counts, typeof this.counts);
      if (!this.counts) {
        this.counts = 0;
      } else if (parseInt(this.counts) >= this.goods.number) {
        this.counts = parseInt(this.goods.number);
      } else {
        this.counts = parseInt(this.counts);
      }
    }
  }
};
</script>
<style scoped lang="scss">
.goodselectview {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  .topheader {
    flex: 0;
    width: 100%;
  }
  .content-top {
    flex: 1;
    width: 100%;
    overflow: scroll;
    .hd {
      width: 100%;
      padding: 0 px2rem(28);
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #ccc;
      .goodlistitem {
        width: 100%;
        border-bottom: none;
      }
    }
    .bd {
      .des-row {
        padding: 0 px2rem(28);
        border-bottom: px2rem(1) solid #ccc;
        font-size: px2rem(30);
        color: #000;
        line-height: px2rem(110);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .r {
          input {
            font-size: px2rem(30);
            line-height: px2rem(44);
            height: px2rem(44);
            width: px2rem(120);
            border: px2rem(1) solid #ccc;
            border-radius: 5%;
            text-align: center;
          }
          i {
            font-size: px2rem(30);
            margin-left: px2rem(20);
          }
          .inputBtn {
            height: px2rem(46);
            width: px2rem(46);
            font-size: px2rem(46);
            vertical-align: middle;
            text-align: center;
            color: rgb(105, 102, 102);
            &:first-child {
              margin-right: px2rem(20);
            }
          }
        }
      }
    }
  }
  .content-bottom {
    flex: 0 0 px2rem(120);
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: px2rem(1) solid #ccc;
    text-align: center;
    font-size: $text-size-best;
    line-height: px2rem(120);
    .btn-cancel {
      flex: 1;
      border-right: px2rem(1) solid #ccc;
      color: $danger;
    }
    .btn-add {
      flex: 1;
      color: $act-color;
    }
  }
}
</style>
