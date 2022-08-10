import { SnackbarState, Context } from '../../models/stores';

const state: SnackbarState = {
    shown: false,
    hasError: false,
    message: '',
    timeout: 3000,
};

const getters = {
    snackbarShown(st: SnackbarState): boolean {
        return st.shown;
    },
    snackbarError(st: SnackbarState): boolean {
        return st.hasError;
    },
    snackbarMessage(st: SnackbarState): string {
        return st.message;
    },
    snackbarTimeout(st: SnackbarState): number {
        return st.timeout;
    },
};

const mutations = {
    setShow(st: SnackbarState, value: boolean): void {
        st.shown = value;
    },
    setError(st: SnackbarState, value: boolean): void {
        st.hasError = value;
    },
    setMessage(st: SnackbarState, message: string): void {
        st.message = message;
    },
    setSbTimeout(st: SnackbarState, timeout: number): void {
        st.timeout = timeout;
    },
};

const actions = {
    showError(context: Context, message: string): void {
        context.commit('setError', true);
        context.commit('setSbTimeout', 6000);
        context.commit('setMessage', message);
        context.commit('setShow', true);
    },
    showSuccess(context: Context, message: string): void {
        context.commit('setError', false);
        context.commit('setSbTimeout', 3000);
        context.commit('setMessage', message);
        context.commit('setShow', true);
    },
    closeSnackbar(context: Context): void {
        context.commit('setShow', false);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
