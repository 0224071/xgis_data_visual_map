<template>
  <div class="wrapper">
    <div class="nav-menu">
      <router-link to="/">首頁</router-link> |
      <router-link to="/example">範例</router-link>
    </div>
    <div class="main">
      <router-view />
    </div>

  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
}
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.nav-menu {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 30px;
  border-bottom: 1px solid #dedede;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-active {
      color: #42b983;
    }
  }
}
.main {
  flex: 1 1 auto;
  display: flex;
  height: 0;
}
</style>
