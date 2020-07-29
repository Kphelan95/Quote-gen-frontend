import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        quotes:"its gonna be a long day",
        quoteHolder : [
            { quote: 'Life is what happens when you\'re busy making other plans', author:"John Lennon" },
            { quote: 'The way to get started is to quit talking and begin doing.', author:"Walt Disney" },
            { quote: 'Your time is limited, so don\'t waste it living someone else\'s life. Don\'t be trapped by dogma – which is living with the results of other people\'s thinking', author:"Steve Jobs" },
            { quote: 'If life were predictable it would cease to be life, and be without flavor', author:"Eleanor Roosevelt" },
            { quote: 'If you look at what you have in life, you\'ll always have more. If you look at what you don\'t have in life, you\'ll never have enough.', author:"Oprah Winfrey" },
            { quote: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.', author:"Mother Teresa" },
            { quote: 'When you reach the end of your rope, tie a knot in it and hang on.', author:"Franklin D. Roosevelt" },
            { quote: 'Always remember that you are absolutely unique. Just like everyone else', author:"Margaret Mead" },
            { quote: 'The future belongs to those who believe in the beauty of their dreams.', author:"Eleanor Roosevelt" },
            { quote: 'Tell me and I forget. Teach me and I remember. Involve me and I learn.', author:"Benjamin Franklin" },
            { quote: 'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.' , author:"Helen Keller"},
            { quote: 'Whoever is happy will make others happy too', author:"Anne Frank" }
        ],
        quotesFromDB:[{test : "1"}],
    },
    mutations: {
        change(state, quotes) {
          state.quotes = quotes;
        },
        SAVE_QUOTE(state, quotesFromDB) {
            state.quotesFromDB = quotesFromDB;// here i need to add on to
            console.log(quotesFromDB);
          }
    },
    getters: {
        quote: state => state.quotes,
        quoteHolderVX: state => state.quoteHolder,

      },
    actions: {
        loadQuotes({commit}) {
            const request = new Request('http://localhost:3000/quotes', {method: 'GET', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'} });
            fetch(request)
            .then(result =>{return result.json()})
            .then(data =>{commit('SAVE_QUOTE', data)})
            .catch(error => {throw new Error(`API ${error}`)})
        }
      }
});