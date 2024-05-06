<template>
    <div>
        <!-- RESPONSABLE DEL CONTRATO -->
        <div class="group">
            <h3 id="Responsable del contrato">
                Responsable del contrato
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 17"
                ></v-badge >
            </h3>
            <v-row class="rowGroup">
                <v-col cols="12" md="4">
                    <v-text-field style="margin-bottom:-1rem;" dense filled label="Nombre y apellidos" v-model="datos.nombreResponsable"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field style="margin-bottom:-1rem;" dense filled label="Puesto" v-model="datos.puestoResponsable"></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select style="margin-bottom:-1rem;" dense filled label="Subdirección" :items="subdirecciones" v-model="datos.selectSubdireccion">
                    </v-select>
                </v-col>
            </v-row>
        </div>

        <!-- PRESENTACIÓN DE FACTURAS -->
        <div class="group">
            <h3 id="Presentación de facturas">
                Presentación de facturas
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 22"
                ></v-badge >
            </h3>
            <v-row class="rowGroup">
                <v-col cols="12" class="listaWrapper">
                    <h4>Identificación de órganos administrativos:</h4>
                    <ul>
                        <li>Oficina contable: <b>GE0014056 (Oficina contable I.D. Ministerio Transportes, Movilidad y Agenda Urbana)</b></li>
                        <li>Unidad tramitadora: <b>E03036304 - Secretaria General (DGIGN)</b></li>
                        <li>Órgano gestor: <b>E00125104 - D.G. del Instituto Geográfico Nacional</b></li>
                    </ul>
                </v-col>
            </v-row>
        </div>

        <!-- COMPROBACIÓN DE PAGOS A SUBCONTRATISTAS O SUMINISTRADORES -->
        <div class="group">
            <h3 id="Comprobación de pagos a subcontratistas o suministradores">
                Comprobación de pagos a subcontratistas o suministradores
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 23"
                ></v-badge >
            </h3>
            <v-row class="rowGroup">
                <v-col cols="12" md="6">
                    <h5>Según
                    <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a2-29" target="blank" title="Ver artículo 271 LCSP">   
                        [art. 217.1 LCSP]</a></h5>
                    <v-radio-group v-model="datos.comprobacionPagos" style="margin-bottom:-1rem;">
                        <v-radio label="No procede" :value="false"></v-radio>
                        <v-radio label="Si procede, por establecerse en este pliego" :value="true"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </div>

        <!-- CONDICIONES ESPECIALES DE EJECUCIÓN -->
        <div class="group">
            <h3 id="Condiciones especiales de ejecución">
                Condiciones especiales de ejecución
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 24"
                ></v-badge >
            </h3>
            <v-row class="rowGroup">
                <!-- RELACIONADAS CON LA INNOVACION, DE TIPO MEDIOAMBIENTAL O SOCIAL -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12">
                            <h4 class="subtitle" style="margin:-0.5rem 0rem 1rem 0rem;">Se aplicará lo siguiente respecto de las condiciones especiales de ejecución:</h4>
                            <h5 id="Relacionadas con la innovación, de tipo medioambiental o social">
                                Relacionadas con la innovación, de tipo medioambiental o social:
                                <v-badge 
                                class="badge" color="#c7d6f2" content="?"
                                title="Punto 24.1"
                                ></v-badge >
                            </h5>
                            <v-alert dense text type="info" style="font-size:85%; margin: 0.5rem 0rem -0.5rem 0rem;">
                            · Se exigirá <b>al menos una</b> <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a2-14" target="blank" title="Ver artículo 202 LCSP">[artículo 202.2 LCSP]</a>
                            <br/>
                            · Se exigirán al <b>contratista y a los subcontratistas</b> <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a2-14" target="blank" title="Ver artículo 202 LCSP">[artículo 202.4 LCSP]</a>
                            
                            </v-alert>
                        </v-col>
                        <v-col cols="12" md="3">
                            <h5 class="subtitle">Emplear en la ejecución un tanto por ciento de trabajadores fijos igual o mayor al 20%</h5>
                            <v-radio-group v-model="datos.exigidosFijo">
                                <v-radio label="Si" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" md="5">
                            <h5 class="subtitle">Emplear en la ejecución un tanto por ciento de trabajadores total nuevos empleos mayor o igual a la media nacional sector</h5>
                            <v-radio-group v-model="datos.exigidosMedia">
                                <v-radio label="Si" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" md="4">
                            <h5 class="subtitle">Emplear en la ejecución un tanto por ciento de trabajadores con discapacidad o situación riesgo mayor o igual al 1%</h5>
                            <v-radio-group v-model="datos.exigidosDiscapacidad">
                                <v-radio label="Si" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- OTRAS CONDICIONES ESPECIALES DE EJECUCIÓN -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="3">
                            <h5  style="margin:-1rem 0rem 1rem 0rem;" id="Otras condiciones especiales de ejecución">
                                Otras condiciones especiales de ejecución:
                                <v-badge 
                                class="badge" color="#c7d6f2" content="?"
                                title="Punto 24.2"
                                ></v-badge >
                            </h5>
                            <h5 class="subtitle">Adscripción de medios específicos 
                                <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a7-8" target="blank" title="Ver artículo 76 LCSP">
                                [art. 76.2 LCSP]
                            </a></h5>
                            <v-radio-group v-model="datos.adscripcionMedios">
                                <v-radio label="Si" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>      
                        </v-col>
                        <v-col cols="9" v-if="datos.adscripcionMedios === true">
                            <h5 class="subtitle" style="margin:1.2rem 0rem 1.3rem 0rem;">En caso afirmativo:</h5>
                            <v-alert text dense type="info">
                            Deberán adscribirse los medios personales y materiales especificados en el ANEXO III de este pliego
                            </v-alert>               
                        </v-col>
                    </v-row>          
                </v-col>

                <!-- SEGURO DE RESPONSABILIDAD CIVIL -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12">
                            <h5>Seguro de responsabilidad civil por riesgos profesionales 
                            <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a2-14" target="blank" title="Ver artículo 202 LCSP"> 
                            [artículo 202 LCSP]
                            </a></h5>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" md="1">
                            <h5 class="subtitle">¿Exigido?</h5>
                            <v-radio-group v-model="datos.seguroRespCivil">
                                <v-radio label="Si" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>

                        <v-col cols="12" md="2" v-if="datos.seguroRespCivil === true">
                            <h5 class="subtitle">Suma asegurada:</h5>
                            <v-radio-group v-model="datos.sumaAsegurada">
                                <v-radio label="2.000.000 €" :value="true"></v-radio>
                                <v-radio label="Otra cantidad" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>

                        <v-col cols="12" md="4" v-if="datos.seguroRespCivil === true && datos.sumaAsegurada === false">
                            <h5 class="subtitle">Especificar cantidad</h5>
                            <v-text-field style="margin-top:1.2rem;" dense filled type="number" v-model="datos.aseguradoEspecifico"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="5" v-if="datos.seguroRespCivil === true && datos.sumaAsegurada === false">
                            <h5 class="subtitle">Riesgo específico asegurado:</h5>
                            <v-text-field style="margin-top:1.2rem;" dense filled type="number" v-model="datos.riesgoAseguradoEspecifico"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>

                <!-- CONFIDENCIALIDAD --> 
                <v-col cols="12">
                    <v-row>
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
                        <v-col cols="12" md="7" v-if="datos.confidencialidad === true && datos.plazoConfidencialidad === false">
                            <h5 class="subtitle bSpacer">Especificar años:</h5>
                            <v-text-field dense filled type="number" style="margin-top:1.2rem;" v-model="datos.plazoConfidencialidadEspecifico"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>    
    </div>
</template>

<script> 
    export default {
        name: 'PlazosRespEjecucion',
        props:['datosGuardados', 'goToElement'],
        data(){
            return {
                subdirecciones: [   
                    'Secretaría General',
                    'Subdirección General de Astronomía y Geodesia',
                    'Subdirección General de Cartografía y Observación del Territorio',
                    'Subdirección General de Vigilancia, Alerta y Estudios Geofísicos',
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

        updated(){
            this.$emit('datos', this.datos)
        },

        beforeDestroy(){
            //NECESARIO PARA COMPARTIR DATOS ENTRE SECCIONES
            this.$emit('datos', this.datos)
        },

        created(){
            this.initialize();
        },

        watch:{
            goToElement(){
                this.setElementScroll();
            }
        },


        methods:{
            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }
            },

            setElementScroll(){
                if(this.goToElement !== undefined){
                    setTimeout(()=>{
                        let element = document.getElementById(this.goToElement)
                        element.scrollIntoView({ block: "start", behavior: "smooth" });
                        }, 500)
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