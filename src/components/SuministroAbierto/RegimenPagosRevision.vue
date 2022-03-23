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
                    <v-radio label="Combinación de precios unitarios y a tanto alzado (licitación afectados por % baja)" value="combiLicitacionBaja"></v-radio>
                    <v-radio label="Combinación de precios unitarios y a tanto alzado (ofertados por adjudicatario)" value="combiOfertadoAdjudicatario"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>
        <v-row class="rowGroup">
            <v-col cols="12" md="2">
                <h5 class="subtitle">La periodicidad sera:</h5>
                 <v-radio-group v-model="datos.periodicidad">
                    <v-radio label="Mensual" value="mensual"></v-radio>
                    <v-radio label="Otra" value="otra"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="2" v-if="datos.periodicidad === 'otra'">
                <h5 class="subtitle bSpacer">Seleccionar periodos</h5>
                <v-select
                filled
                    label="periodos"
                    :items="periodicidades"
                    v-model="selectPeriodicidad"
                >
                </v-select>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.periodicidad === 'otra'">
                <h5 class="subtitle bSpacer">Especificar:</h5>
                <v-data-table
                    class="dataTable"
                    hide-default-footer  
                    :headers="periodicidadHeaders"
                    :items="datos.otraPeriodicidad"
                ></v-data-table>
            </v-col>
        </v-row>
        <br/>

        <h3 class="bSpacer">20.- Revisión de precios</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="2">
                <v-radio-group v-model="datos.revision">
                    <v-radio label="No procede" value="no"></v-radio>
                    <v-radio label="Si procede" value="si"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="3" v-if="datos.revision === 'si'">
                <h5 class="subtitle bSpacer">Justificación:</h5>
                <v-text-field filled v-model="datos.revisionJustificacion"></v-text-field>
            </v-col>

            <v-col cols="12" md="3" v-if="datos.revision === 'si'">
                <h5 class="subtitle bSpacer">Tipo:</h5>
                <v-text-field filled v-model="datos.revisionTipo"></v-text-field>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.revision === 'si'">
                <h5 class="subtitle bSpacer">Fórmula: [RD 1359/2011, de 7 de octubre]</h5>
                <v-text-field filled v-model="datos.revisionFormula"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <h3 class="bSpacer">21.- Abonos a cuenta [art. 198.2 LCSP]</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="6">
                <v-radio-group v-model="datos.abonosAcuenta">
                    <v-radio label="No proceden" value="no"></v-radio>
                    <v-radio label="Si proceden, en las condiciones previstas en el punto 19" value="si"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>

    </div>
</template>

<script> 
    export default {
        name: 'RegimenPagosRevision',

        watch:{
            selectPeriodicidad(){
                this.datos.otraPeriodicidad = [];

                this.newDate = new Date();
                this.newYear = this.newDate.getFullYear();

                for(let i=0; i<this.selectPeriodicidad; i++){
                        this.nuevoPeriodo = {
                        year: this.newYear + i,
                        concepto: '',
                        importeSIVA: '',
                        IVA: '',
                        total: '',
                    }
                    this.datos.otraPeriodicidad.push(this.nuevoPeriodo)
                }
            },

            datos: {
                deep: true,
                handler(datos){
                //DEFINIR CONDICIONES PARA QUE NO SE EMITAN DATOS INCOMPLETOS
                    this.$emit('datos', datos)
                }
            },
        },

        data(){
            return {
                periodicidadHeaders: [
                    {text: 'Año', sortable: true, value: 'year'},
                    {text: 'Concepto', sortable: true, value: 'concepto'},
                    {text: 'Importe sin IVA (€)', sortable: true, value: 'importeSIVA'},
                    {text: 'IVA (€)', sortable: true, value: 'IVA'},
                    {text: 'Importe con IVA (€)', sortable: true, value: 'total'},
                    {text: 'Datos', sortable: false, value: 'actions'}
                ],

                periodicidades: [1,2,3,4,5],
                selectPeriodicidad: 0,

                datos: {
                    formaPago: '',
                    periodicidad: '',
                    otraPeriodicidad: [],
                    revision: '',
                    revisionJustificacion: '',
                    revisionTipo: '',
                    revisionFormula: '',
                    abonosAcuenta: '',
                }
            }
        },
    }
</script>
