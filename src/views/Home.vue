<style lang="scss" scoped>
.home {
  text-align: center;
  width: 100%;
}
img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
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

    <Social style="width:340px;margin:0 auto;"></Social>

  </div>
</template>

<script>
import Index from "@/components/Index.vue";
import Social from "@/components/Social/Social.vue";

export default {
  name: "Home",
  components: {
    Index,
    Social,
  },
};
</script>
