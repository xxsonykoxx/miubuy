import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import qs from 'qs';
import { ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

/* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ */

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.prototype.$qs = qs;
Vue.use(VueAxios, axios, gsap, ScrollTrigger, ValidationProvider, extend, required);
library.add(faSpinner);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

/* ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ ☆.｡.:*・ﾟ */

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') === 'ImLogin';
  if (to.meta.requiresAuth) {
    if (isLogin === true) {
      next();
    } else {
      next({ path: '/Login' });
    }
  } else {
    next();
  }
});
