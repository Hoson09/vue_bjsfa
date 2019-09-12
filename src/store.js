import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: sessionStorage.getItem('loginUserData')
      ? JSON.parse(sessionStorage.getItem('loginUserData'))
      : null,
    startTime: '',
    urlName: '',
    noticeList: [] //把请求的数据储存在vuex中，在相同请求的时候就可以避免多次请求的问题。
  },
  mutations: {
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
  }
});
