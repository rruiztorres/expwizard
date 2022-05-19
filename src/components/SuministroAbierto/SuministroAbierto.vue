<template>
    <div id="mainWrapper">
        <v-row>
            <v-col class="buttonBack" cols="12">
                <v-row class="titleRow">
                    <v-col cols="12" md="7" class="col1">
                        <h3 class="mainTitle">EXPEDIENTE DE SUMINISTRO ABIERTO</h3>
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
                                @click="goToEnd(8)"
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
                        background-color="#00BCD4"
                        dark
                        show-arrows
                        fixed-tabs
                        v-model="tab"
                        @change="goToEnd(tab)"
                    >
                        <v-tabs-slider color="yellow"> </v-tabs-slider>
                    
                        <v-tab :class="compValidation(false)" @click="activateTab(1)">Objeto y necesidades </v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(2)">Presupuesto, lotes y anualidades</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(3)">Incompatibilidades, capacidad y solvencia</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(4)">Garantías y criterios adjudicación</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(5)">Pagos, Rev. precios y Abonos a cuenta</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(6)">Plazos, responsable y ejecución</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(7)">Modificaciones y penalidades</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(8)">Cesión, subcontratación, otros</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(9)">Finalizar</v-tab>


                        <!--Objeto y necesidades-->
                        <v-tab-item class="tabContent">
                            <ObjetoNecesidades
                                v-if="activeTab == 1"
                                @datos="getData"
                                :datosGuardados="datosObjetoNecesidades"
                            ></ObjetoNecesidades>
                        </v-tab-item>

                        <!--Presupuesto, lotes y anualidades-->
                        <v-tab-item class="tabContent">
                            <PresupuestoAnualidades
                                v-if="activeTab == 2"
                                @datos="getData"
                                :datosGuardados="datosPresupuestoAnualidades"
                            ></PresupuestoAnualidades>
                        </v-tab-item>

                        <!--Incompatibilidades, capacidad y solvencia-->
                        <v-tab-item class="tabContent">
                            <CapacidadSolvencia
                                v-if="activeTab == 3"
                                @datos="getData"
                                :datosGuardados="datosCapacidadSolvencia"
                                :presBase="datosPresupuestoAnualidades"
                                :objetoNecesidades="datosObjetoNecesidades"
                            ></CapacidadSolvencia>
                        </v-tab-item>

                        <!--Garantías y criterios adjudicación-->
                        <v-tab-item class="tabContent">
                            <Garantias
                                v-if="activeTab == 4"
                                @datos="getData"
                                :datosGuardados="datosGarantias"
                                :presBase="datosPresupuestoAnualidades"
                            ></Garantias>
                        </v-tab-item>

                        <!--Pagos, Rev. precios y Abonos a cuenta-->
                        <v-tab-item class="tabContent">
                            <RegimenPagosRevision
                                v-if="activeTab == 5"
                                @datos="getData"
                                :datosGuardados="datosRegimenPagosRevision"
                            ></RegimenPagosRevision>
                        </v-tab-item>

                        <!--Plazos, responsable y ejecución-->
                        <v-tab-item class="tabContent">
                            <EjecucionYotros
                                v-if="activeTab == 6"
                                @datos="getData"
                                :datosGuardados="datosEjecucionYotros"
                            ></EjecucionYotros>
                        </v-tab-item>

                        <!--Modificaciones y penalidades-->
                        <v-tab-item class="tabContent">
                            <ModificacionesPenalidades
                            v-if="activeTab == 7"
                            @datos="getData"
                            :datosGuardados="datosModificacionesPenalidades"
                            :presBase="datosPresupuestoAnualidades"
                            ></ModificacionesPenalidades>
                        </v-tab-item>

                        <!--Cesión, subcontratación, otros -->
                        <v-tab-item class="tabContent">
                            <CesionSubcontrataOtros
                                v-if="activeTab == 8"
                                @datos="getData"
                                :datosGuardados="datosCesionSubcontrataOtros"
                            ></CesionSubcontrataOtros>
                        </v-tab-item>

                        <!--Finalizar-->
                        <v-tab-item 
                        class="tabContent">
                            <Finalizar
                            v-if="activeTab == 9"
                            :datosGuardados="[
                                datosObjetoNecesidades,
                                datosPresupuestoAnualidades,
                                datosCapacidadSolvencia,
                                datosGarantias,
                                datosPlazoResponsable,
                                datosRegimenPagosRevision,
                                datosEjecucionYotros,
                                datosModificacionesPenalidades,
                                datosCesionSubcontrataOtros
                            ]"
                            >
                            </Finalizar>
                        </v-tab-item>
                    </v-tabs>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-card-actions class="bottomActions">
                                <v-btn color="info" class="headButton" @click="prevTab" :disabled="tab < 1">
                                    <v-icon>mdi-arrow-left</v-icon>
                                    ANTERIOR
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" class="headButton" @click="nextTab" :disabled="tab > 7">
                                    SIGUIENTE
                                    <v-icon>mdi-arrow-right</v-icon>
                                </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script> 
