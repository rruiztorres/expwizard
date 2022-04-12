<template>
    <div>
        <br/>
        <h3>Modelos de Expedientes</h3>
        <hr/>
        <br/>
        <v-row class="row">
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card color="green" dark class="selection" @click="selectTipo()" elevation="0">
                    <v-card-title>PCAP</v-card-title>
                    <v-card-text>
                        <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card color="red" dark class="selection" elevation="0">
                    <v-card-title>SERVICIOS</v-card-title>
                    <v-card-text>
                        <v-icon class="iconSel">mdi-note-text-outline</v-icon>
                    </v-card-text>
                </v-card>
            </v-col> 
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card color="blue" dark class="selection" elevation="0">
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

            }
        },

        methods:{
            selectTipo(tipoExp){
                this.$emit("tipoExp", tipoExp)
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
</style>
