<template>
    <div>
        <h3>15.- Ofertas con valores anormales</h3>
        <br/>
        <v-row>
            <v-col cols="12" md="6">
                <h5 class="subtitle">Se aplicará el criterio siguiente</h5>
                <v-radio-group>
                    <v-radio label="El establecido en el articulo 85 del RCAP" value="art85"></v-radio>
                    <v-radio label="El de la clausula 27 de este pliego con el siguiente umbral de temeridad:" value="temeridad"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'OfertasAnormales',
        data(){
            return {

            }
        }
    }
</script>

<style scoped>

</style>
