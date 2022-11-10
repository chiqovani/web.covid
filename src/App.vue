
<template>
    <div id="app">
        <Login v-if="!isLoggedIn"></Login>
        <Register v-if="!isLoggedIn"></Register>
        <Navbar v-if="isLoggedIn"></Navbar>
        <Statistics v-if="isLoggedIn"></Statistics>
    </div>
</template>

<script>
import Statistics from "./components/Statistics";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default {
    name: 'App',
    components: {
        Login,
        Register,
        Statistics,
        Navbar
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
