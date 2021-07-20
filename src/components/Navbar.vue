<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-custom">
    <a
      class="navbar-brand"
      href="#"
    >XGIS</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div
      class="collapse navbar-collapse"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">

          <router-link
            to="/"
            class="nav-link"
            exact-active-class="active"
          >
            首頁
          </router-link>

        </li>
        <li class="nav-item">
          <router-link
            to="/example"
            class="nav-link"
            exact-active-class="active"
          >
            範例
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav text-center">
        <li class="nav-item">
          <a
            href="#"
            class="btn btn-dark w-100"
            @click.prevent="showSocialModal"
          >登入</a>

        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const showSocialModal = () => {
      store.dispatch("setIsShowSocialModal", true);
    };
    
    const route = useRoute();
    return { showSocialModal };
  },
};
</script>

<style lang="scss" scoped>
.bg-custom {
  background-color: #42b983;
}
.navbar-nav {
  &.router-link-active {
    color: #42b983;
  }
}
</style>