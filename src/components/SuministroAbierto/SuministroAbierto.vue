<template>
    <div id="mainWrapper">
        <v-row>
            <!-- MENU LATERAL -->
            <v-col cols="12" lg="1">
                <v-card elevation="4" shaped>
                    <v-row no-gutters>
                        <v-col cols="3" lg="12" v-for="boton, i in menuBtn" :key="i">
                            <v-btn @click="boton.action"
                            :disabled="boton.disable"
                            style="height:4.57rem; display:block;" :color="boton.color" block x-large icon tile>
                                <v-icon>{{boton.icon}}</v-icon>
                                <h6 style="margin-top:0.2rem; font-weight:400;">{{boton.text}}</h6>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>

            <!-- MAIN -->
            <v-col cols="12" lg="5">
                <v-sheet elevation="6" class="tabWrap">
                    <v-tabs
                        background-color="#00BCD4"
                        dark
                        show-arrows
                        center-active
                        fixed-tabs
                        v-model="tab"
                    >
                        <v-tabs-slider color="yellow"> </v-tabs-slider>
                    
                        <v-tab class="tab" @click="activateTab(1)">Objeto y necesidades </v-tab>
                        <v-tab class="tab" @click="activateTab(2)">Presupuesto, lotes y anualidades</v-tab>
                        <v-tab class="tab" @click="activateTab(3)">Incompatibilidades, capacidad y solvencia</v-tab>
                        <v-tab class="tab" @click="activateTab(4)">Garantías y criterios adjudicación</v-tab>
                        <v-tab class="tab" @click="activateTab(5)">Plazos, responsable y ejecución</v-tab>
                        <v-tab class="tab" @click="activateTab(6)">Penalidades</v-tab>
                        <v-tab class="tab" @click="activateTab(7)">Cesión, subcontratación, otros</v-tab>


                        <!--Objeto y necesidades-->
                        <v-tab-item class="tabContent">
                            <ObjetoNecesidades
                                v-if="activeTab == 1"
                                @datos="getData"
                                :datosGuardados="datosObjetoNecesidades"
                                :goToElement=element
                            ></ObjetoNecesidades>
                        </v-tab-item>

                        <!--Presupuesto, lotes y anualidades-->
                        <v-tab-item class="tabContent">
                            <PresupuestoLoteAnualidades
                                v-if="activeTab == 2"
                                @datos="getData"
                                :datosGuardados="datosPresupuestoAnualidades"
                                :goToElement=element
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
                                :goToElement=element
                            ></IncompatibCapacSolvencia>
                        </v-tab-item>

                        <!--Garantías y criterios adjudicación-->
                        <v-tab-item class="tabContent">
                            <GarantiasCritAdjudicacion
                                v-if="activeTab == 4"
                                @datos="getData"
                                :datosGuardados="datosGarantias"
                                :presBase="datosPresupuestoAnualidades"
                                :goToElement=element
                            ></GarantiasCritAdjudicacion>
                        </v-tab-item>

                        <!--Plazos, responsable y ejecución-->
                        <v-tab-item class="tabContent">
                            <PlazosRespEjecucion
                                v-if="activeTab == 5"
                                @datos="getData"
                                :datosGuardados="datosEjecucionYotros"
                                :goToElement=element
                            ></PlazosRespEjecucion>
                        </v-tab-item>

                        <!--Modificaciones y penalidades-->
                        <v-tab-item class="tabContent">
                            <Penalidades
                            v-if="activeTab == 6"
                            @datos="getData"
                            :datosGuardados="datosModificacionesPenalidades"
                            :presBase="datosPresupuestoAnualidades"
                            :goToElement=element
                            ></Penalidades>
                        </v-tab-item>

                        <!--Cesión, subcontratación, otros -->
                        <v-tab-item class="tabContent">
                            <CesionSubcontrataOtros
                                v-if="activeTab == 7"
                                @datos="getData"
                                :datosGuardados="datosCesionSubcontrataOtros"
                                :goToElement=element
                            ></CesionSubcontrataOtros>
                        </v-tab-item>
                    </v-tabs>
                </v-sheet>
            </v-col>
        </v-row>

        <!-- LISTA DE CONTENIDOS -->
        <v-overlay :value="showContentList" absolute>
            <ListaContenidos
                @close="(data)=>showContentList=data"
                @goTo="(data)=>{element=data[0][0]; goToTab(data[0][1])}"
            ></ListaContenidos>
        </v-overlay>

        <!-- VENTANA GUARDAR -->
        <v-overlay :value="storeWindow">
            <v-card v-if="savingResultWindow === false"
            light width="90vw" max-width="40rem">
                <v-card-title class="saveCardTitle">Guardar Expediente</v-card-title>
                <v-card-text>
                    <br/>
                    <v-text-field filled label="Titulo del Expediente"
                    v-model="saveTitle"
                    ></v-text-field>
                    <v-textarea filled auto-grow label="Descripción del Expediente"
                    v-model="saveDesc"
                    ></v-textarea>
                </v-card-text>

                <v-card-text>
                    <v-alert type="error" :value="saveAlert">Debe indicar un <b>título de expediente válido</b> para poder guardar el expediente</v-alert>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="storeWindow = !storeWindow">CANCELAR</v-btn>
                    <v-btn color="success" @click="save" :disabled="saveAlert">GUARDAR</v-btn>
                </v-card-actions>  
            </v-card>
            
            <v-alert v-else type="success">GUARDADO CORRECTO!</v-alert>
        </v-overlay>

        <!-- CONFIRMAR SALIDA CON DATOS SIN GUARDAR TODO: -->
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

        <!-- SNACKBAR INFO -->
        <div class="text-center ma-2">
            <v-snackbar v-model="snackbar">EXPEDIENTE DE SUMINISTRO ABIERTO, VARIOS CRITERIOS
            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Cerrar
                </v-btn>
            </template>
            </v-snackbar>
        </div>
    </div>
