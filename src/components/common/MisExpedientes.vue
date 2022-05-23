<template> 
    <div>
        <h2>Mis Expedientes</h2>
        <v-row>
            <v-col cols="12">
                <v-text-field
                    class="searchBar"
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    single-line
                    hide-details
                ></v-text-field>
                <br/>
                <v-data-table
                    :headers="expHeaders"
                    :items="expedientes"
                    :items-per-page="12"
                    :search="search"
                >   
                    <template v-slot:[`item.edit`] = "props">
                        <v-btn 
                        class="greenButton"
                        title="Descargar PDF"
                        @click="edit(props.item)"
                        icon dark><v-icon>mdi-lead-pencil</v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:[`item.downloads`]="props">
                        <v-btn 
                        class="redButton"
                        title="Descargar PDF"
                        @click="getInfo(props.item.id)"
                        icon dark><v-icon>mdi-file-pdf-box</v-icon>
                        </v-btn>
                        <span style="margin-right: 0.2rem;"></span>
                        <v-btn 
                        class="blueButton"
                        title="Descargar Word"
                        @click="getInfo(props.item.id)"
                        icon dark><v-icon>mdi-file-word-box</v-icon>
                        </v-btn>
                    </template>

                    <template v-slot:[`item.estado`]="props">
                        <v-chip :color="getColor(props.item.estado)" label dark>
                            {{props.item.estado}}
                        </v-chip>
                    </template>

                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {getColor} from "@/assets/mixins/getColor";
import axios from 'axios';

    export default {
        name: 'MisExpedientes',
        mixins: [getColor],
        data(){
            return{
                search: '',
                foo: 'hello World',
                expHeaders: [
                    { text: "Editar", align: "start", sortable: false, value: "edit"},
                    { text: "Nombre", align: "start", sortable: true, value: "nombre_exp" },
                    { text: "Fecha", align: "start", sortable: true, value: "fecha" },
                    { text: "Descripción", align: "start", sortable: true, value: "descripcion_expediente"},
                    { text: "Estado", align: "start", sortable: true, value: "estado" },
                    { text: "Descargar", align: "start", sortable: true, value: "downloads" },
                ],
                expedientes: []
            }
        },
        mounted(){
            this.initialize();
        },

        methods:{
            async initialize(){
                axios
                .get(`${process.env.VUE_APP_API_ROUTE}/getExpedientesByUser/` + 'jsgonzalez')
                .then((data) => {
                    this.expedientes = data.data.response;
                    console.log(this.expedientes)
                })
            },

            edit(data){
                this.$emit("edit", data.tipo)
                this.$emit("dataEdit", data.data)
            }

        }
    }
</script>

<style scoped>
    h2 {
        font-weight: 400 !important;
    }

    .actionIcon{
        margin-left: 0.15rem;
    }

    .searchBar {
        background-color: white;
        padding: 1rem;
        border-radius: 4px;
    }
    
    .blueButton {
        background-color: #1E88E5;
        opacity: 0.25;
    }

    .blueButton:hover, .redButton:hover, .greenButton:hover{
        opacity: 1;
    }

    .redButton {
        background-color: red;
        opacity: 0.25;
    }

    .greenButton {
        background-color: green;
        opacity: 0.25;
    }
</style>
