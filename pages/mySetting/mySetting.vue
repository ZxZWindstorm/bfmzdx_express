<!-- 个人信息修改页面 -->
<template>
	<view class="container">
		<u-avatar :src="userEneityView.u_avatar"></u-avatar>
	<u-form :model="userEneityView" ref="uForm">
				
				<u-form-item label="姓名" prop="u_name">
					<u-input v-model="userEneityView.u_name" />
				</u-form-item>
				<u-form-item label="性别" prop="u_gender">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="userEneityView.u_gender" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
				</u-form-item>
				<u-form-item :rightIconStyle="{color: '#888', fontSize: '32rpx'}" right-icon="kefu-ermai" label="手机号码" prop="u_phone" label-width="150">
					<u-input :border="border" placeholder="请输入手机号" v-model="userEneityView.u_phone" type="number"></u-input>
				</u-form-item>
				<!-- 验证码功能，未开发 -->
<!-- 				<u-form-item  label="验证码" prop="code" label-width="150">
					<u-input :border="border" placeholder="请输入验证码" v-model="userEneityView.code" type="text"></u-input>
					<u-button slot="right" type="success" size="mini" @click="getCode">{{codeTips}}</u-button>
				</u-form-item> -->
				
			</u-form>
			<u-button @click="submit">提交</u-button>
			<u-action-sheet :list="gender_list" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import {myGET,myPUT} from '../../api/api.js'
	import {userEneity} from '../../api/vo/eneity.js'
	import {getUser,updateUser} from '../../api/request.js'
	export default {
		data() {
			return {
				userEneityView :userEneity,
				actionSheetShow:false,
				gender_list: [
					{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				rules: {
					u_name: [
						{ 
							required: true, 
							message: '请输入姓名', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					u_gender: [
						{
							required: true,
							message: '请选择性别',
							trigger: 'change'
						},
					],
					u_phone: [
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
					code: [
						{
							required: true,
							message: '请输入验证码',
							trigger: ['change','blur'],
						},
						{
							type: 'number',
							message: '验证码只能为数字',
							trigger: ['change','blur'],
						}
					],
				}
			};
			},
		onShow() {
			// 如果能够拿到基础的信息则进行覆盖
			this.getUserEneityView()
		},
		methods: {
			submit() {
				console.log(this.userEneityView)
						this.$refs.uForm.validate(valid => {
							if (valid) {

								myPUT(updateUser,this.userEneityView).then((res)=>{
									console.log("更新成功")
									let e = uni.getStorageSync("userInfo")
									e.nickName = this.userEneityView.u_name
									uni.setStorageSync("userInfo",e)
									uni.navigateBack({
										
									})
								}).catch((err)=>{
									console.log("更新失败")
								})
								
							} else {
								console.log('验证失败');
							}
						});
					}
			,
			async getUserEneityView() {
				let e = uni.getStorageSync("userInfo")._id
				let url = getUser;
				url = url.replace("###",e)
				await myGET(url,null)
				.then((res)=>{
					console.log(res)
					 this.userEneityView=res.data;
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.userEneityView.u_gender = this.gender_list[index].text;
			},
			
		},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style scoped>

.container{
	padding: 15rpx 20rpx;
}
</style>
