<template>
	<view>
		<block  v-for="(item,index) in addressList" :key="index">
			<view class="address" @click="changeAddress(item)">
		
				<view class="center">
					<view class="top_text">{{item.name+item.phone}}</view>
					<view class="foot_text">{{item.address}}</view>
				</view>
				<view class="right" @click="deleteAddress_method(index)">
					<u-icon name="close"></u-icon>
				</view>
			</view>
		</block>
		<view class=".add_button" @click="addAddress_method"> 
			<u-icon name="plus" label="增加地址"></u-icon>
		</view>
	</view>
</template>

<script>
	import {listing} from '../../api/api.js'
	import {getAddress,deleteAddress,addAddress} from '../../api/request.js'
	export default{
		data() {
			return {
				addressList: []
			}
		},
		methods:{
			//获取地址信息的网络请求
			getAdderss_method(){
				let data={
					userid:'111'
				};
				
				listing(getAddress)
				.then((res)=>{
					this.addressList=res.data.addressList;
				})
				.catch((err)=>{
					
				})
			},
			//删除地址
			deleteAddress_method(index){
				let data={
					userid:'111',
					address_id:'111'
				};
				listing(deleteAddress)
				.then((res)=>{
					this.addressList.splice(index,1)
				})
				.catch((err)=>{
					
				})
				
			},
			//增加地址
			addAddress_method(){
				uni.navigateTo({
				    url: './addSite'
				});
			},
			//修改本地地址并且返回到上一级地址
			changeAddress(item){
				//返回上一级别
				console.log("修改当前缓存地址")
				this.$store.commit("UpdataAddress",item)
				uni.navigateBack({
					
				})
			}
		},
		created() {
			this.getAdderss_method()
		},
	}
</script>

<style scoped>
	.address{
		height: 70px;
		margin: 10px 7px;
		line-height: 70px;
		background-color: #67ffd9;
		padding-left:8px;
		padding-right: 8px;
		border-radius: 15px;
		display: flex;
		align-items: center;
	}
	.left{
		width: 30px;
		height: 30px;
		line-height: 30px;
	}
	.left image{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #007AFF;
	}
	.center{
		flex: 1;
		display: flex;
		height: 50px;
		line-height: 20px;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}
	.center .top_text{
		font-size: larger;
	}
	.center .foot_text{
		font-size: smaller;
		color: #bcbcbc;
	}
	.right{
		margin-right: 30rpx;
	}

	.add_button{
		height: 30px;
		line-height: 30px;
		margin: 6px 70px;
		line-height: 70px;
		background-color: #67ffd9;
		padding-left:8px;
		padding-right: 8px;
		border-radius: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
		align-items: center;
	}
	.add_button .but{
	}
</style>
