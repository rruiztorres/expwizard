<template>
  <div>
    <!-- 5 DIVISIÓN EN LOTES -->
    <h3>Presupuesto y Lotes</h3>
    <v-row class="rowGroup">
      <v-col cols="12" md="3">
        <h5>¿Se dividirá en lotes?</h5>
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

        <!-- JUSTIFICACION SI NO ES POSIBLE DIVIDIR EN LOTES -->
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
            <v-textarea auto-grow filled v-model="datos.justificacionNoDivisionLotes"></v-textarea>           
          </v-col>

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

            <!-- OTRAS CAUSAS, JUSTIFICAR -->
            <v-col cols="12" md="5" 
            v-if="datos.divisionLotes === 'posible no divisible' && 
            datos.divisionPosibleDivisible === 'otra causa'"
            >
              <h5>Si es otra causa, justificar:</h5>
              <v-textarea filled></v-textarea>
            </v-col>


        <!-- POSIBLE DIVISIBLE -->
        <v-row class="subRow">
          <v-col cols="12" md="2">
            <v-text-field 
            filled type="number" 
            v-model="datos.numLotes" 
            :disabled="datos.divisionLotes !== 'posible divisible'"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-btn class="actionButton" color="info" width="100%" @click="createLotes">
              GENERAR
              <v-icon class="icon">mdi-animation-outline</v-icon>
            </v-btn>
            <br/>
            <v-btn
            v-if="lotesGuardados === false"
            class="actionButton" 
            :color="colorLotes()" width="100%" dark @click="saveLotes">
              GUARDAR
              <v-icon class="icon">mdi-content-save</v-icon>
            </v-btn>
            <v-btn
            v-else
            class="actionButton" 
            color="grey" width="100%" dark>
              GUARDADO
              <v-icon class="icon">mdi-check-all</v-icon>
            </v-btn>
          </v-col>

          <!-- DATA TABLE LOTES -->
          <v-col cols="12">
            <v-data-table
              class="dataTable"
              :items="datos.lotes"
              :headers="lotesHeaders"
              hide-default-footer
            >     
              <!-- BASE LOTE SIN IMPUESTOS -->
              <template v-slot:[`item.baseLote`]="props">
                <v-edit-dialog :return-value.sync="props.item.baseLote">
                  <span class="editField">{{
                  parseFloat(props.item.baseLote)
                  }}</span>
                  <template v-slot:input>
                    <v-text-field
                    v-model="props.item.baseLote"
                    label="Editar"
                    single-line
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- IMPUESTO APLICABLE -->
              <template v-slot:[`item.tipoImpuesto`]="props">
                <v-edit-dialog :return-value.sync="props.item.tipoImpuesto">
                  <span class="editField">{{
                  parseFloat(props.item.tipoImpuesto)
                  }}</span>
                  <template v-slot:input>
                    <v-select
                    :items="impuestos"
                    v-model="props.item.tipoImpuesto"
                    label="Impuesto a aplicar:"

                    ></v-select>
                  </template>
                </v-edit-dialog>
              </template>

              <!-- TOTAL IMPUESTOS (AUTO)-->
              <template v-slot:[`item.totalImpuestos`]="props">
                  {{
                    parseFloat(((props.item.tipoImpuesto / 100) * parseFloat(props.item.baseLote)).toFixed(2))
                  }}
              </template>


              <!-- COSTES GENERALES (AUTO)-->
              <template v-slot:[`item.costesGenerales`]="props">
                  {{
                    parseFloat((props.item.baseLote * 0.12999999).toFixed(2))
                  }}
              </template>

               <!-- BENEFICIO INDUSTRIAL (AUTO)-->
              <template v-slot:[`item.beneficioIndustrial`]="props">
                  {{
                    parseFloat((props.item.baseLote * 0.05999999).toFixed(2))
                  }}
              </template>

              <!-- TOTAL COSTES DIRECTOS (gen + ind)-->
              <template v-slot:[`item.costesDirectos`]="props">
                  {{
                    (parseFloat((props.item.baseLote * 0.12999999).toFixed(2)) + parseFloat((props.item.baseLote * 0.05999999).toFixed(2))).toFixed(2)
                  }}
              </template>

              <!-- TOTAL COSTES INDIRECTOS (base - dir) -->
              <template v-slot:[`item.costesIndirectos`]="props">
                  {{
                    ((props.item.baseLote) - ((parseFloat((props.item.baseLote * 0.12999999).toFixed(2)) + parseFloat((props.item.baseLote * 0.05999999).toFixed(2))).toFixed(2))).toFixed(2)
                  }}
              </template>

              <!-- TOTAL COSTES (AUTO)-->
              <template v-slot:[`item.totalCostes`]="props">
                  {{props.item.baseLote}}
              </template>

              <!-- TOTAL (AUTO) -->
              <template v-slot:[`item.totalLote`]="props">
                  <b>{{
                    parseFloat((((props.item.tipoImpuesto / 100) * parseFloat(props.item.baseLote) + parseFloat(props.item.baseLote))).toFixed(2))
                  }}</b>
              </template>

              <!-- BORRAR-->
              <template v-slot:[`item.actions`]="props">
                  <v-icon color="red" @click="deleteLote(props.item.idLote)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-col>
          
          <!--DATA TABLE IDENTIFICACIÓN LOTES -->
          <v-col cols="12" v-if="datos.numLotes > 1">
            <h5>Identificación de los lotes</h5>
            <v-data-table
              class="dataTable"
              :items="datos.lotes"
              :headers="identificacionLotesHeaders"
              hide-default-footer
            >
              <!-- DESCRIPCION LOTE -->
              <template v-slot:[`item.descripcion`]="props">
                <v-edit-dialog :return-value.sync="props.item.descripcion">
                  <span class="editField">{{
                  props.item.descripcion
                  }}</span>
                  <template v-slot:input>
                    <v-text-field
                    v-model="props.item.descripcion"
                    label="Editar"
                    single-line
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
    </v-row>
    <br />

    <h3>Anualidades</h3>
      <v-row class="rowGroup" v-for="lote in datos.lotes" :key="lote.id">
        <v-col cols="12" v-if="datos.lotes.length > 1">
          Anualidades lote nº {{lote.idLote}}: <b>{{lote.descripcion}}</b>
        </v-col>
        <br/>
        <v-col cols="12" md="2">
          <v-select dense filled :items="anualidades" v-model="lote.selectAnualidades">
          </v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-btn
            class="actionButton"
            color="info"
            large
            width="100%"
            @click="makeAnualidades(lote)"
          >
            GENERAR
            <v-icon class="icon">mdi-animation-outline</v-icon>
          </v-btn>

          <v-btn
            class="actionButton"
            width="100%"
            :color="colorAnualidades()"
            large
            @click="storeDatosAnualidades(lote)"
          > 
            GUARDAR
            <v-icon class="icon">mdi-content-save</v-icon>
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
            :items="lote.anualidades"
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
              {{ returnIVA(lote.tipoImpuesto, item.importeSinIVA) }}
            </template>

            <template v-slot:[`item.importeConIVA`]="{ item }">
              <b>{{ returnTotal(lote.tipoImpuesto, item.importeSinIVA) }}</b>
            </template>
          </v-data-table>
          <br/>
        </v-col>
      </v-row>
    <br />

    <!-- 3 PRESUPUESTO DE LICITACIÓN Y ANUALIDADES -->
    <h3>Tramitación</h3>
    <v-row class="rowGroup">
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
    <br/>

    <h3>Desglose</h3>
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
    <h3>Valor Estimado</h3>
    <!--4.1-->
    <v-row class="rowGroup">
      <v-col cols="12" md="4">
        <h5>Importe del valor estimado del contrato</h5>
        <v-text-field
          label="Importe máx. por modificaciones"
          filled
          type="number"
          v-model="datos.maxModificacionesPrevistas"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="8">
        <h5>Totales</h5>
        <v-simple-table class="dataTable">
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
    <br/>
      <!--4.2-->
        <v-col cols="12">
          <h5>Método de cálculo del valor estimado</h5>
          <v-textarea 
            filled auto-grow
            v-model="datos.metodoCalculo"
            ></v-textarea>
        </v-col>
    </v-row>
    <br />

     <!-- 6 DOCUMENTOS QUE REVISTEN CARACTER CONTRACTUAL -->
    <h3>Documentos que revisten carácter contractual</h3>
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
    <h3>Tramitación del procedimiento</h3>
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
    <h3>Incompatibilidades para la licitación</h3>
    <v-row class="rowGroup"> 
      <v-col cols="12">
        <h5 class="subtitle">
          <!--8.1 -->
          Participación en la licitación de las empresas que hubieran participado previamente en la 
          elaboración de las especificaciones técnicas o de los documentos preparatorios del contrato
          o hubieran asesorado al órgano de contratación durante la preparación del procedimiento de 
          contratación [artículo 70.1 LCSP]
        </h5>
      </v-col>

      <v-col cols="12" md="4">
        <h5>Consideración:</h5>
          <v-radio-group v-model="datos.participacionEmpresas">
              <v-radio label="No tiene consideración el contrato que se licita" value="no tiene"></v-radio>
              <v-radio label="Si tiene esa consideración, las siguientes empresas han participado" value="si tiene"></v-radio>
          </v-radio-group>
      </v-col>

      <v-col cols="12" md="8" v-if="datos.participacionEmpresas === 'si tiene'">
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
      impuestos: [21, 7],
      selectAnualidades: 1,
      alertMessage: "",
      itemsAplicacionPrep: ['495A1718620', '495A1718630', '1718495A620'],
      presupuestoSinAsignar: undefined,
      anualidadesGuardadas: false,
      lotesGuardados: false,

      lotesHeaders: [
        { text: "", align: "start", sortable: false, value: "idLote", divider: true,},
        { text: "Base de licitación (sin impuestos) €", align: "end", sortable: false, value: "baseLote", divider: true,},
        { text: "Impuesto aplicable (%)", align: "end", sortable: false, value: "tipoImpuesto", divider: true, width:"5%"},
        { text: "Total Impuestos €", align: "end", sortable: false, value: "totalImpuestos", divider: true,},
        { text: "Costes generales (13%) €", align: "end", sortable: false, value: "costesGenerales", divider: true}, 
        { text: "Beneficio industrial (6%) €", align: "end", sortable: false, value: "beneficioIndustrial", divider: true},
        { text: "Costes Directos (generales + industriales) €", align: "end", sortable: false, value: "costesDirectos", divider: true},
        { text: "Costes Indirectos €", align: "end", sortable: false, value: "costesIndirectos", divider: true},
        { text: "Total costes (sin impuestos) €", align: "end", sortable: false, value: "totalCostes", divider: true},
        { text: "Total (imp. incluidos) €", align: "end", sortable: false, value: "totalLote", divider: true,},
        { text: "Borrar", align: "center", sortable: false, value: "actions", divider: true,},

      ],

      identificacionLotesHeaders: [
        { text: "Lote", align: "start", sortable: false, value: "idLote", divider: true, width:"5%"},
        { text: "Descripción Lote", align: "start", sortable: false, value: "descripcion", divider: true,},
      ],

      anualidadesHeaders: [
        { text: "Año", align: "start", sortable: false, value: "year", divider: true,},
        { text: "Importe (sin impuestos)", align: "end", sortable: false, value: "importeSinIVA", width: "20%", divider: true, },
        { text: "Impuestos (IVA o IGIC en €)", align: "end", sortable: false, value: "IVA", width: "25%", divider: true, },
        { text: "Total (impuestos inc.)", align: "end", sortable: false, value: "importeConIVA", width: "25%" },
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
        justificacionNoDivisionLotes: '',
        numLotes: undefined,
        lotes: [],

        //SECCION 6
        relacionDocsContractual: undefined,
        docsCaracterContractual: "jerarquizada",

        //SECCION 7
        tramitacionProc: undefined,

        //SECCION 8
        participacionEmpresas: "no tiene",
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
        datos.costesDirectos = parseFloat((this.datos.totalCostes / 1.19).toFixed(2));
        datos.costesGenerales = parseFloat((datos.costesDirectos * 0.12999999).toFixed(2));
        datos.beneficioIndustrial = parseFloat((datos.costesDirectos * 0.05999999).toFixed(2));
        

        if(datos.anualidades[0] !== undefined){
          this.calcNoAsign()
        }
        datos.totalEstimado = this.calculoEstimado(this.datos.maxModificacionesPrevistas, this.datos.presupuestoBaseLicitacion);

        //CONDICIONAL LOTES
        if(datos.divisionLotes === 'no es posible' || datos.divisionLotes === 'posible no divisible'){
          datos.numLotes = 1;
          if(datos.lotes.length > 1){
            this.createLotes()
          }
        }


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
    saveLotes(){
      if(this.datos.numLotes === 1){
        this.datos.presupuestoBaseLicitacion = this.datos.lotes[0].baseLote;
      } else {
          for(this.index in this.datos.lotes){
            this.lote = this.datos.lotes[this.index]
            this.lote.totalImpuestos = ((parseFloat(this.lote.baseLote)) * (parseFloat(this.lote.tipoImpuesto) / 100)).toFixed(2);
            this.lote.totalLote = (parseFloat(this.lote.totalImpuestos) + parseFloat(this.lote.baseLote)).toFixed(2)
            this.lote.costesGenerales = parseFloat((this.lote.baseLote * 0.1299999).toFixed(2));
            this.lote.beneficioIndustrial = parseFloat((this.lote.baseLote * 0.059999999).toFixed(2));
            this.lote.costesDirectos = this.lote.costesGenerales + this.lote.beneficioIndustrial;
            this.lote.costesIndirectos = parseFloat(this.lote.baseLote) - this.lote.costesDirectos
          }
      }
      this.lotesGuardados = true;
      console.log(this.datos.lotes)
    },

    deleteLote(idLote){
      for(this.index in this.datos.lotes){
        if(this.datos.lotes[this.index].idLote === idLote){
          this.datos.lotes.splice(this.index,1)
        }
      }
    },

    createLotes(){
      this.datos.lotes = [];
      this.lotesGuardados = false;
      for (let i = 0; i < this.datos.numLotes; i++){
        this.newLote = {
          idLote: i+1,
          descripcion: 'Descripción del lote',
          baseLote: 0,
          tipoImpuesto: 0,
          totalImpuestos: 0,
          totalLote: 0,
          costesDirectos: undefined,
          costesIndirectos: undefined,
          costesGenerales: undefined,
          beneficioIndustrial: undefined,
          selectAnualidades: 1,
          anualidades:[],
        }
        this.datos.lotes.push(this.newLote)
      }

    },

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

    colorLotes(){
      if(this.lotesGuardados === false){
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

    storeDatosAnualidades(lote){
      for(this.index in lote.anualidades){
        this.anualidad = lote.anualidades[this.index];

        this.anualidad.IVA = (this.anualidad.importeSinIVA * (lote.tipoImpuesto / 100)).toFixed(2)
        this.anualidad.importeConIVA = (parseFloat(this.anualidad.importeSinIVA) + parseFloat(this.anualidad.IVA)).toFixed(2)
      }
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

    makeAnualidades(lote) {
      lote.anualidades = [];

      let fecha = new Date();
      let ano = fecha.getFullYear();
      
      for (let i = 0; i < lote.selectAnualidades; i++) {
        const newData = {
          year: ano + i,
          importeSinIVA: 0,
          IVA: this.importeSinIVA * 0.21,
          importeConIVA: this.importeSinIVA + this.IVA,
        };
        lote.anualidades.push(newData);
      }
    },
  

    deleteAnualidades() {
      this.datos.anualidades = [];
      this.presupuestoSinAsignar = undefined;
      this.anualidadesGuardadas = false;
    },

    returnIVA(impuesto, base) {
      impuesto = impuesto / 100;
      this.iva = parseFloat((base * impuesto).toFixed(2));
      return this.iva;
    },

    returnTotal(impuesto, base) {
      this.total = parseFloat(base);
      this.iva = this.returnIVA(impuesto, base);
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

.subRow {
  margin: -1rem 0.25rem 0rem 0.25rem;
}

.caption {
  margin: 0.5rem;
}
</style>
