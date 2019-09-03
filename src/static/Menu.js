let menuList = [
  {
    menuname: "公司通告",
    imgurl: require("@/assets/img/gstg.png"), //这样引入模块的方式如果内存比较小的话可以被webpack压缩为base64.@代表/src.
    url: "/notice"
  },
  {
    menuname: "进店拜访",
    imgurl: require("@/assets/img/jdbf.png"),
    url: "/visitshop"
  },
  {
    menuname: "电话订单",
    imgurl: require("@/assets/img/dhdd.png"),
    url: "/phoneorder"
  },
  {
    menuname: "订单状态",
    imgurl: require("@/assets/img/ddzt.png"),
    url: "/orders"
  },
  {
    menuname: "培训资料",
    imgurl: require("@/assets/img/pxzl.png"),
    url: "/traning"
  },
  {
    menuname: "消息中心",
    imgurl: require("@/assets/img/xxzx.png"),
    url: "/message"
  },
  {
    menuname: "新增门店",
    imgurl: require("@/assets/img/xzmd.png"),
    url: "/addedshop"
  },
  {
    menuname: "同步数据",
    imgurl: require("@/assets/img/sjtb.png"),
    url: "/asyncdata"
  }
];
export default menuList;
