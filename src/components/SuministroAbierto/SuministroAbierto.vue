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
                            <v-btn color="error" class="headButton" @click="exit">
                                <v-icon class="iconBack">mdi-exit-run</v-icon>
                                SALIR
                            </v-btn>
                            <v-btn 
                            @click="goToEnd(8)"
                            color="info" class="headButton">
                                <v-icon class="iconBack">mdi-check-all</v-icon>
                                FINALIZAR
                            </v-btn>
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
                        center-active
                        fixed-tabs
                        v-model="tab"
                        @change="goToEnd(tab)"
                    >
                        <v-tabs-slider color="yellow"> </v-tabs-slider>
                    
                        <v-tab :class="compValidation(false)" @click="activateTab(1)">Objeto y necesidades </v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(2)">Presupuesto, lotes y anualidades</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(3)">Incompatibilidades, capacidad y solvencia</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(4)">Garantías y criterios adjudicación</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(5)">Plazos, responsable y ejecución</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(6)">Modificaciones y penalidades</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(7)">Cesión, subcontratación, otros</v-tab>
                        <v-tab :class="compValidation(false)" @click="activateTab(8)">Finalizar</v-tab>


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
                            <PresupuestoLoteAnualidades
                                v-if="activeTab == 2"
                                @datos="getData"
                                :datosGuardados="datosPresupuestoAnualidades"
                            ></PresupuestoLoteAnualidades>
                        </v-tab-item>

                        <!--Incompatibilidades, capacidad y solvencia-->
                        <v-tab-item class="tabContent">
                            <IncompatibCapacSolvencia
                                v-if="activeTab == 3"
                                @datos="getData"
                                :datosGuardados="datosCapacidadSolvencia"
                                :presBase="datosPresupuestoAnualidades"
                                :objetoNecesidades="datosObjetoNecesidades"
                            ></IncompatibCapacSolvencia>
                        </v-tab-item>

                        <!--Garantías y criterios adjudicación-->
                        <v-tab-item class="tabContent">
                            <GarantiasCritAdjudicacion
                                v-if="activeTab == 4"
                                @datos="getData"
                                :datosGuardados="datosGarantias"
                                :presBase="datosPresupuestoAnualidades"
                            ></GarantiasCritAdjudicacion>
                        </v-tab-item>

                        <!--Plazos, responsable y ejecución-->
                        <v-tab-item class="tabContent">
                            <PlazosRespEjecucion
                                v-if="activeTab == 5"
                                @datos="getData"
                                :datosGuardados="datosEjecucionYotros"
                            ></PlazosRespEjecucion>
                        </v-tab-item>

                        <!--Modificaciones y penalidades-->
                        <v-tab-item class="tabContent">
                            <ModificacionesPenalidades
                            v-if="activeTab == 6"
                            @datos="getData"
                            :datosGuardados="datosModificacionesPenalidades"
                            :presBase="datosPresupuestoAnualidades"
                            ></ModificacionesPenalidades>
                        </v-tab-item>

                        <!--Cesión, subcontratación, otros -->
                        <v-tab-item class="tabContent">
                            <CesionSubcontrataOtros
                                v-if="activeTab == 7"
                                @datos="getData"
                                :datosGuardados="datosCesionSubcontrataOtros"
                            ></CesionSubcontrataOtros>
                        </v-tab-item>

                        <!--Finalizar-->
                        <v-tab-item 
                        class="tabContent">
                            <Finalizar
                            v-if="activeTab == 8"
                            :datosGuardados="[
                                datosObjetoNecesidades,
                                datosPresupuestoAnualidades,
                                datosCapacidadSolvencia,
                                datosGarantias,
                                datosEjecucionYotros,
                                datosModificacionesPenalidades,
                                datosCesionSubcontrataOtros
                            ]"
                            :datosExpGuardado="datosExpGuardadoPrev"
                            >
                            </Finalizar>
                        </v-tab-item>
                    </v-tabs>
                </v-sheet>
            </v-col>
        </v-row>
        <v-dialog max-width="40rem" v-model="confirmExitDialog">
            <v-card class="exitDialogContainer">
                <h1>ATENCIÓN</h1>
                <p>Parece que ya se han introducido algunos datos en el modelo.</p>
                <h3>¿Desea salir sin guardar los cambios?</h3>
                <v-card-actions>
                    <v-btn width="50%" class="error" @click="confirmExitDialog = !confirmExitDialog">Cancelar</v-btn>
                    <v-btn width="50%" class="success" @click="back">Salir sin guardar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script> 
