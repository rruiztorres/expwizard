<template>
  <div>
    <!-- 5 DIVISIÓN EN LOTES -->
    <h3>Presupuesto base de licitación y Lotes
      <v-badge 
          class="badge" color="#c7d6f2" content="?"
          title="Punto 3.1 (Presupuesto Base de Licitación) - Punto 5 (Lotes)"></v-badge >
    </h3>
    <v-row class="rowGroup">
      <v-col cols="12" md="3">
        <h5>¿Se dividirá en lotes?</h5>
        <v-radio-group v-model="datos.divisionLotes">
          <v-radio 
            label="No es posible" 
            value="no es posible"></v-radio>
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
              :value="true"
            ></v-radio>
            <v-radio label="Otra causa:" :value="false"></v-radio>
          </v-radio-group>
        </v-col>

          <v-col cols="12" md="5" v-if="datos.divisionLotes === 'no es posible' && datos.divisionNoPosible === false">
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
                  value="Conlleva riesgo restringir competencia"
                ></v-radio>
                <v-radio
                  label="Realizarlo independiente dificulta o pone en riesgo correcta ejecución"
                  value="Realizarlo independiente dificulta o pone en riesgo correcta ejecución"
                ></v-radio>
                <v-radio
                  label="Otra causa"
                  :value="false"
                ></v-radio>
              </v-radio-group>
            </v-col>

            <!-- OTRAS CAUSAS, JUSTIFICAR -->
            <v-col cols="12" md="5" 
            v-if="datos.divisionLotes === 'posible no divisible' && 
            datos.divisionPosibleDivisible === false"
            >
              <h5>Si es otra causa, justificar:</h5>
              <v-textarea filled v-model="datos.justificacionNoDivisionPosible"></v-textarea>
            </v-col>


        <!-- POSIBLE DIVISIBLE -->
        <v-col cols="12" md="9" v-if="datos.divisionLotes === 'posible divisible'">
          <h5>Limitaciones</h5>
          <v-radio-group v-model="datos.limitacionLotes">
            <v-radio
              label="Se podrá limitar el número de lotes para los que un mismo candidato o licitador pueda presentar oferta"
              value="limitar"
            ></v-radio>
            <v-radio
              label="Cada licitador sólo podrá ser adjudicatario de tantos lotes como conjuntos completos distintos de medios presente con un máximo de 2, salvo que fuese a quedar alguno de los lotes sin adjudicatario, en cuyo caso se adjudicará el lote al licitador, el cual deberá disponer, para su ejecución, de un conjunto completo distinto al ya comprometidos en los otros lotes."
              value="lotes"
            ></v-radio>
            <v-radio
              label="Otras causas"
              value="otras"
            ></v-radio>
          </v-radio-group>
        </v-col>


        <v-row class="subRow">
          <v-col cols="12" md="2" v-if="datos.divisionLotes === 'posible divisible'">
            <v-text-field
            label="Nº Lotes"
            filled type="number"
            dense
            v-model="datos.numLotes" 
            :disabled="datos.divisionLotes !== 'posible divisible'"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-btn x-large class="actionButton" color="info" width="100%" @click="createLotes">
              INTRODUCIR DATOS
              <v-icon class="icon">mdi-pencil</v-icon>
            </v-btn>
            <br/>
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
                    class="adjustHeight"
                    :items="impuestos"
                    item-text="tipo"
                    item-value="valor"
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


              <!-- COSTES GENERALES 13% (AUTO)-->
              <template v-slot:[`item.costesGenerales`]="props">
                  {{
                    (((parseFloat(props.item.baseLote)) / 1.19) * 0.13).toFixed(2)
                  }}
              </template>

               <!-- BENEFICIO INDUSTRIAL (AUTO)-->
              <template v-slot:[`item.beneficioIndustrial`]="props">
                  {{
                    (((parseFloat(props.item.baseLote)) / 1.19) * 0.06).toFixed(2)
                  }}
              </template>

              <!-- TOTAL COSTES DIRECTOS (gen + ind)-->
              <template v-slot:[`item.costesIndirectos`]="props">
                  {{
                    ((parseFloat(props.item.baseLote)) - (parseFloat(props.item.baseLote) / 1.19)).toFixed(2)
                  }}
              </template>

              <!-- TOTAL COSTES DIRECTOS -->
              <template v-slot:[`item.costesDirectos`]="props">
                  {{
                    ((parseFloat(props.item.baseLote)) / 1.19).toFixed(2)
                  }}
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

           <v-col cols="12" md="3">
              <v-btn
              v-if="datos.lotesGuardados === false"
              class="actionButton"
              width="100%" 
              large dark
              :color="colorLotes()"  
              @click="saveLotes"
              :disabled="datos.lotes.length === 0"
              >
                GUARDAR DATOS
                <v-icon class="icon">mdi-content-save</v-icon>
              </v-btn>
              <v-btn
              v-else
              class="actionButton" 
              color="grey" dark
              width="100%"
              large
              >
              GUARDADO CORRECTO
              <v-icon class="icon">mdi-check-all</v-icon>
            </v-btn>
          </v-col>

        </v-row>
    </v-row>
    <br />

    <!-- 3.1 TRAMITACIÓN -->
    <h3>Tramitación
      <v-badge 
          class="badge" color="#c7d6f2" content="?"
          title="Punto 3.1 (Presupuesto Base de Licitación)"></v-badge >
    </h3>
    <v-row class="rowGroup">
      <v-col cols="12" md="4">
        <v-select 
          filled
          multiple
          label="Aplicación presupuestaria" 
          :items="itemsAplicacionPrep" 
          v-model="datos.aplicacionPrep"
        >
        </v-select>
      </v-col>

      <v-col cols="12" sm="4">
        <v-radio-group class="aplicacionPrep" v-model="datos.tramitacion">
          <v-radio label="Tramitación ordinaria" :value="true"></v-radio>
          <v-radio label="Tramitación anticipada" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <br/>

    <h3>Desglose
      <v-badge 
          class="badge" color="#c7d6f2" content="?"
          title="Punto 3.2 (Desglose)"></v-badge >
    </h3>
    <v-row class="rowGroup">
      <v-col cols="12" sm="2">
        <v-radio-group v-model="datos.desglose">
          <v-radio label="Procede" :value="true"></v-radio>
          <v-radio label="No procede" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col cols="12" sm="3" v-if="datos.desglose === true ">
        <v-radio-group v-model="datos.tipoDesglose">
          <v-radio label="Por género" :value="true"></v-radio>
          <v-radio label="Por Categoría profesional" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        v-if="datos.desglose === true && datos.tipoDesglose === true"
      >
        <v-radio-group v-model="datos.tipoDesgloseGenero">
          <v-radio label="No consta diferencia de costes por razón de género" :value="true"></v-radio>
          <v-radio label="Existe diferencia de costes por razón de género" :value="false"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col
        v-if="datos.desglose === 'procede' && datos.tipoDesglose === false"
        cols="12"
        md="7"
      ><v-textarea label="Indicar como se desglosa:" filled></v-textarea>
      </v-col>
    </v-row>
    <br />
    

    <h3>Anualidades
      <v-badge 
          class="badge" color="#c7d6f2" content="?"
          title="Punto 3.3 (Anualidades)"></v-badge >
    </h3>
    <v-row class="rowGroup">
      <v-col cols="12">
        <div v-if="datos.lotes.length !== 0">
          <v-row v-for="lote in datos.lotes" :key="lote.id">
            <v-col cols="12" v-if="datos.lotes.length > 1">
              Anualidades lote nº {{lote.idLote}}: <b>{{lote.descripcion}}</b>
              <br/>
              Presupuesto base lote: <b>{{lote.baseLote}}</b>
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
            </v-col>
            <v-col cols="12" md="7">
              <v-data-table
                class="dataTable"
                :headers="anualidadesHeaders"
                :items="lote.anualidades"
                hide-default-footer
              >
                <template v-slot:[`item.importeSinIVA`]="props" v-if="datos.anualidadesGuardadas == false">
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

              <!-- ALERTAS VALIDACION -->
              <v-alert v-if="lote.alert === undefined" type="info">No se han introducido datos</v-alert>
              <v-alert v-if="lote.alert === false" type="success">Datos Correctos</v-alert>
              <v-alert v-if="lote.alert === true" type="error">La suma de las anualidades no coincide con el presupuesto base</v-alert>

            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-alert type="info">Guarde los datos del presupuesto si desea introducir anualidades</v-alert>
        </div>
      </v-col>
      <br/>

      <v-row class="subRow">
        <v-col cols="12" md="5">
          <v-btn
          v-if="datos.lotes.length >= 1 && datos.anualidadesGuardadas === false"
          color="green" class="actionButton" dark
          width="100%"
          large
          @click="saveAnualidades"
          >
            GUARDAR DATOS
            <v-icon class="icon">mdi-content-save</v-icon>
          </v-btn>

          <v-btn
          v-if="datos.anualidadesGuardadas === true"
          color="grey" class="actionButton" dark
          width="100%"
          large
          >
            GUARDADO CORRECTO
            <v-icon class="icon">mdi-check-all</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-row>
    <br />


    <!-- 25 MODIFICACIONES -->
    <h3>Modificación del contrato
      <v-badge 
          class="badge" color="#c7d6f2" content="?"
          title="Punto 24.1 (Modificaciones previstas)"></v-badge >
    </h3>
      <v-row class="rowGroup">
          <v-col cols="12" md="4">
              <h5>Modificaciones previstas [artículo 204 LCSP]</h5>
              <h5 class="subtitle">Se prevén:</h5>
              <v-radio-group v-model="datos.preveModif">
                  <v-radio label="Si" :value="true"></v-radio>
                  <v-radio label="No" :value="false"></v-radio>
              </v-radio-group>
          </v-col>

          <v-col cols="12" md="8" v-if="datos.preveModif === true">
              <h5>En caso afirmativo indicar motivo:</h5>
              <h5 class="subtitle">Descripción precisa de los supuestos en que podrá modificarse el contrato:</h5>
              <v-radio-group v-model="datos.tipoModif">
                  <v-radio label='A) Por necesidad de variar el número de unidades previstas en el contrato.' value="numeroUnidades"></v-radio>
                  <v-radio label='B) Por necesidad de incorporar nuevos apartados en los informes ya previstos en el contrato, debido a la necesidad de incorporar adaptaciones exigidas por normas técnicas aprobadas después de la licitación del contrato.' value="nuevosApartados"></v-radio>
                  <v-radio label='C) Por necesidad de incorporar ensayos de auscultación como consecuencia de la aparición de nuevas tipologías estructurales o materiales no previstos inicialmente' value="ensayosAuscultacion"></v-radio>
              </v-radio-group>
          </v-col>

          <!-- CASO NUMERO UNIDADES -->
          <v-row class="subRow" cols="12" v-if="datos.preveModif === true">
              <v-col cols="12" md="2">
                  <h5 class="subtitle">Indicar porcentaje:</h5>
                    <v-text-field 
                  filled label="%" v-model="datos.porcentajeModificacion"
                  :rules="[rules.max, rules.required, rules.zero]"
                  >
                  </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                  <ul>
                      <li>Presupuesto base: <b>{{datos.presupuestoBaseLicitacion}} €</b></li>
                      <li><i>Porcentaje máximo respecto del presupuesto base de licitación: <b>20%</b> se sumará al valor estimado.</i></li>
                  </ul>
                  <br/>                                 
              </v-col>
              <v-col cols="12" md="6" v-if="datos.tipoModif === 'numeroUnidades'">
                  <i>
                      <b>ATENCIÓN:</b>
                      En este caso será siempre necesario que las nuevas unidades sean iguales a las previamente
                      definidas en el contrato inicial y que se abonen en el mismo precio unitario.
                  </i>
              </v-col>
              <v-col cols="12" md="6" v-else>
                  <i>
                      <b>ATENCIÓN:</b>
                      Será necesario que los precios del contrato inicial se hubieran 
                      definido descomponiéndose en sus costes elementales y que los precios 
                      de las nuevas prestaciones puedan formarse en su totalidad con dichos 
                      costes elementales. Cuando no se cumpla este requisito la 
                      modificación solo podrá tramitarse al amparo del artículo 205 de la LCSP
                  </i>
              </v-col>
          </v-row>
      </v-row>
    <br/>

    <!-- 18.- PLAZO DE EJECUCIÓN O DURACION -->
      <h3>Plazo de ejecución o duración</h3>
      <v-row class="rowGroup">
        <v-row class="subRow">
          <v-col cols="12">
              <h5 class="subtitle">Se define como:</h5>
              <v-radio-group v-model="datos.definicion">
                  <v-radio label="Un contrato con plazo de ejecución" :value="true"></v-radio>
                  <v-radio label="Un contrato con plazo de duración" :value="false"></v-radio>
              </v-radio-group>
          </v-col>
          
          <!-- Seleccion modo plazo ejecucion -->
          <v-col cols="12" md="3" v-if="datos.definicion === true">
            <h5 class="subtitle">Seleccionar modalidad</h5>
            <v-radio-group v-model="datos.modalidad">
                <v-radio label="Plazo máximo de ejecución" :value="true"></v-radio>
                <v-radio label="Plazos parciales" :value="false"></v-radio>
            </v-radio-group>
          </v-col>

          <!-- Plazo ejecucion meses -->
          <v-col cols="12" md="2" v-if="datos.definicion === true && datos.modalidad === true">
            <h5 class="subtitle">Plazo ejecución:</h5>
            <br/>
            <v-text-field filled label="Meses" type="number" v-model="datos.plazoMaximoEjecucion"></v-text-field>
          </v-col>

          <!-- Plazo ejecución observaciones -->
          <v-col cols="12" md="7" v-if="datos.definicion === true && datos.modalidad === true">
            <h5 class="subtitle">Observaciones:</h5>
            <br/>
            <v-textarea auto-grow filled v-model="datos.plazoMaximoEjecucionObservaciones"></v-textarea>
          </v-col>
          <!-- fin modo plazo ejecucion -->



          <!-- Plazos parciales-->
          <v-col cols="12" md="9" v-if="datos.definicion === true && datos.modalidad === false">
            <h5 class="subtitle">Indicar plazos parciales:</h5>
            <br/>
            <v-textarea auto-grow filled v-model="datos.plazosParciales"></v-textarea>
          </v-col>

          <!--Plazo de duración modalidad-->
          <v-col cols="12" md="4" v-if="datos.definicion === false">
            <h5 class="subtitle">Seleccionar modalidad</h5>
            <v-radio-group v-model="datos.modoPlazo">
              <v-radio label="Plazo en meses" :value="true"></v-radio>
              <v-radio label="Periodo" :value="false"></v-radio>
            </v-radio-group>
          </v-col>

          <!-- Plazo de duración modalidad > periodo -->
          <v-col cols="12" md="8" v-if="datos.definicion === false && datos.modoPlazo === false">
            <h5 class="subtitle">Periodo</h5>
            <br/>
            <v-textarea auto-grow filled label="Meses" v-model="datos.periodo"></v-textarea>
          </v-col>

          <!-- Plazo de duración modalidad > meses -->
          <v-col cols="12" md="3" v-if="datos.definicion === false && datos.modoPlazo === true">
            <h5 class="subtitle">Introducir plazo en meses</h5>
            <br/>
            <v-text-field filled label="Meses" v-model="datos.plazoMeses"></v-text-field>
          </v-col>
        </v-row>

        <!-- Prorroga -->
        <v-col cols="12" v-if="datos.definicion === false">
            <v-row>
              <v-col cols="12" md="4">
                <h5 class="subtitle">Ampliación en el plazo de ejecución (Prórroga)</h5>
                <v-radio-group v-model="datos.prorroga">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="8">
                <v-row>
                  <v-col cols="12" md="3" v-if="datos.prorroga === true">
                    <h5 class="subtitle">Plazo prórroga:</h5>
                    <br/>
                    <v-text-field filled label="plazo"  type="number" v-model="datos.plazoProrroga"></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4" v-if="datos.prorroga === true">
                    <h5 class="subtitle">Seleccionar</h5>
                    <br/>
                    <v-select filled :items="tipoPlazo" v-model="datos.tipoPlazoProrroga"></v-select>
                  </v-col>

                  <v-col cols="12" md="5" v-if="datos.prorroga === true">
                    <h5 class="subtitle">Importe prórroga:</h5>
                    <br/>
                    <v-text-field filled label="Introducir importe" type="number" v-model="datos.importeProrrogas"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" v-if="datos.prorroga === true">
                    <h5 class="subtitle">Observaciones</h5>
                    <v-textarea filled auto-grow v-model="datos.plazoProrrogaObservaciones"></v-textarea>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
        </v-col>  
        <!-- fin modo plazos parciales --> 

        <!-- El contrato se iniciará -->
        <v-col cols="12">
            <v-row>
              <v-col cols="12" md="4">
                <h5 class="subtitle">El plazo del contrato se iniciará:</h5>
                <v-radio-group v-model="datos.plazoInicio">
                    <v-radio label="Al día siguiente al de formalización" :value="true"></v-radio>
                    <v-radio label="Otro plazo" :value="false"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" md="8" v-if="datos.plazoInicio === false">
                  <h5 class="subtitle">Observaciones:</h5>
                  <br/>
                  <v-text-field filled label="Observaciones" v-model="datos.fechaInicioObservaciones"></v-text-field>
              </v-col>
            </v-row>
        </v-col>       
      </v-row>
    <br/>

    <!-- 4 VALOR ESTIMADO -->
    <h3>Valor Estimado</h3>
    <!--4.1-->
      <v-row class="rowGroup">
        <v-col cols="12">
          <h5>Total contrato</h5>
          <v-simple-table class="dataTable">
            <thead>
              <tr>
                <th>Importe de los servicios</th>
                <th>Importe máximo por modificaciones previstas</th>
                <th>Importe eventuales prórrogas</th>
                <th>TOTAL VALOR ESTIMADO DEL CONTRATO, sin impuestos (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{datos.presupuestoBaseLicitacion}}</td>
                <td>{{datos.importeModificacion}}</td>
                <td>{{datos.importeProrrogas}}</td>
                <td><b>{{calculoImporteModif(datos.presupuestoBaseLicitacion, datos.importeModificacion, datos.importeProrrogas)}}</b></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
        <br/>
        <v-col v-if="datos.lotes.length > 1">
          <h5>Valor estimado para los lotes</h5>
          <v-simple-table class="dataTable">
            <thead>
              <tr>
                <th>Lote</th>
                <th>Descripción</th>
                <th>Valor estimado para cada lote, sin impuestos (€)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="lote in datos.lotes" :key="lote.idLote">
                <td>{{lote.idLote}}</td>
                <td>{{lote.descripcion}}</td>
                <td><b>{{lote.baseLote}}</b></td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>


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


    <h3>Lugar de prestación:</h3>
    <v-row class="rowGroup">
      <v-col cols="12">
        <h5 class="subtitle">La empresa adjudicataria está autorizada a ejecutar los servicios objeto del contrato, o parte de los mismos, en las siguientes dependencias:</h5>
        <v-textarea filled auto-grow v-model="datos.lugarPrestacion"></v-textarea>
      </v-col>
    </v-row>
    <br/> 

    <!-- 6 DOCUMENTOS QUE REVISTEN CARACTER CONTRACTUAL -->
    <h3>Documentos que revisten carácter contractual</h3>
    <v-row class="rowGroup">
      <v-col cols="12">
      <h5>A los efectos del artículo 35 de la LCSP, la relación de documentos que revisten carácter contractual está enumerada en la CLÁUSULA 6 en el orden en que aparecen</h5>
          <v-radio-group v-model="datos.docsCaracterContractual">
              <v-radio label="Jerarquizada" :value="true"></v-radio>
              <v-radio label="No jerarquizada" :value="false"></v-radio>
          </v-radio-group>
      </v-col>
    </v-row>
    <br />

    <!-- 7 TRAMITACIÓN DEL PROCEDIMIENTO -->
    <h3>Procedimiento</h3>
    <v-row class="rowGroup">
      <v-col cols="12">
        <h5>Seleccionar tramitación del procedimiento</h5>
          <v-radio-group v-model="datos.tramitacionProc">
              <v-radio label="Ordinaria" :value="true"></v-radio>
              <v-radio label="Urgente, (Se acompañará la correspondiente declaración de urgencia). En este caso, los plazos mencionados en este pliego para la licitación, adjudicación y formalización del contrato se reducirán a la mitad, con las excepciones previstas en el artículo 119.2 de la LCSP." :value="false"></v-radio>
          </v-radio-group>
      </v-col>
    </v-row>
    <br />
  </div>
