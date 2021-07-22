import { VueCookieNext } from "vue-cookie-next";

export const login = (fn = () => {}) => {
  window.location.href = process.env.VUE_APP_Line_Login_API;
};
export const logout = (fn = () => {}) => {
  fetch(process.env.VUE_APP_Line_Logout_API).then(fn);
};

export const getProfile = async () => {
 
  const result = await fetch(process.env.VUE_APP_Line_Profile_API).then((res) =>
    res.json()
  );
  return result;
};
