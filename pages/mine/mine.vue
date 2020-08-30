<template>
	<view>
		<view class="home">
			<!--未登录的情况-->
			<view v-if="!islogin" class="noLog_view">
				<view class="noLog_view_text">登陆高校联盟，开启快递旅程</view>
				<view>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
				</view>
			</view>

			<!--已经登录-->
			<view v-if="islogin" class="log_view">
				<view>
					<image :src="userInfo.avatarUrl"></image>
				</view>
				<view class="log_text">
					<text>{{userInfo.nickName}}</text>
				</view>
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
						console.log(res)
					})
					.catch((err) => {
						this.islogin = false
						console.log(err)
					})

			},

		},
		onShow() {
			console.log("进入触发onshow")
			let userInfo = uni.getStorageSync("userInfo")
			if (userInfo) {
				this.islogin = true
				console.log('1')
				this.userInfo = userInfo
			} else {
				//调用登录方法
				this.islogin = false
				console.log('2')
			}
		}
	}
</script>

<style>
	.log_view image {
		width: 120upx !important;
		height: 120upx !important;
		border-radius: 50%;
		margin-right: 20upx;
		border: 10rpx solid #999999;
	}

	text {
		display: block;
		margin: 10upx 0;
		color: #000000;
	}

	.log_view {
		display: flex;
		align-items: center;
		padding: 0 30upx;
		align-content: center;
		height: 200upx;
	}

	.log_text text {
		font-size: 35upx;
	}

	.home {
		display: flex;
		background: #2BC0E4;  /* fallback for old browsers */
		background: -webkit-linear-gradient(to right, #EAECC6, #2BC0E4);  /* Chrome 10-25, Safari 5.1-6 */
		background: linear-gradient(to right, #EAECC6, #2BC0E4); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

		width: 100%;
		height: 400upx;
		align-items: center;
	}

	.noLog_view {
		margin: 0 auto;
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
