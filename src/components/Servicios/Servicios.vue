<template>
    <div>
        <h2>Currency Demo</h2>
        <hr/>
        <br/>
        <v-row>
            <v-col cols="2">
                Campo 1
                <MoneyField @value="(data)=> campo1 = data"></MoneyField>
            </v-col>
            <v-col cols="2">
                Campo 2
                <MoneyField @value="(data)=> campo2 = data"></MoneyField>
            </v-col>
            <v-col cols="2">
                Campo 3
                <MoneyField @value="(data)=> campo3 = data"></MoneyField>
            </v-col>
            <v-col cols="2">
                Campo 4
                <MoneyField @value="(data)=> campo4 = data"></MoneyField>
            </v-col>
            <v-col cols="2">
                Campo 5
                <MoneyField @value="(data)=> campo5 = data"></MoneyField>
            </v-col>
            <v-col cols="2">
                Campo 6
                <MoneyField @value="(data)=> campo6 = data"></MoneyField>
            </v-col>
        </v-row>
        <br/>
        <div>
            <hr/>
            <br/>
            <h3>Los valores almacenados son:</h3>
            {{campo1}}<br/>
            {{campo2}}<br/>
            {{campo3}}<br/>
            {{campo4}}<br/>
            {{campo5}}<br/>
            {{campo6}}<br/>
            <br/>
            <hr/>
            <br/>
            <h3>La suma es: {{total}} €</h3> 
        </div>
    </div>
</template>

<script>

import MoneyField from "@/components/common/MoneyField";

    export default {
        name: 'campoMonedaFormateado',
        components: {MoneyField},

        watch:{
            campo1(){
                this.sumaAll()
            },
            campo2(){
                this.sumaAll()
            },
            campo3(){
                this.sumaAll()
            },
            campo4(){
                this.sumaAll()
            },
            campo5(){
                this.sumaAll()
            },
            campo6(){
                this.sumaAll()
            },
        },

        data(){
            return {
                total: 0,
               campo1: 0,
               campo2: 0,
               campo3: 0,
               campo4: 0,
               campo5: 0,
               campo6: 0,
               campo7: 0,
            }
        },

        methods:{
            sumaAll(){
                this.total = this.campo1+this.campo2+this.campo3+this.campo4+this.campo5+this.campo6;
            }
        }

    
    }
</script>
