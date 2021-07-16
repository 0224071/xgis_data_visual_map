const app = require("express")();
const async = require("async");

const lineUtil = require("./lib/lineUtil");

require("dotenv").config();

// Line Login
app.use("/line/login", (req, res, next) => {
  // 首次登入要求取得權限
  res.location(
    `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.LINE_LOGIN_CHANNEL_ID}&redirect_uri=${process.env.LINE_LOGIN_CALLBACK_URL}&state=abcde&scope=openid%20profile%20email`
  );
  res.sendStatus(302);
});

// Line Login Success and callback
app.use("/login/callback", (req, res, next) => {
  async.waterfall(
    [
      function(callback) {
        // Line 登入成功取得 access_token
        lineUtil.getLineToken(req.query.code).then((result) => {
          callback(null, result.access_token, result.id_token);
        });
      },
      function(accessToken, idToken, callback) {
        // 使用 accessToken 取得 Line 的 userId

        lineUtil.getLineProfile(accessToken).then((result) => {
          // 取得 profile Line 帳戶資訊

          callback(null, idToken, result);
        });
      },
      function(idToken, profile, callback) {
        lineUtil.getLineVerify(idToken).then((result) => {
          callback(null, result);
        });
      },
    ],
    function(err, result) {
      res.send(result);
    }
  );
});
// 登出
app.use("/logout", (req, res, next) => {
  const accessToken = req.query.accessToken;
  lineUtil.Logout(accessToken).then((result) => {
    // 撤銷令牌

    res.send(result);
  });
});

// 檢查accessToken是否有效
app.use("/profile", (req, res, next) => {
  const accessToken = req.query.accessToken;
  lineUtil.getLineProfile(accessToken).then((result) => {
    // 取得 profile Line 帳戶資訊

    res.send(result);
  });
});
app.listen(process.env.PORT || 5050, () => {
  console.log(process.env.PORT || 5050);
});
