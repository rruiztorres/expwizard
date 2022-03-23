<template>
    <div>
        <!-- 10 GARANTIAS -->
        <h3>10.- GARANTIAS</h3>
        <!--10.1 PROVISIONAL -->
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">10.1.- Provisional [art. 106.2 LCSP]</h5>
                <v-radio-group v-model="datos.provisional">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio label="Se se exige. Importe:" value="si"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="4" v-if="datos.provisional === 'si'">
                <h5 class="subtitle">Hasta 3% del presupuesto base de licitación (IVA inc.)</h5>
                <v-text-field filled></v-text-field>
            </v-col>
            <v-col cols="12" md="5" v-if="datos.provisional === 'si'">
                <h5 class="subtitle">Justificación:</h5>
                <v-text-field filled></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <!-- 10.2 DEFINITIVA -->
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">10.2.- Definitiva [art. 107.1 y 107.3 LCSP]</h5>
                <v-radio-group v-model="datos.definitiva">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio label="Se se exige. Importe:" value="si"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.definitiva === 'no'">
                <h5 class="subtitle">Justificación:</h5>
                <v-text-field filled></v-text-field>
            </v-col>
            <v-col cols="12" md="4" v-if="datos.definitiva === 'si'">
                <h5 class="subtitle">El 5% del precio final ofertado (IVA no inc.)</h5>
                <v-text-field filled></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <!-- 10.3 COMPLEMENTARIA -->
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">10.3.- Complementaria [art. 107.2 LCSP]</h5>
                <v-radio-group v-model="datos.complementaria">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio label="Se se exige. Importe:" value="si"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.complementaria === 'si'">
                <h5 class="subtitle">Indicar motivo:</h5>
                <v-radio-group v-model="datos.complementariaJustificar">
                    <v-radio label="Por circunstancias especiales" value="circunstancias especiales"></v-radio>
                    <v-radio label="Presunción de anormalidad" value="presuncion anormalidad"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>

        <!--11 CRITERIOS DE ADJUDICACION-->
        <h3>11.- CRITERIOS DE ADJUDICACIÓN</h3>
        <br/>
        <h5 class="subtitle">11.1.- Preponderancia de criterios</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="6">
                <h5 class="subtitle">1. Entre criterios cualitativos y criterios relacionados con el precio:</h5>
                <v-text-field v-model="datos.criteriosCualitativos" filled label="%"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <h5 class="subtitle">2. Criterios relacionados con el precio:</h5>
                <v-text-field v-model="datos.criteriosRelacionPrecio" filled label="%"></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script> 
    export default {
        nombre: 'Garantias',
        data(){
            return {
                datos:{
                    provisional: '',
                    defintiva: '',
                    complementaria: '',
                    complementariaJustificar: '',
                    criteriosCualitativos: '',
                    criteriosRelacionPrecio: '',
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

    .subtitle {
        color: gray;
        font-weight: 500;
    }
</style>