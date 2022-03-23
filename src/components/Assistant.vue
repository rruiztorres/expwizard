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
                                <v-btn color="success" class="headButton" @click="execute">
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
                        <v-tab>Puntuación y Ofertas anormales</v-tab>
                        <v-tab>Plazos y Responsable</v-tab>
                        <v-tab>Pagos, Rev. precios y Abonos a cuenta</v-tab>
                        <v-tab>Ejecución y otros</v-tab>


                    <!--OBJETO Y NECESIDADES-->
                    <v-tab-item class="tabContent">
                        <ObjetoNecesidades
                            @datos="getData"
                        ></ObjetoNecesidades>
                    </v-tab-item>

                    <!--PRESUPUESTO Y ANUALIDADES-->
                    <v-tab-item class="tabContent">
                        <PresupuestoAnualidades
                            @datos="getData"
                        ></PresupuestoAnualidades>
                    </v-tab-item>

                    <!--TRAMITACION E INCOMPATIBILIDADES-->
                    <v-tab-item class="tabContent">
                        <CapacidadSolvencia
                            @datos="getData"
                        ></CapacidadSolvencia>
                    </v-tab-item>

                    <!--GARANTIAS-->
                    <v-tab-item class="tabContent">
                        <Garantias
                            @datos="getData"
                        ></Garantias>
                    </v-tab-item>

                     <!--PUNTUACION Y OFERTAS ANORMALES-->
                    <v-tab-item class="tabContent">
                        <PuntuacionOfertasAnormales
                            @datos="getData"
                        ></PuntuacionOfertasAnormales>
                    </v-tab-item>

                    <!--PLAZOS Y RESPONSABLE-->
                    <v-tab-item class="tabContent">
                        <PlazosResponsable
                            @datos="getData"
                        ></PlazosResponsable>
                    </v-tab-item>

                    <!--REGIMEN PAGOS REVISION PRECIOS-->
                    <v-tab-item class="tabContent">
                        <RegimenPagosRevision
                            @datos="getData"
                        ></RegimenPagosRevision>
                    </v-tab-item>

                    <!--EJECUCION Y OTROS-->
                    <v-tab-item class="tabContent">
                        <EjecucionYotros
                            @datos="getData"
                        ></EjecucionYotros>
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
import PuntuacionOfertasAnormales from "@/components/SuministroAbierto/PuntuacionOfertasAnormales";
import PlazosResponsable from "@/components/SuministroAbierto/PlazosResponsable";
import RegimenPagosRevision from "@/components/SuministroAbierto/RegimenPagosRevision";
import EjecucionYotros from "@/components/SuministroAbierto/EjecucionYotros";

import {renderDoc} from "@/assets/mixins/renderDoc";


    export default{
        name: 'Assistant',

        components: { 
            ObjetoNecesidades, 
            PresupuestoAnualidades, 
            CapacidadSolvencia, 
            Garantias,
            PuntuacionOfertasAnormales,
            PlazosResponsable,
            RegimenPagosRevision,
            EjecucionYotros,
        },

        mixins: [renderDoc],

        data(){
            return{
                datosObjetoNecesidades: undefined,
                datosPresupuestoAnualidades: undefined,
                datosCapacidadSolvencia: undefined,
                datosGarantias: undefined,
                datosPuntuacionOfertasAnormales: undefined,
                datosPlazoResponsable: undefined,
                datosRegimenPagosRevision: undefined,
                datosEjecucionYotros: undefined,
            }
        },

        watch:{
                //debug
                datosObjetoNecesidades(){
                    console.log("datosObjetoNecesidades", this.datosObjetoNecesidades)
                },
                
                datosPresupuestoAnualidades(){
                    console.log("datosPresupuestoAnualidades", this.datosPresupuestoAnualidades)
                },
                
                datosCapacidadSolvencia(){
                    console.log("datosCapacidadSolvencia", this.datosCapacidadSolvencia)
                },
                
                datosGarantias(){
                    console.log("datosGarantias", this.datosGarantias)
                },
                
                datosPuntuacionOfertasAnormales(){
                    console.log("datosPuntuacionOfertasAnormales", this.datosPuntuacionOfertasAnormales)
                },
                
                datosPlazoResponsable(){
                    console.log("datosPlazoResponsable", this.datosPlazoResponsable)
                },
                
                datosRegimenPagosRevision(){
                    console.log("datosRegimenPagosRevision", this.datosRegimenPagosRevision)
                },
                
                datosEjecucionYotros(){
                    console.log("datosEjecucionYotros", this.datosEjecucionYotros)
                },
        },

        methods:{
            back(){
                this.$emit("back", true)
            },

            getData(data){
                if (data.componente === 'ObjetoNecesidades'){this.datosObjetoNecesidades = Object.assign(data)}
                else if (data.componente === 'PresupuestoAnualidades'){this.datosPresupuestoAnualidades = Object.assign(data)}
                else if (data.componente === 'CapacidadSolvencia'){this.datosCapacidadSolvencia = Object.assign(data)}
                else if (data.componente === 'Garantias'){this.datosGarantias = Object.assign(data)}
                else if (data.componente === 'PuntuacionOfertasAnormales'){this.datosPuntuacionOfertasAnormales = Object.assign(data)}
                else if (data.componente === 'PlazoResponsable'){this.datosPlazoResponsable = Object.assign(data)}
                else if (data.componente === 'RegimenPagosRevision'){this.datosRegimenPagosRevision = Object.assign(data)}
                else if (data.componente === 'EjecucionYotros'){this.datosEjecucionYotros = Object.assign(data)}
            },

            execute(){
                this.data = [
                    this.datosObjetoNecesidades,
                    this.datosPresupuestoAnualidades,
                    this.datosCapacidadSolvencia,
                    this.datosGarantias,
                    this.datosPuntuacionOfertasAnormales,
                    this.datosPlazoResponsable,
                    this.datosRegimenPagosRevision,
                    this.datosEjecucionYotros,
                ];

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