import ObjetoNecesidades from "@/components/SuministroAbierto/ObjetoNecesidades";
import PresupuestoAnualidades from "@/components/SuministroAbierto/PresupuestoAnualidades";
import CapacidadSolvencia from "@/components/SuministroAbierto/CapacidadSolvencia";
import Garantias from "@/components/SuministroAbierto/Garantias";
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
                                                
                datosRegimenPagosRevision(){
                    console.log("datosRegimenPagosRevision", this.datosRegimenPagosRevision)
                },
                
                datosEjecucionYotros(){
                    console.log("datosEjecucionYotros", this.datosEjecucionYotros)
                },
                              
        },

        methods:{    
            compValidation(comp){
                if(comp === true){
                    return "validado"
                } else {
                    return "noValidado"
                }
            },

            nextTab(){
                this.tab = this.tab + 1
                this.activateTab(this.tab + 1)
            },

            prevTab(){
                this.tab = this.tab - 1
                this.activateTab(this.tab + 1)
            },

            goToEnd(data){        
                this.tab = data;
                this.activeTab = data + 1
            },

            back(){
                this.$emit("back", 'selector')
            },

            activateTab(tab){
                this.activeTab = tab;
            },

            getData(data){
                if (data.componente === 'ObjetoNecesidades'){this.datosObjetoNecesidades = Object.assign(data)}
                else if (data.componente === 'PresupuestoAnualidades'){this.datosPresupuestoAnualidades = Object.assign(data)}
                else if (data.componente === 'CapacidadSolvencia'){this.datosCapacidadSolvencia = Object.assign(data)}
                else if (data.componente === 'Garantias'){this.datosGarantias = Object.assign(data)}
                else if (data.componente === 'RegimenPagosRevision'){this.datosRegimenPagosRevision = Object.assign(data)}
                else if (data.componente === 'EjecucionYotros'){this.datosEjecucionYotros = Object.assign(data)}
                else if (data.componente === 'ModificacionesPenalidades'){this.datosModificacionesPenalidades = Object.assign(data)}
                else if (data.componente === 'CesionSubcontrataOtros'){this.datosCesionSubcontrataOtros = Object.assign(data)}
            },

            execute(){
                this.data = {
                    seccion1: this.datosObjetoNecesidades,
                    seccion2: this.datosPresupuestoAnualidades,
                    seccion3: this.datosCapacidadSolvencia,
                    seccion4: this.datosGarantias,
                    seccion5: this.datosRegimenPagosRevision,
                    seccion6: this.datosEjecucionYotros,
                    seccion7: this.datosModificacionesPenalidades,
                    seccion8: this.datosCesionSubcontrataOtros,
                };
                console.log(this.data)
                this.renderDoc(this.data);
            },
        }
    }

</script>

<style>
    #mainWrapper {
        margin: 0 auto;
        max-width: 80rem;
    }

    .noValidado{
        background-color: #00BCD4
    }

    .validado{
        background-color: #5eb538
    }

    .mainTitle{
        font-weight: 400 !important;
        margin-bottom: 0rem !important;
    }

    h3{
    font-weight: 500;
    margin-bottom: 0.5rem;
    }

    h5 {
    font-weight: 500;
    opacity: 0.6;
    }

    .tabContent{
        padding: 1rem;
        height: 65.5vh;
        overflow-y: auto;
    }

    .bottomActions{
        margin-top: -0.5rem;
        padding: 0rem !important
    }

    .buttonBack {
        margin: auto 0;
        text-align: end;
    }
    .iconBack {
        margin-right: 1rem;
    }

    .titleRow{
        margin: 0rem !important;
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

    .badge{
        margin-left: 0.25rem;
    }

    .icon {
        margin-left: 0.5rem;
    }
</style>

