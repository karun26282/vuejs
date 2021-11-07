import Vue from 'vue';
import axios from 'axios';
import Form from './core/Form';
require('./bootstrap');

window.Vue = require('vue').default;
window.axios = axios;
window.Form = Form;

Vue.component('articles', require('./components/Articles.vue').default);
Vue.component('navbar', require('./components/Navbar.vue').default);
Vue.component('new-form', require('./components/NewForm.vue').default);

const app = new Vue({
    el: '#app',
});