import ObjetoNecesidades from "@/components/SuministroAbierto/ObjetoNecesidades";
import PresupuestoLoteAnualidades from "@/components/SuministroAbierto/PresupuestoLoteAnualidades";
import IncompatibCapacSolvencia from "@/components/SuministroAbierto/IncompatibCapacSolvencia";
import GarantiasCritAdjudicacion from "@/components/SuministroAbierto/GarantiasCritAdjudicacion";
import PlazosRespEjecucion from "@/components/SuministroAbierto/PlazosRespEjecucion";
import ModificacionesPenalidades from "@/components/SuministroAbierto/ModificacionesPenalidades";
import CesionSubcontrataOtros from "@/components/SuministroAbierto/CesionSubcontrataOtros";
import Finalizar from "@/components/SuministroAbierto/Finalizar";


    export default{
        name: 'SuministroAbierto',
        props: ['dataInput'],

        components: { 
            ObjetoNecesidades, 
            PresupuestoLoteAnualidades, 
            IncompatibCapacSolvencia, 
            GarantiasCritAdjudicacion,
            PlazosRespEjecucion,
            ModificacionesPenalidades,
            CesionSubcontrataOtros,
            Finalizar,
        },

       // mixins: [renderDoc],

        data(){
            return{
                activeTab: 1,
                tab: 0,
                datosObjetoNecesidades: undefined,
                datosPresupuestoAnualidades: undefined,
                datosCapacidadSolvencia: undefined,
                datosGarantias: undefined,
                datosEjecucionYotros: undefined,
                datosModificacionesPenalidades: undefined,
                datosCesionSubcontrataOtros: undefined,

                confirmExitDialog: false,
                datosExpGuardadoPrev: undefined,
            }
        },

        created(){
            this.loadStoredData();
        },

        methods:{
            loadStoredData(){
                if(this.dataInput !== undefined){
                    // DATOS DE GUARDADO
                    let data = this.dataInput.data;
                    data.id_expediente = this.dataInput.id_expediente;

                    this.datosExpGuardadoPrev = {
                        id_expediente: data.id_expediente,
                        nombre_exp: data.expData.nombre,
                        descripcion_expediente: data.expData.descripcion,
                    };
                    
                    this.datosObjetoNecesidades = data.seccion1;
                    this.datosPresupuestoAnualidades = data.seccion2;
                    this.datosCapacidadSolvencia = data.seccion3;
                    this.datosGarantias = data.seccion4;
                    this.datosEjecucionYotros = data.seccion5;
                    this.datosModificacionesPenalidades = data.seccion6;
                    this.datosCesionSubcontrataOtros = data.seccion7;
                }
            },

            compValidation(comp){
                if(comp === true){
                    return "validado"
                } else {
                    return "noValidado"
                }
            },

            goToEnd(data){        
                this.tab = data;
                this.activeTab = data + 1
            },

            exit(){
                this.confirmExitDialog = true;
            },

            back(){
                this.confirmExitDialog = false;
                this.$emit("back", 'selector')
            },

            activateTab(tab){
                this.activeTab = tab;
            },

            getData(data){
                if (data.componente === 'ObjetoNecesidades'){
                    this.datosObjetoNecesidades = Object.assign(data)
                }
                else if (data.componente === 'PresupuestoAnualidades'){
                    this.datosPresupuestoAnualidades = Object.assign(data)
                }
                else if (data.componente === 'CapacidadSolvencia'){
                    this.datosCapacidadSolvencia = Object.assign(data)
                    //Pueden existir datos de lotes actualizados.
                    this.datosPresupuestoAnualidades.lotes = this.datosCapacidadSolvencia.lotes;
                }
                else if (data.componente === 'Garantias'){
                    this.datosGarantias = Object.assign(data)
                }
                else if (data.componente === 'EjecucionYotros'){
                    this.datosEjecucionYotros = Object.assign(data)
                }
                else if (data.componente === 'ModificacionesPenalidades'){
                    this.datosModificacionesPenalidades = Object.assign(data)
                }
                else if (data.componente === 'CesionSubcontrataOtros'){
                    this.datosCesionSubcontrataOtros = Object.assign(data)
                }
            },
        }
    }

</script>

<style>
    #mainWrapper > * {
        width: 98vw;
        margin-left: 0.5rem;
    }

    .exitDialogContainer{
        padding: 1rem;
        text-align: center;
        font-family: 'Montserrat';
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
        height: 70.5vh;
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
        margin-left: 1rem;
    }

    .footerButton {
        width: 40%;
    }

    .badge{
        margin-left: 0.5rem;
    }

    .icon {
        margin-left: 0.5rem;
    }

    .editField {
        color: black;
        font-weight: 500;
        text-decoration: underline;
    }

    .group {
        margin-bottom: 0.5rem;
    }

    .rowGroup {
        margin: 0.1rem 0rem 2rem 0rem !important;
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 1rem 0rem 1rem 0rem;
    }

    .subRow {
        margin: 0rem;
    }
</style>

