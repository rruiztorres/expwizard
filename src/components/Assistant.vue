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
                                <v-btn color="success" :disabled="true" class="headButton" @click="execute">
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
                    >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    
                        <v-tab>Disposiciones Generales</v-tab>
                        <v-tab>Preparación del contrato</v-tab>
                        <v-tab>Adjudicación del contrato</v-tab>
                        <v-tab>Ejecución del contrato</v-tab>
                        <v-tab>Extinción del contrato</v-tab>
                        <v-tab>Modelo de declaración responsable</v-tab>
                        <v-tab>Solvencia económica y financiera</v-tab>
                        <v-tab>Solvencia técnica y profesional</v-tab>
                        <v-tab>Proposición económica y otros criterios</v-tab>
                        <v-tab>Modelos de notificación de subcontratación</v-tab>
                        <v-tab>Real Decreto Ley</v-tab>

                    <!--TITULO 1-->
                    <v-tab-item class="tabContent">
                        <Titulo1
                            @data="getData"
                        ></Titulo1>
                    </v-tab-item>
                    </v-tabs>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script> 
import Titulo1 from "@/components/SuministroAbierto/Titulo1";
import {renderDoc} from "@/assets/mixins/renderDoc";


    export default{
        name: 'Assistant',

        components: { Titulo1 },

        mixins: [renderDoc],

        data(){
            return{
                data: undefined,
            }
        },

        methods:{
            back(){
                this.$emit("back", true)
            },

            getData(dataRecibida){
                console.log(this.data)
                this.data = dataRecibida;
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

