<template>
	<view>
		<!-- 
		 -->
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" 
				ref="tabs" :list="list" 
				:current="current" @change="change" 
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
		</view>

	</view>
</template>

<script>
	export default{
		data() {
			return {
				list: [
					{
						name: '发布广场'
					},
					{
						name: '我的发布'
					},
					{
						name: '已接受'
					},
					{
						name: '待确认'
					}
				],
				current: 0
			}
		},
		methods:{
			change(index){
				this.current=index;
				this.$emit("changeTop",index)
			}
		}
	}
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #ffffff;
}
/* #endif */
</style>
<style scoped lang="scss">
	.wrap {
		display: flex;
		flex-direction: column;
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
</style>
