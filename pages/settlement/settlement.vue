<!-- 订单的详情页，可以查看更详细的订单信息 -->
<template>
	<view>
		<view class="content">
			<view class="o_block">
				<view class="header">地址信息</view>
				<u-row gutter="16">
						<u-col span="4">
							<view class="">{{dataView.e_address[0].university}}</view>
						</u-col>
				</u-row>
				<u-row gutter="16">
						<u-col span="3">
							<view class="">{{dataView.e_address[0].name}}</view>
						</u-col>
						<u-col span="5">
							<view class="">{{dataView.e_address[0].phone}}</view>
						</u-col>
				</u-row>
			</view>
			<view class="o_block">
				<view class="header">快递信息</view>
				<u-row gutter="16">
						<u-col span="4">
							<view class="">{{dataView.e_type}}</view>
						</u-col>
						<u-col span="4">
							<view class="">取件码:{{dataView.e_take_code}}</view>
						</u-col>
				</u-row>
			</view>
			<view class="o_block">
				<view class="header">订单</view>
				<u-row gutter="16">
						<u-col span="4">
							<view class="">金额:{{dataView.e_money}}</view>
						</u-col>
						<u-col span="8">
							<view class="">订单编号:{{dataView._id}}</view>
						</u-col>
				</u-row>
			</view>
			<!-- 支付 -->
			<view class="payment">
				<view class="payment-left">
					<text>合计</text>
					<text>¥{{dataView.e_money}}</text>
				</view>
				<view class="payment-right_1" @click="removePay()">
					取消
				</view>
				<view class="payment-right_2" @click="toPay()">
					去支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {publicing,myGET,myDELETE,myPUT} from '../../api/api.js'
	import {getOrderById,removeOrderById,changeMyRecive} from '../../api/request.js'
	import {eorderEneity} from '../../api/vo/eneity.js'
	export default {
		data() {
			return {
				dataView:eorderEneity
			}
		},
		methods: {
			init(e){
				let url =getOrderById
				url = url.replace("###",e)
				myGET(url,null)
				.then((res)=>{
					console.log(res)
					this.dataView=res;
				})
				.catch((err)=>{
					
				})
			},
			toPay(){
				// 访问数据库并且修改状态,重定向到我的订单页面。
				let change_data={
					_id: this.dataView._id,
					e_state:"待接取"
				}
				myPUT(changeMyRecive,change_data)
				.then((res)=>{
					console.log(res)
					if(res.errMsg=="collection.update:ok"){
						this.$u.toast("支付成功!");
						uni.navigateBack({
							
						})
					}
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			removePay(){
				// let data={
				// 	order_id:this.dataView._id,
				// 	// init_id:this.dataView.e_initId
				// }
				let url =removeOrderById
				url = url.replace("###",this.dataView._id)
				
				myDELETE(url,null)
				.then((res)=>{
					console.log(res)
					if(res.errMsg=="collection.remove:ok"){
						this.$u.toast("删除成功!");
						uni.navigateBack({
							
						})
					}
				})
				.catch((err)=>{
					
				})
			}
		},
		onLoad(option) {
			console.log(option._id)
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
