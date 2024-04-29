<template>
    <div>
        <!-- PENALIDADES -->
        <div class="group">
            <h3>Penalidades
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 26"
                ></v-badge >
            </h3>
            <v-row class="rowGroup">
                <!-- INCUMPLIMIENTO DE LAS CONDICIONES ESPECIALES DE EJECUCIÓN -->
                <v-col cols="12">
                    <h5 class="subtitle">Por incumplimiento de las condiciones especiales de ejecución
                        <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-104" target="blank" title="Ver artículo 192 LCSP">   
                        [artículo 192.1 LCSP]</a>
                        <v-badge 
                        class="badge" color="#c7d6f2" content="?"
                        title="Punto 26.1"
                        ></v-badge >
                    </h5>
                    <v-radio-group v-model="datos.penConEsp">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- POR INCUMPLIMIENTO DEFECTUOSO -->
                <v-col cols="12">
                    <h5 class="subtitle">Por incumplimiento defectuoso
                    <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-104" target="blank" title="Ver artículo 192 LCSP">   
                        [artículo 192.1 LCSP]</a>
                        <v-badge 
                        class="badge" color="#c7d6f2" content="?"
                        title="Punto 26.2"
                        ></v-badge >
                    </h5>
                    <v-radio-group v-model="datos.penDefectuoso">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- POR INCUMPLIR CRITERIOS DE ADJUDICACIÓN -->
                <v-row style="margin:0rem 0rem -2rem 0rem;">
                    <v-col cols="12" md="3">
                        <h5 class="subtitle">Por incumplir criterios de adjudicación
                            <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-57" target="blank" title="Ver artículo 145 LCSP">   
                            [artículo 145 LCSP]</a>
                            <v-badge 
                            class="badge" color="#c7d6f2" content="?"
                            title="Punto 26.3"
                            ></v-badge >
                        </h5>
                        <v-radio-group v-model="datos.penCritAdj">
                            <v-radio label="Si" :value="true"></v-radio>
                            <v-radio label="No" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <!-- CASO AFIRMATIVO -->
                    <v-col cols="12" md="3" v-if="datos.penCritAdj === true">
                    <h5 class="subtitle">En caso afirmativo:</h5>
                    <v-radio-group v-model="datos.critPenAdj">
                        <v-radio label="Cualquiera de los criterios de adjudicación" :value="true"></v-radio>
                        <v-radio label="El criterio de adjudicación que se especifica a continuación:" :value="false"></v-radio>
                    </v-radio-group>
                    </v-col>
                    <!-- INDICAR CRITERIO -->
                    <v-col cols="12" md="6" v-if="datos.penCritAdj === true && datos.critPenAdj === false">
                    <h5 class="subtitle" style="margin-bottom:1.2rem;">Indicar criterio/s:</h5>
                    <v-textarea auto-grow filled v-model="datos.espCritPenAdj"></v-textarea>
                    </v-col>
                </v-row>

                <!-- POR DEMORA EN EL PLAZO DE EJECUCIÓN -->
                <v-col cols="12">
                <h5 class="subtitle">Por demora en el plazo de ejecución:
                    <v-badge 
                    class="badge" color="#c7d6f2" content="?"
                    title="Punto 26.4"
                    ></v-badge >
                </h5>
                    <v-radio-group v-model="datos.penDemoraPlazoEjec">
                        <v-radio label="Por incumplimiento de plazo. Las previstas en el artículo 193 de la LCSP" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- POR DEMORA EN EL PLAZO PARA LA PRESENTACION DEL PLAN DE SEGURIDAD Y SALUD -->
                <v-col cols="12">
                <h5 class="subtitle">Por demora en el plazo para la presentación del plan 
                    de seguridad y salud 
                    <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-105" target="blank" title="Ver artículo 193 LCSP">  
                    [artículo 193.5 LCSP]
                    </a>
                    <v-badge 
                    class="badge" color="#c7d6f2" content="?"
                    title="Punto 26.5"
                    ></v-badge >
                </h5>
                <v-radio-group v-model="datos.penDemoraPresent">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
            </v-row>
        </div>

        <!-- OTRAS PENALIDADES -->
        <div class="group">
           <h3>Otras penalidades
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 26.6"
                ></v-badge >
            </h3> 
            <v-row class="rowGroup">
                <!-- INCUMPLIR LAS CONDICIONES PARA LA SUBCONTRATACIÓN -->
                <v-col cols="12">
                    <h5 class="subtitle">Por incumplir las condiciones para la subcontratación</h5>
                    <v-radio-group v-model="datos.penSubcontrata">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>
                <!-- INCUMPLIR OBLIGACIONES DE INFORMACIÓN PUBLICIDAD FONDOS EUROPEOS -->
                <v-col cols="12" md="6">
                    <h5 class="subtitle">Por incumplir las obligaciones de información y publicidad establecidas
                        en el 
                        <a href="https://www.boe.es/doue/2013/347/L00320-00469.pdf" target="blank">
                        anexo XII, sección 2.2 del Reglamento (UE) 1303/2013</a>
                        del Parlamento europeo y Consejo de 17 de diciembre de 2013; cuando el contrato se financie con fondos europeos.
                    </h5>
                    <v-radio-group v-model="datos.penFondEurop">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>

        </div>
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
            },
        },

        data(){
            return {
                importeNumUnid: 'Presupuesto Base sin definir aun',
                importePresBase: undefined,

                datos: {
                    componente: 'ModificacionesPenalidades',
                    penConEsp: false,
                    penDefectuoso: false,
                    penCritAdj: false,
                    critPenAdj: true,
                    espCritPenAdj: '',
                    penDemoraPlazoEjec: false,
                    penDemoraPresent: false,
                    penSubcontrata: false,
                    penFondEurop: false,
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