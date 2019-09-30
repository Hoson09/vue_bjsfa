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
    wearHouse: [],
    cartData: []
    /**
     * 购物车的结构：
     * carts:[{
     *       shopId:3021,
     *       shopName:'XXX超市',
     *       wareHouse：[{
     *                  remark:'',
     *                  wareHouseID:1002
     *                  wareHouseName:'sss',
     *                  checked:true,
     *                  goods:[{
     *                        goodsInfo:{商品对象},
     *                        counts:20,
     *                        checked:true
     *                          },
     *                          ...
     *                        ]
     *                    },
     *                    ...
     *                  ]
     *         },
     *         ...
     *      ]
     */
  },
  mutations: {
    subOrderClear(state) {
      console.log('提交成功后把提交的数据清理掉');
      let shopIndex = state.cartData.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      // let curShopInfo = { ...state.cartData[shopIndex] };//这是第一层是深拷贝，第二层及以上的是浅拷贝
      let curShopInfo = _.cloneDeep(state.cartData[shopIndex]); //使用loadsh.cloneDeep()是对引用类型进行深拷贝。
      //1.过滤掉仓库中所有good的checked都为true的仓库。
      curShopInfo.wareHouse = curShopInfo.wareHouse.filter(w => {
        return w.goods.findIndex(g => g.checked == false) >= 0;
      });
      //2.过滤掉checked为true的good
      curShopInfo.wareHouse.forEach(w => {
        w.goods = w.goods.filter(g => g.checked == false);
      });

      state.cartData.splice(shopIndex, 1, curShopInfo);
    },
    addRemarkToWareHouse(state, payload) {
      //payload remark id
      let curOrderShop = state.curOrderShop;
      let shopInfoIndex = state.cartData.findIndex(
        shop => shop.shopId == curOrderShop.id
      );
      let newShopInfo = { ...state.cartData[shopInfoIndex] };
      let wareHouse = newShopInfo.wareHouse.find(
        w => w.wareHouseID == payload.id
      );
      wareHouse.remark = payload.remark;
      Vue.set(state.cartData, shopInfoIndex, newShopInfo);
    },
    allSelection(state, payload) {
      console.log('购物车全选或者全不选的函数');
      let shopIndex = state.cartData.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let curShopInfo = { ...state.cartData[shopIndex] };
      curShopInfo.wareHouse.forEach(w => {
        w.checked = payload;
        w.goods.forEach(g => {
          g.checked = payload;
        });
      });
      state.cartData.splice(shopIndex, 1, curShopInfo);
    },
    changeWareHouseChecked(state, payload) {
      console.log('修改WareHouse选中状态');
      let shopIndex = state.cartData.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let curShopInfo = { ...state.cartData[shopIndex] };
      let curWareHouse = curShopInfo.wareHouse.find(
        w => w.wareHouseID == payload.wareHouseID
      );
      console.log('curWareHouse', curWareHouse);
      curWareHouse.checked = payload.checked;
      if (payload.checked) {
        curWareHouse.goods.forEach(good => {
          good.checked = payload.checked;
        });
      } else {
        curWareHouse.goods.forEach(good => {
          good.checked = payload.checked;
        });
      }
      state.cartData.splice(shopIndex, 1, curShopInfo);
    },
    changeGoodsChecked(state, payload) {
      console.log('修改good选中状态');
      let shopIndex = state.cartData.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let curShopInfo = { ...state.cartData[shopIndex] };
      let curWareHouse = curShopInfo.wareHouse.find(
        w => w.wareHouseID == payload.wareHouseID
      );
      console.log('curWareHouse', curWareHouse);
      let curGood = curWareHouse.goods.find(
        good => good.goodsInfo.id == payload.goodID
      );
      // curGood.counts = payload.count;
      // if (parseInt(curGood.counts) > parseInt(curGood.goodsInfo.number)) {
      //   curGood.counts = curGood.goodsInfo.number;
      // }
      curGood.checked = payload.checked;
      if (payload.checked) {
        curWareHouse.checked = true;
      } else {
        let index = curWareHouse.goods.findIndex(good => good.checked == true);
        if (index < 0) {
          curWareHouse.checked = false;
        }
      }
      //直接赋值是不会vue被监听的，所以要用 push splice，vue.set等方式来进行数据的替换。
      state.cartData.splice(shopIndex, 1, curShopInfo);
      // Vue.set(state.cartData, shopIndex, curShopInfo);
    },
    addGoodCount(state, payload) {
      // console.log('addGoodCount payload', payload);
      //接收的是goodID和wareHouseID shopId(curOrderShop) 以及count
      let shopIndex = state.cartData.findIndex(
        shop => shop.shopId == state.curOrderShop.id
      );
      let curShopInfo = { ...state.cartData[shopIndex] };
      let curWareHouse = curShopInfo.wareHouse.find(
        w => w.wareHouseID == payload.wareHouseID
      );
      let curGood = curWareHouse.goods.find(
        good => good.goodsInfo.id == payload.goodID
      );
      curGood.counts = payload.count;
      if (parseInt(curGood.counts) > parseInt(curGood.goodsInfo.number)) {
        curGood.counts = curGood.goodsInfo.number;
      }
      //直接赋值是不会vue被监听的，所以要用 push splice，vue.set等方式来进行数据的替换。
      state.cartData.splice(shopIndex, 1, curShopInfo);
      // Vue.set(state.cartData, shopIndex, curShopInfo);
    },
    clearCart(state) {
      state.cartData = [];
    },
    initCartData(state, payload) {
      console.log(payload);
      //把商品信息处理后加入购物车
      // payload: {
      //   shopId: this.$route.params.id,
      //   wareHouseName: this.wareHouseName,
      //   count: this.counts,
      //   goods: this.goods,
      //   warehouseId: this.goods.warehouseId
      // }
      //1. 判断当前商铺是否在购物车中
      let shopIndex = state.cartData.findIndex(
        item => item.shopId == payload.shopId
      );
      //2. 如果商铺不在购物车中，则新增一条数据到Carts中

      if (shopIndex < 0) {
        console.log('追加一条新的商铺数据到购物车');
        state.cartData.push({
          shopId: payload.shopId,
          shopName: state.curOrderShop.name,
          wareHouse: [
            {
              remark: '',
              wareHouseID: payload.warehouseId,
              wareHouseName: payload.wareHouseName,
              checked: true,
              goods: [
                {
                  goodsInfo: payload.goods,
                  counts: payload.count,
                  checked: true
                }
              ]
            }
          ]
        });
      } else {
        console.log('商铺已经存在,添加仓库和商品');
        let shop = state.cartData[shopIndex];
        //3.判断要添加的商品所在的仓库是否已经在cartData的wareHouse中存在
        let wareHouseIndex = shop.wareHouse.findIndex(
          wareHouse => wareHouse.wareHouseID == payload.warehouseId
        );
        if (wareHouseIndex < 0) {
          console.log('添加商品所在的仓库不存在,需要添加新的仓库');
          shop.wareHouse.push({
            remark: '',
            wareHouseID: payload.warehouseId,
            wareHouseName: payload.wareHouseName,
            checked: true,
            goods: [
              {
                goodsInfo: payload.goods,
                counts: payload.count,
                checked: true
              }
            ]
          });
        } else {
          console.log('添加商品所在的仓库已存在，需要添加商品');
          let wareHouse = shop.wareHouse[wareHouseIndex];
          //4.判断需要添加的商品是否已经在wareHouse中的goods中存在
          let goodIndex = wareHouse.goods.findIndex(
            goods => goods.goodsInfo.id == payload.goods.id
          );
          if (goodIndex < 0) {
            console.log('当前仓库不存在此商品，需要增加商品');
            wareHouse.goods.push({
              goodsInfo: payload.goods,
              counts: payload.count,
              checked: true
            });
          } else {
            console.log('当前仓库已经存在此商品,增加商品数量');
            let newCount = wareHouse.goods[goodIndex].counts + payload.count;
            if (
              parseInt(newCount) >
              parseInt(wareHouse.goods[goodIndex].goodsInfo.number)
            ) {
              newCount = wareHouse.goods[goodIndex].goodsInfo.number;
            }
            /*如果你Vuex设置的对象新增加或者改变属性的数据想要被Vue监控的话，
             *那么就要使用Vue.set()这个Vue全局方法才行和以前的数组需要被监控时的push()方法类似
             */
            Vue.set(wareHouse.goods[goodIndex], 'counts', newCount);
          }
        }
        //把当前仓库中的shop信息重新写入到vuex的state中去。保持数据持续被监听的方式
        console.log('最终形成的数据cartData为:', shop);
        Vue.set(state.cartData, shopIndex, shop);
      }
    },
    initWearHouse(state, payload) {
      state.wearHouse = payload;
    },
    initCurOrderShop(state, payload) {
      state.curOrderShop = payload;
      console.log('initCurOrderShop', state.curOrderShop);
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
    getCurCartData(state) {
      let shopInfo = state.cartData.find(
        shop => shop.shopId == state.curOrderShop.id
      );
      console.log(
        'state.curOrderShop',
        state.curOrderShop.id,
        'shopInfo:',
        shopInfo,
        'cartData',
        state.cartData
      );
      if (!shopInfo) {
        return;
      }
      /*因为要找到checked为true的数据，所以可以在这里进行过滤再添加到后面的SubCart.vue页面上，
       *也可以不进行数据过滤，在SubCart.vue中再使用<template v-if=""></template>来过滤数据。
       *(如果要进行数据过滤来改造数据的话，就必须把shopInfo对象重新深拷贝复制一个新的对象来进行数据修改和调整，
       *调整修改结束后在返回这个数据)
       *以下的操作就是完全体的操作
       */
      let newShopInfo = _.cloneDeep(shopInfo); //深拷贝一个引用类型用来处理数据 使用loadsh插件
      // console.log('getCurCartData newShopInfo', newShopInfo);
      newShopInfo.wareHouse = newShopInfo.wareHouse.filter(w => w.checked);
      newShopInfo.wareHouse.forEach(w => {
        w.goods = w.goods.filter(g => g.checked);
      });
      newShopInfo.wareHouse = newShopInfo.wareHouse.filter(
        w => w.goods.length > 0
      );
      return newShopInfo;
    },
    getRemarkByWareHouseID: state => id => {
      /*****名义上vuex的getters方法是不能传值的，但是vuex的getters方法内部的自己定义的匿名函数是可以传参的。
       * 所以这里改变了函数的书写方式****/
      let curOrderShop = state.curOrderShop;
      let shopInfo = state.cartData.find(
        shop => shop.shopId == curOrderShop.id
      );
      //当传递对象并且要进行修改的时候最好把这个对象重新生成一个对象，否则可能会出现浅拷贝的一系列问题 Object.assign(obj,newobj) ,{...obj};
      // let newShop = { ...shopInfo };//因为这里只是获取这个值，并不是设置这个值，所以不需要重新生成一个新对象来赋值
      let wareHouse = shopInfo.wareHouse.find(w => w.wareHouseID == id);
      return wareHouse.remark;
    },
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
