/*
 * @Date: 2022-09-30 09:35:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-29 11:02:47
 * @Description: 入口文件
 */

// import './styles/index.less';
import 'virtual:windi.css';

import App from '@/pages/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index.js';

import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';

createApp(App)
	.use(router)
	.use(createPinia())
	.use(ArcoVue, {
		// 用于改变使用组件时的前缀名称
		// componentPrefix: 'arco',
	})
	.mount('#app');
