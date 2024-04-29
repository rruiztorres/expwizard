<template>
    <div>
        <!-- CESIÓN DEL CONTRATO -->
        <div>
            <h3>Cesión del contrato
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 27">
                </v-badge >
            </h3>
            <v-row class="rowGroup">
                <v-col cols="12">
                    <h5>Conforme al  
                        <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a2-26" target="blank" title="Ver artículo 214 LCSP">
                        [artículo 214 LCSP]</a>, este contrato podrá ser cedido:</h5>
                    <v-radio-group v-model="datos.cesion" style="margin-bottom:-1rem;">
                        <v-radio label="Si; siempre que se cumplan los requisitos del artículo 214 de la LCSP" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </div>
        <!-- SUBCONTRATACIÓN -->
        <div>
            <h3>Subcontratación
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 28">
                </v-badge >
            </h3>
            <v-row class="rowGroup">
                <v-col cols="12">
                    <h5>Parte de los trabajos, en atención a su especial naturaleza, deben ser ejecutados
                        directamente por el propio licitador o por una de las empresas de la UTE 
                        <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a7-7" target="blank" title="Ver artículo 75 LCSP">
                        [artículo 75.4 LCSP]
                        </a>
                    </h5>
                    <v-row>
                        <v-col cols="12" md="1">
                            <v-radio-group v-model="datos.subcontrata" style="margin-bottom:-1rem;">
                                <v-radio label="Si" :value="true"></v-radio>
                                <v-radio label="No" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>

                        <!-- EN CASO AFIRMATIVO -->
                        <v-col cols="12" md="6" v-if="datos.subcontrata === true">
                            <h5>En caso afirmativo, justificar:</h5>
                            <v-text-field filled label="Justificación" v-model="datos.subcontrataJustif"></v-text-field>
                        </v-col>

                        <!-- TRABAJOS A REALIZAR -->
                        <v-col cols="12" md="5" v-if="datos.subcontrata === true">
                            <h5>Trabajos a realizar directamente por adjudicatario:</h5>
                            <v-text-field filled label="Trabajos" v-model="datos.subcontrataTrabajos"></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>

        <!-- FACULTADES DE INSPECCION -->
        <div>
            <h3>Facultades de inspección de instalaciones y oficinas del contratista
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 29">
                </v-badge >
            </h3>
            <v-row class="rowGroup">
                <h5 class="subtitle" style="margin: 0.5rem 0rem -0.2rem 1rem;">
                El órgano de contratación ostenta la facultad de inspección de las actividades
                desarrolladas por el contratista durante la ejecución del contrato
                en los términos establecidos en el 
                <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-102" target="blank" title="Ver artículo 190 LCSP">
                [artículo 190 LCSP]
                </a>         
                </h5>
                    <v-col cols="12">
                        <v-radio-group v-model="datos.facultInspecc" style="margin-bottom:-1rem;">
                            <v-radio label="En este contrato el ejercicio de esta facultad sí se extiende a la inspección de las instalaciones, oficinas y demás emplazamientos en los que el contratista desarrolle sus actividades." :value="true"></v-radio>
                            <v-radio label="En este contrato el ejercicio de esta facultad no se extiende a la inspección de las instalaciones, oficinas y demás emplazamientos en los que el contratista desarrolle sus actividades" :value="false"></v-radio>   
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" v-if="datos.facultInspecc === true">
                        <h5>En caso afirmativo, justificar: </h5>
                        <v-textarea auto-grow filled v-model="datos.justifFacultInspecc" style="margin-bottom:-1rem;"></v-textarea>
                    </v-col>
            </v-row>
        </div>

        <!-- PLAZO DE RECEPCIÓN -->
        <div>
            <h3>Plazo de recepción
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 30">
                </v-badge >
            </h3>
            
            <v-row class="rowGroup">
                <v-col cols="12" md="2">
                    <h5>Plazo:</h5>
                    <v-radio-group v-model="datos.plazoRecep">
                        <v-radio label="Un (1) mes." :value="true"></v-radio>
                        <v-radio label="Otro" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- EN CASO DE SER OTRO ... -->
                <v-col cols="12" md="3" v-if="datos.plazoRecep === false">
                    <h5 style="margin-bottom:-0.5rem;">En caso de ser otro plazo, especificar plazo:</h5>
                    <br/>
                    <v-text-field filled type="number" v-model="datos.otroPlazo"></v-text-field>
                </v-col>

                <!-- JUSTIFICAR ... -->
                <v-col cols="12" md="7" v-if="datos.plazoRecep === false">
                    <h5 style="margin-bottom:-0.5rem;">Justificación:</h5>
                    <br/>
                    <v-text-field filled v-model="datos.otroPlazoJusti"></v-text-field>
                </v-col>
            </v-row> 
        </div>

        <!-- GARANTIA -->
        <div>
            <h3>Plazo de garantía
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 31">
                </v-badge >
            </h3>
            <v-row class="rowGroup">
                <v-col cols="12" md="3">
                    <h5>Plazo:</h5>
                    <v-radio-group v-model="datos.plazoGarant">
                        <v-radio label="Un año a partir de la recepción." :value="true"></v-radio>
                        <v-radio label="Otro" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                    <!-- EN CASO DE SER OTRO ... -->
                    <v-col cols="12" md="3" v-if="datos.plazoGarant === false">
                        <h5>En caso de ser otro plazo, especificar plazo:</h5>
                        <br/>
                        <v-text-field filled  v-model="datos.otroPlazoGarant"></v-text-field>
                    </v-col>

                    <!-- JUSTIFICAR ... -->
                    <v-col cols="12" md="6" v-if="datos.plazoGarant === false">
                        <h5>Justificación:</h5>
                        <br/>
                        <v-text-field filled v-model="datos.otroPlazoGarantJustif"></v-text-field>
                    </v-col>
            </v-row> 
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CesionSubcontrataOtros',
        data(){
            return {
                datos: {
                    componente: 'CesionSubcontrataOtros',
                    cesion: false,
                    subcontrata: false,
                    subcontrataJustif: false,
                    subcontrataTrabajos: false,
                    facultInspecc: false,
                    justifFacultInspecc: '',
                    plazoRecep: false,
                    otroPlazo: 0,
                    otroPlazoJusti: undefined,
                    plazoGarant: 0,
                    otroPlazoGarant: 0,
                    otroPlazoGarantJustif: undefined,
                }
            }
        },

        created(){
            this.initialize();
        },

        beforeDestroy(){
            this.$emit('datos', this.datos)
        },

        methods:{
            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }
            }
        }
    }
</script>
