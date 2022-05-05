<template>
    <div>
        <!-- 8 INCOMPATIBILIDADES PARA LA LICITACIÓN -->
        <h3>Incompatibilidades para la licitación</h3>
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
                        <v-radio label="No tiene consideración el contrato que se licita" value="no tiene"></v-radio>
                        <v-radio label="Si tiene esa consideración, las siguientes empresas han participado" value="si tiene"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6" v-if="datos.participacionEmpresas === 'si tiene'">
                    <h5>Empresas que deben ser excluidas de dicha licitación:</h5>
                    <v-textarea filled auto-grow v-model="datos.empresasExcluidas"></v-textarea>
                </v-col>
            </v-row>

            <!--8.1-->
            <v-row class="subRow">
                <v-col cols="12">
                    <h5 class="subtitle">
                    Contratos de servicios que tengan por objeto la vigilancia, supervisión, control y
                    dirección o la coordinación de la ejecución de contratos de obras e instalaciones
                    [artículo 70.2 LCSP]
                    </h5>
                </v-col>
                <v-col cols="12" md="6">
                    <v-radio-group v-model="datos.vigilanciaInstalaciones">
                        <v-radio
                        label="No tiene esa consideración el contrato que se licita"
                        value="no tiene"
                        ></v-radio>
                        <v-radio
                        label="Sí tiene esa consideración el contrato que se licita. En este caso, en la declaración responsable el licitador hará constar que no le afecta la causa de incompatibilidad, regulada en el artículo 70.2 de la LCSP, respecto de contrato o contratos que se detallan a continuación:"
                        value="si tiene"
                        ></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12" md="6" v-if="datos.vigilanciaInstalaciones === 'si tiene'">
                    <h5>Especificar contratos:</h5>
                    <v-textarea filled auto-grow v-model="datos.vigilanciaInstalacionesContratos"></v-textarea>
                </v-col>
            </v-row>

            <!--8.2-->
            <v-row class="subRow">
                <v-col cols="12">
                    <h5 class="subtitle">
                    Contratos de servicios que tengan por objeto la vigilancia, supervisión, control y
                    dirección de otros contratos [artículo 70.2 LCSP]
                    </h5>
                </v-col>
                <v-col cols="12" md="6">
                    <v-radio-group v-model="datos.vigilanciaOtrosContratos">
                        <v-radio
                        label="No tiene esa consideración el contrato que se licita"
                        value="no tiene"
                        ></v-radio>
                        <v-radio
                        label="Sí tiene esa consideración el contrato que se licita. En este caso, en la declaración responsable el licitador hará constar que no le afecta la causa de incompatibilidad, regulada en el artículo 70.2 de la LCSP, respecto de contrato o contratos que se detallan a continuación:"
                        value="si tiene"
                        ></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12" md="6" v-if="datos.vigilanciaOtrosContratos === 'si tiene'">
                    <h5>Especificar contratos:</h5>
                    <v-textarea filled auto-grow v-model="datos.vigilanciaContratosContratos"></v-textarea>
                </v-col>
            </v-row>
        </v-row>
        <br/>

         <!-- 9 CAPACIDAD Y SOLVENCIA -->
        <h3>Capacidad y solvencia</h3>
        <br/>

        <h5>Requisitos de solvencia</h5>
        <v-row class="rowGroup">
            <!--9.1 Requisitos de solvencia-->
            <v-row class="subRow">
                <v-col cols="12">
                    <i>Se acreditará mediante los documentos acreditativos de 
                    los requisitos especificados a continuación: </i>
                    <v-radio-group v-model="datos.requisitos">
                        <v-radio label="Los exigidos supletoriamente, a falta de especificación, en los artículos 87.3 y 89 de la LCSP" value="exigidos"></v-radio>
                        <v-radio label="Los que se especifican a continuación (de entre los criterios de solvencia económica y financiera -artículo 87- y técnica -artículo 89- de la LCSP)" value="especificados"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- ESPECIFICADOS -->

                <!-- SOLVENCIA ECONOMICA FINANCIERA-->
                <v-col cols="12" md="6" v-if="datos.requisitos === 'especificados'">
                    <h5>Solvencia económica y financiera [art. 87 LCSP]</h5>
                    <v-radio-group v-model="datos.solvenciaEconFinanc">
                        <v-radio label="El volumen anual de negocios, que referido al mejor ejercicio de los tres (3) últimos concluidos deberá ser:" value="volumen"></v-radio>
                        <v-radio label="El patrimonio neto al cierre del último ejercicio económico para el que esté vencida la obligación de aprobación de las cuentas anuales no será inferior a:" value="patrimonio"></v-radio>
                        <v-radio label="La ratio entre activos y pasivos al cierre del último ejercicio económico para el que esté vencida la obligación de aprobación de las cuentas anuales no inferior a:" value="ratio"></v-radio>
                        <v-radio label="El licitador es un profesional (no una empresa)" value="profesional"></v-radio>
                    </v-radio-group>
                </v-col>

                    <!-- CASO VOLUMEN ANUAL NEGOCIOS -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === 'especificados' && datos.solvenciaEconFinanc === 'volumen'">
                        <h5>Especificar importe exigido volumen anual de negocios:</h5>
                        <br/>
                        <!-- <v-text-field filled label="€" v-model="datos.volumenAnualNegocio" type="number"></v-text-field> -->
                        <v-data-table
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
                    </v-col>

                    <!-- CASO PATRIMONIO NETO AL CIERRE -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === 'especificados' && datos.solvenciaEconFinanc === 'patrimonio'">
                    <h5>Especificar patrimonio neto</h5>
                    <br/>
                    <v-text-field filled label="€" v-model="datos.patrimonioNeto" type="number"></v-text-field>
                    </v-col>

                    <!-- CASO RATIO ACTIVOS / PASIVOS -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === 'especificados' && datos.solvenciaEconFinanc === 'ratio'">
                    <h5>Especificar ratio activos / pasivos</h5>
                    <br/>
                    <v-text-field filled label="€" v-model="datos.patrimonioNeto" type="number"></v-text-field>
                    </v-col>

                    <!-- CASO PROFESIONAL (NO EMPRESA) -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === 'especificados' && datos.solvenciaEconFinanc === 'profesional'">
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
                <v-col cols="12" md="6" v-if="datos.requisitos === 'especificados'">
                    <h5>Solvencia técnica o profesional [art. 89 LCSP]</h5>
                    <br/>
                    <v-radio-group v-model="datos.solvenciaTecProfe">
                        <v-radio label="Relación de los principales suministros realizados en los últimos 3 meses" value="relSuministros"></v-radio>
                        <v-radio label="Otros de los previstos en el artículo 89" value="otros"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6" 
                v-if="datos.requisitos === 'especificados' && 
                datos.solvenciaTecProfe === 'relSuministros' && 
                this.objetoNecesidades.regArmonizada === false">
                    <h5>ATENCIÓN:</h5>
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
                <v-col cols="12" md="6" v-if="datos.requisitos === 'especificados' && datos.solvenciaTecProfe === 'otros'">
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
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>
        
        <!--9.3.- Concrecion de las condiciones de solvencia -->
        <h5>Concreción de las condiciones de solvencia</h5>
        <v-row class="rowGroup">
                <v-col cols="12" md="8">
                    <h5 class="subtitle">1.- Obligación de adscribir medios personales o materiales</h5>
                    <v-radio-group v-model="datos.obligacionMediosMateriales">
                        <v-radio label="No se exige" value="no"></v-radio>
                        <v-radio label="Si se exige, mediante compromiso en la declaración responsable complementaria al DEUC" value="si"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12" md="4" v-if="datos.obligacionMediosMateriales === 'si'">
                    <h5>Declaración responsable complementaria</h5>
                    <br/>
                    <v-btn color="info">ADJUNTAR DECLARACIÓN</v-btn>
                </v-col>


                <v-col cols="12" md="6">
                    <h5 class="subtitle">2.- Obligación de especificar nombres o cualificación profesional
                        del personal responsable de ejecutar la prestación
                    </h5>
                    <v-radio-group v-model="datos.obligacionNombresCualificacion">
                        <v-radio label="No se exige" value="no"></v-radio>
                        <v-radio label="Si se exige, en la siguiente forma:" value="si"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="6" v-if="datos.obligacionNombresCualificacion === 'si'">
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
                    <v-radio label="Ninguna en especial" value="ninguna"></v-radio>
                    <v-radio label="La siguiente habilitación:" value="especificada"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.habilitacionExigible === 'especificada'">
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
                solvenciaHeaders: [
                    { text: "Lote", align: "start", sortable: false, value: "idLote", divider: true,},
                    { text: "Descripción", align: "start", sortable: false, value: "descripcion", divider: true,},
                    { text: "Requerido", align: "start", sortable: false, value: "importeReq", divider: true,},
                    { text: "Máximo exigible", align: "start", sortable: false, value: "maxSolvReq", divider: true,},
                    { text: "Válido", align: "start", sortable: false, value: "actions", divider: true,}
                ],

                datos: {
                    //SECCION 8
                    participacionEmpresas: "no tiene",
                    empresasExcluidas: undefined,
                    vigilanciaInstalaciones: undefined,
                    vigilanciaInstalacionesContratos: '',
                    vigilanciaOtrosContratos: undefined,
                    vigilanciaContratosContratos: '',
                    componente:'CapacidadSolvencia',
                    requisitos: undefined,
                    solvenciaEconFinanc: undefined,
                    volumenAnualNegocio: [],
                    patrimonioNeto: undefined,
                    solvenciaTecProfe: undefined,
                    otrosReqSolvTecProfe: undefined,
                    integracionSolvencia: 'no',
                    obligacionMediosMateriales: '',
                    obligacionNombresCualificacion: '',
                    especificarObligacion: '',
                    habilitacionExigible: 'ninguna',
                    especificarHabilitación: '',
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
                            } else {
                                //Max mas de un año = 1.5 veces anualidad media contrato
                                this.anualidadMed = parseFloat(this.presBase.lotes[this.index].baseLote);
                                this.anualidadMed = (this.anualidadMed / parseInt(this.plazoContrato)) * 12
                                this.maxImporteReq = parseFloat((this.anualidadMed * 1.5).toFixed(2))         
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
</style>
