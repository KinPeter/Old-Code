import { UIState, Context } from '../../models/stores';

const state: UIState = {
    isLoading: false,
};

const getters = {
    isLoading(st: UIState): boolean {
        return st.isLoading;
    },
};

const mutations = {
    setLoading(st: UIState, value: boolean): void {
        st.isLoading = value;
    },
};

const actions = {
    startLoading(context: Context): void {
        context.commit('setLoading', true);
    },
    stopLoading(context: Context): void {
        context.commit('setLoading', false);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
