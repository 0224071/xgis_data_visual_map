<template>
  <div class="aside">
    <UploadExcel></UploadExcel>
  </div>

  <div class="content">
    <nav class="nav-page">

      <router-link
        class="nav-page__item"
        :to="{ path: '/example' }"
      >資料</router-link>
      <router-link
        class="nav-page__item"
        :to="{ path: '/example/Chart' }"
        v-show="datalist.length>0"
      >圖表</router-link>
    </nav>
    <div class="content__view">
      <router-view />
    </div>

  </div>

  <Loading :show="isLoading"></Loading>

</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";

import UploadExcel from "@/components/UploadExcel.vue";
import Loading from "@/components/Loading.vue";
export default {
  components: { Loading, UploadExcel },
  setup() {
    const store = useStore();

    return {
      isLoading: computed(() => store.getters["isLoading"]),
      datalist: computed(() => store.getters["chart/datalist"]),
    };
  },
};
</script>

<style lang="scss" scoped>
.aside {
  width: 300px;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 5px;
  border-right: 1px solid #dedede;
  border-top: 1px solid #dedede;
}
.content {
  flex: 1 1 auto;
  width: 0;

  display: flex;
  flex-direction: column;
  border-top: 1px solid #dedede;
  &__view {
    padding: 0.5rem 1rem;
    flex: 1 1 auto;
    height: 0;
  }
}
.nav-page {
  border-bottom: 1px solid #dedede;
  display: flex;
  justify-content: start;
  background-color: #d9d9d9;

  &__item {
    padding: 0.5rem 1rem;
    color: #5e5e5e;
    border-right: 1px solid #bebebe;
    &.router-link-exact-active {
      background: #fbfbfb;
      color: #1e1e1e;
    }
  }
}
</style>