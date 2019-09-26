<template>
  <div class="search-btn">
    <div class="r">
      <i class="icon iconfont icon-sousuo" @click="$emit('search')"></i>
      <input
        @input="$emit('input', $event.target.value)"
        :value="value"
        type="text"
        placeholder="点击进行搜索~"
        @keydown.enter="$emit('search')"
      />
    </div>
    <div class="l">
      <i class="icon iconfont icon-xiangji-tianchong"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search-btn',
  data() {
    return {};
  },
  props: ['value']
};
</script>
<style scoped lang="scss">
.search-btn {
  padding: px2rem(20) px2rem(28);
  background-color: #fafafa;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #000;
  .r {
    flex: 1;
    height: px2rem(64);
    line-height: px2rem(64);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    i,
    input {
      font-size: px2rem(28);
      line-height: px2rem(64);
      background-color: #fafafa;
    }
    i {
      flex: 0 0 px2rem(40);
      text-align: center;
    }
    input {
      flex: 1;
      border: none;
      &::-webkit-input-placeholder {
        color: #ccc;
      }
    }
  }
  .l {
    flex: 0 0 px2rem(64);
    height: px2rem(64);
    line-height: px2rem(64);
    text-align: center;
    i {
      font-size: px2rem(40);
    }
  }
}
</style>
