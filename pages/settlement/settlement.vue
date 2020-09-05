<!-- 订单的详情页，可以查看更详细的订单信息 -->
<template>
	<view class="container ">
		<view class="cu-list menu card-menu margin-top" >
			
			<view class="cu-item bg-gradual-blue cubar radius padding-sm " >
				<view class="content flex justify-between text-bold">
					<view >快递公司：</view>
					<view >{{message.e_type}}</view>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">订单号:{{message.e_start_time}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">收货地址：{{message.e_address[0].address}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">下单时间：{{message.e_start_time |formatDate}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">客户备注：</text>
					<text class="text-grey">{{message.e_matter}}</text>
				</view>
			</view>
			
			
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					<text class="cuIcon-title text-red text-bold"></text> 合计：{{message.e_money}}
				</view>
				<view class="action" v-if="isHave">
					<button class="cu-btn bg-gradual-blue shadow">已支付</button>
				</view>
				<view class="action" v-else>
					<button class="cu-btn bg-gradual-blue shadow" @tap="showModal" data-target="bottomModal">去支付</button>
				</view>
			</view>
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white">
						<view class="action text-gray" @tap="hideModal">取消</view>
					</view>
					<view class="padding-lg ">
						<view class="cu-bar bg-white tabbar border shop s">
							<view class="bg-white submit radius text-bold ">合计：{{message.e_money}}</view>
							<view class="bg-green submit radius" @tap="paycheck" data-target="true" >微信支付</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="cu-modal" :class="payinfo=='true'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">支付成功</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						进入我订单查看订单详情
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-gradual-blue " @tap="goMyOrder">确定</button>		
							
						</view>
					</view>
				</view>
			
			</view>




	
		</view>
	<button  @click="goMyOrder">进入我的订单</button>			
	</view>
</template>

<script>
	import {publicing,myGET,myPUT} from '../../api/api.js'
	import {getOrderById,removeOrderById,updateOrder} from '../../api/request.js'
	
	export default {
		data() {
			return {
				modalName: null,
				message:{},
				payinfo:null
			}
		},
		filters: {
		    formatDate(time) {
		      // return this.$moment(time).format(YYYY-MM-DD);
			  let now = new Date(time); // 依情况进行更改 * 1
			       let   y = now.getFullYear();
			       let   m = now.getMonth() + 1;
			       let   d = now.getDate();
			        
					 return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
		    }
		  },
		methods: {
			paycheck(e){
				this.payinfo = e.currentTarget.dataset.target
				// 后端代码更新接单
				let userInfo = uni.getStorageSync("userInfo")
				let date = {
				  _id:this.message._id,
				   e_state:'待接取'
				}
				myPUT(updateOrder,date).then((res)=>{
					// 刷新页面
					this.init(this.message._id)

				}).catch((err)=>{
					console.log(err)
					console.log("更新失败")
				})
			},
			
			hideModal(e) {
				this.modalName = null
				this.payinfo = null
			},
			goMyOrder(e){
				this.modalName = null
				this.payinfo = null
				this.$nextTick(function(){
					console.log('2213131')
					uni.switchTab({
						url:'../orederForm/orederForm'
					})
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			
			
			init(e){
				
				let url = getOrderById;
				url = url.replace("###",e)
				myGET(url,null)
				.then((res)=>{
					console.log(res)
					this.message=res;
				})
				.catch((err)=>{
					
				})
			},
		},
		onLoad(option) {
			console.log(option._id);
			this.init(option._id)
		},
		computed:{
			isHave:function(){
				let userInfo = uni.getStorageSync("userInfo")
				return this.message.e_state =='待接取'
			}
		}
	}
</script>

<style >

</style>