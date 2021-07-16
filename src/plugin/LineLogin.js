export const login = (fn = () => {}) => {
  let client_id = "1656213058";
  let redirect_uri = "https://localhost:8080/";
  let link = "https://access.line.me/oauth2/v2.1/authorize";

  link += "response_type=code";
  link += "&client_id=" + client_id;
  link += "&redirect_uri=" + redirect_uri;
  link += "&state=login";
  link += "&scope=openid%20profile";
  window.location.href = link;
};
export const getProfile = (fn = () => {}) => {
  //   fetch("https://api.line.me/v2/profile",fn);
  fetch("https://api.line.me/v2/token", {
    method: "POST",

    body: JSON.stringify({
      grant_type: "authorization_code",
      code: "x41HIYoBu79qjMmnw9UM",
      redirect_uri: "https://localhost:8080/",
      client_id: "1656213058",
      client_secret: "64a19b8d732404e930aec37f77f33eab",
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  }).then(fn);
};
