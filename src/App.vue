<template>

  <div class="wrapper">
    <Navbar></Navbar>
    <div class="main">
      <router-view />
    </div>

  </div>
  <Modal v-model="isShowSocialModal">
     <Social style="width:340px;margin:0 auto;"></Social>
  </Modal>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Modal from "@/components/Modal.vue";
import Social from "@/components/Social/Social.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    Navbar,
    Modal,
    Social
  },
  setup() {
    const store = useStore();
    const isShowSocialModal = computed({
      get() {
        return store.getters["isShowSocialModal"];
      },
      set(value) {
        store.dispatch("setIsShowSocialModal", value);
      },
    });

    return { isShowSocialModal };
  },
};
</script>
<style lang="scss" >
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.main {
  flex: 1 1 auto;
  display: flex;
  height: 0;
  margin-top: 0.5rem;
}
</style>
