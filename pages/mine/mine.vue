<template>
	<view class="padding-sm">
		<view class="home bg-gradual-blue justify-between radius shadow-warp bg-white margin-bottom  ">
			<!--未登录的情况-->
			<view v-if="!islogin" class="noLog_view ">
				<view class="noLog_view_text">登陆高校联盟，开启快递旅程</view>
				<view>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
				</view>
			</view>

			<!--已经登录-->
			<view v-if="islogin" class="  padding-sm  flex justify-between align-center" @click="goMySetting">
					<image class="cu-avatar xl round margin-left" :src="userInfo.avatarUrl"></image>
					<text class="text-white text-bold text-xl padding-xl ">{{userInfo.nickName}}</text>
			</view>
			
		</view>
		<Meau></Meau>
	</view>
</template>

<script>
	import {
		publicing
	} from '../../api/api.js'
	import {
		wxloginurl
	} from '../../api/request.js'
	import Meau from './childComponents/Meau.vue'
	let logins = require('../../login/login.js')
	export default {
		components: {
			Meau
		},
		data() {
			return {
				islogin: true,
				userInfo: {}
			}
		},
		methods: {
			getUserInfo(event) {
				let wxing = event.detail.userInfo
				// 实例化类
				const logclass = new logins(wxing)
				// 实例化类之后。可以访问类中的方法和属性
				logclass.listing()
					.then((res) => {
						this.islogin = true
						let userInfo = uni.getStorageSync("userInfo")
						this.userInfo = userInfo
					})
					.catch((err) => {
						this.islogin = false
						console.log(err)
					})

			},
			goMySetting(){
				uni.navigateTo({
					url:'../mySetting/mySetting'
				})
			}
		},
		onShow() {
			console.log("进入触发onshow")
			let userInfo = uni.getStorageSync("userInfo")
			if (userInfo) {
				this.islogin = true
				this.userInfo = userInfo
			} else {
				//调用登录方法
				this.islogin = false
			}
		}
	}
</script>

<style>
	.log_text text {
		font-size: 35upx;
	}

	.home {
		display: flex;
		width: 100%;
		height: 300rpx;
		align-items: center;
	}

	.noLog_view {
		margin: 0 auto;
		/* height: 300rpx; */
	}

	.noLog_view_text {
		font-size: 38upx;
		color: #ffffff;
		margin-bottom: 25upx;
	}

	.noLog_button {
		font-size: 35upx;
		color: #FFFFFF;
		margin-bottom: 25upx;
	}

	.noLog_view button {
		border: none;
		font-size: 30upx;
		background: linear-gradient(to right, #28a6f1 10%, #0e8dd7 80%);
		border-radius: 50upx;
		color: #FFFFFF;
	}
</style>
