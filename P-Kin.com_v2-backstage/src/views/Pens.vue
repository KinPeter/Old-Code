<template>
    <bs-pens></bs-pens>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { PensActions } from '../store/actions';
import PensEditVue from '../components/PensEdit.vue';

export default Vue.extend({
    components: {
        bsPens: PensEditVue,
    },
    created() {
        this.$store.dispatch(PensActions.FETCH_PENS);
    },
});
</script>

<style lang="scss">
    
</style>