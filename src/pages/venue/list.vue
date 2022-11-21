<!--
 * @Date: 2022-09-30 11:23:23
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-13 13:38:09
 * @Description: 列表
-->
<script lang="ts" setup>
	import VenueList from '@/components/venueList/VenueList.vue';

	const venueList = ref<Venue[]>([]);
	watchEffect(async () => {
		venueList.value = await get('/mini/select', {});
	});

	const onLoadMore = () => {
		// venueList.value = venueList.value.concat(list);
	};
</script>

<template>
	<section>
		<div class="warp pt-4">
			<VenueList
				v-if="venueList.length"
				:list="venueList"
			/>
			<!-- <p class="w-full h-10 flex-center text-sky-500">
				<van-icon
					name="arrow-down"
					color="#0ea5e9"
				/>
				<span
					@click="onLoadMore"
					class="text-xs"
					>查看更多</span
				>
			</p> -->
		</div>
	</section>
</template>

<style lang="less" scoped></style>
