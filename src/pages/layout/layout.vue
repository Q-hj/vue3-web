<!--
 * @Date: 2022-09-30 09:35:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-05 10:12:46
 * @Description: 主视图
-->

<template>
	<a-layout class="full-screen min-w-1200px bg-cover gap-20px !p-30px">
		<a-layout-header class="">
			<div class="warp pb-12px border-bottom border-5 border-red-600 between-center">
				<div class="flex items-center">
					<img
						class="w-70px"
						src="@/assets/images/logo.png"
						alt=""
					/>
					<span
						@click="router.push('/index')"
						class="text-yellow-200 cursor-pointer text-34px font-bold tracking-2px text-shadow-1 text-stroke-1 text-stroke-red-600"
						>数字展馆</span
					>
				</div>
				<div class="flex items-center">
					<a-dropdown @select="handleSelect">
						<p class="text-yellow-300 cursor-pointer">用户9434</p>
						<template #content>
							<a-doption :value="{ path: '/login' }">退出</a-doption>
						</template>
					</a-dropdown>
				</div>
			</div>
		</a-layout-header>
		<a-layout-content class="warp bg-light-100"
			><router-view
				class="router-view"
				v-slot="{ Component }"
			>
				<transition :name="state.transitionName">
					<component :is="Component" />
				</transition> </router-view
		></a-layout-content>
	</a-layout>
</template>

<script setup lang="ts">
const router = useRouter();

const handleSelect = ({ path }: any) => {
  if (path) router.push(path);
};
const state = reactive({
  transitionName: 'slide-left',
});
router.beforeEach((to: any, from: any) => {
  // state.transitionName = 'slide-left';
  return;
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

<style lang="less" scoped>
.arco-layout {
  background-image: url('@/assets/images/bg-layout.png');
}

.router-view {
  width: 100%;
  /* width: 1200px; */
  // padding: 0 calc((100% - 1200px) / 2);
  // margin: 0 auto;
  // position: absolute;
  // top: 0;
  // bottom: 0;
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
