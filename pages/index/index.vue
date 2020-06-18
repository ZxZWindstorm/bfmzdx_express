<template>
	<view class="container">
		<Location @click.native="toNearTheSchool"></Location>
		<Address class="content" @click.native="addreingClick"></Address>
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
			toNearTheSchool(){
				console.log('进入搜索页面')
				uni.navigateTo({
					url:'../nearTheSchool/nearTheSchool'
				})
			},
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
