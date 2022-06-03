<template>
    <div>
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <h4 class="subtitle">VALIDAR</h4> 
                    <v-stepper
                        v-model="stepperCTRL"
                        vertical
                        
                    >
                        <v-stepper-step
                        class="step"
                        step="1"
                        :complete="complete1"
                        :color="color1"
                        >
                        <h5>1.- OBJETO Y NECESIDADES</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        :complete="complete2"
                        :color="color2"
                        step="2"
                        >
                        <h5>2.- PRESUPUESTO, LOTES Y ANUALIDADES</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        :complete="complete3"
                        :color="color3"
                        step="3"
                        >
                        <h5>3.- INCOMPATIBILIDADES, CAPACIDAD Y SOLVENCIA</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        :complete="complete4"
                        :color="color4"
                        step="4"
                        >
                        <h5>4.- GARANTÍAS, CRITERIOS Y ADJUDICACIÓN</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        :complete="complete5"
                        :color="color5"
                        step="5"
                        >
                        <h5>5.- PAGOS, REV.PRECIOS Y ABONOS A CUENTA</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        :complete="complete6"
                        :color="color6"
                        step="6"
                        >
                        <h5>6.- PLAZOS, RESPONSABLE Y EJECUCIÓN</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        :complete="complete7"
                        :color="color7"
                        step="7"
                        >
                        <h5>7.- MODIFICACIONES Y PENALIDADES</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        :complete="complete8"
                        :color="color8"
                        step="8"
                        >
                        <h5>8.- CESIÓN, SUBCONTRATACIÓN Y OTROS</h5>
                        </v-stepper-step>
                    </v-stepper> 
                    
                    <v-alert type="success" :value="infoValidateWindow">Expediente validado correctamente</v-alert>               

                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card class="card">
                    <v-card-title>
                        <v-btn v-if="!infoValidateWindow" width="100%" :loading="buttonLoader" color="warning" class="actionButton" dark @click="fakeValidate">VALIDAR<v-icon class="actionIcon">mdi-alert-circle-check</v-icon></v-btn>
                        <v-btn v-if="!allowSaveDownload" width="100%" color="info" class="actionButton" dark @click="execute">DESCARGAR WORD <v-icon class="actionIcon">mdi-file-word</v-icon></v-btn>
                        <v-btn v-if="!allowSaveDownload" width="100%" color="error" class="actionButton" dark >DESCARGAR PDF <v-icon class="actionIcon">mdi-file-pdf-box</v-icon></v-btn>
                        <v-btn v-if="!allowSaveDownload" width="100%" color="green" class="actionButton" dark @click="storeData">GUARDAR <v-icon class="actionIcon">mdi-content-save-all</v-icon></v-btn>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>

        <!-- GUARDAR -->
        <v-overlay :value="storeWindow">
            <v-card v-if="savingResultWindow === false"
            light width="90vw" max-width="40rem">
                <v-card-title class="cardTitle">Guardar Expediente</v-card-title>
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
    </div>
</template>

