<template>
    <v-card id="cpvTable" light>
        <v-card-actions class="actions">
            <v-row dense>
                <v-col cols="12" md="4">
                    <v-btn block color="error" @click="closeDialog">
                        CERRAR
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn 
                    @click="activateSearch"
                    v-if="!activeSearch"
                    block color="info">
                        IR A BUSCADOR
                    </v-btn>
                    <v-btn
                    @click="closeSearch"
                    v-else
                    block color="warning">
                        IR A VISTA CATÁLOGO
                    </v-btn>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn block color="success"
                    @click="exportCPV">
                        ACEPTAR
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
        <v-card-text class="itemsContainer">
            <v-row dense>
                <!-- CPV DISPONIBLES -->
                <v-col cols="7" v-if="!activeSearch">
                    <h3>Catálogo CPV</h3>
                    <hr/>
                    <v-treeview
                        class="showTable"
                        v-model="selected"
                        :items="cpvItems"
                        activatable
                        item-key="codigo"
                        open-on-click
                        item-text="longdesc"
                        item-children="items"
                        selectable
                        return-object
                        selection-type="independent"
                        @update:open="loadChilds"
                    >
                        <template v-slot:prepend="{ open }">
                            <v-icon color="orange">
                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                            </v-icon>
                        </template>
                    </v-treeview>
                </v-col>

                <!-- SEARCH (DATA TABLE)-->
                <v-col cols="7" v-else>
                    <h3>Buscador</h3>
                    <hr/>
                    <v-col cols="12">
                        <v-text-field label="Buscar CPV"
                        dense single-line
                        filled
                        v-model="search"
                        ></v-text-field>
                    </v-col>

                    <!-- DATA TABLE -->
                    <v-data-table
                    v-if="!loading"
                    item-key="codigo"
                    v-model="selected"
                    show-select
                    :search="search"
                    :items="cpvFullItems"
                    :headers="cpvHeaders"
                    :items-per-page="9"
                    >
                    </v-data-table>
                    <!--LOADING -->
                    <div v-else>
                        <v-progress-circular
                        :size="70"
                        :width="7"
                        color="purple"
                        indeterminate
                        ></v-progress-circular>
                        <h3>Recuperando datos, por favor espere</h3>
                    </div>
                </v-col>

                <!-- SELECCION ACTUAL -->
                <v-col cols="5">
                    <h3>Selección actual</h3>
                    <hr/>
                    <v-list dense v-if="selected !== []" class="selector">
                        <v-list-item
                        v-for="(item, i) in selected"
                        :key="i"
                        >
                            <v-list-item-icon>
                                <v-icon color="red"
                                @click="deleteElement(i)"
                                >mdi-delete</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{item.codigo}} - {{item.descripción}}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';

export default{
    name: 'CPVTable',
    props: ['selection'],
    data(){
        return {
            itemsPerPage: 20,
            search: '',
            activeSearch: false,
            selected: [],
            cpvHeaders: [
                {width:"25%", text: 'código CPV', align: 'start', sortable: true, value:'codigo'},
                {width:"75%", text: 'Descripción', align: 'start', sortable: true, value:'descripción'},
            ],
            cpvItems: [],
            cpvFullItems: [],
            loading: false,
        }
    },

    created(){
        this.initialize();
    },

    methods: {
        async initialize(){
            await axios
            .get(`${process.env.VUE_APP_API_ROUTE}/getCPV?level=1`)
            .then((data) => {
                if(data.status === 200){
                    this.cpvItems = data.data.response;
                } else if (data.status === 204){
                    this.cpvItems = [];
                }
            })
        },

        async activateSearch(){
            this.activeSearch = true;
            this.loading = true;
            await axios
            .get(`${process.env.VUE_APP_API_ROUTE}/getCPV`)
            .then((data) => {
                if(data.status === 200){
                    this.cpvFullItems = data.data.response;
                } else if (data.status === 204){
                    this.cpvFullItems = [];
                }
                this.loading = false;
            })
            
        },

        closeSearch(){
            this.cpvFullItems = [];
            this.activeSearch = false;
        },

        closeDialog(){
            this.$emit("close", true)
        },

        exportCPV(){
            const exportCPV = this.selected.map((cpv)=>` ${cpv.codigo}`)
            this.$emit("cpvCodes", exportCPV)
            this.closeDialog();
        },

        deleteElement(id){
            this.selected.splice(id,1)
        },

        shortDesc(fullDesc){
            if(fullDesc.length > 35){
                const shortDesc = fullDesc.slice(0, 35) + "..."
                return shortDesc;
            } else {
                return fullDesc;
            }
        },

        loadChilds(data){
            if(data.length > 0){
                //nivel y seccion a pedir
                const level = data[data.length-1].nivel+1
                const seccion = data[data.length-1].codigo.slice(0,level)

                axios
                .get(`${process.env.VUE_APP_API_ROUTE}/getCPV?level=${level}&section=${seccion}`)
                .then((response)=>{
                    if(response.status === 200){
                        data[data.length-1].items = response.data.response;
                    } else if (response.status === 204){
                        data[data.length-1].items = undefined;
                    }
                    
                })
            }
        },

    }
}
</script>

<style scoped>
    h3{
        font-weight: 400;
    }

    #cpvTable{
        /* max-height: 95vh; */
        width: 100rem;
        max-width: 90vw;
        margin: 0 auto;
    }

    .itemsContainer {
        height: 43rem;
        max-height: 79vh;
    }

    .actions {
        background-color: rgb(149, 214, 214);
        min-height: 4rem;
    }

    .loaderContainer{
        width: 100% !important;
        margin: 1rem;
    }

    .searchBox{
        margin-bottom: -1rem !important;
        padding: 0.5rem !important;
    }

    .showTable, .selector{
        padding: 0rem 0.5rem 0rem 0.5rem;
        max-height: 70vh;
        overflow-y: auto;
    }

    .deleteIcon {
        margin-right: 0.3rem;
    }
</style>
