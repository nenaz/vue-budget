// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fs = require('fs');

module.exports = {
  publicPath: process.env.VUE_APP_BASE_PATH,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_colors.scss";',
      },
    },
  },
  // devServer: {
  //   https: {
  //     key: fs.readFileSync('./src/certsFiles/private.key', 'utf8'),
  //     cert: fs.readFileSync('./src/certsFiles/cert.crt', 'utf8'),
  //   },
  //   // https: true,
  //   public: 'https://localhost:8080/',
  // },
};
