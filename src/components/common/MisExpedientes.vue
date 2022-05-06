<template> 
    <div>
        <h2>Mis Expedientes</h2>
        <v-row>
            <v-col cols="12">
                <v-data-table
                    :headers="expHeaders"
                    :items="expedientes"
                    :items-per-page="-1"
                >
                    <template v-slot:[`item.actions`]="props">
                        <v-icon
                            title="Editar"
                            class="actionIcon"
                            @click="getInfo(props.item.id)"
                            color="green"
                        >mdi-notebook-edit-outline
                        </v-icon>
                        <v-icon
                            title="Descargar PDF"
                            class="actionIcon"
                            @click="getInfo(props.item.id)"
                            color="red"
                        >mdi-file-pdf-box
                        </v-icon>
                        <v-icon
                            title="Descargar Word"
                            class="actionIcon"
                            @click="getInfo(props.item.id)"
                            color="blue"
                        >mdi-file-word-box
                        </v-icon>
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
                foo: 'hello World',
                expHeaders: [
                    { text: "Clave", align: "start", sortable: true, value: "id" },
                    { text: "Tipo", align: "start", sortable: true, value: "tipo" },
                    { text: "Fecha", align: "start", sortable: true, value: "fecha" },
                    { text: "Estado", align: "start", sortable: true, value: "estado" },
                    { text: "Acciones", align: "start", sortable: true, value: "actions" },
                ],
                expedientes: [
                    {id: '2021_000001', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '11/03/2022'},
                    {id: '2021_000002', tipo: 'SUMINISTRO', estado: 'Pendiente Revisión', fecha: '10/03/2022'},
                    {id: '2021_000003', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022'},
                    {id: '2021_000004', tipo: 'PCAP', estado: 'Enviado', fecha: '15/03/2022'},
                    {id: '2021_000005', tipo: 'SUMINISTRO', estado: 'Revisado', fecha: '10/03/2022'},
                    {id: '2021_000006', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '18/03/2022'},
                    {id: '2021_000007', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022'},
                    {id: '2021_000008', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '20/03/2022'},
                    {id: '2021_000009', tipo: 'SUMINISTRO', estado: 'Pendiente Revisión', fecha: '10/03/2022'},
                    {id: '2021_000010', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022'},
                    {id: '2021_000011', tipo: 'PCAP', estado: 'Enviado', fecha: '10/02/2022'},
                    {id: '2021_000012', tipo: 'SUMINISTRO', estado: 'Revisado', fecha: '11/02/2022'},
                    {id: '2021_000013', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022'},
                    {id: '2021_000014', tipo: 'PCAP', estado: 'Pendiente Revisión', fecha: '10/03/2022'},

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
</style>
