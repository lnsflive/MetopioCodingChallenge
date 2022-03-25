<template>
  <div id="app">
    <div id="logo">
      <img alt="Metopio logo" src="./assets/brand.png" />
    </div>
    <TopicsDictionary />
  </div>
</template>

<script>
import TopicsDictionary from "./components/TopicsDictionary.vue";

export default {
  name: "App",
  components: {
    TopicsDictionary,
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
</style>