<script>
import {renderDoc} from "@/assets/mixins/renderDoc";
import axios from 'axios';

    export default {
        name: 'Finalizar',
        props: ['datosGuardados', 'datosExpGuardado'],
        mixins: [renderDoc],

        data(){
            return {
                stepperCTRL: 1,
                complete1: false,
                complete2: false,
                complete3: false,
                complete4: false,
                complete5: false,
                complete6: false,
                complete7: false,
                complete8: false,

                allowSaveDownload: true,
                infoValidateWindow: false,
                
                color1: 'info',
                color2: 'info',
                color3: 'info',
                color4: 'info',
                color5: 'info',
                color6: 'info',
                color7: 'info',
                color8: 'info',

                buttonLoader: false,
                buttonText: 'EJECUTAR VALIDACIONES',
                buttonIcon: 'mdi-play',
                buttonColor: 'info',

                storeWindow: false,
                saveTitle: undefined,
                saveDesc: undefined,
                edited: false,
                saveAlert: false,
                savingResultWindow: false,

                datos: {
                    componente: 'Finalizar',                 
                }

            }
        },

        watch:{
            saveTitle(){
                this.saveAlert = false;
            },
        },

        mounted(){
            if(this.datosExpGuardado){
                this.saveTitle = this.datosExpGuardado.nombre_exp;
                this.saveDesc = this.datosExpGuardado.descripcion_expediente;
                this.edited = true;
            }
        },

        methods: {
            execute(){
                this.data = {
                    seccion1: this.datosGuardados[0],
                    seccion2: this.datosGuardados[1],
                    seccion3: this.datosGuardados[2],
                    seccion4: this.datosGuardados[3],
                    seccion5: this.datosGuardados[4],
                    seccion6: this.datosGuardados[5],
                    seccion7: this.datosGuardados[6],
                    seccion8: this.datosGuardados[7],
                };
                this.renderDoc(this.data);
            },

            getColor(){
                return "primary"
            },

            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            },

            forwardStepper(step){
                this.stepperCTRL = this.stepperCTRL + 1;
                this.completeTask(step)
            },

            completeTask(task){
                if(task === 1){this.complete1 = true; this.color1 = 'green'}
                else if (task === 2){this.complete2 = true, this.color2 = 'green'}
                else if (task === 3){this.complete3 = true, this.color3 = 'green'}
                else if (task === 4){this.complete4 = true, this.color4 = 'green'}
                else if (task === 5){this.complete5 = true, this.color5 = 'green'}
                else if (task === 6){this.complete6 = true, this.color6 = 'green'}
                else if (task === 7){this.complete7 = true, this.color7 = 'green'}
                else if (task === 8){this.complete8 = true, this.color8 = 'green'}
            },

            fakeEnd(){
                this.buttonLoader = false
                this.buttonText = 'VALIDACIONES CORRECTAS'
                this.buttonIcon = 'mdi-check-all'
                this.buttonColor = 'green'
            },

            infoValidate(){
                this.infoValidateWindow = true;
            },

            fakeValidate(){
                this.stepperCTRL = 1,
                this.complete1, this.complete2, this.complete3, this.complete4, this.complete5, this.complete6, this.complete7, this.complete8 = false; 
                this.color1, this.color2, this.color3, this.color4, this.color5, this.color6, this.color7, this.color8 = 'info';
                this.buttonLoader = true;
                this.sleep(1000)
                .then(() => this.forwardStepper(1))
                this.sleep(2000)
                .then(() => this.forwardStepper(2))
                this.sleep(3000)
                .then(() => this.forwardStepper(3))
                this.sleep(4000)
                .then(() => this.forwardStepper(4))
                this.sleep(5000)
                .then(() => this.forwardStepper(5))
                this.sleep(6000)
                .then(() => this.forwardStepper(6))
                this.sleep(7000)
                .then(() => this.forwardStepper(7))
                this.sleep(8000)
                .then(() => this.forwardStepper(8))
                this.sleep(8100)
                .then(() => this.fakeEnd())
                
                
                this.sleep(8200)
                .then(() => this.infoValidate())
                

                this.sleep(8200)
                .then(() => this.allowSaveDownload = false )

                
            },

            closeInfoStore(){
                this.storeWindow = false
            },

            storeData(){
                this.storeWindow = true;
            },

            async save(){
                if(this.edited === true){
                    this.expEditId = this.datosExpGuardado.id_exp;
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
                    seccion1: this.datosGuardados[0],
                    seccion2: this.datosGuardados[1],
                    seccion3: this.datosGuardados[2],
                    seccion4: this.datosGuardados[3],
                    seccion5: this.datosGuardados[4],
                    seccion6: this.datosGuardados[5],
                    seccion7: this.datosGuardados[6],
                    seccion8: this.datosGuardados[7],
                };
                
                //ERRORES DE GUARDADO
                if(this.data.expData.nombre === undefined || this.data.expData.nombre === ''){
                    this.saveAlert = true;
                } else {
                    axios
                    .post(`${process.env.VUE_APP_API_ROUTE}/postExpediente`, this.data)
                    .then( (data) => {
                        if(data.status === 201){
                            this.savingResultWindow = true;
                            setTimeout(this.closeInfoStore, 1500)
                        } else {
                            console.log("fail")
                        }
                    })
                }


                
        
            }
        }

    }
</script>

<style scoped>
    .card {
        margin: 0 auto;
    }

    .subtitle{
        padding: 0.5rem;
    }

    .actionButton {
        margin-bottom: 1rem;
    }

    .step {
        height: 3rem;
    }

    .actionIcon {
        margin-left: 1rem;
    }

    .cardTitle {
        background-color: #00BCD4;
        color: white;
        font-weight: 400;
    }
</style>