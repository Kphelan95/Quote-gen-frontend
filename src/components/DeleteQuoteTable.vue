<template>
<v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
           delete a Quote
        </v-btn>
    </template>
    <v-card>
        <v-card-title>
            <span class="headline">Select a Quote to be deleted</span>
        </v-card-title>
        <v-data-table :items="this.quotesFromDB" :headers="headers"/>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="dialog = false">delete</v-btn>
            <v-btn color="blue darken-1" text @click="checkStoreVal()">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>


<script>
import { mapState } from 'vuex';
export default {
   data: () => ({
    dialog: false
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
          console.log(this.quotesFromDB);
      }
  }
}
</script>