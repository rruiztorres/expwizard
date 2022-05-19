<template>
    <div>
        <!-- 10 GARANTIAS -->
        <h3>10.- GARANTIAS</h3>
        <!--10.1 PROVISIONAL -->
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">10.1.- Provisional [art. 106.2 LCSP]</h5>
                <v-radio-group v-model="datos.provisional">
                    <v-radio label="Si se exige" :value="true"></v-radio>
                    <v-radio label="No se exige" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="3" v-if="datos.provisional === true">
                <h5 class="subtitle">Indicar importe:</h5>
                <v-text-field filled type="number" 
                :rules="[rules.importeMax]"
                v-model="datos.importeExigidoProvisional"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" v-if="datos.provisional === true">
                <h5 class="subtitle">Justificación:</h5>
                <v-text-field filled v-model="datos.provisionalJustificar"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <!-- 10.2 DEFINITIVA -->
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">10.2.- Definitiva [art. 107.1 y 107.3 LCSP]</h5>
                <v-radio-group v-model="datos.definitiva">
                    <v-radio label="Si se exige" :value="true"></v-radio>
                    <v-radio label="No se exige" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="8" v-if="datos.definitiva === false">
                <h5 class="subtitle">Si no se exige, justificación:</h5>
                <v-textarea filled auto-grow v-model="datos.definitivaJustificacion"></v-textarea>
            </v-col>

        </v-row>
        <br/>

        <!-- 10.3 COMPLEMENTARIA -->
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">10.3.- Complementaria [art. 107.2 LCSP]</h5>
                <v-radio-group v-model="datos.complementaria">
                    <v-radio label="Si se exige" :value="true"></v-radio>
                    <v-radio label="No se exige" :value="false"></v-radio>
                </v-radio-group>
            </v-col>


            <v-col cols="12" md="4" v-if="datos.complementaria === true">
                <h5 class="subtitle">Indicar motivo:</h5>
                <v-radio-group v-model="datos.complementariaJustificar">
                    <v-radio label="Por circunstancias especiales" :value="true"></v-radio>
                    <v-radio label="Si la oferta del adjudicatario hubiera resultado inicialmente incursa en presunción de anormalidad." :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" md="5" v-if="datos.complementaria === true && datos.complementariaJustificar === true">
                <h5 class="subtitle">Especificar circunstancias especiales:</h5>
                <v-textarea filled auto-grow v-model="datos.especificarCircEspec"></v-textarea>
            </v-col>
        </v-row>
        <br/><br/>

        <!--11 CRITERIOS DE ADJUDICACION-->
        <h3>11.- CRITERIOS DE ADJUDICACIÓN</h3>
        <h5 class="subtitle">11.1.- Preponderancia de criterios</h5>
        <v-row class="rowGroup">
            <v-col cols="12">
                <h5>1.- Entre criterios cualitativos y criterios relacionados con el precio:</h5>
                <v-row>
                    <v-col cols="12" md="3">
                        <h5 class="subtitle">Cualitativos</h5>
                        <v-text-field filled label="%" 
                        type="number"
                        v-model="datos.critCualitativos"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <h5 class="subtitle">Relacionados con el precio</h5>
                        <v-text-field filled label="%"
                        type="number" v-model="datos.critRelPrecio"></v-text-field>
                    </v-col>
                    <!-- ALERTA -->
                    <v-col cols="12" md="6" v-if="alertCriteriosCualPre == true">
                        <h5 class="subtitle">{{alertCriteriosCualPretTitle}}</h5>
                        <v-alert :type="alertCriteriosCualPreType">{{alertCriteriosCualPreMsg}}</v-alert>
                    </v-col>
                    
                </v-row>
            </v-col>

            <v-col cols="12">
                <h5>2.- Entre criterios según la forma de evaluarlos:</h5>
                <v-row>
                    <v-col cols="12" md="3">
                        <h5 class="subtitle">Dependen de un juicio de valor (POT)</h5>
                        <v-text-field filled label="%" v-model="datos.pot"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="3">
                        <h5 class="subtitle">Evaluables mediante fórmulas (POF)</h5>
                        <v-text-field filled label="%" v-model="datos.pof"></v-text-field>
                    </v-col>
                    <!-- ALERTA -->
                    <v-col cols="12" md="6" v-if="alertCriteriosForma == true">
                        <h5 class="subtitle">{{alertCriteriosFormaTitle}}</h5>
                        <v-alert :type="alertCriteriosFormaType">{{alertCriteriosCualPreMsg}}</v-alert>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <br/><br/>

        <!-- 12 PUNTUACION -->
        <h3>12.- Puntuación de los criterios cualitativos que dependen de un juicio de valor</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">Puntuación máxima obtenible</h5>
                <v-text-field filled label="puntos" disabled v-model="datos.pot"></v-text-field>
                <v-btn width="100%" color="info" class="addBtn" @click="addCriterioValor">+ AÑADIR CRITERIO</v-btn>
            </v-col>
            <v-col cols="12" md="9">
                <h5 class="subtitle">Criterios y puntuación</h5>
                <v-data-table
                    class="dataTable"
                    :headers="puntuacionValorHeader"
                    :items="datos.criteriosPuntuacionValor"
                    hide-default-footer
                >
                    <!--EDITAR CRITERIOS-->
                    <template v-slot:[`item.criterios`]="props">
                        <v-edit-dialog :return-value.sync="props.item.criterios">
                        <div class="editField">{{props.item.criterios}}</div>
                        <template v-slot:input>
                            <v-text-field
                            v-model="props.item.criterios"
                            label="Editar criterio"
                            single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>

                    <!--EDITAR EXTENSION-->
                    <template v-slot:[`item.extension`]="props">
                        <v-edit-dialog :return-value.sync="props.item.extension">
                        <div class="editField">{{props.item.extension}}</div>
                        <template v-slot:input>
                            <v-text-field
                            v-model="props.item.extension"
                            label="Editar extensión"
                            single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>

                    <!--EDITAR PUNTUACION-->
                    <template v-slot:[`item.puntuacion`]="props">
                        <v-edit-dialog :return-value.sync="props.item.puntuacion">
                        <div class="editField">{{props.item.puntuacion}}</div>
                        <template v-slot:input>
                            <v-text-field
                            v-model="props.item.puntuacion"
                            label="Editar puntuacion"
                            single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>

                    <!-- BORRAR CRITERIO -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn small
                            :disabled="noDeleteValor === true"
                            icon
                            @click="deleteCriterioValor(item)"
                        >
                        <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                </v-data-table>
                <br/>
                <v-alert type="error" v-if="alertPuntuacionValor === true">
                    La suma de los criterios debe ser igual a la puntuación máxima obtenible.
                </v-alert>
                <v-alert type="success" v-if="alertPuntuacionValor === false">
                    Datos correctos
                </v-alert>
            </v-col>
        </v-row>
        <br/><br/>

        <!-- 13 UMBRAL MINIMO EN LOS CRITERIOS CUALITATIVOS QUE DEPENDEN DE UN JUICIO DE VALOR-->
        <h3>13.- Umbral mínimo en los criterios cualitativos que dependen de un jucio de valor</h3>
        <v-row class="rowGroup">
            <v-col cols="12">
                <v-radio-group v-model="datos.umbralJuicioValor">
                    <v-radio label="Se establece umbral mínimo del 50% de la puntuación en el conjunto de los criterios cualitativos [artículo 146.3 LCSP]. Los criterios cualitativos que se tendrán en cuenta son los que depende de un juicio de valor (archivo electrónico o sobre nº2)" :value="true"></v-radio>
                    <v-radio label="No se establece umbral mínimo" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/><br/>


        <!-- 14 PUNTUACION DE LOS CRITERIOS EVALUABLES MEDIANTE FÓRMULAS-->
        <h3>14.- Puntuación de los criterios evaluables mediante fórmulas</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <h5 class="subtitle">Puntuación máxima obtenible</h5>
                <v-text-field filled label="puntos" disabled v-model="datos.pof"></v-text-field>
                <v-btn width="100%" color="info" class="addBtn" @click="addCriterioFormula">+ AÑADIR CRITERIO</v-btn>
            </v-col>
            <v-col cols="12" md="9">
                <h5 class="subtitle">Criterios y puntuación</h5>
                <v-data-table
                    class="dataTable"
                    :headers="puntuacionFormulaHeader"
                    :items="datos.criteriosPuntuacionFormula"
                    hide-default-footer
                >
                    <!--EDITAR CRITERIOS-->
                    <template v-slot:[`item.criterios`]="props">
                        <v-edit-dialog :return-value.sync="props.item.criterios">
                        <div class="editField">{{props.item.criterios}}</div>
                        <template v-slot:input>
                            <v-text-field
                            v-model="props.item.criterios"
                            label="Editar criterio"
                            single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>

                    <!--EDITAR EXTENSION-->
                    <template v-slot:[`item.extension`]="props">
                        <v-edit-dialog :return-value.sync="props.item.extension">
                        <div class="editField">{{props.item.extension}}</div>
                        <template v-slot:input>
                            <v-text-field
                            v-model="props.item.extension"
                            label="Editar extensión"
                            single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>

                    <!--EDITAR PUNTUACION-->
                    <template v-slot:[`item.puntuacion`]="props">
                        <v-edit-dialog :return-value.sync="props.item.puntuacion">
                        <div class="editField">{{props.item.puntuacion}}</div>
                        <template v-slot:input>
                            <v-text-field
                            v-model="props.item.puntuacion"
                            label="Editar puntuacion"
                            single-line
                            ></v-text-field>
                        </template>
                        </v-edit-dialog>
                    </template>

                    <!-- BORRAR CRITERIO -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn small
                            :disabled="noDeleteFormula === true"
                            icon
                            @click="deleteCriterioFormula(item)"
                        >
                        <v-icon color="red">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                
                </v-data-table>
                <br/>
                <v-alert type="error" v-if="alertPuntuacionFormulas === true">
                    La suma de los criterios debe ser igual a la puntuación máxima obtenible. {{datos.pof}}
                </v-alert>
                <v-alert type="success" v-if="alertPuntuacionFormulas === false">
                    Datos correctos
                </v-alert>
            </v-col>
        </v-row>
        <br/><br/>

        <!-- OFERTAS CON VALORES ANORMALES -->
        <h3>15.- Ofertas con valores anormales</h3>
        <br/>
        <h5 class="subtitle">Para la determinación de las ofertas con valores anormales se aplicará el criterio siguiente:</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="7">
                <h5 class="subtitle">Criterio:</h5>
                <v-radio-group v-model="datos.criterio">
                    <v-radio label="El establecido en el articulo 85 del RCAP" :value="true"></v-radio>
                    <v-radio label="El de la clausula 27 de este pliego con el siguiente umbral de temeridad:" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
            
            <!--ARTICULO 85-->
            <v-col cols="12" md="4" v-if="datos.criterio === true">
                <h5 class="subtitle">¿Se reduciran 1/3 los porcentajes establecidos?</h5>
                <v-radio-group v-model="datos.reduccion">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>

            <v-col cols="12" v-if="datos.criterio === true && datos.reduccion === true">
                <h5 class="subtitle">En caso afirmativo, justificar:</h5>
                <v-textarea auto-grow filled label="Justificación" v-model="datos.justificacionReduccion"></v-textarea>
            </v-col>

            <!--UMBRAL TEMERIDAD-->
            <v-col cols="12" md="4" v-if="datos.criterio === false">
                <h5 class="subtitle">Definir umbral temeridad</h5>
                <br/>
                <v-text-field filled label="%" v-model="datos.umbralTemeridad"></v-text-field>
            </v-col>
        </v-row>
        <br/>

        <h5 class="subtitle">Seguimiento pormenorizado de ofertas incursas en presunción de anormalidad (artículo 149.7 LCSP)</h5>
        <v-row class="rowGroup">
            <v-col cols="12" md="3">
                <v-radio-group v-model="datos.segPorm">
                    <v-radio label="Si" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" v-if="datos.segPorm === false">
                <v-textarea filled auto-grow label="En caso negativo, justificación:" v-model="datos.segPormJustif"></v-textarea>
            </v-col>
        </v-row>
        <br/>

        <h3>16.- Plazo para la adjudicación</h3>
        <v-row class="rowGroup">
            <v-col cols="12" md="4">
                <h5 class="subtitle">Se adjudicará el contrato dentro del plazo</h5>
                <v-radio-group v-model="datos.plazoAdjudicacion">
                    <v-radio label="General de dos (2) meses." :value="true"></v-radio>
                    <v-radio label="Otro" :value="false"></v-radio>
                </v-radio-group>
            </v-col>
            <v-col cols="12" md="4" v-if="datos.plazoAdjudicacion === false">
                <h5 class="subtitle">Especificar plazo</h5>
                <br/>
                <v-text-field filled label="Plazo" v-model="datos.otroPlazoAdjudicacion"></v-text-field>
            </v-col>
        </v-row>

    </div>
