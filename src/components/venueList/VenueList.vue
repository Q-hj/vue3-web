<!--
 * @Date: 2022-10-08 09:55:32
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-03 10:15:39
 * @Description: 场馆列表
-->
<script lang="ts" setup>
	const { list = [] } = defineProps<{
		list: Venue[];
	}>();
	const _list = ref(list.map((e) => ({ ...e, liked: false })));
	const router = useRouter();

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
		router.push({
			path: '/detail',
			query: { ...item },
		});
	};
</script>

<template>
	<section>
		<ul class="pb-1">
			<li
				@click="toDetail(item)"
				class="mb-8"
				v-for="(item, index) in _list"
				:key="index"
			>
				<div>
					<img
						:src="item.url"
						class="h-50vw"
						alt=""
					/>
				</div>
				<article class="px-3 py-2">
					<p class="text-sm mb-3 font-bold">{{ item.name }}</p>
					<p class="text-sm mb-3 truncate">{{ item.synopsis }}</p>
					<div class="text-xs text-dark-400 flex justify-between">
						<div class="address">
							<van-icon
								name="location"
								color="#4b9fff"
							/>{{ item.location }}
						</div>
						<div class="favour flex-shrink-0 pl-2">
							<van-icon
								color="#4b9fff"
								@click.stop="onFavour(item, index)"
								:name="'good-job' + (item.liked ? '' : '-o')"
								size="1rem"
							/>
							<span class="">{{ item.likeNum || 0 }}</span>
						</div>
					</div>
				</article>
			</li>
		</ul>
	</section>
</template>

<style lang="less" scoped>
	li {
		box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
		article {
		}
	}
</style>
