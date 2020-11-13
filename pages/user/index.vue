<template>
  <view  class="page">
  	<!-- 登录 开始 -->
	<view class="user_info_wrap">
		<view class="user_img_wrap" v-if="userinfo.avatarUrl">
			<image class="user_bg" :src="userinfo.avatarUrl"></image>
			<view class="user_info">
				<image class="user_icon" :src="userinfo.avatarUrl"></image>
				<view class="user_name">{{userinfo.nickName}}</view>
			</view>
		</view> 
		<view class="user_btn" v-else>
			<navigator url="/pages/login/index">登录</navigator>
		</view>
	</view>
	<!-- 登录 结束 -->
	<!-- 用户信息 开始 -->
	<view class="user_content">
		<view class="user_main">
			<!-- 历史足迹-->
			<view class="history_wrap">
				<navigator >
					<view class="his_num">0</view>
					<view class="his_name">收藏的店铺</view>
				</navigator>
				<navigator  url="/pages/collect/index">
					<view class="his_num">{{collectNums}}</view>
					<view class="his_name">收藏的商品</view>
				</navigator>
				<navigator >
					<view class="his_num">0</view>
					<view class="his_name">关注的商品</view>
				</navigator>
				<navigator >
					<view class="his_num">0</view>
					<view class="his_name">我的足迹</view>
				</navigator>
			</view>
			<!-- 我的订单 -->
			<view class="orders_wrap">
				<view class="orders_title">我的订单</view>
				<view class="order_content">
					<navigator >
						<view class="iconfont icon-ding_dan"></view>
						<view class="order_name">全部订单</view>
					</navigator>
					<navigator >
						<view class="iconfont icon-fukuantongzhi"></view>
						<view class="order_name">待付款</view>
					</navigator>
					<navigator >
						<view class="iconfont icon-receipt-address"></view>
						<view class="order_name">待收货</view>
					</navigator>
					<navigator >
						<view class="iconfont icon-tuihuotuikuan_dianpu"></view>
						<view class="order_name">退款/退货</view>
					</navigator>
				</view>
			</view>
			<!-- 收货地址管理 -->
			<view class="address_wrap">
				收货地址管理
			</view>
			<!-- 应用信息相关 -->
			<view class="app_info_wrap">
				<view class="app_info_item app_info_contact">
					<text>联系客服</text>
					<text>400-618-4000</text>
				</view>
				<navigator url="/pages/feedback/index" class="app_info_item">意见反馈</navigator>
				<view class="app_info_item">关于我们</view>
			</view>
			<!-- 推荐 -->
			<view class="recommend_wrap">
				把应用推荐给其他人
			</view>
		</view>
	</view>
	<!-- 用户信息 结束 -->
	
	
	
  </view>
</template>

<script>
export default {
  data() {
  	return {
		userinfo:[],
		// 被收藏的商品的数量
		collectNums:0
  	}
  },
  onShow() {
  	this.userinfo=uni.getStorageSync("userinfo");
	const collect=uni.getStorageSync("collect")||[];
	this.collectNums=collect.length;
	console.log(this.userinfo);
  }
}
</script>

<style lang="scss" scoped>
.page{
 
	
	.user_info_wrap{
		height: 45vh;
		//overflow: hidden;
		background-color: $color;
		position: relative;
		.user_img_wrap{
			position: relative;
			.user_bg{
			   height: 50vh;
			   // 高斯模糊
			   filter: blur(10rpx);
			}
			.user_info{
			   position: absolute;
			   left: 50%;
			   transform: translate(-50%);
			   top: 20%;
			   text-align: center;
				.user_icon{
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
				}
				.user_name{
					color: #fff;
					margin-top: 40rpx;
				}
			}
		}
		.user_btn{
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			top: 40%;
			border: 1rpx solid greenyellow;
			color: greenyellow;
			font-size: 38rpx;
			padding: 30rpx;
			border-radius: 10rpx;
		}
	}
	// 用户信息
	
	.user_content{
		 background-color: #edece8;
		//background-color: $color;
		position: relative;
		height: 80vh;
		width: 100vw;
		.user_main{
		   //padding-bottom: 100rpx;
		   position: absolute;
		   width: 90%;
		    
		   left: 50%;
		   transform: translateX(-50%);
		   top: -40rpx;
			.history_wrap{
				display: flex;
				background-color: #fff;
				navigator{
					flex: 1;
					text-align: center;
					.his_num{
						color: $color;
					}
					.his_name{}
				}
				
			}

			.orders_wrap{
				margin-top: 30rpx;
				background-color: #fff;
				.orders_title{
				   height: 80rpx;
				   display: flex;
				   align-items: center;
				   border-bottom: 1rpx solid #ccc;
				}
				.order_content{
					display: flex;
					
					navigator{
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 15rpx 0;
						.iconfont{
							color: $color;
							font-size: 40rpx;
						}
						.order_name{}
					}
				}
			}

			.address_wrap{
				margin-top: 30rpx;
				background-color: #fff;
				padding: 20rpx;				
			}
			.app_info_wrap{
				margin-top: 30rpx;
				background-color: #fff;
				.app_info_item{	
					padding: 20rpx;
					border-bottom: 1rpx solid #ccc;
				}
				.app_info_contact{
					display: flex;
					justify-content: space-between;
				}
			}
			.recommend_wrap{
				margin-top: 30rpx;
				background-color: #fff;
				padding: 20rpx;
			}
		}
	}

}
</style>