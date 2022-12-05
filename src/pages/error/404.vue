<!--
 * @Date: 2022-12-05 15:38:36
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-05 15:51:28
 * @Description: 404页面
-->
<script setup lang="ts">
	const { back } = useRouter();
</script>
<template>
	<div class="full-screen flex-center">
		<a-result
			status="404"
			subtitle="你访问的页面不存在！"
		>
			<template #extra>
				<a-space>
					<a-button
						@click="back()"
						type="primary"
						>返回</a-button
					>
				</a-space>
			</template>
		</a-result>
	</div>
</template>
