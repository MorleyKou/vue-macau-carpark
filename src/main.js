import Vue from 'vue'

// Import Framework7 Bundle
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue with all components
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import CSS of Framework7
import 'framework7/css/framework7.bundle.min.css';

// Init plugin and register all components
Framework7.use(Framework7Vue);

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')