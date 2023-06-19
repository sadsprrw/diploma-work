import Vue from 'vue';
import VueX, { ActionTree, StoreOptions } from 'vuex';
import UserModule from "@/store/modules/UserModule";

Vue.use(VueX);


const actions: ActionTree<any, any> = {
    resetState({ dispatch }) {
        dispatch('LobbyModule/resetState');
        dispatch('RoomModule/resetState');
    }
}

const storeOptions: StoreOptions<any> = {
    modules: {
        UserModule,
    },
    actions
}

const store = new VueX.Store(storeOptions);

if (module.hot) {
    module.hot.accept([
        './modules/UserModule',
        ], () => {
        const UserModule = require('./modules/UserModule').default;
        store.hotUpdate({
            modules: {
                UserModule,
            },
            actions
        });
    });
}

export default store;