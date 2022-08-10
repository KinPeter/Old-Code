<template>
    <main>
        <bs-skills></bs-skills>
        <bs-techs></bs-techs>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { SkillsActions } from '../store/actions';
import SkillsEditVue from '../components/SkillsEdit.vue';
import OtherTechsEditVue from '../components/OtherTechsEdit.vue';

export default Vue.extend({
    components: {
        bsSkills: SkillsEditVue,
        bsTechs: OtherTechsEditVue,
    },
    created() {
        this.$store.dispatch(SkillsActions.FETCH_SKILLS);
        this.$store.dispatch(SkillsActions.FETCH_OTHERS);
    },
});
</script>
