<template>
	<u-sticky>
		<view class="my_head">
		{{mytext}}
		</view>
	</u-sticky>	
</template>

<script>
	export default{
		data() {
			return {
				
			}
		},
		props:{
			mytext:String
		}
	}
</script>

<style scoped>
	.my_head{
		height: 70rpx;
		line-height: 70rpx;
		display: flex;
		justify-content: center;
		align-items: center; 
		width: 100%;
		background-color: #00BBA2;
		color: #FFFFFF;
		border-top:  1rpx solid #000000;
	}
</style>
