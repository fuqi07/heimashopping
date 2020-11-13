<template>
	<view>
		<button type="primary" plain open-type="getUserInfo"  @click="wxGetUserInfo">登录</button>
	</view>
</template>

<script>
export default{
	data() {
		return {
			userInfo: {}
		}
	},
	methods:{
		wxGetUserInfo(e){
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    //console.log(loginRes.authResult);
				// console.log(loginRes);
			  }
			});
			uni.getUserInfo({
				success: res => {
					this.userInfo = res.userInfo;
					uni.setStorageSync("userinfo", this.userInfo);
					uni.navigateBack({
						delta:1
					})
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
 button{
	margin-top: 40rpx;
	width: 70%;
}
</style>