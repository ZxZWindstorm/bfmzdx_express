<template>
	<view>
		
		<view class="container">
			<view class="tabbar">
				<view class="item" :class="{active: !tabIndex}" @tap="switchTab(0)">当前订单</view>
				<view class="item" :class="{active: tabIndex}" @tap="switchTab(1)">历史订单</view>
			</view>
			
			<swiper :current="tabIndex" :duration="300" class="swiper" :show-scrollbar="false">
				<!-- 当前订单 begin -->
				<swiper-item @touchmove.stop="handleSwiperItemChange">
					<view v-if="orderForms.length ==0" class="no-order-content">
						<image src="https://go.cdn.heytea.com/storage/ad/2020/05/20/0bdb360866d94aa4a4404c0b676a1982.jpg"></image>
						<view class="tips">
							<view>您今天还没有下单</view>
							<view>快去下单吧</view>
						</view>
						<button type="primary" class="font-size-lg" hover-class="none">去下单</button>
					</view>
					<view v-else>
						<view class="history-order">
							<swiper :current="orderMenuIndex"
							:duration="300" :show-scrollbar="false" 
							class="history-order-swiper">
								<!-- 门店订单 begin -->
								
								<swiper-item @touchmove.stop="handleSwiperItemChange">
									<scroll-view scroll-y="true" class="orders-scroll">
										<view class="wrapper">
											<view class="order-list">
												<block v-for="(order, index) in orderForms" :key="index">
													<navigator class="order"
													 open-type="navigate" 
													:url="'/pages/order/detail?id=' + order.id">
														<OrderFormItem
														:expressData="order"
														@reload="reload"
														>
														</OrderFormItem>
													</navigator>
												</block>
												
											</view>
										</view>
									</scroll-view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</swiper-item>
				<!-- 当前订单 end -->
				<!-- 历史订单 begin -->
				<swiper-item @touchmove.stop="handleSwiperItemChange">
					<view v-if="oldOrderForms.length ==0" class="no-order-content">
						<image src="https://go.cdn.heytea.com/storage/ad/2020/05/20/0bdb360866d94aa4a4404c0b676a1982.jpg"></image>
						<view class="tips">
							<view>您今天还没有下单</view>
							<view>快去下单吧</view>
						</view>
						<button type="primary" class="font-size-lg" hover-class="none">去下单</button>
					</view>
					<view v-else>
						<view class="history-order">
							<swiper :current="orderMenuIndex"
							:duration="300" :show-scrollbar="false" 
							class="history-order-swiper">
								<!-- 门店订单 begin -->
								
								<swiper-item @touchmove.stop="handleSwiperItemChange">
									<scroll-view scroll-y="true" class="orders-scroll">
										<view class="wrapper">
											<view class="order-list">
												<block v-for="(order, index) in oldOrderForms" :key="index">
													<navigator class="order"
													 open-type="navigate" 
													:url="'/pages/order/detail?id=' + order.id">
														<OrderFormItem
														:expressData="order">
														</OrderFormItem>
													</navigator>
												</block>
												
											</view>
										</view>
									</scroll-view>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</swiper-item>
				<!-- 历史订单 end -->
			</swiper>
			
			
			
			
<!-- 			<scroll-view scroll-y style="height: 100%;width: 100%">
				
			</scroll-view> -->
			
			
			
			
		</view>
	</view>
</template>

