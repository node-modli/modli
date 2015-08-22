export default {
  configProps: {},
  config: function (opts) {
    this.configProps = opts;
  },
  mockMethod: () => {
    return true;
  }
};