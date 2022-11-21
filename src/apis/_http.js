/*
 * @Date: 2022-08-10 14:19:08
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-10-14 14:30:52
 * @Description: 请求的封装
 */

import axios from 'axios';
import { ElMessage } from 'element-plus';
import { proxyConfig } from '../../config.ts';
//

// const { basePath } = useStore();

const baseURL = import.meta.env.VITE_APP_BASE_API;

console.log(baseURL);

// create an axios instance
const request = axios.create({
	baseURL: '', // 设置请求根路径
	timeout: 1000 * 60 * 2, // 请求超时时间,后端有接口响应慢 则可以设置更长(单位:毫秒)
});

// 将参数转成Body 表单格式
const transformBody = (data, headers) => {
	let ret = '';
	for (let it in data) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
	}
	return ret.slice(0, -1);
};

// request interceptor
// 发送请求前的统一处理。。。
request.interceptors.request.use(
	(request) => {
		// 设置全局加载状态  列表加载 ， 提交，
		// store.commit("showLoading");

		// do something before request is sent
		// 设置请求头
		request.headers.get['Content-Type'] = 'application/json'; //默认json格式
		// request.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		['isRelease', 'makeAudio', '/menu/delete'].forEach((path) => {
			if (request.url.includes(path)) request.params = request.data;
		});
		if (request.method == 'post') {
			// console.log(request);
		}

		//此项目 提交接口不需要传创建时间和修改时间
		// request.data = {
		// 	...request.data,
		// 	createtime: undefined,
		// 	modifytime: undefined,
		// };

		// 请求头中添加token
		const token = sessionStorage.getItem('token');
		const Authorization = sessionStorage.getItem('Authorization');

		token && (request.headers['token'] = token);

		if (Authorization) {
			request.headers['Authorization'] = 'Bearer ' + Authorization;
			request.headers['X-client-id'] = 'SQKJ_TEST';

			// 在参数中添加token
			// request.params = { ...request.params, token };
			// request.data = { ...request.data, token };
		}
		// if (request.url.includes('delete'))
		// 	request.transformRequest = [transformBody];

		return request;
	},
	(error) => {
		// store.commit("hideLoading");

		// do something with request error
		// 假如发送请求失败
		console.log(error); // for debug
		// return Promise.reject(error)
		return Promise.reject(new Error('网络异常'));
	}
);

// response interceptor
// 请求后的处理
request.interceptors.response.use(
	(response) => {
		// store.commit("hideLoading");
		const res = response.data;

		// 剖析：response（http响应）  -->  res（http响应体）  -->  data | result（后端接口结果）

		// response.status  http状态码
		// 也可以根据后端返回的code进行响应状态判断
		// response.data.code 等同于 res.code

		// 请求成功
		if (response.status === 200) {
			// res.code == 200
			if (res.code < 201 || res.status < 201) return Promise.resolve(res.data || res.result || res);
			else ElMessage.error(res.msg || '请求错误！');
		}
		// 权限不足
		if (response.status === 401 || res.code == 401) {
			if (sessionStorage.getItem('token')) {
				sessionStorage.clear('token');
				// Toast.fail("登录状态已过期,请重新登录");
			} else {
				// Toast.fail("请先登录!");
			}
			// router.push("/home");
			// window.location.reload();

			return Promise.resolve(res);
		}
		// 服务端错误
		if (response.status === 500) return Promise.reject(res.result);

		return res;
	},
	(error) => {
		// store.commit("hideLoading");

		const response = error.response?.message || '请求超时';
		const method = error.config.method;
		console.error(`\t[${method}]${response}\n` + '\t[url]:' + error.config.url);
		// console.error(
		// 	`${response}` +
		// 		'\n\t请求方式:' +
		// 		`${method}` +
		// 		'\n\t请求url:' +
		// 		error.config.url
		// );

		// switch  ?
		let httpCode = {
			400: '请求参数错误',
			401: '权限不足, 请重新登录',
			403: '服务器拒绝本次访问',
			404: '请求资源未找到',
			405: '请求方法错误',
			500: '内部服务器错误',
			501: '服务器不支持该请求中使用的方法',
			502: '网关错误',
			504: '网关超时',
		};

		ElMessage.error(httpCode[response.status] || '请求超时！');

		return Promise.reject(response); //catch捕获
	}
);

let baseApi = '';
export const setBaseApi = (api) => (baseApi = api);

// 是否为代理url
const isProxyUrl = (url) => {
	for (const item of proxyConfig) {
		if (url.includes(item.api)) return true;
	}
	return false;
};

/**
 *
 * @param {string} url 请求路径
 * @param {string} method 请求方式
 * @param {object} params 请求参数
 * @param {string} word 请求描述关键字
 * @param {boolean} loading 是否请求中
 */
const handleRequest = (url, method, params, word, loading = {}) => {
	// params = { ...params, createtime: undefined, modifytime: undefined };
	if (loading.value != undefined) loading.value = true;

	// 可以在每个页面中设置请求根路径，以/结尾
	if (url[0] != '/') url = baseApi + url;

	// 非调用代理接口，则加上根路径
	if (!isProxyUrl(url) && !url.includes('http')) url = baseURL + url;

	return new Promise((resolve, reject) => {
		request({
			url,
			method,
			params: method == 'get' ? params : undefined,
			data: method == 'post' ? params : undefined,
		})
			.then((result) => {
				resolve(result);

				if (word)
					ElMessage({
						message: word + '成功',
						type: 'success',
					});
			})
			.catch((result) => {
				// reject(result);
				if (word) ElMessage.error(word + '失败');
			})
			.finally(() => {
				if (loading.value) loading.value = false;
			});
	});
};

export const get = (url, params, word, loading) => handleRequest(url, 'get', params, word, loading);

export const post = (url, params, word, loading) =>
	handleRequest(url, 'post', params, word, loading);

const confirm = (calFn, word) => {
	ElMessageBox.confirm(`确认${word}?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			calFn(row);
		})
		.catch(() =>
			ElMessage({
				type: 'info',
				message: '已取消',
			})
		);
};
