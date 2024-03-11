<template>
    <v-card light id="mainContainer">
        <v-card-title id="title">
            Configurar Lotes
            <v-spacer></v-spacer>
            <v-card-actions>
                <v-btn
                color="error"
                @click="close"
                >CERRAR</v-btn>
                <v-btn
                color="success"
                @click="saveData"
                >GUARDAR</v-btn>
            </v-card-actions>
        </v-card-title>
        <v-card-text id="batchConfig">
             <v-row dense>
                <v-col cols="5">
                    Introduzca el nº de lotes que desea generar:
                </v-col>
                <v-col cols="7">
                    <v-text-field
                    filled rounded type="number"
                    v-model="nLotes"
                    :min="1"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text id="content">
            <v-form id="form">
                <div v-if="lotes.length >= 1">
                    <h3>Identificación de los lotes</h3>
                    <v-row dense v-for="lote, i in lotes" :key="i">
                        <v-col cols="1">
                            <v-text-field 
                            readonly
                            dense filled :value="i+1"></v-text-field>
                        </v-col>
                        <v-col cols="7">
                            <v-text-field
                            dense filled :value="lote.descripcion" v-model="lotes[i].descripcion">
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <MoneyField
                            :input="lotes[i].pBase" 
                            @output="((data)=> lotes[i].pBase = data)"
                            v-model="lotes[i].pBase">
                            </MoneyField>
                        </v-col>
                        <v-col cols="1">
                            <v-btn 
                            @click="deleteRow(i)"
                            fab small color="error"><v-icon>mdi-delete</v-icon></v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-form>
        </v-card-text>       
    </v-card>
</template>

<script>
import MoneyField from "@/components/common/MoneyField"

import { currencyFormat } from '@/assets/mixins/currencyFormat';

export default {
    props:['storedLotes'],
    components: {MoneyField},
    mixins: [currencyFormat],

    watch:{
        nLotes(){
           this.checkNLotes();
        }
    },

    created(){
        if(this.storedLotes !== undefined){
            this.lotes = this.storedLotes;
        }

    },


    data(){
        return {
            nLotes: 1,
            lotes: [
                {
                    descripcion: '',
                    pBase: undefined,
                    impuesto: 21,
                }
            ]
        }
    },

    
    methods: {
        close(){
            this.$emit("close", false)
        },

        checkNLotes(){
            if(this.lotes.length < this.nLotes){
                let difference = this.nLotes - this.lotes.length;
                while (difference > 0){
                    const newBatch = {
                        descripcion: '',
                        pBase: undefined,
                        impuesto: 21,
                    }
                    this.lotes.push(newBatch);
                    difference = difference - 1;
                }
            }
        },

        deleteRow(id){
            this.lotes.splice(id,1);
            this.nLotes = this.lotes.length;
        },

        saveData(){
            this.$emit('getBatches', this.lotes)
        },
    }
}
</script>

<style scoped>
    #mainContainer {
        width: 60rem;
        max-width: 90vw;
    }

    #title {
        background-color: rgb(149, 214, 214) !important;
    }

    #batchConfig {
        margin: 1rem 0rem 0rem 0rem;
        padding-bottom: 0rem !important;
    }

    #content {
        margin-top: -1.5rem;
        padding: 0rem 0.5rem 1rem 1rem;
        max-height: 60vh;
        overflow-y: auto;
    }

    h3{
        margin-bottom: 1rem;
    }

    h1, h2, h3, h4 {
        font-weight: 400;
    }
</style>