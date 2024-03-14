<template>
  <div>
    <!-- DIVISIÓN EN LOTES -->
    <div class="group">
      <h3>Presupuesto base de licitación y Lotes
          <v-badge 
          class="badge" color="#c7d6f2" content="?"
          title="Punto 3.1 (Presupuesto Base de Licitación) - Punto 5 (Lotes)"
          ></v-badge >
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

          <!-- OTRA CAUSA JUSTIFICAR -->
          <v-col cols="12" md="5" v-if="datos.divisionLotes === 'no es posible' && datos.divisionNoPosible === false">
            <h5>Si es otra causa, justificar:</h5>
            <v-textarea auto-grow filled v-model="datos.justificacionNoDivisionLotes"></v-textarea>           
          </v-col>

          <!-- JUSTIFICACION ES POSIBLE PERO NO SE DIVIDE -->
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

          <!-- JUSTIFICACION OTRAS CAUSAS -->
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

          <v-row class="subRow" dense style="margin: -1rem 0rem -1rem 1rem;" v-if="datos.divisionLotes === 'posible divisible'">
            <v-col cols="12">
            <h5>¿Cuantos lotes desea crear?</h5>
            </v-col>
          </v-row>
          <v-row class="subRow">
            <v-col cols="12" md="1" v-if="datos.divisionLotes === 'posible divisible'">
              <v-text-field dense
              filled type="number"
              :min="2"
              v-model="datos.numLotes" 
              :disabled="datos.divisionLotes !== 'posible divisible'"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="2" v-if="datos.divisionLotes === 'posible divisible'">
              <v-btn
                @click="createLotes"
                style="height:2.6rem;" color="info" light>Crear Lotes
                <v-icon small class="icon">mdi-pencil</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" md="3" v-if="datos.divisionLotes !== 'posible divisible'">
              <v-btn class="actionButton" color="info" width="100%" @click="createLotes">
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
                    <v-edit-dialog
                    large persistent
                    cancel-text="Cancelar"
                    save-text="Guardar"
                    :return-value.sync="props.item.descripcion" >                
                      
                      <span class="editField">{{props.item.descripcion}}</span>
                      
                      <template v-slot:input>
                        <v-text-field
                          v-model="props.item.descripcion"
                          label="Edit"
                          single-line
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                </template>
              </v-data-table>
            </v-col>
          
            <!-- DATA TABLE PRESUPUESTOS BASE COSTES -->
            <v-col cols="12">
              <v-data-table
                dense
                class="dataTable"
                :items="datos.lotes"
                :headers="lotesHeaders"
                hide-default-footer
                no-data-text="No se han introducido datos aun"
              >     
                <!-- BASE DE LICITACION SIN IMPUESTOS -->
                <template v-slot:[`item.baseLote`]="props">
                    <v-edit-dialog large
                    persistent
                    cancel-text="Cancelar"
                    save-text="Guardar"
                    @save="updateLotes"
                    :return-value.sync="props.item.baseLote">
                      <span class="editField">{{currencyFormat(props.item.baseLote)}}</span>
                      <template v-slot:input>
                        <v-text-field
                        v-model="props.item.baseLote"
                        label="Editar"
                        single-line
                        type="number"
                        ></v-text-field>
                      </template>
                    </v-edit-dialog>
                </template>

                <!-- IMPUESTO APLICABLE -->
                <template v-slot:[`item.tipoImpuesto`]="props">
                  <v-edit-dialog large persistent
                  cancel-text="Cancelar"
                  save-text="Guardar"
                  @save="updateLotes"
                  :return-value.sync="props.item.tipoImpuesto">
                    <!-- MOSTRAR DATOS -->
                    <span class="editField">{{parseFloat(props.item.tipoImpuesto)}} %</span>
                    <!-- INTRODUCIR DATOS -->
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

                <!-- TOTAL IMPUESTOS -->
                <template v-slot:[`item.totalImpuestos`]="props">
                  {{currencyFormat(props.item.totalImpuestos)}}
                </template>

                <!-- TOTAL (IMP.INCLUIDOS) -->
                <template v-slot:[`item.totalLote`]="props">
                  {{currencyFormat(props.item.totalLote)}}
                </template>

                <!-- DESGLOSE DEL PRESUPUESTO BASE DE LICITACIÓN -->
                <template v-slot:[`item.costesIndirectos`]="props">
                    <table dense class="tableDesglose">
                      <thead>
                        <tr class="bgLigthGray">
                          <th rowspan="2" class="desgloseElmHeader">Costes Directos <sup>1</sup></th>
                          <th colspan="2" class="desgloseElmHeader">Costes Indirectos <sup>2</sup></th>
                          <th rowspan="2" class="desgloseElmHeader">Presupuesto Base de licitación <sup>1+2</sup></th>
                        </tr>
                        <tr style="background-color: #e3e3e3;">
                          <th class="desgloseElmHeader">Costes Generales</th>
                          <th class="desgloseElmHeader">Beneficio Industrial</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bgWhite">
                          <!-- COSTES DIRECTOS -->
                          <td class="desgloseElmBody">
                           {{currencyFormat(props.item.costesDirectos)}}
                          </td>
                          <!-- COSTES GENERALES -->
                          <td class="desgloseElmBody">
                            <v-form ref="costesGeneralesForm" v-model="costesGeneralesValid" lazy-validation>
                              <v-edit-dialog  
                                persistent large
                                @save="updateLotes"
                                save-text="GUARDAR"
                                cancel-text="CANCELAR"
                                >
                                  <!-- MOSTRAR DATOS -->
                                  <table><tbody><tr>
                                    <td style="width:4rem; padding-top:0.3rem;"><span class="editField">{{`${props.item.porcCostesGenerales} %`}}</span></td>
                                    <td style="padding-top:0.3rem;">{{currencyFormat(props.item.costesGenerales)}}</td>
                                  </tr></tbody></table>
                                  <!-- INTRODUCIR DATOS -->
                                  <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.porcCostesGenerales"
                                    label="Editar"
                                    type="number"
                                    single-line
                                    persistent-hint
                                    :rules="[rules.min13]"
                                    hint="Valor recomendado 13%"
                                    ></v-text-field>
                                  </template>
                              </v-edit-dialog>
                            </v-form>
                          </td>
                          <!-- BENEFICIO INDUSTRIAL -->
                          <td class="desgloseElmBody">
                            <v-edit-dialog large 
                            cancel-text="Cancelar"
                            save-text="Guardar"
                            @save="updateLotes"
                            >
                              <!-- MOSTRAR DATOS -->
                              <table><tbody><tr>
                                <td style="width:4rem; padding-top:0.3rem;"><span class="editField">{{`${props.item.porcBeneficioIndustrial} %`}}</span></td>
                                <td style="padding-top:0.3rem;">{{currencyFormat(props.item.beneficioIndustrial)}}</td>
                              </tr></tbody></table>
                              <!-- INTRODUCIR DATOS -->
                              <template v-slot:input>
                                <v-text-field
                                type="number"
                                v-model="props.item.porcBeneficioIndustrial"
                                label="Editar"
                                single-line
                                persistent-hint
                                hint="Valor recomendado 6%"
                                ></v-text-field>
                              </template>
                            </v-edit-dialog>
                          </td>
                          <!-- PRESUPUESTO BASE DE LICITACIÓN -->
                          <td class="desgloseElmBody">
                            {{currencyFormat(props.item.baseLote)}}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </template>

                <!-- BORRAR-->
                <template v-slot:[`item.actions`]="props">
                    <v-icon color="red" @click="deleteLote(props.item.idLote)">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
      </v-row>
    </div>

    <!-- TRAMITACIÓN -->
    <div class="group">
      <h3>Tramitación
        <v-badge 
            class="badge" color="#c7d6f2" content="?"
            title="Punto 3.1 (Presupuesto Base de Licitación)"></v-badge >
      </h3>
      <v-row class="rowGroup">
        <v-col cols="12" md="4">
          <v-text-field
            v-model="datos.aplicacionPrep"
            prepend-icon="mdi-delete-empty"
            @click:prepend="(()=>datos.aplicacionPrep = '')"
            @click="(()=>showAplicacionPresWindow = true)"
            label="Aplicación presupuestaria" filled>
          </v-text-field>

          <!-- DIALOGO APLICACION PRESUPUESTARIA -->
          <v-overlay
            :value="showAplicacionPresWindow">
            <AplicacionPres
              :inputData="datos.aplicacionPrep"
              @close="(()=>showAplicacionPresWindow = false)" 
              @aplicPres="((data)=>datos.aplicacionPrep = data)"
            ></AplicacionPres>
          </v-overlay>
        </v-col>

        <v-col cols="12" sm="4">
          <v-radio-group class="aplicacionPrep" v-model="datos.tramitacion">
            <v-radio label="Tramitación ordinaria" :value="true"></v-radio>
            <v-radio label="Tramitación anticipada" :value="false"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>

      
    </div>
    
    <!-- DESGLOSE -->
    <div class="group">
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
    </div>

    <!-- ANUALIDADES -->
    <div class="group">
      <h3>Anualidades
        <v-badge 
            class="badge" color="#c7d6f2" content="?"
            title="Punto 3.3 (Anualidades)"></v-badge >
      </h3>
      <v-row class="rowGroup">
        <v-col cols="12">
          <div v-if="datos.lotes.length !== 0">
            <v-row v-for="lote in datos.lotes" :key="lote.id">
              <!--INFORMACIÓN PRESUPUESTO BASE -->
              <v-col cols="12" v-if="datos.lotes.length > 1">
                Anualidades lote nº {{lote.idLote}}: <b>{{lote.descripcion}}</b>
                <br/>
                Presupuesto base lote: <b>{{currencyFormat(lote.baseLote)}}</b>
              </v-col>
              <v-col cols="12" v-else>
                Presupuesto base: <b>{{currencyFormat(lote.baseLote)}}</b>
              </v-col>

              <!-- SELECCIONAR ANUALIDADES -->
              <v-col cols="12" md="1">
                <v-select dense filled :items="anualidades" v-model="lote.selectAnualidades">
                </v-select>
              </v-col>
              
              <!-- BOTON GENERAR -->
              <v-col cols="12" md="2">
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

              <!-- DATA TABLE ANUALIDADES -->
              <v-col cols="12" md="9">
                <v-data-table
                  style="margin-bottom:1rem;"
                  class="dataTable"
                  :headers="anualidadesHeaders"
                  :items="lote.anualidades"
                  hide-default-footer
                  key="idLote"
                >
                  <!-- AÑO -->
                  <template v-slot:[`item.year`]="props">
                    <v-edit-dialog
                    large persistent
                    cancel-text="CANCELAR"
                    save-text="GUARDAR"
                    :return-value.sync="props.item.year"
                    @save="saveAnualidad(props.item)"
                    >
                      <template v-slot:input>
                        <!-- INTRODUCIR DATOS -->
                        <v-text-field
                          v-model="props.item.year"
                          label="Editar"
                          single-line
                          type="number"
                        ></v-text-field>
                      </template>
                      <!-- MOSTRAR DATOS -->
                      <span class="editField">{{(props.item.year)}}</span>
                    </v-edit-dialog>
                  </template>
                  
                  <!-- IMPORTE SIN IMPUESTOS -->
                  <template v-slot:[`item.importeSinImp`]="props" v-if="datos.anualidadesGuardadas == false">
                    <v-edit-dialog
                    large persistent
                    cancel-text="CANCELAR"
                    save-text="GUARDAR"
                    :return-value.sync="props.item.importeSinImp"
                    @save="saveAnualidad(props.item)"
                    >
                      <template v-slot:input>
                        <!-- INTRODUCIR DATOS -->
                        <v-text-field
                          v-model="props.item.importeSinImp"
                          label="Editar"
                          single-line
                          type="number"
                          :rules="[rules.zero]"
                        ></v-text-field>
                      </template>
                      <!-- MOSTRAR DATOS -->
                      <span class="editField">{{currencyFormat(props.item.importeSinImp)}}</span>
                    </v-edit-dialog>
                  </template>

                  <!-- IMPUESTO APLICABLE (nombre impuesto) -->
                  <template v-slot:[`item.IVA`]="{ item }">
                    {{ currencyFormat(returnIVA(lote.tipoImpuesto, item.importeSinIVA)) }}
                  </template>

                  <!-- TOTAL IMPUESTOS -->
                  <template v-slot:[`item.totalImp`]="{ item }">
                    {{ currencyFormat(item.totalImp) }}
                  </template>

                  <!-- TOTAL IMPUESTOS INCLUIDOS -->
                  <template v-slot:[`item.totalImpInc`]="{ item }">
                    {{ currencyFormat(item.totalImpInc) }}
                  </template>
                </v-data-table>

                <!-- ALERTAS VALIDACION -->
                  <v-alert v-if="lote.alert === 'noData'" type="info">No se han introducido datos.</v-alert>
                  <v-alert v-if="lote.alert === 'igualcero'" type="error">La suma de las anualidades no puede ser igual a cero.</v-alert>
                  <v-alert v-if="lote.alert === 'mayorQuePbase'" type="error">La suma de las anualidades no puede ser mayor que el presupuesto base.</v-alert>
                  <v-alert v-if="lote.alert === 'notEqual'" type="error">La suma de las anualidades no coincide con el presupuesto base.</v-alert>
                  <v-alert v-if="lote.alert === 'dataOK'" type="success">¡Datos correctos!</v-alert>
              </v-col>
            </v-row>
          </div>

          <!-- ALERTA EN CASO DE NO EXISTIR DATOS DE PRESUPUESTO BASE -->
          <div v-else>
            <v-alert type="info">Guarde los datos del presupuesto si desea introducir anualidades</v-alert>
          </div>
        </v-col>
      </v-row>
    </div>

    <!-- MODIFICACIONES -->
    <div class="group">
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
    </div>

    <!-- PLAZO DE EJECUCIÓN O DURACION -->
    <div class="group">
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
    </div>

    <!-- VALOR ESTIMADO -->
    <div class="group">
      <h3>Valor Estimado</h3>
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
    </div>

    <!-- LUGAR DE PRESTACIÓN -->
    <div class="group">
      <h3>Lugar de prestación:</h3>
      <v-row class="rowGroup">
        <v-col cols="12">
          <h5 class="subtitle">La empresa adjudicataria está autorizada a ejecutar los servicios objeto del contrato, o parte de los mismos, en las siguientes dependencias:</h5>
          <v-textarea filled auto-grow v-model="datos.lugarPrestacion"></v-textarea>
        </v-col>
      </v-row>
    </div>

    <!-- DOCUMENTOS QUE REVISTEN CARACTER CONTRACTUAL -->
    <div class="group">
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
    </div>

    <!-- PROCEDIMIENTO -->
    <div class="group">
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
    </div>


    

    <!--ALERTAS-->
    <v-overlay absolute v-if="alerta">
      <v-alert :type="alertType" prominent>{{alertMsg}}</v-alert>
    </v-overlay>
  </div>
