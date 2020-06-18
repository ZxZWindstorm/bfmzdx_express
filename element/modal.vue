<template>
	<view>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text">请登陆后再操作</view>
				<view class="warp-flex">
					<button @click="messcancel()" plain="true">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
				</view>
			</view>
		</view>
		<!-- 提示组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	var {log} = console
	import {publicing} from "@/api/api.js"
	import {wxloginurl} from '@/api/request.js'
	// 引入提示组件
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	//引入类
	let logins = require('../login/login.js')
	export default{
		components: {HMmessages},
		data() {
			return {
				modaishow: false
			}
		},
		
		methods:{
			// 显示
			init(){
				this.modaishow = true
			},
			// 取消
			messcancel(){
				this.modaishow = false
			},
			
			// 登录
			getUserInfo(event){
				this.modaishow = false
				let wxing = event.detail.userInfo
				// 实例化类
				const logclass = new logins(wxing)
				// 实例化类之后。可以访问类中的方法和属性
				logclass.listing()
				.then((res)=>{
					log(res)
					let succ = '登录成功'
					let ico = 'success'
					this.tIps(succ,ico)
					uni.navigateTo({
					    url: './addSite'
					});
				})
				.catch((err)=>{
					log(err)
				})
				
			},
			
			// 提示
			tIps(succ,ico){
				this.HMmessages.show(succ,{icon:ico,fontColor:"#ffffff",iconColor:"#ffffff",background:"rgba(102,0,51,0.8)"})
			}
		}
	}
</script>

<style scoped>
	/* 模态弹窗布局 */
	.warp{position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: rgba(0,0,0,0.6);
	z-index: 9999;}
	.warp-view{width: 500upx;
			height: 200upx;
			background: #FFFFFF;
			margin: auto;
			position: absolute;
			-webkit-position:absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			border-radius: 8upx;
			overflow: hidden;
			}
	.warp-text{text-align: center;
			margin-top: 30upx;
			font-size: 34upx;
			color: #666666;}		
	.warp-flex{ display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
		}
	.warp-flex button{border: none;
	font-size: 30upx;}						
</style>
