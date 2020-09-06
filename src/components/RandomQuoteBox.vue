<template>
<div class="center">
    <v-card class="mx-auto">
        <div class="border">
            <v-list-item>
                <v-list-item-content>    
                    <v-list-item-title class="headline">{{quote}}</v-list-item-title>
                    <v-list-item-subtitle>- {{author}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </div>
    </v-card>
    <Popup screen="home" class="ma-5"/> 
    <v-btn class="ma-5" color="primary" dark v-on:click="newQuote">new quote</v-btn>
</div>
</template>


<script>
import { mapState } from 'vuex';
import Popup from './Popup'

export default {
  name: 'randomQuote',
  props: {},
  components: {
      Popup
  },
  data : function (){
      return{
        quote:"",
        author:""
      }
    },
  mounted(){
      this.newQuote();
      this.$store.dispatch('loadQuotes');
  },
  computed: {
     ...mapState(['quotesFromDB'])
  },
  methods:{
      newQuote : function(){
        let holder=Math.floor(Math.random()*this.$store.state.quotesFromDB.length);
        if(this.quotesFromDB.length!=1){ 
            this.quote =this.quotesFromDB[holder].quote;
            this.author=this.quotesFromDB[holder].author;
        }else{
            this.quote =this.$store.state.quoteHolder[holder].quote;
            this.author=this.$store.state.quoteHolder[holder].author;
        }
        this.$emit('changeBack');
        this.$store.dispatch('loadQuotes');
      }
  }
}
</script>


<style scoped>
    .center{
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
    .v-application .headline {
        font-size: 2rem !important;
        font-weight: 400;
        line-height: 2.5rem;
        letter-spacing: normal !important;
        font-family: "Roboto", sans-serif !important;
    }
    .v-list-item__title[data-v-019cb0c2], .v-list-item__subtitle[data-v-019cb0c2] {
        flex: 1 1 100%;
        text-overflow: ellipsis;
        white-space: normal;
    }
    .v-application .border{
        border: black;
        border-style: solid;
        min-width: 500px;
    }

</style>