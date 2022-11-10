<template>


    <div>
        <b-form @submit="login" class="mt-5">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
            >
                <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
                <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                ></b-form-input>
            </b-form-group>
        </b-form>
        <div class="alternative-option mt-4">
            {{ $t('registration') }} <b-button variant="outline-success" @click="moveToRegister">{{ $t('register') }}</b-button>
        </div>
        <b-button variant="outline-primary" @click="login">{{ $t('login') }}</b-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
        };
    },
    methods: {
        login() {
            this.$store.dispatch('Auth/login', this.form).then(resp => {
                this.$store.commit('Auth/setToken', resp.data.token)
                this.$store.commit('Auth/setIsLoggedIn', true, {root: true});
            })
        },
        moveToRegister() {
            this.$bvModal.show('register');
        }
    },
};
</script>
