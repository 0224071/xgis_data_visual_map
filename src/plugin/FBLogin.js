(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

export const init = () => {
  FB.init({
    appId: "4388194917898051",
    cookie: true,
    xfbml: true,
    version: "v11.0",
  });
  FB.AppEvents.logPageView();
};
export const getLoginStatus = (fn = () => {}) => {
  FB.getLoginStatus(fn);
};
export const getProfile = (fn = () => {}) => {
  FB.api("/me?fields=name,id,email", fn);
};
export const login = (fn = () => {}) => {
  FB.login(fn);
};
export const logout = (fn = () => {}) => {
  FB.logout(fn);
};
