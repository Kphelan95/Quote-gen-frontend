import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        quotes:"its gonna be a long day",
        quoteHolder : [
          { quote: 'Life is what happens when you\'re busy making other plans', author:"John Lennon" },
          { quote: 'The way to get started is to quit talking and begin doing.', author:"Walt Disney" },
          { quote: 'If life were predictable it would cease to be life, and be without flavor', author:"Eleanor Roosevelt" },
          { quote: 'If you look at what you have in life, you\'ll always have more. If you look at what you don\'t have in life, you\'ll never have enough.', author:"Oprah Winfrey" },
          { quote: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.', author:"Mother Teresa" },
          { quote: 'When you reach the end of your rope, tie a knot in it and hang on.', author:"Franklin D. Roosevelt" }
        ],
        quotesFromDB:[{test : "1"}],
    },
    mutations: {
        change(state, quotes) {
          state.quotes = quotes;
        },
        LOAD_QUOTE(state, quotesFromDB) {
            state.quotesFromDB = quotesFromDB;// here i need to add on to
            console.log(quotesFromDB);
        },
        DELETE_QUOTE(state, id){
          let index = state.quotesFromDB.findIndex(c => c._id == id);
          state.quotesFromDB.splice(index, 1);
        }

    },
    getters: {
        quote: state => state.quotes,
        quoteHolderVX: state => state.quoteHolder
      },
    actions: {
        loadQuotes({commit}) {
          const request = new Request('http://localhost:3000/quotes', {method: 'GET', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'} });
          fetch(request)
          .then(result =>{return result.json()})
          .then(data =>{commit('LOAD_QUOTE', data)})
          .catch(error => {throw new Error(`API ${error}`)})
        },
        deleteQuote({commit},id) {//need to add part to remove it from store, look to use the {commit}
          console.log(id);
          const request = new Request('http://localhost:3000/quotes/'+id, {method: 'DELETE', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'} });
          fetch(request)
          .then(result =>{ return(result.json()),commit('DELETE_QUOTE', id)})
          .catch(error => {throw new Error(`API ${error}`)})
        }
      }
});