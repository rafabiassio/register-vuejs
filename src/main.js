import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueAnalytics from 'vue-analytics'

Vue.use(VueMaterial)

Vue.config.productionTip = false;

new Vue(VueAnalytics, {
  id: 'UA-129313249-1',
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
