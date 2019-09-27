import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
//添加一个vuex的依赖项，用来进行本地化的持久存储，让存储在vuex里面的数据不会因为刷新而出现丢失的现象
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: sessionStorage.getItem('loginUserData')
      ? JSON.parse(sessionStorage.getItem('loginUserData'))
      : null,
    startTime: '',
    urlName: '',
    noticeList: [], //把请求的数据储存在vuex中，在相同请求的时候就可以避免多次请求的问题。
    Shops: [],
    Goods: [],
    curOrderShop: {},
    wearHouse: []
  },
  mutations: {
    initWearHouse(state, payload) {
      state.wearHouse = payload;
    },
    initCurOrderShop(state, payload) {
      state.curOrderShop = payload;
    },
    initGoods(state, payload) {
      state.Goods = payload;
    },
    appendGoods(state, payload) {
      let arr = [...state.Goods, ...payload];
      state.Goods = _.uniqBy(arr, 'id');
    },
    initShops(state, payload) {
      state.Shops = payload;
    },
    appendShops(state, payload) {
      //保证数组中没有重复id的数据
      let arr = [...state.Shops, ...payload];
      state.Shops = _.uniqBy(arr, 'id');
    },
    initUser(state, payload) {
      // console.log(payload);
      state.loginUser = payload;
    },
    initNotice(state, payload) {
      state.noticeList = _.uniqBy(payload, 'id'); // _.uniqBy这个是lodash中进行去重的方式，可以让数组根据id这个字段进行去重。
    },
    unshiftMoreNotice(state, payload) {
      state.noticeList.unshift(...payload);
      state.noticeList = _.uniqBy(state.noticeList, 'id');
    },
    pushMoreNotice(state, payload) {
      state.noticeList.push(...payload);
      state.noticeList = _.uniqBy(state.noticeList, 'id');
    },
    setStartTime(state, payload) {
      state.startTime = payload;
    },
    setUrlName(state, payload) {
      state.urlName = payload;
    },
    setNoticeReaded(state, payload) {
      let index = state.noticeList.findIndex(item => item.id == payload);
      let k = state.noticeList[index];
      k.isRead = true;
      state.noticeList.splice(index, 1, k); //因为vue是双向绑定的，所以需要这样替换，而不能直接赋值。
    }
  },
  actions: {},
  getters: {
    getLoginUser(state) {
      return state.loginUser;
    },
    getStartTime(state) {
      return state.startTime;
    },
    getUrlName(state) {
      return state.urlName;
    },
    getNoticeList(state) {
      return state.NoticeList;
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
