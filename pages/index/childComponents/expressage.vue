<template>
	<view class="expressage">
		<u-form :model="model" :rules="rules" ref="uForm" :errorType="errorType">
			<!-- 收货人姓名 -->
			<u-form-item :leftIconStyle="{ color: '#8ac6d1', fontSize: '32rpx' }" left-icon="account" label-width="200" :label-position="labelPosition" label="收货人姓名" prop="name">
				<u-input  @click="tips"  disabled="true" :border="border" placeholder="请输入姓名" v-model="model.name" type="text"></u-input>
			</u-form-item>
			<!-- 收货人电话 -->
			<u-form-item :leftIconStyle="{ color: '#8ac6d1', fontSize: '32rpx' }" left-icon="phone" label-width="200" :label-position="labelPosition" label="收货人电话" prop="phone">
				<u-input @click="tips"  disabled="true" :border="border" placeholder="请输入电话" v-model="model.phone" type="text"></u-input>
			</u-form-item>
			<u-form-item :leftIconStyle="{ color: '#8ac6d1', fontSize: '32rpx' }" left-icon="tags" label-width="200" :label-position="labelPosition" label="收货人电话" prop="goodsType">
				<u-input :border="border" type="select" :select-open="selectShow" v-model="model.deliveryUnit" placeholder="请选择商品类型" @click="selectShow = true" prop="deliveryUnit" ></u-input>
			</u-form-item>
			<!-- 取件码 -->
			<u-form-item :leftIconStyle="{ color: '#8ac6d1', fontSize: '32rpx' }" left-icon="star" label-width="200" :label-position="labelPosition" label="取件码" prop="code">
				<u-input :border="border" placeholder="请输入取件码" v-model="model.code" type="number"></u-input>
			</u-form-item>

			<u-button @click="submit" class="placeOrder">下单</u-button>
		</u-form>
		<u-picker></u-picker>
		<u-select mode="single-column" :list="deliveryUnitList" v-model="selectShow" @confirm="selectConfirm"></u-select>
	</view>
</template>

<script>
	
	import {publicing,myPOST} from '../../../api/api.js'
	import {addOrder} from '../../../api/request.js'
	import {eorderEneity} from '../../../api/vo/eneity.js';
export default {
	data() {
		let that = this;
		return {
			model: {
				name: '',
				phone: '',
				deliveryUnit:'中通快递',
				code: ''
			},
			changeModel:{},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					},
					{
						min: 3,
						max: 5,
						message: '姓名长度在3到5个字符',
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
				code: [
					{
						required: true,
						message: '请输入取件码',
						trigger: 'blur'
					},
					{
						min: 4,
						max: 6,
						message: '取件码在4到6个数字',
						trigger: ['change', 'blur']
					},
					{
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return this.$u.test.number(value);
						},
						message: '取件码必须为数字',
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
				],
				deliveryUnit: [
					{
						required: true,
						message: '请输入快递单位',
						trigger: ['change', 'blur']
					}
				],
			},
			deliveryUnitList: [
				{
					value: '中通快递',
					label: '中通快递'
				},
				{
					value: '申通快递',
					label: '申通快递'
				},
				{
					value: '圆通快递',
					label: '圆通快递'
				},
				{
					value: '百世快递',
					label: '百世快递'
				}
			],

			// 底部选项栏
			selectShow: false,
			border: true,
			labelPosition: 'left',
			check: false,
			selectStatus: 'close',

			radioCheckWidth: 'auto',
			radioCheckWrap: false,

			codeTips: '',
			errorType: ['message'],
			dataView:eorderEneity
		};
	},
	onLoad() {},
	computed: {
		borderCurrent() {
			return this.border ? 0 : 1;
		},
		newName(){
			this.model.name=this.$store.state.address.name;
			return this.$store.state.address.name
		},
		newPhone(){
			this.model.phone=this.$store.state.address.phone;
			return this.$store.state.address.phone
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		// 下单  提交表单
		submit() {
			//检查信息ok后，进行调用
			this.$refs.uForm.validate(valid => {
				if (valid) {
					console.log('提交信息');
					console.log('=============');
					this.dataView.e_initId=uni.getStorageSync("userInfo")._id;
					this.dataView.e_reciId=null;
					this.dataView.e_addressId =this.$store.state.address._id;
					this.dataView.e_type =this.model.deliveryUnit;
					this.dataView.e_state = '待支付';
					this.dataView.e_take_code = this.model.code;
					this.dataView.e_money ="2元";
					this.dataView.e_start_time = null;
					this.dataView.e_recive_time =null;
					this.dataView.e_end_time =null;
					this.dataView.e_universityId = this.$store.state.address.university_id
					this.dataView.e_address =this.$store.state.address.address;
					// let data={
					// 	eInitId:uni.getStorageSync("userInfo").id,
					// 	eAddressId:this.$store.state.address.id,
					// 	eType:this.model.deliveryUnit,
					// 	eTakeCode:this.model.code,
					// 	eMoney:"2元",
					// }
					
					
					myPOST(addOrder,this.dataView)
					.then((res)=>{
						console.log("----------");
						console.log(res);
						if(res.errMsg==="collection.add:ok"){
							this.$u.toast("成功加入订单!");
							//跳转到订单支付页面(携带订单id)
							uni.navigateTo({
								url:'../settlement/settlement?_id='+res._id
								
							})
						}
						else if(res.errMsg==="repetition"){
							this.$u.toast("订单重复了哟!");
						}
						else{
							this.$u.toast("服务器访问出错!");
						}
					})
					.catch((err)=>{
						this.$u.toast("服务器访问出错!");
					})
				} else {
					console.log('验证失败');
				}
			});
			
		},
		// 底部状态栏
		selectConfirm(e) {
			this.model.deliveryUnit = '';
			e.map((val, index) => {
				this.model.deliveryUnit += this.model.deliveryUnit == '' ? val.label : '-' + val.label;
			});
		},
		tips(){
			this.$u.toast("请先选择常用地址!");
		}
	}
};
</script>

<style scoped lang="scss">
.expressage {
	margin: 10px 7px;
	padding-left: 8px;
	padding-right: 8px;
	border-radius: 15px;
	align-items: center;
	border:1rpx #8ac6d1 solid;
	background: #fffdf9; 
	color: #8ac6d1;
	box-shadow: 1px 1px 2px #888888;

}

.agreement {
	display: flex;
	align-items: center;
	margin: 40rpx 0;

	.agreement-text {
		padding-left: 8rpx;
		color: $u-tips-color;
	}
}
.placeOrder {
	color: #00bba2;
	margin: 10rpx 8rpx;
}
</style>
