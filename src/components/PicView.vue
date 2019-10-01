<template>
  <div class="picview">
    <div class="img-box">
      <div class="img-btn" @click="takePhoto">
        <input
          @change="updatePhoto"
          type="file"
          accept="image/*"
          class="inputFile"
          ref="file"
        />
        <i class="icon iconfont icon-xiangji"></i>
        <p>拍摄照片</p>
      </div>
    </div>
    <div
      @click="img.checked = !img.checked"
      v-for="img in imgs"
      :key="img.url"
      class="img-box"
    >
      <div v-if="img.checked" class="check-hover">
        <i class="icon iconfont icon-duihao"></i>
      </div>
      <img :src="img.url" alt="图片" />
    </div>
    <div class="img-box">
      <div class="img-btn" @click="delPhoto">
        <i
          class="icon iconfont icon-shanchudange"
          :style="{ color: '#ff5656' }"
        ></i>
        <p>删除照片</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from '../service/index';
import canvasResize from 'canvas-resize';
import utility from '../common/utility';
export default {
  name: 'picview',
  data() {
    return {
      imgs: []
    };
  },
  watch: {
    imgs: function(newVal) {
      console.log('newVal:', newVal);
      this.$emit('getimages', newVal);
    }
  },
  props: ['picdata'],
  methods: {
    takePhoto() {
      this.$refs.file.click();
    },
    delPhoto() {
      //删除选中的图片
      this.imgs = this.imgs.filter(item => item.checked == false);
    },
    updatePhoto(e) {
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
              this.imgs.push({ checked: false, url: res.data.img });
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
      //#region 1. 这是之前图片完全不压缩上传的方法。
      // 请求表单中，文件对应的name必须为： imgF
      // // formData.append('imgF', this.$refs.file.files[0]);//1. 这是之前图片完全不压缩上传的方法。
      // // 三、向服务器上传图片数据
      // service
      //   .upLoadImg(formData)
      //   .then(res => {
      //     //四、上传图片数据成功后，返回图片对应的网络接口:res.data.img，便于在前端对图片进行提取，调用。
      //     console.log('上传图片成功的返回数据res', res.data.img);
      //     this.imgs.push(res.data.img);
      //     //除了使用代理来解决跨域问题以外，我们还可以通过设置vue的环境变量来解决开发接口与实际上线接口不一致的现象。
      //     /*先在根目录上建立.env文件，然后在.env文件中设置你需要的环境变量，然后在你需要使用的地方调用。比如:process.env.VUE_APP_BASEURL
      //            (详细见vue官网)*/
      //     console.log(
      //       '验证在.env文件中设置的process.env.VUE_APP_BASEURL的内容',
      //       process.env.VUE_APP_BASEURL
      //     );
      //   })
      //   .catch(() => {
      //     console.log('上传失败');
      //   });
      //#endregion 1. 这是之前图片完全不压缩上传的方法。
    }
  }
};
</script>
<style scoped lang="scss">
.picview {
  padding: px2rem(28);
  padding-bottom: 0;
  overflow: hidden;
  .img-box {
    float: left;
    margin: 0 px2rem(5) px2rem(28);
    border: px2rem(1) solid #ccc;
    width: px2rem(220);
    height: px2rem(220);
    box-sizing: border-box;
    color: #000;
    position: relative;
    .check-hover {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      i {
        position: absolute;
        bottom: px2rem(20);
        right: px2rem(20);
        font-size: $text-size-biggest;
        color: $danger;
        background-color: #fff;
        line-height: $text-size-biggest;
        opacity: 1;
        border-radius: 50%;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .img-btn {
      width: px2rem(220);
      height: px2rem(220);
      box-sizing: border-box;
      border: px2rem(1) solid #ccc;
      text-align: center;
      position: relative;
      .inputFile {
        height: 0;
        width: 0;
        position: absolute;
        top: 0;
        left: 0;
        //确保input标签不影响排版
        visibility: hidden;
      }
      i {
        display: block;
        font-size: px2rem(60);
        line-height: px2rem(60);
        margin: px2rem(72) auto px2rem(20);
      }
      p {
        font-size: px2rem(24);
        line-height: px2rem(24);
      }
    }
  }
}
</style>
