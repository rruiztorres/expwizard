<template>
  <v-app id="agexApp">
    <v-app-bar
      dark
      color="indigo accent-4" 
      app
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>AGEX</v-toolbar-title>
      <v-spacer></v-spacer>
      <img src="../assets/logo_web_IGN_CNIG.png">
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    </v-navigation-drawer>    
    <v-main class="grey lighten-2 mainApp">
      <v-container v-if="selector === false">
        <Assistant @back="verSeleccion">
        </Assistant>
      </v-container>
      
      <v-container v-else>
        <v-row class="searchBar">
          <v-col cols="12">
            <v-text-field solo rounded placeholder="BUSCAR"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <Selector 
              @tipoExp="seleccionTipo">
            </Selector>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Assistant from "@/components/Assistant"
import Selector from '../components/Selector.vue'

  export default {
    components: {Assistant, Selector},

    data () {
        return {
            drawer: null,
            selector: true,
        }
    },

    methods:{
      seleccionTipo(tipoExp){
        this.selector = false;
        this.tipoExp = tipoExp;
      },

      verSeleccion(verSeleccion){
        this.selector = verSeleccion;
      }
    }
  }
</script>

<style scoped>
    h1,h2,h3,h4, #agexApp {
        font-weight: 400;
    }

    .appBar{
      background-color: red;
    }

    .mainApp{
      background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
      height: 50vh;
      overflow-y: auto;
    }

    .title{
        margin-top: 1rem;
    }

    .sheet{
        padding: 1rem;
        border-radius: 4px;
    }

    .sheet>img {
        display: block;
        margin: 0 auto 1rem auto;
    }

    .sheet>p{
        text-align: center;
        font-weight: 600;
    }

    .sheet:hover{
        opacity: 0.7;
        box-shadow: 1px 1px 8px 1px black;
    }

    .searchBar {
      margin-top: 1rem;
      height: 5rem;
    }

    .searchTitle{
      height: 100%;
    }

    .searchTitle > * {
      margin-top: 0.8rem;
    }

</style>