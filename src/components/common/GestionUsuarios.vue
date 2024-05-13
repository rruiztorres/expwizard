<template> 
    <div id="wrapper">
       
        <h2>Gestionar Usuarios</h2>

        <!-- ACCIONES GLOBALES -->
        <v-card class="sectionWrapper">
            <v-row dense>
                <v-col cols="12">   
                    <h3>Acciones globales</h3>
                </v-col>
                <v-col cols="12" md="6" lg="1">
                    <v-btn
                        block
                        color="success"
                        @click="makeNewUser">
                    Añadir
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" lg="1">
                    <v-btn
                        :disabled="selected.length < 1"
                        block
                        color="warning"
                        @click="setDisabled"
                        >
                    Desactivar
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" lg="1">
                    <v-btn
                        :disabled="selected.length < 1"
                        block
                        color="error"
                        @click="deleteUsers"
                        >
                    Eliminar
                    </v-btn>
                </v-col>
                <v-col cols="12" md="12" lg="9">
                    <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar"
                    hide-details
                    filled dense
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card>
        
        <!-- DATA TABLE -->
        <v-card class="sectionWrapper">
            <v-data-table
                :headers="usrHeaders"
                :items="usuarios"
                :items-per-page="-1"
                :search="search"
                show-select
                hide-default-footer
                item-key="id_usuario"
                v-model="selected"
                :loading="loadTable"
                loading-text="Cargando datos. Por favor, espere..."
            >   
               
                <!-- ACTIVO -->
                <template v-slot:[`item.estado`]="props">
                    <v-btn v-if="props.item.estado === true" x-small color="success">Activo</v-btn>
                    <v-btn v-else x-small color="error">Inactivo</v-btn>
                </template>

                <!-- ACCIONES -->
                <template v-slot:[`item.actions`]="props">
                    <v-btn block small color="info" @click="editUser(props.item)">Editar</v-btn>
                </template>
            </v-data-table>
        </v-card>

        <!-- VENTANA ALTA / EDICIÓN USUARIO -->
        <v-overlay :value="showNewUserWindow">
            <v-card light class="newUserCard">
                <v-card-title class="newUserTitle">
                    <span v-if="newUser.id_usuario === undefined">Nuevo Usuario</span>
                    <span v-else>Editando usuario: <b>{{newUser.usrname}}</b></span>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn class="actionBtn" color="error" @click="()=>showNewUserWindow=false">Cerrar</v-btn>
                        <v-btn v-if="newUser.id_usuario === undefined" class="actionBtn" color="success" @click="submitUser" :disabled="!valid">Aceptar</v-btn>
                        <v-btn v-else class="actionBtn" color="success" @click="submitEditedUser" :disabled="!valid">Aceptar</v-btn>

                    </v-card-actions>
                </v-card-title>
                <v-card-text class="newUserContainer" v-if="!loading">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row dense>
                            <!-- AVATAR -->
                            <v-col cols="12" style="text-align:center; margin-bottom:1rem;">
                                <v-avatar
                                color="teal"
                                size="120"
                                >
                                <h1 style="color:white; font-size:280%;">
                                    {{getInitials(newUser)}}
                                </h1>
                                </v-avatar>
                            </v-col>

                            <!-- NOMBRE -->
                            <v-col cols="12" md="5">
                                <v-text-field :rules="[rules.nonEmpty]"
                                filled dense label="Nombre" v-model="newUser.nombre"></v-text-field>
                            </v-col>

                            <!-- APELLIDOS -->
                            <v-col cols="12" md="5">
                                <v-text-field 
                                :rules="[rules.nonEmpty]"
                                filled dense label="Apellidos" v-model="newUser.apellidos"></v-text-field>
                            </v-col>

                            <!-- ACTIVO -->
                            <v-col cols="12" md="2">
                                <v-switch style="margin:0.7rem 0rem 0rem 0.7rem"
                                inset v-model="newUser.activo" label="¿Activo?"></v-switch>
                            </v-col>   
                            
                            <!-- SUBDIRECCION -->
                            <v-col cols="12" md="6">
                                <v-select
                                dense 
                                label="Subdirección"
                                :items="subdirecciones" v-model="newUser.subdireccion" 
                                filled></v-select>
                            </v-col>

                            <!-- EMAIL -->
                            <v-col cols="12" md="6">
                                <v-text-field filled dense label="E-mail de contacto" v-model="newUser.email"></v-text-field>
                            </v-col>

                            <!-- ROL -->
                            <v-col cols="12" md="6">
                                <v-select
                                dense 
                                label="Rol"
                                :items="roles" v-model="newUser.rol" 
                                filled></v-select>
                            </v-col>

                            <!-- USRNAME -->
                            <v-col cols="12" md="6">
                                <v-text-field :rules="[rules.usrExists, rules.nonEmpty]"
                                filled dense label="Nombre de usuario" v-model="newUser.usrname">
                                    <template v-slot:append>
                                        <div v-if="newUser.usrname">
                                            <v-icon color="success" v-if="!checkUsrName(newUser.usrname)">mdi-check-bold</v-icon>
                                            <v-icon color="error" v-else>mdi-alert-circle</v-icon>
                                        </div>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <!-- PASSWORD -->
                            <v-col cols="12" md="4">
                                <v-text-field 
                                :disabled="passRecomended"
                                filled dense label="Password recomendado" v-model="newUser.password"></v-text-field>
                            </v-col>

                            <!-- OMITIR RECOMENDADO -->
                            <v-col cols="12" md="4">
                                <v-switch style="margin:0.7rem 0rem 0rem 0.7rem"
                                inset v-model="passRecomended" label="Ignorar Recomendado"></v-switch>
                            </v-col>

                            <!-- PASSWORD  PERSONALIZADO -->
                            <v-col cols="12" md="4">
                                <v-text-field 
                                :disabled="!passRecomended"
                                filled dense label="Password personalizado" v-model="newUser.password"></v-text-field>
                            </v-col> 
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-text class="" v-else>
                    <div style="text-align:center; padding:3rem;">
                        <v-progress-circular
                        :size="160"
                        :width="8"
                        color="#00BCD4"
                        indeterminate
                        >
                        <h5>Procesando</h5>
                        </v-progress-circular>
                    </div>
                </v-card-text>
            </v-card>
        </v-overlay>

        <!-- MENSAJES INFORMACIÓN -->
        <v-overlay :value="showMessage" absolute>
            <v-alert :type="messageType">
                {{messageText}}
            </v-alert>
        </v-overlay>
    </div>
