<template>
	<view>
		<button type="primary" plain open-type="getUserInfo" @getuserinfo="hendleGetUserInfo" >
		    获取授权
		</button>
	</view>
</template>

<script>
export default{
	methods:{
	  // 获取用户信息
	  async hendleGetUserInfo(e){
	    console.log(e);
	    // 1 获取用户信息
	    const {encryptedData,rawData,iv,signature}=e.detail;   
	    // 2 获取小程序登录成功后的code    
	    const {code}=await this.login();
	    //console.log(code);
	    const loginParams={encryptedData,rawData,iv,signature,code}
	    //
	    const res=await this.request({url:"/users/wxlogin",data:loginParams,method:"post"});
	    console.log(res);
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