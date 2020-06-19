<template>
	<view class="address">
		<view class="left">
			<image src="../../../static/index/selectLocation.png"></image>
		</view>
		<view class="center">
			<view class="top_text">选择常用地址</view>
			<view class="foot_text">常用地址可同步取件信息</view>
			
		</view>
		<view class="right">
			<image src="../../../static/index/selectImage.png"></image>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.address{
		height: 70px;
		margin: 10px 7px;
		line-height: 70px;
		background-color: #67ffd9;
		padding-left:8px;
		padding-right: 8px;
		border-radius: 15px;
		display: flex;
		align-items: center;
	}
	.left{
		width: 30px;
		height: 30px;
		line-height: 30px;
	}
	.left image{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #007AFF;
	}
	.center{
		flex: 1;
		display: flex;
		height: 50px;
		line-height: 20px;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
	}
	.center .top_text{
		font-size: larger;
	}
	.center .foot_text{
		font-size: smaller;
		color: #bcbcbc;
	}
	.right image{
		height: 20px;
		width: 20px;
	}
</style>