</template>

<script>
import {getColor} from "@/assets/mixins/getColor";
import axios from 'axios';
import md5 from 'md5';


    export default {
        name: 'GestionUsuarios',
        mixins: [getColor],
        data(){
            return{
                search: '',
                selected: [],
                usrHeaders: [
                    {width:"10%", text: 'Nombre', align:'start', sortable: true, value:'nombre'},
                    {width:"15%", text: 'Apellidos', align:'start', sortable: true, value:'apellidos'},
                    {width:"7%", text: 'Estado', align:'start', sortable: true, value: 'estado'},
                    {width:"8%", text: 'Username', align: 'start', sortable: true, value:'usrname'},
                    {width:"10%", text: 'Rol', align:'start', sortable: true, value: 'rol'},
                    {width:"19%", text: 'Subdirección', align: 'start', sortable: true, value: 'subdireccion'},
                    {width:"25%", text: 'Mail contacto', align: 'start', sortable: true, value:'email'},
                    {width:"6%", text: 'Acciones', align:'center', sortable: false, value: 'actions'}
                ],
                usuarios: [],
                editingUser: undefined,
                toggle: false,
                showNewUserWindow: false,
                newUser:{
                    nombre: undefined,
                    apellidos: undefined,
                    usrname: undefined,
                    rol: undefined,
                    email: undefined,
                    subdireccion: 'Secretaría General',
                    password: undefined,
                    activo: true,
                },
                roles: [],
                loading: true,
                passRecomended: false,
                usrNames: undefined,
                rules: {
                    nonEmpty: (value) => value !== "" || 'Este campo es obligatorio',
                    usrExists: (value) => !this.checkUsrName(value) || "El nombre de usuario ya existe",
                },
                valid: false,
                loadTable: true,

                //MENSAJES DE INFORMACIÓN
                showMessage: false,
                messageType: 'info',
                messageText: undefined,
            }
        },

        mounted(){
            this.initialize();
        },

        watch:{
            passRecomended(){
                if(this.passRecomended === true){
                    this.newUser.password = undefined
                } else {
                    this.newUser.password = this.generatePassword();
                }
            }
        },

        methods:{
            validate() {
                this.$refs.form.validate();
            },

            generatePassword(){
                let generate = require('password-generator')
                const newPass = generate(12, false);
                return newPass
            },

            throwMessage(type, msg, timeout){
                this.showMessage = true;
                this.messageType = type;
                this.messageText = msg;
                setTimeout(()=>{this.showMessage = false}, timeout)
            },

            async getParameters(){
                await axios
                .get(`${process.env.VUE_APP_API_ROUTE}/parameters`)
                .then((data)=>{
                    if(data.status===200){ 
                        this.subdirecciones = data.data.response.subdirecciones.map((subdir)=>subdir.nombre_subdir)
                        this.roles = data.data.response.roles.map((roles)=>roles.rol);
                    }
                    this.loading = false;
                    this.validate();
                })
            },

            async initialize(){
                await axios
                .get(`${process.env.VUE_APP_API_ROUTE}/users`)
                .then((data) => {
                    if(data.status === 200){
                        this.usuarios = data.data.response;
                        this.usrNames = this.usuarios.map((usuario)=>usuario.usrname)
                    }
                    this.loadTable = false;
                })
                this.getParameters();
            },

            async submitUser(){
                this.loading = true;
                this.newUser.password = md5(this.newUser.password);
                await axios
                .post(`${process.env.VUE_APP_API_ROUTE}/users/submitUser`, this.newUser)
                .then((data)=>{
                    if(data.status === 201){
                        this.loading = false;
                        this.showNewUserWindow = false;
                        this.throwMessage('success', 'Usuario dado de alta correctamente', 2000)
                        this.initialize();
                    }
                })
            },

            async submitEditedUser(){
                this.loading = true;
                this.newUser.password = md5(this.newUser.password);
                await axios
                .put(`${process.env.VUE_APP_API_ROUTE}/users/submitEditUser`, this.newUser)
                .then((data)=>{
                    if(data.status === 201){
                        this.showNewUserWindow = false;
                        this.throwMessage('success', 'Usuario editado correctamente', 2000)
                        this.initialize();
                    }
                    this.loading = false;
                })
            },

            async deleteUsers(){
                this.loading = true;
                await axios
                .delete(`${process.env.VUE_APP_API_ROUTE}/users/submitDelete`, {data: this.selected})
                .then((data)=>{
                    if(data.status === 201){
                        this.loading = false;
                        this.showNewUserWindow = false;
                        this.throwMessage('success', 'Usuario/s eliminado/s correctamente', 2000)
                        this.initialize();
                    } else {
                        this.loading = false;
                        this.showNewUserWindow = false;
                        this.throwMessage('warning', 'No se llevó a cabo ninguna acción. Por favor, revise los datos', 3000)
                        this.initialize();
                    }
                    //REINICIO DE SELECCION
                    this.selected = [];                   
                })
            },

            makeNewUser(){
                this.passRecomended = false;
                this.newUser = {
                    nombre: undefined,
                    apellidos: undefined,
                    usrname: undefined,
                    rol: undefined,
                    email: undefined,
                    subdireccion: 'Secretaría General',
                    password: this.generatePassword(),
                    activo: true,
                },
                this.showNewUserWindow = true;
            },

            editUser(user){
                this.newUser = user;
                this.passRecomended = true;
                this.editingUser = user.usrname;
                this.showNewUserWindow = true;
            },

            setDisabled(){
                this.selected.forEach((user)=>{
                    user.estado = false;
                })
            },

            getInitials(input){
                let initials = '--'
                if(input.nombre && input.apellidos){
                    initials = (input.nombre.slice(0,1) + input.apellidos.slice(0,1)).toUpperCase();
                }
                return initials
            },

            checkUsrName(input){
                let alert = false;
                if(this.usrNames){
                    this.usrNames.forEach((usrName)=>{
                        if(input === usrName && input !== this.editingUser){
                            alert = true;
                        }
                    })
                } 
                return alert;
            }
        }
    }
</script>

<style scoped>
    #wrapper {
        width:98vw;
        margin:0 auto;
        max-height: 90vh;
        overflow-y: auto;
    }

    .sectionWrapper {
        padding:1rem;
        margin-bottom: 1rem;
    }

    h1, h2, h3 {
        font-weight: 400 !important;
    }

    h2{
        margin-bottom:1rem;
    }

    .newUserCard{
        width:60rem;
        max-width: 80vw;
    }

    .newUserTitle{
        font-weight: 400;
        color:white; 
        background-color: #00BCD4;
        height: 4rem;
        padding: 0rem 0.25rem 0rem 0.8rem;
    }

    .newUserContainer {
        margin-top: 1rem;
        max-height: 70vh;
        overflow-y: auto;
    }

    .actionBtn {
        font-weight: 400;
    }

    
</style>
