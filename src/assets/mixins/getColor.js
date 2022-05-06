export const getColor = {
    methods: {
        getColor(estado){          
            if (estado == 'Pendiente Revisión') return '#ffcc00'            //naranja
            else if (estado == 'Enviado') return '#0066ff';                 //azul
            else if (estado == 'Revisado') return '#009933';                //verde
        }
    },
}

    
