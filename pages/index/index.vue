<template>
	<view>
		<search-input></search-input>
		<!-- 轮播图 开始 -->
		<view class="index_swiper">
			<swiper 
			indicator-dots 
			autoplay 
			circular
			interval="3000" 
			>
				<swiper-item
				v-for="item in swiperList"
				:key="item.goods_id"
				>
				 <navigator :url="`/pages/goods_detail/index?goods_id=${item.goods_id}`">
					 <image :src="item.image_src" ></image>
				 </navigator>
					
				
				</swiper-item>			
			</swiper>
		</view>
		<!-- 轮播图 结束 -->
		<!-- 导航 开始 -->
		<view class="index_cate">
			<navigator class="cate_item"
			v-for="item in catesList"
			:key="item.name"
			url="/pages/category/index"
			open-type="switchTab"
			>
				<image mode="widthFix" :src="item.image_src" ></image>
			</navigator>
		</view>
		<!-- 导航 结束 -->
		<!-- 楼层 开始 -->
		<view class="index_floor">
			<view class="floor_group"
			v-for="item1 in floorList"
			:key="item1.floor_title"
			>
				<view class="floor_title">
					<image mode="widthFix" :src="item1.floor_title.image_src" ></image>
				</view>
				<view class="floor_list">
					<navigator class="floor_list_item"
					v-for="(item2,index2) in item1.product_list"
					:key="item2.name"
					:url="item2.navigator_url"
					>
					<!-- 试一下可有其他方式 -->
					<!--  
						<image   :mode="index2===0?'widthFix':'scaleToFill'" :src="item2.image_src"></image>
					-->
						<image :src="item2.image_src" :mode="index2===0?'widthFix':'scaleToFill'"></image>				
					
					</navigator>
				</view>
			</view>
		</view>
		<!-- 楼层 结束 -->
	</view>
</template>

<script>
import SearchInput from "@/components/searchInput"
export default {
	components:{
		SearchInput
	},
	data() {
		return {
			// 轮播图数组
			swiperList:[],
			// 导航 数组
			catesList:[],
			// 楼层数组
			floorList:[]
		}
	},
	onLoad() {
		this.getSwiperList();
		this.getCatesList();
		this.gerFloorList();
	},
	methods:{
		getSwiperList(){
			this.request({
				url:"/home/swiperdata"
			})
			.then(result=>{
				//console.log(result);
				this.swiperList=result;
			})
			
		},
		getCatesList(){
			this.request({
				url:"/home/catitems"
			})
			.then(result=>{
				//console.log(result);
				this.catesList=result;
			})
			
		},
		gerFloorList(){
			this.request({
				url:"/home/floordata"
			})
			.then(result=>{
				console.log(result);
				result.forEach(v1=>{
					v1.product_list.forEach(v2=>{
						v2.navigator_url=v2.navigator_url.replace(/\?/,"/index\?");
						// console.log(v2.navigator_url);
					})
				})
				this.floorList=result;
			})
			
		}
		
	}
}	
</script>

<style lang="scss" scoped>
// 轮播图
.index_swiper{	
	swiper{
		// 750rpx
		//height: calc(750rpx / 2.2);
		height: 340rpx;
		width: 750rpx;
		navigator{
			height: 100%;
			image{
				height: 100%;
				
			}
		}
		
	}	
}  
// 导航
.index_cate{
	display: flex;
	padding: 20rpx;
	.cate_item{	
		width: 25%;
		image{
			
		}
	}
}
// 楼层
.index_floor{
    .floor_title{
        padding: 10rpx 0;
      image{
         width: 100%; 
      }
    }
	/*
    .floor_list{
		
      .floor_list_item{
          float: left;
          width: 33.33%; 
		  // 后四个超链接 
		  &:nth-last-child(-n+4){
			  height: 33.33vw*386/232/2;
			  border-left: 10rpx solid #fff;			 
		  }
		  
		
		  &:nth-child(2),
		  &:nth-child(3){
			  border-bottom: 10rpx solid #fff;
		  }
		  
          image{
            width: 100%;
			height: 100%;
          }
      }
    }*/
	
	.floor_list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 200rpx);
		grid-template-areas: "lt rg rg"
							"lt rg rg";
		// display: flex;
		// flex-wrap: wrap;		
		.floor_list_item {
			
			width: 100%;
			overflow: hidden;
		}
		.floor_list_item:nth-child(1) {
			// width:33.3%;
			grid-area: lt;
		}
		.floor_list_item:nth-child(2),
		.floor_list_item:nth-child(3) {
			padding-bottom: 10rpx;
		}
		.floor_list_item:nth-child(n+2) {
			// height: 74rpx;
			padding-left: 10rpx;		
			
		}
		
		
		image {
			width: 100%;
			height: 100%;
		}
		
	}

}

</style>
