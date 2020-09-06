<template>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="screen==='home'" color="primary" dark v-bind="attrs" v-on="on"> Enter a Quote</v-btn>
          <v-btn v-else color="blue darken-1" text v-bind="attrs" v-on="on"> Enter a Quote</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Enter a Quote</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Quote*" :rules="quoteRules" v-model="quoteUser" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Author*" :rules="authorRules"  v-model="authorUser" required></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" :disabled="!valid" text @click="closeAndSave()">Save</v-btn>
            <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
   data: () => ({
    dialog: false,
    quoteUser:"",
    authorUser:"",
    valid: true,
    lazy: false,
    quoteRules: [
      v => !!v || 'Quote is required',
      v => (v && v.length <= 30) || 'Quote must be less than 30 characters',
    ],
    authorRules: [
      v => !!v || 'Author is required',
      v => (v && v.length <= 30) || 'Quote must be less than 30 characters',
    ]
  }),
  props:{
      screen:{
        default: "hola",
        type: String
      }
  },
  methods:{
    closeAndSave : function(){
        this.dialog = false;
        if(this.quoteUser!="" && this.authorUser!=""){
          const data = {"quote": this.quoteUser,"author": this.authorUser};
          this.$store.dispatch('addQuote',data).then(() => {this.$store.dispatch('loadQuotes');})
          this.quoteUser="";
          this.authorUser="";
        }else{
          console.log("feild is required");
        }
    },
    close(){
      this.dialog = false;
      this.quoteUser="";
      this.authorUser="";
    }
  }
}
</script>