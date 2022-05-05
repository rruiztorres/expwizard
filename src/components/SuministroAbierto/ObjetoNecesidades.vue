<template>
  <div>
        <!-- 1 OBJETO DEL CONTRATO -->
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

        <v-text-field
        v-model="datos.clave"
        label="Clave" filled>
        </v-text-field>

        <v-row class="row">
          <v-col class="colControl" cols="12" md="6">
              <v-select
              :items="comunidades"
              v-model="datos.selectComunidadesAutonomas"
              multiple
              filled
              @mousedown.prevent
              label="Comunidades Autonomas"
              >
              </v-select>
          </v-col>

          <v-col cols="12" md="6">
              <v-select
              :items="provincias"
              v-model="datos.selectProvincias"
              multiple
              filled
              @mousedown.prevent
              label="Provincias"
              ></v-select>
          </v-col>
        </v-row>

        <v-row class="row">
          <v-col cols="12" sm="6">
              <v-checkbox
              v-model="datos.regArmonizada"
              label="Regulación Armonizada"
              ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="6">
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
        <br />



        <!-- 2 NECESIDADES DEL CONTRATO -->
        <h3>Necesidades a satisfacer y circunstancias del contrato
          <v-badge 
          class="badge" color="#c7d6f2" content="?"
          title="Punto 2"></v-badge >
        </h3>
        <v-row class="row">
          <v-col cols="12">
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

        <v-dialog
         width="80rem"
        :value="showCPVSelect">
          <CPVTable @close="closeDialog" @cpvCodes="getCPV"></CPVTable>
        </v-dialog>

  </div>
 
</template>

<script>
import CPVTable from "@/components/common/CPVTable"

export default {
name: "ObjetoNecesidades",
components: {CPVTable},
props:['datosGuardados'],

  data() {
    return {
      rules: {
        required: (value) => !!value || "Este campo es obligatorio.",
        counter: (value) => value.length <= 200 || "Máximo 200 caracteres",
      },

      showCPVSelect: false,    
      
      comunidades: [
          " Andalucia", " Aragón", " Principado de Asturias"," Islas Baleares",
          " Canarias", " Cantabria", " Castilla-La Mancha", " Castilla y León",
          " Cataluña", " Comunidad Valenciana", " Extremadura", " Galicia",
          " La Rioja", " Comunidad de Madrid", " Región de Murcia",
          " Comunidad Foral de Navarra", " País Vasco"," Ceuta"," Melilla",
      ],
      
      provincias: [
          " Álava", " Albacete", " Alicante", " Almería", " Asturias",
          " Ávila", " Badajoz", " Barcelona", " Bizkaia", " Burgos",
          " Cáceres", " Cádiz", " Cantabria", " Castellón", " Ciudad Real",
          " Córdoba", " A Coruña", " Cuenca", " Girona", " Granada",
          " Guadalajara", " Gipuzkoa", " Huelva", " Huesca", " Illes Balears",
          " Jaén", " León", " Lleida", " Lugo", " Madrid", " Málaga",
          " Murcia", " Navarra", " Ourense", " Palencia", " Las Palmas",
          " Pontevedra", " La Rioja", " Salamanca", " Segovia", " Sevilla",
          " Soria", " Tarragona", " Santa Cruz de Tenerife",
          " Teruel", " Toledo", " Valencia", " Valladolid", " Zamora", " Zaragoza",
      ],

      datos: {
        componente: 'ObjetoNecesidades',
        //SECCION 1
        tituloExpediente: '',
        clave: '',
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

    showCPVCodes(){
      this.showCPVSelect = true;
    },

    getCPV(data){
      this.datos.clasifCPV = data;
    },

    closeDialog(closed){
      if(closed === true){
        this.showCPVSelect = false;
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
  margin-bottom: -2.5rem;
}

.colControl {
  margin-bottom: -1rem;
}
</style>
