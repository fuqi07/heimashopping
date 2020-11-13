<template>
  <view>
	<!-- 轮播图 开始 -->
	<view class="detail_swiper">
		<swiper 
		indicator-dots
		autoplay 
		circular
		:interval="3000" 
		>
			<swiper-item
			v-for="item in goodsObj.pics"
			:key="item.pics_id"
			@click="handlePreviewImage"
			:data-url="item.pics_mid"
			>
				<image :src="item.pics_mid" mode="widthFix"></image>
			</swiper-item>			
		</swiper>
	</view>
	<!-- 轮播图 结束 -->
	<!-- 商品 开始 -->
	<view class="goods_price">￥{{goodsObj.goods_price}}</view>
	<view class="goods_name_row">
		<view class="goods_name">{{goodsObj.goods_name}}</view>
		<view class="goods_collect" @click="handleCollect">
			<text class="iconfont" :class="isCollect?'icon-shoucang1':'icon-shoucang'"></text>
			<text class="collect_text">收藏</text>
		</view>
	</view>
	<!-- 商品 结束 -->
	<!-- 图文详情 开始 -->
	<view class="goods_info">
		<view class="goods_info_title">图文详情</view>
		<view class="goods_info_content">
			<rich-text :nodes="goodsObj.goods_introduce"></rich-text>
		</view>
	</view>
	<!-- 图文详情 结束 -->
	<!-- 下框栏 开始 -->
	<view class="btm_tool">
		<view class="tool_item">
			<view class="iconfont icon-kefu"></view>
			<view >客服</view>
			<button open-type="contact"></button>
		</view>
		<view class="tool_item">
			<view class="iconfont icon-share_icon"></view>
			<view >分享</view>
			<button open-type="share"></button>
		</view>
		<navigator open-type="switchTab"  url="/pages/cart/index" class="tool_item">
			<view class="iconfont icon-gouwuche"></view>
			<view >购物车</view>
		</navigator>
		<view @click="hanleCartAdd" class="tool_item btn_cart">
			加入购物车
		</view>
		<view class="tool_item btn_buy">
			立即购买
		</view>
	</view>
	<!-- 下框栏 结束 -->
  </view>  
</template>

<script>
export default {
	data() {
		return {
			goods_id:0,
			goodsObj:{},
			GoodsInfo:{},
			// 商品是否被收藏
			isCollect:false,
			collect:[]
		}
	},
	
	onLoad(options) {
		// console.log(options);
		this.goods_id=options.goods_id
		this.getGoodsDetail();
	},
	/*
	onShow() {
		let pages=getCurrentPages();
		let currentPage=pages[pages.length-1];
		let options=currentPage.options;
		const {goods_id}=options;
		this.getGoodsDetail(goods_id);
	},*/
	methods:{
		async getGoodsDetail(){
			// const res=await this.request({url:"/goods/detail", data:{goods_id: this.goods_id}});
			const res=await this.request({url:`/goods/detail?goods_id=${this.goods_id}`});
			console.log(res);
			this.goodsObj=res;
			this.GoodsInfo=res;
			let collect=uni.getStorageSync("collect")||[];
			let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
			//console.log(isCollect);
			this.isCollect=isCollect;
			this.collect=collect;
			this.goodsObj.goods_introduce=this.goodsObj.goods_introduce.replace(/\.webp/g,'.jpg');
			
		},
		// 点击轮播图 放大预览
		handlePreviewImage(e){
			//console.log("放大预览");
			// 1 先构造要预览的图片数组
			const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
			// 2 接收传递过来的图片 url
			const current=e.currentTarget.dataset.url;
			//console.log(urls,current);
			uni.previewImage({
				current:current,
				urls:urls
			})
		},
		// 点击加入购物车
		hanleCartAdd(){
			// 1 获取缓存中的购物车
			let cart=uni.getStorageSync("cart")||[];
			// 2判断 商品对象是否存在于购物车数组中
			let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
			if(index===-1){
				// 3 不存在 第一次添加
				this.GoodsInfo.num=1;
				this.GoodsInfo.checked=true;
				cart.push(this.GoodsInfo);
			}else{
				// 4 已经存在购物车数据 执行num++
				cart[index].num++;
			}
			// 5 把购物车重新添加回缓存中
			uni.setStorageSync("cart",cart);
			// 6 弹窗提示
			uni.showToast({
				title:'加入成功',
				icon:'success',
				// true 防止用户 手抖 疯狂点击按钮
				mask:true
			});	
		},
		// 点击商品收藏图标
		handleCollect(){
			let isCollect=false;
			// 1 获取缓存中的商品收藏数组
			let collect =uni.getStorageSync("collect")||[];
			console.log(collect);
			// 2 判断该商品是否被收藏过
			let index =collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
			// 3 当index！==-1 表示 已经收藏过
			console.log(index,this.GoodsInfo.goods_id);
			if(index!==-1){
				collect.splice(index,1);
				isCollect=false;
				uni.showToast({
					title:"取消成功",
					icon:'success',
					mask:true
				});
			}else{
				// 没有收藏过
				collect.push(this.GoodsInfo);
				isCollect=true;
				uni.showToast({
					title:"收藏成功",
					icon:'success',
					mask:true
				});
			}
			this.collect=collect;
			this.isCollect=isCollect;
			// 4 把数组存入到缓存中
			uni.setStorageSync("collect",this.collect);
			uni.setStorageSync("isCollect",this.isCollect)
		}
		
	}
}
</script>

<style lang="scss" scoped>
// 轮播图
.detail_swiper{
	swiper{
        height: 65vw;
        //background-color: red;
        
		swiper-item {
			display: flex;
			justify-content: center;
			image{
				width: 60%;
			}
		}
    }
}
// 商品
.goods_price{
    font-size: 32rpx;
	font-weight: 600;
	color: $color;
	padding: 15rpx;
	
}
.goods_name_row{
    padding: 10rpx 0;
	display: flex;
    border-top: 5rpx solid #dedede;
    border-bottom: 5rpx solid #dedede;
    .goods_name{
        flex: 5;
		color: #000;
		font-size: 30rpx;
		padding: 0 10rpx;
		
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
    }
    .goods_collect{
        flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-left: 1rpx solid #000;
		
        .iconfont{}
        .icon-shoucang1{
            color: orangered;
        }
        .collect_text{}
    }
}

//图文详情
.goods_info{
    .goods_info_title{
        font-size: 32rpx;
        color: $color;
        font-weight: 600;
        padding: 20rpx;
    }
    .goods_info_centent{
        padding-bottom: 95rpx;
    }
}
// 下栏框
.btm_tool{
    border-top: 1rpx solid #ccc;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 90rpx;
	background-color: #fff;
	
	display: flex;
    .tool_item{
        flex: 1;
		display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
		font-size: 24rpx;
		position: relative;
        button{
           position: absolute;
		   top: 0;
		   left: 0;
		   width: 100%;
		   height: 100%;
		   opacity: 0;
        }
    }
    .btn_cart{
        flex: 2;
		color: #fff;
		background-color: #ffa500;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600rpx;
    }
    .btn_buy{
        flex: 2;
		color: #fff;
		background-color: $color;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		font-weight: 600rpx;
    }
}
</style>