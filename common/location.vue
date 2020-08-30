<template>
	<view>
		<view class="location"  @click.native="toNearTheSchool">
			<!-- 左侧区域 -->
			<view class="left">
				<image src="../static/index/location.png">	
					
				</image>
				<view class="content">
					{{university_name}}
				</view>
				<image src="../static/index/pullDown.png"></image>
			</view>
			
			<view class="center"></view>
			<!-- 右侧区域 -->
			<view class="right">
				<image src="../static/index/information.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		computed:{
			university_name(){
				 if(this.$store.state.university.name)
					return this.$store.state.university.name;
				 else
				 return "定位所在大学"
			}
		},
		methods:{
			toNearTheSchool(){
				uni.navigateTo({
					url:'../nearTheSchool/nearTheSchool'
				})
			},
		}
	}
</script>

<style scoped>
	.location{
		display: flex;
		flex-direction: row;
		background-color: #beebe9;
		padding-bottom: 10px;
		box-shadow: 0px 0px 3px #888888;
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
