<template>
  <div class="signin">
    <topheader title="签到">
      <div slot="r" @click="submitSignIn">
        <i class="icon iconfont icon-duihao"></i>
      </div>
    </topheader>
    <picview @getimages="getImages" picdata=""></picview>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import PicView from '../components/PicView';
import service from '../service/index';
import { Toast } from 'mint-ui';
export default {
  name: 'signin',
  data() {
    return {
      imgs: []
    };
  },
  components: {
    topheader: TopHeader,
    picview: PicView
  },
  created() {
    Toast({
      message: '没有获取数据的接口',
      position: 'middle',
      duration: 2000,
      className: 'toasts'
    });
    /*因为没有获取图片的接口，所以无法直接获取用户的历史图片，所以无法进行展示。
    如果可以获取用户之前签到的照片的话，那么就可以把获取照片的数据信息传给子组件的props:['picdata']，
    然后在页面上展示*/
    // service
    //   .getSingInData(this.$route.params.id)
    //   .then(res => {
    //     console.log('商铺相关信息:', res);
    //   })
    //   .catch(err => {
    //     console.log('网络错误', err);
    //   });
  },
  methods: {
    getImages(e) {
      console.log('getImages:', e);
      this.imgs = e;
    },
    submitSignIn() {
      let data = {
        id: Date.now(),
        shopId: this.$route.params.id,
        SubOn: new Date().toLocaleDateString(),
        imgs: this.imgs.map(item => item.url)
      };
      if (data.imgs.length != 0) {
        console.log('submit Data:', data);
        service
          .submitSignIn(data)
          .then(res => {
            console.log(res.data);
            Toast({
              message: '签到成功',
              position: 'middle',
              duration: 2000,
              className: 'toasts'
            });
            this.$router.go(-1);
          })
          .catch(err => {
            console.log('网络请求错误', err);
            Toast({
              message: '签到失败',
              position: 'middle',
              duration: 2000,
              className: 'toasts'
            });
          });
      } else {
        Toast({
          message: '未添加签到照片',
          position: 'middle',
          duration: 2000,
          className: 'toasts'
        });
      }
    }
  }
};
</script>

<style lang="scss">
.toasts {
  // font-size: px2rem(50);
  //改变font-size不能改变mint字体大小，所以使用缩放
  transform: scale(4) !important;
  margin: 0 auto !important;
}
</style>

<style scoped lang="scss">
.signin {
  height: 100%;
  background-color: #fff;
  .topheader {
    i {
      font-size: $text-size-top;
    }
  }
}
</style>
