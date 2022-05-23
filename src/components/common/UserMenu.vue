<template> 
    <div>
        <v-list>
            <v-list-item>
            <v-list-item-avatar>
                <v-avatar
                :color="userColor"
                size="52"
                >
                <span class="whiteText">{{userInitials}}</span>
                </v-avatar>
            </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
            <v-list-item-content>
                <v-list-item-title class="text-h6">
                {{userNombre}}
                </v-list-item-title>
                <v-list-item-subtitle>{{userRole}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list
            nav
            dense
        >
            <v-list-item-group
            v-model="selectedItem"
            color="primary"
            >
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="activeMenu(item.menu)"
                >   
                    <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
        
        <v-divider></v-divider>
        <v-list>
            <v-list-item>
                <v-btn class="whiteText" dark color="red" width="100%"
                @click="doLogout"
                ><v-icon class="logoutIcon">mdi-account-arrow-left</v-icon>Cerrar Sesión</v-btn>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: 'UserMenu',

        data(){
            return {
                //VARIABLES DE USUARIO
                userNombre: 'Judith Sánchez',
                userInitials: 'JS',
                userRole: 'Admin',
                userColor: 'purple',


                //MENU CONTROL
                selectedItem: 0,
                items: [
                    { text: 'Nuevo Expediente', icon: 'mdi-file-document', menu: 'selector' },
                    { text: 'Mis expedientes', icon: 'mdi-folder', menu: 'misExpedientes' },
                    { text: 'Estado expedientes', icon: 'mdi-folder-clock', menu: '' },
                    { text: 'Usuarios', icon: 'mdi-account-multiple', menu: 'foo3' },
                    { text: 'Cambios', icon: 'mdi-history', menu: 'foo4' },
                ],
            }
        },

        created(){
            this.initialize();
        },

        methods: {
            initialize(){
                this.apellido = (localStorage.apellidos.split(" "))[0]
                this.userNombre = localStorage.nombre + " " + this.apellido;
                this.userRole = localStorage.role;
                this.userInitials = localStorage.nombre.slice(0,1) + this.apellido.slice(0,1)
            },

            activeMenu(menu){
                this.$emit('activeMenu', menu)
            },

            doLogout() {
                localStorage.usrName = null;
                localStorage.role = null;
                localStorage.nombre = null;
                localStorage.apellidos = null;
                this.userInitials = undefined;

                this.$router.push("/");
            }
        },
    }
</script>

<style scoped>

    .whiteText{
        font-weight: 400;
        color:white;
        font-size: 1.2rem;
    }

    .logoutIcon {
        margin-right: 0.5rem;
    }
</style>    