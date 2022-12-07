<template>
    <v-app class="section-bg">
        <v-app-bar app color="white" dark>
            <v-container>
                <div class="d-flex align-center">
                    <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="./assets/main.svg"
                        transition="scale-transition"
                    />
                </div>
            </v-container>
            <b-button  v-if="isLoggedIn"  v-b-modal.add_car variant="outline-success">+ მანქანა</b-button>
            <b-button  v-if="isLoggedIn"  v-b-modal.add_owner variant="outline-success">+ მომხმარებელი </b-button>
            <b-button v-if="isLoggedIn" @click="logout()" variant="outline-primary">გასვლა</b-button>
        </v-app-bar>
        <v-container>
            <v-main class="mt-6">
                <Login v-if="!isLoggedIn"></Login>
                <Register v-if="!isLoggedIn"></Register>
                <Statistics v-if="isLoggedIn"></Statistics>
            </v-main>
        </v-container>
    </v-app>

</template>

<script>
import Statistics from "./components/Statistics";
import Register from "./components/Register";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
    name: 'App',
    components: {
        Login,
        Register,
        Statistics,
    },
    methods: {
        logout(){
            this.$store.dispatch('Auth/logout')
        }
    },
    computed: {
        isLoggedIn: {
            get() {
                return this.$store.state.Auth.isLoggedIn;
            }
        },
    },
    beforeCreate() {
        if (localStorage.getItem('token')) {
            this.$store.dispatch('Auth/getUserInfo').catch(() => {
                this.$root.$emit('logout');
            })
        }
    }
}
</script>

<style>

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}


#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
