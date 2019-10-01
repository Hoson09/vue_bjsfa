<template>
  <div class="home">
    <topheader title="SFA" backurl="/">
      <router-link to="/user" slot="r" class="iconfont icon-user"></router-link>
    </topheader>
    <div class="main-body">
      <div class="date-wrap">{{ getYearMouth }}</div>
      <div class="progress-wrap">
        <progress-pie
          title="当前月进度"
          :val="getDayOfMonth"
          :percent="true"
        ></progress-pie>
        <progress-pie
          title="月销售完成度"
          :val="DivSalesPercent"
          :percent="true"
        ></progress-pie>
        <progress-pie
          title="有效商店数"
          :val="shops"
          :percent="false"
        ></progress-pie>
      </div>
    </div>
    <div class="main-nav">
      <div class="cell" v-for="index in 9" :key="index">
        <!-- 因为这个九宫格是铺不满的，最后一个是空，所以要判断一下才行 -->
        <template v-if="index <= menulist.length">
          <menu-cell
            :menuname="menulist[index - 1].menuname"
            :imgurl="menulist[index - 1].imgurl"
            :url="menulist[index - 1].url"
          ></menu-cell>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopHeader from '../components/TopHeader';
import ProgressPie from '../components/ProgressPie';
import service from '../service/index';
import MenuCell from '../components/MenuCell';
// import { mapGetters } from "vuex";
import menulist from '../static/Menu';
export default {
  name: 'home',
  data() {
    return {
      DivSalesPercent: 0,
      shops: 0,
      menulist
    };
  },
  components: {
    topheader: TopHeader,
    'progress-pie': ProgressPie,
    'menu-cell': MenuCell
  },
  created() {
    // console.log(menulist);

    //这是vue页面创建之后
    // axios.get('/api/auth/shopSales/')
    // console.log(this.$store.getters.getLoginUser.id);
    let id = this.$store.getters.getLoginUser.id + 29002;
    service
      .getUserProgress(id)
      .then(res => {
        // console.log(res.data);
        this.DivSalesPercent = res.data.DivSalesPercent;
        this.shops = 256;
      })
      .catch(() => {});
  },
  computed: {
    // ...mapGetters["getLoginUser"],
    getYearMouth() {
      let date = new Date(Date.now());
      let year = date.getFullYear();
      let mouth = date.getMonth() + 1;
      return `${year} 年 ${mouth} 月`;
    },
    getDayOfMonth() {
      let d = new Date();
      let m = d.getMonth() + 1;
      let y = d.getFullYear();
      // console.log(d, m, y);
      let set1 = new Set([1, 3, 5, 7, 8, 10, 12]);
      let set2 = new Set([4, 6, 9, 11]);
      if (set1.has(m)) {
        // console.log(set1.has(m));
        return parseInt((d.getDate() / 31) * 100);
      } else if (set2.has(m)) {
        // console.log(set2.has(m));
        return parseInt((d.getDate() / 30) * 100);
      } else {
        if (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0)) {
          return parseInt((d.getDate() / 29) * 100);
        } else {
          return parseInt((d.getDate() / 28) * 100);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .main-nav {
    flex: 1;
    width: 100%;
    padding: 0 px2rem(30);
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: stretch;
    border-top: px2rem(1) solid #ccc;
    .cell {
      flex: 1 1 33%;
      border-bottom: px2rem(1) solid #ccc;
      border-right: px2rem(1) solid #ccc;
      &:nth-child(3n) {
        border-right: none;
      }
      &:nth-child(7) {
        border-bottom: none;
      }
      &:nth-child(8) {
        border-bottom: none;
      }
      &:nth-child(9) {
        border-bottom: none;
      }
    }
  }
  .main-body {
    background-color: #fff;
    width: 100%;
    .date-wrap {
      padding: px2rem(40) 0 px2rem(22);
      text-align: center;
      color: #000;
      font-size: $text-size-top;
      line-height: $text-size-top;
    }
    .progress-wrap {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
}
</style>
