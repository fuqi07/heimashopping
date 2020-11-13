<template>
  <view class="cates">
  	<search-input></search-input>
	<view class="cates_container">
		<!-- 左侧菜单 开始 -->
		<scroll-view scroll-y enable-flex class="left_menu" >
			<view class="menu_item" :class="index===currentIndex?'active':''"
			v-for="(item,index) in leftMenuList"
			:key="item.cat_id"
			@click="handleItemTap"
			:data-index="index"
			>
				{{item}}
			</view>
		</scroll-view>
		<!-- 左侧菜单 结束 -->
		<!-- 右侧商品内容 开始 -->
		<scroll-view :scroll-top="scrollTop" @scroll="scroll" scroll-y enable-flex  class="right_content">
			<view class="goods_group"
			v-for="(item1,index1) in rightContent"
			:key="index1"
			>
				<view class="goods_title">
					<text class="delimiter">/</text>
					<text class="title">{{item1.cat_name}}</text>
					<text class="delimiter">/</text>
				</view>
				<view class="goods_list">
					<navigator class="goods_content"
					v-for="(item2,index2) in item1.children"
					:key="index2"
					:url="`/pages/goods_list/index?cid=${item2.cat_id}`"
					>
					   <image mode="widthFix" :src="item2.cat_icon"></image>
						<view class="goods_name">
							{{item2.cat_name}}
						</view>
					</navigator>
				</view>
				
			</view>
		</scroll-view>
		<!-- 右侧商品内容 结束 -->
	</view>
	
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
			// 左侧的菜单数据
			leftMenuList:[],
			// 右侧的商品数据
			rightContent:[],
			// 被点击的左侧的菜单
			currentIndex:0,
			// 接口的返回数据
	        Cates:[],
			// 右侧内容的滚动条距离顶部的距离
			scrollTop:0,
			hasTop:true
		}
	},
	
	
	onLoad() {
		// this.getList();
		// 1 获取本地存储中的数据 （小程序中也是存在本地存储 技术）
		const Cates=wx.getStorageSync("cates");
		// 2 判断
		if(!Cates){
			// 不存在 发送请求获取数据
			this.getCates();
			console.log("不存在 发送请求获取数据");
		}else{
			// 有旧的数据 定义过期时间 10s 改为 5分钟
			if(Date.now()-Cates.time>1000*10){
				// 重新发送请求
				this.getCates();
				const Cates_time=Date.now()-Cates.time;
				console.log(Cates_time);
				console.log("重新发送请求");
			}else{
				// 可以使用旧的数据
				console.log("可以使用旧的数据");
				this.Cates=Cates.data;
				this.leftMenuList=this.Cates.map(v=>v.cat_name);
				this.rightContent=this.Cates[0].children;	
			}
					
		}
	},
	methods:{
		
		async getCates(){
			const res=await this.request({url:"/categories"});
			this.Cates=res;
			wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
			this.leftMenuList=this.Cates.map(v=>v.cat_name);
			this.rightContent=this.Cates[0].children;
		},
		scroll(e) {
		    // 滚动时改变 scroll-top;否则在重复回到锚点时会失效
		    this.scrollTop =0;
		 },
		// 左侧菜单的点击事件
		handleItemTap(e){
			const {index}=e.currentTarget.dataset;
			this.currentIndex=index;
			this.rightContent=this.Cates[index].children;
			console.log(this.scrollTop);
			this.scrollTop=200;
			//this.scrollTop =0;
		}
		/*
		getList(){
			this.request({
				url:"/categories"
			})
			.then(result=>{
			    console.log(result);
				// 获取数组中的一个元素的所有值 循环获取  map
				this.leftMenuList=result.map(v=>v.cat_name);
				this.rightContent=result[this.currentIndex].children;
				console.log(this.leftMenuList);
				console.log(this.rightContent);
			})
		},
		
		//
		handleItemTap(e){
			const {index}=e.currentTarget.dataset;			
			console.log(index);
			this.currentIndex=index;
			this.getList();
		}*/
	}
	
}
</script>

<style lang="scss" scoped>
.cates{
    height: 100%;
    .cates_container{
       height: calc(100vh - 90rpx);
	   display: flex;
        .left_menu{
			flex: 2;
             //border: 4rpx solid #007AFF;          
            .menu_item{
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
               // border: 4rpx solid #007AFF;
            }
			.active{
				color: $color;
				border-left: 5rpx solid $color;
			}
           
        }
        .right_content{
          flex: 5;
            .goods_group{
                .goods_title{
                    height: 80rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
					.delimiter{
						color: #ccc;
						padding: 0 10rpx;
					}
					.title{}
                }

                .goods_list{
                    display: flex;
					flex-wrap: wrap;
                    .goods_content{
						width: 33.33%;
						display: flex;
						flex-direction: column;
						align-items: center;
						//vertical-align: middle;
						//text-align: center;
						
                        image {
							width: 50%;
						}
                       
						.goods_name{}
                    }
                }
            }
        }
    }
}
</style>