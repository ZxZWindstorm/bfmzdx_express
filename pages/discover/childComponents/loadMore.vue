<template>
	<u-loadmore :status="status" icon-type="iconType" 
	:load-text="loadText" @loadmore="loadmore"/>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				}
			}
		},
		methods:{
			loadmore(){
				console.log("加载更多")
				this.status="loading"
			}
		}
	}
</script>