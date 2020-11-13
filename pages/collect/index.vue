<template>
    <view>
        <uni-segmented-control
		 :current="current" 
		 :values="items.map(v=>v.title)"
		  @clickItem="onClickItem" 
		  style-type="text" 
		  active-color="#eb4450"
		  ></uni-segmented-control>
		<view class="collect_main">
			<view class="collect_title">
			   <text class="collect_tips active" >全部</text>
			   <text class="collect_tips" >正在热卖</text>  
			   <text class="collect_tips" >即将上线</text>
			</view>
			<view class="collect_content">
				<navigator class="goods_item" 
				v-for="item in collect"
				:key="item.goods_id"
				:url="`/pages/goods_detail/index?goods_id=${item.goods_id}`"
				>
				  <!-- 左侧 图片容器 -->
				  <view class="goods_img_wrap">
					   <image mode="widthFix" :src="item.goods_small_logo?item.goods_small_logo:'http://image1.suning.cn/uimg/b2c/newcatentries/0070134290-000000000149003877_1_400x400.jpg'"></image>
				  </view>
				  <!-- 右侧 商品容器 -->
				  <view class="goods_info_wrap">
					   <view class="goods_name">{{item.goods_name}}</view>
					   <view class="goods_price">￥{{item.goods_price}}</view>
				  </view>
				</navigator>
			</view>
		</view>
    </view>
</template>

<script>
import {uniSegmentedControl} from '@dcloudio/uni-ui'
export default {
    components: {
		uniSegmentedControl
		},
    data() {
        return {
            items: [
				{title:"商品收藏"},
				{title:"品牌收藏"},
				{title:"店铺收藏"},
				{title:"浏览足迹"}
			],
            current: 0,
			collect:[]
        }
    },
	onShow() {
		const collect=uni.getStorageSync("collect")||[];
		this.collect=collect;
	},
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
		
		
    }
}
</script>

<style lang="scss" scoped>
.collect_main{
    background-color: #f3f4f6;
    .collect_title{
        padding: 40rpx 0;
        .collect_tips{
            padding: 15rpx;
			margin-left: 25rpx;
			color: #000;
			background-color: #fff;
			border: 1rpx solid #ccc;
        }
        .active{
            color: $color;
			border: 1rpx solid $color;
        }
    }
    .collect_content{
        .goods_item{
            display: flex;
			background-color: #fff;
			border: 1rpx solid #ccc;
            .goods_img_wrap{
                flex: 2;
				display: flex;
				justify-content: center;
				align-items: center;
                image{
                    width: 70%;
                }
            }
            .goods_info_wrap{
                flex: 3;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
                .goods_name{
					color: #000;
                   display: -webkit-box;
				   overflow: hidden;
				   -webkit-box-orient:vertical;
				   -webkit-line-clamp:2;
                }
                .goods_price{
                    color: $color;
                }
            }
        }
    }
}
</style>