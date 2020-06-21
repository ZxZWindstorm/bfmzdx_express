<template>
	<view class="expressItem" @click="gotoSettlement">
		<u-row gutter="16">
				<u-col span="4">
					<view class="demo-layout e_style">{{expressData.eType}}</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout e_money">{{expressData.eMoney}}</view>
				</u-col>
				<u-col span="6">
					<view class="demo-layout reci">
						<view>配送信息:</view>
						<view v-if="expressData.userEntityReci">
							<view>{{expressData.userEntityReci.name}} 2020.23.11 8:00 接取</view>
						</view>
					</view>
				</u-col>
		</u-row>
		<u-row gutter="16">
				<u-col span="5">
					<view class="demo-layout address">
						<view class="top">
							<view class="name">{{expressData.userEntityInit.name}}</view>
							<view class="phone">{{expressData.userEntityInit.phone}}</view>
						</view>
						<view class="bottom">
							<view class="detail">{{expressData.eAddressId.address}}</view>
						</view>
					</view>
				</u-col>
				<u-col span="2">
					<view class="demo-layout state">{{expressData.eState}}</view>
				</u-col>
				<u-col span="5" >
					<view class="demo-layout time">
						<span>还剩</span>
						<span class="time_active">{{e_time}}</span>
						<span>截至</span>
					</view>
					
				</u-col>
		</u-row>
	</view>
</template>

<script>
	
	export default{
		props:{
			expressData:Object,
			
		},
		
		data() {
			return {
				e_time:''
			}
		},
		computed:{
		},
		filters: {
		    // formatDate(time) {
		    //   let date = new Date(time)
		    //   return this.$moment(time).format(YYYY-MM-DD);
		    // }
		  },
		  methods:{
			  getTime:function(){
			  var date = new Date(),
			  // year = date.getFullYear(),
			  // month = date.getMonth() + 1,
			  day = date.getDate(),
			  hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
			  minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
			  second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			  // month >= 1 && month <= 9 ? (month = "0" + month) : "";
			  // day >= 0 && day <= 9 ? (day = "0" + day) : "";
			  var timer = hour + ':' + minute + ':' + second;
			  return timer;
			  },
			  gotoSettlement(){
				  uni.navigateTo({
				  	url:'../orderParticulars/orderParticulars?id='+this.expressData.eId
				  })
			  }
		  },
		 mounted() {
		    let that = this; // 声明一个变量指向Vue实例this，保证作用域一致
		    this.timer = setInterval(() => {
		      that.e_time = this.getTime(); // 修改数据date
		    }, 1000)
		  },
		  beforeDestroy() {
		    if (this.timer) {
		      clearInterval(this.e_time); // 在Vue实例销毁前，清除我们的定时器
		    }
		  }
	}
</script>


<style  scoped>

.expressItem{
	background-color: #FFFFF7;
	height: 300rpx;
	margin: 15rpx;
	border-radius: 15rpx;
}
.demo-layout {
		height: 135rpx;
		border-radius: 8rpx;		
		margin: 8rpx;
		padding: 8rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.e_style{
		font-size: 40rpx;
		font-weight: bolder;
	}
	.e_money{
		font-size: 40rpx;
		font-weight: bolder;
	}
	
	.address{
		display: flex;
		flex-direction: column;
		align-items: flex-start; 
	}
	.address > .top{
		display: flex;
		flex-direction: row;
		align-items: baseline;
	}
	.address > .top >.name{
		font-size: 30rpx;
		font-weight: bolder;
		
	}
	.address > .top >.phone{
		font-size: 20rpx;
		margin-left: 5rpx;
	}
	.address > .bottom >.detail{
		margin-top: 2rpx;
		font-size: 25rpx;
	}
	
	.state{
		font-size: 25rpx;
	}
	.time>.time_active{
		color: red;
	}
	
</style>
