<template>
    <div>
        <div v-if="presBase">
            <!-- GARANTIAS -->
            <div class="group">
                <h3 id="Garantías">
                    Garantías
                </h3>
                <v-row class="rowGroup">
                    <v-col cols="12">
                        <!--PROVISIONAL -->
                        <v-row class="subRow">
                            <v-col cols="12" md="2">
                                <h5 class="subtitle" id="Provisional">
                                    Provisional 
                                    <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-18" target="blank" title="Ver artículo 106 LCSP">
                                    [art. 106.2 LCSP]</a>
                                    <v-badge 
                                    class="badge" color="#c7d6f2" content="?"
                                    title="Punto 10.1 - Provisional [art. 106.2 LCSP]">
                                    </v-badge >
                                </h5>
                                <v-radio-group v-model="datos.provisional">
                                    <v-radio label="Si se exige" :value="true"></v-radio>
                                    <v-radio label="No se exige" :value="false"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <!-- SI SE EXIGE -->
                            <v-col cols="12" md="10" v-if="datos.provisional === true">
                                <h5 class="subtitle">Si es provisional, indicar importe y justificación</h5>
                                <!-- HAY LOTES -->
                                <v-data-table
                                v-if="presBase.lotes.length > 1"
                                :items="presBase.lotes"
                                :headers="[
                                {width:'20%', text:'Lote', align:'start', value:'descLote'},
                                {width:'15%', text:'Presupuesto base', align:'start', value:'baseLote'},
                                {width:'15%', text:'Maximo exigible', align:'start', value:'maxExig'},
                                {width:'15%', text:'Indicar importe exigido', align:'start', value: 'importeExigidoProvisional'},
                                {width:'35%', text:'Justificación', align:'start', value:'provisionalJustif'}
                                ]"
                                class="dataTable" dense hide-default-footer>
                                    <!-- DESCRIPCION LOTE -->
                                    <template v-slot:[`item.descLote`]="props">
                                    {{props.item.descripcion}}
                                    </template>
                                    <!-- PRESUPUESTO BASE -->
                                    <template v-slot:[`item.baseLote`]="props">
                                    {{currencyFormat(props.item.baseLote)}}
                                    </template>
                                    <!-- MAXIMO EXIGIBLE -->
                                    <template v-slot:[`item.maxExig`]="props">
                                    {{currencyFormat(props.item.baseLote*0.3)}}
                                    </template>
                                    <!-- INDICAR IMPORTE -->
                                    <template v-slot:[`item.importeExigidoProvisional`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            @save="checkMaxExigido"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField">{{currencyFormat(props.item.importeExigidoProvisional)}}
                                            </span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.importeExigidoProvisional"
                                                label="Indicar importe"
                                                type="number"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- JUSTIFICACION -->
                                    <template v-slot:[`item.provisionalJustif`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField" v-if="props.item.provisionalJustif !== undefined">{{props.item.provisionalJustif}}</span>
                                            <span class="editField" v-else><v-icon color="info" small>mdi-pencil</v-icon>Introducir justificación</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.provisionalJustif"
                                                label="Justificación"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                </v-data-table>
                                <!-- NO HAY LOTES -->
                                <v-data-table
                                v-else
                                :items="[presBase.lotes[0]]"
                                :headers="[
                                {width:'15%', text:'Presupuesto base', align:'start', value:'baseLote'},
                                {width:'15%', text:'Maximo exigible', align:'start', value:'maxExig'},
                                {width:'15%', text:'Indicar importe exigido', align:'start', value: 'importeExigidoProvisional'},
                                {width:'55%', text:'Justificación', align:'start', value:'provisionalJustif'}
                                ]"
                                class="dataTable" dense hide-default-footer>
                                    <!-- DESCRIPCION LOTE -->
                                    <template v-slot:[`item.descLote`]="props">
                                    {{props.item.descripcion}}
                                    </template>
                                    <!-- PRESUPUESTO BASE -->
                                    <template v-slot:[`item.baseLote`]="props">
                                    {{currencyFormat(props.item.baseLote)}}
                                    </template>
                                    <!-- MAXIMO EXIGIBLE -->
                                    <template v-slot:[`item.maxExig`]="props">
                                    {{currencyFormat(props.item.baseLote*0.3)}}
                                    </template>
                                    <!-- INDICAR IMPORTE -->
                                    <template v-slot:[`item.importeExigidoProvisional`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            @save="checkMaxExigido"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField">{{currencyFormat(props.item.importeExigidoProvisional)}}
                                            </span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.importeExigidoProvisional"
                                                label="Indicar importe"
                                                type="number"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- JUSTIFICACION -->
                                    <template v-slot:[`item.provisionalJustif`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField" v-if="props.item.provisionalJustif !== undefined">{{props.item.provisionalJustif}}</span>
                                            <span class="editField" v-else><v-icon color="info" small>mdi-pencil</v-icon>Introducir justificación</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.provisionalJustif"
                                                label="Justificación"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                </v-data-table>
                                <!-- ALERTAS -->
                                <v-alert v-if="alertMaxExigido === true" dense text type="error" style="margin-top:1rem;">
                                    El importe máximo exigido no puede ser superior al 3% del presupuesto base de licitación ni igual a cero.
                                    Por favor, revise los datos.
                                </v-alert>
                                <v-alert v-else dense text type="success" style="margin-top:1rem;">
                                    ¡Datos correctos!
                                </v-alert>
                            </v-col>
                        </v-row>
                        
                        <!-- COMPLEMENTARIA -->
                        <v-row class="subRow">
                            <!-- SELECTOR -->
                            <v-col cols="12" md="2">
                                <h5 class="subtitle" id="Complementaria">
                                    Complementaria
                                    <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-19" target="blank" title="Ver artículo 107 LCSP">
                                    [art. 107.2 LCSP]</a>
                                    <v-badge 
                                    class="badge" color="#c7d6f2" content="?"
                                    title="Punto 10.3 - Complementaria [art. 107.2 LCSP]">
                                    </v-badge >
                                </h5>

                                <v-radio-group v-model="datos.complementaria">
                                    <v-radio label="Si se exige" :value="true"></v-radio>
                                    <v-radio label="No se exige" :value="false"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <!-- INDICAR MOTIVO -->
                            <v-col cols="12" md="4" v-if="datos.complementaria === true">
                                <h5 class="subtitle">Indicar motivo:</h5>
                                <v-radio-group v-model="datos.complementariaJustificar">
                                    <v-radio label="Por circunstancias especiales" :value="true"></v-radio>
                                    <v-radio label="Si la oferta del adjudicatario hubiera resultado inicialmente incursa en presunción de anormalidad." :value="false"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <!-- POR CIRCUNSTANCIAS ESPECIALES -->
                            <v-col cols="12" md="6" v-if="datos.complementaria === true && datos.complementariaJustificar === true">
                                <h5 class="subtitle">Especificar circunstancias especiales:</h5>
                                <v-textarea filled auto-grow v-model="datos.especificarCircEspec"></v-textarea>
                            </v-col> 
                        </v-row>
                    </v-col>
                </v-row>
            </div>

            <!--CRITERIOS DE ADJUDICACION-->
            <div class="group">
                <h3 id="Criterios de adjudicación">
                    Criterios de adjudicación
                </h3>
                <v-row class="rowGroup">
                    <!-- PREPONDERANCIA DE CRITERIOS -->
                    <v-col cols="12">
                        <h5 id="Preponderancia de criterios">
                            Preponderancia de criterios
                            <v-badge 
                            class="badge" color="#c7d6f2" content="?"
                            title="Punto 11.1 - Preponderancia de criterios">
                            </v-badge >
                        </h5>
                    </v-col>
                    <!--ENTRE CRITERIOS CUALITATIVOS Y RELACIONADOS CON EL PRECIO -->
                    <v-col cols="12" md="6">
                        <!-- HAY LOTES -->
                        <h5 class="subtitle">1.- Entre criterios cualitativos y criterios relacionados con el precio:</h5>
                        <v-data-table
                            v-if="presBase.lotes.length > 1"
                            dense class="dataTable" hide-default-footer
                            :items="presBase.lotes"
                            :headers="[
                            {text:'Lote', align:'start', value:'descripcion'},
                            {text:'% Cualitativos', align:'center', value:'percCualitativos'},
                            {text:'% Relacionados con el precio', align:'center', value:'relPrecio'}
                            ]">
                            
                            <!-- DESCRIPCION -->
                            <template v-slot:[`item.descripcion`]="props">
                                {{props.item.descripcion}}
                            </template>

                            <!-- PORCENTAJE CUALITATIVOS -->
                            <template v-slot:[`item.percCualitativos`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkCualPrice"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.percCualitativos}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.percCualitativos"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>

                            <!-- PORCENTAJE RELACIONADOS CON EL PRECIO -->
                            <template v-slot:[`item.relPrecio`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkCualPrice"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.relPrecio}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.relPrecio"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>
                        </v-data-table>
                        <!-- NO HAY LOTES -->
                        <v-data-table
                            v-else
                            dense class="dataTable" hide-default-footer
                            :items="[presBase.lotes[0]]"
                            :headers="[
                            {text:'% Cualitativos', align:'center', value:'percCualitativos'},
                            {text:'% Relacionados con el precio', align:'center', value:'relPrecio'}
                            ]">
                            
                            <!-- PORCENTAJE CUALITATIVOS -->
                            <template v-slot:[`item.percCualitativos`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkCualPrice"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.percCualitativos}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.percCualitativos"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>

                            <!-- PORCENTAJE RELACIONADOS CON EL PRECIO -->
                            <template v-slot:[`item.relPrecio`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkCualPrice"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.relPrecio}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.relPrecio"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>
                        </v-data-table>
                        <!-- ALERTAS -->
                        <v-alert v-if="alertCriteriosCualPre" dense text type="error" style="margin-top:1rem;">
                            {{alertCriteriosCualPreMsg}}
                        </v-alert>
                        <v-alert v-else dense text type="success" style="margin-top:1rem;">
                            ¡Datos correctos!
                        </v-alert>
                    </v-col>
                    <!--ENTRE CRITERIOS SEGUN LA FORMA DE EVALUARLOS -->
                    <v-col cols="12" md="6">
                        <!-- HAY LOTES -->
                        <h5 class="subtitle">2.- Entre criterios según la forma de evaluarlos:</h5>
                        <v-data-table
                            v-if="presBase.lotes.length > 1"
                            dense class="dataTable" hide-default-footer
                            :items="presBase.lotes"
                            :headers="[
                            {width:'30%', text:'Lote', align:'start', value:'descripcion'},
                            {width:'35%', text:'% Dependen de un juicio de valor (POT)', align:'center', value:'pot'},
                            {width:'35%', text:'% Evaluables mediante fórmulas (POF)', align:'center', value:'pof'}
                            ]">
                            
                            <!-- DESCRIPCION -->
                            <template v-slot:[`item.descripcion`]="props">
                                {{props.item.descripcion}}
                            </template>
                            <!-- POT -->
                            <template v-slot:[`item.pot`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkPotPof"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.pot}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.pot"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>
                            <!-- POF -->
                            <template v-slot:[`item.pof`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkPotPof"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.pof}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.pof"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>
                        </v-data-table>
                        <!-- NO HAY LOTES -->
                        <v-data-table
                            v-else
                            dense class="dataTable" hide-default-footer
                            :items="[presBase.lotes[0]]"
                            :headers="[
                            {text:'% Dependen de un juicio de valor (POT)', align:'center', value:'pot'},
                            {text:'% Evaluables mediante fórmulas (POF)', align:'center', value:'pof'}
                            ]">
                            
                            <!-- POT -->
                            <template v-slot:[`item.pot`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkPotPof"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.pot}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.pot"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>
                            <!-- POF -->
                            <template v-slot:[`item.pof`]="props">
                                <v-edit-dialog  
                                    persistent large
                                    save-text="GUARDAR"
                                    cancel-text="CANCELAR"
                                    @save="checkPotPof"
                                    >
                                    <!-- MOSTRAR DATOS -->
                                    <span class="editField">{{props.item.pof}} %
                                    </span>
                                    <!-- INTRODUCIR DATOS -->
                                    <template v-slot:input>
                                        <v-text-field
                                        v-model="props.item.pof"
                                        label="Indicar porcentaje"
                                        type="number"
                                        single-line
                                        persistent-hint
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </template>
                        </v-data-table>
                        <!-- ALERTAS -->
                        <v-alert v-if="alertCriteriosForma" dense text type="error" style="margin-top:1rem;">
                            {{alertCriteriosFormaText}}
                        </v-alert>
                        <v-alert v-else dense text type="success" style="margin-top:1rem;">
                            ¡Datos correctos!
                        </v-alert>
                    </v-col>
                </v-row>
            </div>

            <!-- PUNTUACION DE LOS CRITERIOS CUALITATIVOS QUE DEPENDEN DE UN JUICIO DE VALOR -->
            <div class="group">
                <h3 id="Puntuación criterios cualitativos">Puntuación de los criterios cualitativos que dependen de un juicio de valor (POT)</h3>
                <v-row class="rowGroup">
                    <v-col cols="12">
                        <!-- HAY LOTES -->
                        <v-row  v-if="presBase.lotes.length > 1">
                            <v-col cols="12" v-for="lote, i in presBase.lotes" :key="i">
                                <v-row class="subRow">
                                    <!-- PUNTUACION MÁXIMA OBTENIBLE PARA EL LOTE -->
                                    <v-col cols="12" md="2">
                                        <h5 class="subTitle">Lote: <b>{{lote.descripcion}}</b></h5>
                                        <h5 class="subTitle">Puntuación máxima obtenible</h5>
                                        <v-text-field dense filled disabled :value="lote.pot"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-spacer style="margin-top:2.6rem;"></v-spacer>
                                        <v-btn block color="info" @click="addCriterioValor(i)">Añadir Criterio</v-btn>
                                    </v-col>
                                    <!-- CRITERIOS Y PUNTUACION -->
                                    <v-col cols="12" md="8">
                                        <v-spacer style="margin-top:1rem;"></v-spacer>
                                        <v-data-table dense class="dataTable" hide-default-footer
                                        :items="lote.puntosJuicioValor"
                                        :headers="[
                                            {width:'10%', text:'Criterio', align:'start', value:'id'},
                                            {width:'30%', text:'Nombre', align:'start', value:'nombreCriterio'},
                                            {width:'25%', text:'Extensión (nº páginas)', align:'start', value:'nPaginas'},
                                            {width:'25%', text:'Puntuación máxima', align:'start', value:'puntMaxima'},
                                            {width:'10%', text:'Borrar', align:'start', value:'actions'}
                                        ]"
                                        >
                                            <!-- ID -->
                                            <template v-slot:[`item.id`]="props">
                                                {{props.index+1}}
                                            </template>
                                            <!-- NOMBRE CRITERIO -->
                                            <template v-slot:[`item.nombreCriterio`]="props">
                                                <v-edit-dialog  
                                                    persistent large
                                                    save-text="GUARDAR"
                                                    cancel-text="CANCELAR"
                                                    >
                                                    <!-- MOSTRAR DATOS -->
                                                    <span class="editField" v-if="props.item.nombreCriterio !== undefined">{{props.item.nombreCriterio}}</span>
                                                    <span class="editField" v-else><v-icon color="info" small>mdi-pencil</v-icon>Introducir nombre criterio</span>
                                                    <!-- INTRODUCIR DATOS -->
                                                    <template v-slot:input>
                                                        <v-text-field
                                                        v-model="props.item.nombreCriterio"
                                                        label="Indicar criterio"
                                                        single-line
                                                        persistent-hint
                                                        ></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </template>
                                            <!-- PAGINAS -->
                                            <template v-slot:[`item.nPaginas`]="props">
                                                <v-edit-dialog  
                                                    persistent large
                                                    save-text="GUARDAR"
                                                    cancel-text="CANCELAR"
                                                    >
                                                    <!-- MOSTRAR DATOS -->
                                                    <span class="editField">{{props.item.nPaginas}}</span>
                                                    <!-- INTRODUCIR DATOS -->
                                                    <template v-slot:input>
                                                        <v-text-field
                                                        v-model="props.item.nPaginas"
                                                        label="Número de páginas"
                                                        type="number"
                                                        single-line
                                                        persistent-hint
                                                        ></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </template>
                                            <!-- PUNTUACION MÁXIMA -->
                                            <template v-slot:[`item.puntMaxima`]="props">
                                                <v-edit-dialog  
                                                    persistent large
                                                    save-text="GUARDAR"
                                                    cancel-text="CANCELAR"
                                                    @save="checkPuntosValor()"
                                                    >
                                                    <!-- MOSTRAR DATOS -->
                                                    <span class="editField">{{props.item.puntMaxima}}</span>
                                                    <!-- INTRODUCIR DATOS -->
                                                    <template v-slot:input>
                                                        <v-text-field
                                                        v-model="props.item.puntMaxima"
                                                        label="Puntuación máxima"
                                                        type="number"
                                                        single-line
                                                        persistent-hint
                                                        ></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </template>
                                            <!-- BORRAR -->
                                            <template v-slot:[`item.actions`]="props">
                                                <v-icon
                                                :disabled="lote.puntosJuicioValor.length === 1"
                                                color="red" @click="deleteCriterioValor(i, props.index)">
                                                    mdi-delete
                                                </v-icon>
                                            </template>

                                            <!--ALERTAS-->
                                            <template v-slot:[`footer`]>
                                                <v-divider></v-divider>
                                                <v-alert v-if="lote.puntosJuicioValorAlert === true"
                                                dense text type="error" 
                                                style="background-color:white !important; margin-top:">
                                                {{lote.puntosJuicioValorAlertText}}
                                                </v-alert>
                                                <v-alert v-else
                                                dense text type="success" 
                                                style="background-color:white !important; margin-top:">
                                                ¡Datos correctos!
                                                </v-alert>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>   
                            </v-col>
                        </v-row>
                        <!-- NO HAY LOTES -->
                        <v-row  v-else>
                        <v-col cols="12" md="2">
                            <h5 class="subTitle">Puntuación máxima obtenible</h5>
                            <v-text-field dense filled disabled :value="presBase.lotes[0].pot"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-spacer style="margin-top:2.6rem;"></v-spacer>
                                <v-btn block color="info" @click="addCriterioValor(0)">Añadir Criterio</v-btn>
                            </v-col>
                            <!-- CRITERIOS Y PUNTUACION -->
                            <v-col cols="12" md="8">
                                <v-spacer style="margin-top:1rem;"></v-spacer>
                                <v-data-table dense class="dataTable" hide-default-footer
                                :items="presBase.lotes[0].puntosJuicioValor"
                                :headers="[
                                    {width:'10%', text:'Criterio', align:'start', value:'id'},
                                    {width:'30%', text:'Nombre', align:'start', value:'nombreCriterio'},
                                    {width:'25%', text:'Extensión (nº páginas)', align:'start', value:'nPaginas'},
                                    {width:'25%', text:'Puntuación máxima', align:'start', value:'puntMaxima'},
                                    {width:'10%', text:'Borrar', align:'start', value:'actions'}
                                ]"
                                >
                                    <!-- ID -->
                                    <template v-slot:[`item.id`]="props">
                                        {{props.index+1}}
                                    </template>
                                    <!-- NOMBRE CRITERIO -->
                                    <template v-slot:[`item.nombreCriterio`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField" v-if="props.item.nombreCriterio !== undefined">{{props.item.nombreCriterio}}</span>
                                            <span class="editField" v-else><v-icon color="info" small>mdi-pencil</v-icon>Introducir nombre criterio</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.nombreCriterio"
                                                label="Indicar criterio"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- PAGINAS -->
                                    <template v-slot:[`item.nPaginas`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField">{{props.item.nPaginas}}</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.nPaginas"
                                                label="Número de páginas"
                                                type="number"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- PUNTUACION MÁXIMA -->
                                    <template v-slot:[`item.puntMaxima`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            @save="checkPuntosValor()"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField">{{props.item.puntMaxima}}</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.puntMaxima"
                                                label="Puntuación máxima"
                                                type="number"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- BORRAR -->
                                    <template v-slot:[`item.actions`]="props">
                                        <v-icon
                                        :disabled="presBase.lotes[0].puntosJuicioValor.length === 1"
                                        color="red" @click="deleteCriterioValor(i, props.index)">
                                            mdi-delete
                                        </v-icon>
                                    </template>

                                    <!--ALERTAS-->
                                    <template v-slot:[`footer`]>
                                        <v-divider></v-divider>
                                        <v-alert v-if="presBase.lotes[0].puntosJuicioValorAlert === true"
                                        dense text type="error" 
                                        style="background-color:white !important; margin-top:">
                                        {{presBase.lotes[0].puntosJuicioValorAlertText}}
                                        </v-alert>
                                        <v-alert v-else
                                        dense text type="success" 
                                        style="background-color:white !important; margin-top:">
                                        ¡Datos correctos!
                                        </v-alert>
                                    </template>
                                </v-data-table>
                            </v-col>
                        </v-row>
                    </v-col>
                    <!-- UMBRAL MÍNIMO -->
                    <v-col cols="12" md="5">
                        <h5 id="Umbral juicio valor">Umbral mínimo en los criterios cualitativos que dependen de un jucio de valor
                            <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-58" target="blank" title="Ver artículo 146 LCSP">[artículo 146.3 LCSP]
                            </a>
                        </h5>
                        <v-radio-group v-model="datos.umbralJuicioValor">
                            <v-radio label="Se establece umbral mínimo del 50% de la puntuación en el conjunto de los criterios cualitativos [artículo 146.3 LCSP]. Los criterios cualitativos que se tendrán en cuenta son los que depende de un juicio de valor (archivo electrónico o sobre nº2)" :value="true"></v-radio>
                            <v-radio label="No se establece umbral mínimo" :value="false"></v-radio>
                        </v-radio-group>
                    
                    </v-col>
                </v-row>
            </div>

            <!-- PUNTUACION DE LOS CRITERIOS EVALUABLES MEDIANTE FÓRMULAS -->
            <div class="group">
                <h3 id="Puntuación criterios fórmulas">Puntuación de los criterios evaluables mediante fórmulas (POF)</h3>
                <v-row class="rowGroup">
                    <v-col cols="12">
                        <!-- HAY LOTES -->
                        <v-row  v-if="presBase.lotes.length > 1">
                            <v-col cols="12" v-for="lote, i in presBase.lotes" :key="i">
                                <v-row class="subRow">
                                    <!-- PUNTUACION MÁXIMA OBTENIBLE PARA EL LOTE -->
                                    <v-col cols="12" md="2">
                                        <h5 class="subTitle">Lote: <b>{{lote.descripcion}}</b></h5>
                                        <h5 class="subTitle">Puntuación máxima obtenible</h5>
                                        <v-text-field dense filled disabled :value="lote.pof"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2">
                                        <v-spacer style="margin-top:2.6rem;"></v-spacer>
                                        <v-btn block color="info" @click="addCriterioFormulas(i)">Añadir Criterio</v-btn>
                                    </v-col>
                                    <!-- CRITERIOS Y PUNTUACION -->
                                    <v-col cols="12" md="8">
                                        <v-spacer style="margin-top:1rem;"></v-spacer>
                                        <v-data-table dense class="dataTable" hide-default-footer
                                        :items="lote.puntosFormulas"
                                        :headers="[
                                            {width:'10%', text:'Criterio', align:'start', value:'id'},
                                            {width:'30%', text:'Nombre', align:'start', value:'nombreCriterio'},
                                            {width:'25%', text:'Extensión (nº páginas)', align:'start', value:'nPaginas'},
                                            {width:'25%', text:'Puntuación máxima', align:'start', value:'puntMaxima'},
                                            {width:'10%', text:'Borrar', align:'start', value:'actions'}
                                        ]"
                                        >
                                            <!-- ID -->
                                            <template v-slot:[`item.id`]="props">
                                                {{props.index+1}}
                                            </template>
                                            <!-- NOMBRE CRITERIO -->
                                            <template v-slot:[`item.nombreCriterio`]="props">
                                                <v-edit-dialog  
                                                    persistent large
                                                    save-text="GUARDAR"
                                                    cancel-text="CANCELAR"
                                                    >
                                                    <!-- MOSTRAR DATOS -->
                                                    <span class="editField" v-if="props.item.nombreCriterio !== undefined">{{props.item.nombreCriterio}}</span>
                                                    <span class="editField" v-else><v-icon color="info" small>mdi-pencil</v-icon>Introducir nombre criterio</span>
                                                    <!-- INTRODUCIR DATOS -->
                                                    <template v-slot:input>
                                                        <v-text-field
                                                        v-model="props.item.nombreCriterio"
                                                        label="Indicar criterio"
                                                        single-line
                                                        persistent-hint
                                                        ></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </template>
                                            <!-- PAGINAS -->
                                            <template v-slot:[`item.nPaginas`]="props">
                                                <v-edit-dialog  
                                                    persistent large
                                                    save-text="GUARDAR"
                                                    cancel-text="CANCELAR"
                                                    >
                                                    <!-- MOSTRAR DATOS -->
                                                    <span class="editField">{{props.item.nPaginas}}</span>
                                                    <!-- INTRODUCIR DATOS -->
                                                    <template v-slot:input>
                                                        <v-text-field
                                                        v-model="props.item.nPaginas"
                                                        label="Número de páginas"
                                                        type="number"
                                                        single-line
                                                        persistent-hint
                                                        ></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </template>
                                            <!-- PUNTUACION MÁXIMA -->
                                            <template v-slot:[`item.puntMaxima`]="props">
                                                <v-edit-dialog  
                                                    persistent large
                                                    save-text="GUARDAR"
                                                    cancel-text="CANCELAR"
                                                    @save="checkPuntosFormulas()"
                                                    >
                                                    <!-- MOSTRAR DATOS -->
                                                    <span class="editField">{{props.item.puntMaxima}}</span>
                                                    <!-- INTRODUCIR DATOS -->
                                                    <template v-slot:input>
                                                        <v-text-field
                                                        v-model="props.item.puntMaxima"
                                                        label="Puntuación máxima"
                                                        type="number"
                                                        single-line
                                                        persistent-hint
                                                        ></v-text-field>
                                                    </template>
                                                </v-edit-dialog>
                                            </template>
                                            <!-- BORRAR -->
                                            <template v-slot:[`item.actions`]="props">
                                                <v-icon
                                                :disabled="lote.puntosJuicioValor.length === 1"
                                                color="red" @click="deleteCriterioFormulas(i, props.index)">
                                                    mdi-delete
                                                </v-icon>
                                            </template>

                                            <!--ALERTAS-->
                                            <template v-slot:[`footer`]>
                                                <v-divider></v-divider>
                                                <v-alert v-if="lote.puntosFormulasAlert === true"
                                                dense text type="error" 
                                                style="background-color:white !important; margin-top:">
                                                {{lote.puntosFormulasAlertText}}
                                                </v-alert>
                                                <v-alert v-else
                                                dense text type="success" 
                                                style="background-color:white !important; margin-top:">
                                                ¡Datos correctos!
                                                </v-alert>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>   
                            </v-col>
                        </v-row>
                        <!-- NO HAY LOTES -->
                        <v-row  v-else>
                            <!-- PUNTUACION MÁXIMA OBTENIBLE -->
                            <v-col cols="12" md="2">
                                <h5 class="subTitle">Puntuación máxima obtenible</h5>
                                <v-text-field dense filled disabled :value="presBase.lotes[0].pof"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="2">
                                <v-spacer style="margin-top:2.6rem;"></v-spacer>
                                <v-btn block color="info" @click="addCriterioFormulas(0)">Añadir Criterio</v-btn>
                            </v-col>
                            <!-- CRITERIOS Y PUNTUACION -->
                            <v-col cols="12" md="8">
                                <v-spacer style="margin-top:1rem;"></v-spacer>
                                <v-data-table dense class="dataTable" hide-default-footer
                                :items="presBase.lotes[0].puntosFormulas"
                                :headers="[
                                    {width:'10%', text:'Criterio', align:'start', value:'id'},
                                    {width:'30%', text:'Nombre', align:'start', value:'nombreCriterio'},
                                    {width:'25%', text:'Extensión (nº páginas)', align:'start', value:'nPaginas'},
                                    {width:'25%', text:'Puntuación máxima', align:'start', value:'puntMaxima'},
                                    {width:'10%', text:'Borrar', align:'start', value:'actions'}
                                ]"
                                >
                                    <!-- ID -->
                                    <template v-slot:[`item.id`]="props">
                                        {{props.index+1}}
                                    </template>
                                    <!-- NOMBRE CRITERIO -->
                                    <template v-slot:[`item.nombreCriterio`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField" v-if="props.item.nombreCriterio !== undefined">{{props.item.nombreCriterio}}</span>
                                            <span class="editField" v-else><v-icon color="info" small>mdi-pencil</v-icon>Introducir nombre criterio</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.nombreCriterio"
                                                label="Indicar criterio"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- PAGINAS -->
                                    <template v-slot:[`item.nPaginas`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField">{{props.item.nPaginas}}</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.nPaginas"
                                                label="Número de páginas"
                                                type="number"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- PUNTUACION MÁXIMA -->
                                    <template v-slot:[`item.puntMaxima`]="props">
                                        <v-edit-dialog  
                                            persistent large
                                            save-text="GUARDAR"
                                            cancel-text="CANCELAR"
                                            @save="checkPuntosFormulas()"
                                            >
                                            <!-- MOSTRAR DATOS -->
                                            <span class="editField">{{props.item.puntMaxima}}</span>
                                            <!-- INTRODUCIR DATOS -->
                                            <template v-slot:input>
                                                <v-text-field
                                                v-model="props.item.puntMaxima"
                                                label="Puntuación máxima"
                                                type="number"
                                                single-line
                                                persistent-hint
                                                ></v-text-field>
                                            </template>
                                        </v-edit-dialog>
                                    </template>
                                    <!-- BORRAR -->
                                    <template v-slot:[`item.actions`]="props">
                                        <v-icon
                                        :disabled="presBase.lotes[0].puntosJuicioValor.length === 1"
                                        color="red" @click="deleteCriterioFormulas(0, props.index)">
                                            mdi-delete
                                        </v-icon>
                                    </template>

                                    <!--ALERTAS-->
                                    <template v-slot:[`footer`]>
                                        <v-divider></v-divider>
                                        <v-alert v-if="presBase.lotes[0].puntosFormulasAlert === true"
                                        dense text type="error" 
                                        style="background-color:white !important; margin-top:">
                                        {{presBase.lotes[0].puntosFormulasAlertText}}
                                        </v-alert>
                                        <v-alert v-else
                                        dense text type="success" 
                                        style="background-color:white !important; margin-top:">
                                        ¡Datos correctos!
                                        </v-alert>
                                    </template>
                                </v-data-table>
                            </v-col>
                    
                        </v-row>
                    </v-col>
                </v-row>
            </div>

            <!-- OFERTAS CON VALORES ANORMALES -->
            <div class="group">
                <h3 id="Ofertas con valores anormales">Ofertas con valores anormales</h3>
                <v-row class="rowGroup">
                    <v-col cols="12" md="5">
                        <h5 class="subtitle">Criterio:</h5>
                        <v-radio-group v-model="datos.criterio">
                            <v-radio label="El establecido en el articulo 85 del RCAP" :value="true"></v-radio>
                            <v-radio label="El de la clausula 27 de este pliego con el siguiente umbral de temeridad:" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <!-- ART 85. ¿SE REDUCEN 1/3 LOS PORCENTAJES? -->
                    <v-col cols="12" md="4" v-if="datos.criterio === true">
                        <h5 class="subtitle">¿Se reduciran 1/3 los porcentajes establecidos?</h5>
                        <v-radio-group v-model="datos.reduccion">
                            <v-radio label="Si" :value="true"></v-radio>
                            <v-radio label="No" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <!-- ART 85. EN CASO DE REDUCCIÓN DE PORCENTAJES, JUSTIFICAR -->
                    <v-col cols="12" v-if="datos.criterio === true && datos.reduccion === true">
                        <h5 class="subtitle">En caso afirmativo, justificar:</h5>
                        <v-textarea auto-grow filled label="Justificación" v-model="datos.justificacionReduccion"></v-textarea>
                    </v-col>

                    <!--UMBRAL TEMERIDAD-->
                    <v-col cols="12" md="7" v-if="datos.criterio === false">
                        <h5 class="subtitle">Umbral temeridad</h5>
                        <v-text-field append-icon="mdi-percent" style="max-width:8rem;"
                        filled v-model="datos.umbralTemeridad"></v-text-field>
                    </v-col>

                    <!-- SEGUIMIENTO PORMENORIZADO -->
                    <v-col cols="12" md="5">
                        <h5 class="subtitle">Seguimiento pormenorizado de ofertas incursas en presunción de anormalidad 
                            <a href="https://www.boe.es/eli/es/l/2017/11/08/9/con#a1-61" target="blank" title="Ver artículo 149 LCSP">
                            [artículo 149.7 LCSP]</a>
                        </h5>
                        <v-radio-group v-model="datos.segPorm">
                            <v-radio label="Establecimiento de un 20 % como límite por incumplimiento del programa de trabajo para que sean considerados a los efectos del punto 26.4, las penalizaciones correspondientes por demora en el plazo de ejecución" :value="true"></v-radio>
                            <v-radio label="Otra (definir):" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <!-- EN CASO NEGATIVO JUSTIFICACION -->
                    <v-col cols="12" md="7" v-if="datos.segPorm === false">
                        <h5 class="subtitle">En caso negativo, justificar:</h5>
                        <v-textarea filled auto-grow v-model="datos.segPormJustif"></v-textarea>
                    </v-col>
                </v-row>
            </div>

            <!-- PLAZO PARA LA ADJUDICACION -->
            <div class="group">
                <h3 id="Plazo para la adjudicación">Plazo para la adjudicación</h3>
                <v-row class="rowGroup">
                    <v-col cols="12" md="3">
                        <h5 class="subtitle">Se adjudicará el contrato dentro del plazo</h5>
                        <v-radio-group v-model="datos.plazoAdjudicacion">
                            <v-radio label="General de dos (2) meses." :value="true"></v-radio>
                            <v-radio label="Otro" :value="false"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <!-- OTRO, ESPECIFICAR PLAZO -->
                    <v-col cols="12" md="9" v-if="datos.plazoAdjudicacion === false">
                        <h5 class="subtitle">Especificar plazo</h5>
                        <v-text-field filled v-model="datos.otroPlazoAdjudicacion" style="margin-bottom:-1rem;"></v-text-field>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div v-else>
            <v-alert text type="error">Aun no se ha definido un presupuesto base. Por favor, complete la sección "Presupuesto, lotes y anualidades" y posteriormente
                regrese a esta sección.
            </v-alert>
        </div>
    </div>
</template>

<script> 
    import {currencyFormat} from "@/assets/mixins/currencyFormat";

    export default {
        name: 'GarantiasCritAdjudicacion',
        props:['presBase', 'datosGuardados', 'goToElement'],
        mixins: [currencyFormat],
        data(){
            return {
                alertMaxExigido: false,
                alertCriteriosCualPre: false,
                alertCriteriosCualPreMsg: undefined,
                alertCriteriosForma: false,
                alertPuntuacionValor: [],

                datos:{
                    componente:'Garantias',
                    
                    provisional: false,
                    complementaria: false,
                    complementariaJustificar: null,
                    umbralJuicioValor: false,
                    criterio: true,
                    reduccion: 'no',
                    justificacionReduccion: '',
                    umbralTemeridad: '',
                    segPorm: true,
                    segPormJustif: '',
                    plazoAdjudicacion: true,
                    otroPlazoAdjudicacion: undefined,        
                }
            }
        },

        updated(){
            if(this.presBase){
                this.$emit('datos', this.datos)
            }
        },

        beforeDestroy(){
            //NECESARIO PARA COMPARTIR DATOS ENTRE SECCIONES
            if(this.presBase){
                this.$emit('datos', this.datos)
            }
        },
        
        created(){
            this.initialize();
            this.setElementScroll();            
        },

    
        watch:{
            goToElement(){
                this.setElementScroll(); 
            }
        },


        methods:{
            setElementScroll(){
                if(this.goToElement !== undefined){
                    setTimeout(()=>{
                        let element = document.getElementById(this.goToElement)
                        element.scrollIntoView({ block: "start", behavior: "smooth" });
                        }, 500)
                }
            },

            initialize(){
                if(this.datosGuardados !== undefined){
                    this.datos = this.datosGuardados
                }
                
                if(this.presBase){
                    //VALIDACION INCIAL
                    this.checkMaxExigido();
                    this.checkPotPof();
                    this.checkCualPrice();
                    this.checkPuntosValor();   
                    this.checkPuntosFormulas();
                    
                }         
            },

            checkMaxExigido(value){
                let alert = false
                this.presBase.lotes.forEach((lote)=>{
                    if((lote.baseLote * 0.3) < lote.importeExigidoProvisional || lote.importeExigidoProvisional == 0){
                        alert = true;
                    }
                })
                this.alertMaxExigido = alert;
                return value
            },
            
            checkCualPrice(){
                let alert = false;
                let textAlert = undefined;
                this.presBase.lotes.forEach((lote)=>{
                    if(parseInt(lote.percCualitativos) + parseInt(lote.relPrecio) !== 100){
                        alert = true;
                        textAlert = 'La suma de los criterios debe ser igual a 100%'
                    }
                })
                this.alertCriteriosCualPre = alert;
                this.alertCriteriosCualPreMsg = textAlert;
            },

            checkPotPof(){
                this.alertCriteriosForma = undefined;
                this.alertCriteriosFormaText = undefined;

                this.presBase.lotes.forEach((lote)=>{
                    if(parseInt(lote.pot) >= 50){
                        this.alertCriteriosForma = true;
                        this.alertCriteriosFormaText = 'Los criterios que dependen de un juicio de valor (POT) deben ser inferiores al 50%'
                    } else if (parseInt(lote.pof)<= 50){
                        this.alertCriteriosForma = true;
                        this.alertCriteriosFormaText = 'Los criterios evaluables mediante fórmulas (POF) deben ser superiores al 50%'
                    } else if (parseInt(lote.pot) + parseInt(lote.pof) != 100){
                        this.alertCriteriosForma = true;
                        this.alertCriteriosFormaText = 'La suma de los criterios (POT + POF) debe ser igual al 100%'
                    }                     
                })

            },

            checkPuntosValor(){
                for(let i=0; i<this.presBase.lotes.length; i++){
                    let alert = false;
                    let alertText = undefined;
                    let suma = 0;
                    this.presBase.lotes[i].puntosJuicioValor.forEach((criterio)=>{
                        if(parseInt(criterio.puntMaxima) == 0){
                            alert = true;
                            alertText = 'No puede haber valores de puntuación máxima igual a cero.'
                        } else {
                            suma += parseInt(criterio.puntMaxima)
                        }
                    })
                    //EVALUAMOS
                    if(parseInt(this.presBase.lotes[i].pot) < suma){
                        alert = true;
                        alertText = 'La suma de las puntuaciones máximas no puede ser superior a la puntuación máxima obtenible.'
                    } else if (parseInt(this.presBase.lotes[i].pot) !== suma){
                        alert = true;
                        alertText = 'La suma de las puntuaciones máximas no coincide con la puntuación máxima obtenible.'
                    } 
                    //ESCRIBIMOS RESULTADOS
                    this.presBase.lotes[i].puntosJuicioValorAlert = alert;
                    this.presBase.lotes[i].puntosJuicioValorAlertText = alertText;
                    suma = 0;
                }                
            },

            deleteCriterioValor(loteIndex, criterioIndex){
                this.presBase.lotes[loteIndex].puntosJuicioValor.splice(criterioIndex,1)
                this.checkPuntosValor();
            },

            addCriterioValor(loteIndex){
                let nuevoCriterio = {
                    nombreCriterio: undefined,
                    nPaginas: 1,
                    puntMaxima: 0,
                }
                this.presBase.lotes[loteIndex].puntosJuicioValor.push(nuevoCriterio)
                this.checkPuntosValor();
            },

            checkPuntosFormulas(){
                for(let i=0; i<this.presBase.lotes.length; i++){
                    let alert = false;
                    let alertText = undefined;
                    let suma = 0;
                    this.presBase.lotes[i].puntosFormulas.forEach((criterio)=>{
                        if(parseInt(criterio.puntMaxima) == 0){
                            alert = true;
                            alertText = 'No puede haber valores de puntuación máxima igual a cero.'
                        } else {
                            suma += parseInt(criterio.puntMaxima)
                        }
                    })
                    //EVALUAMOS
                    if(parseInt(this.presBase.lotes[i].pof) < suma){
                        alert = true;
                        alertText = 'La suma de las puntuaciones máximas no puede ser superior a la puntuación máxima obtenible.'
                    } else if (parseInt(this.presBase.lotes[i].pof) !== suma){
                        alert = true;
                        alertText = 'La suma de las puntuaciones máximas no coincide con la puntuación máxima obtenible.'
                    } 
                    //ESCRIBIMOS RESULTADOS
                    this.presBase.lotes[i].puntosFormulasAlert = alert;
                    this.presBase.lotes[i].puntosFormulasAlertText = alertText;
                    suma = 0;
                }     
            },

            deleteCriterioFormulas(loteIndex, criterioIndex){
                this.presBase.lotes[loteIndex].puntosFormulas.splice(criterioIndex,1)
                this.checkPuntosFormulas();
            },

            addCriterioFormulas(loteIndex){
                let nuevoCriterio = {
                    nombreCriterio: undefined,
                    nPaginas: 1,
                    puntMaxima: 0,
                }
                this.presBase.lotes[loteIndex].puntosFormulas.push(nuevoCriterio)
                this.checkPuntosFormulas();
            },
        }
    }
</script>

<style scoped>
    .subtitle {
        margin-bottom:1rem;
        color: gray;
        font-weight: 500;
    }

</style>