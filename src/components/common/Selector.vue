<template>
    <div>
        <!-- SEARCH -->
        <div>
            <v-row class="searchBar">
            <v-col cols="12">
                <v-text-field
                v-model="textoBuscar"
                solo rounded placeholder="BUSCAR MODELO"></v-text-field>
            </v-col>
            </v-row>
        </div>
        
        <div class="mainContainer">
            <!-- SUMINISTROS -->
            <div class="group">
                <v-row>
                    <v-col cols="12">
                        <h3>Expedientes de suministro</h3>
                        <hr/>
                    </v-col>
                </v-row>  
                <v-row class="row">
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card 
                        color="#0091EA" dark class="selection" @click="selectTipo('Suministro abierto varios criterios')" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Abierto</h3>
                                <h4 class="cardTitle">Varios criterios</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        disabled
                        color="#00B8D4" dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Abierto</h3>
                                <h4 class="cardTitle">Simplificado</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        disabled 
                        color="#00BFA5" dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Abierto</h3>
                                <h4 class="cardTitle">Simplif. abreviado</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>          
                </v-row>
            </div>

            <!-- SERVICIOS -->
            <div class="group">
                <v-row>
                    <v-col 
                    cols="12">
                        <h3>Expedientes de servicios</h3>
                        <hr/>
                    </v-col>
                </v-row>
                <v-row class="row">
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        disabled 
                        color="#00C853" dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Abierto</h3>
                                <h4 class="cardTitle">Varios criterios</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        disabled 
                        color="#64DD17" dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Abierto</h3>
                                <h4 class="cardTitle">Simplificado</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        disabled 
                        color="#AEEA00" dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Abierto</h3>
                                <h4 class="cardTitle">Simplif. abreviado</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    
                </v-row>
            </div>

            <!-- OBRAS -->
            <div class="group">
                <v-row>
                    <v-col 
                    cols="12">
                        <h3>Obras abiertas</h3>
                        <hr/>
                    </v-col>
                </v-row>
                <v-row class="row">
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        disabled
                        color="#7E57C2" dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Obras abiertas</h3>
                                <h4 class="cardTitle">Varios criterios</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        disabled
                        color="#EA80FC" dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Obras abiertas</h3>
                                <h4 class="cardTitle">Simplificado</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col 
                    cols="12" sm="6" md="4" xl="2">
                        <v-card
                        color="#AB47BC" 
                        disabled dark class="selection" elevation="0">
                            <div class="titleContainer">
                                <h3 class="cardTitle">Obras abiertas</h3>
                                <h4 class="cardTitle">Simplificado abreviado</h4>
                            </div>
                            <v-card-text>
                                <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                            </v-card-text>
                        </v-card>
                    </v-col>             
                </v-row>
            </div>
        </div>     
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
                this.coincidencia = this.textoBuscar.indexOf(componente);
                return true
            }
        }
    }

</script>

<style scoped>
.mainContainer {
    max-height: 79vh;
    overflow-y: auto;
}

h1, h2, h4 {
    font-weight: 400;
}

.group{
    margin-bottom: 1rem;
}

.selection{
    opacity: 0.7;
}
.selection:hover{
    opacity: 1;
    box-shadow: 0px 1px 4px 1px grey !important;
}

.titleContainer{
    padding-top: 1rem;
}

.cardTitle {
    text-align: center;
    margin-bottom: 0rem;
    word-break:normal;
}

.row{
    width: 80vw;
    margin: 0 auto;
}

.iconSel {
    width: 100%;
    margin: 0 auto;
    font-size: 8rem !important;
}

.searchBar {
    height: 5rem;
}

.searchTitle{
    height: 100%;
}

.searchTitle > * {
    margin-top: 0.8rem;
}
</style>
