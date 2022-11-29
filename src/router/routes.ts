/*
 * @Date: 2022-09-30 11:17:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-29 14:52:07
 * @Description: 路由表
 */

export default [
	{
		path: '/index',
		name: '首页',
		component: () => import('@/pages/venue/index.vue'),
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
];
