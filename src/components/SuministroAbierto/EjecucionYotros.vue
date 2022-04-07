<template>
    <div>
        <h3 class="bSpacer">23.- Comprobación de pagos a subcontratistas o suministradores</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="6">
                <v-radio-group v-model="datos.comprobacionPagos">
                    <v-radio label="No procede" value="no"></v-radio>
                    <v-radio label="Si procede, por establecerse en este pliego [art. 217.1 LCSP]" value="si"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>

        <h3 class="bSpacer">24.- Condiciones especiales de ejecución</h3>

        <h5 class="bSpacer">24.1- Relacionadas con la innovación, de tipo medioambiental o social:</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">Emplear en la ejecución un % de trabajadores fijos >= 20%</h5>
                <v-radio-group v-model="datos.exigidosFijo">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4">
                <h5 class="subtitle">Emplear en la ejecución un % de trabajadores total nuevos empleos >= media nacional sector</h5>
                <v-radio-group v-model="datos.exigidosMedia">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4">
                <h5 class="subtitle">Emplear en la ejecución un % de trabajadores con discapacidad o situación riesgo >= 1%</h5>
                <v-radio-group v-model="datos.exigidosDiscapacidad">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>

        <h5 class="bSpacer">24.2- Otras condiciones especiales de ejecución:</h5>
        <v-row class="rowGroup bSpacer">
            <v-col cols="12" md="4">
                <h5 class="subtitle bSpacer">Adscripción de medios específicos [art. 76.2 LCSP]</h5>
                <v-radio-group v-model="datos.adscripcionMedios">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="3">
                <h5 class="subtitle">Confidencialidad [art. 133.2 LCSP]</h5>
                <v-radio-group v-model="datos.confidencialidad">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="2" v-if="datos.confidencialidad === 'si'">
                <h5 class="subtitle">Plazo confidencialidad</h5>
                <v-radio-group v-model="datos.plazoConfidencialidad">
                    <v-radio label="5 Años" value="5"></v-radio>
                    <v-radio label="Otro" value="otro"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="3" v-if="datos.confidencialidad === 'si' && datos.plazoConfidencialidad === 'otro'">
                <h5 class="subtitle bSpacer">Especificar:</h5>
                <v-text-field filled label="Años" v-model="datos.plazoConfidencialidadEspecifico"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <h5 class="subtitle bSpacer">Seguro de responsabilidad civil [art. 202 LCSP]</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="2">
                <h5 class="subtitle">¿Exigido?</h5>
                <v-radio-group v-model="datos.seguroRespCivil">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="2" v-if="datos.seguroRespCivil === 'si'">
                <h5 class="subtitle">Suma asegurada:</h5>
                <v-radio-group v-model="datos.sumaAsegurada">
                    <v-radio label="2.000.000 €" value="2MM"></v-radio>
                    <v-radio label="Otra cantidad" value="otra"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.seguroRespCivil === 'si' && datos.sumaAsegurada === 'otra'">
                <h5 class="subtitle">Especificar cantidad</h5>
                <v-text-field filled label="(€)" v-model="datos.aseguradoEspecifico"></v-text-field>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.seguroRespCivil === 'si' && datos.sumaAsegurada === 'otra'">
                <h5 class="subtitle">Riesgo específico asegurado:</h5>
                <v-text-field filled label="(€)" v-model="datos.aseguradoEspecifico"></v-text-field>
            </v-col>
        </v-row>
        
    </div>
</template>

<script> 
    export default {
        name: 'EjecucionYotros',
        data(){
            return {
                datos: {
                    componente: 'EjecucionYotros',
                    comprobacionPagos: '',
                    condicionesEspeciales: '',
                    exigidosFijo: '',
                    exigidosMedia: '',
                    exigidosDiscapacidad: '',
                    adscripcionMedios: '',
                    seguroRespCivil: '',
                    confidencialidad: '',
                    plazoConfidencialidad: '',
                    plazoConfidencialidadEspecifico: '',
                    sumaAsegurada: '',
                    aseguradoEspecifico: '',
                }
            }
        },

        beforeDestroy(){
            this.$emit('datos', this.datos)
        },
    }
</script>