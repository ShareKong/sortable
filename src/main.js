import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueDraggable from 'vuedraggable'

Vue.config.productionTip = false
Vue.prototype.$axios = Axios;

Vue.component('sortable', VueDraggable)
Vue.use(ElementUI);


// import {
// 	registerMicroApps,
// 	setDefaultMountApp,
// 	start
// } from 'qiankun';

// registerMicroApps(
// 	[{
// 		name: 'vueApp', // app name registered
// 		entry: 'http://localhost:10001/',
// 		container: '#iframe',
// 		activeRule: '/one/',
// 	}], {
// 		beforeLoad: [
// 			app => {
// 				console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
// 			},
// 		],
// 		beforeMount: [
// 			app => {
// 				console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
// 			},
// 		],
// 		afterUnmount: [
// 			app => {
// 				console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
// 			},
// 		],
// 	},
// );
// setDefaultMountApp('/one/')
// start();


new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
