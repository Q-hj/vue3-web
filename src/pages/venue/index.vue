<!--
 * @Date: 2022-09-30 11:23:23
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-02 16:31:02
 * @Description: 首页
-->
<script lang="ts" setup>
	import MyMap from '@/components/map/map.vue';
	import VenueList from '@/components/venueList/VenueList.vue';
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
	<section class="full between-center">
		<MyMap
			ref="map"
			class="w-1/2 h-full"
			:makers="venueList"
		/>
		<a-layout class="full !px-30px">
			<a-layout-header class="between-center h-50px">
				<p class="text-18px">展馆浏览</p>

				<a-link @click="toListPage">查看更多<icon-right /></a-link
			></a-layout-header>
			<a-layout-content class="max-h-[calc(100vh-50px-150px)] overflow-scroll"
				><VenueList
					class="w-full flex-1"
					v-if="venueList.length"
					:list="venueList.slice(0, endIndex)"
			/></a-layout-content>
		</a-layout>
		<div
			v-if="false"
			class="flex-1 full px-30px flex flex-col"
		>
			<header class="between-center h-50px">
				<p class="text-18px">展馆浏览</p>

				<a-link @click="toListPage">查看更多<icon-right /></a-link>
			</header>
			<VenueList
				class="w-full flex-1"
				v-if="venueList.length"
				:list="venueList.slice(0, endIndex)"
			/>
			<!-- <p
				v-show="venueList.length > endIndex"
				class="w-48% h-10 flex-center text-sky-500"
			>
				<icon-right />
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
