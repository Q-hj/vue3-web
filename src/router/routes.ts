/*
 * @Date: 2022-09-30 11:17:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-02 15:48:43
 * @Description: 路由表
 */

export default [
	{
		path: '',
		redirect: '/index',
	},
	{
		path: '/index',
		name: '首页',
		component: () => import('@/pages/venue/index.vue'),
		children: [],
	},
	{
		path: '/list',
		name: '展馆列表',
		component: () => import('@/pages/venue/list.vue'),
	},
	{
		path: '/detail',
		name: '展馆详情',
		component: () => import('@/pages/venue/detail.vue'),
	},
	{
		// 匹配任意路由
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		redirect: '/index',
		// component: () => import('@/pages/base/baseMap.vue'),
	},
];
