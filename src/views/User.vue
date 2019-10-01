<template>
  <div class="user">
    <topheader title="SFA" backurl="">
      <router-link to="/user" slot="r">修改密码</router-link>
    </topheader>
    <div class="bd">
      <div class="bd-title" @click="imgClick">
        <input
          type="file"
          ref="file"
          class="input-file"
          @change="upLoadImg"
          accept="image/*"
        />
        <img :src="loginUser.avatar" :alt="loginUser.name" />
      </div>
      <div class="bd-content">
        <div class="name">
          <div class="name-wrap">
            <span>员工姓名:</span>
            <span>{{ loginUser.name }}</span>
          </div>
        </div>
        <div class="phone">
          <div class="phone-wrap">
            <span>手机号码:</span>
            <span>{{ loginUser.phone }}</span>
          </div>
        </div>
        <div class="parter">
          <span>部门:</span>
          <span>{{ loginUser.department }}</span>
        </div>
        <div class="land-message">
          <span>上次登录时间:</span>
          <span>{{ loginUser.lastLogin }}</span>
        </div>
      </div>
    </div>
    <div class="bt">
      <div class="bt-l">重新登录</div>
      <div class="bt-r">注销</div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import { mapState } from 'vuex';
import canvasResize from 'canvas-resize';
import service from '../service/index';
import utility from '../common/utility';
export default {
  name: 'user',
  data() {
    return {};
  },
  computed: {
    ...mapState(['loginUser'])
  },
  components: {
    topheader: TopHeader
  },
  methods: {
    imgClick() {
      this.$refs.file.click();
    },
    upLoadImg(e) {
      //一、获取input标签的两种方式
      console.log(e);
      //this.$refs.file.files[0]就是是获取的图片的数据信息
      console.log(this.$refs.file.files[0]);
      //二、对图片的数据信息进行处理
      let formData = new FormData();
      let file = this.$refs.file.files[0];
      //file.type
      //#region 2.对图片进行压缩的处理方法 (H5图片压缩上传)
      //对图片内容进行压缩
      canvasResize(file, {
        crop: false, // 是否裁剪
        quality: 0.7, // 压缩质量  0 - 1
        rotate: 0, // 旋转角度
        callback: baseStr => {
          //baseStr是经过这个方法把原有的图片数据信息转化后得到的base64编码。
          console.log(baseStr.length);
          //因为后台问题还不能直接使用这个图片的base64编码，所以需要转化为Blob对象才能处理。
          let fileBlob = utility.convertBase64UrlToBlob(baseStr, {
            type: file.type
          });
          // 请求表单中，文件对应的name必须为： imgF
          formData.append('imgF', fileBlob);
          //#endregion 2.对图片进行压缩的处理方法
          // 三、处理好了图片信息，然后开始向服务器上传图片数据
          service
            .upLoadImg(formData)
            .then(res => {
              //四、上传图片数据成功后，返回图片对应的网络接口:res.data.img，便于在前端对图片进行提取，调用。
              console.log(
                '上传图片成功的返回数据res',
                res.data.img,
                typeof res.data.img
              );
              // this.imgs.push({ checked: false, url: res.data.img });//关键字符串是这个res.data.img对应的那张图片的url字段
              // 把图片存储在vuex的数据上
              this.$store.commit('changeCurUserInfo', res.data.img);
              //把修改的数据提交到服务器上
              let newUser = { ...this.loginUser }; //复制拷贝一个user对象
              console.log(
                '完整的imgurl:',
                `${process.env.VUE_APP_BASEURL}${res.data.img}`
              );
              newUser.avatar = `${process.env.VUE_APP_BASEURL}${res.data.img}`;
              service
                .putUser(newUser)
                .then(res => {
                  console.log('修改用户数据成功 res:', res.data);
                })
                .catch(err => {
                  console.log('修改用户数据失败 err:', err);
                });
              //除了使用代理来解决跨域问题以外，我们还可以通过设置vue的环境变量来解决开发接口与实际上线接口不一致的现象。
              /*先在根目录上建立.env文件，然后在.env文件中设置你需要的环境变量，然后在你需要使用的地方调用。比如:process.env.VUE_APP_BASEURL
           (详细见vue官网)*/
              console.log(
                '验证在.env文件中设置的process.env.VUE_APP_BASEURL的内容',
                process.env.VUE_APP_BASEURL
              );
            })
            .catch(err => {
              console.log('上传失败', err);
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.user {
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  color: #000;
  .topheader {
    flex: 0;
    width: 100%;
  }
  .bd {
    flex: 1;
    width: 100%;
    font-size: px2rem(28);
    position: relative;
    .bd-title {
      width: px2rem(220);
      height: px2rem(220);
      border-radius: 50%;
      border: px2rem(1) solid #ccc;
      margin: px2rem(56) auto;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top; //解决行内块元素在父级三像素的问题
      }
      .input-file {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        visibility: hidden;
      }
    }
    .bd-content {
      line-height: px2rem(110);
      border-top: px2rem(1) solid #ccc;
      border-bottom: px2rem(1) solid #ccc;
      .name {
        padding-left: px2rem(28);
        .name-wrap {
          display: flex;
          justify-content: space-between;
          border-bottom: px2rem(1) solid #ccc;
          span {
            text-align: right;
            margin-right: px2rem(28);
            &:first-child {
              color: #757575;
              text-align: left;
            }
          }
        }
      }
      .phone {
        padding-left: px2rem(28);
        .phone-wrap {
          display: flex;
          justify-content: space-between;
          border-bottom: px2rem(1) solid #ccc;
          span {
            margin-right: px2rem(28);
            &:first-child {
              color: #757575;
            }
          }
        }
      }
      .parter {
        display: flex;
        justify-content: space-between;
        span {
          margin: 0 px2rem(28);
          &:first-child {
            color: #757575;
          }
        }
      }
      .land-message {
        border-top: px2rem(1) solid #ccc;
        background-color: #fafafa;
        line-height: px2rem(84);
        font-size: px2rem(24);
        span {
          &:first-child {
            margin: 0 px2rem(28);
          }
        }
      }
    }
  }
  .bt {
    flex: 0 0 px2rem(112);
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: px2rem(30);
    text-align: center;
    border-top: px2rem(1) solid #ccc;
    line-height: px2rem(112);
    .bt-l {
      flex: 1;
      border-right: px2rem(1) solid #ccc;
      color: $act-color;
    }
    .bt-r {
      color: $danger;
      flex: 1;
    }
  }
}
</style>
