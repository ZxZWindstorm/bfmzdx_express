<template>
	<view>
		<view class="location align-center radius shadow-warp  margin-bottom bg-gradual-blue"  >
				<!-- 左侧区域 -->
				<view class="left" >
					<view class="content" @click.native="toNearTheSchool">
						<u-icon  name="email" size=50 ></u-icon>
					</view>
				</view>
				<view class="center text-bold"@click.native="toNearTheSchool">
					
					<span ><b>
					<u-icon style="display: inline !important ;" name="map" size=30 ></u-icon> 
					{{university_name}}
					</b></span>
				</view>
				<!-- 右侧区域 -->
				<view class="right" @click.native="toNearTheSchool">
					<u-icon name="plus" color="#ffffff" size=50></u-icon>
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
		height: 10%;
		display: flex;
		flex-direction: row;
		padding-bottom: 10px;
		height: auto;

	}
	.location.content,.left{
		text-align: center;
		margin-left:25px;
		color:#ffffff;
		width:50px;
	}
	// .location .left{
	// 	color: #FFFFFF;	
	// }
	.location .right{
		margin-right:25px;
		text-align: center;
	

	}
	.location .center{
		margin-right:25px;
		flex: 1;
		text-align: center;

		color: #FFFFFF;	
	}
</style>

