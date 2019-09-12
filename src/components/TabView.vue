<template>
  <div class="tabview">
    <div class="tab-head">
      <ul class="hd-list">
        <li
          :class="{ active: index === curIndex }"
          class="hd-item"
          v-for="(item, index) in hdTitles"
          :key="index"
          @click="curIndex = index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="tab-body">
      <div class="s1 bd-item" :class="{ active: curIndex == 0 }">
        <slot name="s1">s1</slot>
      </div>
      <div class="s2 bd-item" :class="{ active: curIndex == 1 }">
        <slot name="s2">s2</slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tabview',
  props: ['hd-titles'],
  data() {
    return {
      curIndex: 0
    };
  }
};
</script>
<style scoped lang="scss">
.tabview {
  .tab-head {
    .hd-list {
      display: flex;
      border-bottom: px2rem(1) solid #ccc;
      background-color: #fff;
      .hd-item {
        flex: 1;
        box-sizing: border-box;
        border-right: px2rem(1) solid #ccc;
        line-height: px2rem(108);
        font-size: $text-size-top;
        color: #000;
        text-align: center;
        &:last-child {
          border-right: none;
        }
        &.active {
          border-bottom: px2rem(6) solid $act-color;
          background-color: #fafafa;
        }
      }
    }
  }
  .tab-body {
    .bd-item {
      display: none;
    }
    .bd-item.active {
      display: block;
    }
  }
}
</style>
