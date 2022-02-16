<template>
  <div>
    <v-card>
      <h1>Hello</h1>
      <v-btn @click="execute">
          Generar Word
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import {renderDoc} from "@/assets/mixins/renderDoc";


  export default {
    mixins: [renderDoc],

      data(){
        return {
          
          urlOrigen: "https://docxtemplater.com/tag-example.docx",
          datosDocumento:{
            "first_name": "Hipp",
            "last_name": "Edgar",
            "phone": "0652455478",
            "description": "New Website"
          }
        }
      },

      methods: {
          execute(){
            this.renderDoc(this.datosDocumento)
          }
      },
  };
</script>