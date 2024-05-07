<template> 
    <div id="wrapper">
       
        <h2>Mis Expedientes</h2>

        <!-- ACCIONES GLOBALES -->
        <v-card class="sectionWrapper">
            <v-row dense>
                <v-col cols="12">   
                    <h3>Acciones globales</h3>
                </v-col>
                <v-col cols="12" md="6" lg="2">
                    <v-btn
                        block
                        color="error" 
                        :disabled="selected.length === 0"
                        @click="deleteExp(selected)">
                    Borrar selección
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" lg="2">
                    <v-btn
                        block
                        color="info" 
                        :disabled="selected.length === 0">
                    Actualizar Estado
                    </v-btn>
                </v-col>
                <v-col cols="12" md="12" lg="8">
                    <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    hide-details
                    filled dense
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card>
        
        <!-- DATA TABLE -->
        <v-card class="sectionWrapper">
            <v-data-table
                :headers="expHeaders"
                :items="expedientes"
                :items-per-page="-1"
                :search="search"
                show-select
                hide-default-footer
                item-key="id_expediente"
                v-model="selected"
                group-by="tipo"
            >   

                <!-- BARRA AGRUPAR PERSONALIZADA -->
                <template v-slot:[`group.header`]="{items, isOpen, toggle}">
                    <th colspan="10">
                        <!-- ABRIR / CERRAR PESTAÑA -->
                        <v-icon @click="toggle">{{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                        <!-- TEXTO -->
                        <span style="font-weight:400; font-size:125%; margin:0rem 0rem 0rem 1rem;">
                            <span style="font-weight:500; margin-left:0.2rem;">{{items[0].data.expData.tipo}}</span></span>
                    </th>
                </template>

                <!-- BOTON EDITAR -->
                <template v-slot:[`item.edit`] = "props">
                    <v-btn
                    color="success"
                    title="Editar"
                    @click="edit(props.item)"
                    small><v-icon small>mdi-lead-pencil</v-icon> Editar
                    </v-btn>
                </template>
               
                <!-- FECHA -->
                <template v-slot:[`item.fecha`]="props">
                    {{getFormatDate((props.item.fecha.split("T"))[0])}}
                </template>

                <!-- ESTADO -->
                <template v-slot:[`item.estado`]="props">
                    <v-chip :color="getColor(props.item.estado)" label dark>
                        {{props.item.estado}}
                    </v-chip>
                </template>

                 <!-- BOTONES DESCARGA -->
                <template v-slot:[`item.downloads`]="props">
                    <v-btn
                    class="actionButton"
                    color="error"
                    title="Descargar PDF"
                    @click="dummy(props.item)"
                    icon large dark><v-icon style="font-size: 2.5rem;">mdi-file-pdf-box</v-icon>
                    </v-btn>
                    <v-btn
                    class="actionButton"
                    color="info"
                    title="Descargar Word"
                    @click="dummy(props.item)"
                    icon large dark><v-icon style="font-size: 2.5rem;">mdi-file-word-box</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
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
                selected: [],
                expHeaders: [
                    { text: "Editar", align: "start", sortable: false, value: "edit"},
                    { text: "ID", align: "start", sortable: true, value: "id_expediente"},
                    { text: "Nombre", align: "start", sortable: true, value: "nombre_exp" },
                    { text: "Fecha", align: "start", sortable: true, value: "fecha" },
                    { text: "Descripción", align: "start", sortable: true, value: "descripcion_expediente"},
                    { text: "Estado", align: "start", sortable: true, value: "estado" },
                    { text: "Descargar", align: "start", sortable: true, value: "downloads" },
                ],
                expedientes: [],
                toggle: false,
            }
        },
        mounted(){
            this.initialize();
        },

        methods:{
            dummy(data){
                console.log(data)
            },

            getFormatDate(date){
                const inputDate = date.split("-")
                let formatDate = `${inputDate[2]} / ${inputDate[1]}/${inputDate[0]}`;
                return formatDate
            },

            async initialize(){
                await axios
                .get(`${process.env.VUE_APP_API_ROUTE}/getExpedientesByUser/` + localStorage.usrName)
                .then((data) => {
                    if(data.status === 200){
                        this.expedientes = data.data.response;
                    } else {
                        //LANZAR AVISO
                    }
                })
            },

            edit(data){
                this.$emit("edit", data.tipo)
                this.$emit("dataEdit", data)
            },

            async deleteExp(selection){
                const deleteItems = selection.map((item)=>item.id_expediente)
                await axios
                .delete(`${process.env.VUE_APP_API_ROUTE}/expedientes/submitDelete`, {headers: {'Autorization': localStorage.token}, data: deleteItems})
                .then((deletedExp)=>{
                    if(deletedExp){
                        this.initialize();
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #wrapper {
        width:98vw;
        margin:0 auto;
        max-height: 90vh;
        overflow-y: auto;
    }

    .sectionWrapper {
        padding:1rem;
        margin-bottom: 1rem;
    }

    h2, h3 {
        font-weight: 400 !important;
    }

    h2{
        margin-bottom:1rem;
    }
    
    .actionButton{
        opacity: 0.5;
    }
    
    .actionButton:hover{
        opacity: 1;
    }



</style>
