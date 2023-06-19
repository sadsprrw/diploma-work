import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import store from '@/store';
import axiosRetry from 'axios-retry';
import VueAxios from 'vue-axios';
import router from "@/router";
import InfiniteLoading from 'vue-infinite-loading';
import Loading from 'vue-loading-overlay';
import Multiselect from 'vue-multiselect';
import 'vue-loading-overlay/dist/vue-loading.css';

import '@/assets/styles/main.scss';


axiosRetry(axios, { retries: 3 });
Vue.use(VueAxios, axios);
Vue.use(InfiniteLoading);
Vue.use(Loading);
// eslint-disable-next-line vue/multi-word-component-names
Vue.component('Multiselect', Multiselect);

const requireComponent = require.context('./components/Base', false, /SR[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach((fileName: string) => {
    const componentConfig = requireComponent(fileName);
    // @ts-ignore
    const componentName: string = fileName.split('/').pop().replace(/\.\w+$/, '');
    Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.directive('ClickOutside', {
    // @ts-ignore
    bind: (el: any, binding: any, vnode: any) => {
        Object.defineProperty(el, 'clickOutsideEvent', {
            // @ts-ignore
            value: event => {
                if (!(el === event.target || el.contains(event.target))) {
                    vnode.context[binding.expression](event);
                }
            },
            writable: false
        });
        document.body.addEventListener('click', el['clickOutsideEvent']);
    },
    // @ts-ignore
    unbind: el => document.body.removeEventListener('click', el['clickOutsideEvent'])
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
