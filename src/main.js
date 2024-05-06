import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

//VUETIFY
import vuetify from '@/plugins/vuetify'
Vue.config.productionTip = false


//HIGHLIGHT
import TextHighlight from 'vue-text-highlight';
Vue.component('text-highlight', TextHighlight)

new Vue({
    router,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
