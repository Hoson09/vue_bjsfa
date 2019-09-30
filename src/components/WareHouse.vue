<template>
  <div class="warehouse">
    <div class="hd">
      <div class="l">
        <!-- <i class="icon iconfont" :class="{ 'icon-dian': activeHD }"></i> -->
        <!-- <input type="checkbox" v-model="wareHouseData.checked" /> -->
        <checkboxView
          @wareHouseCheckedChange="wareHouseCheckedChange"
          :value="wareHouseData"
        ></checkboxView>
        <span>{{ wareHouseData.wareHouseName }}</span>
      </div>
      <div class="r">
        <span>
          <router-link :to="`/cartremark/${wareHouseData.wareHouseID}`">
            备注
          </router-link>
        </span>
        <i class="icon iconfont icon-bianji"></i>
      </div>
    </div>
    <div class="bd">
      <div
        class="bd-item"
        v-for="good in wareHouseData.goods"
        :key="good.goodsInfo.id"
      >
        <div class="l">
          <!-- <i class="icon iconfont" :class="{ 'icon-dian': activeBD }"></i> -->
          <!-- <input type="checkbox" v-model="wareHouseData.checked" /> -->
          <checkboxView
            @goodCheckedChange="goodCheckedChange"
            :value="good"
          ></checkboxView>
        </div>
        <div class="r">
          <cgrr :good="good" :wareHouseName="wareHouseData"></cgrr>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckBox from './CheckBox';
import CGRR from './CartGoodsRowRight';
export default {
  name: 'warehouse',
  data() {
    return {
      // activeHD: true,
      // activeBD: true
    };
  },
  props: ['wareHouseData'],
  created() {
    console.log(this.wareHouseData);
  },
  methods: {
    // hdClick() {
    //   this.activeHD = !this.activeHD;
    //   this.activeBD = !this.activeBD;
    // },
    // bdClick() {
    //   this.activeBD = !this.activeBD;
    // }
    goodCheckedChange(e) {
      console.log(e);
      this.$store.commit('changeGoodsChecked', {
        checked: e.checked,
        goodID: e.goodID,
        wareHouseID: this.wareHouseData.wareHouseID
      });
      this.$emit('allSelectClick');
    },
    wareHouseCheckedChange(e) {
      console.log(e);
      this.$store.commit('changeWareHouseChecked', {
        checked: e.checked,
        wareHouseID: this.wareHouseData.wareHouseID
      });
      this.$emit('allSelectClick');
    }
  },
  components: {
    checkboxView: CheckBox,
    cgrr: CGRR
  }
};
</script>
<style scoped lang="scss">
.warehouse {
  background-color: #fff;
  font-size: $text-size-top;
  border-bottom: px2rem(1) solid #ccc;
  border-top: px2rem(1) solid #ccc;
  .hd {
    padding: 0 px2rem(28);
    line-height: px2rem(84);
    color: #000;
    background-color: #fafafa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: px2rem(1) solid #ccc;
    .l {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // i {
      //   display: block;
      //   height: px2rem(26);
      //   width: px2rem(26);
      //   color: #00a2eb;
      //   border: px2rem(1) solid #ccc;
      //   position: relative;
      //   border-radius: 50%;
      //   margin-right: px2rem(20);
      //   &::before {
      //     width: px2rem(30);
      //     height: px2rem(30);
      //     font-size: px2rem(80);
      //     position: absolute;
      //     top: px2rem(-29);
      //     left: px2rem(-27);
      //   }
      // }
      span {
        margin-left: px2rem(28);
      }
    }
    .r {
      color: $act-color;
      i {
        font-size: $text-size-top;
      }
    }
  }
  .bd-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: px2rem(28);
    .l {
      // i {
      //   display: block;
      //   height: px2rem(26);
      //   width: px2rem(26);
      //   color: #00a2eb;
      //   border: px2rem(1) solid #ccc;
      //   position: relative;
      //   border-radius: 50%;
      //   margin-right: px2rem(20);
      //   &::before {
      //     width: px2rem(30);
      //     height: px2rem(30);
      //     font-size: px2rem(80);
      //     position: absolute;
      //     top: px2rem(6);
      //     left: px2rem(-27);
      //   }
      // }
      margin-right: px2rem(28);
    }
    .r {
      flex: 1;
    }
  }
}
</style>
