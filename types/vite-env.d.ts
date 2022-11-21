/*
 * @Date: 2022-10-08 09:19:25
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-21 22:41:13
 * @Description:
 */
/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
/// <reference types="vite/client" />
interface ImportMeta {
	env: {
		GITHUB_AUTH_TOKEN: string;
		NODE_ENV: 'dev' | 'test' | 'prod';
		PORT?: string;
		PWD: string;
	};
}
