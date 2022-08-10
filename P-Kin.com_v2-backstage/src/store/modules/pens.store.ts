import { Context, HttpOptions } from '../../models/stores';
import { Pen, PensState } from '../../models/pens';
import { HttpActions, PensActions } from '../actions';

const state: PensState = {
    pens: [],
};

const getters = {
    pens(st: PensState): Pen[] {
        return st.pens;
    },
};

const mutations = {
    setPens(st: PensState, pens: Pen[]): void {
        st.pens = pens;
    },
};

const actions = {
    fetchPens(context: Context): void {
        const requestOptions: HttpOptions = {
            method: 'GET',
            endpoint: 'pen-items.json',
            successAction: PensActions.POPULATE_PENS,
            errorMessage: 'Unable to fetch Pens data',
        };
        context.dispatch(HttpActions.SEND_REQUEST, requestOptions);
    },
    populatePens(context: Context, pens: Pen[]): void {
        context.commit('setPens', pens);
    },
    movePenUp(context: Context, index: number): void {
        const newIndex = index - 1;
        const copyArr = [...context.getters.pens];
        const currentElem = copyArr.splice(index, 1)[0];
        copyArr.splice(newIndex, 0, currentElem);
        context.commit('setPens', copyArr);
    },
    movePenDown(context: Context, index: number): void {
        const newIndex = index + 1;
        const copyArr = [...context.getters.pens];
        const currentElem = copyArr.splice(index, 1)[0];
        copyArr.splice(newIndex, 0, currentElem);
        context.commit('setPens', copyArr);
    },
    deletePen(context: Context, index: number): void {
        const copyArr = [...context.getters.pens];
        copyArr.splice(index, 1);
        context.commit('setPens', copyArr);
    },
    addNewPen(context: Context): void {
        const copyArr = [...context.getters.pens];
        copyArr.unshift({
            name: '',
            descr: '',
            codepenId: '',
            codepenTitle: '',
        });
        context.commit('setPens', copyArr);
    },
    savePens(context: Context): void {
        const requestOptions: HttpOptions = {
            method: 'PUT',
            endpoint: 'pen-items.json',
            data: context.getters.pens,
            successAction: PensActions.FETCH_PENS,
            successMessage: 'Pens are updated successfully.',
            errorMessage: 'Unable to save Pens.',
        };
        context.dispatch(HttpActions.SEND_REQUEST, requestOptions);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
