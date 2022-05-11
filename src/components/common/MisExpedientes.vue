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
                        @click="getInfo(props.item.id)"
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

    export default {
        name: 'MisExpedientes',
        mixins: [getColor],
        data(){
            return{
                search: '',
                foo: 'hello World',
                expHeaders: [
                    { text: "Editar", align: "start", sortable: false, value: "edit"},
                    { text: "Clave", align: "start", sortable: true, value: "id" },
                    { text: "Tipo", align: "start", sortable: true, value: "tipo" },
                    { text: "Fecha", align: "start", sortable: true, value: "fecha" },
                    { text: "Descripción", align: "start", sortable: true, value: "descripcion"},
                    { text: "Estado", align: "start", sortable: true, value: "estado" },
                    { text: "Descargar", align: "start", sortable: true, value: "downloads" },
                ],
                expedientes: [
                    {id: '2021_000001', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '11/03/2022', descripcion: "Componentes Eléctricos"},
                    {id: '2021_000002', tipo: 'SUMINISTRO', estado: 'Pendiente Revisión', fecha: '10/03/2022', descripcion: "Suministro de tóner equipos multifunción"},
                    {id: '2021_000003', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022', descripcion: "Mobiliario de oficina"},
                    {id: '2021_000004', tipo: 'PCAP', estado: 'Enviado', fecha: '15/03/2022', descripcion: "Fuentes de agua"},
                    {id: '2021_000005', tipo: 'SUMINISTRO', estado: 'Revisado', fecha: '10/03/2022', descripcion: "Maquinas expendedoras"},
                    {id: '2021_000006', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '18/03/2022', descripcion: "Mobiliario de oficina"},
                    {id: '2021_000007', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022', descripcion: "Componentes Eléctricos"},
                    {id: '2021_000008', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '20/03/2022', descripcion: "Fuentes de agua"},
                    {id: '2021_000009', tipo: 'SUMINISTRO', estado: 'Pendiente Revisión', fecha: '10/03/2022', descripcion: "Fuentes de agua"},
                    {id: '2021_000010', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022', descripcion: "Mobiliario de oficina"},
                    {id: '2021_000011', tipo: 'PCAP', estado: 'Enviado', fecha: '10/02/2022', descripcion: "Fuentes de agua"},
                    {id: '2021_000012', tipo: 'SUMINISTRO', estado: 'Revisado', fecha: '11/02/2022', descripcion: "Fuentes de agua"},
                    {id: '2021_000013', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022', descripcion: "Componentes Eléctricos"},
                    {id: '2021_000014', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022', descripcion: "Mobiliario de oficina"},

                ]
            }
        },
        methods:{
            getInfo(){
                console.log()
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
