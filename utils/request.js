// es 6 promise 微信小程序的 api 的铺垫
export default(params)=>{
	uni.showLoading({
		title:"加载中"
	})
	
	return new Promise((resovle,reject)=>{
		
		// 定义 公共的url
		const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
		
		wx.request({
			...params,
			url:baseUrl+params.url,
			success(res){
				resovle(res.data.message);
			},
			fail(err) {
				reject(err);
			},
			complete(){
				uni.hideLoading();
			}
		})
	})
}