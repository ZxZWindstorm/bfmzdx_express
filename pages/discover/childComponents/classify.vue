<template>
	<view class="classify">
		<view class="content" @click="show = true">
			<u-select  :default-value="defaultValue" 
			:mode="mode" v-model="show" :list="classifyList" @confirm="confirm"></u-select>
			<view class="u-demo-result-line">检索内容：{{ result }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			result: '***-***-***',
			defaultValue: [],
			mode: 'mutil-column', // single-column, mutil-column, mutil-column-auto
			classifyList: [
				[
					{
						value: '1',
						label: '***'
					},
					{
						value: '2',
						label: '中通快递'
					},
					{
						value: '3',
						label: '申通快递'
					},
					{
						value: '4',
						label: '圆通快递'
					},
					{
						value: '5',
						label: '百世快递'
					}
				],
				[
					{
						value: '6',
						label: '***'
					},
					{
						value: '7',
						label: '1'
					},
					{
						value: '8',
						label: '2'
					},
					{
						value: '9',
						label: '5'
					}
				],[
					
					{
						value: '10',
						label: '***'
					},
					{
						value: '11',
						label: '等待中'
					},
					{
						value: '12',
						label: '待接取'
					}
				]
				
			],

		};
	},
	onLoad() {
		//this.list = this.list1;
	},
	computed: {
		current() {
			return this.show ? 0 : 1;
		}
	},
	mounted() {
		this.modeChange(3)
	},
	methods: {
		modeChange(index) {
			let type = ['single-column', 'mutil-column', 'mutil-column-auto'];
			this.mode = type[index];
			this.list = index == 0 ? this.list1 : index == 1 ? this.list2 : this.list3;
		},
		confirm(e) {
			this.result = '';
			console.log(e)
			e.map((val, index) => {
				this.result += this.result == '' ? val.label : '-' + val.label;
			})
			
			let result={
				e_type:e[0].label,
				e_money:e[1].label,
				e_state:e[2].label
			}
			//根据result调用父组件方法进行筛选内容
			this.$emit('changgeExpress',result);
		}
	}
};
</script>

<style scoped lang="scss">
.classify{
	display: flex;
	justify-content: center;
	margin: 5rpx 7rpx;
}
.content{
	
}
</style>
