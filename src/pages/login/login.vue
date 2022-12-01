<!--
 * @Date: 2022-11-30 11:35:18
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-01 13:50:20
 * @Description: 
-->
<script lang="ts" setup>
	const { push } = useRouter();

	const { DEV } = import.meta.env;
	const wxLoginUrl =
		'https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code';

	onMounted(() => {
		new WxLogin({
			// self_redirect: true,
			id: 'wxCode',
			appid: 'wx205cd1187819ea10',
			scope: 'snsapi_login',
			redirect_uri: encodeURIComponent(window.location.origin),

			// redirect_uri: encodeURIComponent('http://192.168.0.115' + '/login'),
			state: Math.ceil(Math.random() * 1000),
			style: 'black',
			// href: '',
		});

		if (DEV) push('/index');
	});
</script>

<template>
	<section class="full bg-gray-200">
		<div class="full flex-center">
			<div
				id="wxCode"
				class="w-300px h-300px"
			></div>
		</div>
	</section>
</template>

<style lang="less" scoped></style>
