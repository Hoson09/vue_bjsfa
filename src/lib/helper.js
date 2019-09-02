export default {
  getTypes(instence) {
    return Object.prototype.toString.call(instence).slice(8, -1);
  }
};
