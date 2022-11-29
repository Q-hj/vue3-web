/*
 * @Date: 2022-10-08 09:19:25
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-29 11:57:43
 * @Description:
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
	SSR: boolean;
	MODE: string | Mode;
	readonly NODE_ENV: Mode;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
