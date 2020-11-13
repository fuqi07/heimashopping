<template>
<view>
	<search-input></search-input>	
    <view class="title">
    <uni-segmented-control 
	:current="current" 
	:values="items.map(v=>v.title)"
	 @clickItem="onClickItem" 
	 style-type="text" 
	 active-color="#eb4450"
	 ></uni-segmented-control>
    </view>
	
	<scroll-view  scroll-y enable-flex @scrolltolower="handleTOLower" class="content">
		<view v-if="current === 0">
			<navigator class="goods_item"
			v-for="item in goodsList"
			:key="item.goods_id"
			:url="`/pages/goods_detail/index?goods_id=${item.goods_id}`"
			>
				<view class="goods_img_wrap">
					<image :src="item.goods_small_logo?item.goods_small_logo:'http://image1.suning.cn/uimg/b2c/newcatentries/0070134290-000000000149003877_1_400x400.jpg'" mode="widthFix"></image>
				</view>
				<view class="goods_info_wrap">
					<view class="goods_name">{{item.goods_name}}</view>
					<view class="goods_price">￥{{item.goods_price}}</view>
				</view>
			</navigator>
		</view>
		<view v-if="current === 1">
			选项卡2的内容
		</view>
		<view v-if="current === 2">
			选项卡3的内容
		</view>
	</scroll-view>
</view>
</template>

<script>
import SearchInput from "@/components/searchInput"
import {uniSegmentedControl} from '@dcloudio/uni-ui'
export default {
	components:{
	SearchInput,
	uniSegmentedControl
	},
    data() {
        return {
            items: [
				{title:"综合"},
				{title:"销量"},
				{title:"价格"}
			],
            current: 0,
			QueryParams:{
				query:"",
				cid:"",
				pagenum:1,
				pagesize:10
			},
			// 总页数
			totalPages:1,
			goodsList:[],
			hasMore:true
        }
    },
	onLoad(options) {
		this.QueryParams.cid=options.cid||"";
		this.QueryParams.query=options.query||"";
		this.getGoodsList();
	},
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            } 
        },
		async getGoodsList(){
			const res=await this.request({url:"/goods/search",data:this.QueryParams});
			console.log(res);
			//获取总条数
			const total=res.total;
			// 计算总页数
			this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
			//this.goodsList=res.goods;
			this.goodsList=[...this.goodsList,...res.goods];
			
		},
		// 滚动触底事件
		handleTOLower(){
			console.log("滚动触底事件");
			if(this.QueryParams.pagenum>=this.totalPages){
				uni.showToast({
					title:"没有更多数据了",
					icon:"none"
				})
			}else{
				this.QueryParams.pagenum++;
				this.getGoodsList();
			}
		}
    }	
    
}
</script>

<style lang="scss" scoped>
.title{
	height: 36px;
}
.content{
	height: calc(100vh - 36px);
	width: 100%;
    .goods_item{
		height: 100%;
		display: flex;
		border-bottom: 2rpx solid #ccc;
		.goods_img_wrap{
			flex:2;
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
				font-size: 32rpx;
				color: $color;
			}
		}
	}
}
</style>