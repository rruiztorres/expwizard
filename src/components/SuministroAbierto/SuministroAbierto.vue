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
                                <v-btn 
                                @click="goToEnd(9)"
                                color="info" class="headButton">
                                    <v-icon class="iconBack">mdi-check-all</v-icon>
                                    FINALIZAR
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
                        v-model="tab"
                        @change="goToEnd(tab)"
                    >
                        <v-tabs-slider color="yellow"> </v-tabs-slider>
                    
                        <v-tab @click="activateTab(1)">Objeto y necesidades</v-tab>
                        <v-tab @click="activateTab(2)">Presupuesto, lotes e incompatibilidades</v-tab>
                        <v-tab @click="activateTab(3)">Capacidad y solvencia</v-tab>
                        <v-tab @click="activateTab(4)">Garantías y criterios adjudicación</v-tab>
                        <v-tab @click="activateTab(5)">Plazos y Responsable</v-tab>
                        <v-tab @click="activateTab(6)">Pagos, Rev. precios y Abonos a cuenta</v-tab>
                        <v-tab @click="activateTab(7)">Ejecución y otros</v-tab>
                        <v-tab @click="activateTab(8)">Modificaciones y penalidades</v-tab>
                        <v-tab @click="activateTab(9)">Cesión, subcontratación, otros</v-tab>
                        <v-tab @click="activateTab(10)">Finalizar</v-tab>


                        <!--OBJETO Y NECESIDADES-->
                        <v-tab-item class="tabContent">
                            <ObjetoNecesidades
                                v-if="activeTab == 1"
                                @datos="getData"
                                :datosGuardados="datosObjetoNecesidades"
                            ></ObjetoNecesidades>
                        </v-tab-item>

                        <!--PRESUPUESTO Y ANUALIDADES-->
                        <v-tab-item class="tabContent">
                            <PresupuestoAnualidades
                                v-if="activeTab == 2"
                                @datos="getData"
                                :datosGuardados="datosPresupuestoAnualidades"
                            ></PresupuestoAnualidades>
                        </v-tab-item>

                        <!--CAPACIDAD Y SOLVENCIA-->
                        <v-tab-item class="tabContent">
                            <CapacidadSolvencia
                                v-if="activeTab == 3"
                                @datos="getData"
                                :datosGuardados="datosCapacidadSolvencia"
                                :presBase="datosPresupuestoAnualidades"
                                :objetoNecesidades="datosObjetoNecesidades"
                            ></CapacidadSolvencia>
                        </v-tab-item>

                        <!--GARANTIAS-->
                        <v-tab-item class="tabContent">
                            <Garantias
                                v-if="activeTab == 4"
                                @datos="getData"
                                :datosGuardados="datosGarantias"
                                :presBase="datosPresupuestoAnualidades"
                            ></Garantias>
                        </v-tab-item>

                        <!--PLAZOS Y RESPONSABLE-->
                        <v-tab-item class="tabContent">
                            <PlazosResponsable
                                v-if="activeTab == 5"
                                @datos="getData"
                                :datosGuardados="datosPlazoResponsable"
                            ></PlazosResponsable>
                        </v-tab-item>

                        <!--REGIMEN PAGOS REVISION PRECIOS-->
                        <v-tab-item class="tabContent">
                            <RegimenPagosRevision
                                v-if="activeTab == 6"
                                @datos="getData"
                                :datosGuardados="datosRegimenPagosRevision"
                            ></RegimenPagosRevision>
                        </v-tab-item>

                        <!--EJECUCION Y OTROS-->
                        <v-tab-item class="tabContent">
                            <EjecucionYotros
                                v-if="activeTab == 7"
                                @datos="getData"
                                :datosGuardados="datosEjecucionYotros"
                            ></EjecucionYotros>
                        </v-tab-item>

                        <!--MODIFICACIONES Y PENALIDADES-->
                        <v-tab-item class="tabContent">
                            <ModificacionesPenalidades
                            v-if="activeTab == 8"
                            @datos="getData"
                            :datosGuardados="datosModificacionesPenalidades"
                            :presBase="datosPresupuestoAnualidades"
                            ></ModificacionesPenalidades>
                        </v-tab-item>

                        <!--CESION SUBCONTRATACION OTROS -->
                        <v-tab-item class="tabContent">
                            <CesionSubcontrataOtros
                                v-if="activeTab == 9"
                                @datos="getData"
                                :datosGuardados="datosCesionSubcontrataOtros"
                            ></CesionSubcontrataOtros>
                        </v-tab-item>

                        <!--FINALIZAR-->
                        <v-tab-item 
                        class="tabContent">
                            <Finalizar
                            v-if="activeTab == 10"
                            >
                            </Finalizar>
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
import PlazosResponsable from "@/components/SuministroAbierto/PlazosResponsable";
import RegimenPagosRevision from "@/components/SuministroAbierto/RegimenPagosRevision";
import EjecucionYotros from "@/components/SuministroAbierto/EjecucionYotros";
import ModificacionesPenalidades from "@/components/SuministroAbierto/ModificacionesPenalidades";
import CesionSubcontrataOtros from "@/components/SuministroAbierto/CesionSubcontrataOtros";
import Finalizar from "@/components/SuministroAbierto/Finalizar";

