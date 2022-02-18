<template>
      <v-card class="card">
        <div class="logoIGN"><img src="@/assets/ministerio_im.jpg"></div>
        <div class="logoWord"><img src="@/assets/word_logo.png"></div>
        
        <h1>Asistente Generación Expedientes</h1>

        <br/>
        <hr/>
        <br/>

        <v-btn class="actionButton" color="info" @click="execute">Generar Word</v-btn>
        <v-btn class="actionButton" color="error">Generar PDF</v-btn>
      </v-card>
</template>

<script>
import {renderDoc} from "@/assets/mixins/renderDoc";


  export default {
    mixins: [renderDoc],

      data(){
        return {
          data:{
            //SECCION 1
            tituloExpediente: 'Probando plantilla',
            clave: '2022-25665520',
            comunidadesAutonomas: 'Madrid, Valencia, Galicia',
            provincias: 'Madrid, Alicante, A Coruña',
            regArmonizada: false,
            regNoArmonizada: true,
            clasificacionCPV: 'La que sea',

            //SECCION 2
            necesidadesContrato: 'Aquí va la justificación del documento',
            prepBaseSinIVA: 53456.32,
            prepBaseIVA: undefined,             //Se calcula en execute()
            prepBaseIVAinc: undefined,          //Se calcula en execute()
            costesDirectos: undefined,          //Se calcula en execute()
            costesGenerales: undefined,         //Se calcula en execute()
            beneficioIndustrial: undefined,     //Se calcula en execute()
            totalCostes: undefined,             //Se calcula en execute()
          }
        }
      },

      methods: {
          execute(){
            //CALCULO AUTOMATICO VALORES
            this.data.prepBaseIVA = (this.data.prepBaseSinIVA * 0.21).toFixed(2);
            this.data.prepBaseIVAinc = (this.data.prepBaseSinIVA + parseFloat(this.data.prepBaseIVA)).toFixed(2);
            this.data.costesDirectos = parseFloat(this.data.prepBaseSinIVA);
            this.data.costesGenerales = (this.data.costesDirectos * 0.13).toFixed(2);
            this.data.beneficioIndustrial = (this.data.costesDirectos * 0.06).toFixed(2);
            this.data.totalCostes = (this.data.costesDirectos + parseFloat(this.data.costesGenerales) + parseFloat(this.data.beneficioIndustrial)).toFixed(2);

            //RENDERIZAR
            this.renderDoc(this.data)
          },
      },
  };
</script>

<style scoped>
#app {
  background-color: lightblue;
}

.card{
  text-align: center;
  width: 35vw !important;
  height: 50vh;
  display: block;
  margin: 12rem auto auto auto;
  padding: 3rem;
}

.logoWord {
  width: 7rem;
  display: block;
  margin: 0 auto 1rem auto;
}

.logoWord>img {
  width:95%
}

.logoIGN{
  height: 5rem;
  margin-bottom: 2rem;
}

.logoIGN>img{
  height: 5rem;
}

.actionButton{
  margin: 0.5rem;
}
</style>