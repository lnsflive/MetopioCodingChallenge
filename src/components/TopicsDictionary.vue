
<template>
  <div id="table-container">
    <h1>Topics Dictionary</h1>
    <p>
      Visit
      <a
        href="https://chicagohealthatlas.org/api/v1/"
        title="Chicago Health Atlas API page"
        target="_blank"
        rel="noopener noreferrer"
        >chicagohealthatlas.org/api/v1/</a
      >
      to learn more about Chicago Health Atlas API
    </p>
    <InteractiveTable />
  </div>
</template>

<script>
// Please read the INSTRUCTIONS.md file
import InteractiveTable from "./InteractiveTable.vue";
export default {
  name: "TopicsDictionary",
  components:{
    InteractiveTable,
  }
};
</script>

<style scoped>
#table-container {
  text-align: center;
  margin: 2rem;
}
</style>
