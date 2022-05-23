<template>
    <div>
        <h3>19.- Régimen de pagos</h3>
        <br/>
        <v-row class="rowGroup">
            <v-col cols="12">
                <h5 class="subtitle">La forma de pago será:</h5>
                 <v-radio-group v-model="datos.formaPago">
                    <v-radio label="Precios unitarios (licitación afectados por % baja)" value="licitacionBaja"></v-radio>
                    <v-radio label="Precios unitarios (ofertados por adjudicatario)" value="ofertadoAdjudicatario"></v-radio>
                    <v-radio label="Precios a tanto alzado" value="tantoAlzado"></v-radio>
                    <v-radio label="Combinación de precios unitarios y a tanto alzado (licitación afectados por % baja)" value="combiLicitacionBaja"></v-radio>
                    <v-radio label="Combinación de precios unitarios y a tanto alzado (ofertados por adjudicatario)" value="combiOfertadoAdjudicatario"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/><br/>

        <v-row class="rowGroup" v-if="presBase.presupuestoBaseLicitacion !== undefined">
            <v-col cols="12" md="3">
                <h5 class="subtitle">La periodicidad de los pagos sera:</h5>
                 <v-radio-group v-model="datos.periodicidad">
                    <v-radio label="Mensual" :value="true"></v-radio>
                    <v-radio label="Otra" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="2" v-if="datos.periodicidad === false">
                <h5 class="subtitle bSpacer">Seleccionar nº pagos</h5>
                <v-select
                    filled
                    label="Nº Pagos"
                    :items="periodicidades"
                    v-model="selectPeriodicidad"
                >
                </v-select>
            </v-col>

            <v-col cols="12" v-if="datos.periodicidad === false">
                <h5 class="subtitle bSpacer">Especificar pagos:</h5>
                <v-data-table
                    class="dataTable"
                    hide-default-footer  
                    :headers="periodicidadHeaders"
                    :items="datos.otraPeriodicidad"
                >
                    <!--EDITAR AÑO-->
                    <template v-slot:[`item.year`]="props">
                        <v-edit-dialog :return-value.sync="props.item.year" class="yearBox">
                        <div class="editField">{{props.item.year}}</div>
                            <template v-slot:input>
                                <v-text-field
                                v-model="props.item.year"
                                label="Editar año"
                                single-line
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>

                    <!--EDITAR CONCEPTO-->
                    <template v-slot:[`item.concepto`]="props">
                        <v-edit-dialog :return-value.sync="props.item.concepto" class="conceptoBox">
                        <div class="editField">{{props.item.concepto}}</div>
                            <template v-slot:input>
                                <v-text-field
                                v-model="props.item.concepto"
                                label="Editar concepto"
                                single-line
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>

                    <!--EDITAR OBSERVACIONES-->
                    <template v-slot:[`item.observaciones`]="props">
                        <v-edit-dialog :return-value.sync="props.item.observaciones" class="observacionesBox">
                        <div class="editField">{{props.item.observaciones}}</div>
                            <template v-slot:input>
                                <v-text-field
                                v-model="props.item.observaciones"
                                label="Editar observaciones"
                                single-line
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>

                    <!--EDITAR PRECIO SIN IVA-->
                    <template v-slot:[`item.importeSIVA`]="props">
                        <v-edit-dialog :return-value.sync="props.item.importeSIVA" class="noIVABox">
                        <div class="editField">{{props.item.importeSIVA}}</div>
                            <template v-slot:input>
                                <v-text-field
                                v-model="props.item.importeSIVA"
                                label="Editar importe sin IVA"
                                single-line
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>

                    <!--CALCULO AUTOMATICO IVA-->
                    <template v-slot:[`item.IVA`]="props">
                        <v-edit-dialog :return-value.sync="props.item.IVA" class="IVABox">
                        <div v-if="!isNaN(returnIVAcalc(props.item.importeSIVA))">{{returnIVAcalc(props.item.importeSIVA)}}</div>
                        <div v-else>Importe no definido</div>
                        </v-edit-dialog>
                    </template>

                    <!--CALCULO AUTOMATICO TOTAL-->
                    <template v-slot:[`item.total`]="props">
                        <v-edit-dialog :return-value.sync="props.item.total" class="totalBox">
                        <div v-if="!isNaN(returnTotal(props.item.importeSIVA))"><b>{{returnTotal(props.item.importeSIVA)}}</b></div>
                        <div v-else>Importe no definido</div>
                        </v-edit-dialog>
                    </template>

                    <!--ACTIONS-->
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn 
                        small icon
                        :disabled="activeDelete"
                        @click="deletePeriodo(item)"
                        >
                        <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
                <div>
                    <br/>
                    <v-alert :value="alertPeriodicidad" type="error">Las cantidades definidas no coinciden con el total del presupuesto base de licitación</v-alert>
                </div> 
                <v-btn large color="success" @click="storePeriodicidad" v-if="periodicidadGuardada === false">GUARDAR DATOS <v-icon class="icon">mdi-content-save</v-icon></v-btn>
                <v-btn large color="grey" v-else dark>GUARDADO CORRECTO <v-icon class="icon">mdi-check-all</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-row v-else>
            <v-col cols="12">
                <h5 class="subtitle">La periodicidad de los pagos sera:</h5>
                <v-alert type="error">El presupuesto base no se ha definido aun</v-alert>
            </v-col>
        </v-row>
        <br/><br/>

        <!-- 20.- REVISIÓN DE PRECIOS -->
        <h3 class="bSpacer">20.- Revisión de precios</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="2">
                <v-radio-group v-model="datos.revision">
                    <v-radio label="Si procede" :value="true"></v-radio>
                    <v-radio label="No procede" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="3" v-if="datos.revision === true">
                <h5 class="subtitle bSpacer">Justificación:</h5>
                <v-text-field filled v-model="datos.revisionJustificacion"></v-text-field>
            </v-col>

            <v-col cols="12" md="3" v-if="datos.revision === true">
                <h5 class="subtitle bSpacer">Tipo:</h5>
                <v-text-field filled v-model="datos.revisionTipo"></v-text-field>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.revision === true">
                <h5 class="subtitle bSpacer">Fórmula: [RD 1359/2011, de 7 de octubre]</h5>
                <v-text-field filled v-model="datos.revisionFormula"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <h3 class="bSpacer">21.- Abonos a cuenta [art. 198.2 LCSP]</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="8">
                <v-radio-group v-model="datos.abonosAcuenta">
                    <v-radio label="Si proceden, en las condiciones previstas en el punto 19 de este pliego." :value="true"></v-radio>
                    <v-radio label="No proceden" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>

    </div>
