<template>
    <v-app>
        <bs-header></bs-header>
        <bs-snackbar></bs-snackbar>
        <v-content>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderVue from './components/Header.vue';
import SnackbarVue from './components/Snackbar.vue';

export default Vue.extend({
    name: 'App',
    components: {
        bsHeader: HeaderVue,
        bsSnackbar: SnackbarVue,
    },
});
</script>