<script>
	import OrderFormItem from './orderFormItem.vue'
	import MyHead from '../../common/myHead.vue'
	import {publicing,myGET} from '../../api/api.js'
	import {getMyRecive} from '../../api/request.js'
	export default {
		components:{OrderFormItem,MyHead},
		data() {
			return {
				tabIndex: 0,
				orderForms:[],
				orderMenuIndex: 0,
				mytext:"我的订单",
				oldOrderForms:[]
			}
		},
		computed: {
			
		},
		onShow() {
			this.getOrders()
		},
		methods: {
			reload(){
				console.log("111")
				this.getOrders()
			},
			async switchTab(index) {
				if(this.tabIndex === index) return
				this.tabIndex = index
				if(this.tabIndex) {
					await this.getOrders()
				}
			},
			handleSwiperItemChange() {	//禁止手动滑动
				return true
			},
			async switchMenuTab(index) {
				if(this.orderMenuIndex === index) return
				this.orderMenuIndex = index
				await this.getOrders()
			},
			async getOrders() {
				this.orderForms =[]
				this.oldOrderForms = []
				let userInfo = uni.getStorageSync("userInfo")
				console.log("---------------")
				// 特殊的查询，可以直接指定字段
				let search_data = {
					e_initId: userInfo._id,
				}
				
				myGET(getMyRecive,search_data)
				.then((res)=>{
					console.log(res)
					this.orderForms=res.list.filter((item)=>{
						if(item.e_state != "已完成"){
							return item
						}
					})
					this.oldOrderForms=res.list.filter((item)=>{
						if(item.e_state === "已完成"){
							return item
						}
					})
				})
				.catch((err)=>{
					console.log(err)
					console.log("错误")
				})
			}
			
			
			
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f6f6f6;
	}
	.navbar {
		height: calc(44px + var(--status-bar-height));
		/* #ifdef H5 */
		height: 44px;
		/* #endif */
		display: flex;
		background-color: #FFFFFF;
	}
	
	.talk-btn {
		height: 32px;
		margin-left: 10px;
		margin-top: 26px;
		/* #ifdef H5 */
		margin-top: 6px;
		/* #endif */
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $font-size-sm !important;
		padding: 0 20rpx;
		border-radius: 50rem !important;
		
		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: $spacing-row-sm;
		}
	}
	
	.tabbar {
		height: 100rpx;
		background-color: $bg-color-white;
		display: flex;
		align-items: center;
		justify-content: space-around;
		
		.item {
			height: 100%;
			font-size: $font-size-lg;
			color: $text-color-assist;
			font-weight: 400 !important;
			display: flex;
			align-items: center;
			
			&.active {
				color: $text-color-base;
				border-bottom: 4rpx solid $text-color-base;
			}
		}
	}
	
	
	.swiper {
		width: 100%;
		height: calc(100vh - var(--status-bar-height));
	}
	
	.no-order-content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	
		image {
			width: 300rpx;
			height: 300rpx;
			margin-bottom: 50rpx;
		}
	
		.tips {
			color: $text-color-assist;
			display: flex;
			flex-direction: column;
			align-items: center;
			line-height: 1.2rem !important;
			margin-bottom: 70rpx;
		}
	
		
		button {
			width: 50%;
		}
	}
	
	.history-order {
		width: 100%;
		height: 100%;
		position: absolute;
		
		.menu {
			padding: 18rpx 30rpx;
			display: flex;
			align-items: center;
			font-size: $font-size-base;
			color: $text-color-grey;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 10;
			
			.item {
				padding: 14rpx 30rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
				
				&.active {
					color: $color-primary;
					background-color: $bg-color-white;
				}
			}
		}
		
		.history-order-swiper {
			width: 100%;
			height: 100%;
		}
	}
	
	.store-order-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: $font-size-base;
		color: $text-color-assist;
		line-height: 1.3rem !important;
		
		image {
			width: 400rpx;
			height: 333rpx;
			margin-bottom: 40rpx;
		}
	}
	
	.orders-scroll {
		width: 100%;
		height: 100%;
	}
	
	.order-list {
		display: flex;
		width: 100%;
		flex-direction: column;
		
		.order {
			background-color: $bg-color-white;
			padding: 30rpx 40rpx;
			margin-bottom: 18rpx;
			
			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.status {
					font-size: $font-size-base;
					color: $text-color-grey;
					display: flex;
					align-items: center;
					image {
						width: 30rpx;
						height: 30rpx;
						margin-left: $spacing-row-sm;
					}
				}
			}
			
			.images {
				display: flex;
				padding: 30rpx 0;
				image {
					flex-shrink: 0;
					width: 150rpx;
					height: 112.5rpx;
				}
			}
			
			.info {
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;
				
				.left {
					flex: 1;
					display: flex;
					flex-direction: column;
					font-size: $font-size-base;
					color: $text-color-grey;
				}
				
				.right {
					font-size: $font-size-lg;
					color: $text-color-base;
				}
			}
			
			.action {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				
				button {
					margin-left: 30rpx;
					font-size: $font-size-sm;
				}
			}
		}
	}
	
</style>
