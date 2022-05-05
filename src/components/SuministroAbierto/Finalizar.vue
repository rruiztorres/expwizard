<template>
    <div>
        <v-row>
            <v-col cols="12" md="6">
                <v-card class="card">
                    <v-card-title>
                        <h3 class="subtitle">VALIDAR</h3>
                        <v-spacer></v-spacer>
                        <v-btn :loading="buttonLoader" @click="fakeValidate" dark :color="buttonColor">
                            <v-icon>{{buttonIcon}}</v-icon>{{buttonText}}
                        </v-btn>
                    </v-card-title>
                    <v-stepper
                        v-model="stepperCTRL"
                        vertical
                    >
                        <v-stepper-step
                        step="1"
                        :complete="complete1"
                        :color="color1"
                        >
                        1.- OBJETO Y NECESIDADES
                        </v-stepper-step>

                        <v-stepper-step
                        :complete="complete2"
                        :color="color2"
                        step="2"
                        >
                        2.- PRESUPUESTO, LOTES E INCOMPATIBILIDADES
                        </v-stepper-step>

                        <v-stepper-step
                        :complete="complete3"
                        :color="color3"
                        step="3"
                        >
                        3.- CAPACIDAD Y SOLVENCIA
                        </v-stepper-step>

                        <v-stepper-step
                        :complete="complete4"
                        :color="color4"
                        step="4"
                        >
                        4.- GARANTÍAS, CRITERIOS Y ADJUDICACIÓN
                        </v-stepper-step>

                        <v-stepper-step
                        :complete="complete5"
                        :color="color5"
                        step="5"
                        >
                        5.- PAGOS, REV.PRECIOS Y ABONOS A CUENTA
                        </v-stepper-step>

                        <v-stepper-step
                        :complete="complete6"
                        :color="color6"
                        step="6"
                        >
                        6.- EJECUCIÓN Y CONDICIONES
                        </v-stepper-step>

                        <v-stepper-step
                        :complete="complete7"
                        :color="color7"
                        step="7"
                        >
                        7.- MODIFICACIONES Y PENALIDADES
                        </v-stepper-step>

                        <v-stepper-step
                        :complete="complete8"
                        :color="color8"
                        step="8"
                        >
                        8.- CESIÓN, SUBCONTRATACIÓN Y OTROS
                        </v-stepper-step>
                    </v-stepper>                
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card class="card">
                    <v-card-title>
                        <v-btn color="green" dark @click="save">GUARDAR</v-btn>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'Finalizar',
        props: ['datosGuardados'],

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


                datos: {
                    componente: 'Finalizar',                 
                }

            }
        },

        methods: {
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

            fakeReboot(){
                this.buttonLoader = false
                this.buttonText = 'EJECUTAR VALIDACIONES'
                this.buttonIcon = 'mdi-play'
                this.buttonColor = 'info'
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
                this.sleep(15000)
                .then(() => this.fakeReboot())
            },

            save(){
                console.log(this.datosGuardados)
            }
        }

    }
</script>

<style scoped>
    .card {
        margin: 0 auto;
    }
</style>