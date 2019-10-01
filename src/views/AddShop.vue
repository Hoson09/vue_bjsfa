<template>
  <div class="addshop">
    <div class="nav-hd">
      <topheader title="添加门店">
        <div slot="r" class="ok-btn">确定</div>
      </topheader>
    </div>
    <div class="content-container">
      <div ref="map" class="map-container"></div>
      <div class="address">地址:{{ address }}</div>
      <div class="row">
        <mt-field
          label="商店名称:"
          placeholder="请输入商店名称"
          v-model="shopName"
        ></mt-field>
      </div>
      <div class="row">
        <mt-field
          label="商店名称:"
          placeholder="请输入商店名称"
          v-model="name"
        ></mt-field>
      </div>
      <div class="row">
        <mt-field
          label="商店名称:"
          placeholder="请输入商店名称"
          v-model="addressTxt"
        ></mt-field>
      </div>
      <div class="row">
        <mt-field
          label="商店名称:"
          placeholder="请输入商店名称"
          v-model="phone"
        ></mt-field>
      </div>
      <div class="row">
        <mt-field
          label="商店名称:"
          placeholder="请输入商店名称"
          v-model="email"
        ></mt-field>
      </div>
      <div class="row">
        <mt-field
          label="商店名称:"
          placeholder="请输入商店名称"
          v-model="password"
        ></mt-field>
      </div>
    </div>
  </div>
</template>
<script>
import TopHeader from '../components/TopHeader';
import { Field } from 'mint-ui';
export default {
  name: 'addshop',
  data() {
    return {
      address: '',
      password: '',
      email: '',
      phone: '',
      addressTxt: '',
      name: '',
      shopName: ''
    };
  },
  components: {
    topheader: TopHeader,
    'mt-field': Field
  },
  mounted() {
    this.getLocation()
      .then(res => {
        console.log('定位成功', res);
        this.initMap(res);
      })
      .catch(rej => {
        console.log('定位失败', rej);
        this.initMap(rej);
      });
  },
  methods: {
    getLocation() {
      return new Promise((resolve, reject) => {
        //eslint-disable-next-line
        var geolocation = new qq.maps.Geolocation(
          'FL6BZ-KA6WU-TPBVR-2KIMM-NT3OE-4KFEG',
          'myapp'
        );
        geolocation.getIpLocation(
          postion => {
            console.log('定位成功：', postion);
            resolve(postion);
          },
          err => {
            console.log('定位失败', err);
            reject(err);
          },
          {}
        );
      });
    },
    initMap(postion) {
      let center;
      if (postion) {
        // 地图的中心地理坐标
        center = new qq.maps.LatLng(postion.lat, postion.lng);
      } else {
        // 地图的中心地理坐标
        center = new qq.maps.LatLng(39.916527, 116.397128);
      }
      // 创建地图
      var map = new qq.maps.Map(this.$refs.map, {
        center,
        zoom: 13, // 地图缩放级别
        mapStyleId: 'style1' // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
      });
      // 创建标注
      var marker = new qq.maps.Label({
        //设置Marker的位置坐标
        position: center,
        //设置显示Marker的地图
        map: map,
        content: '<p class="marker">商铺位置</p>',
        //设置Marker被添加到Map上时的动画效果为从天而降
        animation: qq.maps.MarkerAnimation.DROP,
        visible: true
      });
      // 获取坐标位置的辅助api
      let geocoder = new qq.maps.Geocoder();
      geocoder.setComplete(result => {
        // map.setCenter(result.detail.location);
        //获取位置成功后的回调函数~~~
        //设置当前标注新坐标
        marker.setPosition(result.detail.location);
        this.address = result.detail.address;
      });

      // 获取地图坐标的 地址位置。
      geocoder.getAddress(center);

      qq.maps.event.addListener(map, 'click', event => {
        center = new qq.maps.LatLng(
          event.latLng.getLat(),
          event.latLng.getLng()
        );
        // map.setCenter(center);
        marker.setPosition(center);
        geocoder.getAddress(center);
      });
    }
  }
};
</script>
<style scoped lang="scss">
.addshop {
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  align-items: center;
  .nav-hd {
    flex: 0 0 px2rem(120); //如果不直接设置高度的话，在iphone的浏览器上无法显示
    width: 100%;
    .topheader {
      .ok-btn {
        font-size: $text-size-mid;
      }
    }
  }
  .content-container {
    flex: 1;
    width: 100%;
    .map-container {
      height: px2rem(360);
      border: px2rem(1) solid #ccc;
    }
    .address {
      font-size: px2rem(28);
      color: #000;
      line-height: px2rem(50);
      background-color: #fafafa;
      margin-left: px2rem(28);
    }
    .row {
      padding-left: px2rem(28);
      font-size: px2rem(28);
      border-top: px2rem(1) solid #ccc;
      box-sizing: border-box;
      /deep/ .mint-cell-wrapper {
        //在scss文件中使用 /deep/ 的方法可以让父组件设置子组件的样式。在css文件中，父组件可以使用 >>> 符号来设置子组件的样式
        font-size: px2rem(24);
        line-height: px2rem(100);
        .mint-cell-title {
          width: px2rem(120);
        }
        .mint-cell-value {
          input {
            &::-webkit-input-placeholder {
              color: #ccc;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.marker {
  font-size: px2rem(28);
  line-height: px2rem(32);
  border-radius: 10%;
}
</style>
