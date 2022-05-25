<template>
    <div>
        <!-- 8 INCOMPATIBILIDADES PARA LA LICITACIÓN -->
        <h3>Incompatibilidades para la licitación
            <v-badge 
            class="badge" color="#c7d6f2" content="?"
            title="Punto 8.1 (Incompatibilidades para la licitación)"></v-badge >
        </h3>
        <v-row class="rowGroup"> 
            <v-row class="subRow">
                <!--8.0 -->
                <v-col cols="12">
                    <h5 class="subtitle">
                    Participación en la licitación de las empresas que hubieran participado previamente en la 
                    elaboración de las especificaciones técnicas o de los documentos preparatorios del contrato
                    o hubieran asesorado al órgano de contratación durante la preparación del procedimiento de 
                    contratación [artículo 70.1 LCSP]
                    </h5>
                </v-col>

                <v-col cols="12" md="6">
                    <h5>Consideración:</h5>
                    <v-radio-group v-model="datos.participacionEmpresas">
                        <v-radio label="No tiene consideración el contrato que se licita" :value="true"></v-radio>
                        <v-radio label="Si tiene esa consideración, las siguientes empresas han participado" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6" v-if="datos.participacionEmpresas === false">
                    <h5>Empresas que deben ser excluidas de dicha licitación:</h5>
                    <v-textarea filled auto-grow v-model="datos.empresasExcluidas"></v-textarea>
                </v-col>
            </v-row>
        </v-row>
        <br/>

        <!-- 9 CAPACIDAD Y SOLVENCIA -->
        <h3>Capacidad y solvencia</h3>
        <br/>

        <h5>Requisitos de solvencia
            <v-badge 
            class="badge" color="#c7d6f2" content="?"
            title="Punto 9.1 (Requisitos de solvencia)"></v-badge >
        </h5>
        <v-row class="rowGroup">
            <!--9.1 Requisitos de solvencia-->
            <v-row class="subRow">
                <v-col cols="12">
                    <i>Se acreditará mediante los documentos acreditativos de 
                    los requisitos especificados a continuación: </i>
                    <v-radio-group v-model="datos.requisitos">
                        <v-radio label="Los exigidos supletoriamente, a falta de especificación, en los artículos 87.3 y 89 de la LCSP" :value="true"></v-radio>
                        <v-radio label="Los que se especifican a continuación (de entre los criterios de solvencia económica y financiera -artículo 87- y técnica -artículo 89- de la LCSP)" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- ESPECIFICADOS -->

                <!-- SOLVENCIA ECONOMICA FINANCIERA-->
                <v-col cols="12" md="6" v-if="datos.requisitos === false">
                    <h5>Solvencia económica y financiera [art. 87 LCSP]</h5>
                    <v-radio-group v-model="datos.solvenciaEconFinanc">
                        <v-radio label="El volumen anual de negocios, que referido al mejor ejercicio de los tres (3) últimos concluidos deberá ser:" value="volumen"></v-radio>
                        <v-radio label="El patrimonio neto al cierre del último ejercicio económico para el que esté vencida la obligación de aprobación de las cuentas anuales no será inferior a:" value="patrimonio"></v-radio>
                        <v-radio label="La ratio entre activos y pasivos al cierre del último ejercicio económico para el que esté vencida la obligación de aprobación de las cuentas anuales no inferior a:" value="ratio"></v-radio>
                        <v-radio label="El licitador es un profesional (no una empresa)" value="profesional"></v-radio>
                    </v-radio-group>
                </v-col>

                    <!-- CASO VOLUMEN ANUAL NEGOCIOS -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'volumen'">
                        <h5>Especificar importe exigido volumen anual de negocios:</h5>
                        <br/>
                        <v-data-table
                            v-if="presBase.hayLotes === true"
                            class="dataTable"
                            :items="datos.volumenAnualNegocio"
                            :headers="solvenciaLotesHeaders"
                            hide-default-footer
                        >
                            <template v-slot:[`item.importeReq`]="props">
                                <v-edit-dialog :return-value.sync="props.item.importeReq">
                                <span class="editField">{{
                                parseFloat(props.item.importeReq)
                                }}</span>
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.importeReq"
                                    label="Editar"
                                    single-line
                                    ></v-text-field>
                                </template>
                                </v-edit-dialog>
                            </template>

                            <template v-slot:[`item.actions`]="props">
                                <v-icon color="green" v-if="props.item.actions === true">mdi-check-all</v-icon>
                                <v-icon color="red" v-if="props.item.actions === false"> mdi-alert-circle</v-icon>
                            </template>
                        </v-data-table>

                        <v-data-table
                            v-else
                            class="dataTable"
                            :items="datos.volumenAnualNegocio"
                            :headers="solvenciaHeaders"
                            hide-default-footer
                        >
                            <template v-slot:[`item.importeReq`]="props">
                                <v-edit-dialog :return-value.sync="props.item.importeReq">
                                <span class="editField">{{
                                parseFloat(props.item.importeReq)
                                }}</span>
                                <template v-slot:input>
                                    <v-text-field
                                    v-model="props.item.importeReq"
                                    label="Editar"
                                    single-line
                                    ></v-text-field>
                                </template>
                                </v-edit-dialog>
                            </template>

                            <template v-slot:[`item.actions`]="props">
                                <v-icon color="green" v-if="props.item.actions === true">mdi-check-all</v-icon>
                                <v-icon color="red" v-if="props.item.actions === false"> mdi-alert-circle</v-icon>
                            </template>
                        </v-data-table>
                        <br/>
                    </v-col>

                    <!-- CASO PATRIMONIO NETO AL CIERRE -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'patrimonio'">
                    <h5>Especificar patrimonio neto</h5>
                    <br/>
                    <v-text-field filled label="€" v-model="datos.patrimonioNeto" type="number"></v-text-field>
                    </v-col>

                    <!-- CASO RATIO ACTIVOS / PASIVOS -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'ratio'">
                    <h5>Especificar ratio activos / pasivos</h5>
                    <br/>
                    <v-text-field filled label="€" v-model="datos.ratioActivos" type="number"></v-text-field>
                    </v-col>

                    <!-- CASO PROFESIONAL (NO EMPRESA) -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'profesional'">
                    <h5>En el caso de que el licitador sea un profesional (y no una empresa)</h5>
                    <br/>
                    <i>
                        Justificante de la existencia de un seguro de indemnización por riesgos 
                        profesionales por importe igual o superior al valor estimado del contrato, 
                        vigente hasta el fin del plazo de presentación de ofertas, asi como el compromiso 
                        vinculante de suscripción, prórroga o renovación, en caso  de resultar adjudicatario, 
                        para garantizar la cobertura durante toda la ejecución del contrato.
                    </i>
                    <br/><br/>
                    <v-btn color="info"><v-icon style="margin-right: 0.5rem;">mdi-content-save</v-icon>ADJUNTAR</v-btn>
                    </v-col>
            </v-row>

            <v-row class="subRow">
                <!-- SOLVENCIA TÉCNICA O PROFESIONAL-->
                <v-col cols="12" md="6" v-if="datos.requisitos === false">
                    <h5>Solvencia técnica o profesional [art. 89 LCSP]</h5>
                    <v-radio-group v-model="datos.solvenciaTecProfe">
                        <v-radio label="Relación de los principales suministros realizados en los últimos 3 años" :value="true"></v-radio>
                        <v-radio label="Otros de los previstos en el artículo 89" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6" v-if="datos.solvenciaTecProfe === true">
                    <h5>Indicar % anualidad media del contrato</h5>
                    <br/>
                    <v-text-field filled label="% Anualidad media del contrato" v-model="datos.porcentajeAnualidadMedia"></v-text-field>
                    <h5>Importe anualidad media: {{datos.importeAnualidadMedia}}</h5>
                    <h5>Total % anualidad media: {{datos.importeAnualidadMedia}}</h5>
                </v-col>

                <v-col cols="12" 
                class="warn"
                v-if="datos.requisitos === false && 
                datos.solvenciaTecProfe === true && 
                this.objetoNecesidades.regArmonizada === false">
                    <h4>ATENCIÓN:</h4>
                    <p><i>El contrato se está realizando bajo regulación <b>NO ARMONIZADA</b></i></p>
                    <p><i>En los contratos no sujetos a regularización armonizada, si el 
                        contratista es una empresa de nueva creación no será necesario acreditar este 
                        apartado [artículo 89.14 h] de la LCSP
                    </i></p>
                    <p><i>
                        Para el <b>cumplimiento</b> de este apartado se tendrá en cuenta lo siguiente:
                    </i></p>
                    <ol>
                        <li>El importe de los contratos se calculará con <b>exclusión del IVA</b></li>
                        <li>Cuando la empresa licitadora hubiera ejecutado el contrato a través de una unión
                            temporal de empresas <b>(UTE)</b>, se computará el importe de aquél en <b>proporción a la
                            participación</b> de dicha empresa en la citada UTE.</li>
                        <li>Cuando las empresas liciten <b>agrupadas en UTE</b> se considerarán <b>indistintamente</b>
                            los contratos de cualquiera de las empresas constituyentes de la UTE para alcanzar
                            los porcentajes de valor estimado fijados.</li>
                    </ol>
                </v-col>
                
                <!-- OTROS -->
                <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaTecProfe === 'otros'">
                    <h5 class="subtitle">En caso de que sean otros, especificar:</h5>
                    <v-textarea filled auto-grow v-model="datos.otrosReqSolvTecProfe"></v-textarea>
                </v-col>
            </v-row>
        </v-row>
        <br/>

        <!--9.2.- Integracion de la solvencia -->
        <h5>Integración de la solvencia</h5>
        <v-row class="rowGroup">
            <v-col cols="12">
                <i>Si el licitador se basa en la solvencia y medios de otras entidades
                    para acreditar su solvencia, se establece la responsabilidad
                    solidaria de todos ellos [artículo 75 LCSP]</i>
                <br/>
                <v-radio-group v-model="datos.integracionSolvencia">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>
        
        <!--9.3.- Concrecion de las condiciones de solvencia -->
        <h5>Concreción de las condiciones de solvencia</h5>
        <v-row class="rowGroup">
                <v-col cols="12">
                    <h5 class="subtitle">1.- Obligación de adscribir medios personales o materiales</h5>
                    <v-radio-group v-model="datos.obligacionMediosMateriales">
                        <v-radio label="Si se exige, mediante compromiso en la declaración responsable complementaria al DEUC" :value="true"></v-radio>
                        <v-radio label="No se exige" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6">
                    <h5 class="subtitle">2.- Obligación de especificar nombres o cualificación profesional
                        del personal responsable de ejecutar la prestación
                    </h5>
                    <v-radio-group v-model="datos.obligacionNombresCualificacion">
                        <v-radio label="Si se exige, en la siguiente forma:" :value="true"></v-radio>
                        <v-radio label="No se exige" :value="false"></v-radio>  
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6" v-if="datos.obligacionNombresCualificacion === true">
                    <h5 class="subtitle">Si se exige, especificar</h5>
                    <br/>
                    <v-textarea auto-grow v-model="datos.especificarObligacion" filled></v-textarea>
                </v-col>
        </v-row>
        <br/>

        <h5>Habilitación empresaria exigible</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <v-radio-group v-model="datos.habilitacionExigible">
                    <v-radio label="La siguiente habilitación:" :value="true"></v-radio>
                    <v-radio label="Ninguna en especial" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.habilitacionExigible === true">
                <h5 class="subtitle">Especificar</h5>
                <v-textarea auto-grow v-model="datos.especificarHabilitacion" filled label="Habilitación exigible"></v-textarea>
            </v-col>
        </v-row>        
    </div>
