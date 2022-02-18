<template>
    <div id="mainWrapper">
        <v-row class="rowControl">
            <v-col cols="8">
                <v-card-title class="fontControl">EXPEDIENTE DE SUMINISTRO ABIERTO</v-card-title>
            </v-col>
            <v-col class="buttonBack" cols="4">
                <v-btn color="error" @click="back">
                    <v-icon class="iconBack">mdi-arrow-left</v-icon>
                    SALIR
                    </v-btn>
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
                    >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    
                        <v-tab>Titulo 1</v-tab>
                        <v-tab>Titulo 2</v-tab>
                        <v-tab>Titulo 3</v-tab>
                        <v-tab>Titulo 4</v-tab>
                        <v-tab>Titulo 5</v-tab>
                        <v-tab>Anexo 1</v-tab>
                        <v-tab>Anexo 2</v-tab>
                        <v-tab>Anexo 3</v-tab>
                        <v-tab>Anexo 4</v-tab>
                        <v-tab>Anexo 5</v-tab>
                        <v-tab>Anexo 6</v-tab>

                    <!--TITULO 1-->
                    <v-tab-item class="tabContent">
                        <Titulo1/>
                    </v-tab-item>
                    </v-tabs>

                    <v-card-actions class="actions">
                        <v-btn color="info">
                            <v-icon>mdi-arrow-left</v-icon>
                            ATRÁS
                        </v-btn>
                        <v-btn color="primary">
                            SIGUIENTE
                            <v-icon>mdi-arrow-right</v-icon>
                        </v-btn>
                    </v-card-actions>

                </v-sheet>
                
            </v-col>
        </v-row>
    </div>
</template>

<script> 
import Titulo1 from "@/components/SuministroAbierto/Titulo1";

    export default{
        name: 'Assistant',

        components: { Titulo1 },

        data(){
            return{
                foo: null,
            }
        },

        methods:{
            back(){
                this.$emit("back", true)
            }
        }
    }

</script>

<style scoped>

    #mainWrapper {
        margin: 0 auto;
        max-width: 80rem;
    }

    .fontControl {
        font-weight: 400;
    }

    .rowControl {
        margin-bottom: -2rem;
    }

    h2{
        font-weight: 400;
    }
    .tabContent{
        padding: 2rem;
        height: 70vh;
        overflow-y: auto;
    }

    .buttonBack {
        margin: auto 0;
        text-align: end;
    }
    .iconBack {
        margin-right: 1rem;
    }

    .actions {
        padding: 1rem;
        background-color: lightblue
    }

    .actions > * {
        display: flex;
        flex-grow: 1;
    }
</style>

