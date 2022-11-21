/*
 * @Date: 2022-08-17 17:10:12
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-09-08 23:03:15
 * @Description: 全局加载
 */
import { ref, computed } from 'vue';

export default function useLoading() {
	const loading = ref(false);

	function setLoading(flag) {
		loading.value = flag;
	}
	return {
		loading: computed(() => loading.value),
		setLoading,
	};
}
