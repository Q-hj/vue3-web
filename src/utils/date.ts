/*
 * @Date: 2022-11-02 11:02:16
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-02 16:30:03
 * @Description: 日期处理函数
 */

const hour = 1000 * 60 * 60;

/**
 *
 * @param date 日期 默认: 当前时间
 * @param hours 时差 默认: 0
 * @returns YYYY-MM-DD HH:mm:ss
 */
export const formatDate = (date: Date = new Date(), hours: number = 0) => {
	const realDate = date.getTime() + hour * 8;

	const time = realDate + hours * hour;

	const dateStr = new Date(time).toJSON().replace('T', ' ');

	return dateStr.slice(0, 19);
};
