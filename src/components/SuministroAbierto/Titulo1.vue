<template>
  <div>
    <v-card id="cardWrapper">
        <!-- 1 OBJETO DEL CONTRATO -->
        <v-card-title>1.- Objeto del contrato</v-card-title>
        <v-text-field 
        v-model="tituloExpediente"
        :rules="[rules.required, rules.counter]"
        label="Titulo del Expediente" counter filled>
        </v-text-field>

        <v-text-field
        v-model="clave"
        :rules="[rules.required]"
        label="Clave" filled>
        </v-text-field>

        <v-row class="row">
        <v-col class="colControl" cols="12" md="6">
            <v-select
            v-model="selectComunidades"
            :items="comunidades"
            multiple
            filled
            @mousedown.prevent
            label="Comunidades Autonomas"
            >
            <template v-slot:prepend-item>
                <v-list-item ripple @mousedown.prevent @click="toggle">
                <v-list-item-action>
                    <v-icon
                    :color="
                        selectComunidades.length > 0 ? 'indigo darken-4' : ''
                    "
                    >
                    {{ icon }}
                    </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title> Select / Unselect All </v-list-item-title>
                </v-list-item-content>
                </v-list-item>
                <v-divider class="mt-2"></v-divider>
            </template>
            </v-select>
        </v-col>

        <v-col cols="12" md="6">
            <v-select
            v-model="selectProvincias"
            :items="provincias"
            multiple
            filled
            label="Provincias"
            ></v-select>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="12" sm="6">
            <v-checkbox
            v-model="regArmonizada"
            label="Regulación Armonizada"
            ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field 
            v-model="clasificacionCPV"
            label="Clasif. CPV" filled>
            </v-text-field>
        </v-col>
        </v-row>
        <br />

        <!-- 2 NECESIDADES DEL CONTRATO -->
        <v-card-title>2.- Necesidades del contrato</v-card-title>
        <v-row>
        <v-col cols="12">
            <v-text-field 
            v-model="necesidadesContrato"
            label="Necesidades del contrato" filled>
            </v-text-field>
        </v-col>
        </v-row>

        <v-row>
        <v-col cols="12">
            <v-text-field 
            v-model="prepBaseSinIVA"
            label="Importe" filled>
            </v-text-field>
        </v-col>
        </v-row>
        
    <v-btn color="success" @click="execute">PROBAR</v-btn>
    </v-card>
  </div>
</template>

<script>
    import {renderDoc} from "@/assets/mixins/renderDoc";

export default {
name: "Titulo1",

mixins: [renderDoc],
  data() {
    return {
      rules: {
        required: (value) => !!value || "Este campo es obligatorio.",
        counter: (value) => value.length <= 200 || "Máximo 200 caracteres",
      },

        
        //SECCION 1
        tituloExpediente: '',
        clave: '',
        selectComunidades: "",
        comunidades: [
            "Andalucia", "Aragón", "Principado de Asturias","Islas Baleares",
            "Canarias", "Cantabria", "Castilla-La Mancha", "Castilla y León",
            "Cataluña", "Comunidad Valenciana", "Extremadura", "Galicia",
            "La Rioja", "Comunidad de Madrid", "Región de Murcia",
            "Comunidad Foral de Navarra", "País Vasco","Ceuta","Melilla",
        ],
        selectProvincias: "",
        provincias: [
            "Álava ", "Albacete ", "Alicante ", "Almería ", "Asturias ",
            "Ávila ", "Badajoz ", "Barcelona ", "Bizkaia ", "Burgos ",
            "Cáceres ", "Cádiz ", "Cantabria ", "Castellón ", "Ciudad Real ",
            "Córdoba ", "A Coruña ", "Cuenca ", "Girona ", "Granada ",
            "Guadalajara ", "Gipuzkoa ", "Huelva ", "Huesca ", "Illes Balears ",
            "Jaén ", "León ", "Lleida ", "Lugo ", "Madrid ", "Málaga ",
            "Murcia ", "Navarra ", "Ourense ", "Palencia ", "Las Palmas ",
            "Pontevedra ", "La Rioja ", "Salamanca ", "Segovia ", "Sevilla ",
            "Soria ", "Tarragona ", "Santa Cruz de Tenerife ",
            "Teruel ", "Toledo ", "Valencia ", "Valladolid ", "Zamora ", "Zaragoza ",
        ],
        regArmonizada: false,
        regNoArmonizada: true,
        clasificacionCPV: undefined,

        //SECCION 2
        necesidadesContrato: '',
        prepBaseSinIVA: undefined,
        prepBaseIVA: undefined,             //Se calcula en execute()
        prepBaseIVAinc: undefined,          //Se calcula en execute()
        costesDirectos: undefined,          //Se calcula en execute()
        costesGenerales: undefined,         //Se calcula en execute()
        beneficioIndustrial: undefined,     //Se calcula en execute()
        totalCostes: undefined,             //Se calcula en execute()
    };
  },

  computed: {
    selectAllComunidades() {
      return this.selectComunidades.length === this.comunidades.length;
    },

    icon() {
      if (this.selectAllComunidades) return "mdi-close-box";
      return "mdi-checkbox-blank-outline";
    },
  },

  methods: {
    deleteSelComunidades() {
      this.selectComunidades = "";
    },

    deleteSelProvincias() {
      this.selectProvincias = "";
    },

    toggle() {
      this.$nextTick(() => {
        if (this.selectAllComunidades) {
          this.selectComunidades = [];
        } else {
          this.selectComunidades = this.comunidades.slice();
        }
      });
    },

    execute(){
        this.data = {
            tituloExpediente: this.tituloExpediente,
            clave: this.clave,
            comunidadesAutonomas: this.selectComunidades,
            provincias: this.selectProvincias,
            regArmonizada: this.regArmonizada,
            regNoArmonizada: !this.regArmonizada,
            clasificacionCPV: this.clasificacionCPV,
            necesidadesContrato: this.necesidadesContrato,
            prepBaseSinIVA: this.prepBaseSinIVA,

            //CALCULO EN TIEMPO DE EJECUCIÓN
            prepBaseIVA: (this.prepBaseSinIVA*0.21).toFixed(2),
            prepBaseIVAinc: (this.prepBaseSinIVA*1.21).toFixed(2),
            costesDirectos: (this.prepBaseSinIVA*0.81).toFixed(2),
            costesGenerales: (this.prepBaseSinIVA*0.13).toFixed(2),
            beneficioIndustrial: (this.prepBaseSinIVA*0.06).toFixed(2),
            totalCostes: undefined,
        }

        this.data.totalCostes = (parseFloat(this.data.costesGenerales) + parseFloat(this.data.beneficioIndustrial)).toFixed(2), 
        
        //RENDERIZAR
        this.renderDoc(this.data)
        
        },
  },
};
</script>

<style scoped>
#cardWrapper {
  padding: 1rem;
}

.row {
  margin-bottom: -2rem;
}

.colControl {
  margin-bottom: -1rem;
}
</style>
