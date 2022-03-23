<template>
    <div>
        <h3>9.- Capacidad y solvencia</h3>
        <br/>
        <h5>9.1.- Requisitos de solvencia</h5>
        <v-row class="rowGroup">
            <!-- 9 CAPACIDAD Y SOLVENCIA -->
            <v-col cols="12" md="3">
                <h5 class="subtitle">Solvencia económica y financiera</h5>
                <v-radio-group v-model="datos.requisitos">
                    <v-radio label="Exigidos supletoriamente" value="exigidos"></v-radio>
                    <v-radio label="Especificados a continuación" value="especificados"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="3" v-if="datos.requisitos === 'especificados'">
                <v-radio-group v-model="datos.especificados">
                    <v-radio label="Volumen anual negocios" value="volumen negocio"></v-radio>
                    <v-radio label="Patrimonio neto" value="patrimonio neto"></v-radio>
                    <v-radio label="Ratio activos / pasivos" value="ratio activos pasivos"></v-radio>
                </v-radio-group>
            </v-col>

            <!--VOLUMEN NEGOCIO-->
            <v-col cols="12" md="3" v-if="datos.requisitos === 'especificados' && datos.especificados === 'volumen negocio'">
                <h5 class="subtitle">Volumen negocio</h5>
                <v-text-field filled label="Total €"></v-text-field>
            </v-col>
            <!--PATRIMONIO NETO-->
            <v-col cols="12" md="3" v-if="datos.requisitos === 'especificados' && datos.especificados === 'patrimonio neto'">
                <h5 class="subtitle">Patrimonio Neto</h5>
                <v-text-field filled label="Total €"></v-text-field>
            </v-col>
            <!--RATIO ACTIVO/PASIVO-->
            <v-col cols="12" md="3" v-if="datos.requisitos === 'especificados' && datos.especificados === 'ratio activos pasivos'">
                <h5 class="subtitle">Activos / pasivos"</h5>
                <v-text-field filled label="Ratio"></v-text-field>
            </v-col>
        </v-row>
        <br/>
        
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">Tipo licitador</h5>
                <v-radio-group v-model="datos.profesional">
                    <v-radio label="Profesional" value="profesional"></v-radio>
                    <v-radio label="Empresa" value="empresa"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4">
                <h5 class="subtitle">Solvencia técnica o profesional</h5>
                <v-radio-group v-model="datos.solvenciaTecnica">
                    <v-radio label="Relación de suministros igual a:" value="relacion suministros"></v-radio>
                    <v-radio label="Otros previstos art.89" value="otros previstos"></v-radio>
                </v-radio-group>
            </v-col>

            <!--SUMINISTRO PRINCIPAL-->
            <v-col cols="12" md="4" v-if="datos.solvenciaTecnica === 'relacion suministros'">
                <h5 class="subtitle">Anualidad media contrato</h5>
                <v-text-field v-model="datos.suministrosPpal" filled label="%"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <h5>9.2.- Integración de la solvencia</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <v-radio-group v-model="datos.integracionSolvencia">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>

        <h5>9.3.- Concreción de las condiciones de solvencia</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <br/>
                <h5 class="subtitle">Obligación de adscribir medios personales o materiales</h5>
                <v-radio-group v-model="datos.obligacionMediosMateriales">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio label="Si se exige" value="si"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4">
                <br/>
                <h5 class="subtitle">Obligación de especificar nombres o cualificación</h5>
                <v-radio-group v-model="datos.obligacionNombresCualificacion">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio label="Si se exige" value="si"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.obligacionNombresCualificacion === 'si'">
                <br/>
                <h5 class="subtitle">Si se exige, especificar</h5>
                <v-text-field v-model="datos.especificarObligacion" filled label="especificar obligaciones"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <h5>9.4.- Habilitación empresaria exigible</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <v-radio-group v-model="datos.habilitacionExigible">
                    <v-radio label="Ninguna en especial" value="ninguna"></v-radio>
                    <v-radio label="La siguiente habilitación:" value="especificada"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.habilitacionExigible === 'especificada'">
                <h5 class="subtitle">Especificar</h5>
                <v-text-field v-model="datos.especificarHabilitacion" filled label="Habilitación exigible"></v-text-field>
            </v-col>
        </v-row>

        
    </div>
</template>

<script>
    export default {
        name: 'CapacidadSolvencia',
        data(){
            return {
                datos: {
                    componente:'CapacidadSolvencia',
                    requisitos: '',
                    especificados: '',
                    profesional: '',
                    suministroPpal: '',
                    solvenciaTecnica: '',
                    integracionSolvencia: false,
                    obligacionMediosMateriales: '',
                    obligacionNombresCualificacion: '',
                    especificarObligacion: '',
                    habilitacionExigible: '',
                    especificarHabilitación: '',
                }
            }
        },

        watch:{
            datos: {
                deep: true,
                handler(datos){
                //DEFINIR CONDICIONES PARA QUE NO SE EMITAN DATOS INCOMPLETOS
                    this.$emit('datos', datos)
                }
            },
        },
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
</style>
