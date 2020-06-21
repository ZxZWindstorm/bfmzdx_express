<template>
	<view class="container">
		<Location></Location>
		<Address class="content" @click.native="addreingClick"></Address>
		<Expressage></Expressage>
	</view>
</template>

<script>
	import Location from '../../common/location.vue'
	import Address from './childComponents/address.vue'
	import Expressage from './childComponents/expressage.vue'
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom'
			}
		},
		methods: {
			
			// 选择地址界面
			addreingClick(){
				console.log('进入地址页面')
				uni.navigateTo({
					url:'../address/address'
				})
			}
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
