<template>
	<view class="page">
		<view class="seach_row">
			<input 
			v-model="inpValue" 
			placeholder="请输入您要搜索的商品"
			@input="handleInput"
			></input>
			<button @click="handleCancel" type="default">取消</button>
		</view>
		<view class="search_content">
			<navigator
			 :url="`/pages/goods_detail/index?goods_id=${item.goods_id}`"
			 class="search_item"
			 v-for="(item,index) in goods"
			 :key="index"
			 >
				{{item.goods_name}}
			</navigator>
		</view>
	</view>
</template>

<script>
export default{
	data() {
		return {
			goods:[],
			// 取消 按钮 是否显示
			isFocus:false,
			// 输入框的值
			inpValue:"",
			TimeId:-1
		}
	},
	
	methods:{
		// 输入框的值改变 就会触发的事件
		handleInput(e){
			// 1 获取输入框的值
			const {value} = e.detail;
			// 2 检测合法性
			if(!value.trim()){
				// 值不合法
				return ;
			}
			// 3 准备发送请求获取数据
			this.isFocus=true;
			clearTimeout(this.TimeId);
			this.TimeId=setTimeout(()=>{
				this.qsearch(value);
			},1000);		
		},
	    // 发送请求获取搜索建议 数据
		async qsearch(query){
			const res=await this.request({url:"/goods/search",data:query});
			// console.log(res);
			this.goods=res.goods;
			//console.log(this.goods);
		},
		// 点击取消按钮
		handleCancel(){
			this.inpValue="";
			this.isFocus=false;
			this.goods=[]
		}
		
	}

}
</script>

<style lang="scss" scoped>
.page{
    background-color: #dedede;
	height: 100vh;
    padding: 20rpx;
}
.seach_row{
    height: 90rpx;
    display: flex;
    input{
        flex: 4;
        background-color: #fff;
        height: 100%;
        padding-left: 30rpx;
    }
    button{      
        flex: 1;
        height: 100%;
        font-size: 28rpx;
        padding: 0;
        margin: 0 10rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26rpx;
        
    }
}

.search_content{
    margin-top: 30rpx;
    .search_item{
        background-color: #fff;
        font-size: 26rpx;
        padding: 15rpx 10rpx;
        border-bottom: 1rpx solid #ccc;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
</style>