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
        color : ["#222f3e","#5f27cd","#f368e0","#ee5253","#0abde3","#10ac84","#5f27cd"]
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
        },
        UPDATE_QUOTE(state, obj){
          let index = state.quotesFromDB.findIndex(c => c._id == obj.id);
          state.quotesFromDB[index].quote=obj.updatedQuote;
          state.quotesFromDB[index].author=obj.updatedAuthor;
          console.log(obj);
        },
        ADD_QUOTE(state,obj){
          console.log(obj);
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
        deleteQuote({commit},id) {
          const request = new Request('http://localhost:3000/quotes/'+id, {method: 'DELETE', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'} });
          fetch(request)
          .then(result =>{ return(result.json()),commit('DELETE_QUOTE', id)})
          .catch(error => {throw new Error(`API ${error}`)})
        },
        updateQuote({commit},updatedOBJ){
          console.log(updatedOBJ);
          const data = {"quote": updatedOBJ.updatedQuote ,"author": updatedOBJ.updatedAuthor};
          const request = new Request('http://localhost:3000/quotes/'+updatedOBJ.id, {method: 'PATCH', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'},body: JSON.stringify(data) });
          fetch(request)
          .then(result =>{ return(result.json()),commit('UPDATE_QUOTE', updatedOBJ)})
          .catch(error => {console.log(error)})
          //.catch(error => {throw new Error(`API ${error}`)})
        },
        addQuote({commit},newQuote){
          const data = {"quote": newQuote.quote,"author": newQuote.author};
          return new Promise((resolve, reject) => {
            const request = new Request('http://localhost:3000/quotes', {method: 'POST', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'},body: JSON.stringify(data) });
            fetch(request)
            .then(result =>{ return(result.json()),commit('ADD_QUOTE', newQuote),resolve(result)})
            .catch(error => {console.log(error),reject(error)});
          })
        }
      }
});