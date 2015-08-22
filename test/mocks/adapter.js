const mockAdapter = {
  configProps: {},
  config: function (opts) {
    mockAdapter.configProps = opts;
  },
  mockMethod: () => {
    return true;
  }
};

export default mockAdapter;