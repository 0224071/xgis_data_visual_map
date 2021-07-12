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
    },
  },
};
