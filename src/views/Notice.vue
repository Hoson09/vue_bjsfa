<template>
  <div class="noticevue">
    <topheader title="公司公告">
      <div slot="r"></div>
    </topheader>
    <div class="notice-wrap">
      <loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
        :auto-fill="false"
      >
        <ul class="notice-list">
          <li v-for="item of noticeList" :key="item.id" class="notice-item">
            <router-link :to="`/notice/${item.id}`">
              <div class="notice-div">
                <div class="notice-l">
                  <div
                    class="icon iconfont icon-dian"
                    :class="{ readed: (isRead = item.isRead) }"
                  ></div>
                </div>
                <div class="notice-r">
                  <h3 class="notice-title">{{ item.title }}</h3>
                  <p class="notice-date">{{ item.SubDate | dateFormat }}</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </loadmore>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import service from '../service/index';
import { Loadmore } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'noticevue',
  data() {
    return {
      //是否完全加载完了数据？
      allLoaded: false,
      //加载数据的开始时间
      startDate: null,
      //加载数据的结束时间
      endDate: null,
      isRead: false
    };
  },
  beforeRouteEnter(to, from, next) {
    //这个方法触发的时候组件还没有创建，需要在next中执行这个组件的this对象。
    //****** 当route进入vue页面的时候触发,但是这个方法执行的很晚，在mouted之后才执行。所以要注意一下*****
    // console.log('from.name:', from.name);
    // console.log('to:', to);
    // this.routerName = from.name;
    // next(vm => {
    //   console.log(vm);
    // });
    next();
  },
  filters: {
    dateFormat(val) {
      let d = new Date(val);
      let date = d.getDate();
      let month = d.getMonth();
      let year = d.getFullYear();
      return `${year}年${month + 1}月${date}日`;
    }
  },
  methods: {
    ...mapMutations(['initNotice', 'unshiftMoreNotice', 'pushMoreNotice']),
    loadTop() {
      //下拉加这个时间段之后的数据
      service
        .getNotices(this.startDate, 10, false)
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data.messages);
            // this.noticeList.unshift(...res.data.data.messages); //使用本地组件的方式存储noticeList
            this.unshiftMoreNotice(res.data.data.messages); //vuex的方式来存储数据
            this.startDate = this.noticeList[0].SubDate;
            //加载完数据之后必须调用这个方法才行。
            this.$refs.loadmore.onTopLoaded();
          } else {
            console.log('请求参数有误');
          }
        })
        .catch(() => {
          console.log('网络未连接');
        });
    },
    loadBottom() {
      service
        .getNotices(this.endDate, 10, true)
        .then(res => {
          if (res.data.code == 1) {
            if (res.data.data.messages.length <= 0) {
              this.allLoaded = true;
              return;
            }
            // this.noticeList.push(...res.data.data.messages);
            this.pushMoreNotice(res.data.data.messages);
            this.endDate = this.noticeList[this.noticeList.length - 1].SubDate;
            //加载完数据之后必须调用这个方法才行
            this.$refs.loadmore.onBottomLoaded();
          } else {
            console.log('请求参数有误');
          }
        })
        .catch(() => {
          console.log('网络未连接');
        });
    }
  },
  components: {
    topheader: TopHeader,
    loadmore: Loadmore
  },
  created() {
    // console.log(this.$store.getters.getUrlName);
    if (this.$store.getters.getUrlName != 'NoticeDetail') {
      var now = Date.now();
      this.startDate = now;
      this.$store.commit('setStartTime', this.startDate);
    } else {
      this.startDate = this.$store.getters.getStartTime;
      this.$store.commit('setUrlName', this.$router.history.current.name);
      return;
    }
    console.log(this.startDate);
    service
      .getNotices(this.startDate, 10, true)
      .then(res => {
        if (res.data.code == 1) {
          console.log(res.data);
          // this.noticeList.push(...res.data.data.messages);//使用本地组件的方式存储noticeList
          this.initNotice(res.data.data.messages); //vuex的方式来存储数据
          this.endDate = this.noticeList[this.noticeList.length - 1].SubDate;
        } else {
          console.log('请求参数有误');
        }
      })
      .catch(() => {
        console.log('网络未连接');
      });
  },
  computed: {
    ...mapState(['noticeList'])
  }
};
</script>
<style scoped lang="scss">
.noticevue {
  .notice-wrap {
    background-color: #fff;
    .notice-list {
      .notice-item {
        padding: px2rem(32) 0 px2rem(32) px2rem(40);
        border: px2rem(1) solid #ccc;
        .notice-div {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .notice-l {
            flex: 0 0 px2rem(40);
            position: relative;
            top: px2rem(-6);
            .iconfont::before {
              line-height: px2rem(40);
              font-size: px2rem(40);
            }
            .iconfont.readed::before {
              color: red;
            }
          }
          .notice-r {
            flex: 1;
            .notice-title {
              font-size: $text-size-top;
              color: #000;
              line-height: $text-size-top;
            }
            .notice-date {
              font-size: px2rem(16);
              color: #666;
              line-height: px2rem(16);
              margin-top: px2rem(16);
            }
          }
        }
      }
    }
  }
}
</style>
