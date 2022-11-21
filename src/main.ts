/*
 * @Date: 2022-09-30 09:35:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-03 11:26:22
 * @Description: 入口文件
 */

import './styles/index.less';
import 'virtual:windi.css';

import 'vant/es/toast/style';

import App from './pages/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index.js';

createApp(App).use(router).use(createPinia()).mount('#app');
