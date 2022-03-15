<template>
    <div id="mainWrapper">
        <v-row>
            <v-col class="buttonBack" cols="12">
                <v-row class="titleRow">
                    <v-col cols="12" md="7" class="col1">
                        <h3>EXPEDIENTE DE SUMINISTRO ABIERTO</h3>
                    </v-col>
                    <v-col cols="12" md="5" class="col2">
                        <v-spacer></v-spacer>
                        <v-card-actions class="actions">
                                <v-btn color="error" class="headButton" @click="back">
                                    <v-icon class="iconBack">mdi-exit-run</v-icon>
                                    SALIR
                                </v-btn>
                                <v-btn color="success" :disabled="datosRecibidos === undefined" class="headButton" @click="execute">
                                    <v-icon class="iconBack">mdi-download</v-icon>
                                    PROBAR
                                </v-btn>
                                <v-btn color="info" class="headButton">
                                    <v-icon class="iconBack">mdi-content-save</v-icon>
                                    GUARDAR
                                </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-sheet elevation="6">
                    <v-tabs
                        background-color="cyan"
                        dark
                        show-arrows
                        fixed-tabs
                        center-active
                        centered
                    >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    
                        <v-tab>Objeto y necesidades</v-tab>
                        <v-tab>Presupuesto, lotes e incompatibilidades</v-tab>
                        <v-tab>Capacidad y solvencia</v-tab>
                        <v-tab>Garantías y Adjudicación</v-tab>
                        <v-tab>Puntuación</v-tab>
                        <v-tab>Ofertas Anormales</v-tab>


                    <!--OBJETO Y NECESIDADES-->
                    <v-tab-item class="tabContent">
                        <ObjetoNecesidades
                            @datos="getData"
                        ></ObjetoNecesidades>
                    </v-tab-item>

                    <!--PRESUPUESTO Y ANUALIDADES-->
                    <v-tab-item class="tabContent">
                        <PresupuestoAnualidades></PresupuestoAnualidades>
                    </v-tab-item>

                    <!--TRAMITACION E INCOMPATIBILIDADES-->
                    <v-tab-item class="tabContent">
                        <CapacidadSolvencia></CapacidadSolvencia>
                    </v-tab-item>

                    <!--GARANTIAS-->
                    <v-tab-item class="tabContent">
                        <Garantias></Garantias>
                    </v-tab-item>

                     <!--PUNTUACION SEGUN JUICIO VALOR-->
                    <v-tab-item class="tabContent">
                        <Puntuacion></Puntuacion>
                    </v-tab-item>

                     <!--OFERTAS ANORMALES-->
                    <v-tab-item class="tabContent">
                        <OfertasAnormales></OfertasAnormales>
                    </v-tab-item>


                    </v-tabs>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script> 
import ObjetoNecesidades from "@/components/SuministroAbierto/ObjetoNecesidades";
import PresupuestoAnualidades from "@/components/SuministroAbierto/PresupuestoAnualidades";
import CapacidadSolvencia from "@/components/SuministroAbierto/CapacidadSolvencia";
import Garantias from "@/components/SuministroAbierto/Garantias";
import Puntuacion from "@/components/SuministroAbierto/Puntuacion";
import OfertasAnormales from "@/components/SuministroAbierto/OfertasAnormales";

import {renderDoc} from "@/assets/mixins/renderDoc";


    export default{
        name: 'Assistant',

        components: { 
            ObjetoNecesidades, 
            PresupuestoAnualidades, 
            CapacidadSolvencia, 
            Garantias,
            Puntuacion,
            OfertasAnormales,
        },

        mixins: [renderDoc],

        data(){
            return{
                datosRecibidos: undefined,
            }
        },

        methods:{
            back(){
                this.$emit("back", true)
            },

            getData(data){
                this.datosRecibidos = data;
            },

            execute(){
                this.renderDoc(this.data);
            }
        }
    }

</script>

<style scoped>

    #mainWrapper {
        margin: 0 auto;
        max-width: 80rem;
    }

    h2, h3{
        font-weight: 400;
    }

    .tabContent{
        padding: 1rem;
        height: 69.5vh;
        overflow-y: auto;
    }

    .buttonBack {
        margin: auto 0;
        text-align: end;
    }
    .iconBack {
        margin-right: 1rem;
    }

    .titleRow{
        margin: 0rem;
        background-color: rgb(149, 214, 214) ;
        border-radius: 4px;
    }

    .col1{
        display:block;
        margin: auto 0;
    }

    .col1 > *{
        text-align: left;
    }

    .col2{
        width: 100%;
    }

    .headButton {
        width:33%;
    }
</style>

