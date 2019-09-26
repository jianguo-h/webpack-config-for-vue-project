import Vue from 'vue';
import { Store } from 'vuex';
import VueRouter, { Route } from 'vue-router';
import { Loading, MessageBox, Notification, Message } from 'element-ui';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $store: Store;
    $route: Route;
    $router: VueRouter;
    $axios: any;
    $loading: Loading.service;
    $msgbox: MessageBox;
    $alert: MessageBox.alert;
    $confirm: MessageBox.confirm;
    $prompt: MessageBox.prompt;
    $notify: Notification;
    $message: Message;
  }
}
