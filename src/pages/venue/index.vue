<!--
 * @Date: 2022-09-30 11:23:23
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-29 15:45:00
 * @Description: 首页
-->
<script lang="ts" setup>
	import MyMap from '@/components/map/map.vue';
	import VenueList from '@/components/venueList/VenueList.vue';
	// import list from './venue';

	const venueList = ref<Venue[]>([]);
	const router = useRouter();

	const endIndex = ref<number>(3);

	const onLoadMore = async () => {
		if (endIndex.value > venueList.value.length) return;
		endIndex.value += endIndex.value;
	};
	const toListPage = () => {
		router.push('/list');
	};

	const map = ref();
	onBeforeMount(async () => {
		venueList.value = await get('/mini/select', {});
		console.log(venueList.value);
		map.value.addMaker(venueList.value);
	});
</script>

<template>
	<section class="w-full between-center">
		<MyMap
			ref="map"
			class="w-1/2 h-100vh"
			:makers="venueList"
		/>
		<div
			class="w-48%"
			v-if="false"
		>
			<nav class="between-center py-3">
				<p class="title">展馆浏览</p>

				<p
					@click="toListPage"
					class="text-xs"
				>
					<span>查看更多</span><icon-right />
				</p>
			</nav>
			<VenueList
				class="w-full"
				v-if="venueList.length"
				:list="venueList.slice(0, endIndex)"
			/>
			<p
				v-show="venueList.length > endIndex"
				class="w-48% h-10 flex-center text-sky-500"
			>
				<icon-right />
				<span
					@click="onLoadMore"
					class="text-xs"
					>查看更多</span
				>
			</p>
		</div>
	</section>
</template>

<style lang="less" scoped></style>
