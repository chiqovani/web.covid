<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>

                <b-nav-item right>
                    <select v-model="$i18n.locale">
                        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
                    </select>
                </b-nav-item>
                <b-nav-item-dropdown text="User" right>
                    <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>

export default {
    name: "Navbar",
    methods: {
        logout(){
            this.$store.dispatch('Auth/logout')
        }
    }
}

</script>

<style scoped>

</style>
