/*
 * @Date: 2022-10-08 09:19:25
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-29 13:54:36
 * @Description: 全局声明
 */
/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
/// <reference types="vite/client" />

type Mode = 'dev' | 'test' | 'prod';

interface ImportMetaEnv {
	BASE_URL: string;
	DEV: boolean;
	PROD: boolean;
	MODE: string | Mode;
	SSR: boolean;
	// readonly NODE_ENV: Mode;
	readonly VITE_USER_NODE_ENV: Mode;
	readonly VITE_HTTP_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
