/<template>
  <v-app id="agexApp">
    <v-main>
      <div class="wrapper fadeInDown float">
        <div id="formContent">

          <!-- Logo -->
          <div class="fadeIn first logo">
            <h1>AGEX</h1>
            <h4>Asistente Generación Expedientes</h4>
            <img class="imgLogo" src="@/assets/img/logo_web_IGN_CNIG.svg" id="icon" alt="User Icon" />
          </div>

          <!-- Login -->
          <v-text-field 
            filled 
            class="fadeIn second inputText" 
            placeholder="Nombre de usuario"
            v-model="usuario" 
          >
          </v-text-field>
          <v-text-field 
            filled 
            class="fadeIn third inputText" 
            placeholder="Password" 
            v-model="password"
            :type="passwordType"
            ></v-text-field>
          <v-switch
            class="inputText switcher"
            inset
            dense
            label="Mostrar Contraseña"
            v-model="activatePassword"
          ></v-switch>
          <v-btn large class="fadeIn fourth logInButton" dark color="#4281f5" @click="checkData">LOG IN</v-btn>
          
          <!--ALERTA LOGIN-->
          <v-alert class="alert" type="error" v-model="alertLogin">{{alertLoginMensaje}}</v-alert>


          <!-- Recordar Password -->
          <div id="formFooter">
            <a class="underlineHover">Contraseña olvidada?</a>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import md5 from 'md5'

export default {
  name: "Home",

  data() {
    return {
      usuario: "",
      password: "",
      error: false,
      error_msg: "",
      errorAPI: "",
      passwordType: 'password',
      activatePassword: false,
      alertLogin: false,
      alertLoginMensaje: '',

      rules: {
        usrNameRules: [],
        passRules: [],
      },

      activateShowPassword: false,
    };
  },

  watch:{
    activatePassword(){
      if(this.activatePassword === false){
        this.passwordType = 'password'
      } else {
        this.passwordType = 'text'
      }
    },

    usuario(){
      this.alertLogin = false
    },

    password(){
      this.alertLogin = false
    }
  },

  methods:{
    checkData(){
      this.usrlogin = {
        usuario: this.usuario,
        password: md5(this.password),
      };

      axios
      .post(`${process.env.VUE_APP_API_ROUTE}/postAuth/${this.usrlogin.usuario}/${this.usrlogin.password}`)
      .then((data) => {
        if(data.status === 201){
          console.log(data.data.usuario)
          localStorage.usrName = data.data.usuario[0].usrname;
          localStorage.role = data.data.usuario[0].rol;
          localStorage.nombre = data.data.usuario[0].nombre;
          localStorage.apellidos = data.data.usuario[0].apellidos;

          this.login()
        } else {
          this.alertLogin = true;
          this.alertLoginMensaje = data.data.mensaje
        }
      })
    },

    login(){
      this.$router.push("Dashboard");
    }
  }
}

</script>

<style scoped>

body {
  height: 100vh;
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
}

h1 {
  font-size: 3.5rem;
}

h1, h4 {
  font-weight: 300 !important;
}

h2 {
  text-align: center;
  display:inline-block;
  margin: 40px 8px 10px 8px; 
}

.alert {
  margin: 1rem;
}

#agexApp {
background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
height: 100vh;
}


.backImage {
  width: 100vw !important;
}

.logo {
  margin: 2rem 0rem 1rem 0rem;
  color: gray;
  font-weight:500;
}

.logo>img {
  margin-top: 1rem;
}

/* STRUCTURE */
.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

.logInButton {
  margin: 1rem auto;
  display: block;
  width: 93%;
}

.logInButton>input{
  display: block;
  width: 85%;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}

.inputText {
  padding: 0rem 1rem !important;
}

/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.2s;
  -moz-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
  animation-delay: 0.3s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
  animation-delay: 0.5s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: green;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}


/* OTHERS */
*:focus {
    outline: none;
} 
#icon {
  width:70%;
}
* {
  box-sizing: border-box;
}
.switcher {
  margin-top: -1rem;
}

</style>
