<template>
    <div>
        <v-data-table
        dense
        class="dataTable"
        :items="datos.lotes"
        :headers="lotesHeaders"
        hide-default-footer
        no-data-text="No se han introducido datos aun"
        >     
            <!-- BASE DE LICITACION SIN IMPUESTOS -->
            <template v-slot:[`item.baseLote`]="props">
                <span>
                    <v-edit-dialog large
                    persistent
                    cancel-text="Cancelar"
                    save-text="Guardar"
                    :return-value.sync="props.item.baseLote">
                        <!-- MOSTRAR DATOS -->
                        <span class="editField" @click="resetSaveData">{{currencyFormat(props.item.baseLote)}}</span>
                        <!-- INTRODUCIR DATOS -->
                        <template v-slot:input>
                            <v-text-field
                            v-model="props.item.baseLote"
                            label="Editar"
                            single-line
                            type="number"
                            ></v-text-field>
                        </template>
                    </v-edit-dialog>
                </span>
        </template>

        <!-- IMPUESTO APLICABLE -->
        <template v-slot:[`item.tipoImpuesto`]="props">
            <v-edit-dialog large persistent
            cancel-text="Cancelar"
            save-text="Guardar" 
            :return-value.sync="props.item.tipoImpuesto">
                <!-- MOSTRAR DATOS -->
                <span class="editField" @click="resetSaveData">{{parseFloat(props.item.tipoImpuesto)}} %</span>
                <!-- INTRODUCIR DATOS -->
                <template v-slot:input>
                    <v-select
                    class="adjustHeight"
                    :items="impuestos"
                    item-text="tipo"
                    item-value="valor"
                    v-model="props.item.tipoImpuesto"
                    label="Impuesto a aplicar:"
                    ></v-select>
                </template>
            </v-edit-dialog>
        </template>

        <!-- TOTAL IMPUESTOS -->
        <template v-slot:[`item.totalImpuestos`]="props">
            {{currencyFormat((props.item.tipoImpuesto / 100) * (props.item.baseLote))}}
        </template>

        <!-- TOTAL (IMP.INCLUIDOS) -->
        <template v-slot:[`item.totalLote`]="props">
            {{currencyFormat((1+(props.item.tipoImpuesto / 100)) * parseFloat(props.item.baseLote))}}
        </template>

        <!-- COSTES -->
        <template v-slot:[`item.costesIndirectos`]="props">
        <v-simple-table dense style="margin:0.5rem;">
        <thead>
        <tr>
        <th style="text-align:center !important;">Costes Generales<sup>1</sup></th>
        <th style="text-align:center !important;">Beneficio Industrial<sup>2</sup></th>
        <th style="text-align:center !important;">Total Costes Indirectos <sup>1+2</sup></th>
        <th style="text-align:center !important;">Total Costes Directos</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <!-- COSTES GENERALES -->
        <td>
        <v-edit-dialog large 
        cancel-text="Cancelar"
        save-text="Guardar"
        :return-value.sync="props.item.porcCostesGenerales">
        <!-- MOSTRAR DATOS -->
        <table><tbody><tr>
        <td style="width:4rem; padding-top:0.3rem;"><span class="editField" @click="resetSaveData">{{`${props.item.porcCostesGenerales} %`}}</span></td>
        <td style="padding-top:0.3rem;">{{currencyFormat((props.item.baseLote/(1+(props.item.porcCostesGenerales+props.item.porcBeneficioIndustrial)/100)) * (props.item.porcCostesGenerales/100))}}</td>
        </tr></tbody></table>
        <!-- INTRODUCIR DATOS -->
        <template v-slot:input>
        <v-text-field
        v-model="props.item.porcCostesGenerales"
        label="Editar"
        type="number"
        single-line
        persistent-hint
        hint="Valor recomendado 13%"
        ></v-text-field>
        </template>
        </v-edit-dialog>
        </td>
        <!-- BENEFICIO INDUSTRIAL -->
        <td>
        <v-edit-dialog large 
        cancel-text="Cancelar"
        save-text="Guardar"
        :return-value.sync="props.item.porcBeneficioIndustrial">
        <!-- MOSTRAR DATOS -->
        <table><tbody><tr>
        <td style="width:4rem; padding-top:0.3rem;"><span class="editField" @click="resetSaveData">{{`${props.item.porcBeneficioIndustrial} %`}}</span></td>
        <td style="padding-top:0.3rem;">{{currencyFormat((props.item.baseLote/(1+(props.item.porcCostesGenerales+props.item.porcBeneficioIndustrial)/100)) * (props.item.porcBeneficioIndustrial/100))}}</td>
        </tr></tbody></table>
        <!-- INTRODUCIR DATOS -->
        <template v-slot:input>
        <v-text-field
        type="number"
        v-model="props.item.porcBeneficioIndustrial"
        label="Editar"
        single-line
        persistent-hint
        hint="Valor recomendado 6%"
        ></v-text-field>
        </template>
        </v-edit-dialog>
        </td>
        <!-- TOTAL COSTES INDIRECTOS -->
        <td>
        {{
        currencyFormat(
        ((props.item.baseLote/(1+(props.item.porcCostesGenerales+props.item.porcBeneficioIndustrial)/100)) * (props.item.porcCostesGenerales/100))
        +
        ((props.item.baseLote/(1+(props.item.porcCostesGenerales+props.item.porcBeneficioIndustrial)/100)) * (props.item.porcBeneficioIndustrial/100))
        )
        }}
        </td>
        <!-- TOTAL COSTES DIRECTOS -->
        <td>
        {{
        currencyFormat(
        (props.item.baseLote)
        -
        (((props.item.baseLote/(1+(props.item.porcCostesGenerales+props.item.porcBeneficioIndustrial)/100)) * (props.item.porcCostesGenerales/100))
        +
        ((props.item.baseLote/(1+(props.item.porcCostesGenerales+props.item.porcBeneficioIndustrial)/100)) * (props.item.porcBeneficioIndustrial/100)))                            
        )
        }}
        </td>
        </tr>
        </tbody>
        </v-simple-table>
        </template>

        <!-- BORRAR-->
        <template v-slot:[`item.actions`]="props">
        <v-icon color="red" @click="deleteLote(props.item.idLote)">mdi-delete</v-icon>
        </template>
        </v-data-table>
    </div>
</template>