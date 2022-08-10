<template>
    <v-app-bar app color="secondary" dark>
        <v-toolbar-title class="headline text-uppercase">
            <span>P-kin.com</span>
            <span class="font-weight-light">/backstage</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="isLoggedIn">
            <v-btn text to="/skills">skills</v-btn>
            <v-btn text to="/portfolio"><span class="">portfolio</span></v-btn>
            <v-btn text to="/pens"><span class="">pens</span></v-btn>
            <v-btn text icon class="ml-5"
                @click="logout">
                <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Auth } from '../store/getters';
import { AuthActions } from '../store/actions';

export default Vue.extend({
    computed: {
        ...mapGetters({
            isLoggedIn: Auth.IS_LOGGED_IN,
        }),
    },
    methods: {
        logout(): void {
            this.$store.dispatch(AuthActions.LOGOUT);
        },
    },
});
</script>
