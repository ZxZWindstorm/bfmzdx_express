<template>
	<view class="container shadow-warp radius ">
	<view class="expressItem  ">

			<view class="cu-bar bg-gradual-blue solid-bottom margin-top padding-sm radius">
				<text class="cuIcon-title  text-xs  text-bold">{{expressData.e_type}}</text>
				<view class="justify-end">{{expressData.e_state}}</view>
			</view>
			
			<view class="iteminfo  bg-white margin-bottom  padding-sm ">
				
				<view class="payinfo justify-between flex padding solid-bottom ">
					<view class="  text-xl  text-bold" > 订单价格:{{expressData.e_money}}</view>
					<view class="   text-xl text-bold " > 收货码：{{expressData.e_take_code}} </view>
				</view>
				
				<view class="justify-between flex solid-bottom">
					<view class="text-sm padding-sm " > 下单时间 {{expressData.e_start_time |formatDate}}</view>
					<view class="padding-sm  text-sm text-bold" >订单地址：{{expressData.e_addressItem[0].address}} {{expressData.e_addressItem[0].name}}</view>
				</view>
				<view class="justify-between flex">
					<view class="text-sm padding-sm " > 接单时间 {{expressData.e_recive_time |formatDate}}</view>
					<view class="padding-sm  text-sm text-bold" >接单者：{{expressData.e_reci[0].u_name}}</view>
				</view>
				<view class="justify-around flex">
					<button class="cu-btn bg-grey lg" @click="gotoSettlement">查看详情</button>
					
					<button class="cu-btn bg-gradual-blue lg" >确认收货</button>
				</view>
				
				
			</view>			
	</view>
	</view>
</template>

<script>
	
	export default{
		props:{
			expressData:Object,
		},
		
		data() {
			return {
				e_time:'',
			
			}
		},
		filters: {
		    formatDate(time) {
		      // return this.$moment(time).format(YYYY-MM-DD);
			  let now = new Date(time); // 依情况进行更改 * 1
			       let   y = now.getFullYear();
			       let   m = now.getMonth() + 1;
			       let   d = now.getDate();
			        
					 return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
		    }
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
				  console.log(this.expressData)
				  // uni.navigateTo({
				  // 	url:'../orderParticulars/orderParticulars?id='+this.expressData.eId
				  // })
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


<style >

</style>
