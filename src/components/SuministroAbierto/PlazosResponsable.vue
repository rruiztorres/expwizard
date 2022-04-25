<template>
    <div>
        <!-- 16.- PLAZO PARA LA ADJUDICACION -->
        <h3>16.- Plazo para la adjudicación</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">Se adjudicará el contrato dentro del plazo:</h5>
                <v-radio-group v-model="datos.plazoAdjudicacion">
                    <v-radio label="General de 2 meses" value="general"></v-radio>
                    <v-radio label="Otro" value="otro"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="4" v-if="datos.plazoAdjudicacion === 'otro'">
                <h5 class="subtitle">Si es otro plazo, especificar:</h5>
                <br/>
                <v-text-field filled label="plazo" v-model="datos.plazoAdjudicacionJustificar"></v-text-field>
            </v-col>
        </v-row>
        <br/>


        <!-- 17.- RESPONSABLE DEL CONTRATO -->
        <h3>17.- Responsable del contrato</h3>
        <v-row class="rowGroup">
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
    </div>
</template>

<script>

    export default {
        name: 'PlazosResponsable',
        props: ['datosGuardados'],
        data(){
            return {
                subdirecciones: [   
                    'Astronomía, Geodesia y Geofísica',
                    'Cartografía y Observación del territorio',
                    'Secretaria General',
                ],
                modalidades: ['Plazo', 'Periodo'],

                datos:{
                    componente:'PlazoResponsable',
                    plazoAdjudicacion: 'general',
                    plazoAdjudicacionJustificar: '',
                    selectSubdireccion: 'Secretaria General',
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