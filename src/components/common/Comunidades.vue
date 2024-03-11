<template>
    <v-card id="ccaaTable">
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
                    @click="exportComunidades">
                        ACEPTAR
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
        <v-card-text>
            <v-data-table
                light
                class="showTable"
                :headers="comunidadesHeaders"
                :search="search"
                :items="comunidadesItems"
                dense
                show-select
                item-key="id_ccaa"
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
    props: ['inputData'],
    data(){
        return {
            itemsPerPage: 20,
            search: '',
            selected: [],
            comunidadesHeaders: [
                {text: 'Comunidad Autónoma', align: 'start', sortable: true, value:'nombre'},
                {text: 'Nombre alternativo', align: 'start', sortable: true, value:'nom_alt'},
            ],
            comunidadesItems: [],
        }
    },

    created(){
        this.initialize();
    },
    
    methods: {
        async initialize(){
            await axios
            .get(`${process.env.VUE_APP_API_ROUTE}/getComunidades`)
            .then( (data) => {
                if(data.status === 200){
                    this.comunidadesItems = data.data.resultados;
                    
                    //AUTOSELECCIONAR ITEMS EN CASO DE QUE EXISTA SELECCION PREVIA
                    if(this.inputData){
                        this.selected = this.comunidadesItems.filter((ccaa)=>this.inputData.includes(` ${ccaa.nombre}`))
                    }

                } else if (data.status === 204){
                    this.comunidadesItems = [];
                }
            })
        },

        closeDialog(){
            this.$emit("close", true)
        },

        exportComunidades(){
            const exportCCAA = this.selected.map((ccaa)=>` ${ccaa.nombre}`)
            this.$emit("comunidades", exportCCAA)
            this.closeDialog();
        }
    }
}
</script>

<style scoped>
    h3{
        font-weight: 400;
    }

    #ccaaTable{
        max-height: 98vh;
        width: 50rem;
        max-width: 90vw;
        margin: 0 auto;
        background-color: white;
    }

    .actions {
        background-color: rgb(149, 214, 214);
        min-height: 4rem;
        padding: 1rem;
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
