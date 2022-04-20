<template>
    <div>
        <v-row class="searchBar">
          <v-col cols="12">
            <v-text-field
            v-model="textoBuscar"
            solo rounded placeholder="BUSCAR MODELO"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <h3>Modelos de Expedientes</h3>
                <hr/>
            </v-col>
        </v-row>
        
        <v-row class="row">
            <v-col 
            v-if="resBusqueda('PCAP')"
            cols="12" sm="6" md="4" lg="2">
                <v-card 
                color="green" dark class="selection" @click="selectTipo()" elevation="0">
                    <v-card-title>PCAP</v-card-title>
                    <v-card-text>
                        <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col 
            v-if="resBusqueda('SERVICIOS')"
            cols="12" sm="6" md="4" lg="2">
                <v-card 
                color="red" dark class="selection" elevation="0">
                    <v-card-title>SERVICIOS</v-card-title>
                    <v-card-text>
                        <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                    </v-card-text>
                </v-card>
            </v-col> 
            <v-col
            v-if="resBusqueda('OTROS')" 
            cols="12" sm="6" md="4" lg="2">
                <v-card 
                color="blue" dark class="selection" elevation="0">
                    <v-card-title>OTROS</v-card-title>
                    <v-card-text>
                        <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                    </v-card-text>
                </v-card>
            </v-col>    
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'Selector',

        data(){
            return {
                textoBuscar: '',
            }
        },

        methods:{
            selectTipo(tipoExp){
                this.$emit("tipoExp", tipoExp)
            },

            resBusqueda(componente){
                console.log("buscando...")
                this.coincidencia = this.textoBuscar.indexOf(componente);
                console.log(this.coincidencia, componente)
                
                return true
            }
        }
    }

</script>

<style scoped>
h1, h2, h3, h4 {
    font-weight: 400;
}

.selection{
    opacity: 0.7;
}
.selection:hover{
    opacity: 1;
    box-shadow: 0px 1px 4px 1px grey !important;
}

.row{
    width: 80vw;
    margin: 0 auto;
}

.iconSel {
    font-size: 8rem !important;
}

.searchBar {
    margin-top: 1rem;
    height: 5rem;
}

.searchTitle{
    height: 100%;
}

.searchTitle > * {
    margin-top: 0.8rem;
}
</style>
