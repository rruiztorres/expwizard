<template>
    <v-card id="provTable">
        <v-card-actions class="actions">
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-text-field
                    solo light dense
                    label="Buscar"
                    class="searchBox"
                    v-model="search"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-btn block color="error" @click="closeDialog">
                        CERRAR
                    </v-btn>
                </v-col>
                <v-col cols="12" md="3">
                    <v-btn block color="success"
                    @click="exportProv">
                        ACEPTAR
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
        <v-card-text>
            <v-data-table
                light dense
                class="showTable"
                :headers="provHeaders"
                :search="search"
                :items="provItems"
                show-select
                item-key="id_prov"
                v-model="selected"
                :items-per-page="itemsPerPage"
                hide-default-footer
            >
                <template v-slot:no-data>
                    <div class="loaderContainer">
                        <v-progress-circular
                        :size="70"
                        :width="7"
                        color="purple"
                        indeterminate
                        ></v-progress-circular>
                        <h3>Recuperando datos, por favor espere</h3>
                    </div>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';

export default{
    name: 'Comunidades',
    props:['filterCCAA', 'inputData'],
    data(){
        return {
            itemsPerPage: 20,
            search: '',
            selected: [],
            provHeaders: [
                {text: 'Provincia', align: 'start', sortable: true, value:'nombre'},
                {text: 'Comunidad Autónoma', align: 'start', sortable: true, value:'ccaa_nombre'},
            ],
            provItems: [],
        }
    },

    created(){
        this.initialize();
    },
    
    methods: {
        async initialize(){
            await axios
            .get(`${process.env.VUE_APP_API_ROUTE}/getProvincias`)
            .then( (data) => {
                if(data.status === 200){
                    this.provItems = data.data.resultados;

                    //FILTRADO POR CCAA SI EXISTE SELECCION
                    if(this.filterCCAA !== undefined){
                        this.provItems = this.provItems.filter((prov)=>
                        Array.from(this.filterCCAA).includes(` ${prov.ccaa_nombre}`)
                        ) 
                    }

                    //AUTOSELECCIONAR ITEMS EN CASO DE QUE EXISTA SELECCION PREVIA
                    if(this.inputData){
                        this.selected = this.provItems.filter((prov)=>this.inputData.includes(` ${prov.nombre}`))
                    }
                } else if (data.status === 204){
                    this.provItems = [];
                }
            })
        },

        closeDialog(){
            this.$emit("close", true)
        },

        exportProv(){
            const exportProv = this.selected.map((prov)=>` ${prov.nombre}`)
            this.$emit("provincias", exportProv)
            this.closeDialog();
        }
    }
}
</script>

<style scoped>
    h3{
        font-weight: 400;
    }

    #provTable{
        max-height: 98vh;
        width: 50rem;
        max-width: 90vw;
        margin: 0 auto;
        background-color: white;
    }

    .actions {
        background-color: rgb(149, 214, 214);
        min-height: 4rem;
    }

    .loaderContainer{
        padding: 1rem;
    }

    .searchBox{
        margin: 0rem 0rem -1.5rem 0rem !important;
        padding:0.5rem;
    }

    .showTable{
        padding: 0.5rem;
        border-radius: 4px;
        max-height: 72vh;
        overflow-y: auto;
    }
</style>
