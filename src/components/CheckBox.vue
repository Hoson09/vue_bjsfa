<template>
  <div @click="handleClick" class="checkboxview">
    <div v-show="value.checked" class="inner"></div>
  </div>
</template>
<script>
export default {
  name: 'checkboxview',
  props: ['value'],
  data() {
    return {};
  },
  methods: {
    handleClick() {
      console.log('sda', this.value);
      if (this.value.name == 'allChecked') {
        //父子组件之间传值的时候当传递过来是什么类型的值，返回的必须是同样类型的值才行。
        console.log('sss');
        this.$emit('input', {
          checked: !this.value.checked,
          name: 'allChecked'
        });
        return;
      }
      //发送input事件是与父组件上的v-modal相结合的，但是仓库和货物的checked不同步，不能这么简单的处理。
      if (this.value.wareHouseID) {
        // console.log('wareHouseID');
        this.$emit('wareHouseCheckedChange', {
          checked: !this.value.checked
        });
      } else {
        // console.log('goodID', this.value.goodsInfo.id);
        this.$emit('goodCheckedChange', {
          checked: !this.value.checked,
          goodID: this.value.goodsInfo.id
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.checkboxview {
  border-radius: 50%;
  height: px2rem(28);
  width: px2rem(28);
  border: px2rem(1) solid #333;
  position: relative;
  .inner {
    border-radius: 50%;
    height: px2rem(18);
    width: px2rem(18);
    background-color: #00a2eb;
    position: absolute;
    top: 50%;
    left: 50%;
    // margin-left: px2rem(-9);//这两种方式是一样的，都是为了让inner居中对齐
    // margin-top: px2rem(-9);//这两种方式是一样的，都是为了让inner居中对齐
    transform: translate(-50%, -50%);
  }
}
</style>
