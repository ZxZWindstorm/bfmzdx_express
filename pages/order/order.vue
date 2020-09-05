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
					<button class="cu-btn bg-gradual-blue shadow">已接取</button>
				</view>
				<view class="action" v-else>
					<button class="cu-btn bg-gradual-blue shadow" @tap="showModal" data-target="bottomModal">接受此订单</button>
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
						<view class="content">{{tip.title}}</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view class="padding-xl">
						{{tip.message}}
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn bg-gradual-blue " @tap="goMyTask" >确定</button>		
							
						</view>
					</view>
				</view>
			</view>




	
		</view>
	</view>
</template>

<script>
	import {publicing,myGET,myPUT} from '../../api/api.js'
	import {getOrderById,removeOrderById,updateOrder,getUser} from '../../api/request.js'
	
	export default {
		data() {
			return {
				modalName: null,
				message:{},
				payinfo:null,
				tip:{
					title:"",
					message:""
				},
				is_permissions:false
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
			  async paycheck(e){
				this.is_permissions = false
				let userInfo = uni.getStorageSync("userInfo")
				if(userInfo){
						let url = getUser;
						url = url.replace("###",userInfo._id)
					    await myGET(url,null)
						.then((res)=>{
							console.log(res)
							this.is_permissions=res.data.is_permissions;
						})
						.catch((err)=>{
							
						})
						// 如果可以接单
						// 获得user 视图信息
					
						
						console.log(this.is_permissions)
						if(this.is_permissions){
							this.tip.title = "支付成功"
							this.tip.message ="进入我的任务查看任务订单详情"
							this.payinfo = e.currentTarget.dataset.target
							// 后端代码更新接单
							
							let userInfo = uni.getStorageSync("userInfo")
							let date = {
							  _id:this.message._id,
							   e_reciId:userInfo._id,
							   e_state:'待送达'
							}
							myPUT(updateOrder,date).then((res)=>{
								console.log("接受成功")
								// 刷新页面
								this.init(this.message._id)
							
							}).catch((err)=>{
								console.log(err)
								console.log("更新失败")
							})
						}
						else{
							this.tip.title = "接受失败"
							this.tip.message ="没有权限"
							this.payinfo = e.currentTarget.dataset.target
							console.log("没有权限")
						}
					
				}
				},
			
			hideModal(e) {
				this.modalName = null
				this.payinfo = null
			},
			goMyTask(e){
				this.modalName = null
				this.payinfo = null
				uni.navigateTo({
					url:'../task/task'
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
				return this.message.e_reciId ==userInfo._id
			}
		}
	}
</script>

<style >

</style>