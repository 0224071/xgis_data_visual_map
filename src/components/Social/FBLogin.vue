<style lang="scss" scoped>
.fbBtnWrapper {
  background-color: #164675;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  color: #fff;
  text-decoration: none;

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
    class="fbBtnWrapper"
    v-if="!loginData.isAuthorized"
    href="#"
    @click.prevent="handFBLoginBtn"
  >
    <div class="fbBtnWrapper__iconWrapper">
      <i class="fab fa-facebook fbBtnWrapper__iconWrapper__icon"></i>
    </div>
    <div class="fbBtnWrapper__text">
      用 Facebook 帳號登入
    </div>

  </a>
  <a
    class="fbBtnWrapper"
    v-else
    href="#"
    @click.prevent="handFBLogoutBtn"
  >
    <div class="fbBtnWrapper__iconWrapper">
      <i class="fab fa-facebook fbBtnWrapper__iconWrapper__icon"></i>
    </div>
    <div class="fbBtnWrapper__text">
      登出 Facebook 帳號
    </div>

  </a>
</template>

<script>
import {
  init,
  getProfile,
  getLoginStatus,
  login,
  logout,
} from "@/plugin/FBLogin.js";

import { onMounted, reactive, watch } from "vue";
export default {
  setup() {
    const loginData = reactive({ isAuthorized: false, profile: {} });

    const setLoginData = () => {
      //獲取認證訊息
      getLoginStatus((res) => {
        if (res.status === "connected") {
          //已登入已認證，並取得使用者資料
          loginData.isAuthorized = true;
          getProfile((res) => {
            loginData.profile = res;
          });
        } else if (res.status === "not_authorized") {
          //未登入已認證
          loginData.isAuthorized = false;
        } else {
          //未登入未認證
          loginData.isAuthorized = false;
        }
      });
    };
    onMounted(() => {
      window.fbAsyncInit = function () {
        //1.初始化
        init();
        //2.設定登入資訊
        setLoginData();
      };
    });
    watch(
      loginData,
      () => {
        console.log(loginData);
      },
      { deep: true }
    );
    const handFBLoginBtn = () => {
      login(() => {
        setLoginData();
      });
    };
    const handFBLogoutBtn = () => {
      logout(() => {
        setLoginData();
      });
    };
    return { loginData, handFBLoginBtn, handFBLogoutBtn };
  },
};
</script>

