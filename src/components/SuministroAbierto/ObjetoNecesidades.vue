<template>
  <div>
        <!-- 1 OBJETO DEL CONTRATO -->
        <v-row class="row">
          <v-col cols="12">
            <h3>Objeto del contrato
              <v-badge 
              class="badge" color="#c7d6f2" content="?"
              title="Punto 1"></v-badge >
            </h3>
              <v-text-field
              v-model="datos.tituloExpediente"
              :rules="[rules.required, rules.counter]"
              label="Titulo del Expediente" counter filled               
              >
              </v-text-field>
          </v-col>
        </v-row>
        <br/>

        <!-- COMUNIDADES AUTONOMAS, PROVINCIAS -->
        <v-row class="row">
          <v-col cols="12" sm="6">
            <h3>Comunidades Autónomas</h3>
              <v-text-field
              v-model="datos.selectComunidadesAutonomas"
              append-icon="mdi-magnify"
              prepend-icon="mdi-delete-empty"
              @click:prepend="deleteComunidades"
              @click:append="showComunidades"
              label="Comunidades Autónomas" filled>
              </v-text-field>
          </v-col>

          <v-col cols="12" sm="6">
            <h3>Provincias</h3>
              <v-text-field
              v-model="datos.selectProvincias"
              append-icon="mdi-magnify"
              prepend-icon="mdi-delete-empty"
              @click:prepend="deleteProvincias"
              @click:append="showProvincias"
              label="Provincias" filled>
              </v-text-field>
          </v-col>      
        </v-row>
        <br/>

        <!-- REG ARMONIZADA CODIGO CPV -->
        <v-row class="row">
          <v-col cols="12" md="6">
            <h3>Regulación Armonizada</h3>
              <v-radio-group v-model="datos.regArmonizada">
                <v-radio label="Si" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
              </v-radio-group>
          </v-col>
          <v-col cols="12" md="6">
            <h3>Codigo CPV</h3>
              <v-text-field
              v-model="datos.clasifCPV"
              append-icon="mdi-magnify"
              prepend-icon="mdi-delete-empty"
              @click:prepend="deleteCPVCodes"
              @click:append="showCPVCodes"
              label="Clasif. CPV" filled>
              </v-text-field>
          </v-col>
        </v-row>
        <br/>


        <!-- 2 NECESIDADES DEL CONTRATO -->
        <v-row class="row">
          <v-col cols="12">
            <h3>Necesidades a satisfacer y circunstancias del contrato
              <v-badge 
              class="badge" color="#c7d6f2" content="?"
              title="Punto 2"></v-badge >
            </h3>
            <v-textarea 
            v-model="datos.necesidadesContrato"
            label="Necesidades del contrato" 
            filled
            auto-grow
            >
            </v-textarea>
          </v-col>
        </v-row>
        <br/>

        <!-- CPV TABLE -->
        <v-dialog
         width="80rem"
        :value="showCPVSelect">
          <CPVTable @close="closeDialog" @cpvCodes="getCPV"></CPVTable>
        </v-dialog>

        <!-- COMUNIDADES TABLE -->
        <v-dialog
         width="80rem"
        :value="showComunidadesSelect">
          <Comunidades @close="closeDialog" @comunidades="getComunidades"></Comunidades>
        </v-dialog>

        <!-- PROVINCIAS TABLE -->
        <v-dialog
         width="80rem"
        :value="showProvinciasSelect">
          <Provincias @close="closeDialog" @provincias="getProvincias"></Provincias>
        </v-dialog>

  </div>
 
</template>

<script>
import CPVTable from "@/components/common/CPVTable"
import Comunidades from "@/components/common/Comunidades"
import Provincias from "@/components/common/Provincias"

export default {
name: "ObjetoNecesidades",
components: {CPVTable, Comunidades, Provincias},
props:['datosGuardados'],

  data() {
    return {
      rules: {
        required: (value) => !!value || "Este campo es obligatorio.",
        counter: (value) => value.length <= 200 || "Máximo 200 caracteres",
      },

      showCPVSelect: false,
      showComunidadesSelect: false,
      showProvinciasSelect: false, 
      

      datos: {
        componente: 'ObjetoNecesidades',

        //SECCION 1
        tituloExpediente: '',
        selectComunidadesAutonomas: '',
        selectProvincias: '',
        regArmonizada: false,
        clasifCPV: '',

        //SECCION 2
        necesidadesContrato: '',
      }
    };
  },

  created(){
    this.initialize();
  },

  beforeDestroy(){
    this.$emit('datos', this.datos)
  },

  methods: {
    initialize(){
      if(this.datosGuardados !== undefined){
        this.datos = this.datosGuardados
      }        
    },

    deleteCPVCodes(){
      this.datos.clasifCPV= '';
    },

    deleteComunidades(){
      this.datos.selectComunidadesAutonomas= '';
    },

    deleteProvincias(){
      this.datos.selectProvincias= '';
    },

    showCPVCodes(){
      this.showCPVSelect = true;
    },

    showComunidades(){
      this.showComunidadesSelect = true;
    },

    showProvincias(){
      this.showProvinciasSelect = true;
    },

    getCPV(data){
      this.datos.clasifCPV = data;
    },

    getComunidades(data){
      this.datos.selectComunidadesAutonomas = data;
    },

    getProvincias(data){
      this.datos.selectProvincias = data;
    },

    closeDialog(closed){
      if(closed === true){
        this.showCPVSelect = false;
        this.showComunidadesSelect = false;
        this.showProvinciasSelect = false;
      }
    },

  },
};

</script>

<style scoped>
#cardWrapper {
  padding: 1rem;
}

.row {
  margin-bottom: -2.3rem;
}

.colControl {
  margin-bottom: -1rem;
}
</style>
