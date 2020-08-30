<template>
	<view class="u-demo">
		<scroll-view scroll-y style="height: 100%;width: 100%;">
		<view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-toast ref="uToast"></u-toast>
				<u-search v-model="value"
				 placeholder="请输入您要查询的学校"
				 action-text="查询"
				 @change="change" @custom="custom" @search="custom" :shape="shape" :clearabled="clearabled" 
				:show-action="showAction" :input-align="inputAlign"></u-search>
			</view>
		</view>
		<!-- 搜索信息展示 -->
		<view v-if="isShowSearchUni">
			<view class="my-text" >搜索结果</view>
			<block  v-for="(item,index) in searchUniList" :key="index">
				<SchoolBlock
				:s_name="item.name"
				:s_id="item._id"
				@clickSchoolBlock="clickSchoolBlock"></SchoolBlock>
			</block>
		</view>
		
			<!-- 当前定位 -->
			<view>
				<view class="my-text">当前定位学校</view>
				<!-- 当前定位 -->
				<SchoolBlock 
				:s_icon="s_icon"
				:s_name="s_name"
				:s_id="s_id"
				:s_color="s_color"
				@clickSchoolBlock="clickSchoolBlock"></SchoolBlock>
				
				<!-- 重新定位 -->
				<SchoolBlock 
				:s_icon="reload_icon" 
				:s_name="reload_name"
				@click.native="reload_position"
				></SchoolBlock>
				
			</view>
			
			<!-- 附近大学 -->
			<view v-if="isShowNearByLocation">
				<view class="my-text" >附近大学</view>
				<block  v-for="(item,index) in nearByLocationUniList" :key="index">
					<SchoolBlock
					:s_name="item.name"
					:s_id="item._id"
					@clickSchoolBlock="clickSchoolBlock"
					></SchoolBlock>
				</block>
			</view>
			<!-- 历史定位 -->
			<view v-if="isShowHistory">
				<view class="my-text" >历史定位</view>
				<block  v-for="(item,index) in historyUniList" :key="index">
					<SchoolBlock
					:s_name="item.name"
					:s_id="item._id"
					:s_icon="s_icon"
					:s_close="s_close"
					@clickSchoolBlock="clickSchoolBlock"
					@removeBlock="removeBlock"></SchoolBlock>
				</block>
			</view>
			
			<!--按城市选择大学-->
			<!-- <view v-if="isShowNearByLocation">
				<view class="my-text" >历史定位</view>
				<block  v-for="(item,index) in nearByLocationUniList" :key="index">
					<SchoolBlock
					:s_name="item.name"
					:s_id="item.id"
					:s_close="s_close"
					@clickSchoolBlock="clickSchoolBlock"></SchoolBlock>
				</block>
			</view> -->
			
		</scroll-view>
		<!-- 遮罩层 -->
		<MyMask :maskShow="maskShow"></MyMask>
	</view>
</template>

<script>
	import SchoolBlock from '../../common/schoolBlock.vue'
	import MyMask from '../../common/myMask.vue'
	import {searchUni} from '../../api/request.js'
	import {publicing,listing,myGET,myPOST} from '../../api/api.js'
	export default {
		components:{SchoolBlock,MyMask},
		data() {
			return {
				// 遮罩层
				maskShow:false,
				// 重新定位
				reload_icon:"reload",
				reload_name:"重新定位",
				// 当前定位
				s_icon:"map",
				s_close:true,
				s_color:"yellow",
				// 
				value: '',
				shape: 'round',
				clearabled: true,
				showAction: true,
				inputAlign: 'left',
				
				//搜索学校
				isShowSearchUni:false,
				searchUniList:[],
				
				//附近大学
				isShowNearByLocation:false,
				nearByLocationUniList:[],
				//历史定位
				
				historyUniList:[]
			}
		},
		computed:{
			s_name(){
				return this.$store.state.university.name;
			},
			s_id(){
				return this.$store.state.university._id;
			},
			isShowHistory(){
				if(this.historyUniList.length==0){
					return false;
				}
				return true;
			}
		},
		mounted() {
			this.checkHistory();
		},
		watch: {
			// 这里的演示为证明通过v-model绑定值，它是双向绑定的，意味着您无需监听change事件
			// 也能知道value值当前的内容
			value(val) {
				// console.log(val);
			}
		},
		onLoad() {
			this.reload_position();
		},
		methods: {
			clickSchoolBlock(name,_id){
				let university_data={
					name,
					_id
				};
				console.log("xxxxxxxxx")
				console.log(university_data)
				this.setHistory(university_data);
				this.$store.commit('UpdateUniversity',university_data);
				uni.navigateBack({
					
				})
			},
			removeBlock(name,_id){
				this.historyUniList=this.historyUniList.filter((item)=>{
					return item._id !==id;
				})
				uni.setStorageSync('search_key',this.historyUniList);
			},
			change(value) {
				// 搜索框内容变化时，会触发此事件，value值为输入框的内容
				//console.log(value);
			},
			//写历史记录
			setHistory(university){
				console.log(this.historyUniList)
				this.historyUniList=this.historyUniList.filter((item)=>{
					return item._id!==university._id;
					
				});
				this.historyUniList.unshift(university);
				uni.setStorageSync('search_key',this.historyUniList);
			},
			checkHistory(){
				let searchArray = uni.getStorageSync('search_key')||[];
				this.historyUniList=searchArray;
			},
			custom(value) {
				if(value=='')
					return
				//console.log(value);
				this.maskShow=true;
				let search_data={
					"name_like":value
				}

				
				myGET(searchUni,search_data)
				.then((res)=>{
					this.maskShow=false;
					console.log(res);
					if(res.data.length==0){
						//提示 无搜索结果
						this.$u.toast("没有找到内容!");
						return;
					}
					this.isShowSearchUni=true;
					this.searchUniList=res.data;
				})
				.catch((err)=>{
					this.maskShow=false;
				})
			},
			// 重新获取定位
			reload_position(){
				console.log("获取定位信息");
				this.maskShow=true;
				uni.getLocation({
					success:(data)=> {
						console.log(data)
						let latitude = data.latitude;
						let longitude = data.longitude;
						this.maskShow=false;
						
						let search_data={
							lat_gte:latitude - 0.1,
							lat_lte:latitude + 0.1,
							ing_gte:longitude - 0.1,
							ing_lte:longitude + 0.1
							}
						myGET(searchUni,search_data)
						.then((res)=>{
							this.isShowNearByLocation=true;
							this.nearByLocationUniList= res.data;
							console.log(res)
							console.log("===============")
							if(res.data){
								if(res.data.length>0){
									let university_data=res.data[0];
									console.log(university_data)
									this.setHistory(university_data);
									console.log(university_data)
									this.$store.commit('UpdateUniversity',university_data);
								}
							}
							
						})
						.catch((err)=>{
							
						})
						
						
						
						
					},
					fail: (err) => {
						//提示 定位错误
						console.log("获取错误")
						this.maskShow=false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		background-color: #FFFFFF;
		height: calc(100vh);
	}
	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		display: block;
	}
</style>
