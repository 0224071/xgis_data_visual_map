<style lang="scss" scoped>
.googleBtnWrapper {
  background-color: #ffffff;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  color: #000000;
  text-decoration: none;
  border: 1px solid #cccccc;

  &__iconWrapper {
    padding: 0.75rem 0.8rem;
    &__icon {
      font-size: 1.8rem;
    }
  }

  &__text {
    font-size: 1.2rem;
    padding: 0.75rem 0.8rem;
    flex: 1 1 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
<template>

  <a
    class="googleBtnWrapper"
    href="#"
    v-if="!social.isAuthorized"
    @click.prevent="handGoogleLoginBtn"
  >
    <div class="googleBtnWrapper__iconWrapper">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="28px"
        height="28px"
        viewBox="0 0 48 48"
        class="abcRioButtonSvg"
      >
        <g>
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          ></path>
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          ></path>
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          ></path>
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          ></path>
          <path
            fill="none"
            d="M0 0h48v48H0z"
          ></path>
        </g>
      </svg>
    </div>
    <div class="googleBtnWrapper__text">
      用 Google 帳號登入
    </div>

  </a>
  <a
    class="googleBtnWrapper"
    href="#"
    v-else
    @click.prevent="handGoogleLogoutBtn"
  >
    <div class="googleBtnWrapper__iconWrapper">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="28px"
        height="28px"
        viewBox="0 0 48 48"
        class="abcRioButtonSvg"
      >
        <g>
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          ></path>
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          ></path>
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          ></path>
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          ></path>
          <path
            fill="none"
            d="M0 0h48v48H0z"
          ></path>
        </g>
      </svg>
    </div>
    <div class="googleBtnWrapper__text">
      登出 Google 帳號
    </div>

  </a>
</template>

<script>
import {
  init,
  login,
  logout,
  setIsSignedInWatcher,
  getProfile,
} from "@/plugin/Social/GoogleLogin.js";
import {
  setIsAuthorized,
  setProfile,
  getSocialData,
} from "@/plugin/Social/index.js";
import { onMounted, computed } from "vue";

export default {
  setup() {
    const social = computed(() => getSocialData("google"));

    const updateGoogleAuthorized = (value) => {
      setIsAuthorized({
        isAuthorized: value,
        method: "google",
      });
    };
    const updateGoogleProfile = (value) => {
      if (!value.Aa || !value.dt) {
        return setProfile({ method: "google" });
      }

      setProfile({
        name: value.dt.uU + value.dt.qS,
        photo: value.dt.DJ,
        email: value.dt.Nt,
        userId: value.Aa,
        method: "google",
      });
    };
    const isSignedinChange = (isSignedin) => {
      if (isSignedin) {
        const user = getProfile();
        updateGoogleAuthorized(true);
        updateGoogleProfile(user);
      } else {
        updateGoogleAuthorized(false);
        updateGoogleProfile({});
      }
    };
    onMounted(() => {
      init(() => {
        setIsSignedInWatcher(isSignedinChange);
      });
    });

    const handGoogleLoginBtn = () => {
      login();
    };
    const handGoogleLogoutBtn = () => {
      logout();

      updateGoogleAuthorized(false);
      updateGoogleProfile({});
    };
    return { social, handGoogleLoginBtn, handGoogleLogoutBtn };
  },
};
</script>

