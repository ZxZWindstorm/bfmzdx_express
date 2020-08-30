<template>
	<view>
		<block  v-for="(item,index) in addressList" :key="index">
			<view class="address">
				<view class="center"  @click="changeAddress(item)">
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
				uni.navigateBack({
					
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

<style scoped>
	.address{
		height: 70px;
		margin: 10px 7px;
		line-height: 70px;
		background-color: #8ac6d1;
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
		color: #000000;
	}
	.right{
		margin-right: 30rpx;
	}

	.add_button{
		height: 30px;
		line-height: 30px;
		margin: 6px 70px;
		line-height: 70px;
		background-color: #ffe3ed;
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
