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
      width: 2.7rem;
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
    @click.prevent="handLineLoginBtn"
  >
    <div class="LineBtnWrapper__iconWrapper">
      <div class="LineBtnWrapper__iconWrapper__icon"></div>
    </div>
    <div class="LineBtnWrapper__text">
      用 Line 帳號登入
    </div>

  </a>
  <button @click="getData">getData</button>
</template>


<script>
import { getProfile } from "@/plugin/LineLogin.js";
import { onMounted, reactive, watch } from "vue";
export default {
  setup() {
    const loginData = reactive({ isAuthorized: false, profile: {} });
    const handLineLoginBtn = () => {
      let client_id = "1656213058";
      let redirect_uri = "https://localhost:8080/";
      let link = "https://access.line.me/oauth2/v2.1/authorize?";
      link += "response_type=code";
      link += "&client_id=" + client_id;
      link += "&redirect_uri=" + redirect_uri;
      link += "&state=login";
      link += "&scope=profile%20openid%20email";
      window.location.href = link;
    };
    const getData = () => {
      getProfile((res) => {
        console.log(res);
      });
    };
    const handLineLogoutBtn = () => {};
    return { getData, handLineLoginBtn, handLineLogoutBtn };
  },
};
</script>

