<!--
 * @Date: 2022-09-30 09:35:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-30 13:50:14
 * @Description: 主视图
-->

<template>
	<router-view
		class="router-view"
		v-slot="{ Component }"
	>
		<transition :name="state.transitionName">
			<component :is="Component" />
		</transition>
	</router-view>
</template>

<script setup lang="ts">
	const router = useRouter();
	const state = reactive({
		transitionName: 'slide-left',
	});
	router.beforeEach((to: any, from: any) => {
		if (to.meta.index > from.meta.index) {
			state.transitionName = 'slide-left'; // 向左滑动
		} else if (to.meta.index < from.meta.index) {
			// 由次级到主级
			state.transitionName = 'slide-right';
		} else {
			state.transitionName = ''; // 同级无过渡效果
		}
	});
</script>

<style scoped>
	.router-view {
		width: 100%;
		/* width: 1200px; */
		padding: 0 calc((100% - 1200px) / 2);
		margin: 0 auto;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: 0 auto;
		-webkit-overflow-scrolling: touch;
	}
	.slide-right-enter-active,
	.slide-right-leave-active,
	.slide-left-enter-active,
	.slide-left-leave-active {
		height: 100%;
		will-change: transform;
		transition: all 500ms;
		position: absolute;
		backface-visibility: hidden;
	}
	.slide-right-enter {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}
	.slide-right-leave-active {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	.slide-left-enter {
		opacity: 0;
		transform: translate3d(100%, 0, 0);
	}
	.slide-left-leave-active {
		opacity: 0;
		transform: translate3d(-100%, 0, 0);
	}
</style>
