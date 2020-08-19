<template>
  <v-app :style="{ 'background-color': background }">
   <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {
  },
   data: function () {
     return{
       background:"",
     }
  },
  computed: {
     ...mapState(['color'])
  },
  mounted(){
      this.newColor();
  },
  methods:{
     test : function(updatedColor){
        this.background = updatedColor;  
     },
     newColor(){
       let holder=Math.floor(Math.random()*this.color.length);
       this.background=this.color[holder]
     }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 20%; /* this is whats causeing my problem */
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
</style>
