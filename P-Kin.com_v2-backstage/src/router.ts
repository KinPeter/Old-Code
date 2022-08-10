import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Login from './views/Login.vue';
import store from './store';
import { Auth } from './store/getters';

// tslint:disable-next-line: ban-types
const routeGuard = (to: Route, from: Route, next: Function) => {
    if (store.getters.isLoggedIn) {
        next();
    } else {
        next('/');
    }
};

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/skills',
            name: 'Skills',
            beforeEnter: routeGuard,
            component: () => import('./views/Skills.vue'),
        },
        {
            path: '/portfolio',
            name: 'Portfolio',
            beforeEnter: routeGuard,
            component: () => import('./views/Portfolio.vue'),
        },
        {
            path: '/pens',
            name: 'Pens',
            beforeEnter: routeGuard,
            component: () => import('./views/Pens.vue'),
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
