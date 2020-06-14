<template>
	<view>
		<block v-for="(expressData,index) in expressList" :key="index">
			<ExpressItem
			:expressData="expressData">
			</ExpressItem>
		</block>
	</view>
</template>

<script>
	import ExpressItem from './expressItem.vue';
	export default{
		props:{
			expressList:Array
		},
		components:{
			ExpressItem
		}
	}
</script>

<style>
</style>
