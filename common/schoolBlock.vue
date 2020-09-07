<template>
	<view class="content text-white shadow-blur margin-bottom ">
		<u-icon :name="s_icon"  :color="FFFFFF" class="left"  @click="clickSchoolBlock"></u-icon>
		<view class="text-gray ">		{{s_name}}</view>
		<u-icon name="close" class="right" v-if="s_close" @click="removeBlock"></u-icon>
	</view>
</template>

<script>
	export default{
		props:{
			s_icon:String,
			s_name:String,
			s_id:String,
			s_color:String,
			s_close:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				// s_icon:"map",
				// s_name:"北方民族大学",
				// s_close:Boolean
			}
		},
		methods:{
			clickSchoolBlock(){
				this.$emit("clickSchoolBlock",this.s_name,this.s_id);
			},
			removeBlock(){
				this.$emit("removeBlock",this.s_name,this.s_id);
			}
		}
	}
	
</script>

<style scoped>
	.content{
		color: #FFFFFF;
		display: inline-flex;
		background-color: #f1f1f1;
		border-radius: 15rpx;
		margin: 15rpx 12rpx;
		padding: 20rpx;
	}
	.right{
		margin-left: 15rpx;
	}
</style>
