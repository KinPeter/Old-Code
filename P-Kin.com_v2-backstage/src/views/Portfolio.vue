<template>
    <main>
        <bs-portfolio></bs-portfolio>
        <bs-badges></bs-badges>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { PortfolioActions } from '../store/actions';
import PortfolioEditVue from '../components/PortfolioEdit.vue';
import PortfolioBadgesEditVue from '../components/PortfolioBadgesEdit.vue';

export default Vue.extend({
    components: {
        bsPortfolio: PortfolioEditVue,
        bsBadges: PortfolioBadgesEditVue,
    },
    created() {
        this.$store.dispatch(PortfolioActions.FETCH_PORTFOLIO);
        this.$store.dispatch(PortfolioActions.FETCH_FILTER_BADGES);
    },
});
</script>
