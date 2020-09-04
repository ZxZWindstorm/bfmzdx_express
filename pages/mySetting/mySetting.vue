<!-- 个人信息修改页面 -->
<template>
	<view>
		asdsf
	</view>
</template>

<script>
	import {myGET} from '../../api/api.js'
	import {userEneity} from '../../api/vo/eneity.js'
	import {getUser} from '../../api/request.js'
	export default {
		data() {
			return {
				userEneityView :userEneity
			}
		},
		onShow() {
			// 如果能够拿到基础的信息则进行覆盖
			this.getUserEneityView()
		},
		methods: {
			async getUserEneityView() {
				let e = uni.getStorageSync("userInfo")._id
				let url = getUser;
				url = url.replace("###",e)
				await myGET(url,null)
				.then((res)=>{
					console.log(res)
					this.message=res.data;
				})
				.catch((err)=>{
					console.log(err)
				})
			},
		}
	}
</script>

<style>

</style>
