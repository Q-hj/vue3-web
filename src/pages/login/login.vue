<!--
 * @Date: 2022-11-30 11:35:18
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-05 15:01:03
 * @Description:
-->
<script lang="ts" setup>
const { push } = useRouter();

const { DEV } = import.meta.env;

// 微信登录配置
const config = {
  appid: 'wx205cd1187819ea10',
  scope: 'snsapi_login',
  redirect_uri: encodeURIComponent('http://www.lianchengtech.com' || window.location.origin),
  state: Math.ceil(Math.random() * 1000),
  response_type: 'code',
};

onMounted(() => {
  if (window.location.search) {
    // 已登录:-> 获取code
    const code = window.location.search
      .slice(1)
      .split('&')
      .filter((query) => query.includes('code'));
    if (code[0]) getUserInfo(code);
    else handleWxLogin(config);
  } else {
    // 未登录:-> 进行微信扫码
    handleWxLogin(config);
  }
});

// 方式1：将二维码生成在dom上
function handleWxLogin(config) {
  new WxLogin({
    id: 'wxCode',
    style: 'black',
    ...config,
  });
}

// 方式2：在新页面进行扫码
function handleWxLogin2(config) {
  const wxLoginUrl = 'https://open.weixin.qq.com/connect/qrconnect';
  const params = Object.entries(config)
    .map((item) => item.join('='))
    .join('&');

  const loginUrl = wxLoginUrl + '?' + params;
  window.open(loginUrl);
}

function getUserInfo(code) {
  console.log('code:' + code);
  //   push('/index');
}
</script>

<template>
	<section class="full-screen bg-gray-200">
		<div class="full flex-center">
			<div
				id="wxCode"
				class="w-300px h-300px"
			></div>
		</div>
	</section>
</template>

<style lang="less" scoped>

</style>
