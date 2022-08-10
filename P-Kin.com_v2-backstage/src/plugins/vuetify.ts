import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: '#FF8A00',
                secondary: '#343A40',
                accent: '#E52E71',
            },
        },
    },
});
