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
		background-color: #beebe9;
		color: #000000;
		box-shadow: 0rpx 0rpx 5rpx #888888;
	}
</style>
