<template>
<v-row justify="center" class="mb-10">
    <v-col sm="12" md="10" lg="10" xl="8">
        <v-card :loading="isLoading">
            <div class="d-flex justify-space-between">
                <v-card-title>Edit Pens</v-card-title>
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
                            <v-btn fab dark color="success" v-on="on" @click="savePens">
                                <v-icon dark>mdi-content-save-outline</v-icon>
                            </v-btn>
                        </template>
                        <span>Save changes</span>
                    </v-tooltip>
                </div>
            </div>
            <v-container v-if="!isLoading">
                <v-card v-for="(pen, i) in pensSnapshot" :key="i" class="mb-3">
                    <v-container>
                        <v-row>
                            <v-col sm="8">
                                <v-text-field
                                    dense
                                    v-model="pen.name"
                                    label="Name">
                                </v-text-field>
                            </v-col>
                            <v-col sm="4" class="text-center">
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
                                    v-if="i !== pensSnapshot.length -1"
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
                        <v-row>
                            <v-col sm="12">
                                <v-text-field
                                    dense
                                    v-model="pen.descr"
                                    label="Description">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col sm="3">
                                <v-text-field
                                    dense
                                    v-model="pen.codepenId"
                                    label="Codepen ID">
                                </v-text-field>
                            </v-col>
                            <v-col sm="9">
                                <v-text-field
                                    dense
                                    v-model="pen.codepenTitle"
                                    label="Codepen title">
                                </v-text-field>
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
import { UI } from '../store/getters';
import { PensActions } from '../store/actions';


export default Vue.extend({
    computed: {
        ...mapGetters({
            isLoading: UI.IS_LOADING,
        }),
        pensSnapshot(): string[] {
            return this.$store.getters.pens;
        },
    },
    methods: {
        ...mapActions({
            moveMeUp: PensActions.MOVE_ITEM_UP,
            moveMeDown: PensActions.MOVE_ITEM_DOWN,
            deleteMe: PensActions.DELETE_ITEM,
            addNew: PensActions.ADD_NEW_ITEM,
            savePens: PensActions.SAVE_PENS,
        }),
    },
});
</script>
