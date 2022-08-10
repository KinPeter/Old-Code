<template>
    <v-snackbar
        top
        v-model="showSnackbar"
        :color="error ? 'error' : 'success'"
        :timeout="timeout"
    >
        <span v-if="error" class="mr-2"> <v-icon color="white">mdi-alert-circle</v-icon> </span>
        <span v-else class="mr-2"> <v-icon color="white">mdi-check-circle-outline</v-icon> </span>
        <span> {{ message }} </span>
        <v-spacer></v-spacer>
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { SnackbarActions } from '../store/actions';
import { Snackbar } from '../store/getters';

export default Vue.extend({
    methods: {
        ...mapActions({
            closeSnackbar: SnackbarActions.CLOSE_SNACKBAR,
        }),
    },
    computed: {
        ...mapGetters({
            shown: Snackbar.SHOWN,
            message: Snackbar.MESSAGE,
            error: Snackbar.ERROR,
            timeout: Snackbar.TIMEOUT,
        }),
        showSnackbar: {
            get() {
                return this.shown;
            },
            set(v: boolean) {
                this.closeSnackbar();
            },
        },
    },
});
</script>
