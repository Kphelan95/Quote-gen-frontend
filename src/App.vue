<template>
  <v-app :style="{ 'background-color': background }">

  <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link :to="item.url">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content >
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="gray" :style="{ 'color': background }" dense >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Quote Generater</span>
      </v-toolbar-title>
    </v-app-bar>

    <div class="vertical-center">
      <router-view v-on:changeBack="newColor()"></router-view>
    </div>
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
       drawer: null,
       items: [
        { icon: 'mdi-youtube-subscription', text: 'Home', url:'/' },
        { icon: 'mdi-trending-up', text: 'manage quotes', url:'/manageQuote' },
      ]
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
       let randomNum=Math.floor(Math.random()*this.color.length);
       this.background=this.color[randomNum];
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
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}
.vertical-center {
  display:flex;
  align-items:center;
}
</style>
