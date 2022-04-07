<template>
  <div>
    <!-- 3 PRESUPUESTO DE LICITACIÓN Y ANUALIDADES -->
    <h3>3.- Presupuesto de licitación y anualidades</h3>
    <br/>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="datos.presupuestoBaseLicitacion"
          label="Presupuesto base de licitación (€)"
          filled
          type="number"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select 
          filled 
          label="Aplicación presupuestaria" 
          :items="itemsAplicacionPrep" 
          v-model="datos.aplicacionPrep"
        >
        </v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <v-radio-group class="aplicacionPrep" v-model="datos.tramitacion">
          <v-radio label="Tramitación ordinaria" value="ordinaria"></v-radio>
          <v-radio label="Tramitación anticipada" value="anticipada"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row class="row">
      <v-col cols="12" md="6">
        <v-simple-table class="dataTable">
          <caption class="caption"><b>Presupuesto Base de Licitación</b></caption>
          <thead>
            <tr>
              <th>Importe sin IVA</th>
              <th>IVA (21%)</th>
              <th>Total (IVA inc.)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{datos.presupuestoBaseLicitacion}}</td>
              <td>{{datos.presupuestoBaseLicitacionIVA}}</td>
              <td><b>{{datos.presupuestoBaseLicitacionTotal}}</b></td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>

      <v-col cols="12" md="6">
        <v-simple-table class="dataTable">
          <caption class="caption"><b>Presupuesto Base de Licitación (desglose)</b></caption>
          <thead>
            <tr>
              <th>Costes directos</th>
              <th>Costes generales (13%)</th>
              <th>Beneficio industrial (6%)</th>
              <th>Total costes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{datos.costesDirectos}}</td>
              <td>{{datos.costesGenerales}}</td>
              <td>{{datos.beneficioIndustrial}}</td>
              <td>{{datos.totalCostes}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>


    </v-row>

    <br />

    <v-row class="rowGroup">
      <v-col cols="12">
        <h5 class="subtitle">Anualidades</h5>
      </v-col>
      <v-col cols="12" md="2">
        <v-select dense filled :items="anualidades" v-model="selectAnualidades">
        </v-select>
      </v-col>
      <v-col cols="12" md="3">
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
          width="100%"
          :color="colorAnualidades()"
          large
          :disabled="presupuestoSinAsignar !== '0.00'"
          @click="storeDatosAnualidades"
        > 
          <div v-if="anualidadesGuardadas == false" >
          GUARDAR
          <v-icon class="icon">mdi-content-save</v-icon>
          </div>
          <div v-else>
          DATOS GUARDADOS
          <v-icon class="icon">mdi-check-all</v-icon>
          </div>
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
      <v-col cols="12" md="7">
        <v-data-table
          class="dataTable"
          :headers="anualidadesHeaders"
          :items="datos.anualidades"
          hide-default-footer
        >
          <template v-slot:[`item.importeSinIVA`]="props" v-if="anualidadesGuardadas == false">
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
        <br/>
        <v-alert v-if="presupuestoSinAsignar !== undefined && anualidadesGuardadas === false" :type=returnColorValidate(presupuestoSinAsignar)>
          <div v-if="presupuestoSinAsignar > 0">{{'Presupuesto sin asignar: '}}{{presupuestoSinAsignar}}</div>
          <div v-if="presupuestoSinAsignar < 0">{{'Las anualidades exceden el presupuesto base, diferencia: '}}{{presupuestoSinAsignar}}</div>
          <div v-if="presupuestoSinAsignar == 0">
            Datos correctos, haga clic en "GUARDAR" para almacenar anualidades              
          </div>
        </v-alert>
      </v-col>
    </v-row>

    <br />
    <h5>Desglose</h5>
    <v-row class="rowGroup">
      <v-col cols="12" sm="2">
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
      <v-col
        v-if="datos.desglose === true && datos.tipoDesglose === 'categoria'"
        cols="12"
        md="7"
      ><v-textarea label="Indicar como se desglosa:" filled></v-textarea>
      </v-col>
    </v-row>
    <br />

    <!-- 4 VALOR ESTIMADO -->
    <h3>4.- Valor Estimado</h3>
    <h5>4.1 Importe del valor estimado del contrato</h5>
    <v-row>
      <v-col cols="12" md="5">
        <v-text-field
          label="Importe máx. por modificaciones previstas sin IVA (€)"
          filled
          type="number"
          v-model="datos.maxModificacionesPrevistas"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="7">
        <v-simple-table class="dataTable">
          <caption class="caption"><b>Importe del valor estimado del contrato</b></caption>
          <thead>
            <tr>
              <th>Importe del suministro</th>
              <th>Importe máximo por modificaciones previstas</th>
              <th>TOTAL VALOR ESTIMADO DEL CONTRATO, sin IVA (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{datos.presupuestoBaseLicitacion}}</td>
              <td>{{datos.maxModificacionesPrevistas}}</td>
              <td><b>{{datos.totalEstimado}}</b></td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
    <br/>
    <h5>4.2 Método de cálculo del valor estimado</h5>
    <v-row>
      <v-col cols="12">
        <v-textarea 
          filled auto-grow
          v-model="datos.metodoCalculo"
          ></v-textarea>
      </v-col>
    </v-row>
    <br />

    <!-- 5 DIVISIÓN EN LOTES -->
    <h3>5.- División en lotes</h3>
    <v-row class="rowGroup">
      <v-col cols="12" md="3">
        <h5>¿Existe posibilidad de división?</h5>
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

        <v-col cols="12" md="4" v-if="datos.divisionLotes === 'no es posible'">
          <h5>Justificación si no es posible:</h5>
          <v-radio-group v-model="datos.divisionNoPosible">
            <v-radio
              label="La naturaleza o el objeto del contrato no lo permite"
              value="naturaleza objeto"
            ></v-radio>
            <v-radio label="Otra causa:" value="otra causa"></v-radio>
          </v-radio-group>
        </v-col>

          <v-col cols="12" md="5" v-if="datos.divisionLotes === 'no es posible' && datos.divisionNoPosible === 'otra causa'">
            <h5>Si es otra causa, justificar:</h5>
            <v-textarea filled v-model="datos.justificacionNoDivisionLotes"></v-textarea>           
          </v-col>

            <!-- POSIBLE NO DIVISIBLE -->
            <v-col
              cols="12"
              md="4"
              v-if="datos.divisionLotes === 'posible no divisible'"
            >
              <h5>Justificación si es posible pero no se divide:</h5>
              <v-radio-group v-model="datos.divisionPosibleDivisible">
                <v-radio
                  label="Conlleva riesgo restringir competencia"
                  value="restringe competencias"
                ></v-radio>
                <v-radio
                  label="Realizarlo independiente dificulta o pone en riesgo correcta ejecución"
                  value="pone riesgo ejecución"
                ></v-radio>
                <v-radio
                  label="Otra causa"
                  value="otra causa"
                ></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="12" md="5" 
            v-if="datos.divisionLotes === 'posible no divisible' && 
            datos.divisionPosibleDivisible === 'otra causa'"
            >
              <h5>Si es otra causa, justificar:</h5>
              <v-textarea filled></v-textarea>
            </v-col>

            <!-- POSIBLE DIVISIBLE -->

            <v-col
              cols="12"
              md="9"
              v-if="datos.divisionLotes === 'posible divisible'"
            >
              <h5>Identificación de los lotes:</h5>
              <v-textarea filled auto-grow v-model="datos.identificacionLotes"></v-textarea>
            </v-col>
    </v-row>
    <br />

     <!-- 6 DOCUMENTOS QUE REVISTEN CARACTER CONTRACTUAL -->
    <h3>6.- Documentos que revisten carácter contractual</h3>
    <v-row class="rowGroup">
      <v-col cols="12" md="9">
        <p>A los efectos del artículo 35 de la LCSP, la relación de documentos que revisten carácter contractual 
        enumerada en el orden en que aparecen a continuación:</p>
        <v-textarea 
        filled auto-grow
        v-model="datos.relacionDocsContractual"
        >
        </v-textarea>
      </v-col>
      <v-col cols="12" md="3">
      <h5>Dicha relación tendrá caracter:</h5>
          <v-radio-group v-model="datos.docsCaracterContractual">
              <v-radio label="Jerarquizada" value="jerarquizada"></v-radio>
              <v-radio label="No jerarquizada" value="no jerarquizada"></v-radio>
          </v-radio-group>
      </v-col>
    </v-row>
    <br />

    <!-- 7 TRAMITACIÓN DEL PROCEDIMIENTO -->
    <h3>7.- Tramitación del procedimiento</h3>
    <v-row class="rowGroup">
      <v-col cols="12" md="2">
        <h5>Seleccionar tramitación</h5>
          <v-radio-group v-model="datos.tramitacionProc">
              <v-radio label="Ordinaria" value="ordinaria"></v-radio>
              <v-radio label="Urgente" value="urgente"></v-radio>
          </v-radio-group>
      </v-col>
      <v-col cols="12" md="10" v-if="datos.tramitacionProc === 'urgente'">
        <h5>Se acompañará de la correspondiente declaración de urgencia</h5>
        <p>
          En este caso, los plazos mencionados en este pliego para la licitación, adjudicación y formalización del contrato
          se reducirán a la mitad, con las excepciones previstas en el artículo 119.2 de la LCSP
        </p>
        <v-btn color="info"><v-icon style="margin-right: 0.5rem;">mdi-content-save</v-icon>CARGAR DECLARACIÓN</v-btn>
      </v-col>
    </v-row>
    <br />
    
    <!-- 8 INCOMPATIBILIDADES PARA LA LICITACIÓN -->
    <h3>8.- Incompatibilidades para la licitación</h3>
    <v-row class="rowGroup"> 
      <v-col cols="12" md="4">
        <i>
          Participación en la licitación de las empresas que hubieran participado previamente en la 
          elaboración de las especificaciones técnicas o de los documentos preparatorios del contrato
          o hubieran asesorado al órgano de contratación durante la preparación del procedimiento de 
          contratación [artículo 70.1 LCSP]
        </i>
      </v-col>

      <v-col cols="12" md="4">
        <h5>Consideración:</h5>
          <v-radio-group v-model="datos.participacionEmpresas">
              <v-radio label="No tiene consideración el contrato que se licita" value="no tiene"></v-radio>
              <v-radio label="Si tiene esa consideración, las siguientes empresas han participado" value="si tiene"></v-radio>
          </v-radio-group>
      </v-col>

      <v-col cols="12" md="4" v-if="datos.participacionEmpresas === 'si tiene'">
        <h5>Empresas que deben ser excluidas de dicha licitación:</h5>
        <v-textarea filled auto-grow v-model="datos.empresasExcluidas"></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "PresupuestoAnualidades",
  props:['datosGuardados'],
  
  data() {
    return {
      anualidades: [1, 2, 3, 4, 5],
      selectAnualidades: 1,
      alertMessage: "",
      itemsAplicacionPrep: ['495A1718620', '495A1718630', '1718495A620'],
      presupuestoSinAsignar: undefined,
      anualidadesGuardadas: false,


      anualidadesHeaders: [
        { text: "Año", align: "start", sortable: false, value: "year", divider: true,},
        { text: "Importe (sin IVA)", align: "end", sortable: false, value: "importeSinIVA", width: "20%", divider: true, },
        { text: "IVA (€)", align: "end", sortable: false, value: "IVA", width: "25%", divider: true, },
        { text: "Importe (con IVA)", align: "end", sortable: false, value: "importeConIVA", width: "25%" },
      ],

      datos: {
        componente: 'PresupuestoAnualidades',

        //SECCION 3
        presupuestoBaseLicitacion: undefined,
        presupuestoBaseLicitacionIVA: undefined,
        costesDirectos: undefined,
        costesGenerales: undefined,
        beneficioIndustrial: undefined,
        totalCostes: undefined,
        aplicacionPrep: '',
        tramitacion: "ordinaria",
        desglose: true,
        tipoDesglose: undefined,
        tipoDesgloseGenero: undefined,
        anualidades: [],

        //SECCION 4
        maxModificacionesPrevistas: undefined,
        totalEstimado: undefined,
        metodoCalculo: 'Para calcular el valor estimado se han tenido en cuenta los costes derivados de la aplicación de la normativa laboral vigente. Además, se han tenido en cuenta los apartados 2 y 10 del artículo 101 de la LCSP.',
      
        //SECCIÓN 5
        divisionLotes: undefined,
        divisionNoPosible: undefined,
        divisionPosibleDivisible: undefined,
        justificacionNoDivisionLotes: undefined,
        identificacionLotes: undefined,

        //SECCION 6
        relacionDocsContractual: undefined,
        ddocsCaracterContractual: undefined,

        //SECCION 7
        tramitacionProc: undefined,

        //SECCION 8
        participacionEmpresas: undefined,
        empresasExcluidas: undefined,
      },
    };
  },

  watch:{
    datos: {
      deep: true,
      handler(datos){
        //CALCULO VALORES AUTOMATICOS
        datos.presupuestoBaseLicitacionIVA = (this.datos.presupuestoBaseLicitacion * 0.21).toFixed(2)
        datos.presupuestoBaseLicitacionTotal = ((parseFloat(this.datos.presupuestoBaseLicitacion)) + (parseFloat(this.datos.presupuestoBaseLicitacionIVA))).toFixed(2),
        datos.totalCostes = this.datos.presupuestoBaseLicitacion;
          datos.costesDirectos = parseFloat((parseFloat(this.datos.totalCostes)/1.19).toFixed(2));
          datos.costesGenerales = parseFloat((this.datos.costesDirectos * 0.13).toFixed(3));
          datos.beneficioIndustrial = parseFloat((this.datos.costesDirectos * 0.06).toFixed(3));
          
        

        if(datos.anualidades[0] !== undefined){
          this.calcNoAsign()
        }
        datos.totalEstimado = this.calculoEstimado(this.datos.maxModificacionesPrevistas, this.datos.presupuestoBaseLicitacion);
      }
    },
  },

  beforeDestroy(){
    this.$emit('datos', this.datos)
  },

  created(){
    this.initialize();
  },
  
  methods: {
    initialize(){
      if(this.datosGuardados !== undefined){
        this.datos = this.datosGuardados
      }
    },

    colorAnualidades(){
      if(this.anualidadesGuardadas === false){
        return "success"
      } else {
        return "gray"
      }
    },

    calculoEstimado(modificaciones, base){
      if (modificaciones === undefined){
        return base;
      } else {
        return parseFloat((parseFloat(modificaciones) + parseFloat(base)).toFixed(2));
      }
    },

    storeDatosAnualidades(){
      for (this.index in this.datos.anualidades){
        this.datos.anualidades[this.index].importeSinIVA = parseFloat(this.datos.anualidades[this.index].importeSinIVA);
        this.datos.anualidades[this.index].IVA = parseFloat((this.datos.anualidades[this.index].importeSinIVA * 0.21).toFixed(2));
        this.datos.anualidades[this.index].importeConIVA = parseFloat((parseFloat(this.datos.anualidades[this.index].importeSinIVA) + this.datos.anualidades[this.index].IVA).toFixed(2));
      }
      this.anualidadesGuardadas = true;
      this.$emit("datos", this.datos)
    },

    calcNoAsign(){
      this.presupuestoSinAsignar = 0;
      for(this.index in this.datos.anualidades){
        this.presupuestoSinAsignar = this.presupuestoSinAsignar + parseFloat(this.datos.anualidades[this.index].importeSinIVA);
      }
      this.presupuestoSinAsignar = (this.datos.presupuestoBaseLicitacion - this.presupuestoSinAsignar).toFixed(2);
      return this.presupuestoSinAsignar;      
    },

    returnColorValidate(presupuesto){
      if(presupuesto > 0 || presupuesto < 0){
        return 'error'
      } else {
        return 'success'
      }
    },

    makeAnualidades() {
      this.datos.anualidades = [];
      this.anualidadesGuardadas = false;

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

      this.calcNoAsign();
    },
  

    deleteAnualidades() {
      this.datos.anualidades = [];
      this.presupuestoSinAsignar = undefined;
      this.anualidadesGuardadas = false;
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

.rowGroup {
    margin-top: 0.1rem;
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 1rem 0rem 1rem 0rem;
}

.caption {
  margin: 0.5rem;
}

.rowGroup {
    margin-top: 0.1rem;
    border: 1px solid lightgray;
    border-radius: 4px;
    padding: 1rem 0rem 1rem 0rem;
}
</style>
