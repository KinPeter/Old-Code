<template>
<v-row justify="center">
    <v-col sm="12" md="10" lg="10" xl="8">
        <v-card :loading="isLoading">
            <div class="d-flex justify-space-between">
                <v-card-title>Edit Skills</v-card-title>
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
                            <v-btn fab dark color="success" v-on="on" @click="saveSkills">
                                <v-icon dark>mdi-content-save-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Save changes</span>
                    </v-tooltip>
                </div>
            </div>
            <v-container v-if="!isLoading">
                <v-card v-for="(skill, i) in skillsSnapshot" :key="i" class="mb-2">
                    <v-container>
                        <v-row class="mb-n8">
                            <v-col sm="3">
                                <v-text-field
                                    v-model="skill.language"
                                    label="Language"
                                ></v-text-field>
                            </v-col>
                            <v-col sm="6">
                                <v-subheader class="pl-0 mt-n3">Level</v-subheader>
                                <v-slider
                                    v-model="skill.level"
                                    thumb-label="always"
                                    thumb-size="24"
                                    min="0"
                                    max="10"
                                    step="1"
                                    ticks="always"
                                    class="mt-n3"
                                ></v-slider>
                            </v-col>
                            <v-col sm="3" class="text-center">
                                <v-btn 
                                    class="mx-1" 
                                    fab dark small 
                                    color="grey darken-1" 
                                    v-if="i !== 0"
                                    @click="moveMeUp(i)">
                                    <v-icon dark>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn 
                                    class="mx-1" 
                                    fab dark small 
                                    color="grey darken-1" 
                                    v-if="i !== skillsSnapshot.length -1"
                                    @click="moveMeDown(i)">
                                    <v-icon dark>mdi-arrow-down</v-icon>
                                </v-btn>
                                <v-btn 
                                    class="mx-1" 
                                    fab dark small 
                                    color="error"
                                    @click="deleteMe(i)">
                                    <v-icon dark>mdi-trash-can</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
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
import { Skill } from '../models/skills';
import { UI, Skills } from '../store/getters';
import { SkillsActions } from '../store/actions';


export default Vue.extend({
    computed: {
        ...mapGetters({
            isLoading: UI.IS_LOADING,
        }),
        skillsSnapshot(): Skill[] {
            return this.$store.getters.skills;
        },
    },
    methods: {
        ...mapActions({
            moveMeUp: SkillsActions.MOVE_ITEM_UP,
            moveMeDown: SkillsActions.MOVE_ITEM_DOWN,
            deleteMe: SkillsActions.DELETE_ITEM,
            addNew: SkillsActions.ADD_NEW_ITEM,
            saveSkills: SkillsActions.SAVE_SKILLS,
        }),
    },
});
</script>
