import { Context, HttpOptions } from '../../models/stores';
import { Skill, SkillState } from '../../models/skills';
import { HttpActions, SkillsActions } from '../actions';

const state: SkillState = {
    skills: [],
    otherTechs: [],
};

const getters = {
    skills(st: SkillState): Skill[] {
        return st.skills;
    },
    otherTechs(st: SkillState): string[] {
        return st.otherTechs;
    },
};

const mutations = {
    setSkills(st: SkillState, skills: Skill[]): void {
        st.skills = skills;
    },
    setOtherTechs(st: SkillState, otherTechs: string[]): void {
        st.otherTechs = otherTechs;
    },
};

const actions = {
    fetchSkills(context: Context): void {
        const requestOptions: HttpOptions = {
            method: 'GET',
            endpoint: 'skills.json',
            successAction: SkillsActions.POPULATE_SKILLS,
            errorMessage: 'Unable to fetch Skills data',
        };
        context.dispatch(HttpActions.SEND_REQUEST, requestOptions);
    },
    populateSkills(context: Context, skills: Skill[]): void {
        context.commit('setSkills', skills);
    },
    fetchOtherTechs(context: Context): void {
        const requestOptions: HttpOptions = {
            method: 'GET',
            endpoint: 'other-techs.json',
            successAction: SkillsActions.POPULATE_OTHERS,
            errorMessage: 'Unable to fetch Other Techs data',
        };
        context.dispatch(HttpActions.SEND_REQUEST, requestOptions);
    },
    populateOtherTechs(context: Context, otherTechs: string[]): void {
        context.commit('setOtherTechs', otherTechs);
    },

// SKILLS
    moveItemUp(context: Context, index: number): void {
        const newIndex = index - 1;
        const copyArr = [...context.getters.skills];
        const currentElem = copyArr.splice(index, 1)[0];
        copyArr.splice(newIndex, 0, currentElem);
        context.commit('setSkills', copyArr);
    },
    moveItemDown(context: Context, index: number): void {
        const newIndex = index + 1;
        const copyArr = [...context.getters.skills];
        const currentElem = copyArr.splice(index, 1)[0];
        copyArr.splice(newIndex, 0, currentElem);
        context.commit('setSkills', copyArr);
    },
    deleteItem(context: Context, index: number): void {
        const copyArr = [...context.getters.skills];
        copyArr.splice(index, 1);
        context.commit('setSkills', copyArr);
    },
    addNewItem(context: Context): void {
        const copyArr = [...context.getters.skills];
        copyArr.unshift({ language: '', level: 5 });
        context.commit('setSkills', copyArr);
    },
    saveSkills(context: Context): void {
        const requestOptions: HttpOptions = {
            method: 'PUT',
            endpoint: 'skills.json',
            data: context.getters.skills,
            successAction: SkillsActions.FETCH_SKILLS,
            successMessage: 'Skills are updated successfully.',
            errorMessage: 'Unable to save skills.',
        };
        context.dispatch(HttpActions.SEND_REQUEST, requestOptions);
    },

// OTHER TECHS
    moveItemLeft(context: Context, index: number): void {
        const newIndex = index - 1;
        const copyArr = [...context.getters.otherTechs];
        const currentElem = copyArr.splice(index, 1)[0];
        copyArr.splice(newIndex, 0, currentElem);
        context.commit('setOtherTechs', copyArr);
    },
    moveItemRight(context: Context, index: number): void {
        const newIndex = index + 1;
        const copyArr = [...context.getters.otherTechs];
        const currentElem = copyArr.splice(index, 1)[0];
        copyArr.splice(newIndex, 0, currentElem);
        context.commit('setOtherTechs', copyArr);
    },
    deleteTech(context: Context, index: number): void {
        const copyArr = [...context.getters.otherTechs];
        copyArr.splice(index, 1);
        context.commit('setOtherTechs', copyArr);
    },
    addNewTech(context: Context): void {
        const copyArr = [...context.getters.otherTechs];
        copyArr.unshift('');
        context.commit('setOtherTechs', copyArr);
    },
    saveTechs(context: Context): void {
        const requestOptions: HttpOptions = {
            method: 'PUT',
            endpoint: 'other-techs.json',
            data: context.getters.otherTechs,
            successAction: SkillsActions.FETCH_OTHERS,
            successMessage: 'Techs are updated successfully.',
            errorMessage: 'Unable to save techs.',
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
