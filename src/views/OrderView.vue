<template>
  <div class="orderview">
    <topheader title="下单">
      <div class="" slot="r">
        <i class="icon iconfont icon-cart"></i>
      </div>
    </topheader>
    <h1>{{ $route.params.id }}</h1>
    <searchbtn @search="searchClick" v-model="q"></searchbtn>
    <div class="hot-wrap">
      <ul class="class-list">
        <li
          @click="(isSaleHot = !isSaleHot), (isAll = false)"
          class="class-item"
        >
          促销
        </li>
        <li @click="isAll = true" class="class-item">全部</li>
        <li class="class-item">SKU-L</li>
        <li class="class-item">SKU-H</li>
      </ul>
    </div>
    <div class="goods-list-wrap">
      <div class="goods-hd">
        <div class="l">{{ curGood }}/{{ totalGood }}</div>
        <div class="r">
          <ul class="good-type-list">
            <li class="good-type-item">食品/</li>
            <li class="good-type-item">日化/</li>
            <li class="good-type-item">宝洁/</li>
            <li class="good-type-item">
              <i class="icon iconfont icon-filter"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="goods-bd"></div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import SearchBtn from '../components/SearchBtn';
export default {
  name: 'orderview',
  data() {
    return {
      q: '',
      isSaleHot: false,
      isAll: true,
      totalGood: 0,
      curGood: 0
    };
  },
  components: {
    topheader: TopHeader,
    searchbtn: SearchBtn
  },
  methods: {
    searchClick() {
      console.log('父组件与自定义搜索框子组件形成的v-model双向绑定', this.q);
    }
  }
};
</script>
<style scoped lang="scss">
.orderview {
  height: 100%;
  .hot-wrap {
    background-color: #fafafa;
    padding: px2rem(14) px2rem(28);
    font-size: px2rem(28);
    border-top: px2rem(1) solid #ccc;
    border-bottom: px2rem(1) solid #ccc;
    .class-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .class-item {
        flex: 1 1 px2rem(132);
        line-height: px2rem(58);
        text-align: center;
        border-right: px2rem(1) solid #000;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  .goods-list-wrap {
    background-color: #fff;
    .goods-hd {
      overflow: hidden;
      padding: 0 px2rem(28);
      .l,
      .r {
        line-height: px2rem(84);
        font-size: $text-size-top;
      }
      .l {
        float: left;
      }
      .r {
        float: right;
        .good-type-list {
          display: flex;
          justify-content: flex-start;
          .good-type-item {
            align-items: center;
            flex: 0 0 px2rem(70);
            i {
              font-size: $text-size-top;
              line-height: px2rem(84);
            }
          }
        }
      }
    }
  }
}
</style>
