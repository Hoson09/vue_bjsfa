<template>
  <div class="visitshop">
    <topheader title="进店拜访">
      <div slot="r"></div>
    </topheader>
    <tabview :hd-titles="['计划内', '计划外']">
      <div class="tab-bd" slot="s1">
        <div class="search-wrap">
          <div class="search-box">
            <i
              @click="searchClick(false)"
              class="icon iconfont icon-sousuo"
            ></i>
            <input
              type="text"
              name="search"
              id="search"
              v-model="q"
              placeholder="点击进行搜索~"
              @keydown.enter="searchClick(false)"
            />
          </div>
        </div>
        <loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :auto-fill="false"
          ref="loadmore"
        >
          <div class="shop-list">
            <ul>
              <li class="shop-item" v-for="item in shops" :key="item.id">
                <router-link
                  class="shop-item-link"
                  :to="`/visitshop/${item.id}`"
                >
                  <div class="l">
                    <div class="hd">
                      <h3 class="shop-name">
                        {{ item.name }}
                      </h3>
                      <div class="shop-location">
                        <i class="icon iconfont icon-location"></i>
                        <span> &lt; {{ item.distance }} 米</span>
                      </div>
                    </div>
                    <div class="shop-id-wrap">
                      <span class="shop-id">ID: {{ item.id }}</span>
                      <span class="shop-time"
                        >创建时间: {{ item.subon | formatData }}</span
                      >
                    </div>
                    <div class="bottom">
                      <div class="boss-wrap">
                        <span class="boss">{{ item.bossName }}</span>
                        <span class="phone"
                          ><i class="icon iconfont icon-shouji"></i
                          >{{ item.phone }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <div class="r">
                    <i class="icon iconfont icon-youjiantou"></i>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </loadmore>
      </div>
      <div class="tab-bd" slot="s2">
        <h2>暂时没有数据</h2>
      </div>
    </tabview>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import service from '../service/index';
import { Indicator, Loadmore } from 'mint-ui';
import _ from 'lodash';
import { mapMutations } from 'vuex';
export default {
  name: 'visitshop',
  data() {
    return {
      q: '',
      lat: '',
      lng: '',
      shops: [],
      page: 1,
      allLoaded: false
    };
  },
  created() {
    Indicator.open({
      text: '加载中',
      spinnerType: 'triple-bounce'
    });
    this.getLocation()
      .then(() => {
        this.searchClick(false);
      })
      .catch(() => {
        this.searchClick(false);
      });
  },
  watch: {
    q: function(newVal) {
      if (!newVal) {
        this.searchClick(false);
      }
    }
  },
  methods: {
    ...mapMutations(['initShops', 'appendShops']),
    loadBottom() {
      this.page += 1; //加载下一页的数据
      this.searchClick(true).then(() => {
        //重新计算位置
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    getLocation() {
      //因为定位只需要一次即可，所以可以封装为一个方法来进行。又因为定位为异步加载，所以需要封装一个promise对象来执行。
      return new Promise((resolve, reject) => {
        //这是可以避免eslint校验的方法。****
        //eslint-disable-next-line
        var geolocation = new qq.maps.Geolocation(
          'FL6BZ-KA6WU-TPBVR-2KIMM-NT3OE-4KFEG',
          'myapp'
        );
        geolocation.getIpLocation(
          postion => {
            // console.log('postion==', postion);
            this.lat = postion.lat;
            this.lng = postion.lng;
            //发送ajax请求
            // service
            //   .getShops({ lat: this.lat, lng: this.lng, q: this.q })
            //   .then(res => {
            //     console.log(res.data);
            //     //这样可以让数据动态变化
            //     this.shops = res.data;
            //     Indicator.close();
            //   })
            //   .catch(() => {
            //     console.log('请求失败');
            //   });
            console.log('定位成功:', postion);
            resolve(postion);
          },
          err => {
            console.log('定位失败===', err);
            //定位失败也要发送ajax请求
            // service
            //   .getShops({ lat: this.lat, lng: this.lng, q: this.q })
            //   .then(res => {
            //     console.log(res.data);
            //     //这样可以让数据动态变化
            //     this.shops = res.data;
            //     Indicator.close();
            //   })
            //   .catch(() => {
            //     console.log('请求失败');
            //   });
            reject('定位失败');
          },
          {}
        );
      });
    },
    searchClick(isAppend) {
      // console.log(this.q);
      // Indicator.open({
      //   text: '加载中',
      //   spinnerType: 'triple-bounce'
      // });

      /**之前的做法 **/
      // var geolocation = new qq.maps.Geolocation(
      //   'FL6BZ-KA6WU-TPBVR-2KIMM-NT3OE-4KFEG',
      //   'myapp'
      // );
      // geolocation.getIpLocation(
      //   postion => {
      //     // console.log('postion==', postion);
      //     this.lat = postion.lat;
      //     this.lng = postion.lng;
      //     //发送ajax请求
      //     service
      //       .getShops({ lat: this.lat, lng: this.lng, q: this.q })
      //       .then(res => {
      //         console.log(res.data);
      //         //这样可以让数据动态变化
      //         this.shops = res.data;
      //         Indicator.close();
      //       })
      //       .catch(() => {
      //         console.log('请求失败');
      //       });
      //   },
      //   err => {
      //     console.log('定位失败===', err);
      //     //定位失败也要发送ajax请求
      //     service
      //       .getShops({ lat: this.lat, lng: this.lng, q: this.q })
      //       .then(res => {
      //         console.log(res.data);
      //         //这样可以让数据动态变化
      //         this.shops = res.data;
      //         Indicator.close();
      //       })
      //       .catch(() => {
      //         console.log('请求失败');
      //       });
      //   },
      //   {}
      // );
      if (!isAppend) {
        this.page = 1;
      }

      /**现在的做法 **/
      //在这里只需要发送ajax请求即可，不需要进行定位了。
      return service
        .getShops({
          lat: this.lat,
          lng: this.lng,
          name_like: this.q,
          _page: this.page
        })
        .then(res => {
          console.log(res.data);
          //这样可以让数据动态变化
          if (isAppend) {
            //如果是加载更多，则要往shops添加商铺信息。
            // this.shops.push(...res.data); //这种方式可能会出现重复。所以要使用loadsh去重
            let arr = [...this.shops, ...res.data];
            //loadsh根据请求对象的id字段来进行去重。
            this.shops = _.uniqBy(arr, 'id');
            // this.$refs.loadmore.onBottomLoaded();
            //把获取的数据存在vuex中进行传值
            this.appendShops(res.data);
          } else {
            //如果是搜索查询，直接把shops数组进行替换
            this.shops = res.data;
            //添加咋vuex上进行传值
            this.initShops(res.data);
          }
          Indicator.close();
        })
        .catch(() => {
          console.log('请求失败');
        });
    }
  },
  components: {
    topheader: TopHeader,
    loadmore: Loadmore
  },
  filters: {
    formatData(val) {
      let date = new Date(val);
      return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    }
  }
};
</script>
<style scoped lang="scss">
.tab-bd {
  background-color: #fff;
  .search-wrap {
    padding: 0 $text-size-top;
    background-color: #fafafa;
    border-bottom: px2rem(2) solid #fbfbfb;
    .search-box {
      overflow: hidden;
      position: relative;
      i {
        position: absolute;
        font-size: px2rem(35);
        top: px2rem(45);
        left: 0;
        color: #ccc;
      }
      #search {
        background-color: #fafafa;
        line-height: px2rem(106);
        font-size: $text-size-top;
        width: 95%;
        padding-left: px2rem(35);
        text-indent: 1em;
        border: none;
        color: #000;
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
  .shop-list {
    padding: 0 $text-size-top;
    background-color: #fff;
    .shop-item-link {
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(1) solid #ccc;
      .l {
        flex: 1;
        padding-right: px2rem(28);
        .hd {
          display: flex;
          justify-content: space-between;
          line-height: px2rem(82);
          font-size: $text-size-top;
          color: #000;
          .shop-location {
            .iconfont {
              font-size: $text-size-top;
            }
          }
        }
        .shop-id-wrap {
          line-height: $text-size-mid;
          font-size: $text-size-mid;
          color: $text-color;
          .shop-id {
            margin-right: $text-size-mid;
          }
        }
        .bottom {
          .boss-wrap {
            line-height: px2rem(72);
            color: $text-color;
            font-size: $text-size-mid;
            .boss {
              float: left;
            }
            .phone {
              float: right;
              color: $act-color;
              .iconfont {
                font-size: $text-size-mid;
                color: $text-color;
              }
            }
          }
        }
      }
      .r {
        flex: 0 0 px2rem(62 - 28);
        line-height: px2rem(174);
        text-align: center;
        .iconfont {
          font-size: $text-size-top;
        }
      }
    }
  }
}
</style>
