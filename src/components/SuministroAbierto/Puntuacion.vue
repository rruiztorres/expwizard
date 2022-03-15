<template>
    <div>
        <h3>12.- Puntuación de los criterios cualitativos que dependen de un juicio de valor</h3>
        <br/>
        <v-row>
            <v-col cols="12" md="3">
                <h5 class="subtitle">Puntuación máxima obtenible</h5>
                <v-text-field filled label="puntos"></v-text-field>
            </v-col>

            <v-col cols="12" md="9">
                <v-data-table
                    class="dataTable"
                    :headers="puntuacionHeader"
                    :items="datos.criteriosPuntuacion"
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
                
                </v-data-table>
            </v-col>
        </v-row>
        <br/>

        <h3>13.- Umbral mínimo en los criterios cualitativos que dependen de un juicio de valor</h3>
        <v-row>
            <v-col cols="12">
                <v-radio-group v-model="datos.umbralMinimo">
                    <v-radio label="No se establece" value="no"></v-radio>
                    <v-radio label="50% de la puntuación en el conjunto de criterios cualitativos [art. 146.3 LCSP]" value="si"></v-radio>
                </v-radio-group>
            </v-col>
        </v-row>
        <br/>

        <h3>14.- Puntuación de los criterios evaluables mediante fórmulas</h3>
        <br/>
        <v-row>
            <v-col cols="12" md="3">
                <h5 class="subtitle">Puntuación máxima obtenible</h5>
                <v-text-field filled label="puntos"></v-text-field>
            </v-col>

            <v-col cols="12" md="9">
                <v-data-table
                    class="dataTable"
                    :headers="puntuacionFormulasHeader"
                    :items="datos.criteriosPuntuacionFormulas"
                    hide-default-footer
                >                
                </v-data-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>

export default {
    name: 'Puntuacion',
    data(){
        return {

            puntuacionHeader: [
                { text: "", align: "start", sortable: false, value: "id" },
                { text: "Criterios", align: "start", sortable: false, value: "criterios" },
                { text: "Extension máxima (nº páginas)", align: "start", sortable: false, value: "extension" },
            ],

            puntuacionFormulasHeader: [
                { text: "", align: "start", sortable: false, value: "id" },
                { text: "Criterios", align: "start", sortable: false, value: "criterios" },
                { text: "Extension máxima (nº páginas)", align: "start", sortable: false, value: "extension" },
            ],

            datos:{
                criteriosPuntuacion: [
                    { id: 1, criterios: '', extension: '' },
                    { id: 2, criterios: '', extension: '' },
                    { id: 3, criterios: '', extension: '' },
                    { id: 4, criterios: '', extension: '' },
                ],
                umbralMinimo: '',
                criteriosPuntuacionFormulas: [
                    { id: 1, criterios: ''},
                    { id: 2, criterios: ''},
                ],
            },
            
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

    .dataTable {
        background-color: rgba(211, 211, 211, 0.589) !important;
        border-radius: 4px 4px 0px 0px;
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
</style>
