<template>
	<view class="container">
<!-- 		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">导航栏</block>
		</cu-custom> -->
		<Location ></Location>
		<swiper class="banner-swiper" circular autoplay :interval="3000" :duration="2000">
			<swiper-item class="banner-swiper-item" v-for="(item, index) in swipers" :key="index">
				<image :src="item"mode="aspectFill" ></image>
			</swiper-item>
		</swiper>
	<!-- 	//大型底层展图栏 -->
		
		<view class="content">
			
			<!-- section-1 begin -->
			<view class="section-1 shadow-warp " >
				<navigator class="item" @click="workClick" cliopen-type="switchTab" hover-class="none">
					<image src="/static/home/home_waimai.png" mode="widthFix"></image>
					<view class="wenyue-font text-bold ">我要接单</view>
					<view class="text-gray">助人同时 赚取报酬</view>
				</navigator>
				
		<!-- 		//主要展示入口1 -->
				<navigator class="item" @click="orderClick"open-type="navigate"  hover-class="none">
					<image src="/static/home/home_liwu.png" mode="widthFix"></image>
					<view class="wenyue-font text-bold">现在下单</view>
					<view class="text-gray"> 帮我拿快递</view>
				</navigator>
			<!-- 	//主要展示入口2 -->
			
			</view>
			<!-- section-1 end -->
			
			<view class="cu-bar bg-white justify-around padding-sm radius shadow-warp bg-white margin-bottom bg-gradual-blue">
				<view class="action sub-title" @click="taskClick">
					<text class="text-xl text-bold ">我的任务</text>
					<text class="text-ABC ">Stak</text>
					<!-- last-child选择器-->
				</view>
				<view class="action sub-title " @click="myorderClick">
					<text class="text-xl text-bold ">我的订单</text>
					<text class="text-ABC ">order</text>
					<!-- last-child选择器-->
				</view>
			</view>
			
			<!-- section-2 begin -->
			<view class="section-2 padding-sm  radius shadow-warp bg-white margin-top "@click="howtoClick">
				<navigator class="item" >
					<view class="title">
						<image src="/static/home/home_ma.png"></image>
						<view>欢迎使用本平台(平台暂时未接入支付)</view>
					</view>
					<view class="tips">想要进行接单请更新个人信息,联系管理员审核</view>
				</navigator>
			
				
			</view>
			<!-- section-2 end -->
		
			
			
		</view>
	</view>
</template>

<script>
	import Location from '../../common/location.vue'
	import Address from './childComponents/address.vue'
	import Expressage from './childComponents/expressage.vue'
	export default {
		data() {
			return {
				swipers: [
					// 展图图源列表用存url
					"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3022720845,2400704155&fm=26&gp=0.jpg",
					"http://www.800bestex.com/Content/images/service/s2.jpg",
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598890254241&di=d50c98e13b09fecbf1a0fd4256933729&imgtype=0&src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2F10070l000000dpemd64EB.jpg",
				],
				href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom',
				historyUniList:[],
			}
		},
		methods: {
			
			// 选择地址界面
			orderClick(){
				console.log('进入下单页面')
				uni.navigateTo({
					url:'../address/address'
				})
			},
			workClick(){
				console.log('进入接单页面')
				uni.switchTab({
					url:'../discover/discover'
				})
			},
			howtoClick(){
				console.log('进入教程页面')
				uni.navigateTo({
					url:'./childComponents/howtodo'
				})
			},
			taskClick(){
				console.log('进入任务页面')
				uni.navigateTo({
					url:'../task/task'
			})
			},
			myorderClick(){
				console.log('进入订单页面')
				uni.switchTab({
					url:'../orederForm/orederForm'
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



<style scoped lang="scss" >
	page {
		max-height: 100%;
	}

	.banner-swiper {
		width: 100%;
		height: 400rpx;
		
		.banner-swiper-item {
			image {
				width: 100%;
			}
		}
	}
	
	.content {
		width: 100%;
		padding: 0 30rpx;
		position: relative;
	}
	
	.section-1 {
		position: relative;
		background-color: $bg-color-white;
		margin-top: -60rpx;
		border-radius: $border-radius-lg;
		padding: 60rpx 0;
		display: flex;
		margin-bottom: 30rpx;
		
		.item {
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			
			&:nth-child(1):after {
				content: '';
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				width: 2rpx;
				background-color: $border-color;
			}
			
			image {
				width: 100rpx;
				margin-bottom: 20rpx;
			}
			
			.wenyue-font {
				font-size: 48rpx;
				margin-bottom: 10rpx;
			}	
		}
	}
	
	.section-2 {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		
		.item {
			width: 670rpx;
			padding: $spacing-row-lg 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-radius: $border-radius-lg;
			
			.title {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: $font-size-lg;
				
				image {
					width: 60rpx;
					height: 60rpx;
					margin-right: 10rpx;
				}
			}
			
			.tips {
				color: $text-color-assist;
				font-size: $font-size-base;
			}
		}
	}
	
</style>
