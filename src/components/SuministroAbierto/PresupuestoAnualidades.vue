<template>
  <div>
    <!-- 3 PRESUPUESTO DE LICITACIÓN Y ANUALIDADES -->
    <h3>3.- Presupuesto de licitación y anualidades</h3>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="datos.presupuestoBaseLicitacion"
          label="Presupuesto base de licitación (€)"
          filled
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="Aplicación presupuestaria" filled> </v-text-field>
      </v-col>

      <v-col cols="12" sm="4">
        <v-radio-group class="aplicacionPrep" v-model="datos.tramitacion">
          <v-radio label="Tramitación ordinaria" value="ordinaria"></v-radio>
          <v-radio label="Tramitación anticipada" value="anticipada"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <br />

    <v-row class="row anualidades">
      <v-col cols="12">
        <h5 class="subtitle">Anualidades</h5>
      </v-col>
      <v-col cols="12" md="2">
        <v-select dense filled :items="anualidades" v-model="selectAnualidades">
        </v-select>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          class="actionButton"
          color="info"
          large
          width="100%"
          :disabled="
            datos.presupuestoBaseLicitacion <= 0 ||
            datos.presupuestoBaseLicitacion === undefined
          "
          @click="makeAnualidades"
        >
          GENERAR
          <v-icon class="icon">mdi-animation-outline</v-icon>
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
        <v-btn
          class="actionButton"
          color="error"
          width="100%"
          large
          :disabled="datos.anualidades.length === 0"
          @click="deleteAnualidades"
        >
          BORRAR
          <v-icon class="icon">mdi-delete</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="8">
        <v-alert :type="typeAlert" v-if="alertValidar == true">{{
          mensajeValidar
        }}</v-alert>

        <v-data-table
          class="dataTable"
          :headers="anualidadesHeaders"
          :items="datos.anualidades"
          hide-default-footer
        >
          <template v-slot:[`item.importeSinIVA`]="props">
            <v-edit-dialog :return-value.sync="props.item.importeSinIVA">
              <span class="editField">{{
                parseFloat(props.item.importeSinIVA)
              }}</span>
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

        <!--TOTALES-->
        <v-data-table
          :headers="totalsHeaders"
          hide-default-header
          hide-default-footer
          :items="datos.totals"
        >
        </v-data-table>
      </v-col>
    </v-row>

    <br />
    <h5>Desglose</h5>
    <v-row class="row">
      <v-col cols="12" sm="3">
        <v-radio-group v-model="datos.desglose">
          <v-radio label="Procede" :value="true"></v-radio>
          <v-radio label="No procede" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="3" v-if="datos.desglose === true">
        <v-radio-group v-model="datos.tipoDesglose">
          <v-radio label="Por género" value="genero"></v-radio>
          <v-radio
            label="Por Categoría profesional"
            value="categoria"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        v-if="datos.desglose === true && datos.tipoDesglose === 'genero'"
      >
        <v-radio-group v-model="datos.tipoDesgloseGenero">
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
    <br />

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
    <br />

    <!-- 5 DIVISIÓN EN LOTES -->
    <h3>5.- División en lotes</h3>
    <v-row>
      <v-col cols="12" md="6">
        <v-radio-group v-model="datos.divisionLotes">
          <v-radio label="No es posible" value="no es posible"></v-radio>
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
        <v-radio-group v-model="datos.divisionNoPosible">
          <v-radio
            label="La naturaleza o el objeto del contrato no lo permite"
            value="naturaleza objeto"
          ></v-radio>
          <v-radio label="Otra causa:" value="otra causa"></v-radio>
        </v-radio-group>
      </v-col>

      <v-col
        cols="12"
        md="6"
        v-if="datos.divisionLotes === 'posible no divisible'"
      >
        <h5>Justificación</h5>
        <v-radio-group v-model="datos.divisionPosibleDivisible">
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

    <v-row>
      <!-- 6 DOCUMENTOS QUE REVISTEN CARACTER CONTRACTUAL -->
      <v-col cols="12" md="6">
          <h3>6.- Documentos que revisten carácter contractual</h3>
          <v-radio-group>
              <v-radio label="Jerarquizada" value="jerarquizada"></v-radio>
              <v-radio label="No jerarquizada" value="no jerarquizada"></v-radio>
          </v-radio-group>
      </v-col>

      <!-- 7 TRAMITACIÓN DEL PROCEDIMIENTO -->
      <v-col cols="12" md="6">
          <h3>7.- Tramitación del procedimiento</h3>
          <v-radio-group>
              <v-radio label="Ordinaria" value="ordinaria"></v-radio>
              <v-radio label="Urgente" value="urgente"></v-radio>
          </v-radio-group>
      </v-col>

      <!-- 8 INCOMPATIBILIDADES PARA LA LICITACIÓN -->
      <v-col cols="12" md="6">
          <h3>8.- Incompatibilidades para la licitación</h3>
          <v-radio-group>
              <v-radio label="No tiene consideración" value="no tiene consideracion"></v-radio>
              <v-radio label="Tiene consideración" value="tiene consideracion"></v-radio>
          </v-radio-group>
      </v-col>
  </v-row>
  </div>
