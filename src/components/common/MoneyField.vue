<template>
<!-- 
Toma un valor de entrada de tipo número y lo formatea de acuerdo a los parámetros de 
internacionalización definidos en "currency". Muestra el numero formateado pero se almacena
el numero correcto lo que permite al componente padre hacer cálculos
-->
    <div>
        <!--MOSTRAR FORMATEO-->
        <v-text-field
            title="introduzca la cifra sin puntos separadores de miles. Para introducir decimales utilice el punto (.) TAB para terminar."
            class="input"
            v-if="!display"
            filled dense 
            :value="currencyFormat(value)"
            @focus="display = !display"
            :readonly="readonly"
            >
        </v-text-field>
        <!--INTRODUCIR VALORES-->
        <v-text-field
            v-else
            class="input"
            title="introduzca la cifra sin puntos separadores de miles. Para introducir decimales utilice el punto (.). Pulse TAB para terminar."
            type="number"
            v-model="value"
            filled dense
            @blur="display = !display"
            :readonly="readonly"
            >
        </v-text-field>
    </div>
</template>

<script>
    import {currencyFormat} from '@/assets/mixins/currencyFormat';

    export default {
        name: 'MoneyField',

        props: ['input','readonly'],
        mixins: [currencyFormat],

        data(){
            return {
                value: undefined,
                readValue: false,
                display: false,
            }
        },

        created(){
            if(this.input !== undefined){
                this.value = this.input;
            }
        },

        watch:{
            value(){
                this.outerValue(this.value)
            }
        },

        methods:{
            outerValue(value){
                this.$emit("output", value)
            }
        }
    }
</script>