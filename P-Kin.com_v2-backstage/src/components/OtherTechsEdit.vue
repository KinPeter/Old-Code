<template>
<v-row justify="center" class="mb-10">
    <v-col sm="12" md="10" lg="10" xl="8">
        <v-card :loading="isLoading">
            <div class="d-flex justify-space-between">
                <v-card-title>Edit Other Techs</v-card-title>
                <div class="mr-5 mt-n3" v-if="!isLoading">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab dark color="primary" class="mr-3" v-on="on" @click="addNew">
                                <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <span>Add new</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab dark color="success" v-on="on" @click="saveTechs">
                                <v-icon dark>mdi-content-save-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Save changes</span>
                    </v-tooltip>
                </div>
            </div>
            <v-container v-if="!isLoading" class="d-flex flex-wrap mr-n1">
                <v-card v-for="(tech, i) in techsSnapshot" :key="i" class="mb-2 mr-2 flex-grow-1" width="200" height="50">
                    <v-container class="mt-n2 d-flex">
                        <v-text-field
                            dense
                            v-model="techsSnapshot[i]">
                        </v-text-field>
                        <div class="d-flex mt-2">
                            <v-btn 
                                class="mx-1" 
                                text icon x-small 
                                color="grey darken-1" 
                                v-if="i !== 0"
                                @click="moveMeLeft(i)">
                                <v-icon dark>mdi-arrow-left</v-icon>
                            </v-btn>
                            <v-btn 
                                class="mx-1" 
                                text icon x-small 
                                color="grey darken-1" 
                                v-if="i !== techsSnapshot.length -1"
                                @click="moveMeRight(i)">
                                <v-icon dark>mdi-arrow-right</v-icon>
                            </v-btn>
                            <v-btn 
                                class="mx-1" 
                                text icon x-small 
                                color="error"
                                @click="deleteMe(i)">
                                <v-icon dark>mdi-trash-can</v-icon>
                            </v-btn>
                        </div>
                    </v-container>
                </v-card>
            </v-container>
        </v-card>
    </v-col>
</v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { UI, Skills } from '../store/getters';
import { SkillsActions } from '../store/actions';


export default Vue.extend({
    computed: {
        ...mapGetters({
            isLoading: UI.IS_LOADING,
        }),
        techsSnapshot(): string[] {
            return this.$store.getters.otherTechs;
        },
    },
    methods: {
        ...mapActions({
            moveMeLeft: SkillsActions.MOVE_TECH_LEFT,
            moveMeRight: SkillsActions.MOVE_TECH_RIGHT,
            deleteMe: SkillsActions.DELETE_TECH,
            addNew: SkillsActions.ADD_NEW_TECH,
            saveTechs: SkillsActions.SAVE_TECHS,
        }),
    },
});
</script>
