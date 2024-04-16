<template>
    <div>
        <!-- ALERTA PRESUPUESTO NO DETECTADO -->
        <v-alert v-if="!presBase" type="error">
            No se han detectado datos en la sección "Presupuesto, lotes y anualidades". Por favor, introduzca en primer
            lugar los datos económicos en esa sección. 
        </v-alert>

        <!-- INCOMPATIBILIDADES PARA LA LICITACIÓN -->
        <div class="group" v-if="presBase">
            <h3>Incompatibilidades para la licitación
                <v-badge 
                class="badge" color="#c7d6f2" content="?"
                title="Punto 8.1 (Incompatibilidades para la licitación)">
                </v-badge >
            </h3>
            <v-row class="rowGroup">
                <v-col cols="12">
                    <h5 class="subtitle">
                    Participación en la licitación de las empresas que hubieran participado previamente en la 
                    elaboración de las especificaciones técnicas o de los documentos preparatorios del contrato
                    o hubieran asesorado al órgano de contratación durante la preparación del procedimiento de 
                    contratación 
                        <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a7-2" target="blank" title="Ver artículo 70 LCSP">[artículo 70.1 LCSP]
                        </a>
                    </h5>
                </v-col>
                <v-col cols="12" md="5">
                    <h5>Consideración:</h5>
                    <v-radio-group v-model="datos.participacionEmpresas">
                        <v-radio @click="()=>datos.empresasExcluidas = undefined" label="No tiene consideración el contrato que se licita" :value="true"></v-radio>
                        <v-radio label="Si tiene esa consideración, las siguientes empresas han participado" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12" md="7" v-if="datos.participacionEmpresas === false">
                    <h5>Empresas que deben ser excluidas de dicha licitación:</h5>
                    <v-textarea style="margin-bottom:-2rem;"
                    dense filled auto-grow v-model="datos.empresasExcluidas"></v-textarea>
                </v-col>
            </v-row>
        </div>
        
        <!-- CAPACIDAD Y SOLVENCIA -->
        <div class="group" v-if="presBase">
            <h3>Capacidad y solvencia</h3>
            <v-row class="rowGroup">
                <!-- REQUISITOS DE SOLVENCIA -->     
                <v-col cols="12">
                    <h4 class="subtitle">Requisitos de solvencia
                        <v-badge 
                        class="badge" color="#c7d6f2" content="?"
                        title="Punto 9.1 (Requisitos de solvencia)"></v-badge >
                    </h4>
                    <h5>Se acreditará mediante los documentos acreditativos de 
                    los requisitos especificados a continuación: 
                    <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a8-9" target="blank" title="Ver artículo 87 LCSP">[artículo 87.3 LCSP]</a>
                    , <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a8-11" target="blank" title="Ver artículo 89 LCSP">[artículo 89 LCSP]</a>
                    </h5>
                    <v-radio-group v-model="datos.requisitos">
                        <v-radio @click="()=>datos.solvenciaEconFinanc = undefined" label="Los exigidos supletoriamente, a falta de especificación, en los artículos 87.3 y 89 de la LCSP" :value="true"></v-radio>
                        <v-radio @click="()=>datos.solvenciaEconFinanc = undefined" label="Los que se especifican a continuación (de entre los criterios de solvencia económica y financiera -artículo 87- y técnica -artículo 89- de la LCSP)" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- SOLVENCIA ECONOMICA FINANCIERA-->
                <v-row class="subRow">
                    <v-col cols="12" md="6" v-if="datos.requisitos === false">
                        <h5>Solvencia económica y financiera 
                            <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a8-9" target="blank" title="Ver artículo 87 LCSP">[art. 87 LCSP]
                            </a>
                        </h5>
                        <v-radio-group v-model="datos.solvenciaEconFinanc">
                            <v-radio @click="resetSolvenciaEconFinanc" label="El volumen anual de negocios, que referido al mejor ejercicio de los tres (3) últimos concluidos deberá ser:" value="volumen"></v-radio>
                            <v-radio @click="resetSolvenciaEconFinanc" label="El patrimonio neto al cierre del último ejercicio económico para el que esté vencida la obligación de aprobación de las cuentas anuales no será inferior a:" value="patrimonio"></v-radio>
                            <v-radio @click="resetSolvenciaEconFinanc" label="La ratio entre activos y pasivos al cierre del último ejercicio económico para el que esté vencida la obligación de aprobación de las cuentas anuales no inferior a:" value="ratio"></v-radio>
                            <v-radio @click="resetSolvenciaEconFinanc" label="El licitador es un profesional (no una empresa)" value="profesional"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <!-- CASO VOLUMEN ANUAL NEGOCIOS -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'volumen'">
                        <div v-if="!checkVan()">
                            <h5>Especificar importe exigido volumen anual de negocios:</h5>
                            <br/>
                            <!-- HAY LOTES -->
                            <div v-if="this.presBase.lotes.length > 1">
                                <v-data-table
                                dense class="dataTable"
                                hide-default-footer
                                :items="presBase.lotes"
                                :headers="[
                                {width:'39%', text:'Lote', align:'start', value:'descripcion'},
                                {width:'21%', text:'Valor estimado', align:'end', value:'valorEstimadoLote'},
                                {width:'20%', text:'Importe Exigido', align:'end', value:'vanRequerido'},
                                {width:'20%', text:'Máximo exigible', align:'end', value:'vanMaxExigible'},
                                ]">
                                    <!-- PRESUPUESTO BASE -->
                                    <template v-slot:[`item.valorEstimadoLote`]="props">
                                        {{currencyFormat(props.item.valorEstimadoLote)}}
                                    </template>
                                    <!-- EXIGIDO -->
                                    <template v-slot:[`item.vanRequerido`]="props">
                                        <v-edit-dialog  
                                        persistent large
                                        save-text="GUARDAR"
                                        cancel-text="CANCELAR"
                                        >
                                        <!-- MOSTRAR DATOS -->
                                        <span class="editField">{{currencyFormat(props.item.vanRequerido)}}
                                        </span>
                                        <!-- INTRODUCIR DATOS -->
                                        <template v-slot:input>
                                            <v-text-field
                                            v-model="props.item.vanRequerido"
                                            label="Volumen anual de negocios requerido"
                                            type="number"
                                            single-line
                                            persistent-hint
                                            ></v-text-field>
                                        </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- MAXIMO EXIGIBLE -->
                                    <template v-slot:[`item.vanMaxExigible`]="props">
                                        <b
                                        :title="props.item.info"
                                        >{{currencyFormat(calculateVANMaxReq(props.item))}}</b>
                                    </template>

                                </v-data-table>
                                <br/>
                                <!-- ALERTAS -->
                                <v-alert dense text v-if="vanRules()" type="error">
                                    Hay valores exigidos que superan el máximo exigible o bien son igual a cero. Por favor, compruebe los datos.
                                </v-alert>
                            </div>
                            <!-- NO HAY LOTES -->
                            <div v-else>
                                <v-data-table
                                dense class="dataTable"
                                hide-default-footer
                                :items="[presBase.lotes[0]]"
                                :headers="[
                                {width:'34%', text:'Valor estimado', align:'end', value:'valorEstimadoLote'},
                                {width:'33%', text:'Importe Exigido', align:'end', value:'vanRequerido'},
                                {width:'33%', text:'Máximo exigible', align:'end', value:'vanMaxExigible'},
                                ]">
                                    <!-- PRESUPUESTO BASE -->
                                    <template v-slot:[`item.valorEstimadoLote`]="props">
                                        {{currencyFormat(props.item.valorEstimadoLote)}}
                                    </template>
                                    <!-- EXIGIDO -->
                                    <template v-slot:[`item.vanRequerido`]="props">
                                        <v-edit-dialog  
                                        persistent large
                                        save-text="GUARDAR"
                                        cancel-text="CANCELAR"
                                        >
                                        <!-- MOSTRAR DATOS -->
                                        <span class="editField">{{currencyFormat(props.item.vanRequerido)}}
                                        </span>
                                        <!-- INTRODUCIR DATOS -->
                                        <template v-slot:input>
                                            <v-text-field
                                            v-model="props.item.vanRequerido"
                                            label="Volumen anual de negocios requerido"
                                            type="number"
                                            single-line
                                            persistent-hint
                                            ></v-text-field>
                                        </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- MAXIMO EXIGIBLE -->
                                    <template v-slot:[`item.vanMaxExigible`]="props">
                                        <b>{{currencyFormat(calculateVANMaxReq(props.item))}}</b>
                                    </template>                              
                                </v-data-table>
                                <br/>
                                <!-- ALERTAS -->
                                <v-alert type="error" dense v-if="vanRules()" style="padding:0.5rem;">
                                    El importe exigido es igual a cero o superior al máximo exigible. Por favor, revise los datos
                                </v-alert>
                            </div>
                            <br/>
                        </div>
                        <div v-else>
                            <h5><b>¡ANTENCIÓN!</b></h5><br/>
                            <v-alert type="info" dense>
                                {{alertVan}}
                            </v-alert>
                        </div>
                    </v-col>

                    <!-- CASO PATRIMONIO NETO AL CIERRE -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'patrimonio'">
                    <h5>Especificar patrimonio neto (en Euros)</h5>
                    <br/>
                    <v-text-field dense filled v-model="datos.patrimonioNeto" 
                    append-icon="mdi-euro"
                    type="number"></v-text-field>
                    </v-col>

                    <!-- CASO RATIO ACTIVOS / PASIVOS -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'ratio'">
                    <h5>Especificar ratio activos / pasivos</h5>
                    <br/>
                    <v-text-field dense filled v-model="datos.ratioActivos"  
                    append-icon="mdi-euro"
                    type="number"></v-text-field>
                    </v-col>

                    <!-- CASO PROFESIONAL (NO EMPRESA) -->
                    <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaEconFinanc === 'profesional'">
                    <h5>En el caso de que el licitador sea un profesional (y no una empresa)</h5>
                    <br/>
                    <v-alert text border="top" type="info" elevation="2">
                        Se aportará justificante de la existencia de un seguro de indemnización por riesgos 
                        profesionales por importe igual o superior al valor estimado del contrato, 
                        vigente hasta el fin del plazo de presentación de ofertas, asi como el compromiso 
                        vinculante de suscripción, prórroga o renovación, en caso  de resultar adjudicatario, 
                        para garantizar la cobertura durante toda la ejecución del contrato.
                    </v-alert>
                    <br/><br/>
                    </v-col>
                </v-row>
            
                <!-- SOLVENCIA TÉCNICA O PROFESIONAL-->
                <v-row class="subRow" v-if="datos.requisitos === false">
                    <v-col cols="12" md="6">
                        <h5>Solvencia técnica o profesional 
                            <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a8-11" target="blank" title="Ver artículo 89 LCSP">[art. 89 LCSP]
                            </a>
                        </h5>
                        <v-radio-group v-model="datos.solvenciaTecProfe">
                            <v-radio label="Relación de los principales suministros realizados en los últimos 3 años" :value="true"></v-radio>
                            <v-radio label="Otros de los previstos en el artículo 89" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>
                
                    <!-- VALOR MÁXIMO DE REFERENCIA -->
                    <v-col cols="12" md="6" v-if="datos.solvenciaTecProfe === true">
                        <h5>Valor máximo de referencia</h5>
                        <br/>
                        <div v-if="presBase.lotes.length >= 1"> 
                            <v-data-table
                            dense class="dataTable"
                            hide-default-footer
                            :items="presBase.lotes"
                            :headers="[
                                {text:'Lote', align:'start', value:'descripcion'},
                                {text:'Anualidad media', align:'center', value:'anualidadMedia'},
                                {text:'Valor máximo de referencia', align:'center', value:'valMaxRef'}
                            ]">
                                <!-- ANUALIDAD MEDIA -->
                                <template v-slot:[`item.anualidadMedia`]="props">
                                    {{currencyFormat(calculateAverageAnnuity(props.item))}}
                                </template>
                                <!-- VALOR MAXIMO DE REFERENCIA -->
                                <template v-slot:[`item.valMaxRef`]="props">
                                <v-edit-dialog
                                    large persistent
                                    cancel-text="Cancelar"
                                    save-text="Guardar">                
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField"> {{currencyFormat(calculateMaxRefValue(props))}}</span>
                                    <!-- EDITAR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.valorMaximoReferencia"
                                        single-line
                                        ></v-text-field>
                                    </template>
                                    </v-edit-dialog>
                                </template>
                            </v-data-table>
                        </div>
                    </v-col>
                </v-row>

                <!-- ALERTA NO ARMONIZADA -->
                <v-col cols="12" 
                v-if="datos.requisitos === false && 
                datos.solvenciaTecProfe === true && 
                this.objetoNecesidades.regArmonizada === false">
                    <v-row>
                        <v-col cols="12">
                            <v-alert text border="left" type="warning" elevation="2">
                                <div style="color:gray; font-size:90%; line-height:1rem;">
                                    <h3 style="font-weight:600; margin-bottom:1rem;">ATENCIÓN:</h3>
                                    <p>El contrato se está realizando bajo regulación <b>NO ARMONIZADA</b>.</p>
                                    <p>En los contratos no sujetos a regularización armonizada, si el 
                                        contratista es una empresa de nueva creación no será necesario acreditar este 
                                        apartado 
                                        <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a8-11" target="blank" title="Ver Artículo 89 LCSP">
                                        [artículo 89.14 h] 
                                        de la LCSP</a>
                                    </p>
                                    <p><i>
                                        Para el <b>cumplimiento</b> de este apartado se tendrá en cuenta lo siguiente:
                                    </i></p>
                                    <ol>
                                        <li>El importe de los contratos se calculará con <b>exclusión del IVA</b></li>
                                        <li>Cuando la empresa licitadora hubiera ejecutado el contrato a través de una unión
                                            temporal de empresas <b>(UTE)</b>, se computará el importe de aquél en <b>proporción a la
                                            participación</b> de dicha empresa en la citada UTE.</li>
                                        <li>Cuando las empresas liciten <b>agrupadas en UTE</b> se considerarán <b>indistintamente</b>
                                            los contratos de cualquiera de las empresas constituyentes de la UTE para alcanzar
                                            los porcentajes de valor estimado fijados.</li>
                                    </ol>
                                </div>
                            </v-alert>   
                        </v-col>
                    </v-row>
                </v-col>
                
                <!-- OTROS -->
                <v-col cols="12" md="6" v-if="datos.requisitos === false && datos.solvenciaTecProfe === 'otros'">
                    <h5 class="subtitle">En caso de que sean otros, especificar:</h5>
                    <v-textarea filled auto-grow v-model="datos.otrosReqSolvTecProfe"></v-textarea>
                </v-col>
                
                <!-- INTEGRACIÓN DE LA SOLVENCIA -->
                <v-col cols="12">
                    <h4 class="subtitle">Integración de la solvencia
                        <v-badge 
                        class="badge" color="#c7d6f2" content="?"
                        title=""></v-badge >
                    </h4>
                    <h5>Si el licitador se basa en la solvencia y medios de otras entidades
                        para acreditar su solvencia, se establece la responsabilidad
                        solidaria de todos ellos [artículo 75 LCSP]</h5>
                    <v-radio-group v-model="datos.integracionSolvencia">
                        <v-radio label="Si" :value="true"></v-radio>
                        <v-radio label="No" :value="false"></v-radio>
                    </v-radio-group>
                </v-col>

                <!-- CONCRECION DE LAS CONDICIONES DE SOLVENCIA -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12">
                            <h4 class="subtitle">Concreción de las condiciones de solvencia</h4>
                            <h5 class="subtitle">1.- Obligación de adscribir medios personales o materiales</h5>
                            <v-radio-group v-model="datos.obligacionMediosMateriales">
                                <v-radio label="Si se exige, mediante compromiso en la declaración responsable complementaria al DEUC" :value="true"></v-radio>
                                <v-radio label="No se exige" :value="false"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" md="6">
                            <h5 class="subtitle">2.- Obligación de especificar nombres o cualificación profesional
                                del personal responsable de ejecutar la prestación
                            </h5>
                            <v-radio-group v-model="datos.obligacionNombresCualificacion">
                                <v-radio label="Si se exige, en la siguiente forma:" :value="true"></v-radio>
                                <v-radio label="No se exige" :value="false" @click="()=>datos.especificarObligacion = undefined"></v-radio>  
                            </v-radio-group>
                        </v-col>
                        
                        <!-- SI SE EXIGE ESPECIFICAR -->
                        <v-col cols="12" md="6" v-if="datos.obligacionNombresCualificacion === true">
                            <h5 class="subtitle">Si se exige, especificar</h5>
                            <br/>
                            <v-textarea style="margin-bottom:-2rem;" dense auto-grow v-model="datos.especificarObligacion" filled></v-textarea>
                        </v-col>
                        <v-col cols="6" v-else><!-- evita salto de linea --></v-col>                        
                    </v-row>
                </v-col>
                
                <!-- HABILITACIÓN EMPRESARIAL EXIGIBLE -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="12" md="6">
                            <h5 class="subtitle">Habilitación empresaria exigible</h5>
                            <v-radio-group v-model="datos.habilitacionExigible">
                                <v-radio label="La siguiente habilitación:" :value="true"></v-radio>
                                <v-radio label="Ninguna en especial" :value="false" @click="datos.especificarHabilitacion = undefined"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col cols="12" md="6" v-if="datos.habilitacionExigible === true">
                            <h5 class="subtitle">Especificar</h5>
                            <v-textarea dense auto-grow style="margin-bottom:-2rem;" v-model="datos.especificarHabilitacion" filled></v-textarea>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    import {currencyFormat} from "@/assets/mixins/currencyFormat";

    export default {
        name: 'IncompatibCapacSolvencia',
        data(){
            return {
                plazoContrato: 0,
                alertVan: undefined,
                datos: {
                    componente: 'CapacidadSolvencia',

                    //INCOMPATIBILIDADES PARA LA LICITACION
                    participacionEmpresas: true,
                    empresasExcluidas: undefined,

                    //CAPACIDAD Y SOLVENCIA
                    requisitos: true,
                    patrimonioNeto: undefined,
                    solvenciaEconFinanc: undefined,
                    ratioActivos: undefined,
                    solvenciaTecProfe: undefined,
                    modoValorMaximo: false,
                    otrosReqSolvTecProfe: undefined,
                    integracionSolvencia: false,
                    obligacionMediosMateriales: false,
                    obligacionNombresCualificacion: false,
                    especificarObligacion: '',
                    habilitacionExigible: false,
                    especificarHabilitación: '',
                }
            }
        },
        mixins: [currencyFormat],
        props:['presBase', 'objetoNecesidades', 'datosGuardados'],

        beforeDestroy(){
            this.datos.lotes = this.presBase.lotes;
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

                this.presBase.lotes.forEach((lote)=>{
                    if(lote.valMaxRef === undefined){
                        lote.valMaxRef = 0;
                    }
                })
            },

            calculateVANMaxReq(loteData){
                loteData.vanMaxExigible = loteData.valorEstimadoLote * 1.5;
                return loteData.vanMaxExigible
            },

            checkTerms(data){
                let alert = false;
                if (data.plazoMaximoEjecucion.plazoMaxExec == 0 &&
                    data.plazosParciales[0].ppDuracion == 0 &&
                    data.plazoMeses == 0) {
                        alert = true
                    }
                return alert
            },

            checkVan(){
                let alert = false;
                if(this.presBase.lotes.length !== 0){
                    this.presBase.lotes.forEach((lote)=>{
                        //INSERTAMOS PLAZO MESES GENERAL (NO VA POR LOTE)
                        lote.plazoMeses = this.presBase.plazoMeses;
                        //SE HAN DEFINIDO PLAZOS DE EJECUCION?
                        if(this.checkTerms(lote)){
                            alert = true
                            this.alertVan = 'No se han definido plazos de ejecución'
                        }
                    })
                } else {
                    alert = true;
                    this.alertVan = 'Debe definir en primer lugar el presupuesto base de licitación.'
                }
                return alert;
            },

            vanRules(){
                let alert = false;
                this.presBase.lotes.forEach((lote)=>{
                    if(lote.vanRequerido > lote.vanMaxExigible || lote.vanRequerido == 0){
                        alert = true;
                    }
                })
                return alert
            },

            resetSolvenciaEconFinanc(){
                //RESETEAR VOLUMEN ANUAL NEGOCIO
                this.presBase.lotes.forEach((lote)=>{
                    lote.vanRequerido = 0
                })
                //RESETEAR PATRIMONIO NETO
                this.datos.patrimonioNeto = undefined;
                //RESETEAR RATIO ACTIVOS / PASIVOS
                this.datos.ratioActivos = undefined;
            },

            calculateMonths(plazo, tipo){
                switch(tipo){
                    case "Meses":
                        return parseInt(plazo)
                    case "Días":
                        return (parseInt(plazo)/30)
                    case "Años":
                        return (parseInt(plazo)*12)
                }
            },

            calculateAverageAnnuity(lote){
                if(isNaN(lote.anualidadMedia)){
                    let meses = 0;
                    //CALCULAR MESES
                    if(lote.plazoMaximoEjecucion.plazoMaxExec !== 0){
                        meses = this.calculateMonths(lote.plazoMaximoEjecucion.plazoMaxExec, lote.plazoMaximoEjecucion.plazoMaxExecTipo)
                    } else if (lote.plazosParciales[0].ppDuracion !== 0){
                        lote.plazosParciales.forEach((plazo)=>{
                            meses = meses + this.calculateMonths(plazo.ppDuracion, plazo.ppTipo)
                        })
                    } else if(lote.plazoMeses !== 0){
                        meses = this.presBase.plazoMeses;
                    }  else {
                        this.averageAnnuityAlert = true;
                    } 

                    //CALCULO ANUALIDAD MEDIA
                    if(meses >= 12){
                        lote.anualidadMedia = parseFloat((parseFloat(lote.baseLote) / 12).toFixed(2))
                    } else {
                        lote.anualidadMedia = parseFloat(((parseFloat(lote.baseLote) / parseInt(meses)) * 12).toFixed(2))
                    }
                }
                return lote.anualidadMedia        
            },

            calculateMaxRefValue(data){
                //SI NO SE HA DEFINIDO UN VALOR APLICAMOS CALCULO POR DEFECTO (70% del presupuesto base de licitacion)
                if(this.presBase.lotes[data.index].valorMaximoReferencia === undefined){
                    this.presBase.lotes[data.index].valorMaximoReferencia = parseFloat(data.item.anualidadMedia) * 0.70;
                }
                return this.presBase.lotes[data.index].valorMaximoReferencia;
            }
        }


    }
</script>

<style scoped>
    .subtitle {
        color: gray;
        font-weight: 500;
    }

    .rowGroup {
        margin-top: 0.1rem;
        border: 1px solid lightgray;
        border-radius: 4px;
        padding: 1rem 0rem 1rem 0rem;
    }

    .subRow {
        margin:0rem;
    }

    p {
        text-align: justify;
    }
    
    li{
        margin-bottom: 0.5rem;
    }

    .warn {
        border: 1px solid lightgrey;
        background-color: rgb(232, 230, 230);
        padding: 1rem;
        border-radius: 4px;
    }
</style>
