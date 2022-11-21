/*
 * @Date: 2022-09-26 16:10:04
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-10-14 16:29:29
 * @Description:  百度智能云文本审核（脱敏）
 */
import { post } from './http.ts';
let _access_token: string;
post(
	'/baidu/oauth/2.0/token?grant_type=client_credentials&client_id=0MI3ZncdI0UY2paKl8C1ogqA&client_secret=ONM6EbZT9w5ArAgnOsnP26GUahS5VevL'
).then(({ access_token }: any) => (_access_token = access_token));

export const ReviewComment = async (text: string) => {
	const data = await post(
		'/baidu/rest/2.0/solution/v1/text_censor/v2/user_defined?access_token=' + _access_token,
		{
			text,
		}
	);
	// console.log(data);
	if (data[0]) {
		console.log(data.map((e) => e.msg).join('\n'));
		return false;
	} else {
		return data.conclusion === '合规';
	}
};
