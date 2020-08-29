<!-- 订单的详情页，可以查看更详细的订单信息 -->
<template>
	<view>
		<view class="content">
			<view class="o_block">
				<view class="header">地址信息</view>
				<u-row gutter="16">
						<u-col span="4">
							<view class="">{{message.eAddressId.university}}</view>
						</u-col>
				</u-row>
				<u-row gutter="16">
						<u-col span="3">
							<view class="">{{message.eAddressId.name}}</view>
						</u-col>
						<u-col span="5">
							<view class="">{{message.eAddressId.phone}}</view>
						</u-col>
				</u-row>
			</view>
			<view class="o_block">
				<view class="header">快递信息</view>
				<u-row gutter="16">
						<u-col span="4">
							<view class="">{{message.eType}}</view>
						</u-col>
						<u-col span="4">
							<view class="">取件码:{{message.eTakeCode}}</view>
						</u-col>
				</u-row>
			</view>
			<view class="o_block">
				<view class="header">订单</view>
				<u-row gutter="16">
						<u-col span="4">
							<view class="">金额:{{message.eMoney}}</view>
						</u-col>
						<u-col span="8">
							<view class="">订单编号:{{message.eId}}</view>
						</u-col>
				</u-row>
			</view>
			<!-- 支付 -->
			<view class="payment">
				<view class="payment-left">
					<text>合计</text>
					<text>¥{{message.eMoney}}</text>
				</view>
				<view class="payment-right_2" @click="toPay()">
					接取订单
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {publicing,myGET} from '../../api/api.js'
	import {getOrderById,removeOrderById} from '../../api/request.js'
	export default {
		data() {
			return {
				message:{}
			}
		},
		methods: {
			init(e){
				
				let url = getOrderById;
				url = url.replace("###",e)
				myGET(getOrderById,e)
				.then((res)=>{
					console.log(res)
					this.message=res.data;
				})
				.catch((err)=>{
					
				})
			},
		},
		onLoad(option) {
			console.log(option._id);
			this.init(option._id)
		}
	}
</script>

<style scoped>

.content{
	background-color: #D3D3D3;
	height: 100vh;
	padding: 15rpx 15rpx;
}
.o_block{
	margin: 15rpx 15rpx;
	background-color: #FFFFFF;
	border-radius: 15rpx;
	padding: 24rpx 12rpx;
}
.header{
	font-size: 38rpx;
	font-weight: bolder;
}
.payment{background: #FFFFFF;
		height: 120upx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;}
		.payment-left{display: flex; align-items: center;
		font-size: 30upx;}
		.payment-left text:nth-child(2){font-weight: bold; font-size: 32upx;}
		.payment-right_1{background: red; color: #FFFFFF;
		padding: 20upx 60upx;
		font-size: 30upx;
		border-radius: 7upx;}
		.payment-right_2{background: #07c160; color: #FFFFFF;
		padding: 20upx 60upx;
		font-size: 30upx;
		border-radius: 7upx;}
</style>
