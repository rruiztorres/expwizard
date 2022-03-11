<template>
  <div>
        <!-- 1 OBJETO DEL CONTRATO -->
        <h3>1.- Objeto del contrato</h3>
        <v-text-field
        v-model="datos.tituloExpediente"
        :rules="[rules.required, rules.counter]"
        label="Titulo del Expediente" counter filled>
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
              @click:append="dummy"
              label="Clasif. CPV" filled>
              </v-text-field>
          </v-col>
        </v-row>
        <br />



        <!-- 2 NECESIDADES DEL CONTRATO -->
        <h3>2.- Necesidades a satisfacer y circunstancias del contrato</h3>
        <v-row class="row">
          <v-col cols="12">
              <v-text-field 
              v-model="datos.necesidadesContrato"
              label="Necesidades del contrato" 
              filled
              >
              </v-text-field>
          </v-col>
        </v-row>
        <br/>



        <!-- 3 PRESUPUESTO DE LICITACIÓN Y ANUALIDADES -->
        <h3>3.- Presupuesto de licitación y anualidades</h3>
        <v-row>
          <v-col cols="12" md="6">
              <v-text-field 
              v-model="datos.presupuestoBaseLicitacion"
              label="Presupuesto base de licitación (€)" 
              filled
              >
              </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
              <v-text-field 
              label="Aplicación presupuestaria" 
              filled
              >
              </v-text-field>
          </v-col>
        </v-row>


        <br/>
        <h5>Tramitación a efectos presupuestarios</h5>
        <v-row class="row">
          <v-col cols="12" sm="3">
              <v-radio-group
                v-model="datos.tramitacion"
              >
                <v-radio
                  label="Tramitación ordinaria"
                  value="ordinaria"
                ></v-radio>
                <v-radio
                  label="Tramitación anticipada"
                  value="anticipada"
                ></v-radio>
              </v-radio-group>
                
          </v-col>
        </v-row>

        <br/>
        <h5>Desglose</h5>
         <v-row class="row">
          <v-col cols="12" sm="3">
              <v-radio-group
                v-model="datos.desglose"
              >
                <v-radio
                  label="Procede"
                  :value="true"
                ></v-radio>
                <v-radio
                  label="No procede"
                  :value="false"
                ></v-radio>
              </v-radio-group>      
          </v-col>
          <v-col cols="12" sm="3" v-if="datos.desglose === true">
              <v-radio-group
                v-model="datos.tipoDesglose"
              >
                <v-radio
                  label="Por género"
                  value="genero"
                ></v-radio>
                <v-radio
                  label="Por Categoría profesional"
                  value="categoria"
                ></v-radio>
              </v-radio-group>      
          </v-col>
          <v-col cols="12" sm="6" v-if="datos.desglose === true && datos.tipoDesglose === 'genero'">
              <v-radio-group
                v-model="datos.tipoDesgloseGenero"
              >
                <v-radio
                  label="No consta diferencia de costes por razón de género"
                  value="no consta diferencia"
                ></v-radio>
                <v-radio
                  label="Existe diferencia de costes por razón de género"
                  value="consta diferencia"
                ></v-radio>
              </v-radio-group>      
          </v-col>
        </v-row>

        <br/>
        <h5>Anualidades</h5>
         <v-row class="row">
            <v-col cols="12" md="2">
              <v-select
              dense
              filled
              :items="anualidades"
              v-model="selectAnualidades"
              >
              </v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                class="actionButton"
                color="info" 
                large
                width="100%"
                :disabled="datos.presupuestoBaseLicitacion <= 0 || datos.presupuestoBaseLicitacion === undefined"
                @click="makeAnualidades"
                >
                CALCULAR 
                <v-icon class="icon">mdi-calculator</v-icon>
              </v-btn>
              
              <v-btn 
                class="actionButton"
                :color="colorValidar" 
                width="100%"
                large
                :disabled="datos.anualidades.length === 0"
                @click="validarAnualidades"
                >
                VALIDAR 
                <v-icon class="icon">mdi-check</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" md="8">
              <v-alert type="error" v-if="alertValidar==true">{{alertMessage}}{{prespuestoNoAsign}}</v-alert>

              <v-data-table
                class="dataTable"
                :headers="anualidadesHeaders"
                :items="datos.anualidades"
                hide-default-footer
              > 
                <template v-slot:[`item.importeSinIVA`]="props">
                  <v-edit-dialog
                    :return-value.sync="props.item.importeSinIVA"
                  >
                    <span class="editField">{{ parseFloat(props.item.importeSinIVA) }}</span>
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.importeSinIVA"
                        label="Editar"
                        single-line
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </template>
                
                <template v-slot:[`item.IVA`]="{ item }">
                    {{ returnIVA(item.importeSinIVA) }}        
                </template>

                <template v-slot:[`item.importeConIVA`]="{ item }">
                    <b>{{ returnTotal(item.importeSinIVA) }}</b>      
                </template>
              </v-data-table>
            </v-col>
         </v-row>
         <br/>

         <!-- 4 VALOR ESTIMADO -->
        <h3>4.- Valor Estimado</h3>
        <v-row>
          <v-col cols="12">
            <v-text-field 
              label="Importe máx. por modificaciones previstas sin IVA (€)" 
              filled
              >
            </v-text-field>
          </v-col>
        </v-row>
        <br/>

         <!-- 5 DIVISIÓN EN LOTES -->
        <h3>5.- División en lotes</h3>
        <v-row>
          <v-col cols="12" md="6">
            <v-radio-group
              v-model="datos.divisionLotes"
            >
              <v-radio
                label="No es posible"
                value="no es posible"
              ></v-radio>
              <v-radio
                label="Si es posible, pero no se divide en lotes"
                value="posible no divisible"
              ></v-radio>
              <v-radio
                label="Si es posible y se divide en lotes"
                value="posible divisible"
              ></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" md="6" v-if="datos.divisionLotes === 'no es posible'">
            <h5>Justificación</h5>
            <v-radio-group
              v-model="datos.divisionNoPosible"
            >
              <v-radio
                label="La naturaleza o el objeto del contrato no lo permite"
                value="naturaleza objeto"
              ></v-radio>
              <v-radio
                label="Otra causa:"
                value="otra causa"
              ></v-radio>
            </v-radio-group>
          </v-col>

          <v-col cols="12" md="6" v-if="datos.divisionLotes === 'posible no divisible'">
            <h5>Justificación</h5>
            <v-radio-group
              v-model="datos.divisionPosibleDivisible"
            >
              <v-radio
                label="Conlleva riesgo restringir competencia"
                value="restringe competencias"
              ></v-radio>
              <v-radio
                label="Realizarlo independiente dificulta o pone en riesgo correcta ejecución"
                value="pone riesgo ejecución"
              ></v-radio>

            </v-radio-group>
          </v-col>
        </v-row>

         <v-dialog
        :value="showCPVSelect">
          <CPVTable></CPVTable>
        </v-dialog>

  </div>
 
