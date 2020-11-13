<template>
  <view>
	  <!-- 收货地址 开始 -->
	  <view class="revice_address_row">
	  	<view class="address_btn" v-if="!address.userName">
	  		<button @click="handleChooseAdress" type="primary" plain>获取收货地址</button>
	  	</view>
		<view class="user_info_row" v-else>
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
			<block v-if="cart.length!==0">
				<view class="cart_item"
				v-for="item in cart"
				:key="item.goods_id"
				>
				  <!-- 复选框 -->
				  <view class="cart_chk_wrap">
				  	<checkbox-group @change="handleItemChange" :data-id="item.goods_id">
				  		<checkbox :checked="item.checked"></checkbox>
				  	</checkbox-group>
				  </view>
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
			</block>
			<block v-else>
				<image src="https://hbimg.huabanimg.com/e1b1467beea0a9c7d6a56b32bac6d7e5dcd914f7c3e6-YTwUd6_fw658/format/webp" mode="widthFix"></image>
			</block>
		</view>
	  </view>
	  <!-- 购物车内容 结束 -->
	  <!-- 底部工具栏 开始 -->
	  <view class="footer_tool">
		 <!-- 全选 -->
	  	<view class="all_chk_wrap">
	  		<checkbox-group @change="handleItemAllCheck">
				<checkbox :checked="allChecked">全选</checkbox>
			</checkbox-group>
	  	</view>
		<!-- 总价格 -->
		<view class="total_price_wrap">
			<view class="total_price">
				总价:<text class="total_price_text">￥{{totalPrice}}</text>
			</view>
			<view >包含运费</view>
		</view>
		<!-- 结算 -->
		<view class="order_pay_wrap" @click="handlePay">
			结算{{totalNum}}
		</view>
	  </view>
	  <!-- 底部工具栏 结束 -->
  </view>
</template>

<script>
export default {
	data() {
		return {
			address:{},
			cart:[],
			allChecked:false,
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
		 this.setCart();
	},
	methods:{
		// 点击 收货地址
		async handleChooseAdress(){
			console.log("点击 收货地址");
			/*
			wx.chooseAddress({
				success: (result) => {
					console.log(result);
				}
			});
			*/
			/*
			wx.getSetting({
				success: (result) => {
					const scopeAddress =result.authSetting["scope.address"];
					if(scopeAddress===true||scopeAddress===undefined){
						wx.chooseAddress({
							success: (result1) => {
								//console.log(result1);
								let address=result1;
								address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
								this.address=address;
								console.log(this.address);
								uni.setStorageSync("address", this.address);
							}
						});
					}else{
						wx.openSetting({
							success: (result2) => {
								wx.chooseAddress({
									success: (result3) => {
										//console.log(result3);
										//console.log("输出result3");
									}
								})
							}
						})
					}
				},
				fail: () => {},
				complete: () => {}
			});
			*/
		    
			 //优化代码以下
			try{
			  // 1 获取权限状态
			  const res1=await this.getSetting();
			  const scopeAddress =res1.authSetting["scope.address"];
			  // 2 判断 权限状态
			  if(scopeAddress===false){
			 await this.openSetting();
			  }
			  // 4 调用获取收货地址的 api
			  let address=await this.chooseAddress();
			  address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
			  //console.log(res2);
			  // 5 存入到缓存中
			  uni.setStorageSync("address", address)
			}catch(error){
			  console.log(error);
			}
		},
		// 商品的选中
		handleItemChange(e){
			// 1 获取被修改的商品的id
			const goods_id=e.currentTarget.dataset.id;
			console.log(goods_id);
			// 根据商品id找到索引
			let index=this.cart.findIndex(v=>v.goods_id===goods_id);
			// 选中状态取反
			this.cart[index].checked=!this.cart[index].checked;
			this.setCart();
		},
		// 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买数量
		setCart(){
			let allChecked=true;
			let totalPrice=0;
			let totalNum=0;
			this.cart.forEach(v=>{
				if(v.checked){
					totalPrice+=v.num*v.goods_price;
					totalNum+=v.num;
				}else{
					allChecked=false;
				}
			});
			// 判断数组是否为空
			allChecked=this.cart.length!=0?allChecked:false;
			this.totalPrice=totalPrice;
			this.totalNum=totalNum;
			this.allChecked=allChecked;
			uni.setStorageSync("cart",this.cart);			
		},
		// 全选
		handleItemAllCheck(){
			this.allChecked=!this.allChecked;
			this.cart.forEach(v=>v.checked=this.allChecked);
			this.setCart();
		},
		// 点击 结算
		async handlePay(){
			// 1 判断收货地址
			if(!this.address.userName){
				await uni.showToast({
					title:"您还没有选择收货地址"
				});
				return ;
			}
			// 2 判断用户有没有选购商品
			if(this.totalNum===0){
				await uni.showToast({
					title:"您还没有选购商品"
				});
				return ;
			}
			// 3 跳转到 支付页面
			uni.navigateTo({
				url:"/pages/pay/index"
			})
		}
	}
	
}
</script>

<style lang="scss" scoped>
// 收货地址
.revice_address_row{
    .address_btn{
        padding: 20rpx;
        button{
            width: 60%;
        }
    }
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