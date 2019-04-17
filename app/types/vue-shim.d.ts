import Vue from 'vue';
// import Vuex from 'vuex';
// import VueRouter, { Route } from 'vue-router';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    // '$store': Vuex.Store,
    // '$route': Route,
    // '$router': VueRouter,
  }
}