import Vue from 'vue'
import App from './App'
import uView from "uview-ui"

Vue.config.productionTip = false

Vue.use(uView)
App.mpType = 'app'

//引入vuex
import store from 'store/store.js'
Vue.prototype.$store = store

const app = new Vue({
	...App
})
app.$mount()
