<template>
	<view>
		<view class="location"  >
			<!-- 左侧区域 -->
			<view class="left"@click.native="toNearTheSchool" style="display: inline;">
				<view class="content" >
					<u-icon style="display: inline !important;" name="list-dot" size=40 ></u-icon>
					<span>{{university_name}}</span>
					<u-icon style="display: inline !important;" name="map" size=40></u-icon>
				</view>
			</view>
			<view class="center"></view>
			<!-- 右侧区域 -->
			<view class="right">
				<u-icon name="email" color="#ffffff" size=40></u-icon>
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

<style scoped lang="scss">
	.location{
		display: flex;
		flex-direction: row;
		background-color: #beebe9;
		padding-bottom: 10px;
		box-shadow: 0px 0px 3px #888888;
		height: auto;
	}
	.location.content{
		color:"#ffffff";
	}
	.location .left{
		width: 300px;
		color: #FFFFFF;
		
	}
	.location .right{
		width: 50px;
	}
	.location .center{
		flex: 1;
	}
</style>

