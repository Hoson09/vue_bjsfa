import axios from 'axios';

// 添加请求拦截器，在进行请求前让请求拦截器给请求头header加上前缀token
let axiosIns = axios.interceptors.request.use(
  function(config) {
    let loginToken = sessionStorage.getItem('loginToken');
    // console.log("token", loginToken);
    // 在发送请求之前做些什么
    if (loginToken) {
      config.headers.Authorization = `Bearer ${loginToken}`;
      //   config.headers.Authorization = `${loginToken}`;
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default {
  login(data) {
    return axios.post('/api/login', data);
  },
  loginOut() {
    //退出登录时调用，销毁掉请求拦截器
    axios.interceptors.request.eject(axiosIns);
  },
  setNoticeReaded(id) {
    return axios.post(`/api/auth/notice/${id}`);
  },
  getUserProgress(id) {
    return axios.get('/api/auth/shopSales/' + id);
  },
  getNotices(data, limit, isloaderLater) {
    return axios.get('/api/message', {
      params: {
        data,
        limit,
        isloaderLater
      }
    });
  },
  getShops(data) {
    return axios.get('/api/auth/shop?_limit=10&_order=asc&_sort=distance', {
      params: data
    });
  },
  getShopInfo(id) {
    return axios.get('/api/auth/shopSales/' + id);
  },
  upLoadImg(data) {
    // return axios.post('/api/upload', {
    //   data: data
    // });
    return axios({
      url: '/api/upload',
      method: 'post',
      headers: {
        'Content-type': 'multipart/form-data'
      },
      data: data
    });
  },
  submitSignIn(data) {
    return axios.post('/api/auth/signIn', data);
  },
  //   getSingInData(shopId) {//暂时没有这个接口
  //     return axios.get('/api/auth/signIn/' + shopId);
  //   }
  loadGoods(data) {
    return axios.get('/api/auth/goods', {
      params: data
    });
  }
};
