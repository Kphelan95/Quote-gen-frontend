<template>
<body :style="{ 'background-color': background }">
  <div id="app" >
    <randomQuote v-on:changeBack="test($event)" />
  </div>
</body>
</template>

<script>
import RandomQuote from './components/RandomQuoteBox.vue'

export default {
  name: 'App',
  components: {
    RandomQuote
  },
   data: function () {
     return{
       background:"",
     }
  },
  methods:{
     test : function(updatedColor){
        this.background = updatedColor;  
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
  padding-top: 20%;
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
  
}
</style>