</template>

<script>
import CPVTable from "@/components/common/CPVTable"

export default {
name: "Titulo1",
components: {CPVTable},

  data() {
    return {
      rules: {
        required: (value) => !!value || "Este campo es obligatorio.",
        counter: (value) => value.length <= 200 || "Máximo 200 caracteres",
      },

      anualidades: [1,2,3,4,5],
      selectAnualidades: 1,
      colorValidar: "success",
      alertValidar: false,
      alertMessage: "El presupuesto base de licitación y las anualidades no coinciden. Presupuesto sin asignar: ",
      prespuestoNoAsign: 0,
      showCPVSelect: false,

      anualidadesHeaders: [
        {text: 'Año', align: 'start', sortable: false, value:'year'},
        {text: 'Importe (sin IVA)', align: 'start', sortable: false, value:'importeSinIVA'},
        {text: 'IVA (€)', align: 'start', sortable: false, value: 'IVA'},
        {text: 'Importe (con IVA)', align: 'start', sortable: false, value:'importeConIVA'},
      ],
      
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
        //SECCION 1
        tituloExpediente: '',
        clave: '',
        selectComunidadesAutonomas: '',
        selectProvincias: '',
        regArmonizada: false,
        clasifCPV: '',

        //SECCION 2
        necesidadesContrato: '',

        //SECCION 3
        presupuestoBaseLicitacion: undefined,
        tramitacion: 'ordinaria',
        desglose: false,
        tipoDesglose: undefined,
        tipoDesgloseGenero: undefined,
        anualidades: [],

        //SECCION 4
        divisionLotes: undefined,
        divisionNoPosible: undefined,
        divisionPosibleDivisible: undefined,
      }
    };
  },

  watch:{
    datos: {
      deep: true,
      handler(datos){
      //DEFINIR CONDICIONES PARA QUE NO SE EMITAN DATOS INCOMPLETOS
        this.$emit('datos', datos)
      }
    },
  },


  methods: {
    dummy(){
      this.showCPVSelect = true;
    },

    validarAnualidades(){
      this.total = 0;

      for (this.index in this.datos.anualidades){
        this.total = this.total + parseFloat(this.datos.anualidades[this.index].importeSinIVA);
      }

      if(this.total != this.datos.presupuestoBaseLicitacion){
        this.prespuestoNoAsign = parseFloat((this.datos.presupuestoBaseLicitacion - this.total).toFixed(2));
        this.colorValidar = "red"
        this.alertValidar = true; 
          
      } else {
        this.alertValidar = false;
        this.colorValidar = "success"
        return true
      }
    },

    returnIVA(base){
      this.iva = parseFloat((base * 0.21).toFixed(2));
      return this.iva;
    },

    returnTotal(base){
      this.total = parseFloat(base);
      this.iva = this.returnIVA(base);
      return parseFloat((this.total + this.iva).toFixed(2));
    },

    makeAnualidades(){
      //REINICIO DATOS 
      this.datos.anualidades = [];
      
      if(this.datos.presupuestoBaseLicitacion > 0){     
        let fecha = new Date();
        let year = fecha.getFullYear();
        this.importeSinIVA = parseFloat((this.datos.presupuestoBaseLicitacion / this.selectAnualidades).toFixed(2));

        for (let i = 0; i < this.selectAnualidades; i++){
          this.datos.anualidades.push(
            {
              year: year + i,
              importeSinIVA: this.importeSinIVA,
            }
          )
        }
        
      }
    },

  },
};

</script>

<style scoped>
#cardWrapper {
  padding: 1rem;
}

h3{
  font-weight: 500;
  margin-bottom: 0.5rem;
}

h5 {
  font-weight: 500;
  opacity: 0.6;
}

.row {
  margin-bottom: -2.5rem;
}

.colControl {
  margin-bottom: -1rem;
}

.dataTable {
  background-color: rgba(211, 211, 211, 0.589) !important;
}

.icon {
  margin-left: 0.5rem;  
}

.actionButton{
  margin-bottom: 0.25rem;
}

.editField{
  background-color: white;
  box-shadow: 0px 0px 3px 1px gray;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
