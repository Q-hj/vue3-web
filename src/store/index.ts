/*
 * @Date: 2022-09-03 19:37:35
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-09-27 16:30:11
 * @Description: 主仓库
 */

export const useStore = defineStore('main', {
	state: () => {
		return {
			basePath: '', //请求根路径
			loading: false, //请求根路径
			venues: [], // 所有场馆列表
			areaList: [],
			sourceTypes: [] as any, // 所有资源类型
			typeNames: ['大类字典', '出版字典', '时期字典', '细类字典'], //资料类型字典 密级字典
		};
	},
	actions: {
		setLoading: (flag: boolean) => {
			console.log(flag);
			// console.log(state);
			// this.loading = flag;
		},
		// setBasePath: (basePath: string) => {
		// 	this.basePath = basePath;
		// },
		updateVenues() {
			get('/pavilion/select').then((list: any) => {
				this.venues = list;
			});
		},
		updateAreaList() {
			get('/baiYuApi/area/dictionary/list', {
				pageNum: 1,
				pageSize: 100,
			}).then(({ list }: any) => {
				this.areaList = list;
			});
		},
		// 获取资源类型
		updateSourceType(type: number): Function {
			get('/baiYu/typeList', { type }).then(({ list }: any) => {
				// console.log(list);
				this.sourceTypes[type - 1] = list;
			});
			return this.updateSourceType;
		},
		updateAllSourceType() {
			this.updateSourceType(1)(2)(3)(4);
		},
		// 获取token
		updateToken() {
			return new Promise<void>((resolve, reject) => {
				get('/baiYu/getToken', { code: 'code_test' }, '登录').then(
					({ baiYuToken, createToken }: any) => {
						sessionStorage.setItem('token', createToken.token || '');
						sessionStorage.setItem('Authorization', baiYuToken.accessToken || '');
						resolve();
					}
				);
			});
		},
	},
});
