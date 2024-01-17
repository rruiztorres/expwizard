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
            filled solo
            dense
            :value="currencyFormat(value)"
            @focus="display = !display"
            >
        </v-text-field>
        <!--INTRODUCIR VALORES-->
        <v-text-field
            v-else
            class="input"
            title="introduzca la cifra sin puntos separadores de miles. Para introducir decimales utilice el punto (.). Pulse TAB para terminar."
            type="number"
            v-model="value"
            filled solo dense dark
            @blur="display = !display"
            >
        </v-text-field>
    </div>
</template>

<script>
    export default {
        name: 'MoneyField',
        data(){
            return {
                value: undefined,
                readValue: false,
                display: false,
            }
        },

        watch:{
            value(){
                this.$emit("value", parseFloat(this.value))
            }
        },
        
        methods:{
            currencyFormat(value){
                if(!isNaN(value)){
                    let euro = Intl.NumberFormat('es-ES', {
                        style: 'currency',
                        currency: 'EUR',
                        useGrouping: true,
                    });
                    return (`${euro.format(value)}`);
                }
            },
        }
    }
</script>