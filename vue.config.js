module.exports = {
  publicPath: process.env.VUE_APP_BASE_PATH,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_colors.scss";',
      },
    },
  },
};
