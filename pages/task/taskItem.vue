<template>
	<view class="container shadow-warp radius ">
	<view class="expressItem  ">

			<view class="cu-bar bg-gradual-blue solid-bottom margin-top padding-sm radius justify-between">
				<text class="cuIcon-title">{{expressData.e_type}} - {{expressData.e_start_time}}</text>
				<view class="cuIcon-title">{{expressData.e_state}}</view>
			</view>
			
			<view class="iteminfo  bg-white margin-bottom   ">
				
				<view class="payinfo justify-between flex padding-sm  ":class="10?'solids-bottom':'solid-bottom'">
					<view class="  text-xl  text-bold" > 订单价格:{{expressData.e_money}}</view>
					<view class="   text-xl text-bold " > 收货码：{{expressData.e_take_code}} </view>
				</view>
				<view class="flex  justify-between padding-sm " >
					<view class="  text-sm  flex" >接单者：{{expressData.e_reci[0].u_name}}</view>
					<view class="  text-sm  flex" >收货人：{{expressData.e_addressItem[0].name}}</view>										
				</view>
				<view class="  text-sm padding-sm" >
					<view class="text-sm   flex justify-between " > 下单时间: 
						<view >  {{expressData.e_start_time |formatDate}} </view>
					</view>
					<view class="text-sm   flex justify-between solid-bottom" :class="10?'solids-bottom':'solid-bottom'"> 接单时间:
						<view > {{expressData.e_recive_time |formatDate}}</view>
					</view>
					<view class="justify-between flex solid-bottom padding-sm" >
						<view class="  text-sm text-bold" >订单地址：</view>
						<view class=" text-sm  text-bold" >{{expressData.e_addressItem[0].address}} </view>
					</view>
				</view>
				
				
				
				<view class="  text-lg text-bold flex solid-bottom padding-sm " :class="10?'solids-bottom':'solid-bottom'">备注：{{expressData.e_matter}}</view>
				
				<view class="justify-around flex padding-sm">
					<button class="cu-btn bg-grey lg padding-xl" @click="gotoSettlement">查看详情</button>
					<button class="cu-btn bg-gradual-blue lg padding-xl" @click="sureOrder" >确认送达</button>
				</view>
			</view>			
	</view>
	</view>
</template>

<script>
	import {myPUT} from '../../api/api.js'
	// import {userEneity} from '../../api/vo/eneity.js'
	import {updateOrder} from '../../api/request.js'
	
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
				 uni.navigateTo({
				 	url:'../settlement/settlement?_id='+this.expressData._id
				 	
				 })
			  },
			  sureOrder(){
				  let date = {
					  _id:this.expressData._id,
					  e_state:'已完成'
				  }
				  
				  myPUT(updateOrder,date).then((res)=>{
				  	console.log("货物成功")
					// 调用父组件进行刷新页面
					this.$emit('reload');
				  }).catch((err)=>{
					  console.log(err)
				  	console.log("更新失败")
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


<style >

</style>