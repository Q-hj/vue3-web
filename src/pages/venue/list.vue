<!--
 * @Date: 2022-09-30 11:23:23
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-01 17:13:17
 * @Description: 列表
-->
<script lang="ts" setup>
	import VenueList from '@/components/venueList/VenueList.vue';

	const venueList = ref<Venue[]>([]);
	watchEffect(async () => {
		venueList.value = await get('/mini/select', {});
	});
</script>

<template>
	<section class=" ">
		<div class="w-1200px mx-auto pt-45px">
			<VenueList
				v-if="venueList.length"
				:list="venueList"
			/>
		</div>
	</section>
</template>

<style lang="less" scoped></style>
