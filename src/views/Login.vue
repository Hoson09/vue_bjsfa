<template>
  <div class="login">
    <h1>欢迎登陆保洁SFA系统</h1>
    <div class="top-hat"></div>
    <div class="login-box">
      <div class="logo-box"></div>
      <div
        class="input-group"
        :class="{ active: act_index === 1, error: errors.has('cmno') }"
      >
        <label for="cm-code">公司编号:</label>
        <input
          name="cmno"
          v-validate="{ required: true, max: 6, min: 4 }"
          @focus="act_index = 1"
          type="number"
          id="cm-code"
          v-model="cm_code"
        />
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 2, error: errors.has('pnum') }"
      >
        <label for="p_num">员工编号:</label>
        <input
          name="pnum"
          v-validate="{ required: true, max: 12, min: 4 }"
          @focus="act_index = 2"
          type="number"
          id="p_num"
          v-model="p_num"
        />
      </div>
      <div
        class="input-group"
        :class="{ active: act_index === 3, error: errors.has('pwd') }"
      >
        <label for="pwd">用户密码:</label>
        <input
          name="pwd"
          v-validate="{ required: true, max: 12, min: 4 }"
          @focus="act_index = 3"
          type="password"
          id="pwd"
          v-model="pwd"
        />
      </div>
      <div class="ck-row">
        <div
          class="ckbox-wrap"
          @click="remenberSet"
          :class="{ active: remenber }"
        >
          <i
            class="iconfont"
            :class="{ 'icon-check-square': remenber, 'icon-border': !remenber }"
          ></i>
          <span>记住密码</span>
        </div>
        <div
          class="ckbox-wrap"
          @click="autologinSet"
          :class="{ active: autologin }"
        >
          <i
            class="iconfont"
            :class="{
              'icon-check-square': autologin,
              'icon-border': !autologin
            }"
          ></i>
          <span>自动登录</span>
        </div>
      </div>
    </div>
    <div class="logoBtn-box" @click="loginBtnClick">
      <input type="button" value="登录" />
    </div>
  </div>
</template>
<script>
import '../assets/font/iconfont.css';
import { Indicator, Toast } from 'mint-ui';
// import axios from "axios";
import { mapMutations } from 'vuex';
import service from '../service/index';

export default {
  name: 'login',
  data() {
    return {
      cm_code: '',
      act_index: 1,
      p_num: '',
      pwd: '',
      remenber: false,
      autologin: false
    };
  },
  mounted() {
    //在Vue完成挂载到dom元素上之后触发的方法。
    //强制执行校验的方法，$validator这个对象是通过全局导入自动加载到每个组件的Vue对象上的。
    this.$validator.validate();
    //设置记住密码后在挂载之后就要进行。。。 (localStorage中存储的都是字符串所以获得字符串后要进行转化成对象才行)
    let login_data = JSON.parse(localStorage.getItem('Login_data'));
    if (login_data) {
      this.p_num = login_data.PNO;
      this.cm_code = login_data.CNO;
      this.pwd = login_data.pwd;
      this.autologin = login_data.autologin;
      this.remenber = login_data.remenber;
    } else {
      this.p_num = this.$route.query.PNO;
      this.cm_code = this.$route.query.CNO;
    }
    if (this.autologin) {
      this.loginBtnClick();
    }
  },
  methods: {
    ...mapMutations(['initUser']),
    autologinSet() {
      this.autologin = !this.autologin;
      this.autologin && (this.remenber = true);
    },
    remenberSet() {
      this.remenber = !this.remenber;
      // if (!this.remenber) {
      //   this.autologin = false;
      // }
      this.remenber || (this.autologin = false);
    },
    loginBtnClick() {
      //判断当前校验是否全部通过了。
      // this.errors.any();//返回boolean ，如果有错误返回false，全部校验通过返回true
      if (this.errors.any()) {
        return;
      }
      // console.log("无错误");
      //弹出等待的遮罩层,防止二次点击
      Indicator.open({
        text: '登录中...',
        spinnerType: 'triple-bounce'
      });
      //发送ajax请求
      // setTimeout(() => {
      //   Indicator.close();
      // }, 2000);

      // axios
      //   .post("/api/login", {
      //     CNO: this.cm_code,
      //     PNO: this.p_num,
      //     Passwd: this.pwd
      //   })
      service
        .login({
          CNO: this.cm_code,
          PNO: this.p_num,
          Passwd: this.pwd
        })
        .then(res => {
          if (res.data.code == 1) {
            //登录成功
            //需要记住用户名和密码的操作
            console.log('res.token', res);
            if (this.remenber) {
              localStorage.setItem(
                'Login_data',
                JSON.stringify({
                  remenber: this.remenber,
                  autologin: this.autologin,
                  PNO: this.remenber ? this.p_num : '',
                  CNO: this.remenber ? this.cm_code : '',
                  pwd: this.remenber ? this.pwd : ''
                })
              );
            }
            /*localStorage 和 sessionStorage 属性允许在浏览器中存储 key/value 对的数据。
               sessionStorage 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。*/
            sessionStorage.setItem(
              'loginUserData',
              JSON.stringify(res.data.user)
            );
            sessionStorage.setItem('loginToken', res.data.token);

            //然后把数据存储到全局的vuex上。共其他页面调用
            // this.$store.commit("initUser", res.data.user);
            //map映射后直接调用方法即可
            this.initUser(res.data.user);
            //跳转到home页面
            this.$router.push('home');
          } else {
            //登录失败用户名不正确
            Toast({
              message: '用户名错误',
              duration: 2000
            });
          }
          Indicator.close();
        })
        .catch(() => {
          //登录异常失败
          Toast({
            message: '网络异常',
            duration: 2000
          });
          Indicator.close();
        });
    }
  }
};
</script>
<style lang="scss">
//没有scoped则说明是设置全局的样式
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
<style scoped lang="scss">
// 因为这个设置了scoped，所以这个是有块级作用域的，只能作用于当前的vue文件。原理是在这个样式类上加了一个独一无二的属性值来和别人区分开。

