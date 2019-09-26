import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import TabView from './components/TabView';
// import PicView from './components/PicView'; //（因为图片的上传和下载需要父子之间数据的传递，所以不适宜做成全局组件）

// import MintUI from "mint-ui";//这是全局引入，我们现在按需引入即可。
// import "mint-ui/lib/style.css";//这是全局引入，我们现在按需引入即可。
//移动端适配方案
import './lib/hotcss/hotcss';
import Helper from './lib/helper';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
// Vue.use(MintUI);//这是全局引入，我们现在按需引入即可。

//把自定义的组件做成全局组件
Vue.component('tabview', TabView);
// Vue.component('picview', PicView); //（因为图片的上传和下载需要父子之间数据的传递，所以不适宜做成全局组件）

router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    //校验用户是否登录
    if (Helper.getTypes(store.getters.getLoginUser) === 'Object') {
      next();
    } else {
      next('/');
    }
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
