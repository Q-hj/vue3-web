<!--
 * @Date: 2022-10-08 09:55:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-01 17:38:03
 * @Description: 场馆列表
-->
<script lang="ts" setup>
	const { list = [] } = defineProps<{
		list: Venue[];
	}>();
	const { currentRoute, push } = useRouter();
	const bigImage = currentRoute.value.path.includes('list');
	console.log(bigImage);
	const _list = ref(list.map((e) => ({ ...e, liked: false })));

	// 点赞
	const onFavour = ({ id }: Venue, i: number) => {
		if (!_list.value[i].liked) {
			get('/mini/addLikeNum', { pavilionId: id }, '').then((res: any) => {
				_list.value[i].liked = true;
				_list.value[i].likeNum = +_list.value[i].likeNum + 1;
			});
		}
		_list.value[i].liked = !_list.value[i].liked;
	};

	const toDetail = (item: Venue) => {
		push({
			path: '/detail',
			query: { ...item },
		});
	};
</script>

<template>
	<ul class="pb-1 w-full">
		<li
			class="mb-50px w-full"
			:class="bigImage ? 'mb-100px' : 'mb-50px'"
			v-for="(item, index) in _list"
			:key="index"
		>
			<!-- <a-image
      width="400"
      height="300"
      src="some-error.png"
    /> -->
			<img
				@click="toDetail(item)"
				:src="item.url"
				class="w100% cursor-pointer"
				:class="bigImage ? 'h-570px' : 'h-450px'"
				alt=""
			/>

			<article
				class="px-20px"
				:class="bigImage ? 'px-40px py-20px' : ''"
			>
				<p class="font-bold text-18px leading-50px">{{ item.name }}</p>
				<p class="indent-2em">{{ item.synopsis }}</p>
				<div class="flex justify-between py-15px">
					<div class="address">
						<icon-location class="text-blue-500" />
						{{ item.location }}
					</div>
					<div class="flex-shrink-0">
						<component
							@click.stop="onFavour(item, index)"
							:is="item.liked ? 'icon-thumb-up-fill' : 'icon-thumb-up'"
							class="!text-blue-500 text-16px cursor-pointer"
						/>
						<span class="pl-5px">{{ item.likeNum || 0 }}</span>
					</div>
				</div>
			</article>
		</li>
	</ul>
</template>

<style lang="less" scoped>
	li {
		box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
	}
</style>
