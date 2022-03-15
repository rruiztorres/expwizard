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
            @click="exportCPV"
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
            dense
            :headers="CPVheaders"
            :search="search"
            :items="cpvItems"
            show-select
            v-model="selected"
            :items-per-page="itemsPerPage"
            show-header
            hide-default-footer
            :key="codigo"
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
        max-width: 90rem;
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
    name: 'CPVTable',
    data(){
        return {
            itemsPerPage: 100,
            search: '',
            selected: [],
            CPVheaders: [
                {text: 'Clave', align: 'start', sortable: true, value:'codigo'},
                {text: 'Descripcion', align: 'start', sortable: true, value:'descripcion'},
                {text: 'Grupo', align: 'start', sortable: true, value:'grupo'},
            ],
            cpvItems: [],
            codigo: '',
        }
    },

    created(){
        this.initialize();
    },
    
    methods: {
        async initialize(){
            axios
            .get(`${process.env.VUE_APP_API_ROUTE}/getCPV`)
            .then( (data) => {
                this.cpvItems = data.data.resultados
            })
        },

        closeDialog(){
            this.$emit("close", true)
        },

        exportCPV(){
            this.cpvCodes = [];
            for (this.index in this.selected) {
                this.cpvCodes.push(this.selected[this.index].codigo + " " + this.selected[this.index].descripcion)
            }
            this.$emit("cpvCodes", this.cpvCodes)
            this.closeDialog();
        }
    }
}
</script>
