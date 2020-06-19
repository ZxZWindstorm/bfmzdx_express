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
		height: 100rpx;
		line-height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center; 
		width: 100%;
		background-color: #C0C0C0;
	}
</style>
