<template>
    <div>
        <!-- 17.- RESPONSABLE DEL CONTRATO -->
        <h3 class="bSpacer">17.- Responsable del contrato</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <v-text-field filled label="Nombre y apellidos" v-model="datos.nombreResponsable"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field filled label="Puesto" v-model="datos.puestoResponsable"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-select filled label="Subdirección" :items="subdirecciones" v-model="datos.selectSubdireccion">
                </v-select>
            </v-col>
        </v-row>
        <br/>


        <!-- 22 PRESENTACIÓN DE FACTURAS -->
        <h3 class="bSpacer">22.- Presentación de facturas</h3>
        <v-row class="rowGroup">
            <div class="listaWrapper">
                <h4>Identificación de órganos administrativos:</h4>
                <ul>
                    <li>Oficina contable: <b>GE0014056 (Oficina contable I.D. Ministerio Transportes, Movilidad y Agenda Urbana)</b></li>
                    <li>Unidad tramitadora: <b>E03036304 - Secretaria General (DGIGN)</b></li>
                    <li>Órgano gestor: <b>E00125104 - D.G. del Instituto Geográfico Nacional</b></li>
                </ul>
            </div>
        </v-row>
        <br/><br/>

        <h3 class="bSpacer">23.- Comprobación de pagos a subcontratistas o suministradores</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="6">
                <v-radio-group v-model="datos.comprobacionPagos">
                    <v-radio label="No procede" :value="false"></v-radio>
                    <v-radio label="Si procede, por establecerse en este pliego [art. 217.1 LCSP]" :value="true"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>

        <!-- 24 CONDICIONES ESPECIALES DE EJECUCIÓN -->
        <h3 class="bSpacer">24.- Condiciones especiales de ejecución</h3>
        <h5>Se aplicará lo siguiente respecto de las condiciones especiales de ejecución:</h5>
        <br/>
        <h5 class="bSpacer subtitle">24.1- Relacionadas con la innovación, de tipo medioambiental o social:</h5>
        <v-row class="rowGroup p1">
            <v-row>
                <v-col cols="12">
                    <ul>
                        <li>Se exigirá <b>al menos una</b> [artículo 202.2 LCSP]</li>
                        <li>Se exigirán al <b>contratista y a los subcontratistas</b> [artículo 202.4 LCSP]</li>
                    </ul>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <h5 class="subtitle">1.- Emplear en la ejecución un % de trabajadores fijos >= 20%</h5>
                    <v-radio-group v-model="datos.exigidosFijo">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="4">
                    <h5 class="subtitle">2.- Emplear en la ejecución un % de trabajadores total nuevos empleos >= media nacional sector</h5>
                    <v-radio-group v-model="datos.exigidosMedia">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <v-col cols="12" md="4">
                    <h5 class="subtitle">3.- Emplear en la ejecución un % de trabajadores con discapacidad o situación riesgo >= 1%</h5>
                    <v-radio-group v-model="datos.exigidosDiscapacidad">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </v-row>
        <br/>
        
        <h5 class="bSpacer subtitle">24.2- Otras condiciones especiales de ejecución:</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">1.- Adscripción de medios específicos [art. 76.2 LCSP]</h5>
                <v-radio-group v-model="datos.adscripcionMedios">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.adscripcionMedios === true">
                <h5 class="subtitle">En caso afirmativo:</h5>
                <br/>
                <i>Deberán adscribirse los medios personales y materiales especificados en el ANEXO III de este pliego</i>                
            </v-col>
        </v-row>
        <br/><br/>





        <v-row class="rowGroup">
            <v-col cols="12">
                <h5 class="subtitle bSpacer">2.- Seguro de responsabilidad civil por riesgos profesionales [artículo 202 LCSP]</h5>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <!-- 2.- SEGURO DE RESPONSABILIDAD CIVIL -->
                    <v-col cols="12" md="1">
                        <h5 class="subtitle">¿Exigido?</h5>
                        <v-radio-group v-model="datos.seguroRespCivil">
                            <v-radio label="Si" value="si"></v-radio>
                            <v-radio label="No" value="no"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="2" v-if="datos.seguroRespCivil === 'si'">
                        <h5 class="subtitle">Suma asegurada:</h5>
                        <v-radio-group v-model="datos.sumaAsegurada">
                            <v-radio label="2.000.000 €" :value="true"></v-radio>
                            <v-radio label="Otra cantidad" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="4" v-if="datos.seguroRespCivil === 'si' && datos.sumaAsegurada === false">
                        <h5 class="subtitle">Especificar cantidad</h5>
                        <v-text-field filled label="(€)" v-model="datos.aseguradoEspecifico"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="5" v-if="datos.seguroRespCivil === 'si' && datos.sumaAsegurada === false">
                        <h5 class="subtitle">Riesgo específico asegurado:</h5>
                        <v-text-field filled label="(€)" v-model="datos.riesgoAseguradoEspecifico"></v-text-field>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <br/><br/>



        

        <v-row class="rowGroup">
            <!-- 3.- CONFIDENCIALIDAD -->
            <v-col cols="12" md="3">
                <h5 class="subtitle">3.- Confidencialidad [art. 133.2 LCSP]</h5>
                <v-radio-group v-model="datos.confidencialidad">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
                <!-- PLAZO CONFIDENCIALIDAD -->
                <v-col cols="12" md="2" v-if="datos.confidencialidad === true">
                    <h5 class="subtitle">Plazo confidencialidad</h5>
                    <v-radio-group v-model="datos.plazoConfidencialidad">
                        <v-radio label="5 Años" :value="true"></v-radio>
                        <v-radio label="Otro" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>
                <!-- JUSTIFICACION CONFIDENCIALIDAD -->
                <v-col cols="12" md="3" v-if="datos.confidencialidad === true && datos.plazoConfidencialidad === false">
                    <h5 class="subtitle bSpacer">Especificar:</h5>
                    <v-text-field filled label="Años" v-model="datos.plazoConfidencialidadEspecifico"></v-text-field>
                </v-col>
        </v-row>       
    </div>
</template>

<script> 
    export default {
        name: 'EjecucionYotros',
        props:['datosGuardados'],
        data(){
            return {
                subdirecciones: [   
                    'Astronomía, Geodesia y Geofísica',
                    'Cartografía y Observación del territorio',
                    'Secretaria General',
                ],
                modalidades: ['Plazo', 'Periodo'],
                
                datos: {
                    componente: 'EjecucionYotros',

                    nombreResponsable: undefined,
                    puestoResponsable: undefined,
                    selectSubdireccion: 'Secretaria General',
                    comprobacionPagos: 'no',
                    condicionesEspeciales: '',
                    exigidosFijo: '',
                    exigidosMedia: '',
                    exigidosDiscapacidad: '',
                    adscripcionMedios: '',
                    seguroRespCivil: '',
                    confidencialidad: '',
                    plazoConfidencialidad: '',
                    plazoConfidencialidadEspecifico: '',
                    sumaAsegurada: false,
                    aseguradoEspecifico: '',
                    riesgoAseguradoEspecifico: '',
                }
            }
        },

        beforeDestroy(){
            this.$emit('datos', this.datos)
        },

        created(){
            this.initialize();
        },

        methods:{
            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }
            },
        }
    }
</script>

<style scoped>
    .listaWrapper {
        margin-left: 1rem;
        color: #aaadb3;
        font-size: 90%;
        font-style: italic;
    }

    .p1{
        padding: 0.7rem;
    }

    h4 {
        margin-bottom: 0.35rem;
    }
</style>