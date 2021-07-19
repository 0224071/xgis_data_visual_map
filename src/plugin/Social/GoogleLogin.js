let GoogleAuth = null;

export const init = (fn = () => {}) => {
  gapi.load("auth2", function() {
    GoogleAuth = gapi.auth2.init({
      client_id:
        "1069839287420-r4aleha6fq2etmdsm66krsq762vi35ld.apps.googleusercontent.com",
    });

    fn();
  });
};

export const setIsSignedInWatcher = (fn) => {
  GoogleAuth.isSignedIn.listen(fn);
};
export const getProfile = () => {
  return GoogleAuth.currentUser.get();
};
export const login = () => {
  GoogleAuth.signIn({
    scope: "profile email",
  });
};
export const logout = () => {
  GoogleAuth.signOut();
};
