<template>
  <div id="nav">
    <router-link to="/">首頁</router-link> |
    <router-link to="/example">範例</router-link>
  </div>
  <router-view />
</template>

<style lang="scss" scoped>
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px;
  border-bottom: 1px solid #2c3e50;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
