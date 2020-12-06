import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'　
import toast from 'components/content/toast'　

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Vue.use(toast)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')