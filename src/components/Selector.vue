<template>
    <div>
        <br/>
        <h3>Expedientes de tipo prueba</h3>
        <hr/>
        <br/>
        <v-row class="row">
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" @click="selectTipo()" elevation="0">
                    <v-card-title>Suministro Abierto</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>          
        </v-row>

        <br/>
        <h3>Mas expedientes para elegir</h3>
        <hr/>
        <br/>
        <v-row class="row">
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="2">
                <v-card class="selection" elevation="0">
                    <v-card-title>Otro tipo</v-card-title>
                    <div class="imgContainer">
                        <img src="@/assets/word_logo.png">
                    </div>
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
.imgContainer{
    padding: 1rem;
}

.imgContainer>img {
    width: 100%;
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
</style>
