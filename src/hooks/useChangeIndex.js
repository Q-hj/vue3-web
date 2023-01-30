/*
 * @Date: 2022-08-17 17:10:12
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-08-24 11:07:03
 * @Description:递减
 */
import { ref, computed } from "vue";
export default function useChangeIndex() {
  const changIndex = ref(0);

  function pre() {
    changIndex.value--;
    if (!changIndex.value) return;
  }
  return {
    changIndex: computed(() => changIndex.value),
    pre,
  };
}
