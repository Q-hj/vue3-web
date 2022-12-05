/*
 * @Date: 2022-08-15 10:18:29
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-05 10:14:33
 * @Description: 路由配置
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
NProgress.configure({ showSpinner: false });

// 引入展馆的所有页面
const venuePages = import.meta.glob('@/pages/venue/*.vue');

const venueRoutes = Object.values(venuePages).map((importFn) => ({
	path: '/' + importFn.name.split('/').at(-1).split('.')[0],
	component: importFn,
}));

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/login',
			name: '登录',
			component: () => import('@/pages/login/login.vue'),
		},
		{
			path: '/layout',
			name: '数字展馆',
			component: () => import('@/pages/layout/layout.vue'),
			redirect: '/index',
			children: venueRoutes,
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			redirect: '/login',
		},
	],
});

//路由跳转开始
router.beforeEach((to: any, from) => {
	NProgress.start();
	// instead of having to check every route record with
	// to.matched.some(record => record.meta.requiresAuth)
	//  !auth.isLoggedIn()
	return;
	if (to.meta.requiresAuth) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		return {
			path: '/login',
			// save the location we were at to come back later
			query: { redirect: to.fullPath },
		};
	}
});
//路由跳转结束
router.afterEach((to: any, from) => {
	if (to.name) document.title = to.name;
	NProgress.done(); // finish progress bar
});
export default router;
