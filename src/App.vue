<template>
    <v-app id="app">
      <v-card class="card">
        <div class="logoIGN"><img src="@/assets/ministerio_im.jpg"></div>
        <div class="logoWord"><img src="@/assets/word_logo.png"></div>
        <h1>Asistente Generación Expedientes</h1>
        <br/>
        <hr/>
        <br/>
        <v-btn color="info" @click="execute">
            Generar Word
        </v-btn>
      </v-card>
    </v-app>
</template>

<script>
import {renderDoc} from "@/assets/mixins/renderDoc";


  export default {
    mixins: [renderDoc],

      data(){
        return {
            datosDocumento: {
            nombre_usuario: 'Raul',
            apellido_usuario: 'Ruiz Torres',
            cargo_usuario: 'Delineante Cartográfico',
            titulo: 'Probando a generar documentos word',
            placeholder: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non ante id libero convallis volutpat et nec felis. Fusce sit amet diam id odio sollicitudin pellentesque fringilla pulvinar mauris. Maecenas vel cursus elit. Pellentesque sodales quam eget sem posuere laoreet. Nulla scelerisque sem a urna aliquet, vel maximus quam maximus. Donec neque urna, egestas et varius eu, placerat ut urna. Nunc blandit nisl non semper convallis. Morbi diam massa, ullamcorper vel commodo vitae, feugiat ut erat. Vestibulum venenatis quis nisl sed facilisis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum consequat sapien quis lobortis dignissim. Donec at diam a velit aliquet fringilla. Duis convallis id ligula in gravida. Proin velit leo, tincidunt finibus quam vitae, pretium consectetur ligula. Morbi feugiat mi quis metus iaculis, sed luctus tellus blandit.',
            información: 'Aqui metemos información relevante'
          },
        }
      },

      methods: {
          execute(){
            this.renderDoc(this.datosDocumento)
          }
      },
  };
</script>

<style scoped>
#app {
  background-color: lightblue;
}

.card{
  text-align: center;
  width: 35vw !important;
  height: 50vh;
  display: block;
  margin: 12rem auto auto auto;
  padding: 3rem;
}

.logoWord {
  width: 7rem;
  display: block;
  margin: 0 auto 1rem auto;
}

.logoWord>img {
  width:95%
}

.logoIGN{
  height: 5rem;
  margin-bottom: 2rem;
}

.logoIGN>img{
  height: 5rem;
}
</style>