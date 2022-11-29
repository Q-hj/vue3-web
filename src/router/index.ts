/*
 * @Date: 2022-08-15 10:18:29
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-29 15:10:40
 * @Description: 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 引入展馆所有页面
const venuePages = import.meta.glob('@/pages/venue/*.vue');

const venueRoutes = Object.values(venuePages).map((importFn) => ({
	path: '/' + importFn.name.split('/').at(-1).split('.')[0],
	component: importFn,
}));

console.log(venueRoutes);
NProgress.configure({ showSpinner: false });

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			name: '登录',
			component: () => import('@/pages/venue/index.vue'),
		},
		{
			path: '/layout',
			name: '数字展馆',
			component: () => import('@/pages/venue/index.vue'),
			children: venueRoutes,
		},
		{
			path: '/:pathMatch(.*)*',
			name: '404',
			redirect: '/index',
		},
	],
});

//路由跳转开始
router.beforeEach((to: any, from) => {
	if (to.name) document.title = to.name;

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
router.afterEach(() => {
	NProgress.done(); // finish progress bar
});
export default router;
