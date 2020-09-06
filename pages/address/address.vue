<template>
	<view>
		<view class="container  ">
			<view class="expressItem  ">
				<block  v-for="(item,index) in addressList" :key="index">
					
					<view class="padding-sm  radius shadow-warp bg-white margin-top">
						<view class="cu-bar bg-gradual-blue solid-bottom margin-top padding-sm  justify-between  radius">
							<view class="text-bold flex" >收货人:{{item.name}}</view>
							<view class="text-bold flex" >电话:{{item.phone}}</view>		
						</view>
										
						<view class="iteminfo  bg-white margin-bottom   ">
							<view class=" justify-between flex padding-lg solid-bottom ":class="10?'solids-bottom':'solid-bottom'">
								<view class="  text-xl  text-bold" > 地址:{{item.address}}</view>
							</view>
							<view class=" justify-around align-center flex padding-lg" >
								<button class="cu-btn bg-gradual-blue shadow-blur " @click="changeAddress(item)">使用地址</button>
								<button class="cu-btn bg-red  shadow-blur" @click="deleteAddress_method(index)">删除地址</button>
							</view>						
						</view>	

					</view>
				</block>	
				
			</view>
			<view class="justify-around flex padding-sm " >
				<button class="cu-btn bg-gradual-green lg padding-xl shadow-blur" @click="addAddress_method">增加新地址</button>
				
			</view>
		</view>
			
		<!-- 登录模态弹窗组件 -->
		<modal ref="mon"></modal>
		
	</view>
</template>


<script>
	import {publicing,listing,myGET,myDELETE} from '../../api/api.js'
	import {getAddress,deleteAddress,addAddress} from '../../api/request.js'
	
	import modal  from '../../element/modal.vue'
	export default{
		components:{modal},
		data() {
			return {
				addressList: [],
				userInfo:{}
			}
		},
		methods:{
			//获取地址信息的网络请求
			getAdderss_method(){
				if(this.userInfo){
					console.log(this.userInfo)
					let search_data={
						'user_id_eq':this.userInfo._id
					}
					
					myGET(getAddress,search_data)
					.then((res)=>{
						console.log(res);
						this.addressList=res.data;
					})
					.catch((err)=>{
						
					})
				}
			},
			//删除地址
			deleteAddress_method(index){
				// let data={
				// 	userid: this.userInfo.id,
				// 	address_id:this.addressList[index].id
				// };
				let data ={}
				// deleteAddress为只读
				let url = deleteAddress;
				url = url.replace("###",this.addressList[index]._id)
				myDELETE(url,data)
				.then((res)=>{
					this.addressList.splice(index,1)
				})
				.catch((err)=>{
					
				})
				
			},
			//增加地址
			addAddress_method(){
				this.userInfo = uni.getStorageSync("userInfo");
				if(this.userInfo)
				{
					uni.navigateTo({
					    url: './addSite'
					});
				}
				else{
					console.log('用户没有登录')
					// 弹出模态登录框
					this.$nextTick(()=>{
						this.$refs.mon.init();
					})
					
				}

			},
			//修改本地地址并且返回到上一级地址
			
			
			changeAddress(item){
				//返回上一级别
				console.log("修改当前缓存地址")
				this.$store.commit("UpdataAddress",item)
				uni.navigateTo({
					url:'../index/childComponents/expressage'
				})
			}
		},
		onShow() {
				this.userInfo = uni.getStorageSync("userInfo");
				if(this.userInfo)
				{
					this.getAdderss_method()
				}
		},
		mounted(){
			
		}
	}
</script>

<style >
</style>
