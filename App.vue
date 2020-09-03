// App.vue文件  中首行的位置引入，注意给style标签加入lang="scss"属性
<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "uview-ui/index.scss";
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}
	/* #endif */
	
</style>


<script>
export default {
onLaunch: function() {
	uni.getSystemInfo({
		success: function(e) {
			// #ifndef MP
			Vue.prototype.StatusBar = e.statusBarHeight;
			if (e.platform == 'android') {
				Vue.prototype.CustomBar = e.statusBarHeight + 50;
			} else {
				Vue.prototype.CustomBar = e.statusBarHeight + 45;
			};
			// #endif
			// #ifdef MP-WEIXIN
			Vue.prototype.StatusBar = e.statusBarHeight;
			let custom = wx.getMenuButtonBoundingClientRect();
			Vue.prototype.Custom = custom;
			Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			// #endif		
			// #ifdef MP-ALIPAY
			Vue.prototype.StatusBar = e.statusBarHeight;
			Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			// #endif
		}
	})
},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>
