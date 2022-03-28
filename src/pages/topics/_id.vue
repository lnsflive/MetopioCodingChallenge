<template>
    <v-container class="wrapper" fluid>
        <router-link to="/" class="mb-4">Back to Search</router-link>
        <table>
            <th colspan="2">Topic Details</th>
            <tbody>
                <tr>
                    <td>Name:</td>
                    <td>{{topic.name}}</td>
                </tr>
                <tr>
                    <td>Key:</td>
                    <td>{{topic.key}}</td>
                </tr>
                <tr>
                    <td>Description:</td>
                    <td>{{topic.description}}</td>
                </tr>
                <tr>
                    <td>Units:</td>
                    <td>{{topic.units}}</td>
                </tr>
                
            </tbody>
        </table>
    </v-container>
</template>
<script>
const axios = require('axios')
export default {
    name: "Topics",
    data: ()=>({
        topic: []
    }),
    mounted(){
        const fetchTopic = async() =>{
            try{
                const response = await axios.get('/api/v1/topics/' + this.$route.params.id);
                this.topic = response.data
            }catch(err){
                this.$router.push("/error/" + err)
            }
        }
        fetchTopic();
    }
}
</script>

<style scoped>
.wrapper{
    height: 100vh;
    display: grid;
    place-content: center;
    padding: 4em;
}
table{
    min-width: 600px;
}
tr,td,th{
    border: 1px solid black;
    font-size: 2rem;
    padding: 1rem;
    border-radius: 10px;
}
th{
    background-color: #323a45;
    color:white;
}
td:nth-child(1){
    background-color: #41b6e6;
    color:white;
}
td:nth-child(2){
    background-color: white;
    color:black;
}
</style>