<template>
	<view class="meau">
		<u-grid :col="3">
				<u-grid-item @click="goToOrederForm">
					<u-icon name="photo" :size="46"></u-icon>
					<view class="grid-text">订单</view>
				</u-grid-item>
				<u-grid-item @click="goToTask">
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">任务</view>
				</u-grid-item>
				<u-grid-item>
					<u-badge count="1" :offset="[20, 20]"></u-badge>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">信息</view>
				</u-grid-item>
			</u-grid>
	</view>
</template>

<script>

	export default{
		methods:{
			goToOrederForm(){
				console.log("前往订单页面");
				uni.navigateTo({
					url:'../orederForm/orederForm'
				})
			},
			goToTask(){
				console.log("前往任务页面");
				uni.navigateTo({
					url:'../task/task'
				})
			}
		}
	}
</script>

<style scoped>
	.meau{
		display: flex;
	}
</style>