</template>

<script>
export default {
  name: "PresupuestoAnualidades",
  props:['datosGuardados'],
  
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateInicio: '',
      dateFin: '',


      anualidades: [2, 3, 4, 5],
      impuestos: [
        {tipo: 'IVA', valor: 21},
        {tipo: 'IGIC', valor: 7}
      ],
      itemsAplicacionPrep: ['1718495A620'],
      rules: {
          required: (value) => !!value || "Este campo es obligatorio.",
          max: (value) => value <= 20 || "Se supera el máximo permitido (20% presupuesto base)",
          zero: (value) => value > 0 || "El importe no puede ser igual a 0",
      },

      lotesHeaders: [
        { text: "", align: "start", sortable: false, value: "idLote", divider: true,},
        { text: "Base de licitación (sin impuestos) €", align: "end", sortable: false, value: "baseLote", divider: true,},
        { text: "Impuesto aplicable (%)", align: "end", sortable: false, value: "tipoImpuesto", divider: true, width:"5%"},
        { text: "Total Impuestos €", align: "end", sortable: false, value: "totalImpuestos", divider: true,},
        { text: "Costes generales (13%) €", align: "end", sortable: false, value: "costesGenerales", divider: true}, 
        { text: "Beneficio industrial (6%) €", align: "end", sortable: false, value: "beneficioIndustrial", divider: true},
        { text: "Costes Indirectos (generales + industriales) €", align: "end", sortable: false, value: "costesIndirectos", divider: true},
        { text: "Costes Directos €", align: "end", sortable: false, value: "costesDirectos", divider: true},
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

      tipoPlazo: ['dias', 'meses', 'años'],

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
        tramitacion: true,
        desglose: 'no procede',
        tipoDesglose: undefined,
        tipoDesgloseGenero: undefined,
        anualidadesGuardadas: false,
        tipoImpuesto: undefined,
        porcentajeImpuesto: undefined,
        totalImpuestos: undefined,
        costesIndirectos: undefined,
        totalImpInc: undefined,


        //SECCION 4
        totalEstimado: undefined,
        metodoCalculo: 'Para calcular el valor estimado se han tenido en cuenta los costes derivados de la aplicación de la normativa laboral vigente. Además, se han tenido en cuenta los apartados 2 y 10 del artículo 101 de la LCSP.',
  
        
        
        //SECCIÓN 5
        divisionLotes: 'no es posible',
        divisionNoPosible: 'naturaleza objeto',
        divisionPosibleDivisible: undefined,
        justificacionNoDivisionLotes: '',
        justificacionNoDivisionPosible: '',
        numLotes: 1,
        hayLotes: false,
        lotes: [],
        limitacionLotes: undefined,
        lotesGuardados: false,
        hayDivisionLotes: false,
        posibleNoDivisible: false,
        posibleDivisible: false,

        //SECCION 6
        docsCaracterContractual: "jerarquizada",

        //SECCION 7
        tramitacionProc: true,

        //SECCION 25
        preveModif: false,
        importeModificacion: undefined,
        porcentajeModificacion: 0,
        maxModificacionesPrevistas: undefined,
        hasNumeroUnidades: false,
        hasNuevosApartados: false,
        hasEnsayos: false,
        importeProrrogas: 0,
        importeNumUnid: undefined,
        totalModificaciones: undefined,
        tipoPlazoProrroga: 'meses',

        //SECCUION 18
        definicion: true,
        plazoEjecucion: '',
        plazoMaximoEjecucion: undefined,
        plazoMaximoEjecucionObservaciones: '',
        plazosParciales: '',
        modalidad: true,
        plazoMeses: '',
        modoPlazo: true,
        prorroga: 'no',
        plazoProrroga: '',
        plazoProrrogaObservaciones: '',
        plazoInicio: true,
        fechaInicioObservaciones: '',
        lugarPrestacion: '',
      },
    };
  },

  watch:{
    datos: {
      deep: true,
      handler(datos){
        //CONDICIONAL LOTES
        if(datos.divisionLotes === 'no es posible' || datos.divisionLotes === 'posible no divisible'){
          datos.numLotes = 1;
          if(datos.lotes.length > 1){
            this.createLotes()
          }
        }

        //VALIDACIONES SUMA BASE ANUALIDADES
        if(datos.lotes.length !== 0){
          for(this.index in datos.lotes){
            let totalLote = 0;
            if(datos.lotes[this.index].anualidades.length !== 0){
              for(this.anualidad in datos.lotes[this.index].anualidades)
              totalLote = totalLote + (parseFloat(datos.lotes[this.index].anualidades[this.anualidad].importeSinIVA))
              if(totalLote !== parseFloat(datos.lotes[this.index].baseLote)){
                datos.lotes[this.index].alert = true;
              } else {
                datos.lotes[this.index].alert = false;
              }
            }     
          }
        }

        //MODIFICACIONES
        if(datos.preveModif === 'si'){
          this.base = parseFloat(this.datos.presupuestoBaseLicitacion)
          this.datos.importeNumUnid = this.base * 0.20
        } 
        
        //CONSISTENCIA DE DATOS
        if(datos.divisionLotes !== 'no es posible'){
          if(datos.divisionLotes === "posible no divisible"){
            this.datos.posibleNoDivisible = true
            datos.hayDivisionLotes = false
            datos.posibleDivisible = false
          } else {
            datos.hayDivisionLotes = true
            datos.posibleNoDivisible = false
            datos.posibleDivisible = true
          }
        } 

        if(datos.divisionPosibleDivisible !== false){
          this.datos.justificacionNoDivisionPosible = datos.divisionPosibleDivisible
        }

        if(datos.tipoModif === 'numeroUnidades') { 
          datos.hasNumeroUnidades = true;
          datos.hasNuevosApartados = false;
          datos.hasEnsayos = false; 
        }
        else if (datos.tipoModif === 'nuevosApartados') { 
          datos.hasNumeroUnidades = false;
          datos.hasNuevosApartados = true;
          datos.hasEnsayos = false; 
        }
        else if (datos.tipoModif === 'ensayosAuscultacion') { 
          datos.hasNumeroUnidades = false;
          datos.hasNuevosApartados = false;
          datos.hasEnsayos = true; 
        }

        if(datos.porcentajeModificacion > 0){
          datos.importeModificacion = parseFloat((parseFloat(datos.presupuestoBaseLicitacion) * (parseInt(datos.porcentajeModificacion) / 100)).toFixed(2))
        } else {
          datos.importeModificacion = 0;
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
    calculoImporteModif(base, modif1, modif2){
      if (modif1 !== undefined || modif2 !== undefined){
        this.datos.totalModificaciones = (parseFloat(base) + parseFloat(modif1) + parseFloat(modif2)).toFixed(2);
        return (this.datos.totalModificaciones)
      }
    },

    saveAnualidades(){
      for(this.index in this.datos.lotes){
        this.lote = this.datos.lotes[this.index];
        for(this.anualidad in this.lote.anualidades){
          this.elemento = this.lote.anualidades[this.anualidad]
          this.elemento.IVA = (parseFloat(this.elemento.importeSinIVA) * 0.21).toFixed(2);
          this.elemento.importeConIVA = parseFloat(this.elemento.IVA) + parseFloat(this.elemento.importeSinIVA);
        }
      }
      this.datos.anualidadesGuardadas = true;
      console.log(this.datos)
    },

    saveLotes(){
      if(this.datos.numLotes === 1){
        this.datos.presupuestoBaseLicitacion = this.datos.lotes[0].baseLote;
        this.datos.porcentajeImpuesto = this.datos.lotes[0].tipoImpuesto;
        if(this.datos.porcentajeImpuesto === 21){this.datos.tipoImpuesto = 'IVA'} else {this.datos.tipoImpuesto = 'IGIC'}
          this.datos.totalImpuestos = (parseFloat(this.datos.presupuestoBaseLicitacion)) * 0.21
          this.datos.costesDirectos = (parseFloat(this.datos.presupuestoBaseLicitacion)) / 1.19
          this.datos.costesIndirectos = (parseFloat(this.datos.presupuestoBaseLicitacion)) - this.datos.costesDirectos
          this.datos.beneficioIndustrial = (this.datos.costesDirectos * 0.06).toFixed(2)
          this.datos.costesGenerales = (this.datos.costesDirectos * 0.13).toFixed(2)
          this.datos.costesDirectos = (this.datos.costesDirectos).toFixed(2)
          this.datos.costesIndirectos = (this.datos.costesIndirectos).toFixed(2)
          this.datos.totalCostes = (parseFloat(this.datos.presupuestoBaseLicitacion)).toFixed(2)
          this.datos.totalImpuestos = (this.datos.totalImpuestos).toFixed(2)
          this.datos.totalImpInc = (parseFloat(this.datos.presupuestoBaseLicitacion) + parseFloat(this.datos.totalImpuestos)).toFixed(2)
      } else {
          this.datos.hayLotes = true;
          this.datos.presupuestoBaseLicitacion = 0;
          for(this.index in this.datos.lotes){
            this.lote = this.datos.lotes[this.index]
            this.datos.presupuestoBaseLicitacion = this.datos.presupuestoBaseLicitacion + parseFloat(this.lote.baseLote)
            this.lote.totalImpuestos = ((parseFloat(this.lote.baseLote)) * (parseFloat(this.lote.tipoImpuesto) / 100)).toFixed(2);
            this.lote.totalLote = (parseFloat(this.lote.totalImpuestos) + parseFloat(this.lote.baseLote)).toFixed(2)
            this.lote.costesGenerales = parseFloat((this.lote.baseLote * 0.1299999).toFixed(2));
            this.lote.beneficioIndustrial = parseFloat((this.lote.baseLote * 0.059999999).toFixed(2));
            this.lote.costesDirectos = this.lote.costesGenerales + this.lote.beneficioIndustrial;
            this.lote.costesIndirectos = parseFloat(this.lote.baseLote) - this.lote.costesDirectos
          }
      }
      this.datos.lotesGuardados = true;
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
      this.datos.lotesGuardados = false;
      for (let i = 0; i < this.datos.numLotes; i++){
        this.newLote = {
          idLote: i+1,
          descripcion: 'Descripción del lote',
          baseLote: 0,
          tipoImpuesto: 21,
          totalImpuestos: 0,
          totalLote: 0,
          costesDirectos: undefined,
          costesIndirectos: undefined,
          costesGenerales: undefined,
          beneficioIndustrial: undefined,
          selectAnualidades: 2,
          anualidades:[],
          alert: undefined,
        }
        this.datos.lotes.push(this.newLote)
      }

    },

    initialize(){
      if(this.datosGuardados !== undefined){
        this.datos = this.datosGuardados
      }
    },

    colorLotes(){
      if(this.datos.lotesGuardados === false){
        return "success"
      } else {
        return "grey"
      }
    },

    makeAnualidades(lote) {
      this.datos.anualidadesGuardadas = false;
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

.adjustHeight{
  margin: 0.7rem 0rem 0rem 0rem;
}

</style>
