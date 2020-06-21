<template>
	<view>
		<MyHead :mytext="mytext"></MyHead>
		
		<view class="content">
			<scroll-view scroll-y style="height: 100%;width: 100%">
				<block v-for="(item,index) in orderForms" :key="index">
					<OrderFormItem
					:expressData="item">
					</OrderFormItem>
				</block>
			</scroll-view>
		</view>
		<!-- <block v-for="(item,index) in orderForms" :key="index">
			<OrderFormItem
			:expressData="item">
			</OrderFormItem>
		</block> -->
	</view>
</template>

<script>
	import OrderFormItem from './orderFormItem.vue'
	import MyHead from '../../common/myHead.vue'
	import {publicing} from '../../api/api.js'
	import {getMyRecive} from '../../api/request.js'
	export default {
		components:{OrderFormItem,MyHead},
		data() {
			return {
				orderForms:[],
				mytext:"我的订单"
			}
		},
		onShow() {
			this.loadOrderForm()
		},
		methods: {
			loadOrderForm(){
				console.log("加载我发布的订单了哟")
				let data = {
					eInitId:'0'
				}
				publicing(getMyRecive,data)
				.then((res)=>{
					console.log(res)
					this.orderForms=res.data;
				})
				.catch((err)=>{
					console.log("错误")
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		padding: 15rpx 20rpx;
		background-color: #C0C4CC;
	}
</style>
