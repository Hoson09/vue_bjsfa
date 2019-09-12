<template>
  <div class="noticedetail">
    <topheader title="公告信息">
      <div slot="r"></div>
    </topheader>
    <h3>{{ noticeItem.title }}</h3>
    <p>{{ noticeItem.to }}</p>
    <div>
      {{ noticeItem.text }}
    </div>
    <p>{{ noticeItem.date }}</p>
    <p>{{ noticeItem.address }}</p>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import { mapState, mapMutations } from 'vuex';
import service from '../service/index';
export default {
  name: 'noticedetail',
  data() {
    return {
      noticeItem: null
    };
  },
  computed: {
    ...mapState(['noticeList'])
  },
  methods: {
    ...mapMutations(['setNoticeReaded'])
  },
  created() {
    // console.log(this.$router.history.current.name);
    const noticeId = this.$route.params.id;
    this.$store.commit('setUrlName', this.$router.history.current.name);
    this.noticeItem = this.noticeList.find(item => {
      return item.id == noticeId; //根据传过来的id参数来返回相应的noticeItem
    });
    // console.log(this.noticeList);
    // console.log(this.$route.params.id);
    //设置通知选项已读
    service.setNoticeReaded(noticeId);
    //在vuex里面进行修改
    this.setNoticeReaded(noticeId);
  },
  components: {
    topheader: TopHeader
  }
};
</script>
<style scoped lang="scss">
.noticedetail {
  color: #000;
  font-size: $text-size-top;
  line-height: 1.5;
  h3 {
    font-size: $text-size-biggest;
    font-weight: bolder;
  }
}
</style>
