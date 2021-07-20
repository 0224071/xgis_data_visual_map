
<style lang="scss" scoped>
</style>
<template>
  <div class="container">
    <form
      @submit.prevent="SaveData"
      class="pt-5 text-center"
    >
      <h3 class="4 mb-5">申請帳號</h3>
      <div
        class="form-group"
        v-if="isSocialLogged"
      ><input
          type="text"
          class="form-control"
          placeholder="帳號"
          v-model="user.Username"
          required
        ></div>
      <div
        class="form-group"
        v-if="isSocialLogged"
      ><input
          type="text"
          class="form-control"
          placeholder="密碼"
          v-model="user.Pwd"
          required
        ></div>
      <div class="form-group"><input
          type="text"
          class="form-control"
          placeholder="暱稱"
          v-model="user.Name"
          required
        ></div>
      <div class="form-group"><input
          type="email"
          class="form-control"
          placeholder="email"
          v-model="user.EMAIL"
          required
        ></div>
      <button
        class="btn btn-primary w-100 mt-5"
        type="submit"
      >送出</button>
    </form>
  </div>
</template>

<script>
import { computed, reactive, watch } from "vue";
import { useStore } from "vuex";
import { DBApi } from "@/plugin/DBApi.js";
export default {
  setup() {
    const store = useStore();
    const isSocialLogged = computed(() => store.getters["social/isLogged"]);
    const profile = computed(() => store.getters["social/profile"]);

    const db = new DBApi(process.env.VUE_APP_DB_API+"/");

    const user = reactive({
      Username: "",
      Pwd: "",
      Name: "",
      EMAIL: "",
      Fb_id: "",
      Line_id: "",
      Google_id: "",
    });
    watch(
      profile,
      (newValue) => {
        user.Name = newValue.name;
        user.EMAIL = newValue.email;
        switch (newValue.method) {
          case "facebook":
            user.Fb_id = newValue.userId;
            break;
          case "line":
            user.Line_id = newValue.userId;
            break;
          case "google":
            user.Google_id = newValue.userId;
            break;
          default:
            user.Fb_id = "";
            user.Line_id = "";
            user.Google_id = "";
            break;
        }
      },
      { deep: true }
    );

    const SaveData = () => {
      db.UpdateTable("UserInfo", user, "id", (data) => {
        console.log(data);
      });
    };
    return { user, SaveData, isSocialLogged };
  },
};
</script>
