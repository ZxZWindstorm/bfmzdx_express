<template>
	<view>
		<view class="location">
			<!-- 左侧区域 -->
			<view class="left">
				<image src="../../../static/index/location.png">	
					
				</image>
				<view class="content">
					北方民族大学
				</view>
				<image src="../../../static/index/pullDown.png"></image>
			</view>
			
			<view class="center"></view>
			<!-- 右侧区域 -->
			<view class="right">
				<image src="../../../static/index/information.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.location{
		display: flex;
		flex-direction: row;
		background-color: #00BBA2;
		padding-bottom: 10px;
	}
	.location .left{
		width: 300px;
	}
	.location .left image, .location .right image{
		width: 16px;
		height: 16px;
		margin: 0px 5px;
	}
	.location .left .content{
		display: inline;
		color: #FFFFFF;
	}
	.location .right{
		width: 50px;
	}
	.location .center{
		flex: 1;
	}
</style>
