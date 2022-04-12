<template>
    <div>
        <!-- 25 MODIFICACIÓN DEL CONTRATO -->
        <h3>25.- MODIFICACIÓN DEL CONTRATO</h3>
        <br/>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5>25.1 Modificaciones previstas [artículo 204 LCSP]</h5>
                <h5 class="subtitle">Se prevén:</h5>
                <v-radio-group v-model="datos.preveModif">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.preveModif === 'si'">
                <h5>En caso afirmativo indicar motivo:</h5>
                <h5 class="subtitle">Descripción precisa de los supuestos en que podrá modificarse el contrato:</h5>
                <v-radio-group v-model="datos.tipoModif">
                    <v-radio label='A) Por necesidad de variar el número de unidades previstas en el contrato.' value="numeroUnidades"></v-radio>
                    <v-radio label='B) Por necesidad de incorporar nuevos apartados en los informes ya previstos en el contrato, debido a la necesidad de incorporar adaptaciones exigidas por normas técnicas aprobadas después de la licitación del contrato.' value="nuevosApartados"></v-radio>
                    <v-radio label='C) Por necesidad de incorporar ensayos de auscultación como consecuencia de la aparición de nuevas tipologías estructurales o materiales no previstos inicialmente' value="ensayosAuscultacion"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- CASO NUMERO UNIDADES -->
            <v-row class="innerRow" cols="12" v-if="datos.preveModif === 'si' && datos.tipoModif === 'numeroUnidades'">
                <v-col cols="12" md="3">
                    <h5 class="subtitle">Indicar importe:</h5>
                     <v-text-field 
                    filled label="Importe" v-model="datos.importeNumeroUnidades"
                    :rules="[rules.max, rules.required, rules.zero]"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <ul>
                        <li>Presupuesto base: <b>{{importePresBase}} €</b></li>
                        <li><i>Máximo permitido: <b>{{importeNumUnid}} €</b>. Porcentaje máximo respecto del 
                        presupuesto base de licitación: <b>20%</b> se sumará al valor estimado.
                        </i></li>
                    </ul>
                    <br/>                                 
                </v-col>
                <v-col cols="12" md="5">
                    <i>
                        <b>ATENCIÓN:</b>
                        En este caso será siempre necesario que las nuevas unidades sean iguales a las previamente
                        definidas en el contrato inicial y que se abonen en el mismo precio unitario.
                    </i>
                </v-col>
            </v-row>

            <!-- CASO INCORPORAR APARTADOS -->
            <v-row class="innerRow" cols="12" v-if="datos.preveModif === 'si' && datos.tipoModif === 'nuevosApartados'">
                <v-col cols="12" md="3">
                    <h5 class="subtitle">Indicar importe:</h5>
                     <v-text-field 
                    filled label="Importe" v-model="datos.importeNuevosApartados"
                    :rules="[rules.max, rules.required, rules.zero]"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <ul>
                        <li>Presupuesto base: <b>{{importePresBase}} €</b></li>
                        <li><i>Máximo permitido: <b>{{importeNumUnid}} €</b>. Porcentaje máximo respecto del 
                        presupuesto base de licitación: <b>20%</b> se sumará al valor estimado.
                        </i></li>
                    </ul>
                    <br/>                                 
                </v-col>
                <v-col cols="12" md="5">
                    <i>
                        <b>ATENCIÓN:</b> Será necesario que los precios del contrato inicial se hubieran definido descomponiéndose
                        en sus costes elementales y que los importes de las nuevas prestaciones puedan formarse en su totalidad
                        con dichos costes elementales. Cuando no se cumpla este requisito la modificación solo podrá tramitarse
                        al amparo del artículo 205 de la LCSP
                    </i>
                </v-col>
            </v-row>

            <!-- CASO ENSAYO AUSCULTACION -->
            <v-row class="innerRow" cols="12" v-if="datos.preveModif === 'si' && datos.tipoModif === 'ensayosAuscultacion'">
                <v-col cols="12" md="3">
                    <h5 class="subtitle">Indicar importe:</h5>
                     <v-text-field 
                    filled label="Importe" v-model="datos.importeEnsayoAuscultacion"
                    :rules="[rules.max, rules.required, rules.zero]"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <ul>
                        <li>Presupuesto base: <b>{{importePresBase}} €</b></li>
                        <li><i>Máximo permitido: <b>{{importeNumUnid}} €</b>. Porcentaje máximo respecto del 
                        presupuesto base de licitación: <b>20%</b> se sumará al valor estimado.
                        </i></li>
                    </ul>
                    <br/>                                 
                </v-col>
                <v-col cols="12" md="5">
                    <i>
                        <b>ATENCIÓN:</b> Será necesario que los precios del contrato inicial se hubieran definido descomponiéndose
                        en sus costes elementales y que los importes de las nuevas prestaciones puedan formarse en su totalidad
                        con dichos costes elementales. Cuando no se cumpla este requisito la modificación solo podrá tramitarse
                        al amparo del artículo 205 de la LCSP
                    </i>
                </v-col>
            </v-row>
        </v-row>
        <br/><br/>


        <!-- 26 PENALIDADES -->
        <h3>26.- PENALIDADES</h3>
        <br/>
        <v-row class="rowGroup">
            <!-- 26.1 -->
            <v-col cols="12">
                <h5 class="subtitle">26.1.- Por incumplimiento de las condiciones especiales de ejecución [artículo 192.1 LCSP]</h5>
                <v-radio-group v-model="datos.penConEsp">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.2 -->
            <v-col cols="12">
                <h5 class="subtitle">26.2.- Por incumplimiento defectuoso [artículo 192.1 LCSP]</h5>
                <v-radio-group v-model="datos.penDefectuoso">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.3 -->
            <v-col cols="12" md="5">
                <h5 class="subtitle">26.3.- Por incumplir criterios de adjudicación [artículo 145 LCSP]</h5>
                <v-radio-group v-model="datos.penCritAdj">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>
                <!-- CASO AFIRMATIVO -->
                <v-col cols="12" md="3" v-if="datos.penCritAdj === 'si'">
                <h5 class="subtitle">En caso afirmativo:</h5>
                <v-radio-group v-model="datos.critPenAdj">
                    <v-radio label="Cualquiera de los criterios de adjudicación" value="cualquiera"></v-radio>
                    <v-radio label="El criterio de adjudicación que se especifica a continuación:" value="especificar"></v-radio>
                </v-radio-group>
                </v-col>

                    <!-- INDICAR CRITERIO -->
                    <v-col cols="12" md="4" v-if="datos.penCritAdj === 'si' && datos.critPenAdj === 'especificar'">
                    <h5 class="subtitle">Indicar criterio/s:</h5>
                    <v-textarea auto-grow filled v-model="datos.espCritPenAdj"></v-textarea>
                    </v-col>
            
            <!-- 26.4 -->
            <v-col cols="12">
                <h5 class="subtitle">26.4.- Por demora en el plazo de ejecución:</h5>
                <v-radio-group v-model="datos.penDemoraPlazoEjec">
                    <v-radio label="Por incumplimiento de plazo. Las previstas en el artículo 193 de la LCSP" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.5 -->
            <v-col cols="12">
                <h5 class="subtitle">26.5.- Por demora en el plazo para la presentación del plan 
                    de seguridad y salud [artículo 193.5 LCSP]
                </h5>
                <v-radio-group v-model="datos.penDemoraPresent">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.6 -->
            <v-col cols="12">
                <h5 class="subtitle">26.6.- Otras penalidades [artículo 193 LCSP]</h5>
                <v-row class="rowGroup rowSubGroup">
                    <v-col cols="12">
                        <h5 class="subtitle">1.- Por incumplir las condiciones para la subcontratación</h5>
                        <v-radio-group v-model="datos.penSubcontrata">
                            <v-radio label="Si" value="si"></v-radio>
                            <v-radio label="No" value="no"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row class="rowGroup rowSubGroup">
                    <v-col cols="12">
                        <h5 class="subtitle">2.- Por incumplir las obligaciones de información y publicidad establecidas
                            en el anexo XII, sección 2.2 del Reglamento (UE) 1303/2013 del Parlamento europeo y 
                            Consejo de 17 de diciembre de 2013; cuando el contrato se financie con fondos europeos.
                        </h5>
                        <v-radio-group v-model="datos.penFondEurop">
                            <v-radio label="Si" value="si"></v-radio>
                            <v-radio label="No" value="no"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-col>

        </v-row>
    </div>
