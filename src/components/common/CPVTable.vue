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
                    <v-btn disabled block color="info">
                        BUSCAR
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
        <v-card-text v-if="!loading">
            <v-row dense>
                <!-- CPV DISPONIBLES -->
                <v-col cols="7">
                    <h3>CPV disponibles</h3>
                    <hr/>
                    <v-treeview
                        class="showTable"
                        v-if="!loading"
                        v-model="selected"
                        :items="cpvItems"
                        activatable
                        item-key="codigo"
                        open-on-click
                        item-text="longDesc"
                        item-children="items"
                        selectable
                        return-object
                        selection-type="independent"
                    >
                        <template v-slot:prepend="{ open }">
                            <v-icon color="orange">
                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                            </v-icon>
                        </template>
                    </v-treeview>
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
        <!-- LOADING -->
        <v-card-text v-else>
            <v-progress-circular
            class="loaderContainer"
            :size="160"
            :width="8"
            color="rgb(149, 214, 214)"
            indeterminate
            >
            Cargando CPV
            </v-progress-circular>
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
            selected: [],
            cpvHeaders: [
                {width:"25%", text: 'código CPV', align: 'start', sortable: true, value:'codigo'},
                {width:"75%", text: 'Descripción', align: 'start', sortable: true, value:'descripción'},
            ],
            cpvItems: [],
            loading: true,
        }
    },

    created(){
        this.initialize();
    },

    methods: {
        async initialize(){
            this.loading = true;
            await axios
            .get(`${process.env.VUE_APP_API_ROUTE}/getCPV`)
            .then((data) => {
                if(data.status === 200){
                    this.cpvItems = data.data.resultados;
                    this.cpvItems = this.buildIndex(this.cpvItems)
                } else if (data.status === 204){
                    this.cpvItems = [];
                }
            })
            this.loading = false;
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

        buildIndex(data){
            let list = [];
            //NV1
            list = data.filter((element)=>element.nivel === 1)
            list.forEach((nv1)=>{
                nv1.active = false; 
                nv1.longDesc = `${nv1.codigo} - ${nv1.descripción}`;
                nv1.items = data.filter((orig)=>(orig.nivel===2 && orig.codigo.slice(0,2)===nv1.codigo.slice(0,2)))
            
                //NV2
                nv1.items.forEach((nv2)=>{
                    nv2.active = false;
                    nv2.longDesc = `${nv2.codigo} - ${nv2.descripción}`;
                    nv2.items = data.filter((orig)=>(orig.nivel===2 && orig.codigo.slice(0,2)===nv2.codigo.slice(0,2)))
                
                    //NV3
                    nv2.items.forEach((nv3)=>{
                        nv3.active = false;
                        nv3.longDesc = `${nv3.codigo} - ${nv3.descripción}`;
                        nv3.items = data.filter((orig)=>(orig.nivel===3 && orig.codigo.slice(0,3)===nv3.codigo.slice(0,3)))
                    
                        //NV4
                        nv3.items.forEach((nv4)=>{
                            nv4.active = false;
                            nv4.longDesc = `${nv4.codigo} - ${nv4.descripción}`;
                            nv4.items = data.filter((orig)=>(orig.nivel===4 && orig.codigo.slice(0,4)===nv4.codigo.slice(0,4)))

                            //NV5
                            nv4.items.forEach((nv5)=>{
                                nv5.active = false;
                                nv5.longDesc = `${nv5.codigo} - ${nv5.descripción}`;
                                nv5.items = data.filter((orig)=>(orig.nivel===5 && orig.codigo.slice(0,5)===nv5.codigo.slice(0,5)))
                            
                                //NV5 longDesc
                                nv5.items.forEach((nv6)=>{
                                    nv6.active = false;
                                    nv6.longDesc = `${nv6.codigo} - ${nv6.descripción}`;
                                })
                            })
                        })
                    })
                })
            })
            return list

        }
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
