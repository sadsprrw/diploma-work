import Vue from 'vue';
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router';

import MainPage from "@/views/MainPage.vue";
import ResultsPage from "@/views/ResultsPage.vue";
Vue.use(VueRouter);

const routes: RouteConfig[] = [
    { path: '/', name: 'MainPage', component: MainPage },
    { path: '/recommendations', name: 'ResultsPage', component: ResultsPage }
]

const routerOptions: RouterOptions = {
    routes
};

const router = new VueRouter(routerOptions);

export default router;