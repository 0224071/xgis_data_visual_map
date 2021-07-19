const fs = require("fs");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/xgis_data_visual_map/" : "/",
  devServer: {
    proxy: {
      "/SearchAddress": {
        // 自訂 local 端的位置
        target: "https://ysong.com.tw/fgis_api/api/map/SearchAddress", // 遠端 URL Domain
        changeOrigin: true,
        pathRewrite: {
          "^/SearchAddress": "",
        },
      },
      "/api/db": {
        target: "https://ysong.com.tw/XDBManager/api/db",
        changeOrigin: true,
        pathRewrite: {
          "^/api/db": "",
        },
      },
    },
    https: true,
    key: fs.readFileSync(`${__dirname}/src/assets/localhost-key.pem`),
    cert: fs.readFileSync(`${__dirname}/src/assets/localhost.pem`),
    host: "localhost",
    port: 8080,
  },
};