import {renderDoc} from "@/assets/mixins/renderDoc";


    export default{
        name: 'SuministroAbierto',

        components: { 
            ObjetoNecesidades, 
            PresupuestoAnualidades, 
            CapacidadSolvencia, 
            Garantias,
            PlazosResponsable,
            RegimenPagosRevision,
            EjecucionYotros,
            ModificacionesPenalidades,
            CesionSubcontrataOtros,
            Finalizar,
        },

        mixins: [renderDoc],

        data(){
            return{
                activeTab: 1,
                tab: 0,

                datosObjetoNecesidades: undefined,
                datosPresupuestoAnualidades: undefined,
                datosCapacidadSolvencia: undefined,
                datosGarantias: undefined,
                datosPlazoResponsable: undefined,
                datosRegimenPagosRevision: undefined,
                datosEjecucionYotros: undefined,
                datosModificacionesPenalidades: undefined,
                datosCesionSubcontrataOtros: undefined,
            }
        },

        watch:{
                
                //debug
                /*
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
                                
                datosPlazoResponsable(){
                    console.log("datosPlazoResponsable", this.datosPlazoResponsable)
                },
                
                datosRegimenPagosRevision(){
                    console.log("datosRegimenPagosRevision", this.datosRegimenPagosRevision)
                },
                
                datosEjecucionYotros(){
                    console.log("datosEjecucionYotros", this.datosEjecucionYotros)
                },
                */
        },

        methods:{

            goToEnd(data){
                this.tab = data;
                this.activeTab = data + 1;
            },

            back(){
                this.$emit("back", true)
            },

            activateTab(tab){
                this.activeTab = tab;
            },

            getData(data){
                if (data.componente === 'ObjetoNecesidades'){this.datosObjetoNecesidades = Object.assign(data)}
                else if (data.componente === 'PresupuestoAnualidades'){this.datosPresupuestoAnualidades = Object.assign(data)}
                else if (data.componente === 'CapacidadSolvencia'){this.datosCapacidadSolvencia = Object.assign(data)}
                else if (data.componente === 'Garantias'){this.datosGarantias = Object.assign(data)}
                else if (data.componente === 'PlazoResponsable'){this.datosPlazoResponsable = Object.assign(data)}
                else if (data.componente === 'RegimenPagosRevision'){this.datosRegimenPagosRevision = Object.assign(data)}
                else if (data.componente === 'EjecucionYotros'){this.datosEjecucionYotros = Object.assign(data)}
                else if (data.componente === 'ModificacionesPenalidades'){this.datosModificacionesPenalidades = Object.assign(data)}
                else if (data.componente === 'CesionSubcontrataOtros'){this.datosCesionSubcontrataOtros = Object.assign(data)}
            },

            execute(){
                this.data = [
                    this.datosObjetoNecesidades,
                    this.datosPresupuestoAnualidades,
                    this.datosCapacidadSolvencia,
                    this.datosGarantias,
                    this.datosPlazoResponsable,
                    this.datosRegimenPagosRevision,
                    this.datosEjecucionYotros,
                    this.datosModificacionesPenalidades,
                    this.datosCesionSubcontrataOtros,
                ];
                console.log(this.data)
                //this.renderDoc(this.data);
            },
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

