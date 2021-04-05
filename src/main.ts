import Vue from 'vue';
import Vuelidate from 'vuelidate';
import PortalVue from 'portal-vue';
import Vue2TouchEvents from 'vue2-touch-events';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import { router } from './router';
import { store } from './store';
import { masks } from './utils/masks';
import error from './utils/error-messages';
// import './plugins/elements';

const VueInputMask = require('vue-inputmask').default;

Vue.config.productionTip = false;

Vue.prototype.$$mask = masks;
Vue.prototype.$$error = error;

Vue.use(VueInputMask);
Vue.use(ElementUI);
Vue.use(Vuelidate);
Vue.use(PortalVue);
Vue.use(Vue2TouchEvents);

// window.onbeforeunload = () => {
//   localStorage.setItem('restart-page', 'true');
// };

// window.onload = () => {
//   const restart = localStorage.getItem('restart-page');
//   const isRestart = restart === 'true'
//     ? Boolean(true)
//     : Boolean(false);
//   store.commit('updateRestartFlag', isRestart);
//   localStorage.setItem('restart-page', 'false');
// };

// router.beforeEach((to, from, next) => {
//   console.log('beforeEach store.state.authStatus', store.state.authStatus);
//   console.log('from', from);
//   console.log('to', to);
//   store.dispatch('cancelRequest');
//   if (to.path === '/main') {
//     store.dispatch('resetStateTranche');
//     store.dispatch('resetCreditParams');
//     store.dispatch('setPlaceWorkData');
//     console.log('resetStateTranche');
//     next();
//   } else {
//     next();
//   }
//   if (
//     (from.fullPath !== '/income' && from.fullPath !== '/work-place' && to.path === '/offers')
//   ) {
//     if (store.state.authStatus) {
//       next({ path: '/main' });
//     } else {
//       next({
//         path: '/',
//       });
//     }
//   } else {
//     next();
//   }
// });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
