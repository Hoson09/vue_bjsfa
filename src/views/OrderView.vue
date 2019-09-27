<template>
  <div class="orderview">
    <topheader title="下单">
      <div class="" slot="r">
        <i class="icon iconfont icon-cart"></i>
      </div>
    </topheader>
    <searchbtn @search="searchClick" v-model="q"></searchbtn>
    <div class="hot-wrap">
      <ul class="class-list">
        <li
          @click="onSaleClick"
          class="class-item"
          :class="{ active: isSaleHot }"
        >
          促销
        </li>
        <li @click="onAllClick" class="class-item" :class="{ active: isAll }">
          全部
        </li>
        <li class="class-item">SKU-L</li>
        <li class="class-item">SKU-H</li>
      </ul>
    </div>
    <div class="goods-list-wrap">
      <div class="goods-hd">
        <div class="l">{{ curGood }}/{{ totalGood }}</div>
        <div class="r">
          <div class="good-type-item">
            {{ getFilterGoodsType }}
            <i
              class="icon iconfont icon-filter"
              @click="popupVisible = true"
            ></i>
          </div>
        </div>
      </div>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="goods-bd"
      >
        <goodlistitem
          v-for="item in goods"
          :key="item.id"
          :goods="item"
        ></goodlistitem>
      </div>
    </div>
    <my-popup
      position="right"
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <div class="popup-select">
        <check-list
          align="right"
          v-model="filterGoodsType"
          :options="['食品', '日化', '宝洁']"
          title="请选择商品类型"
        ></check-list>
        <input
          type="button"
          @click="btnClick"
          value="确定"
          class="btn-confirm"
        />
      </div>
    </my-popup>
  </div>
</template>
<script>
import Vue from 'vue';
import TopHeader from '../components/TopHeader';
import SearchBtn from '../components/SearchBtn';
import GoodListItem from '../components/GoodListItem';
import service from '../service/index';
import { Popup, Checklist, InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);
export default {
  name: 'orderview',
  data() {
    return {
      q: '',
      isSaleHot: false,
      isAll: true,
      totalGood: 0,
      curGood: 0,
      goods: [],
      filterGoodsType: ['食品', '日化', '宝洁'],
      popupVisible: false,
      curPage: 1,
      loading: false
    };
  },
  computed: {
    getFilterGoodsType() {
      return this.filterGoodsType.join('/');
    }
  },
  created() {
    console.log('create');
    let fromData = {
      _limit: 15,
      _page: this.curPage
    };
    this.loadGoodsData(fromData);
  },
  components: {
    topheader: TopHeader,
    searchbtn: SearchBtn,
    goodlistitem: GoodListItem,
    'my-popup': Popup,
    'check-list': Checklist
  },
  watch: {
    q: function(newVal) {
      if (!newVal) {
        this.searchClick();
      }
    }
  },
  methods: {
    onAllClick() {
      this.isAll = true;
      this.isSaleHot = false;
      this.curPage = 1;
      let data = {
        _limit: 15,
        _page: this.curPage
      };
      this.goods = [];
      this.loadGoodsData(data);
    },
    onSaleClick() {
      this.isAll = false;
      this.isSaleHot = true;
      this.curPage = 1;
      let formData = {
        _limit: 15,
        _page: this.curPage
      };
      formData.onsales = this.isSaleHot;
      this.goods = [];
      this.loadGoodsData(formData);
    },
    loadMore() {
      this.loading = true;
      this.curPage += 1;
      let data = {
        _limit: 15,
        _page: this.curPage
      };
      if (this.isSaleHot) {
        data.onsales = this.isSaleHot;
      }
      this.loadGoodsData(data).finally(() => {
        this.loading = false;
      });
    },
    searchClick() {
      console.log('父组件与自定义搜索框子组件形成的v-model双向绑定', this.q);
      this.goods = [];
      this.curPage = 1;
      this.loadGoodsData({
        q: this.q,
        _limit: 15,
        _page: this.curPage
      });
    },
    btnClick() {
      this.popupVisible = false;
    },
    loadGoodsData(fromData) {
      return service
        .loadGoods(fromData)
        .then(res => {
          console.log('获取Goods数据res', res);
          this.goods = [...this.goods, ...res.data];
          if (!this.q && !this.isSaleHot) {
            this.totalGood = res.headers['x-total-count'];
          }
          this.curGood = res.headers['x-total-count'];
        })
        .catch(err => {
          console.log(err);
        });
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
        &.active {
          color: #04afeb;
        }
      }
    }
  }
  .goods-list-wrap {
    background-color: #fff;
    padding: 0 px2rem(28);
    .goods-hd {
      overflow: hidden;
      border-bottom: px2rem(1) solid #ccc;
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
        .good-type-item {
          align-items: center;
          flex: 0 0 px2rem(70);
          i {
            font-size: $text-size-top;
            line-height: px2rem(84);
            margin-left: px2rem(20);
          }
        }
      }
    }
  }
  .btn-confirm {
    display: block;
    width: 80%;
    height: px2rem(80);
    margin: px2rem(30) auto;
    font-size: px2rem(30);
    border-radius: px2rem(40);
    color: #fff;
    background-color: $danger;
  }
}
</style>
