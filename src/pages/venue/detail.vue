<!--
 * @Date: 2022-10-08 14:07:19
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-02 15:49:10
 * @Description: 详情
 * @Task: 评论、停留时间
-->
<script lang="ts" setup>
	import { Message } from '@arco-design/web-vue';
	import { ReviewComment } from '@/apis/desensitize';
	const { query }: any = useRoute();
	const router = useRouter();

	const venue: Venue = query;
	console.log(venue);
	const commentList = ref<Comment[]>([]);

	onBeforeMount(async () => {
		commentList.value = await get('/mini/commentList', { pavilionId: venue.id });
	});
	const comment = ref<string>('');
	const loading = ref<boolean>(false);

	// 评论
	const onIssue = async () => {
		if (!comment.value) return Message.warning('请填写评论！');
		// 敏感词汇处理
		// const flag = true || (await ReviewComment(comment.value));
		// if (!flag) return Message.error('内容存在敏感词汇！');
		const params = {
			pavilionId: venue.id,
			pavilionName: venue.name,
			score: 5,
			time: formatDate(),
			username: '用户9434',
			// auditStatus: 2,
			avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
			comment: comment.value,
		};
		post('/mini/addComments', params)
			.then(() => {
				Message.success('评论已发布！管理员审核后即可查看');
				comment.value = '';
			})
			.catch(() => Message.error('评论失败！'));
	};

	// 虚拟展馆
	const password = reactive<Popup>({
		open: false,
		value: '',
	});
	const onEnter = () => {
		const { path, isUsePassword } = venue;
		if (venue.isUsePassword == 1) return handleEnter(path);
		password.open = true;
		if (isUsePassword) return (password.open = true);
		handleEnter(path);
	};
	const onValidPassword = () => {
		if (password.value == venue.password) return handleEnter();
		Message.error('密码错误！');
	};

	let standingTime = 0;
	const timer = setInterval(() => standingTime++, 1000);
	onBeforeUnmount(() => {
		post('/mini/addStandingTime', {
			pavilionId: venue.id,
			time: standingTime,
		});
		clearInterval(timer);
	});

	const handleEnter = (path: URL = venue.path) => {
		window.open(path);
		// sessionStorage.setItem('from720', '1');
	};

	// 意见反馈
	const feedback = reactive<Popup>({
		open: false,
		value: '',
	});
	const onFeedback = () => {
		const params = {
			content: feedback.value,
			pavilionId: venue.id,
			pavilionName: venue.name,

			time: formatDate(),
		};
		post('/mini/addFeedback', params, '提交').then((res: any) => {
			feedback.value = '';
			feedback.open = false;
		});
	};
</script>

<template>
	<section>
		<div class="w-1000px pb-50px mx-auto pt-45px max-h-calc(100vh-350px)">
			<img
				:src="venue.url"
				alt=""
			/>
			<main>
				<div class="between-center">
					<p class="font-bold text-18px leading-70px">展馆介绍</p>
					<p
						@click="onEnter()"
						v-if="venue.path"
						class="text-blue-500 cursor-pointer"
					>
						<icon-share-internal /> 虚拟展馆
					</p>
				</div>

				<p class="indent-2em">{{ venue.synopsis }}</p>
			</main>
			<footer class="mt-40px">
				<a-space
					fill
					direction="vertical"
					size="small"
				>
					<a-textarea
						class="!w-full"
						v-model="comment"
						placeholder="请输入评论"
						:max-length="200"
						show-word-limit
						:auto-size="{ minRows: 5 }"
					/>
					<a-button
						class="float-right"
						@click="onIssue()"
						type="primary"
						>发布</a-button
					>
				</a-space>
				<!-- 评论列表 -->

				<a-space
					class="mt-30px"
					fill
					direction="vertical"
					size="medium"
				>
					<a-comment
						v-for="(item, index) in commentList"
						:key="index"
						:avatar="item.avatar"
						:datetime="item.time"
						:content="item.comment"
						align="right"
					>
						<template #author>
							<span class="text-blue-500">{{ item.username }}</span>
						</template></a-comment
					>
				</a-space>
			</footer>
			<!-- 底部入口 -->
			<a-space
				class="mt-50px"
				fill
				align="center"
				direction="vertical"
				size="medium"
			>
				<p
					@click="feedback.open = true"
					class="text-gray-500 hover:text-blue-500 cursor-pointer"
				>
					<icon-edit />意见反馈
				</p>
			</a-space>
		</div>

		<a-modal
			simple
			v-model:visible="password.open"
			title="展馆密码"
			:okButtonProps="{ disabled: !password.value }"
			@cancel="password.open = false"
			@ok="onValidPassword()"
		>
			<a-input-password
				v-model="password.value"
				placeholder="请输入展馆密码"
			/>
		</a-modal>

		<a-modal
			v-model:visible="feedback.open"
			title="意见反馈"
			:okButtonProps="{ disabled: !feedback.value }"
			@cancel="password.open = false"
			@ok="onFeedback()"
		>
			<a-textarea
				class="!w-full"
				v-model="feedback.value"
				placeholder="请填写反馈"
				:max-length="200"
				show-word-limit
				:auto-size="{ minRows: 5 }"
			/>
		</a-modal>
	</section>
</template>

<style lang="less" scoped></style>
