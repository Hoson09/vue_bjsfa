import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Notice from './views/Notice';
import VisitShop from './views/VisitShop';
import NoticeDetail from './views/NoticeDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
      // beforeEnter(to, from, next) {
      //   console.log('to', to);
      //   console.log('from', from);
      //   next();
      // }
    },
    {
      path: '/notice/:id',
      name: 'NoticeDetail',
      component: NoticeDetail
    },
    {
      path: '/visitshop',
      name: 'VisitShop',
      component: VisitShop
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      //这是按需加载的方式
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/User.vue')
    }
  ]
});
