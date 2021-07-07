<style lang="scss" scoped>
.iconList {
  display: flex;
  list-style: none;
  justify-content: center;
  align-items: center;

  li {
    margin-right: 20px;
    margin-left: 20px;
  }
}
</style>
<template>
  <div class="home">
    <ul class="iconList">
      <li> <img
          alt="Vue logo"
          src="../assets/logo.png"
          width="150"
        >
      </li>
      <li> <img
          alt="Echart logo"
          src="../assets/logo2.png"
          height="80"
        ></li>
    </ul>
    <Index msg="Vue & Echart " />
  </div>
</template>

<script>
import Index from "@/components/Index.vue";

export default {
  name: "Home",
  components: {
    Index,
  },
};
</script>
