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
                   <v-divider></v-divider> 
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
       


        <v-dialog v-model="dialog2" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" text  @click="saveSelected()">
            Edit Quote
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit Quote</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Quote*" required v-model="quoteEdit"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Author*" required v-model="authorEdit" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="test()">Close</v-btn>
            <v-btn color="blue darken-1" text @click="UpdateVal()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    </v-card-actions>





        
    </v-card>
</v-dialog>
</template>


<script>
import { mapState } from 'vuex';


export default {
   data: () => ({
    dialog: false,
    model: [],
    dialog2: false,
    authorEdit:"",
    quoteEdit:"",
    editOBJ:{
      updatedQuote:"",
      updatedAuthor:"",
      id:""
    }
      
    
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
          console.log(this.model);
      },
      deleteVal(){
          this.dialog = false;
          this.$store.dispatch('deleteQuote',this.model._id);
          this.$store.dispatch('loadQuotes');
      },
      test(){
          this.dialog2 = false;
          console.log(this.model);
          console.log(this.model.quote);
      },
      saveSelected(){
        this.quoteEdit=this.model.quote;
        this.authorEdit=this.model.author;
      },
      UpdateVal(){
        //console.log("updated quote "+this.quoteEdit)
        this.dialog2 = false;
        this.dialog = false;
        this.editOBJ.updatedQuote = this.quoteEdit;
        this.editOBJ.updatedAuthor = this.authorEdit;
        this.editOBJ.id=this.model._id;
        this.$store.dispatch('updateQuote',this.editOBJ);
      }
  }
}
</script>