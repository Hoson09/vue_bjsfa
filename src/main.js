import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
// import MintUI from "mint-ui";//这是全局引入，我们现在按需引入即可。
// import "mint-ui/lib/style.css";//这是全局引入，我们现在按需引入即可。
//移动端适配方案
import "./lib/hotcss/hotcss";

Vue.config.productionTip = false;
Vue.use(VeeValidate);
// Vue.use(MintUI);//这是全局引入，我们现在按需引入即可。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
