import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueTheMask from 'vue-the-mask';

// Importar Bootstrap e BootstrapVue
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.config.productionTip = false;

// Usar BootstrapVue e, opcionalmente, o plugin de ícones
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueTheMask);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
