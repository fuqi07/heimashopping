<template>
  <view>
	  <!-- 收货地址 开始 -->
	  <view class="revice_address_row">  	
		<view class="user_info_row" >
			<view class="user_info">
				<view>{{address.userName}}</view>
				<view>{{address.all}}</view>
			</view>
			<view class="user_phone">{{address.telNumber}}</view>
		</view>
	  </view>
	  <!-- 收货地址 结束 -->
	  <!-- 购物车内容 开始 -->
	  <view class="cart_content">
	  	<view class="cart_title">购物车</view>
		<view class="cart_main">	
			<view class="cart_item"
			v-for="item in cart"
			:key="item.goods_id"
			>
			  
			  <!-- 商品图片 -->
			  <navigator class="cart_img_wrap">
				  <image mode="widthFix" :src="item.goods_small_logo" ></image>
			  </navigator>
			  <!-- 商品信息 -->
			  <view class="cart_info_wrap">
				<view class="goods_name">{{item.goods_name}}</view>
				<view class="goods_price_wrap">
					<view class="goods_price">￥{{item.goods_price}}</view>
					<view class="cart_num_tool">
						<view class="num_edit">-</view>
						<view class="goods_num">{{item.num}}</view>
						<view class="num_edit">+</view>
					</view>
				</view>
			  </view>
			</view>
		
		</view>
	  </view>
	  <!-- 购物车内容 结束 -->
	  <!-- 底部工具栏 开始 -->
	  <view class="footer_tool">		
		<!-- 总价格 -->
		<view class="total_price_wrap">
			<view class="total_price">
				总价:<text class="total_price_text">￥{{totalPrice}}</text>
			</view>
			<view >包含运费</view>
		</view>
		<!-- 支付 -->
		<view class="order_pay_wrap" @click="handleOrderPay">
			支付{{totalNum}}
		</view>
	  </view>
	  <!-- 底部工具栏 结束 -->
  </view>
</template>

<script>
export default{
	data() {
		return {
			address:{},
			cart:[],
			totalPrice:0,
			totalNum:0
		}
	},
	onShow() {
		// 1
		this.address=uni.getStorageSync("address");
		// 2
		this.cart=uni.getStorageSync("cart")||[];
		 console.log(this.cart);
		 this.cart=this.cart.filter(v=>v.checked);
		 this.cart.forEach(v=>{
			 this.totalPrice+=v.num*v.goods_price;
			 this.totalNum+=v.num;
		 })
	},
	methods:{
	    // 点击 支付
	    handleOrderPay(){
	      // 1 判断缓存中有没有token
	      const token=uni.getStorageSync("token");
	      // 2 判断
	      if(!token){
	       uni.navigateTo({
	       	url:'/pages/auth/index'
	       })
	        return;
	      }
	      console.log("已经存在token");
	    }
	}
}
</script>

<style lang="scss" scoped>
// 收货地址
.revice_address_row{
    .user_info_row{
        display: flex;
        padding: 20rpx;
        .user_info{
            flex: 5;
        }
        .user_phone{
            flex: 3;
            text-align: right;
        }
    }
}

// 购物车内容
.cart_content {
    .cart_title {
      font-size: 36rpx;
	  padding: 20rpx;
	  color: $color;
	  border: 1rpx solid $color;
    }
  
    .cart_main {
      .cart_item {
         display: flex;
		 //padding: 10rpx;
		 border-bottom: 1rpx solid #ccc;
  
        .cart_chk_wrap {
            flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
          checkbox-group {
            checkbox {
  
            }
          }
        }
  
        .cart_img_wrap {
           flex: 2;
		   display: flex;
		   justify-content: center;
		   align-items: center;
          image {
              width: 80%;
          }
        }
  
        .cart_info_wrap {
            flex: 4;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
          .goods_name {
              display: -webkit-box;
			  overflow: hidden;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;       
			  
			  
          }
  
          .goods_price_wrap {
              display: flex;
			  justify-content: space-between;
			  align-items: center;
            .goods_price {
                color: $color;
            }
  
            .cart_num_tool {
                display: flex;
              .num_edit {
                  border: 1rpx solid #ccc;
				  width: 55rpx;
				  height: 55rpx;
				  display: flex;
				  justify-content: center;
				  align-items: center;
              }
  
              .goods_num {
                width: 55rpx;
                height: 55rpx;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }
          }
        }
      }
    }
}
// 底部工具栏
  .footer_tool {
    position: fixed;
	left: 0;
	bottom: 0;
	 display: flex;
	 width: 100%;
	 height: 90rpx;
	 border-top: 1rpx solid #ccc;
    .all_chk_wrap {
        flex: 2;
		display: flex;
		justify-content: center;
		align-items: center;
    }
  
    .total_price_wrap {
        flex: 5;
		padding-right: 15rpx;
		text-align: right;
      .total_price {
        .total_price_text {
            color: $color;
			font-size: 34rpx;
			font-weight: 600rpx;
        }
      }
    }
  
    .order_pay_wrap {
        flex: 3;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-weight: 600rpx;
		color: #fff;
		background-color: $color;
    }
  }
</style>