h1 {
  text-align: center;
  font-size: px2rem(36);
  height: px2rem(36);
  padding: px2rem(148-44-36) 0 px2rem(44) 0;
  line-height: px2rem(36);
  color: #fff;
}
.login {
  height: 100%;
  width: 100%;
  background-color: #2ade69;
  .top-hat {
    width: px2rem(537);
    height: px2rem(18);
    background-color: #eee;
    margin: 0 auto;
    border-radius: px2rem(18) px2rem(18) 0 0;
  }
  @mixin login-wrap() {
    width: px2rem(600);
    background-color: #fff;
    margin: 0 auto;
    border-radius: px2rem(20);
  }
  .login-box {
    @include login-wrap();
    height: px2rem(756);
    padding-top: px2rem(80);
    .logo-box {
      width: px2rem(190);
      height: px2rem(190);
      margin: 0 auto px2rem(80);
      background: url('../assets/logo.jpg');
      background-size: cover;
      border-radius: 50%;
    }
    @mixin rowStyle() {
      padding: px2rem(8) px2rem(36) 0;
      color: $text-color;
      width: px2rem(400);
    }
    .input-group {
      border: 2px solid #e2e2e2;
      border-radius: px2rem(45);
      font-size: $text-size-mid;
      line-height: px2rem(90);
      @include rowStyle();
      margin: 0 auto px2rem(30);
      input {
        border: 0 none;
        font-size: $text-size-mid;
        line-height: px2rem(90);
        width: px2rem(250);
        padding-left: 1em;
      }
      &.active {
        color: $act-color;
        border: px2rem(2) solid $act-color;
      }
      &.error {
        color: $danger;
        border: px2rem(2) solid $danger;
      }
    }
    .ck-row {
      font-size: $text-size-mid;
      line-height: $text-size-mid;
      @include rowStyle();
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .ckbox-wrap {
        i {
          display: inline-block;
          height: px2rem(32);
          width: px2rem(32);
          font-size: px2rem(32);
          vertical-align: middle;
        }
        &.active {
          color: $act-color;
        }
      }
    }
  }
  .logoBtn-box {
    @include login-wrap();
    text-align: center;
    color: $act-color;
    margin-top: px2rem(20);
    input {
      line-height: px2rem(100);
      font-size: $text-size-best;
      letter-spacing: px2rem(10);
      font-weight: 700;
      background-color: #fff;
      border: 0 none;
    }
  }
}
</style>
