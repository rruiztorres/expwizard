<template>
    <div>
        <!-- 10 GARANTIAS -->
        <h3>10.- GARANTIAS</h3>
        <!--10.1 PROVISIONAL -->
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">10.1.- Provisional [art. 106.2 LCSP]</h5>
                <v-radio-group v-model="datos.provisional">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio label="Si se exige" value="si"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="3" v-if="datos.provisional === 'si'">
                <h5 class="subtitle">Indicar importe:</h5>
                <v-text-field filled type="number" 
                :rules="[rules.importeMax]"
                v-model="datos.importeExigidoProvisional"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="datos.provisional === 'si'">
                <h5 class="subtitle">Justificación:</h5>
                <v-text-field filled></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <!-- 10.2 DEFINITIVA -->
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">10.2.- Definitiva [art. 107.1 y 107.3 LCSP]</h5>
                <v-radio-group v-model="datos.definitiva">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio :label="textoDefinitiva" value="si"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.definitiva === 'no'">
                <h5 class="subtitle">Si no se exige, justificación:</h5>
                <v-textarea filled auto-grow></v-textarea>
            </v-col>

        </v-row>
        <br/>

        <!-- 10.3 COMPLEMENTARIA -->
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">10.3.- Complementaria [art. 107.2 LCSP]</h5>
                <v-radio-group v-model="datos.complementaria">
                    <v-radio label="No se exige" value="no"></v-radio>
                    <v-radio :label="textoComplementaria" value="si"></v-radio>
                </v-radio-group>
            </v-col>


            <v-col cols="12" md="3" v-if="datos.complementaria === 'si'">
                <h5 class="subtitle">Indicar motivo:</h5>
                <v-radio-group v-model="datos.complementariaJustificar">
                    <v-radio label="Por circunstancias especiales" value="especiales"></v-radio>
                    <v-radio label="Presunción de anormalidad" value="anormalidad"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="5" v-if="datos.complementaria === 'si' && datos.complementariaJustificar === 'especiales'">
                <h5 class="subtitle">Especificar circunstancias especiales:</h5>
                <v-textarea filled auto-grow v-model="datos.especificarCircEspec"></v-textarea>
            </v-col>
        </v-row>
        <br/>

        <!--11 CRITERIOS DE ADJUDICACION-->
        <h3>11.- CRITERIOS DE ADJUDICACIÓN</h3>
        <br/>
        <h5 class="subtitle">11.1.- Preponderancia de criterios</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="6">
                <h5 class="subtitle">1. Entre criterios cualitativos y criterios relacionados con el precio:</h5>
                <v-text-field v-model="datos.criteriosCualitativos" filled label="%"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <h5 class="subtitle">2. Criterios relacionados con el precio:</h5>
                <v-text-field v-model="datos.criteriosRelacionPrecio" filled label="%"></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script> 
    export default {
        nombre: 'Garantias',
        props:['presBase'],
        data(){
            return {
                rules: {
                    importeMax: (value) => this.maxExigido(value) || "El importe máximo exigido no puede ser superior al 3% del presupuesto base de licitación (IVA excluido)",
                },

                textoDefinitiva: undefined,
                textoComplementaria: undefined,

                datos:{
                    componente:'Garantias',
                    provisional: '',
                    importeExigidoProvisional: undefined,
                    defintiva: '',
                    importeExigidoDefinitiva: undefined,
                    importeExigidoComplementaria: undefined,
                    complementaria: '',
                    complementariaJustificar: '',
                    criteriosCualitativos: '',
                    criteriosRelacionPrecio: '',
                }
            }
        },

        beforeDestroy(){
            this.$emit('datos', this.datos)
        },

        created(){
            this.initialize();
            console.log(this.presBase)
        },

        methods:{


            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }
                //Calculo según datos recibidos
                if(this.presBase !== undefined){
                    this.datos.importeExigidoDefinitiva = ((parseFloat(this.presBase.presupuestoBaseLicitacion)) * 0.05).toFixed(2);
                    this.datos.importeExigidoComplementaria = this.datos.importeExigidoDefinitiva
                    this.textoDefinitiva = `Si se exige, por importe de ${this.datos.importeExigidoDefinitiva} €`;
                    this.textoComplementaria = `Si se exige, por importe de ${this.datos.importeExigidoComplementaria} €`;
                } else {
                    this.textoDefinitiva, this.textoComplementaria = "Si se exige (presupuesto base aun no introducido)";
                }
            },

            maxExigido(importe){
                if(this.presBase){
                    this.base = parseFloat(this.presBase.presupuestoBaseLicitacion)
                    this.baseMax = this.base * 1.03;
                    if(importe < this.baseMax){
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .rowGroup {
        margin-top: 0.1rem;
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 1rem 0rem 1rem 0rem;
    }

    .subtitle {
        color: gray;
        font-weight: 500;
    }
</style>