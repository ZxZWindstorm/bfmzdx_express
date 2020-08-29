<template>
	<view class="wrap">
		<view class="top">
			<u-form :model="dataView" :rules="rules" ref="uForm" :errorType="errorType">
				<!-- 收货人姓名 -->
				<u-form-item :leftIconStyle="{ color: '#888', fontSize: '32rpx' }" left-icon="account" label-width="200" :label-position="labelPosition" label="收货人姓名" prop="name">
					<u-input :border="border" placeholder="请输入姓名" v-model="dataView.name" type="text"></u-input>
				</u-form-item>
				<!-- 收货人电话 -->
				<u-form-item :leftIconStyle="{ color: '#888', fontSize: '32rpx' }" left-icon="phone" label-width="200" :label-position="labelPosition" label="收货人电话" prop="phone">
					<u-input :border="border" placeholder="请输入电话" v-model="dataView.phone" type="text"></u-input>
				</u-form-item>
				<!-- 所在大学 -->
				<u-form-item @tap="showRegionPicker" label-width="200" :label-position="labelPosition" label="所在大学">
					<u-input disabled="true" :border="border" :placeholder="university" v-model="dataView.university" type="text"></u-input>
				</u-form-item>
				<!--详情-->
				<u-form-item label-width="200" :label-position="labelPosition" label="详细信息">
					<textarea type="text" v-model="dataView.address" placeholder-class="line" placeholder="具体居住地址以及宿舍号*重要信息" />
				</u-form-item>
				<u-button @click="submit" class="placeOrder">增加</u-button>
			</u-form>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<MyMask  :maskShow="maskShow"></MyMask>
	</view>
</template>

<script>
	import MyMask from '../../common/myMask.vue';
	import {publicing,myPOST} from '../../api/api.js';
	import {addAddress} from '../../api/request.js';
	import {addressEneity} from '../../api/vo/eneity.js';
	export default {
		components:{MyMask},
		data() {
			return {
				show: false,
				maskShow:false,
				// addressMessage:{
				// 	name:'',
				// 	phone:'',
				// 	university:'',
				// 	university_id:'',
				// 	address:''
				// },
				dataView:addressEneity,
				errorType: ['message'],
				rules: {
					name: [
						{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 15,
							message: '姓名长度在2到15个字符',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.chinese(value);
							},
							message: '姓名必须为中文',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur']
						}
					],
					phone: [
						{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change', 'blur']
						}
					]
				},
			}
		},
		computed:{
			borderCurrent() {
				return this.border ? 0 : 1;
			},
			university(){
				if(this.$store.state.university)
				{
					this.university_id=this.$store.state.university._id;
					return this.$store.state.university.name;
				}
				else
				{
					return "请选择定位大学"
				}
			}
		},
		methods: {
			setDefault() {},
			showRegionPicker() {
				uni.navigateTo({
					url: '../nearTheSchool/nearTheSchool'
				});
			},
			//  提交表单
			submit() {
				//增加地址并回到上一级的路由
				console.log('提交信息');
				
				

				 if(!this.$store.state.university.name){
					 this.$u.toast("请选择学校!");
					 return;
				 }
				 let userInfo = uni.getStorageSync("userInfo")
				 this.dataView.user_id =userInfo._id;
				 this.dataView.university_id = this.$store.state.university._id
				//进行学校的选择以及是否登陆检测
				
				console.log(this.dataView);
				this.maskShow=true;
				myPOST(addAddress,this.dataView)
				.then((res)=>{
					this.maskShow=false;
					console.log(res.errMsg)
					if(res.errMsg=="collection.add:ok"){
						this.$u.toast("增加成功!");
						uni.navigateBack({
							
						})
					}
					else{
							this.$u.toast("增加失败!");
						}
				})
				.catch((err)=>{
					this.maskShow=false;
					this.$u.toast("增加失败!");
				})
				
			}
		
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
.placeOrder {
	color: #00bba2;
	margin: 10rpx 8rpx;
}
</style>
