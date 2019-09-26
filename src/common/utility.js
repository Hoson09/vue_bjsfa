export default {
  /**
   *
   * 将图片的base64url数据转换为Blob数据格式
   * @param {String} urlDate  用url方式表示的base64图片数据
   * @param {Object} type {type:"image/png"}
   */
  convertBase64UrlToBlob(urlData, type) {
    var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为bytes
    //处理异常，将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], type);
  }
};
