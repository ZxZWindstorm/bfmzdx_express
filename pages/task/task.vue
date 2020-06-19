<template>
	<view>
		<MyHead :mytext="mytext"></MyHead>
		<block v-for="(item,index) in orderForms" :key="index">
			<OrderFormItem
			:expressData="item">
			</OrderFormItem>
		</block>
	</view>
</template>

<script>
	import OrderFormItem from './taskItem.vue'
	import MyHead from '../../common/myHead.vue'
	import {publicing} from '../../api/api.js'
	import {getMyPublish} from '../../api/request.js'
	export default {
		components:{OrderFormItem,MyHead},
		data() {
			return {
				orderForms:[],
				mytext:"我的任务"
			}
		},
		onShow() {
			this.loadOrderForm()
		},
		methods: {
			loadOrderForm(){
				console.log("加载我接受的任务了哟")
				let data = {
					eInitId:'0'
				}
				publicing(getMyPublish,data)
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

<style>

</style>