</template>

<script> 
    export default {
        name: 'RegimenPagosRevision',
        props: ['datosGuardados', 'presBase'],

        watch:{
            selectPeriodicidad(){
                this.datos.otraPeriodicidad = [];
                this.activeDelete = false;

                for(let i=0; i<this.selectPeriodicidad; i++){
                        this.nuevoPeriodo = {
                        id: i,
                        year: undefined,
                        concepto: '',
                        observaciones: '',
                        importeSIVA: undefined,
                        IVA: undefined,
                        total: undefined,
                        
                    }
                    this.datos.otraPeriodicidad.push(this.nuevoPeriodo)
                }
                this.periodicidadGuardada = false;
            },

            datos: {
                deep: true,
                handler(datos){
                    //SELECT REGIMEN PAGOS
                    if(datos.formaPago === 'licitacionBaja'){
                        datos.hasPreciosUnitariosBaja = true
                        datos.hasPreciosUnitariosAdju = false
                        datos.hasCombiLicBaja = false
                        datos.hasCombiUnitAlza = false
                        datos.hasTantoAlzado = false
                    }
                    else if(datos.formaPago === 'ofertadoAdjudicatario'){
                        datos.hasPreciosUnitariosBaja = false
                        datos.hasPreciosUnitariosAdju = true
                        datos.hasCombiLicBaja = false
                        datos.hasCombiUnitAlza = false
                        datos.hasTantoAlzado = false
                    }
                    else if(datos.formaPago === 'tantoAlzado'){
                        datos.hasPreciosUnitariosBaja = false
                        datos.hasPreciosUnitariosAdju = false
                        datos.hasCombiLicBaja = false
                        datos.hasCombiUnitAlza = false
                        datos.hasTantoAlzado = true
                    }
                    else if(datos.formaPago === 'combiLicitacionBaja'){
                        datos.hasPreciosUnitariosBaja = false
                        datos.hasPreciosUnitariosAdju = false
                        datos.hasCombiLicBaja = true
                        datos.hasCombiUnitAlza = false
                        datos.hasTantoAlzado = false
                    }
                    else if(datos.formaPago === 'combiOfertadoAdjudicatario'){
                        datos.hasPreciosUnitariosBaja = false
                        datos.hasPreciosUnitariosAdju = false
                        datos.hasCombiLicBaja = false
                        datos.hasCombiUnitAlza = true
                        datos.hasTantoAlzado = false
                    }
                }
            }
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

            returnIVAcalc(base){
                if (base !== 0){
                    this.base = (parseFloat(base)).toFixed(2)
                    return (this.base * 0.21).toFixed(2);
                }
            },

            returnTotal(base){
                if (base !== 0){
                    this.base = (parseFloat(base)).toFixed(2)
                    return (this.base * 1.21).toFixed(2);
                }
            },

            deletePeriodo(item){
                if(this.datos.otraPeriodicidad.length > 1){
                        for(this.index in this.datos.otraPeriodicidad){
                        if(item.id === this.datos.otraPeriodicidad[this.index].id){
                            this.datos.otraPeriodicidad.splice(this.index,1)
                        }
                    }
                } else {
                    this.activeDelete = true;
                }
            },

            storePeriodicidad(){
                for (this.index in this.datos.otraPeriodicidad){
                    this.datos.otraPeriodicidad[this.index].IVA = this.returnIVAcalc(parseFloat(this.datos.otraPeriodicidad[this.index].importeSIVA))
                    this.datos.otraPeriodicidad[this.index].total = (parseFloat(this.datos.otraPeriodicidad[this.index].IVA) + parseFloat(this.datos.otraPeriodicidad[this.index].importeSIVA)).toFixed(2)
                }
                this.periodicidadGuardada = true;
            }
        },

        data(){
            return {
                periodicidadHeaders: [
                    {text: 'Pago', sortable: false, value: 'year'},
                    {text: 'Concepto', sortable: false, value: 'concepto'},
                    {text: 'Observaciones', sortable: false, value: 'observaciones'},
                    {text: 'Importe sin IVA (€)', sortable: false, value: 'importeSIVA'},
                    {text: 'IVA (€)', sortable: false, value: 'IVA'},
                    {text: 'Importe con IVA (€)', sortable: false, value: 'total'},  
                    {text: 'Borrar', sortable: false, value: 'actions'},  
                ],

                periodicidades: [1,2,3,4,5],
                selectPeriodicidad: 0,
                periodicidadGuardada: false,
                activeDelete: false,

                alertPeriodicidad: false,

                datos: {
                    componente:'RegimenPagosRevision',

                    hasPreciosUnitariosBaja: false,
                    hasPreciosUnitariosAdju: false,
                    hasCombiLicBaja: false,
                    hasCombiUnitAlza: false,
                    hasTantoAlzado: false,
                    formaPago: '',
                    periodicidad: false,
                    otraPeriodicidad: [],
                    revision: false,
                    revisionJustificacion: '',
                    revisionTipo: '',
                    revisionFormula: '',
                    abonosAcuenta: false,
                }
            }
        },
    }
</script>

<style scoped>
    .editField {
        color: blue;
        text-decoration: underline;
    }

    .yearBox {
        width: 15%;
    }

    .conceptoBox {
        width: 40%;
    }

    .observacionesBox{
        width: 30%;
    }

    .noIVABox, .IVABox, .totalBox {
        width: 5%;
    }
</style>
