<!--
 * @Date: 2022-10-25 10:27:38
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-11 11:56:33
 * @Description: 
-->
<script lang="ts" setup>
	const { makers } = defineProps<{
		makers?: any[];
	}>();

	let map: any;

	onMounted(() => initMap());

	const popup = reactive(<any>{
		visibility: false,
		content: {},
	});
	let popuopX: number;
	let popuopY: number;

	const makerWindow = new T.InfoWindow();

	const setMakerWindow = ({ name, repositoryNum }: Venue, target: any) => {
		makerWindow.setContent(
			"<div> <div class='p-0'>" +
				`<p class=''>${name}</p>` +
				`<p class=''>资源数量：${repositoryNum || 0}</p>` +
				'' +
				'</div></div>'
		);
		target.openInfoWindow(makerWindow);
	};

	//
	const imageURL =
		'http://t0.tianditu.gov.cn/img_w/wmts?' +
		'SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles' +
		'&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=cbf747f3c05f4a8ce26160b19ffe581a';

	// 实例化地图
	const initMap = () => {
		if (!T) return setTimeout(() => initMap(), 200);
		map = new T.Map('map-canvas', { minZoom: 5, maxZoom: 13 });
		map.centerAndZoom(new T.LngLat(120.170667, 30.274543), 8); // 设置中心点和比例
		// map.addLayer(new T.TileLayer(imageURL, { minZoom: 1, maxZoom: 18 }));
	};
	//向地图上添加标注
	const addMaker = (list: any[]) => {
		console.log(list);

		list.forEach(({ longitude, latitude, legendUrl, ...other }) => {
			const maker = new T.Marker(
				new T.LngLat(+longitude, +latitude),
				getMarkerOptions(legendUrl)
				// getMarkerOptions()
			);
			maker.on('mouseover', ({ lnglat, target, originalEvent }: any) => {
				setMakerWindow(other, target);
				return;
				const { clientX, clientY } = originalEvent;
				[popuopX, popuopY] = [clientX, clientY];
				popup.visibility = true;
				console.log([clientX, clientY]);
			});
			map.addOverLay(maker);
		});
	};
	const updateMaker = (list: any[]) => {
		map.clearOverLays();
		addMaker(list);
	};
	const defaultIcon = new URL(`/src/assets/images/icon/location.png`, import.meta.url).href;
	const getMarkerOptions = (iconUrl: string = defaultIcon) =>
		iconUrl
			? {
					icon: new T.Icon({ iconUrl, iconSize: new T.Point(30, 30) }),
			  }
			: null;
	defineExpose({
		addMaker,
		updateMaker,
	});
</script>

<template>
	<div class="w-full h-full">
		<div
			class="map-canvas"
			id="map-canvas"
			style="width: 100%; height: 100%"
		></div>
	</div>
</template>

<style lang="less" scoped></style>
