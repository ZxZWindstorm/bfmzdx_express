<template>
	<view>
		<u-mask :show="maskShow">
			<view class="warp">
				<view class="rect" @tap.stop>
					<u-loading mode="flower"></u-loading>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	export default{
		props:{
			maskShow:Boolean
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		background-color: #D3D3D3;
		height: calc(100vh);
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		display: block;
	}
</style>
