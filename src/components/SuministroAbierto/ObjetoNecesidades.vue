<template>
  <div>
    <!-- OBJETO DEL CONTRATO -->
    <div class="group">
      <v-row class="row">
        <v-col cols="12">
          <h3 id="Título del expediente">Título del expediente
            <v-badge 
            class="badge" color="#c7d6f2" content="?"
            title="Punto 1"></v-badge >
          </h3>
            <v-text-field
            v-model="datos.tituloExpediente"
            :rules="[rules.required, rules.max200]"
            label="Pliego de Cláusulas Administrativas Particulares para la contratación de:" filled                
            >
            </v-text-field>
        </v-col>
      </v-row>
    </div>

    <!-- COMUNIDADES AUTONOMAS, PROVINCIAS -->
    <div class="group">
      <v-row class="row">
        <!-- CCAA -->
        <v-col cols="12" sm="6">
          <h3>Comunidades Autónomas</h3>
            <v-text-field
            readonly
            :rules="[rules.required]"
            v-model="datos.selectComunidadesAutonomas"
            prepend-icon="mdi-delete-empty"
            @click:prepend="(()=>datos.selectComunidadesAutonomas=undefined)"
            @click="(()=>showComunidadesSelect = true)"
            label="Comunidades Autónomas" filled>
            </v-text-field>
        </v-col>

        <!-- COMUNIDADES TABLE OVERLAY -->
        <v-overlay :value="showComunidadesSelect">
          <Comunidades
            :inputData="datos.selectComunidadesAutonomas"
            @close="()=>showComunidadesSelect = false" 
            @comunidades="(data)=>datos.selectComunidadesAutonomas=data">
          </Comunidades>
        </v-overlay>

        <!-- PROVINCIAS -->
        <v-col cols="12" sm="6">
          <h3>Provincias</h3>
            <v-text-field
            readonly
            v-model="datos.selectProvincias"
            prepend-icon="mdi-delete-empty"
            @click:prepend="(()=>datos.selectProvincias= '')"
            @click="(()=>showProvinciasSelect = true)"
            label="Provincias" filled>
            </v-text-field>
        </v-col>      
      </v-row>

      <!-- PROVINCIAS TABLE OVERLAY -->
      <v-overlay :value="showProvinciasSelect">
        <Provincias
          :inputData="datos.selectProvincias"
          :filterCCAA="datos.selectComunidadesAutonomas"
          @close="()=>showProvinciasSelect=false" 
          @provincias="(data)=>datos.selectProvincias=data">
        </Provincias>
      </v-overlay>
    </div>

    <!-- REG ARMONIZADA CODIGO CPV -->
    <div class="group">
      <v-row class="row">
        <!-- REGULACION ARMONIZADA -->
        <v-col cols="12" md="3">
          <h3>Regulación Armonizada</h3>
            <v-radio-group row v-model="datos.regArmonizada">
              <v-radio label="Si" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
        </v-col>

        <!-- CRITERIOS -->
        <v-col cols="12" md="3">
          <h3>Criterios</h3>
            <v-radio-group row v-model="datos.criterios">
              <v-radio label="Un único criterio" :value="true"></v-radio>
              <v-radio label="Varios criterios" :value="false"></v-radio>
            </v-radio-group>
        </v-col>

        <!-- CPV -->
        <v-col cols="12" md="6">
          <h3>Codigo CPV</h3>
            <v-text-field
            v-model="datos.clasifCPV"
            append-icon="mdi-magnify"
            prepend-icon="mdi-delete-empty"
            @click:prepend="(()=>datos.clasifCPV = '')"
            @click:append="(()=>showCPVSelect = true)"
            label="Clasif. CPV" filled>
            </v-text-field>
        </v-col>
      </v-row>

      <!-- CPV TABLE OVERLAY -->
      <v-overlay v-if="showCPVSelect">
        <CPVTable 
          @close="()=>showCPVSelect = false" 
          @cpvCodes="(data)=>datos.clasifCPV=data">
        </CPVTable>
      </v-overlay>
    </div>

    <!-- NECESIDADES DEL CONTRATO -->
    <div class="group">
      <v-row class="row">
        <v-col cols="12">
          <h3 id="Necesidades a satisfacer y circunstancias del contrato">
            Necesidades a satisfacer y circunstancias del contrato
            <v-badge 
            class="badge" color="#c7d6f2" content="?"
            title="Punto 2"></v-badge >
          </h3>
          <v-textarea 
          v-model="datos.necesidadesContrato"
          label="Necesidades del contrato" 
          filled
          :rules="[rules.max8800]"
          auto-grow
          >
          </v-textarea>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import CPVTable from "@/components/common/CPVTable"
import Comunidades from "@/components/common/Comunidades"
import Provincias from "@/components/common/Provincias"

export default {
name: "objeto_necesidades",
components: {CPVTable, Comunidades, Provincias},
props:['datosGuardados', 'goToElement'],

  data() {
    return {
      rules: {
        required: (value) => !!value || "Este campo es obligatorio.",
        max200: (value) => value.length <= 200 || "Máximo 200 caracteres",
        max8800: (value) => value.length <= 8800 || "Máximo 8800 caracteres",
      },

      showCPVSelect: false,
      showComunidadesSelect: false,
      showProvinciasSelect: false, 
      

      datos: {
        componente: 'ObjetoNecesidades',

        //SECCION 1
        tituloExpediente: '',
        selectComunidadesAutonomas: undefined,
        selectProvincias: '',
        regArmonizada: false,
        criterios: false,
        clasifCPV: '',

        //SECCION 2
        necesidadesContrato: '',
      }
    };
  },

  created(){
    this.initialize();
  },

  watch:{
    goToElement(){
      this.setElementScroll();
    }
  },

  updated(){
      this.$emit('datos', this.datos)
  },

  beforeDestroy(){
    //NECESARIO PARA COMPARTIR DATOS ENTRE SECCIONES
      this.$emit('datos', this.datos)
  },


  methods: {
    initialize(){
      if(this.datosGuardados !== undefined){
        this.datos = this.datosGuardados
      }        
    },

    setElementScroll(){
        if(this.goToElement !== undefined){
            setTimeout(()=>{
                let element = document.getElementById(this.goToElement)
                element.scrollIntoView({ block: "start", behavior: "smooth" });
                }, 500)
        }
    },
  },
};

</script>

