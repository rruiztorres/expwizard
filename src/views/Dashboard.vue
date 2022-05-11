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
      <UserMenu
        @activeMenu="activeOption"
      >
      </UserMenu>
    </v-navigation-drawer>  
      
    <v-main class="grey lighten-2 mainApp">
      <!-- MENU MIS EXPEDIENTES -->
      <v-container v-if="active === 'misExpedientes'">
        <v-row class="rowWrapper">
          <v-col cols="12">
            <MisExpedientes></MisExpedientes>
          </v-col>
        </v-row>
      </v-container>

      <!-- SELECTOR DE TIPOS EXPEDIENTE -->   
      <v-container v-if="active === 'selector'">
        <v-row class="rowWrapper">
          <v-col cols="12">
            <Selector 
              @tipoExp="activeOption">
            </Selector>
          </v-col>
        </v-row>
      </v-container>

      <!-- WIZARDS -->
      <v-container v-if="active === 'PCAP'">
        <v-row class="rowWrapper">
          <v-col cols="12">
            <SuministroAbierto @back="activeOption">
            </SuministroAbierto>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="active === 'SERVICIOS'">
        <v-row class="rowWrapper">
          <v-col cols="12">
            <Servicios>
            </Servicios>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserMenu from "@/components/common/UserMenu"
import SuministroAbierto from "@/components/SuministroAbierto/SuministroAbierto"
import Servicios from "@/components/Servicios/Servicios"
import Selector from "@/components/common/Selector"
import MisExpedientes from "@/components/common/MisExpedientes"

  export default {
    components: {
      UserMenu, 
      SuministroAbierto, 
      Servicios,
      Selector,
      MisExpedientes,
    },

    data () {
        return {
            drawer: null,
            active: 'selector',
        }
    },

    methods:{
      activeOption(option){
        this.active = option;
        this.drawer = false;
      },
    }
  }
</script>

<style scoped>
    h1,h2,h3,h4, #agexApp {
        font-weight: 400;
    }

    .rowWrapper {
      margin-top: 1rem;
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

</style>