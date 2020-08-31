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
				href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom',
				historyUniList:[]
			}
		},
		methods: {
			
			// 选择地址界面
			addreingClick(){
				console.log('进入地址页面')
				uni.navigateTo({
					url:'../address/address'
				})
			},
			// 进行定位的方法
			getLocation(){
				// 默认写入一个本地历史记录
				let university_data={
					name:"北方民族大学",
					_id:"294136c35f4477470040bb6d3ae9bfe8"
				};
				//this.setHistory(university_data);
				let searchArray = uni.getStorageSync('search_key')||[];
				if(searchArray.length>0){
					university_data=searchArray[0]
				}
				else{
					uni.setStorageSync('search_key',[university_data])
				}
				this.$store.commit('UpdateUniversity',university_data); 
			}
		},
		mounted() {
			// only 执行一次
			this.getLocation()
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
