<template>
	<view class="container">
		<Location></Location>
		<Address class="content"></Address>
		<Expressage></Expressage>
	</view>
</template>

<script>
	import Location from './childComponents/location.vue'
	import Address from './childComponents/address.vue'
	import Expressage from './childComponents/expressage.vue'
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom'
			}
		},
		methods: {

		},
		components:{
			Location,
			Address,
			Expressage
		}
	}
</script>

<style>
	.container {
		/* font-size: 14px;
		line-height: 24px; */
		background-color:#fffff7;
		height: 1000px;
	}
	.content{
		
	}
</style>