</template>

<script>
export default {
  name: "PresupuestoAnualidades",
  data() {
    return {
      anualidades: [1, 2, 3, 4, 5],
      selectAnualidades: 1,
      colorValidar: "success",
      alertValidar: false,
      alertMessage: "",

      anualidadesHeaders: [
        { text: "Año", align: "start", sortable: false, value: "year" },
        {
          text: "Importe (sin IVA)",
          align: "end",
          sortable: false,
          value: "importeSinIVA",
        },
        { text: "IVA (€)", align: "end", sortable: false, value: "IVA" },
        {
          text: "Importe (con IVA)",
          align: "end",
          sortable: false,
          value: "importeConIVA",
        },
      ],

      totalsHeaders: [
        { text: "Año", align: "start", sortable: false, value: "total" },
        {
          text: "Importe (sin IVA)",
          align: "end",
          sortable: false,
          value: "totalsIVA",
        },
        { text: "IVA (€)", align: "end", sortable: false, value: "IVAtotal" },
        {
          text: "Importe (con IVA)",
          align: "end",
          sortable: false,
          value: "totalcIVA",
        },
      ],

      datos: {
        //SECCION 3
        presupuestoBaseLicitacion: undefined,
        tramitacion: "ordinaria",
        desglose: false,
        tipoDesglose: undefined,
        tipoDesgloseGenero: undefined,
        anualidades: [],
        totals: [
          {
            total: "TOTAL",
            totalsIVA: 0,
            IVAtotal: 0,
            totalcIVA: 0,
          },
        ],

        //SECCION 4
        divisionLotes: undefined,
        divisionNoPosible: undefined,
        divisionPosibleDivisible: undefined,
      },
    };
  },

  methods: {
    makeAnualidades() {
      this.datos.anualidades = [];

      this.alertValidar = false;
      let fecha = new Date();
      let ano = fecha.getFullYear();

      for (let i = 0; i < this.selectAnualidades; i++) {
        const newData = {
          year: ano + i,
          importeSinIVA: 0,
          IVA: this.importeSinIVA * 0.21,
          importeConIVA: this.importeSinIVA + this.IVA,
        };
        this.datos.anualidades.push(newData);
      }
    },

    validarAnualidades() {
      for (this.index in this.datos.anualidades) {
        this.datos.totals[0].totalsIVA =
          this.datos.totals[0].totalsIVA +
          parseFloat(this.datos.anualidades[this.index].importeSinIVA);
      }

      this.datos.totals[0].IVAtotal = parseFloat(
        (this.datos.totals[0].totalsIVA * 0.21).toFixed(2)
      );
      this.datos.totals[0].totalcIVA = parseFloat(
        (
          this.datos.totals[0].IVAtotal + this.datos.totals[0].totalsIVA
        ).toFixed(2)
      );

      if (
        this.datos.presupuestoBaseLicitacion -
          this.datos.totals[0].totalsIVA !==
        0
      ) {
        this.colorValidar = "red";
        this.typeAlert = "error";
        this.mensajeValidar = `El presupuesto base de licitación y las anualidades no coinciden. Existe una diferencia de: ${
          this.datos.presupuestoBaseLicitacion - this.datos.totals[0].totalsIVA
        }`;
        this.alertValidar = true;
      } else {
        this.alertValidar = true;
        this.mensajeValidar = "Datos correctos";
        this.typeAlert = "success";
        this.colorValidar = "success";
        return true;
      }
    },

    deleteAnualidades() {
      this.datos.anualidades = [];
    },

    returnIVA(base) {
      this.iva = parseFloat((base * 0.21).toFixed(2));
      return this.iva;
    },

    returnTotal(base) {
      this.total = parseFloat(base);
      this.iva = this.returnIVA(base);
      return parseFloat((this.total + this.iva).toFixed(2));
    },
  },
};
</script>

<style scoped>
.dataTable {
  background-color: rgba(211, 211, 211, 0.589) !important;
  border-radius: 4px 4px 0px 0px;
}

.totalsTable {
  background-color: rgba(211, 211, 211, 0.924) !important;
  border-radius: 0px 0px 4px 4px;
  border-top: 1px solid grey;
}

.totalSlot {
  width: 6.9rem;
}

.icon {
  margin-left: 0.5rem;
}

.actionButton {
  margin-bottom: 0.25rem;
}

.editField {
  color: blue;
  text-decoration: underline;
}

.aplicacionPrep {
  margin: 0rem;
}

.anualidades {
  border: 1px solid lightgray;
  border-radius: 4px;
  padding: 1rem 0rem 1rem 0rem;
}
</style>
