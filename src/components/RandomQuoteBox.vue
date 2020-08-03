<template>
<div class="test">
    <div class="random">
        <h1>{{quote}}</h1>
        <h3>- {{author}} </h3>    
    </div>
    <deleteTest/>
    <Popup/> 
    <button class="right" v-on:click="newQuote">New Quote</button>
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
        author:"",
        color : ["#222f3e","#5f27cd","#f368e0","#ee5253","#0abde3","#10ac84","#5f27cd"],
        background:"",
        counter:0
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
        this.background= this.color[Math.floor(Math.random()*6)];
        this.$emit('changeBack',this.background);
          
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
</style>