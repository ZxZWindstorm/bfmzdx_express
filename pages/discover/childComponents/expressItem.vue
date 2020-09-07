<template>
	<view class="expressItem  " @click="toItem(expressData._id)">
		<view class="radius ">
			<view class="top">
				<view class="type">{{expressData.e_type}}</view>
				<view class="money">￥{{expressData.e_money}}</view>
				<view class="tag">
					<text v-for="(item, index) in expressData.tag" :key="index" :class="{red:item.tagText=='默认'}">{{ item.tagText }}</text>
				</view>
				<view class="state">
					{{expressData.e_state}}
				</view>
			</view>
			<view class="bottom">
				{{expressData.e_address}}
				<u-icon name="edit-pen" :size="40" color="#888888"></u-icon>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			expressData:Object
		},
		data() {
			return {
				// expressData: {
				// 	e_id:'d0001',
				// 	// 发布人信息
				// 	e_type:'中通',
				// 	e_state:'配送中',
				// 	start_time:'2020-2-2 9:00',
				// 	recive_time:'2020-2-2 9:00',
				// 	end_time:'2020-3-3 8:00',
				// 	e_money:'2',
				// 	fine:'2',
				// 	e_address:'八号公寓545斜对面',
				
				// 	tag:[{t_id:'1',tagText:'tagText'}],
				// 	e_issuer:{
				// 		id:'2265865006',
				// 		phone:'14709698211',
				// 	},
				// 	// 接收人信息
				// 	e_recipient:{}
					
				// }
			}
		},
		methods:{
			// 进入商品详情页面
			toItem(_id){
				console.log("触发进入商品详情页面："+_id)
				uni.navigateTo({
					url:'../order/order?_id='+_id
				})
			}
		},
	}
</script>


<style lang="scss" scoped>
.expressItem {
	padding: 40rpx 20rpx;
	.top {
		display: flex;
		width: 100%;
		font-weight: bold;
		font-size: 34rpx;
		.type{
			
		}
		.money {
			margin-left: 60rpx;
		}
		.tag {
			display: flex;
			flex: 1;
			font-weight: normal;
			align-items: center;
			text {
				display: block;
				width: 60rpx;
				height: 34rpx;
				line-height: 34rpx;
				color: #ffffff;
				font-size: 20rpx;
				border-radius: 6rpx;
				text-align: center;
				margin-left: 30rpx;
				background-color:#ffe3ed;
			}
			.red{
				background-color:red
			}
		}
		.state{
			font-weight:normal !important;
			font-size: 28rpx !important;
		}
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 30rpx;
	left: 80rpx;
	background-color:#ffe3ed;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>
