import store from "@/store";

export const setIsAuthorized = (value) => {
  store.dispatch("social/setIsAuthorized", value);
};
export const setProfile = (value) => {
  store.dispatch("social/setProfile", value);
};
export const getSocialData = (method) => {
  return store.getters["social/" + method];
};
