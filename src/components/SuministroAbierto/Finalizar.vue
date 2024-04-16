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
                        >
                        <h5>1.- OBJETO Y NECESIDADES</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        step="2"
                        >
                        <h5>2.- PRESUPUESTO, LOTES Y ANUALIDADES</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        step="3"
                        >
                        <h5>3.- INCOMPATIBILIDADES, CAPACIDAD Y SOLVENCIA</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        step="4"
                        >
                        <h5>4.- GARANTÍAS, CRITERIOS Y ADJUDICACIÓN</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        step="5"
                        >
                        <h5>5.- PAGOS, REV.PRECIOS Y ABONOS A CUENTA</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        step="6"
                        >
                        <h5>6.- PLAZOS, RESPONSABLE Y EJECUCIÓN</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
                        step="7"
                        >
                        <h5>7.- MODIFICACIONES Y PENALIDADES</h5>
                        </v-stepper-step>

                        <v-stepper-step
                        class="step"
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
                        <v-btn block :loading="buttonLoader" color="warning" class="actionButton" dark>VALIDAR<v-icon class="actionIcon">mdi-alert-circle-check</v-icon></v-btn>
                        <v-btn block color="info" class="actionButton" dark @click="execute">DESCARGAR WORD <v-icon class="actionIcon">mdi-file-word</v-icon></v-btn>
                        <v-btn block color="error" class="actionButton" dark >DESCARGAR PDF <v-icon class="actionIcon">mdi-file-pdf-box</v-icon></v-btn>
                        <v-btn block color="green" class="actionButton" dark @click="storeData">GUARDAR <v-icon class="actionIcon">mdi-content-save-all</v-icon></v-btn>
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
                allowSaveDownload: true,
                infoValidateWindow: false,
                buttonLoader: false,
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


            infoValidate(){
                this.infoValidateWindow = true;
            },


            closeInfoStore(){
                this.storeWindow = false
            },

            storeData(){
                this.storeWindow = true;
            },

            async save(){
                if(this.edited){
                    this.expEditId = this.datosExpGuardado.id_expediente;
                } else {
                    this.expEditId = undefined;
                }

                console.log(this.datosGuardados)

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