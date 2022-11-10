<template>
    <div>
        <b-modal title="New User Registration" centered id="register">

            <div id="errors" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </div>
            <b-form-group label="Name">
                <b-input type="text"  v-model="user.name"></b-input>
            </b-form-group>
            <b-form-group label="Email Address">
                <b-input type="email"  v-model="user.email"></b-input>
            </b-form-group>
            <hr/>
            <b-form-group label="Password">
                <b-input type="password"  v-model="user.password"></b-input>
            </b-form-group>
            <template #modal-footer>
                <button @click="register" class="btn btn-primary">Register</button>
            </template>
        </b-modal>
    </div>
</template>

<script>

export default {
    name: "Register",
    data() {
        return {
            errors: [],
            user: {
                name: null,
                email: null,
                password: null,
            }
        }
    },
    methods: {
        register(e) {
            e.preventDefault();
            const self = this;
            this.$store.dispatch('Auth/register', this.user).then(response => {
                self.$bvModal.hide("register");
            }).then(error => {
                e.preventDefault();
            });
        },
    }
}
</script>

<style scoped>
#errors {
    padding: 5px;
    background-color: #ff4444;
    border-radius: 5px;
    color: white;
    opacity: 0.8;
}

#errors b {
    color: white;
}

#errors ul li {
    list-style: none;
    color: white;
}
</style>
