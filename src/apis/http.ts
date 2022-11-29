/*
 * @Date: 2022-08-10 14:19:08
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-29 14:01:17
 * @Description: 请求的封装
 */

import axios, { AxiosRequestConfig } from 'axios';
import { Message } from '@arco-design/web-vue';
// import { Toast } from 'vant';
// import { ElMessage } from 'element-plus';

import { proxyList, Proxy, ProxyUrl } from '../../config/vite/proxy';

// const Message = {
// 	success: Toast.success,
// 	error: Toast.fail,
// };

//  const message = {
// 		success: ElMessage.success,
// 		error: ElMessage.error,
// 	};

// console.log(import.meta.env);
const baseURL = import.meta.env.VITE_HTTP_URL;

// create an axios instance
const request = axios.create({
	baseURL: '',
	timeout: 1000 * 60 * 2,
});

// 将参数转成Body 表单格式
const transformBody = (data: any) => {
	let ret = '';
	for (let it in data) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
	}
	return ret.slice(0, -1);
};

// request interceptor
// 发送请求前的统一处理。。。
request.interceptors.request.use(
	(request: any) => {
		// do something before request is sent

		// 设置请求头
		request.headers.get['Content-Type'] = 'application/json'; //默认json格式

		if (request.method == 'post' && request.url.includes('baidu')) {
			request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
		}

		// 请求头中添加token
		const token = sessionStorage.getItem('token');
		token && (request.headers['token'] = token);

		// 表单格式
		// if (request.url.includes('delete'))
		// 	request.transformRequest = [transformBody];

		return request;
	},
	(error) => {
		// do something with request error

		console.log(error); // for debug
		// return Promise.reject(error)
		return Promise.reject(new Error('网络异常'));
	}
);

// response interceptor
// 请求后的处理
request.interceptors.response.use(
	(response) => {
		const res = response.data;
		const { url } = response.config;

		// 剖析：response（http响应）  -->  res（http响应体）  -->  data | result（后端接口结果）

		// response.status  http状态码
		// 也可以根据后端返回的code进行响应状态判断
		// response.data.code 等同于 res.code
		// 请求成功
		if (response.status === 200) {
			// 对接口返回的响应体处理
			if (!res.code && !res.status) return res.data || res;

			if (res.code < 201 || res.status < 201) {
				Promise.resolve(res.data || res.result || res);
			} else {
				Message.error(res.msg || '请求错误！');
				return Promise.reject(res);
			}
		}
		// 权限不足
		if (response.status === 401 || res.code == 401) {
			if (sessionStorage.getItem('token')) {
				sessionStorage.clear();
				//  Message.error("登录状态已过期,请重新登录");
			} else {
				// Message.error("请先登录!");
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

		Message.error(httpCode[response.status] || '请求超时！');

		return Promise.reject(response); //catch捕获
	}
);

let baseApi = '';
export const setBaseApi = (api: string) => (baseApi = api);

// 是否为代理url

// const isProxyUrl = (url) => {
// 	for (const item of proxyList) {
// 		if (url.includes(item.api)) return true;
// 	}
// 	return false;
// };

// 是否为代理url (重写)
const isProxyUrl = (url: string): url is ProxyUrl =>
	proxyList.some((proxy: Proxy) => url.includes(proxy.api));

/**
 *
 * @param {string} url 请求路径
 * @param {string} method 请求方式
 * @param {object} params 请求参数
 * @param {string} word 请求描述关键字
 * @param {boolean} loading 是否请求中
 */
const handleRequest: RequestFunction = (
	url: string,
	method: string,
	params: any,
	word: string,
	loading: any = {}
): Promise<any> => {
	// params = { ...params, createtime: undefined, modifytime: undefined };
	if (loading.value != undefined) loading.value = true;

	// 可以在每个页面中设置请求根路径，以/结尾
	if (url[0] != '/') url = baseApi + url;

	//  加上根路径
	if (!isProxyUrl(url) && !url.includes('http')) url = baseURL + url;

	return new Promise((resolve, reject) => {
		request({
			url,
			method,
			params: method !== 'post' ? params : undefined,
			data: method == 'post' ? params : undefined,
		})
			.then((result) => {
				resolve(result);

				if (word) Message.success(word + '成功');
			})
			.catch((result) => {
				// reject(result);

				if (word) Message.error(word + '失败');
			})
			.finally(() => {
				if (loading.value) loading.value = false;
			});
	});
};

// export const get = (url, params, word, loading) => handleRequest(url, 'get', params, word, loading);

// export const post = (url, params, word, loading) =>
// 	handleRequest(url, 'post', params, word, loading);

// 组成对象集中导出各个请求方法
let requests: HttpMethods = {};

const requestMethods: HttpMethod[] = ['get', 'post', 'put', 'delete'];

requestMethods.forEach((method) => {
	requests[method] = (url: string, params: any, word: string, loading: any) =>
		handleRequest(url, method, params, word, loading);
});
const { get, post, put } = requests;

//delete 不能当做变量
export { get, post, put };

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

type RequestFunction = (
	url: string,
	params?: any,
	word?: string,
	loading?: any,
	method?: string
) => Promise<any>;

interface HttpMethods {
	get: RequestFunction;
	post: RequestFunction;
	put: RequestFunction;
	delete: RequestFunction;
}