</template>

<script>
    export default {
        name:'ModificacionesPenalidades',
        props: ['datosGuardados', 'presBase'],
        
        beforeDestroy(){
           this.$emit('datos', this.datos);
        },

        created(){
            this.initialize();
        },

        methods:{
            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }

                if(this.presBase !== undefined){
                    this.importePresBase = this.presBase.presupuestoBaseLicitacion;
                    this.importeNumUnid = parseFloat((parseFloat(this.presBase.presupuestoBaseLicitacion)*0.20).toFixed(2))
                } else {
                    this.importeNumUnid = 'Presupuesto base no definido aun';
                    this.importePresBase = 'Presupuesto base no definido aun';
                }
            },
        },

        data(){
            return {
                importeNumUnid: 'Presupuesto Base sin definir aun',
                importePresBase: undefined,

                rules: {
                    required: (value) => !!value || "Este campo es obligatorio.",
                    max: (value) => value <= this.importeNumUnid || "Se supera el máximo permitido (20% presupuesto base)",
                    zero: (value) => value > 0 || "El importe no puede ser igual a 0",
                },

                datos: {
                    componente: 'ModificacionesPenalidades',
                    preveModif: '',
                    tipoModif: '',
                    importeNumeroUnidades: undefined,
                    importeNuevosApartados: undefined,
                    importeEnsayoAuscultacion: undefined,
                    penConEsp: undefined,
                    penDefectuoso: undefined,
                    penCritAdj: undefined,
                    critPenAdj: undefined,
                    espCritPenAdj: undefined,
                    penDemoraPlazoEjec: undefined,
                    penDemoraPresent: undefined,
                    penSubcontrata: undefined,
                    penFondEurop: undefined,
                }
            }
        },
        
    }

</script>

<style scoped>
    .innerRow {
        margin: 0rem 0.5rem 0rem 0.5rem;
        border: 1px solid lightgray;
        border-radius:  4px;
    }

    .rowSubGroup {
        margin: 1rem 0.15rem 0rem 0.15rem;
    }

</style>