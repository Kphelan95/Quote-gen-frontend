<template>
<div class="test">
    <v-card class="mx-auto">
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline">{{quote}}</v-list-item-title>
                <v-list-item-subtitle>- {{author}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
    <deleteTest/>
    <Popup/> 
    <v-btn color="primary" dark v-on:click="newQuote">New Quote</v-btn>
    <v-btn color="primary" to="/manageQuote" >click me</v-btn>
</div>
</template>


<script>
import { mapState } from 'vuex';
import Popup from './Popup'
import DeleteTest from './DeleteTest'

export default {
  name: 'randomQuote',
  props: {},
  components: {
      Popup,
      DeleteTest
  },
  data : function (){
      return{
          quoteHolder : [
            { quote: 'Life is what happens when you\'re busy making other plans', author:"John Lennon" },
            { quote: 'The way to get started is to quit talking and begin doing.', author:"Walt Disney" },
            { quote: 'If life were predictable it would cease to be life, and be without flavor', author:"Eleanor Roosevelt" },
            { quote: 'If you look at what you have in life, you\'ll always have more. If you look at what you don\'t have in life, you\'ll never have enough.', author:"Oprah Winfrey" },
            { quote: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.', author:"Mother Teresa" },
            { quote: 'When you reach the end of your rope, tie a knot in it and hang on.', author:"Franklin D. Roosevelt" }
        ],
        quote:"",
        author:""
      }
    },
  mounted(){
      this.newQuote();
      this.$store.dispatch('loadQuotes');// this will add to the store when the compent is loaded
  },
  computed: {
     ...mapState(['quotesFromDB'])
  },
  methods:{
      //sets the current quoteand emits upthe background color
      newQuote : function(){
        let holder=Math.floor(Math.random()*this.quotesFromDB.length);
        if(this.quotesFromDB.length!=1){ 
            this.quote =this.quotesFromDB[holder].quote;
            this.author=this.quotesFromDB[holder].author;
        }else{
            console.log(this.quotesFromDB.length);
            this.quote =this.quoteHolder[holder].quote;
            this.author=this.quoteHolder[holder].author;
        }
        this.$emit('changeBack');
        this.$store.dispatch('loadQuotes');
          //console.log(this.$store.getters.quoteHolderVX[0]);
      }
  }
}
</script>


<style scoped>
    .random{
        background-color: white;
        padding: 0;
        margin: 0;
    }
    .test{
        padding-left: 25%;
        padding-right: 25%;
    }
    .left{
        float: left;
        background-color: gray; /* Green */
        border: none;
        color: black;
        padding: 15px 32px;
        margin-right: 15px;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
    }
    .right{
        float: right;
        background-color: gray; /* Green */
        border: none;
        color: black;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
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

</style>