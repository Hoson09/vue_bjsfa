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
            <a href="#">{{ item.title }}</a>
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
export default {
  name: 'noticevue',
  data() {
    return {
      noticeList: [],
      //是否完全加载完了数据？
      allLoaded: false,
      //加载数据的开始时间
      startDate: null,
      //加载数据的结束时间
      endDate: null
    };
  },
  methods: {
    loadTop() {
      //下拉加这个时间段之后的数据
      service
        .getNotices(this.startDate, 10, false)
        .then(res => {
          if (res.data.code == 1) {
            // console.log(res.data.data.messages);
            this.noticeList.unshift(...res.data.data.messages);
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
            this.noticeList.push(...res.data.data.messages);
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
    var now = Date.now();
    this.startDate = now;
    service
      .getNotices(now, 10, true)
      .then(res => {
        if (res.data.code == 1) {
          console.log(res.data);
          this.noticeList.push(...res.data.data.messages);
          this.endDate = this.noticeList[this.noticeList.length - 1].SubDate;
        } else {
          console.log('请求参数有误');
        }
      })
      .catch(() => {
        console.log('网络未连接');
      });
  }
};
</script>
<style scoped lang="scss"></style>
