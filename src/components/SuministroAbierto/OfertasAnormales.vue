<template>
    <div>
        <h3>15.- Ofertas con valores anormales</h3>
        <br/>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">Se aplicará el criterio siguiente</h5>
                <v-radio-group v-model="datos.criterio">
                    <v-radio label="El establecido en el articulo 85 del RCAP" value="art85"></v-radio>
                    <v-radio label="El de la clausula 27 de este pliego con el siguiente umbral de temeridad:" value="temeridad"></v-radio>
                </v-radio-group>
            </v-col>
            
            <!--ARTICULO 85-->
            <v-col cols="12" md="4" v-if="datos.criterio === 'art85'">
                <h5 class="subtitle">¿Se reduciran 1/3 los porcentajes establecidos?</h5>
                <v-radio-group v-model="datos.reduccion">
                    <v-radio label="Si" value="si"></v-radio>
                    <v-radio label="No" value="no"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.criterio === 'art85' && datos.reduccion === 'si'">
                <h5 class="subtitle">En caso afirmativo, justificar:</h5>
                <v-text-field filled label="Justificación" v-model="datos.justificacionReduccion"></v-text-field>
            </v-col>

            <!--UMBRAL TEMERIDAD-->
            <v-col cols="12" md="4" v-if="datos.criterio === 'temeridad'">
                <h5 class="subtitle">Definir umbral:</h5>
                <v-text-field filled label="UT" v-model="datos.umbralTemeridad"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <v-row class="rowGroup">
            <v-col cols="12" md="6">
                <h5 class="subtitle">Seguimiento pormenorizado de ofertas incursas en presunción de anormalidad.</h5>
                <v-radio-group v-model="datos.seguimiento">
                    <v-radio label="Estableciendo un 20% como limite por incumplimiento" value="limite20%"></v-radio>
                    <v-radio label="Otra:" value="definir"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="6" v-if="datos.seguimiento === 'definir'">
                <h5 class="subtitle">Definir:</h5>
                <v-text-field filled label="Limite" v-model="datos.limiteSeguimiento"></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'OfertasAnormales',
        data(){
            return {
                datos: {
                    criterio: '',
                    reduccion: '',
                    justificacionReduccion: '',
                    umbralTemeridad: '',
                    seguimiento: '',
                    limiteSeguimiento: '',

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
    .rowGroup {
        margin-top: 0.1rem;
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 1rem 0rem 1rem 0rem;
    }
</style>
