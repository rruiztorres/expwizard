<template>
    <div>
        <h3>16.- Plazo para la adjudicación</h3>
        <br/>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">Se adjudicará el contrato dentro del plazo:</h5>
                <v-radio-group v-model="datos.plazoAdjudicacion">
                    <v-radio label="General de 2 meses" value="general"></v-radio>
                    <v-radio label="Otro" value="otro"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="4" v-if="datos.plazoAdjudicacion === 'otro'">
                <h5 class="subtitle">Si es otro, especificar:</h5>
                <v-text-field filled label="plazo" v-model="datos.plazoAdjudicacionJustificar"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <h3>17.- Responsable del contrato</h3>
        <br/>
        <v-row>
            <v-col cols="12" md="4">
                <v-text-field filled label="Nombre y apellidos"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-text-field filled label="Puesto"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
                <v-select filled label="Subdirección" :items="subdirecciones" v-model="datos.selectSubdireccion">
                </v-select>
            </v-col>
        </v-row>
        <br/>

        <h3>18.- Plazo de ejecución o duración</h3>
        <br/>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">Este contrato de suministro se define como:</h5>
                <v-radio-group v-model="datos.definicion">
                    <v-radio label="Un contrato con plazo de ejecución" value="plazoEjecucion"></v-radio>
                    <v-radio label="Un contrato con plazo de duración" value="plazoDuracion"></v-radio>
                </v-radio-group>
            </v-col>

            <!--PLAZO DE EJECUCION-->
            <v-col cols="12" md="4" v-if="datos.definicion === 'plazoEjecucion'">
                <h5 class="subtitle">Definir tipo:</h5>
                <v-radio-group v-model="datos.plazoEjecucion">
                    <v-radio label="Plazo máximo de ejecución" value="plazoMaximoEjecucion"></v-radio>
                    <v-radio label="Plazos parciales" value="plazosParciales"></v-radio>
                </v-radio-group>
            </v-col>
                
                <v-col cols="12" md="4" v-if="datos.definicion === 'plazoEjecucion' && datos.plazoEjecucion ==='plazoMaximoEjecucion'">
                    <h5 class="subtitle">Introducir plazo máximo:</h5>
                    <v-text-field filled label="Meses" v-model="datos.plazoMaximoEjecucion"></v-text-field>
                </v-col>

                <v-col cols="12" md="4" v-if="datos.definicion === 'plazoEjecucion' && datos.plazoEjecucion ==='plazosParciales'">
                    <h5 class="subtitle">Introducir plazos parciales:</h5>
                    <v-text-field filled label="Meses" v-model="datos.plazosParciales"></v-text-field>
                </v-col>
            
            <!--PLAZOS DE DURACION-->
            <v-col cols="12" md="3" v-if="datos.definicion === 'plazoDuracion'">
                <h5 class="subtitle">Definir plazo:</h5>
                <v-text-field filled label="Meses" v-model="datos.plazoDuracion"></v-text-field>
            </v-col>

            <v-col cols="12" md="2" v-if="datos.definicion === 'plazoDuracion'">
                <h5 class="subtitle">Prorroga:</h5>
                <v-radio-group v-model="datos.prorroga">
                    <v-radio label="No se prevee" value="no"></v-radio>
                    <v-radio label="Si se prevee" value="si"></v-radio>
                </v-radio-group>
            </v-col>

                <v-col cols="12" md="3" v-if="datos.definicion === 'plazoDuracion' && datos.prorroga === 'si'">
                    <h5 class="subtitle">Definir plazo prorroga</h5>
                    <v-text-field filled label="Meses" v-model="datos.prorrogaMeses"></v-text-field>
                </v-col>            
        </v-row>
        <br/>

        <v-row class="rowGroup">
            <v-col cols="12" md="5">
                <h5 class="subtitle">El plazo del contrato se iniciará:</h5>
                <v-radio-group v-model="datos.plazoInicio">
                    <v-radio label="Al dia siguiente al de formalización del contrato" value="dia siguiente"></v-radio>
                    <v-radio label="Otro plazo" value="otro"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="4" v-if="datos.plazoInicio === 'otro'">
                <h5 class="subtitle">Si se fija en otro plazo indicar fecha</h5>
                <v-text-field filled label="fecha"></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script>

    export default {
        name: 'PlazosResponsable',
        data(){
            return {
                subdirecciones: [   
                    'Astronomía, Geodesia y Geofísica',
                    'Cartografía y Observación del territorio',
                    'Secretaria General',
                ],

                datos:{
                    plazoAdjudicacion: '',
                    plazoAdjudicacionJustificar: '',
                    selectSubdireccion: 'Secretaria General',
                    definicion: '',
                    plazoEjecucion: '',
                    plazoMaximoEjecucion: '',
                    plazosParciales: '',
                    plazoDuracion: '',
                    prorroga: '',
                    prorrogaMeses: '',
                    plazoInicio: '',
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