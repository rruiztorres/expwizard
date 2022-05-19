<template>
    <div>
        <!-- 26 PENALIDADES -->
        <h3>26.- PENALIDADES</h3>
        <br/>
        <v-row class="rowGroup">
            <!-- 26.1 -->
            <v-col cols="12">
                <h5 class="subtitle">26.1.- Por incumplimiento de las condiciones especiales de ejecución [artículo 192.1 LCSP]</h5>
                <v-radio-group v-model="datos.penConEsp">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.2 -->
            <v-col cols="12">
                <h5 class="subtitle">26.2.- Por incumplimiento defectuoso [artículo 192.1 LCSP]</h5>
                <v-radio-group v-model="datos.penDefectuoso">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.3 -->
            <v-col cols="12" md="5">
                <h5 class="subtitle">26.3.- Por incumplir criterios de adjudicación [artículo 145 LCSP]</h5>
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
                    <v-col cols="12" md="4" v-if="datos.penCritAdj === true && datos.critPenAdj === false">
                    <h5 class="subtitle">Indicar criterio/s:</h5>
                    <v-textarea auto-grow filled v-model="datos.espCritPenAdj"></v-textarea>
                    </v-col>
            
            <!-- 26.4 -->
            <v-col cols="12">
                <h5 class="subtitle">26.4.- Por demora en el plazo de ejecución:</h5>
                <v-radio-group v-model="datos.penDemoraPlazoEjec">
                    <v-radio label="Por incumplimiento de plazo. Las previstas en el artículo 193 de la LCSP" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.5 -->
            <v-col cols="12">
                <h5 class="subtitle">26.5.- Por demora en el plazo para la presentación del plan 
                    de seguridad y salud [artículo 193.5 LCSP]
                </h5>
                <v-radio-group v-model="datos.penDemoraPresent">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <!-- 26.6 -->
            <v-col cols="12">
                <h5 class="subtitle">26.6.- Otras penalidades [artículo 193 LCSP]</h5>
                <v-row class="rowGroup rowSubGroup">
                    <v-col cols="12">
                        <h5 class="subtitle">1.- Por incumplir las condiciones para la subcontratación</h5>
                        <v-radio-group v-model="datos.penSubcontrata">
                            <v-radio label="Si" :value="true"></v-radio>
                            <v-radio label="No" :value="false"></v-radio>
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
                            <v-radio label="Si" :value="true"></v-radio>
                            <v-radio label="No" :value="false"></v-radio>
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