<template>
<v-row justify="center">
    <v-col sm="12" md="10" lg="10" xl="8">
        <v-card :loading="isLoading">
            <div class="d-flex justify-space-between">
                <v-card-title>Edit Portfolio Items</v-card-title>
                <div class="mr-5 mt-n3" v-if="!isLoading">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab dark color="primary" class="mr-3" v-on="on" @click="addNew">
                                <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <span>Add new</span>
                    </v-tooltip>
                </div>
            </div>
            <v-container v-if="!isLoading">
                <v-expansion-panels>
                    <v-expansion-panel
                        v-for="(item, i) in portfolioSnapshot"
                        :key="item.id">
                        <v-expansion-panel-header class="font-weight-bold">{{ item.name }}</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div class="d-flex justify-end mb-n10">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab dark color="success" class="mr-3" v-on="on" @click="saveChanges(i)">
                                            <v-icon dark>mdi-content-save-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Save changes</span>
                                </v-tooltip>
                                <v-tooltip bottom v-if="!!item.id">
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab dark color="error" v-on="on" @click="deleteItem(item.id)">
                                            <v-icon dark>mdi-trash-can</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Delete this item</span>
                                </v-tooltip>
                            </div>

                            <v-row>
                                <v-col sm="4" class="py-0">
                                    <v-text-field 
                                        dense
                                        v-model.lazy="item.name"
                                        label="Name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="8" class="py-0">
                                    <v-textarea 
                                        dense auto-grow rows="2"
                                        v-model.lazy="item.descr"
                                        label="Description"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="12" class="pt-0">
                                    Badges
                                    <div class="d-flex flex-wrap">
                                        <v-card v-for="(badge, bi) in item.badges" 
                                            :key="bi" 
                                            class="mb-2 mr-2" 
                                            width="140" height="50">
                                            <v-container class="mt-n2 d-flex pr-0">
                                                <v-text-field
                                                    dense
                                                    v-model.lazy="item.badges[bi]">
                                                </v-text-field>
                                                <div class="d-flex mt-2">
                                                    <v-btn 
                                                        class="mx-1" 
                                                        text icon x-small 
                                                        color="error"
                                                        @click="deleteBadge({itemIndex: i, badgeIndex: bi})">
                                                        <v-icon dark>mdi-trash-can</v-icon>
                                                    </v-btn>
                                                </div>
                                            </v-container>
                                        </v-card>
                                        <v-btn
                                            fab dark color="primary" max-height="50" max-width="50"
                                            @click="addBadge(i)">
                                            <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="mb-5">
                                <v-col sm="8">
                                    Features
                                    <v-card v-for="(feature, fi) in item.features"
                                        :key="fi"
                                        class="mb-2">
                                        <v-container class="pb-0">
                                            <v-row>
                                                <v-col sm="10" class="pb-0">
                                                    <v-text-field 
                                                        dense
                                                        v-model.lazy="feature.title"
                                                        label="Title"
                                                    ></v-text-field>
                                                    <v-textarea 
                                                        dense auto-grow rows="2"
                                                        v-model.lazy="feature.text"
                                                        label="Description"
                                                    ></v-textarea>
                                                </v-col>
                                                <v-col sm="2" class="d-flex justify-center align-center">
                                                    <v-btn 
                                                        class="mt-n2" 
                                                        fab dark small 
                                                        color="error"
                                                        @click="deleteFeature({itemIndex: i, featureIndex: fi})">
                                                        <v-icon dark>mdi-trash-can</v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card>
                                </v-col>
                                <v-col sm="4" class="d-flex align-end">
                                    <v-btn fab dark color="primary" class="ml-2 mb-5" @click="addFeature(i)">
                                        <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="6" class="py-0">
                                    <v-text-field 
                                        dense
                                        v-model.lazy="item.link"
                                        label="Link"
                                    ></v-text-field>
                                </v-col>
                                <v-col sm="6" class="py-0">
                                    <v-text-field 
                                        dense
                                        v-model.lazy="item.repo"
                                        label="Repository"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="4" class="py-0">
                                    <v-text-field 
                                        dense
                                        v-model.lazy="item.image"
                                        label="Image filename"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-container>
        </v-card>
    </v-col>
</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { UI } from '../store/getters';
import { PortfolioActions } from '../store/actions';
import { PortfolioItem } from '../models/portfolio';


export default Vue.extend({
    computed: {
        ...mapGetters({
            isLoading: UI.IS_LOADING,
        }),
        portfolioSnapshot(): PortfolioItem[] {
            return this.$store.getters.portfolioItems;
        },
    },
    methods: {
        ...mapActions({
            addNew: PortfolioActions.ADD_NEW_PORTFOLIO,
            deleteItem: PortfolioActions.DELETE_PORTFOLIO_ITEM,
            addBadge: PortfolioActions.ADD_BADGE_TO_ITEM,
            deleteBadge: PortfolioActions.DELETE_BADGE_FROM_ITEM,
            addFeature: PortfolioActions.ADD_FEATURE_TO_ITEM,
            deleteFeature: PortfolioActions.DELETE_FEATURE_FROM_ITEM,
        }),
        saveChanges(index: number): void {
            const item = this.portfolioSnapshot[index];
            if (!!item.id) {
                this.$store.dispatch(PortfolioActions.UPDATE_PORTFOLIO_ITEM, index);
            } else {
                this.$store.dispatch(PortfolioActions.SAVE_NEW_PORTFOLIO, index);
            }
        },
    },
});
</script>
