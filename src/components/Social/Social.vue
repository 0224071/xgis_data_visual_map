
<style lang="scss" scoped>
.user {
  padding: 8px 10px;
  display: flex;
  .photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    margin-right: 1rem;
  }
  .textWrapper {
    text-align: left;
    .title {
      color: #000000;
      font-weight: 700;
    }
    .subTtitle {
      font-size: 12px;
      color: #555555;
    }
  }
}
</style>
<template>
  <div>
    <FBLogin class="mb-2"></FBLogin>
    <LineLogin class="mb-2"></LineLogin>
    <GoogleLogin></GoogleLogin>
    <div
      class="user"
      v-if="isLogin"
    >
      <div
        class="photo"
        :style="[bgImage]"
      ></div>
      <div class="textWrapper">
        <div class="title">{{profile.name}}</div>
        <div class="subTitle">{{profile.email}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import FBLogin from "@/components/Social/FBLogin.vue";
import LineLogin from "@/components/Social/LineLogin.vue";
import GoogleLogin from "@/components/Social/GoogleLogin.vue";
import { useStore } from "vuex";
import { computed, watch } from "vue";
import { DBApi } from "@/plugin/DBApi.js";
export default {
  name: "Social",
  components: {
    FBLogin,
    LineLogin,
    GoogleLogin,
  },
  setup() {
    const store = useStore();

    const profile = computed(() => store.getters["social/profile"]);
    const isLogin = computed(() => profile.value.message !== "未登入");
    const bgImage = computed(() => {
      if (isLogin.value)
        return `background-image:url("${profile.value.photo}")`;
      else {
        return `background-color:#000000`;
      }
    });
    const db = new DBApi(process.env.VUE_APP_DB_API + "/");
    watch(isLogin, (newValue) => {
      if (newValue) {
        let filter = "1=1";

        switch (profile.value.method) {
          case "facebook":
            filter = `Fb_id='${profile.value.userId}'`;
            break;
          case "line":
            filter = `Line_id='${profile.value.userId}'`;
            break;
          case "google":
            console.log(filter);
            filter = `Google_id='${profile.value.userId}'`;
            break;
          default:
            break;
        }
        db.SelectTable("UserInfo", filter, (data) => {
          console.log(data);
        });
      }
    });
    return { profile, isLogin, bgImage };
  },
};
</script>
