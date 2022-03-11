<template>
    <div id="cpvTable">
        <v-toolbar>
            <v-btn type="error">
                CERRAR
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
            :headers="CPVheaders"
            :search="search"
            show-select
            v-model="selected"
            :items-per-page="itemsPerPage"
            group-by="grupo"
        >
        </v-data-table>
    </div>
</template>

<style scoped>
    #cpvTable{
        background-color: white;
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
    name: 'CPVTable',
    data(){
        return {
            itemsPerPage: -1,
            search: '',
            selected: [],
            CPVheaders: [
                {text: 'Clave', align: 'start', sortable: false, value:'clave'},
                {text: 'Descripcion', align: 'start', sortable: false, value:'descripcion'},
                {text: 'Grupo', align: 'start', sortable: false, value:'grupo'},
            ],

        }
    }
}
</script>
