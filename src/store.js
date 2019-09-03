import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: sessionStorage.getItem('loginUserData')
      ? JSON.parse(sessionStorage.getItem('loginUserData'))
      : null
  },
  mutations: {
    initUser(state, payload) {
      // console.log(payload);
      state.loginUser = payload;
    }
  },
  actions: {},
  getters: {
    getLoginUser(state) {
      return state.loginUser;
    }
  }
});
