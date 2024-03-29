/*
 * @Date: 2022-09-30 09:35:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-02 14:57:57
 * @Description: 入口文件
 */

import "virtual:windi.css";
import "./styles/index.less";

import App from "@/pages/App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index";
import directives from "@/directives/index";

import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";

import "@/apis/wxLogin.js"; //微信登录

createApp(App)
  .use(router)
  .use(createPinia())
  .use(directives)
  .use(ArcoVue, {
    // 用于改变使用组件时的前缀名称
    // componentPrefix: 'arco',
  })
  .use(ArcoVueIcon)
  .mount("#app");
