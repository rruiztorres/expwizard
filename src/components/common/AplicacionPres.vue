<template>
    <v-card id="appPresTable">
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
                    @click="exportAppPres">
                        ACEPTAR
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-actions>
        <v-card-text>
            <v-data-table
                light
                class="showTable"
                :headers="aplicacionHeaders"
                :search="search"
                :items="aplicacionItems"
                dense
                show-select
                item-key="id_part"
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
            aplicacionHeaders: [
                {text: 'Código', align: 'start', sortable: true, value:'codigo'},
                {text: 'Descripción', align: 'start', sortable: true, value:'descripcion'},
            ],
            aplicacionItems: [],
        }
    },

    created(){
        this.initialize();
    },
    
    methods: {
        async initialize(){
            await axios
            .get(`${process.env.VUE_APP_API_ROUTE}/parameters`)
            .then( (data) => {
                if(data.status === 200){
                    this.aplicacionItems = data.data.response.partidas_presupuestarias;
                    
                    // AUTOSELECCIONAR ITEMS EN CASO DE QUE EXISTA SELECCION PREVIA
                    if(this.inputData){
                        this.selected = this.aplicacionItems.filter((appPres)=>this.inputData.includes(` ${appPres.codigo}`))
                    }

                } else if (data.status === 204){
                    this.aplicacionItems = [];
                }
            })
        },

        closeDialog(){
            this.$emit("close", true)
        },

        exportAppPres(){
            const exportPartPres = this.selected.map((part)=>` ${part.codigo}`)
            this.$emit("aplicPres", exportPartPres)
            this.closeDialog();
        }
    }
}
</script>

<style scoped>
    h3{
        font-weight: 400;
    }

    #appPresTable{
        max-height: 98vh;
        width: 65rem;
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
