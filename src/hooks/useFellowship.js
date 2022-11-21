/*
 * @Date: 2022-08-17 17:10:12
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-08-17 17:13:12
 * @Description: 异步加载
 */
import { ref, computed } from 'vue';
// import fakeApiCall from '../api';

export default function useFellowship() {
	const heroes = ref([]);
	const loading = ref(false);

	async function init() {
		loading.value = true;
		// heroes.value = await fakeApiCall();
		setTimeout(() => {
			heroes.value = 'heroes';
		}, 1000);
		loading.value = false;
	}
	return {
		heroes: computed(() => heroes.value),
		loading: computed(() => loading.value),
		init,
	};
}
