<template>
    <v-row justify="center" no-gutters>
        <v-col sm="8" md="5" xl="3">
            <v-card v-if="!isLoggedIn" :loading="isLoading">
                <v-card-title>Log in</v-card-title>
                <v-card-subtitle>Please enter your credentials</v-card-subtitle>
                <v-form class="pa-4" ref="loginForm">
                    <v-text-field
                        v-model="email"
                        label="Email"
                        type="email"
                        :rules="emailRules"
                        outlined
                        @keyup.enter="login({email, password})"
                        required>
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        :rules="passwordRules"
                        outlined
                        @keyup.enter="login({email, password})"
                        required>
                    </v-text-field>
                    <div class="d-flex justify-center">
                        <v-btn 
                            raised 
                            color="primary" 
                            class="mx-auto"
                            :disabled="!isValid"
                            @click.prevent="login({email, password})">
                            Log in
                        </v-btn>
                    </div>
                </v-form>
            </v-card>
            <v-card v-else class="pb-5">
                <v-card-title>Welcome!</v-card-title>
                <v-card-subtitle>Where do you want to start?</v-card-subtitle>
                <div class="d-flex justify-space-around mb-4">
                    <v-btn raised color="primary" to="/skills">skills</v-btn>
                    <v-btn raised color="primary" to="/portfolio">portfolio</v-btn>
                    <v-btn raised color="primary" to="/pens">pens</v-btn>
                </div>                
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { AuthActions } from '../store/actions';
import { UI, Auth } from '../store/getters';

export default Vue.extend({
    data() {
        return {
            email: '',
            emailRules: [
                (v: string) => !!v || 'Email is required',
                (v: string) => /.+@.+\..+/.test(v) || 'Email is not valid',
            ],
            password: '',
            passwordRules: [
                (v: string) => !!v || 'Password is required',
            ],
        };
    },
    computed: {
        ...mapGetters({
            isLoading: UI.IS_LOADING,
            isLoggedIn: Auth.IS_LOGGED_IN,
        }),
        emailValid(): boolean {
            return /.+@.+\..+/.test(this.email);
        },
        isValid(): boolean {
            return this.emailValid && !!this.password.length;
        },
    },
    methods: {
        ...mapActions({
            login: AuthActions.LOGIN,
        }),
    },
});
</script>
