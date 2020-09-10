<template>
  <v-app :style="{ 'background-color': background }">

  <v-navigation-drawer v-model="drawer" app clipped color=#e3e3e3>
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
        { icon: 'mdi-home', text: 'Home', url:'/' },
        { icon: 'mdi-view-dashboard', text: 'Manage Quotes', url:'/manageQuote' },
        { icon: 'mdi-help-box', text: 'About', url:'/about' },
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
     newColor(){
       let randomNum=Math.floor(Math.random()*this.color.length);
       if(this.background===this.color[randomNum]){
         this.newColor();
       }else{
         this.background=this.color[randomNum];
       }
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
