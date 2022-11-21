/*
 * @Date: 2022-08-15 10:18:29
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-09-30 11:51:31
 * @Description: 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

import routes from './routes';
const router = createRouter({
	history: createWebHistory(),
	routes,
});

//路由跳转开始
router.beforeEach((to: any, from) => {
	// console.log(to);
	document.title =  to.name;
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
