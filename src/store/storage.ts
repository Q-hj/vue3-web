/*
 * @Date: 2022-09-24 11:56:12
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-09-27 16:23:23
 * @Description: 本地存储的封装
 */

import { encrypt, decrypt } from '@/utils/crypto';

const isDev = import.meta.env.MODE !== 'development';

// 默认配置
const config: StorageConfig = {
	type: 'sessionStorage', // 本地存储类型 localStorage/sessionStorage
	prefix: 'partyHistory', // 名称前缀 建议：项目名 + 项目版本
	expire: 1, //过期时间 单位：小时
	encrypt: !isDev, // 默认加密 为了调试方便, 开发过程中可以不加密
};

const hour = 1000 * 60 * 60;

const addPrefix = (key: string) => config.prefix + '_' + key;

// 存入数据时加密
const toSet = (data: PackValue) =>
	config.encrypt ? encrypt(data) : JSON.stringify(data);

// 读取数据时解密
const toGet = (data: string) =>
	config.encrypt ? JSON.parse(decrypt(data)) : JSON.parse(data);

// 设置 setStorage
export const setStorage = (
	key: string,
	value: unknown,
	expire: number = config.expire
) => {
	if (value === '' || value === null || value === undefined) return; // value = null;

	if (isNaN(expire) || expire <= 0) throw new Error('expire必须为大于0的数字');

	const packValue: PackValue = {
		value, // 存储值
		expire, // 过期时间
		time: Date.now(), //存值时间戳
	};

	window[config.type].setItem(addPrefix(key), toSet(packValue));
};

// 获取 getStorage
export const getStorage = (key: string): Value => {
	// 获取存储对象
	const packValue = window[config.type].getItem(addPrefix(key));

	if (!packValue) return ''; // key 不存在判断

	const { value, expire, time } = toGet(packValue) as PackValue;

	const isOverdue = Date.now() - time > expire * hour;

	if (expire && isOverdue) return removeStorage(key); // 过期删除

	setStorage(key, value, expire); // 未过期期间被调用 则自动续期 进行保活

	return value;
};

// 删除 removeStorage
export const removeStorage = (key: string): string => {
	window[config.type].removeItem(addPrefix(key));
	return '';
};

// 获取全部 getAllStorage
export const getAllStorage = () => {
	let len = window[config.type].length; // 获取长度
	let arr = new Array(); // 定义数据集
	for (let i = 0; i < len; i++) {
		// 获取key 索引从0开始
		let getKey = window[config.type].key(i);
		// 获取key对应的值
		let getVal = window[config.type].getItem(getKey as any);
		// 放进数组
		arr[i] = { key: getKey, val: getVal };
	}
	return arr;
};
// console.table(getAllStorage());

// 清空 clearStorage
export const clearStorage = (whole: boolean = false) => {
	if (whole) window[config.type].clear(); //清空存储库

	// 删除本地存储库数据
	for (let index = 0; index < window[config.type].length; index++) {
		const key = window[config.type].key(index);
		// 删除此项目存储的所有数据
		if (key && key.includes(config.prefix)) window[config.type].removeItem(key);
	}

	console.log('clearStorage 执行成功！');
};

// ----------------------类型声明----------------------

// 配置项
interface StorageConfig {
	type: 'localStorage' | 'sessionStorage';
	prefix: string;
	expire: number;
	encrypt: boolean;
}

// 存入的对象类型
type Value = number | string | boolean | object | Array<any>;

// 包装值
interface PackValue {
	value: Value;
	expire: number;
	time: number;
}