</template>

<script>

import AplicacionPres from '@/components/common/AplicacionPres.vue';

import {currencyFormat} from "@/assets/mixins/currencyFormat";

export default {
  name: "PresupuestoLoteAnualidades",
  props:['datosGuardados'],
  components: {AplicacionPres},
  mixins: [currencyFormat],
  
  data() {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateInicio: '',
      dateFin: '',
      showOverlayPbase: false,

      anualidades: [1, 2, 3, 4, 5],
      impuestos: [
        {tipo: 'IVA (21%)', valor: 21},
        {tipo: 'IGIC (7%)', valor: 7},
        {tipo: 'Reducido (10%)', valor: 10},
        {tipo: 'Superreducido (5%)', valor: 5},
        {tipo: 'Superreducido (4%)', valor: 4},
        {tipo: 'No aplicable (0%)', valor: 0},
      ],
      itemsAplicacionPrep: ['1718495A620'],
      rules: {
          required: (value) => !!value || "Este campo es obligatorio.",
          max: (value) => value <= 20 || "Se supera el máximo permitido (20% presupuesto base)",
          zero: (value) => value > 0 || "El importe no puede ser igual a 0",
          min13: (value) => value > 13 || "El valor mínimo permitido es 13"
      },
      costesGeneralesValid: true,

      lotesHeaders: [
        { width:"4%", text: "", align: "center", sortable: false, value: "idLote", divider: true,},
        { width:"13%", text: "Base de licitación (sin impuestos)", align: "center", sortable: false, value: "baseLote", divider: true,},
        { width:"5%", text: "% Impuesto", align: "center", sortable: false, value: "tipoImpuesto", divider: true,},
        { width:"10%", text: "Total Impuestos", align: "center", sortable: false, value: "totalImpuestos", divider: true,},
        { width:"10%", text: "Total (imp. incluidos)", align: "center", sortable: false, value: "totalLote", divider: true,},
        { width:"55%", text: "Desglose del presupuesto base de licitación", align: "center", sortable: false, value: "costesIndirectos", divider: true},
        { width:"2%", text: "Borrar", align: "center", sortable: false, value: "actions", divider: true,},
      ],

      identificacionLotesHeaders: [
        { width:"2%", text: "Lote", align: "center", sortable: false, value: "idLote", divider: true, },
        { width:"98%", text: "Descripción Lote", align: "start", sortable: false, value: "descripcion", divider: true,},
      ],

      anualidadesHeaders: [
        { text: "Año", align: "start", sortable: false, value: "year", divider: true,},
        { text: "Importe (sin impuestos)", align: "end", sortable: false, value: "importeSinImp", divider: true, },
        { text: "Impuesto aplicable", align: "end", sortable: false, value: "impAplicable", divider: true, },
        { text: "Impuestos", align: "end", sortable: false, value: "totalImp", divider: true, },
        { text: "Total (impuestos inc.)", align: "end", sortable: false, value: "totalImpInc" },
      ],

      tipoPlazo: ['dias', 'meses', 'años'],

      showAplicacionPresWindow: false,
      alerta: false,
      alertType: 'info',
      alertMsg: undefined,

      datos: {
        componente: 'PresupuestoAnualidades',

        //SECCION 3
        aplicacionPrep: '',
        tramitacion: true,
        desglose: 'no procede',
        tipoDesglose: undefined,
        tipoDesgloseGenero: undefined,
        anualidadesGuardadas: false,
        
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
        docsCaracterContractual: true,

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

        //VALIDACIONES DE ANUALIDADES
        if(datos.lotes.length !== 0){
          datos.lotes.forEach((lote)=>{
            if(lote.anualidades.length > 0){
              lote.totalAnualidades = 0
              const valorAnualidades = lote.anualidades.map((anualidad)=>parseFloat(anualidad.importeSinImp))
              valorAnualidades.forEach((valor)=>lote.totalAnualidades += valor)

              //SUMAS ANUALIDADES COMPARADA CON PRESUPUESTO BASE
              //TODO: CUANDO CARGAMOS DATOS DE UN EXPEDIENTE GUARDADO HAY UN BUG DE BUCLE INFINITO
              if(parseFloat(lote.totalAnualidades) !== parseFloat(lote.baseLote)){
                if(lote.totalAnualidades === 0){
                  lote.alert = 'igualcero';
                } else if (parseFloat(lote.totalAnualidades) > parseFloat(lote.baseLote)){
                  lote.alert = 'mayorQuePbase';
                } else {
                  lote.alert = 'notEqual';
                }
              } else {
                lote.alert = 'dataOK';
              }
              
            }
          })
        } else {
          datos.lotes.forEach((lote)=>{
            lote.alert = 'noData'
          })
        }


        //MODIFICACIONES
        if(datos.preveModif === 'si'){
          this.base = parseFloat(this.datos.presupuestoBaseLicitacion)
          this.datos.importeNumUnid = this.base * 0.20
        } 
        
        //CONSISTENCIA DE DATOS
        if(datos.divisionLotes !== 'no es posible'){
          if(datos.divisionLotes === "posible no divisible"){
            this.datos.numLotes = 1
            this.datos.posibleNoDivisible = true
            datos.hayDivisionLotes = false
            datos.posibleDivisible = false
          } else {
            this.datos.numLotes = 2
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
    initialize(){
    if(this.datosGuardados !== undefined){
        this.datos = this.datosGuardados
      }
    },

    throwMsg(type, msg, timeout){
      this.alertType = type;
      this.alertMsg = msg
      this.alerta = true;
      setTimeout(()=>{this.alerta = false}, timeout)
    },

    calculoImporteModif(base, modif1, modif2){
      if (modif1 !== undefined || modif2 !== undefined){
        this.datos.totalModificaciones = (parseFloat(base) + parseFloat(modif1) + parseFloat(modif2)).toFixed(2);
        return (this.datos.totalModificaciones)
      }
    },


    returnTaxes(value){
      switch(value){
        case 21:
          return 'IVA (21%)'
        case 7:
          return 'IGIC (7%)'
        case 10:
          return 'IVA (10%)'
        case 5:
          return 'IVA (5%)'
        case 4:
          return 'IVA (4%)'
        case 0:
          return 'IVA (0%)'
        default:
          return 'IVA (21%)'
      }
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
          descripcion: 'Introducir descripción del lote',
          baseLote: 0,
          tipoImpuesto: 21,
          nombreImpuesto: 'IVA',
          totalImpuestos: 0,
          totalImpIncl: 0,
          totalLote: 0,
          costesDirectos: 0,
          costesIndirectos: 0,
          porcCostesGenerales: 13,
          costesGenerales: 0,
          porcBeneficioIndustrial: 6,
          beneficioIndustrial: 0,
          totalCostes: 0,
          selectAnualidades: 2,
          anualidades:[],
          alert: null,
        }
        this.datos.lotes.push(this.newLote)
      }

    },

    updateLotes(){
      this.datos.lotes.forEach((lote)=>{
        lote.totalImpuestos = this.calcularImpuestos(lote.baseLote, parseFloat(lote.tipoImpuesto));
        lote.nombreImpuesto = this.returnTaxes(lote.tipoImpuesto);
        lote.totalLote = parseFloat(lote.baseLote) + parseFloat(lote.totalImpuestos);
        lote.costesDirectos = this.calcularCostesDirectos(lote.baseLote, parseInt(lote.porcBeneficioIndustrial), parseInt(lote.porcCostesGenerales))
        lote.costesGenerales = this.calcularCostesGenerales(lote.costesDirectos, parseInt(lote.porcCostesGenerales))
        lote.beneficioIndustrial = this.calcularBeneficioIndustrial(lote.costesDirectos, parseInt(lote.porcBeneficioIndustrial))
        lote.costesIndirectos = lote.costesGenerales + lote.beneficioIndustrial;
        lote.totalCostes = lote.baseLote + (lote.costesDirectos + lote.costesIndirectos);
        lote.totalImpIncl = lote.baseLote + lote.totalImpuestos;
      })
    },

    calcularImpuestos(pBase, percImpuesto){
      return ((percImpuesto / 100) * pBase);
    },

    calcularCostesDirectos(pbase, porcBenInd, percCostGen){
      /*Por defecto => Presupuesto base / 1.19 */
      return pbase/(1+((porcBenInd + percCostGen)/100));
    },

    calcularCostesGenerales(costesDirectos, percCostGen){
      /* Por defecto => Costes Directos * 0.13 */
      return costesDirectos * ((percCostGen)/100);
    },

    calcularBeneficioIndustrial(costesDirectos, percBenInd){
      /* Por defecto => Costes Directos * 0.06 */
      return costesDirectos * ((percBenInd)/100);
    },
  

    returnIVA(percImpuesto, pBase) {
      return (parseFloat((pBase * (percImpuesto/100)).toFixed(2)))
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
      //SI ES TRAMITACION ANTICIPADA EMPEZAMOS EN EL AÑO SIGUIENTE
      if(!this.datos.tramitacion){
        ano = ano+1
      }
      for (let i = 0; i < lote.selectAnualidades; i++) {
        this.newData = {
          year: ano + i,
          importeSinImp: 0,
          impAplicable: lote.nombreImpuesto,
          valueImp: lote.tipoImpuesto,
          totalImp: 0,
          totalImpInc: 0,
        };
        lote.anualidades.push(this.newData);
      }
    },

    saveAnualidad(data){
      data.totalImp = parseFloat(data.importeSinImp) * ((data.valueImp / 100));
      data.totalImpInc = parseFloat(data.importeSinImp) + data.totalImp;
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
  height: 2.5rem !important;
}

.aplicacionPrep {
  margin: 0rem;
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

.icon {
  margin-left: 0.5rem;
}


/*ESTILOS TABLA DESGLOSE*/
.tableDesglose{
  margin:0.25rem 0rem 0.25rem 0rem; 
  border-collapse: collapse; 
  width:100%; 
  font-size:90%;
}

.desgloseElmHeader {
  padding: 0.2rem; 
  font-weight: 400; 
  text-align:center !important; 
  border:thin solid white;
}

.desgloseElmBody {
  border: thin solid #e3e3e3;
}

.bgLigthGray {
  background-color: #e3e3e3;
}

.bgWhite {
  background-color:white;
}



</style>
