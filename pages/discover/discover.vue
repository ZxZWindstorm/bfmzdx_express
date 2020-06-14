<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" 
				ref="tabs" :list="list" 
				:current="showIndex" @change="change" 
				:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
		
		
		<swiper class="swiper-box" :current="showIndex"
		 @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<Classify @changgeExpress="changgeExpress"></Classify>
					<Express :expressList="showExpressList"></Express>
					<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
				</scroll-view>
			</swiper-item>
			
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<ExpressOnly :expressList="myPublishExpressList"></ExpressOnly>
				</scroll-view>
			</swiper-item>
			
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<ExpressOnly :expressList="myReciveExpressList"></ExpressOnly>
				</scroll-view>
			</swiper-item>
			
			<swiper-item class="swiper-item">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<ExpressOnly :expressList="showExpressList"></ExpressOnly>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- <view v-if="showIndex==0">
			<Classify @changgeExpress="changgeExpress"></Classify>
			<Express :expressList="showExpressList"></Express>
		</view>
		<view v-if="showIndex==1">
			<ExpressOnly :expressList="myPublishExpressList"></ExpressOnly>
		</view>
		<view v-if="showIndex==2">
			<ExpressOnly :expressList="myReciveExpressList"></ExpressOnly>
		</view>
		<view v-if="showIndex==3">
			<ExpressOnly :expressList="showExpressList"></ExpressOnly>
		</view> -->
		</view>
	</view>
</template>
<script>
	import Classify from './childComponents/classify.vue';
	import Express from './childComponents/express.vue';
	import ExpressTop from './childComponents/expressTop.vue'
	import ExpressOnly from './childComponents/expressOnly.vue'
	
	// 网络请求
	// import {publicing} from '../../api/api.js'
	import {listing} from '../../api/api.js'
	import {getExpress,getMyPublish,getMyRecive} from '../../api/request.js'
	export default {
		data() {
			return {
				expressList:[],
				showExpressList:[],
				myPublishExpressList:[],
				myReciveExpressList:[],
				screenArray:
					{e_type:'***',
					 e_money:'***',
					 e_state:'***'
					},
				showIndex:0,
				tabsHeight: 0,
				dx: 0,
				loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
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
				]
			}
		},
		computed:{
			count(){
				this.showExpressList = this.expressList
				.filter((item)=>{
					if(this.screenArray.e_type==='***')
					return true;
					return item.e_type===this.screenArray.e_type;
				})
				.filter((item)=>{
					if(this.screenArray.e_money==='***')
					return true;
					return item.e_money===this.screenArray.e_money;
				})
				.filter((item)=>{
					if(this.screenArray.e_state==='***')
					return true;
					return item.e_state===this.screenArray.e_state;
				})
				
			}
		},
		methods: {
			//上拉加载更多
			reachBottom() {
				// 此tab为空数据
				if(this.showIndex == 0) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						 this.getMoreDiscover(1);
					}, 1200);
				}
			},
			//测试加载更多
			getMoreDiscover(page){
				let m = this.expressList;
				this.expressList =this.expressList.concat(this.showExpressList)
			},
			
			//发送获得列表数据的请求
			getExpress_method(){
				let data={
					university_id:'bfmzdx',
					page:'1'
				}
				listing(getExpress)
				.then((res)=>{
					console.log(res)
					this.expressList=res.data.expressList;
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			//获得我的发布
			getMyPublishExpressList(){
				let data={
					user_id:'1'
				}
				listing(getMyPublish)
				.then((res)=>{
					console.log(res)
					this.myPublishExpressList=res.data.expressList;
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			//获得我接受的任务
			getMyReciveExpressList(){
				let data={
					user_id:'1'
				}
				listing(getMyRecive)
				.then((res)=>{
					console.log(res)
					this.myReciveExpressList=res.data.expressList;
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			//子组件查询
			changgeExpress(result){
				console.log("进入changgeExpress方法");
				this.screenArray=result;
			},
			//更改顶部条
			changeTop(index){
				this.showIndex=index
			},
			//页面切换
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.showIndex = current;
				this.current = current;
			},
			change(index){
				this.showIndex=index;
				
			}
			
		},
		mounted() {
			//调用获取列表数据
			this.getExpress_method();
			
			this.getMyPublishExpressList();
			
			this.getMyReciveExpressList();
		},
		components:{
			Classify,
			Express,
			ExpressTop,
			ExpressOnly
		}
	}
</script>

<style scoped>

.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
