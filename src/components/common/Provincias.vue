<template>
    <div id="cpvTable">
        <v-toolbar>
            <v-btn color="error" @click="closeDialog">
                CERRAR
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info">
                AYUDA
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn 
            @click="exportProvincias"
            color="success">
                ACEPTAR
            </v-btn>
        </v-toolbar>
        <v-text-field
        label="Buscar"
        class="searchBox"
        v-model="search"
        >
        </v-text-field>

        <v-data-table
            class="showTable"
            :headers="provinciasHeaders"
            :search="search"
            :items="provinciasItems"
            show-select
            dense
            v-model="selected"
            :items-per-page="itemsPerPage"
            item-key="id_prov"
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
    </div>
</template>

<style scoped>
    h3{
        font-weight: 400;
    }

    #cpvTable{
        max-width: 80rem;
        margin: 0 auto;
        background-color: white;
    }

    .loaderContainer{
        padding: 1rem;
    }

    .searchBox{
        padding: 1rem;
    }

    .showTable {
        padding: 0.5rem;
        border-radius: 4px;
    }
</style>


<script>
import axios from 'axios';

export default{
    name: 'Provincias',
    data(){
        return {
            itemsPerPage: -1,
            search: '',
            selected: [],
            codigo: '',
            provinciasHeaders: [
                {text: 'Nombre Oficial', align: 'start', sortable: true, value:'nombre'},
                {text: 'Alias', align: 'start', sortable: true, value:'alias'},
            ],
            provinciasItems: [],
        }
    },

    created(){
        this.initialize();
    },
    
    methods: {
        async initialize(){
            axios
            .get(`${process.env.VUE_APP_API_ROUTE}/getProvincias`)
            .then( (data) => {
                this.provinciasItems = data.data.resultados
            })
        },

        closeDialog(){
            this.$emit("close", true)
        },

        exportProvincias(){
            this.provincias = [];
            for (this.index in this.selected) {
                this.provincias.push(" " + this.selected[this.index].nombre);
            }
            this.$emit("provincias", this.provincias)
            this.closeDialog();
        }
    }
}
</script>
