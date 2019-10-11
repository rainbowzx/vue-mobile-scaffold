import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
<% if (vuex && vuexlocal) { %> import createPersistedState from 'vuex-persistedstate'; <% } %>

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app
    },
    <% if (vuex && vuexlocal) { %> plugins: [createPersistedState({ storage: window.localStorage })] <% } %>
});

export default store;