</template>

<script> 
    export default {
        nombre: 'Garantias',
        props:['presBase', 'datosGuardados'],
        data(){
            return {
                rules: {
                    importeMax: (value) => this.maxExigido(value) || "El importe máximo exigido no puede ser superior al 3% del presupuesto base de licitación (IVA excluido)",
                },

                alertCriteriosCualPretTitle: 'ATENCIÓN',
                alertCriteriosFormaTitle: 'ATENCIÓN',
                alertCriteriosCualPre: false,
                alertCriteriosCualPreMsg: undefined,
                alertCriteriosCualPreType: undefined,
                alertCriteriosForma: undefined,
                alertCriteriosFormaMsg: undefined,
                alertCriteriosFormaType: undefined,
                noDeleteValor: false,
                noDeleteFormula: false,

                puntuacionValorHeader: [
                { text: "", align: "start", sortable: false, value: "id" },
                { text: "Nombre Criterio", align: "start", sortable: false, value: "criterios" },
                { text: "Extension (nº páginas)", align: "start", sortable: false, value: "extension" },
                { text: "Puntuación máxima", align: "start", sortable: false, value: "puntuacion"},
                { text: "Borrar", align: "start", sortable: false, value: "actions"}
                ],
                alertPuntuacionValor: undefined,
                alertPuntuacionFormulas: undefined,

                puntuacionFormulaHeader: [
                { text: "", align: "start", sortable: false, value: "id" },
                { text: "Nombre Criterio", align: "start", sortable: false, value: "criterios" },
                { text: "Extension (nº páginas)", align: "start", sortable: false, value: "extension" },
                { text: "Puntuación máxima", align: "start", sortable: false, value: "puntuacion"},
                { text: "Borrar", align: "start", sortable: false, value: "actions"}
                ],


                datos:{
                    componente:'Garantias',
                    provisional: '',
                    provisionalJustificar: undefined,
                    importeExigidoProvisional: undefined,
                    defintiva: '',
                    definitivaJustificacion: undefined,
                    importeExigidoDefinitiva: undefined,
                    importeExigidoComplementaria: undefined,
                    complementaria: '',
                    complementariaJustificar: '',
                    critCualitativos: undefined,
                    critRelPrecio: undefined,
                    pot: undefined,
                    pof: undefined,
                    criteriosPuntuacionValor: [
                        { id: 1, criterios: '', extension: '', puntuacion: undefined },
                    ],
                    umbralJuicioValor: false,
                    criteriosPuntuacionFormula: [
                        { id: 1, criterios: '', extension: '', puntuacion: undefined },
                    ],
                    criterio: true,
                    reduccion: 'no',
                    justificacionReduccion: '',
                    umbralTemeridad: '',
                    segPorm: false,
                    segPormJustif: '',
                    plazoAdjudicacion: true,
                    otroPlazoAdjudicacion: undefined,
                }
            }
        },
        
        watch:{
            datos: {
                deep: true,
                handler: function (datos){
                    //VALIDACIONES PUNTO 11.1
                    if(this.datos.critCualitativos !== undefined && this.datos.critRelPrecio !== undefined){
                        this.suma = parseFloat(this.datos.critCualitativos) + parseFloat(this.datos.critRelPrecio)
                        if (this.suma !== 100){
                            this.alertCriteriosCualPre = true;
                            this.alertCriteriosCualPreType = 'error'
                            this.alertCriteriosCualPreMsg = 'La suma de los porcentajes debe ser igual a 100%'
                        }                         
                        else {
                            this.alertCriteriosCualPretTitle = 'INFO'
                            this.alertCriteriosCualPre = true;
                            this.alertCriteriosCualPreType = 'success';
                            this.alertCriteriosCualPreMsg = 'Datos correctos'
                        }
                    }

                    //VALIDACIONES PUNTO 11.2
                    if(this.datos.pot !== undefined && this.datos.pof !== undefined){
                        if(parseFloat(this.datos.pot) > 50){
                            this.alertCriteriosForma = true;
                            this.alertCriteriosFormaType = 'error'
                            this.alertCriteriosCualPreMsg = 'Los criterios que dependen de un juicio de valor (POT) deben ser menores del 50%'
                        } 
                        else if (parseFloat(this.datos.pof) < 50){
                            this.alertCriteriosForma = true;
                            this.alertCriteriosFormaType = 'error'
                            this.alertCriteriosCualPreMsg = 'Los criterios que evaluables mediante fórmulas (POF) deben ser mayores del 50%'
                        }
                        else if (parseFloat(this.datos.pot) + parseFloat(this.datos.pof) !== 100){
                            this.alertCriteriosForma = true;
                            this.alertCriteriosFormaType = 'error'
                            this.alertCriteriosCualPreMsg = 'La suma de los porcentajes debe ser igual a 100%'
                        }
                        
                        else {
                            this.alertCriteriosForma = true;
                            this.alertCriteriosFormaTitle = 'INFO'
                            this.alertCriteriosFormaType = 'success'
                            this.alertCriteriosCualPreMsg = 'Datos correctos'
                        }
                    }
                    
                    //VALIDACIONES TABLAS PUNTUACION VALOR
                    if(datos.criteriosPuntuacionValor[0].puntuacion !== undefined){
                        this.suma = 0;
                        for(this.index in datos.criteriosPuntuacionValor){
                            this.suma = this.suma + parseInt(datos.criteriosPuntuacionValor[this.index].puntuacion)
                        }
                        if(this.suma !== parseInt(datos.pot)){
                            this.alertPuntuacionValor = true
                        } else {
                            this.alertPuntuacionValor = false
                        }
                    }

                    //VALIDACIONES TABLAS PUNTUACION FORMULAS
                    if(datos.criteriosPuntuacionFormula[0].puntuacion !== undefined){
                        this.suma = 0;
                        for(this.index in datos.criteriosPuntuacionFormula){
                            this.suma = this.suma + parseInt(datos.criteriosPuntuacionFormula[this.index].puntuacion)
                        }
                        if(this.suma !== parseInt(datos.pof)){
                            this.alertPuntuacionFormulas = true
                        } else {
                            this.alertPuntuacionFormulas = false
                        }
                    }
                }               
            }
        },

        beforeDestroy(){
            this.$emit('datos', this.datos)
        },

        created(){
            this.initialize();
        },


        methods:{
            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }
            },

            addCriterioValor(){
                this.noDeleteValor = false;
                this.lastId = (this.datos.criteriosPuntuacionValor.length) + 1; 
                this.datos.criteriosPuntuacionValor.push(
                    { id: this.lastId, criterios: '', extension: '', puntuacion: undefined },
                )   
            },
            
            addCriterioFormula(){
                this.noDeleteFormula = false;
                this.lastId = (this.datos.criteriosPuntuacionFormula.length) + 1; 
                this.datos.criteriosPuntuacionFormula.push(
                    { id: this.lastId, criterios: '', extension: '', puntuacion: undefined },
                )     
            },

            deleteCriterioValor(criterio){
                if(this.datos.criteriosPuntuacionValor.length > 1){
                    this.datos.criteriosPuntuacionValor.splice(criterio.id-1, 1);
                    for(this.index in this.datos.criteriosPuntuacionValor){
                        this.datos.criteriosPuntuacionValor[this.index].id = parseInt(this.index) + 1;
                    }
                } else {
                    this.noDeleteValor = true;
                }
                
            },

            deleteCriterioFormula(criterio){
                if(this.datos.criteriosPuntuacionFormula.length > 1){
                    this.datos.criteriosPuntuacionFormula.splice(criterio.id-1, 1);
                    for(this.index in this.datos.criteriosPuntuacionFormula){
                        this.datos.criteriosPuntuacionFormula[this.index].id = parseInt(this.index) + 1;
                    }
                } else {
                    this.noDeleteFormula = true;
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

    .editField {
        color: blue;
        display: block;
        min-width: 10rem;
        min-height: 2rem;
        border-radius: 4px;
        padding: 0.35rem;
        background-color: white;
        text-decoration: underline;
    }

    .addBtn {
        margin-bottom: 1rem;
    }

</style>