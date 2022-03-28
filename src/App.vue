<template>
<v-app id="app">
    <router-view />
</v-app>
</template>

<script>
export default {
  name: "App",
  components: {
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#logo {
  top: 0;
  right: 0;
}
#logo img {
  max-width: 15rem;
  height: 5rem;
  object-fit: contain;
}
.v-pagination__item--active{
  background-color: purple!important;
}
</style>