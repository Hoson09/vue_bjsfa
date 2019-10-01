import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Notice from './views/Notice';
import VisitShop from './views/VisitShop';
import NoticeDetail from './views/NoticeDetail';
import ShopInfo from './views/ShopInfo';
import SignIn from './views/SignIn';
import OrderView from './views/OrderView';
import GoodSelect from './views/GoodSelect';
import Cart from './views/Cart';
import CartRemark from './views/CartRemark';
import SubCart from './views/SubCart';
import AddShop from './views/AddShop';

Vue.use(Router);

// ajax
// let perArr = [{
//     id: 22,
//     url: '/home/aid'
// }];

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
      // ,
      // meta: {
      //     perId: perArr.find(item => item.url === '/notice').id
      // }
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
      path: '/visitshop/:id',
      name: 'ShopInfo',
      component: ShopInfo
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin/:id',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/order/:id',
      name: 'OrderView',
      component: OrderView
    },
    {
      path: '/goodselect/:id',
      name: 'GoodSelect',
      component: GoodSelect
    },
    {
      path: '/cart/:id',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/cartremark/:id',
      name: 'CartRemark',
      component: CartRemark
    },
    {
      path: '/subcart',
      name: 'SubCart',
      component: SubCart
    },
    {
      //这是按需加载的方式
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/User.vue') //这样引入组件的方式，是异步引入的方式
    },
    {
      path: '/addedshop',
      name: 'addedshop',
      component: AddShop
    },
    {
      //增加这个路由的意思是路由跳转时如果所有的路由都没匹配上的话会自动跳转到这个地址，相对应显示的是VisitShop页面。
      path: '*',
      name: 'all',
      component: VisitShop
    }
  ]
});
