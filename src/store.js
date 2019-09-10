import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: sessionStorage.getItem('loginUserData')
      ? JSON.parse(sessionStorage.getItem('loginUserData'))
      : null,
    startTime: '',
    urlName: '',
    noticeList: []
  },
  mutations: {
    initUser(state, payload) {
      // console.log(payload);
      state.loginUser = payload;
    },
    initNotice(state, payload) {
      state.noticeList = payload;
    },
    unshiftMoreNotice(state, payload) {
      state.noticeList.unshift(...payload);
    },
    pushMoreNotice(state, payload) {
      state.noticeList.push(...payload);
    },
    setStartTime(state, payload) {
      state.startTime = payload;
    },
    setUrlName(state, payload) {
      state.urlName = payload;
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