</template>

<script> 
import axios from 'axios';

import {renderDoc} from "@/assets/mixins/renderDoc";

import ListaContenidos from "@/components/SuministroAbierto/ListaContenidos";
import ObjetoNecesidades from "@/components/SuministroAbierto/ObjetoNecesidades";
import PresupuestoLoteAnualidades from "@/components/SuministroAbierto/PresupuestoLoteAnualidades";
import IncompatibCapacSolvencia from "@/components/SuministroAbierto/IncompatibCapacSolvencia";
import GarantiasCritAdjudicacion from "@/components/SuministroAbierto/GarantiasCritAdjudicacion";
import PlazosRespEjecucion from "@/components/SuministroAbierto/PlazosRespEjecucion";
import Penalidades from "@/components/SuministroAbierto/Penalidades";
import CesionSubcontrataOtros from "@/components/SuministroAbierto/CesionSubcontrataOtros";


    export default{
        name: 'SuministroAbierto',
        props: ['dataInput'],
        mixins: [renderDoc],

        components: { 
            ListaContenidos,
            ObjetoNecesidades, 
            PresupuestoLoteAnualidades, 
            IncompatibCapacSolvencia, 
            GarantiasCritAdjudicacion,
            PlazosRespEjecucion,
            Penalidades,
            CesionSubcontrataOtros,
        },

        data(){
            return{
                activeTab: 1,
                tab: 0,
                element: undefined,
                snackbar: true,

                datosObjetoNecesidades: undefined,
                datosPresupuestoAnualidades: undefined,
                datosCapacidadSolvencia: undefined,
                datosGarantias: undefined,
                datosEjecucionYotros: undefined,
                datosModificacionesPenalidades: undefined,
                datosCesionSubcontrataOtros: undefined,
                confirmExitDialog: false,
                datosExpGuardadoPrev: undefined,
                showContentList: false,
                storeWindow: false,
                savingResultWindow: false,
                saveTitle: undefined,
                saveDesc: undefined,
                expEditId: undefined,
                saveAlert: false,

                menuBtn:[
                    {disable: false, color: 'grey', text:'Lista', icon: 'mdi-clipboard-list', action: ()=>this.showContentList = true},
                    {disable: false, color: 'warning', text:'Validar', icon: 'mdi-alert-circle-check', action:this.dummy},
                    {disable: false, color: 'info', text:'Word', icon: 'mdi-file-word', action:this.createWord},
                    {disable: false, color: 'error', text:'PDF', icon: 'mdi-file-pdf-box', action:this.dummy},
                    {disable: false, color: 'success', text:'Guardar', icon: 'mdi-content-save', action: ()=>{this.storeWindow = true}},
                    {disable: false, color: 'error', text:'Salir', icon: 'mdi-exit-run', action:this.exit},
                ],
            }
        },
        
        created(){
            this.loadStoredData();
        },

        methods:{
            dummy(data){
                console.log(data)
            },

            createWord(){
                this.data = {
                    seccion1: this.datosObjetoNecesidades,
                    seccion2: this.datosPresupuestoAnualidades,
                    seccion3: this.datosCapacidadSolvencia,
                    seccion4: this.datosGarantias,
                    seccion5: this.datosEjecucionYotros,
                    seccion6: this.datosModificacionesPenalidades,
                    seccion7: this.datosCesionSubcontrataOtros,
                };
                this.renderDoc(this.data);
            },

            async save(){
                if(this.edited){
                    this.expEditId = this.datosExpGuardado.id_expediente;
                } else {
                    this.expEditId = undefined;
                }

                this.data = {
                    expData: {
                        nombre: this.saveTitle,
                        descripcion: this.saveDesc,             
                        usuario: localStorage.usrName,                     
                        tipo: 'Suministro abierto varios criterios',
                        id: this.expEditId,                          
                    },
                    seccion1: this.datosObjetoNecesidades,
                    seccion2: this.datosPresupuestoAnualidades,
                    seccion3: this.datosCapacidadSolvencia,
                    seccion4: this.datosGarantias,
                    seccion5: this.datosEjecucionYotros,
                    seccion6: this.datosModificacionesPenalidades,
                    seccion7: this.datosCesionSubcontrataOtros,
                };
                
                //ERRORES DE GUARDADO
                if(this.data.expData.nombre === undefined || this.data.expData.nombre === ''){
                    this.saveAlert = true;
                } else {
                    await axios
                    .post(`${process.env.VUE_APP_API_ROUTE}/postExpediente`, this.data)
                    .then( (data) => {
                        if(data.status === 201){
                            this.savingResultWindow = true;
                            setTimeout(()=>{this.storeWindow = false}, 1500)
                        }
                    })
                }
            },

            loadStoredData(){
                if(this.dataInput !== undefined){
                    // DATOS DE GUARDADO
                    let data = this.dataInput.data;
                    
                    this.saveTitle = data.expData.nombre;
                    this.saveDesc = data.expData.descripcion;
                    this.expEditId = this.dataInput.id_expediente;
                   
                    //DATOS SECCIONES
                    this.datosObjetoNecesidades = data.seccion1;
                    this.datosPresupuestoAnualidades = data.seccion2;
                    this.datosCapacidadSolvencia = data.seccion3;
                    this.datosGarantias = data.seccion4;
                    this.datosEjecucionYotros = data.seccion5;
                    this.datosModificacionesPenalidades = data.seccion6;
                    this.datosCesionSubcontrataOtros = data.seccion7;
                }
            },

            goToTab(data){        
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

    .tabWrap{
       position: absolute; 
       margin: 0rem 0.3rem 0rem 0.8rem;
       width: 89vw;
       overflow-y: auto;
    }

    .tab {
        font-size:75%;
    }

    .tabContent {
        padding: 1rem !important;
        overflow-y: auto;
        height: 82vh;
    }

    @media (max-height: 800px){
        .tabContent {
            height: 71vh;
        }
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

    .v-btn:before {
        position: unset !important;
    }

    .v-btn__content {
        display: block !important;
    }

    .saveCardTitle {
        background-color: #00BCD4;
        color: white;
        font-weight: 400;
    }
   
</style>

