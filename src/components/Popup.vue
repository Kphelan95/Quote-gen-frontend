<template>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Enter a Quote
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Enter a Quote</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Quote*" required v-model="quoteUser"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Author*" required v-model="authorUser" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="closeAndSave()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
export default {
   data: () => ({
    dialog: false,
    quoteUser:"",
    authorUser:""
  }),
  methods:{
    closeAndSave : function(){
        this.dialog = false;
        if(this.quoteUser!="" && this.authorUser!=""){

            //make api call here
            const data = {"quote": this.quoteUser,"author": this.authorUser};
            const request = new Request('http://localhost:3000/quotes', {method: 'POST', headers : { 'Content-Type': 'application/json','Accept': 'application/json','Access-Control-Allow-Origin': '*'},body: JSON.stringify(data) });
            fetch(request)
            .then(result =>{return result.json()})
            .then(data =>{console.log(data)})
            .catch(error => {console.log(error)});
            this.$store.dispatch('loadQuotes');//this might not be getting called
            console.log("here");
        }else{
            console.log("feild is required");
        }
    }
  }
}
</script>