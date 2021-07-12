<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      基於 vue 和 echart 建立的數據可視化地圖 <a
        :href="publicPath+'file/covidtable_taiwan_cdc6.xlsx'"
        download
      >下載範本</a>
    </p>
    <ul>
      <li>
        <router-link to="/example">Start</router-link>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return { publicPath: __webpack_public_path__ };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