</template>

<script>
    export default {
        name: 'CapacidadSolvencia',
        data(){
            return {
                plazoContrato: 0,
                solvenciaLotesHeaders: [
                    { text: "Lote", align: "start", sortable: false, value: "idLote", divider: true,},
                    { text: "Descripción", align: "start", sortable: false, value: "descripcion", divider: true,},
                    { text: "Requerido", align: "start", sortable: false, value: "importeReq", divider: true,},
                    { text: "Máximo exigible", align: "start", sortable: false, value: "maxSolvReq", divider: true,},
                    { text: "Válido", align: "start", sortable: false, value: "actions", divider: true,}
                ],

                solvenciaHeaders: [
                    { text: "Requerido", align: "start", sortable: false, value: "importeReq", divider: true,},
                    { text: "Máximo exigible", align: "start", sortable: false, value: "maxSolvReq", divider: true,},
                    { text: "Válido", align: "start", sortable: false, value: "actions", divider: true,}
                ],

                datos: {
                    //SECCION 8
                    participacionEmpresas: true,
                    empresasExcluidas: undefined,
                    componente:'CapacidadSolvencia',
                    requisitos: undefined,
                    solvenciaEconFinanc: undefined,
                    volumenAnualNegocio: [],
                    patrimonioNeto: undefined,
                    ratioActivos: undefined,
                    porcentajeAnualidadMedia: 0,
                    importeAnualidadMedia: 0,
                    solvenciaTecProfe: undefined,
                    otrosReqSolvTecProfe: undefined,
                    integracionSolvencia: 'no',
                    obligacionMediosMateriales: '',
                    obligacionNombresCualificacion: '',
                    especificarObligacion: '',
                    habilitacionExigible: 'ninguna',
                    especificarHabilitación: '',

                    hayVolumenAnualNegocio: false,
                    hayPatrimonioNeto: false,
                    hayRatioActivos: false,
                    hayLicitadorProfe: false,
                }
            }
        },
        
        props:['presBase', 'objetoNecesidades', 'datosGuardados'],

        beforeDestroy(){
            this.$emit('datos', this.datos)
        },

        created(){
            this.initialize();
        },

        watch:{
            datos: {
                deep: true,
                handler(datos){
                    //VALIDACION VOLUMEN NEGOCIOS
                    for(this.index in datos.volumenAnualNegocio){
                        if(parseFloat(datos.volumenAnualNegocio[this.index].maxSolvReq) < parseFloat(datos.volumenAnualNegocio[this.index].importeReq) || datos.volumenAnualNegocio[this.index].importeReq === 0){                         
                           datos.volumenAnualNegocio[this.index].actions = false
                        } else {
                            datos.volumenAnualNegocio[this.index].actions = true
                        }
                    }

                    //CONSISTENCIA DE DATOS
                    if(datos.solvenciaEconFinanc === 'volumen') {
                        datos.hayVolumenAnualNegocio = true; 
                        datos.hayPatrimonioNeto = false;
                        datos.hayRatioActivos = false;
                        datos.hayLicitadorProfe = false;
                    }
                    else if (datos.solvenciaEconFinanc === 'patrimonio') {
                        datos.hayVolumenAnualNegocio = false; 
                        datos.hayPatrimonioNeto = true;
                        datos.hayRatioActivos = false;
                        datos.hayLicitadorProfe = false;
                    }
                    else if (datos.solvenciaEconFinanc === 'ratio') {
                        datos.hayVolumenAnualNegocio = false; 
                        datos.hayPatrimonioNeto = false;
                        datos.hayRatioActivos = true;
                        datos.hayLicitadorProfe = false;
                    }
                    else if (datos.solvenciaEconFinanc === 'profesional') {
                        datos.hayVolumenAnualNegocio = false; 
                        datos.hayPatrimonioNeto = false;
                        datos.hayRatioActivos = false;
                        datos.hayLicitadorProfe = true;
                    }
                }
            }
        },

        methods:{
            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }
                
                //PLAZO DURACION CONTRATO
                if(this.presBase){
                    if (this.presBase.plazoMaximoEjecucion !== undefined){
                        this.plazoContrato = parseInt(this.presBase.plazoMaximoEjecucion)
                    }
                    else if (this.presBase.plazoMeses !== undefined){
                        this.plazoContrato = parseInt(this.presBase.plazoMeses)
                    }
                

                    //TABLAS SOLVENCIA
                    if(this.datos.volumenAnualNegocio.length === 0){
                        for (this.index in this.presBase.lotes){
                            if (this.plazoContrato < 12){
                                //Max menos de un año = 1.5 veces base licitacion
                                this.maxImporteReq = (parseFloat(this.presBase.lotes[this.index].baseLote) * 1.5).toFixed(2)
                                this.datos.importeAnualidadMedia = this.maxImporteReq;
                            } else {
                                //Max mas de un año = 1.5 veces anualidad media contrato
                                console.log("Calculo para mas de un año")
                                this.anualidadMed = parseFloat(this.presBase.lotes[this.index].baseLote);
                                this.anualidadMed = (this.anualidadMed / parseInt(this.plazoContrato)) * 12
                                this.maxImporteReq = parseFloat((this.anualidadMed * 1.5).toFixed(2))         
                                this.datos.importeAnualidadMedia = this.maxImporteReq;
                            }

                            this.newLote = {
                                idLote: this.presBase.lotes[this.index].idLote,
                                descripcion: this.presBase.lotes[this.index].descripcion,
                                importeReq: 0,
                                maxSolvReq: this.maxImporteReq,
                                actions: undefined,
                            }
                            this.datos.volumenAnualNegocio.push(this.newLote)
                        }
                    }
                }                  
            },
        }


    }
</script>

<style scoped>
    .subtitle {
        color: gray;
        font-weight: 500;
    }

    .rowGroup {
        margin-top: 0.1rem;
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 1rem 0rem 1rem 0rem;
    }

    .subRow {
        margin:0.7rem;
    }

    p {
        text-align: justify;
    }
    
    li{
        margin-bottom: 0.5rem;
    }

    .editField {
        color: blue;
        text-decoration: underline;
    }

    .warn {
        border: 1px solid lightgrey;
        background-color: rgb(232, 230, 230);
        padding: 1rem;
        border-radius: 4px;
    }
</style>
