/*
 * @Date: 2022-11-21 22:25:53
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-21 23:09:39
 * @Description:
 */
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';

import { defineConfig, loadEnv } from 'vite';

import WindiCSS from 'vite-plugin-windicss';

import Components from 'unplugin-vue-components/vite';

import AutoImport from 'unplugin-auto-import/vite';

import importsListen, { imports } from 'vite-plugin-vue-autoimportconfigextend';

import { proxy } from '#/vite/proxy';

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), ''); //环境变量

	const isDev = env.NODE_ENV == 'dev';

	console.log(isDev ? '正在启动...' : '正在打包...');
	return {
		base: './',
		build: {
			outDir: 'exhibition-h5',
		},
		server: {
			port: 8080,
			host: '0.0.0.0',
			hmr: true,
			proxy,
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'), // 路径别名
				'#': resolve(__dirname, 'config'), // 路径别名
				// '@': path.join(__dirname, 'src'),
			},
			// extensions: ['.js', '.ts', '.vue', '.json'], // 使用路径别名时想要省略的后缀名，可以自己 增减
		},
		plugins: [
			vue(),
			WindiCSS(),
			Components({
				dts: 'types/components.d.ts',
			}),
			// 监听imports配置的路径文件变化，触发服务重启（重新生成声明文件）
			importsListen(),
			//自动导入API
			AutoImport({
				// dts: true,
				dts: 'types/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下

				imports: imports(
					'vue',
					'vue-router',
					'pinia',
					{ target: 'apis' },
					{ target: 'utils' }
					// '@vueuse/core',
					// src 下 apis 文件夹中 index.ts 文件 所有export自动引入
					// { target: 'utils', include: ['common.js'] },
					// { target: 'store' }
				),
				resolvers: [],
			}),
		],
		css: {
			// css预处理器
			preprocessorOptions: {
				scss: {
					// additionalData: `@use "@/styles/element-ui.scss" as *;`,
				},
				less: {
					charset: false,
					// additionalData: '@import "@/styles/constant.less";',
				},
			},
		},
	};
});
