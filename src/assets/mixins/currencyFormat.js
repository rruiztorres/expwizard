export const currencyFormat = {
    methods: {
        currencyFormat(value){
            if(!isNaN(value)){
                let euro = Intl.NumberFormat('es-ES', {
                    style: 'currency',
                    currency: 'EUR',
                    useGrouping: true,
                });
                this.$emit("value", parseFloat(value))
                return (`${euro.format(value)}`);
            }
        },
    },
}