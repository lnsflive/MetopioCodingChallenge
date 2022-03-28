<template>
<v-container class="placeCenter">
     <v-card class="pa-6">
        <h1>Page Not Found</h1>
        <v-card-subtitle>{{this.$route.params.id}}</v-card-subtitle>
        <router-link to="/">Go Back Home</router-link>
     </v-card>
</v-container>
</template>

<script>
export default {
    name: "PageNotFound"
}
</script>

<style>
.placeCenter{
    display: grid;
    place-items: center;
    height: 100vh;
}
</style>