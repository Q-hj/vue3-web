/*
 * @Date: 2022-10-08 14:15:33
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-21 22:42:14
 * @Description: 类型声明
 */

interface Venue {
	id: string;
	repositoryNum: number;
	name: string;
	geocodedCode: string;
	synopsis: string;
	url: string;
	path?: any;
	password?: string;
	isOpen: number;
	isUsePassword?: any;
	isRelease: number;
	location: string;
	latitude: string;
	longitude: string;
	contact: string;
	phone: string;
	likeNum: number;
}
interface Comment {
	path;
	auditStatus: number;
	avatar: string;
	comment: string;
	createtime: string;
	id: number;
	modifytime: string;
	pavilionId: number;
	pavilionName: string;
	score: number;
	status: number;
	time: string;
	username: string;
}
