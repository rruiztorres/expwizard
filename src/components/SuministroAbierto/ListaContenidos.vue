<template>
    <v-card light style="width: 50rem;">
        <v-card-title style="background-color:rgb(0, 188, 212); color:white; font-weight:400;">
            Índice de contenidos
            <v-spacer></v-spacer>
            <v-btn color="error" @click="close">Cerrar</v-btn>
        </v-card-title>
        <v-card-actions>
            <v-text-field
                v-model="search"
                label="Buscar"
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
            ></v-text-field>
        </v-card-actions>
       <v-treeview
            style="height: 50rem; max-height:70vh; overflow-y:auto;"
            :search="search"
            color="warning"
            :items="lista"
            :filter="filter"
            open-on-click
        >
            <template v-slot:prepend="{item}">
                <v-btn icon color="info" title="Ir a apartado" @click="goToItem(item.element)">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
        </v-treeview>
    </v-card>


</template>

<script>
    export default {
        computed: {
            filter () {
                return this.caseSensitive
                ? (item, search, textKey) => item[textKey].indexOf(search) > -1
                : undefined
            },
        },

        methods:{
            close(){
                this.$emit("close", false)
            },

            goToItem(info){
                this.$emit("goTo", [info])
                this.close();
            }
        },

        data(){
            return{
                search: null,
                lista:[
                    {id: 1, name:'1.- Objeto del Contrato', element:['Objeto del Contrato', 0]},
                    {id: 2, name:'2.- Necesidades a satisfacer y circunstancias del contrato', element: ['Necesidades a satisfacer y circunstancias del contrato', 0]},
                    {id: 3, name:'3.- Presupuesto base de licitación y anualidades', element: ['Presupuesto base de licitación y Lotes', 1], children:[
                        {id: 4, name:'3.1.- Presupuesto base de licitación', element:['Presupuesto base de licitación y Lotes', 1]},
                        {id: 5, name:'3.2.- Desglose del presupuesto base de licitación en relación con los costes laborales', element:['Desglose', 1]},
                        {id: 6, name:'3.3.- Anualidades', element:['Anualidades', 1]},
                    ]},                  
                    {id: 7, name:'4.- Valor Estimado', element: ['Valor Estimado', 1],  children:[
                        {id: 8, name:'4.1.- Importe del valor estimado del contrato', element: ['Valor Estimado', 1]},
                        {id: 9, name:'4.2.- Método de cálculo del valor estimado', element: ['Valor Estimado', 1]},
                    ]},
                    {id: 10, name:'5.- División en lotes', element: ['Presupuesto base de licitación y Lotes', 1]},
                    {id: 11, name:'6.- Documentos que revisten carácter contractual', element: ['Documentos que revisten carácter contractual', 1]},
                    {id: 12, name:'7.- Tramitación del procedimiento', element: ['Procedimiento', 1]},
                    {id: 13, name:'8.- Incompatibilidades para la licitación', element: ['Incompatibilidades para la licitación', 2]},
                    {id: 14, name:'9.- Capacidad y solvencia', element: ['Capacidad y solvencia', 2], children:[
                        {id: 15, name:'9.1.- Requisitos y solvencia', element: ['Requisitos de solvencia', 2]},
                        {id: 16, name:'9.2.- Integración de la solvencia', element: ['Integración de la solvencia', 2]},
                        {id: 17, name:'9.3.- Concreción de las condiciones de solvencia', element: ['Concreción de las condiciones de solvencia', 2]},
                        {id: 18, name:'9.4.- Habilitación empresarial exigible para realizar la prestación', element: ['Habilitación empresaria exigible', 2]}
                    ]},
                    {element: ['Garantías', 3],  id: 19, name:'10.- Garantías', children:[{element: undefined,  id: 0, name:'10.1.- Provisional', children:[
                        {id: 20, name:'10.1.- Provisional', element: ['Provisional', 3]},
                        {id: 21, name:'10.3.- Complementaria', element: ['Complementaria', 3]},
                        ]}
                    ]},                  
                    {id: 22, name:'11.- Criterios de adjudicación', element: ['Criterios de adjudicación', 3],  children:[ 
                        {id: 23, name:'11.1.- Preponderancia de criterios', element: ['Preponderancia de criterios', 3]},
                        {id: 24, name:'12.- Puntuación de los criterios cualitativos que dependen de un juicio de valor', element: ['Puntuación criterios cualitativos', 3] }
                    ]},

                    {id: 25, name:'13.- Umbral mínimo en los criterios cualitativos que dependen de un juicio de valor', element: ['Umbral juicio valor', 3]},
                    {id: 26, name:'14.- Puntuación de los criterios evaluables mediante fórmulas', element: ['Puntuación criterios fórmulas', 3]},
                    {id: 27, name:'15.- Ofertas con valores anormales', element: ['Ofertas con valores anormales', 3]},
                    {id: 28, name:'16.- Plazo para la adjudicación', element: ['Plazo para la adjudicación', 3]},
                    {id: 29, name:'17.- Responsable del contrato', element: ['Responsable del contrato', 4]},
                    {id: 30, name:'18.- Plazo de ejecución o duración', element: ['Plazo de ejecución o duración', 1]},
                    {id: 31, name:'19.- Régimen de pagos', element: ['Régimen de pagos', 1]},
                    {id: 32, name:'20.- Revisión de precios', element: ['Revisión de precios', 1]},
                    {id: 33, name:'21.- Abonos a cuenta', element: ['Abonos a cuenta', 1]},
                    {id: 34, name:'22.- Presentación de facturas', element: ['Presentación de facturas', 4]},
                    {id: 35, name:'23.- Comprobación de pagos a subcontratistas o suministradores', element: ['Comprobación de pagos a subcontratistas o suministradores', 4]},
                    {id: 36, name:'24.- Condiciones especiales de ejecución', element: ['Condiciones especiales de ejecución', 4],  children:[
                        {element: ['Relacionadas con la innovación, de tipo medioambiental o social', 4],  id: 37, name:'24.1.- Relacionadas con la innovación, de tipo medioambiental o de tipo social'},
                        {element: ['Otras condiciones especiales de ejecución', 4],  id: 38, name:'24.2.- Otras condiciones especiales de ejecución', }
                    ]},
                    {id: 39, name:'25.- Modificación del contrato', element: ['Modificación del contrato', 1],  children:[
                        {id: 40, name:'25.1.- Modificaciones previstas', element: ['Modificación del contrato', 1]},
                    ]},
                    {element: ['Penalidades', 5],  id: 41, name:'26.- Penalidades', children:[
                        {id: 42, name:'26.1.- Por incumplimiento de las condiciones especiales de ejecución', element: ['Por incumplimiento de las condiciones especiales de ejecución', 5]},
                        {id: 43, name:'26.2.- Por incumplimiento defectuoso', element: ['Por incumplimiento defectuoso', 5]},
                        {id: 44, name:'26.3.- Por incumplir criterios de adjudicación', element: ['Por incumplir criterios de adjudicación', 5]},
                        {id: 45, name:'26.4.- Por demora en el plazo de ejecución', element: ['Por demora en el plazo de ejecución', 5]},
                        {id: 46, name:'26.5.- Por demora en el plazo para la presentación del plan de seguridad y salud', element: ['Por demora en el plazo para la presentación del plan de seguridad y salud', 5]},
                        {id: 47, name:'26.6.- Otras penalidades', element: ['Otras penalidades', 5]}
                    ]},
                    {element: ['Cesión del contrato', 6],  id: 48, name:'27.- Cesión del contrato'},
                    {element: ['Subcontratación', 6],  id: 49, name:'28.- Subcontratación'},
                    {element: ['Facultades de inspección de instalaciones', 6],  id: 50, name:'29.- Facultades de inspección de instalaciones y oficinas de contratistas'},
                    {element: ['Plazo de recepción', 6],  id: 51, name:'30.- Plazo de recepción'},
                    {element: ['Plazo de garantía', 6],  id: 52, name:'31.- Plazo de garantía'},
                ]
            }
        }
    }
</script>