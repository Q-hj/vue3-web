<!--
 * @Date: 2022-09-30 11:54:24
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-09-30 15:15:27
 * @Description: 地图组件
-->
<script setup>
	import AMapLoader from '@amap/amap-jsapi-loader'; 
  
	const { makers = [],height='100vw' } = defineProps({
		makers: Array,height: String,
	});
	const activeMaker = ref({});
	let map;
 

	AMapLoader.load({
		key: '8d1a96b8010d4f16e6a73e964155c116', // 申请好的Web端开发者Key，首次调用 load 时必填
		version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
		plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
	})
		.then((AMap) => { 
			initMap();
		})
		.catch((e) => {
			console.log(e);
		});

         function initMap() {
		map = new AMap.Map('map', {
			zoom: 12, //设置地图显示的缩放级别
			center: [120.1959, 30.261095], //设置地图中心点坐标
			mapStyle: '', //显示样式
			layers: [AMap.createDefaultLayer()], //设置图层,地貌贴图 new AMap.TileLayer.Satellite()
			mapStyle: 'amap://styles/12a0c2fca7852d6bd9ac47ecf3f1f51d', //设置地图的显示样式
			viewMode: '2D', //设置地图模式
			// viewMode: '3D', //设置3d地图模式
			// pitch: 20, //俯仰角度，2D地图下无效 。
			// terrain: true, //地图是否展示地形，此属性适用于 3D 地图。(JSAPI v2.1Beta 及以上版本)
		});
		addMakers(makers);
	}
	const addMakers = (list) => {
		for (const { id, name, longitude, latitude } of list) {
			const maker = new AMap.Marker({
				position: new AMap.LngLat(longitude, latitude),
				offset: new AMap.Pixel(-20, -40),
				icon: '/src/assets/svg/maker.svg', // 添加 Icon 图标 URL
				title: name,
				// label: {
				// 	content: name,
				// },
				extData: { id, name },
			});
			maker.on('click', handleMakerClick);
			map.add(maker);
		}
	};
    // const infoWindow = new AMap.InfoWindow({
	// 	// content: activeMaker.value.name,
	// 	content: `<div><p>${activeMaker.name}</p></div>`,
	// 	anchor: 'bottom-center',
	// });
	const handleMakerClick = ({ lnglat, pixel, type, target }) => {
		activeMaker.value = target._opts.extData;
		// 在地图上打开信息窗体
		// infoWindow.open(map, [lnglat.lng, lnglat.lat]);
	};
	// map.destroy();// 销毁地图，并清空地图容器

	// 导出组件方法
	// defineExpose({
	// 	addMakers,
	// });
</script>

<template>
	<div id="map"></div>
</template>

<style scoped lang="less">
	#map {
		width: 100%;
		height: v-bind(height);
		// border-radius: 10px;
	}
</style>
