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
            @click="exportAplicPres"
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
            :headers="aplicacionPresHeaders"
            :search="search"
            :items="aplicacionPresItems"
            show-select
            dense
            v-model="selected"
            :items-per-page="itemsPerPage"
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

export default{
    name: 'AplicacionPres',
    data(){
        return {
            itemsPerPage: -1,
            search: '',
            selected: [],
            codigo: '',
            aplicacionPresHeaders: [
                {text: 'Código', align: 'start', sortable: true, value:'codigo'},
                {text: 'Descripción', align: 'start', sortable: true, value:'descripcion'},
            ],
            aplicacionPresItems: [
                {id: 1, codigo: '1718495 A 630', descripcion: ''},
                {id: 2, codigo: '1718495 A 640', descripcion: ''},
            ],
        }
    },

   
    methods: {
        closeDialog(){
            this.$emit("close", true)
        },

        exportAplicPres(){
            this.aplicacionPres = [];
            for (this.index in this.selected) {
                this.aplicacionPres.push(" " + this.selected[this.index].codigo);
            }
            this.$emit("aplicPres", this.aplicacionPres)
            this.closeDialog();
        }
    }
}
</script>
