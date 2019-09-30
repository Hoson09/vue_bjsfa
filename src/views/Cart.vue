<template>
  <div class="cartview">
    <topheader :title="shopName">
      <div slot="r" class="edit-btn">
        编辑
      </div>
    </topheader>
    <div class="wareHouse-wrap">
      <warehouse
        v-for="wareHouse in curShopCart.wareHouse"
        :key="wareHouse.wareHouseID"
        :wareHouseData="wareHouse"
        @allSelectClick="allSelectClick"
      ></warehouse>
    </div>
    <div class="bottom">
      <div class="b-l">
        <checkboxView v-model="isAllChecked"></checkboxView>
        <span class="all">全选</span>
        <div class="total-money">
          <span>合计:</span>
          <span class="dallor">{{ sumMoney }}元</span>
        </div>
      </div>
      <div class="b-r">
        <div class="comfirm">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import { mapState } from 'vuex';
import WareHouse from '../components/WareHouse';
import CheckBox from '../components/CheckBox';

export default {
  name: 'cartview',
  data() {
    return {
      shopName: '',
      curShopCart: null,
      isAllChecked: {
        checked: true,
        name: 'allChecked'
      },
      inWareHouseChecked: 0,
      inGoodChecked: 0
    };
  },
  watch: {
    isAllChecked: function(newVal) {
      /*****watch监听虽然是监听一个数据的变化，但是监听对象等引用类型的时候只能监听整个对象的变化，
      如果只是修改这个对象的某个属性的变化的话，watch监听不到。???*****/
      console.log('newVal', newVal);
      this.$store.commit('allSelection', newVal.checked);
    }
  },
  created() {
    this.shopName = this.curOrderShop.name;
    console.log(this.cartData, this.curOrderShop.id);
    this.curShopCart = this.cartData.find(
      item => item.shopId == this.curOrderShop.id
    );
    this.isAllSelected();
  },
  methods: {
    allSelectClick() {
      this.isAllSelected();
    },
    isAllSelected() {
      this.inWareHouseChecked = 0;
      this.inGoodChecked = 0;
      this.curShopCart.wareHouse.forEach(w => {
        if (!w.checked) {
          this.inWareHouseChecked += 1;
        }
        w.goods.forEach(g => {
          if (!g.checked) {
            this.inGoodChecked += 1;
          }
        });
      });
      if (this.inWareHouseChecked || this.inGoodChecked) {
        this.isAllChecked.checked = false;
      } else {
        this.isAllChecked.checked = true;
      }
      // console.log(this.isAllChecked);
    }
  },
  computed: {
    ...mapState(['curOrderShop', 'cartData']),
    sumMoney() {
      //计算属性函数可以根据Vuex的数据的变化随时调用计算属性函数，进而随时改变页面上的值。
      let money = 0;
      this.curShopCart.wareHouse.forEach(w => {
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
  },
  components: {
    topheader: TopHeader,
    warehouse: WareHouse,
    checkboxView: CheckBox
  }
};
</script>
<style scoped lang="scss">
.cartview {
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  .edit-btn {
    color: #fff;
    font-size: px2rem(28);
  }
  .topheader {
    width: 100%;
    flex: 0;
  }
  .wareHouse-wrap {
    width: 100%;
    flex: 1;
    overflow: scroll;
  }
  .bottom {
    width: 100%;
    flex: 0 0 px2rem(112);
    padding: 0 px2rem(28);
    border-top: px2rem(1) solid #666;
    box-sizing: border-box;
    color: #000;
    font-size: px2rem(28);
    // background-color: #ea86;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #f0f0f0;
    .b-l {
      flex: 1;
      line-height: px2rem(112);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .all {
        margin-left: px2rem(16);
      }
      .total-money {
        margin-left: px2rem(66);
        span {
          vertical-align: middle;
        }
        .dallor {
          font-size: px2rem(32);
          color: $danger;
          margin-left: px2rem(14);
        }
      }
    }
    .b-r {
      flex: 0 0 px2rem(168);
      text-align: center;
      color: #fff;
      line-height: px2rem(70);
      background-color: $act-color;
      border-radius: 5%;
    }
  }
}
</style>
