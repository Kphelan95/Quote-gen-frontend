<template>
<v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
           delete a Quote pls
        </v-btn>
    </template>
    <v-card>
        <v-card-title>
            <span class="headline">Select a Quote to be deleted</span>
        </v-card-title>


            <v-list two-line>

                <!--
        <v-list-item-group
          single
          active-class="pink--text"
          v-model="model"
          value="quote"
        >

            <template v-for="(quote, index) in this.quotesFromDB">
            <v-list-item :key="quote.quote" :value="quote" >
              <template  >
                <v-list-item-content>
                  <v-list-item-title v-text="quote.quote"></v-list-item-title>
                  <v-list-item-subtitle v-text="quote.author"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </v-list-item>
  
            <v-divider
              v-if="index + 1 < quote.length"
              :key="index"
            ></v-divider>
            </template>
            </v-list-item-group>
-->

        <v-list-item-group
          single
          active-class="blue--text"
          v-model="model"
        > 

            <v-list-item :key="quote.quote" :value="quote" v-for="quote in quotesFromDB" >
              <template  >
                <v-list-item-content class="text-left align-self-start">
                  <v-list-item-title v-text="quote.quote"></v-list-item-title>
                  <v-list-item-subtitle v-text="quote.author"></v-list-item-subtitle>
                   <v-divider></v-divider> <!-- weirdChamp -->
                </v-list-item-content>
              </template>
              <v-btn >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-list-item>
            </v-list-item-group> 
            </v-list>
            


        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click=" deleteVal()">delete</v-btn>
            <v-btn color="blue darken-1" text @click="checkStoreVal()">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>


<script>
import { mapState } from 'vuex';


export default {
   data: () => ({
    dialog: false,
    model: []
  }),
  computed: {
     ...mapState(['quotesFromDB']),
     headers(){
         return[
             {text:'Quote',value:'quote'},
             {text:'author',value:'author'}
         ]
     }
  },
  methods:{
      //this is just a method to check the current value of the store, for test purposes
      checkStoreVal(){
          this.dialog = false;
          console.log(this.model._id);//i need to pass the parm to the
          //console.log(this.quotesFromDB[this.model]);
          //console.log(this.quotesFromDB);
      },
      deleteVal(){// working now i just need to remove this from the store
          this.dialog = false;
          /////const request = new Request('http://localhost:3000/quotes/'+this.model._id, {method: 'DELETE', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'} });
          /////fetch(request)
          /////.then(result =>{return result.json()})
          /////.then(data =>{console.log(data);}); 
          //this.$store.dispatch('loadQuotes'); //loadQuotes is an action, when the obj gets deleted the commit should retain the obj
          this.$store.dispatch('deleteQuote',this.model._id);
      }
  }
}
</script>