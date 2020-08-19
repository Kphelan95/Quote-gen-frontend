<template>
    <v-card>
        <v-card-title>
            <span class="headline">Select a Quote to be deleted</span>
        </v-card-title>
        <v-list two-line>
            <v-list-item :key="quote.quote" :value="quote" v-for="(quote, i) in quotesFromDB" >
                <v-list-item-content class="text-left align-self-start">
                  <v-list-item-title v-text="quotesFromDB[i].quote" ></v-list-item-title> 
                  <v-list-item-subtitle v-text="quotesFromDB[i].author"></v-list-item-subtitle>
                   <v-divider></v-divider> 
                </v-list-item-content>
              
              <v-btn @click="passDataToPopUp(quotesFromDB[i])">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn @click="deleteValInline(quotesFromDB[i])">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </v-list-item>
        </v-list>

        <v-card-actions>
        <v-spacer></v-spacer>
                
        <v-btn color="blue darken-1" to="/" text>return</v-btn>

            <v-dialog v-model="dialog" persistent max-width="600px">
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
                        <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="UpdateVal()">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card-actions>
    </v-card>
</template>


<script>
import { mapState } from 'vuex';


export default {
   data: () => ({
    dialog: false,
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
      close(){
          this.dialog = false;
      },
      UpdateVal(){
        this.dialog = false;
        this.editOBJ.updatedQuote = this.quoteEdit;
        this.editOBJ.updatedAuthor = this.authorEdit;
        this.$store.dispatch('updateQuote',this.editOBJ);
      },
      passDataToPopUp(quoteObj){
        this.quoteEdit = quoteObj.quote;
        this.authorEdit = quoteObj.author;
        this.editOBJ.id=quoteObj._id;
        this.dialog = true;
      },
      deleteValInline(quoteObj){
        this.$store.dispatch('deleteQuote',quoteObj._id);// needs to be changed
        this.$store.dispatch('loadQuotes');
      }
  }
}
</script>