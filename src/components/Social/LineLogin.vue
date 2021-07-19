<style lang="scss" scoped>
$base-color: #00c300;
$hover-color: #00e000;
$active-color: #00b300;
$disabled-color: #c6c6c6;
$font-color: #ffffff;

.LineBtnWrapper {
  background-color: $base-color;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  text-decoration: none;

  &__iconWrapper {
    padding: 0.5rem 0.3rem;
    &__icon {
      text-decoration: none;
      width: 2.8rem;
      height: 2.4rem;
      background-image: url("../../assets/btn_base.png");
      background-size: cover;
      background-position: center;
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
    class="LineBtnWrapper"
    href="#"
    v-if="!social.isAuthorized"
    @click.prevent="handLineLoginBtn"
  >
    <div class="LineBtnWrapper__iconWrapper">
      <div class="LineBtnWrapper__iconWrapper__icon"></div>
    </div>
    <div class="LineBtnWrapper__text">
      用 Line 帳號登入
    </div>

  </a>
  <a
    class="LineBtnWrapper"
    href="#"
    v-else
    @click.prevent="handLineLogoutBtn"
  >
    <div class="LineBtnWrapper__iconWrapper">
      <div class="LineBtnWrapper__iconWrapper__icon"></div>
    </div>
    <div class="LineBtnWrapper__text">
      登出 Line 帳號
    </div>

  </a>
</template>


<script>
import { getProfile, login, logout } from "@/plugin/Social/LineLogin.js";
import {
  setIsAuthorized,
  setProfile,
  getSocialData,
} from "@/plugin/Social/index.js";
import { onMounted, computed } from "vue";

export default {
  setup() {
    const social = computed(() => getSocialData("line"));
    const updateLineAuthorized = (value) => {
      setIsAuthorized({
        isAuthorized: value,
        method: "line",
      });
    };
    const updateLineProfile = (value) => {
      setProfile({
        ...value,
        method: "line",
      });
    };

    onMounted(async () => {
      let result = await getProfile();

      if (result.userId) {
        //access_token 有效

        updateLineAuthorized(true);
        updateLineProfile(result);
      } else if (result.message === "invalid token") {
        //access_token 無效
        updateLineAuthorized(false);
        updateLineProfile({});
      } else {
        //登入失敗
        updateLineAuthorized(false);
        updateLineProfile({});
      }
    });

    const handLineLoginBtn = () => {
      login();
    };
    const handLineLogoutBtn = () => {
      logout(() => {
        updateLineAuthorized(false);
        updateLineProfile({});
      });
    };
    return { social, handLineLoginBtn, handLineLogoutBtn };
  },
};
</script>

