<template>
  <div class="cr">
    <div class="bd">
      <topheader :title="$store.state.curOrderShop.name">
        <div slot="r"></div>
      </topheader>
      <div class="txt">
        <textarea
          @input="remarkNum"
          v-model="remark"
          class="txt-remark"
          placeholder="请填写备注信息~"
        ></textarea>
      </div>
      <div class="word-num">
        <span>字数</span>
        <span>({{ getLength }}/20)</span>
      </div>
    </div>
    <div @click="confirmClick" class="bt">确定</div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';

export default {
  name: 'cr',
  data() {
    return {
      remark: ''
    };
  },
  created() {
    // let wareHouseID = this.$route.params.id;
    // let curOrderShop = this.$store.state.curOrderShop;
    // let shopInfo = this.$store.state.cartData.find(
    //   shop => shop.shopId == curOrderShop.id
    // );
    // //当传递对象并且要进行修改的时候最好把这个对象重新生成一个对象，否则可能会出现浅拷贝的一系列问题 Object.assign(obj,newobj) ,{...obj};
    // //let newShop = { ...shopInfo };//因为这里只是取值，并不是赋值，没必要重新设置一个新的对象来避免浅拷贝问题
    // let wareHouse = shopInfo.wareHouse.find(w => w.wareHouseID == wareHouseID);
    // this.remark = wareHouse.remark;
    /*这里可以把这个以上内容写在vuex的getters里面,因为getters里面的参数直接对应的返回值，
    所以this.$store.getters.getRemarkByWareHouseID直接对应就是返回的函数，即我们自定义的箭头函数，
    所以可以直接进行传递参数即可*/
    let remarkFun = this.$store.getters.getRemarkByWareHouseID(
      this.$route.params.id
    );
    this.remark = remarkFun;
  },
  methods: {
    remarkNum(e) {
      //用input事件来控制数字的多少 （也可以使用watch监听来操作）
      // console.log(e.target.value);
      if (e.target.value.length > 20) {
        this.remark = e.target.value.slice(0, 20);
      }
    },
    confirmClick() {
      //把备注提交到vuex上
      console.log('提交remark到vuex上,并退出');
      this.$store.commit('addRemarkToWareHouse', {
        id: this.$route.params.id,
        remark: this.remark
      });
      this.$router.go(-1);
    }
  },
  computed: {
    getLength() {
      return this.remark.length;
    }
  },
  components: {
    topheader: TopHeader
  }
};
</script>
<style scoped lang="scss">
.cr {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  background-color: #fff;
  .bd {
    flex: 1;
    .txt {
      padding: px2rem(28) 0;
      height: px2rem(380);
      box-sizing: border-box;
      background-color: #fafafa;
      border-bottom: px2rem(1) solid #ccc;
      .txt-remark {
        background-color: #fafafa;
        font-size: px2rem(28);
        line-height: 1.5;
        width: 100%;
        height: 100%;
        text-indent: 1em;
        border: none;
        color: #000;
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
    .word-num {
      font-size: px2rem(28);
      line-height: 2;
      margin-right: px2rem(28);
      text-align: right;
      color: #000;
      span {
        margin-left: px2rem(14);
      }
    }
  }
  .bt {
    flex: 0 0 px2rem(110);
    font-size: px2rem(36);
    color: $act-color;
    line-height: px2rem(110);
    text-align: center;
    border-top: px2rem(1) solid #ccc;
  }
}
</style>
