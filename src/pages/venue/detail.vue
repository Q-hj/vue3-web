<!--
 * @Date: 2022-10-08 14:07:19
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-01 17:49:57
 * @Description: 详情
 * @Task: 评论、停留时间
-->
<script lang="ts" setup>
	import { Message } from '@arco-design/web-vue';
	import { ReviewComment } from '@/apis/desensitize';
	const { query }: any = useRoute();

	const venue: Venue = query;
	console.log(venue);
	const commentList = ref<Comment[]>([]);

	onBeforeMount(async () => {
		commentList.value = await get('/mini/commentList', { pavilionId: venue.id });
	});
	const comment = ref<string>('');
	const loading = ref<boolean>(false);
	const commentPopup = ref<boolean>(false);

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
			.then((res: any) => {
				Message.success('评论已提交！管理员审核后即可查看');
				commentPopup.value = false;
				comment.value = '';
			})
			.catch(() => Message.success('评论失败！'));
	};

	// 虚拟展馆
	const password = reactive<{ Popup: boolean; value: string }>({
		Popup: false,
		value: '',
	});
	const onEnter = ({ path, isUsePassword }: Venue) => {
		if (venue.isUsePassword == 1) return handleEnter(path);
		password.Popup = true;
		if (isUsePassword) return (password.Popup = true);
		handleEnter(path);
	};
	const onValidPassword = () => {
		// if (!venue.password) return handleEnter();
		if (!password.value) return Message.error('请输入密码！');
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
		sessionStorage.setItem('from720', '1');
	};

	// 意见反馈
	const feedback = reactive<{
		Popup: boolean;
		value: string;
	}>({
		Popup: false,
		value: '',
	});
	const onFeedback = () => {
		if (!feedback.value) return Message.error('请填写反馈！');
		const params = {
			content: feedback.value,
			pavilionId: venue.id,
			pavilionName: venue.name,

			time: formatDate(),
		};
		post('/mini/addFeedback', params, '提交').then((res: any) => {
			feedback.value = '';
			feedback.Popup = false;
		});
	};
</script>

<template>
	<section>
		<div class="w-1000px mx-auto pt-45px max-h-calc(100vh-350px)">
			<img
				:src="venue.url"
				alt=""
			/>
			<main>
				<p class="font-bold text-18px leading-50px">展馆介绍</p>

				<p class="indent-2em">{{ venue.synopsis }}</p>
			</main>
			<footer>
				<header class="between-center pb-8">
					<p
						class="title"
						:data-text="'共有' + commentList.length + '条评论'"
					>
						展馆评论
					</p>
					<p
						@click="commentPopup = true"
						class="text-sm"
					>
						写评论<icon-edit />
					</p>
				</header>
				<!-- 评论列表 -->
				<ul class="pb-4">
					<li
						v-for="(item, index) in commentList"
						:key="index"
						class="between-center py-2"
					>
						<van-image
							round
							width="2rem"
							height="2rem"
							:src="item.avatar"
						/>
						<article class="text-xs flex-1 pl-2">
							<header class="between-center mb-2">
								<span class="text-sky-400">{{ item.username }}</span>
								<span class="text-gray-400">{{ item.time }}</span>
							</header>
							<p class="text-dark-400">{{ item.comment }}</p>
						</article>
					</li>
				</ul>

				<van-popup
					v-if="false"
					v-model:show="commentPopup"
					close-icon="close"
					class="w-4/5 py-3"
				>
					<van-field
						v-model="comment"
						rows="3"
						autosize
						label=""
						type="textarea"
						maxlength="50"
						placeholder="请输入评论"
						show-word-limit
					/>
					<div class="mx-auto warp">
						<van-button
							@click="onIssue"
							:loading="loading"
							size="small"
							block
							type="primary"
							>发布</van-button
						>
					</div>
				</van-popup>
			</footer>
			<!-- 底部入口 -->
			<nav class="pb-5">
				<van-popup
					v-model:show="password.Popup"
					close-icon="close"
					class="w-4/5 py-3"
				>
					<p class="text-center">请输入密码</p>
					<van-field
						v-model="password.value"
						autosize
						label=""
						type="password"
						maxlength="50"
						placeholder="请输入密码"
						show-word-limit
					/>
					<div class="mx-auto warp">
						<van-button
							@click="onValidPassword()"
							size="small"
							block
							color="linear-gradient(to right, #ff6034, #ee0a24)"
							>进入</van-button
						>
					</div>
					<!-- <van-password-input
						:value="password.value"
						:gutter="10"
					/>  -->
				</van-popup>
				<van-space
					direction="vertical"
					fill
				>
					<van-button
						v-if="venue.path && venue.isOpen"
						class="mb-1"
						block
						@click="onEnter(venue)"
						color="linear-gradient(to right, #ff6034, #ee0a24)"
						>虚拟展馆</van-button
					>
					<van-button
						block
						@click="feedback.Popup = true"
						color="linear-gradient(135deg,#abdcff,#0396ff)"
						>意见反馈</van-button
					></van-space
				>
				<van-popup
					v-model:show="feedback.Popup"
					close-icon="close"
					class="w-4/5 py-3"
				>
					<p class="text-center">意见反馈</p>
					<van-field
						v-model="feedback.value"
						rows="3"
						autosize
						label=""
						type="textarea"
						maxlength="150"
						placeholder="请填写反馈"
						show-word-limit
					/>
					<div class="mx-auto warp">
						<van-button
							@click="onFeedback()"
							size="small"
							block
							color="linear-gradient(135deg,#abdcff,#0396ff)"
							>提交</van-button
						>
					</div>
				</van-popup>
			</nav>
		</div>
	</section>
</template>

<style lang="less" scoped></style>
