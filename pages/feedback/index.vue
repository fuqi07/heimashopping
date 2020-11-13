<template>
    <view class="page">
        <uni-segmented-control 
		:current="current" 
		:values="items.map(v=>v.title)"
		 @clickItem="onClickItem"
		  style-type="text" 
		  active-color="#eb4450"
		  ></uni-segmented-control>
        <view class="content">
            <view class="fb_tetle">问题的种类</view>
			<view class="fb_tips">
				<text>功能建议</text>
				<text>购买遇到问题</text>
				<text>性能问题</text>
				<text>其他</text>
			</view>
			<view class="fb_content">
				<textarea 
				v-model="textVal" 
				@input="handleTextInput" 
				placeholder="请描述一下您的问题" 
				></textarea>
				<view class="fb_tool">
					<button @click="handleChooseImg">+</button>
					<view class="up_img_item"
					v-for="(item,index) in chooseImgs"
					:key="item.index"
					@click="handleRemoveImg"
					data-index="index"
					>
					<image :src="item" mode="scaleToFill"></image>
					</view>
				</view>
			</view>
			<view class="from_btn_wrap">
				<button @click="hanleFormSubmit" type="warn" >
					<icon type="success_no_circle" size="23" color="white"></icon>
					提交
				</button>
			</view>
        </view>
    </view>
</template>

<script>
import {uniSegmentedControl} from "@dcloudio/uni-ui"
export default {
    components: {uniSegmentedControl},
    data() {
        return {
            items: [
				{title:"体验问题"},
				{title:"商品、商家投诉"}
			],
            current: 0,
			// 文本域的内容
			textVal:"",
			// 被选中的图片路径 数组
			chooseImgs:[],
			// 
			UpLoadImgs:[]
        }
    },
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        },
		// 文本域的输入事件
		handleTextInput(e){
			this.textVal=e.detail.value;
		},
		// 点击“ + ” 选择图片 
		handleChooseImg(){
			//  调试小程序内置的选择图片api
			uni.chooseImage({
				// 同时选中的图片的数量
				count:9,
				// 图片的格式 原图 压缩
				sizeType:['original','compressed'],
				// 图片的来源 相册 照相机
				sourceType:['album','camera'],
				success: (result) => {
					console.log(result);
					// 图片数组 进行拼接
					this.chooseImgs=[...this.chooseImgs,...result.tempFilePaths];
				}
			})
		},
		// 点击 自定义图片组件
		handleRemoveImg(e){
			// 获取被点击的组件的索引
			const {index}=e.currentTarget.dataset;
			// 获取data中图片数组
			this.chooseImgs.splice(index,1)
		},
		// 提交按钮的点击
		hanleFormSubmit(){
			// 1 合法性的验证 有没有输入文字
			if(!this.textVal.trim()){
				// 不合法
				uni.showToast({
					title:"输入不合法",
					icon:"none",
					mask:true
				});
				return ;
			}
			// 准备上传图片 到专门的图片服务器
			// 上传的api 不支持 多个文件同时上传 遍历数组 挨个上传
			// 显示正在等待的图片
			uni.showLoading({
				title:"正在上传中",
				mask:true
			});
			
			// 判断有没有需要上传的图片数组
			if(this.chooseImgs.length!=0){
				this.chooseImgs.forEach((v,i)=>{
					uni.uploadFile({
						// 图片要上传到哪里
						url:'https://images.ac.cn/Home/Index/UploadAction/',
						//被上传的文件的路径
						filePath:v,
						// 上传的文件的名称 后台来获取文件 file
						name:"file",
						// 顺带的文本信息
						formData:{},
						success: (result) => {
							console.log(result);
							let url=JSON.parse(result.data).url;
							this.UpLoadImgs.push(url);
							console.log(this.UpLoadImgs);
							
							// 所有的图片都上传完毕了才触发
							if(i===this.chooseImgs.length-1){
								// 
								uni.hideLoading();
								
								console.log("把文本的内容和外网的图片数组 提交到后台中");
								// 提交都成功了
								// 重置页面
								this.textVal="";
								this.chooseImgs=[];
								// 返回上一个页面
								uni.navigateBack({
									delta:1
								})
							}
						}
					})
				})
			}else{
				uni.hideLoading();
				
				console.log("只是提交了文本");
				// 重置页面
				this.textVal="";
				this.chooseImgs=[];
				// 返回上一个页面
				uni.navigateBack({
					delta:1
				});
			}
		}
    }
}
</script>

<style lang="scss" scoped>
.page{
	 background-color: #eeeeee;
	 height: 100vh;
}
.content{
	padding: 20rpx;
	color: #666;
	.fb_tetle{
		
	}
	.fb_tips{
		display: flex;
		flex-wrap: wrap;
		text{
			width: 30%;
			padding: 10rpx;
			background-color: #fff;
			margin: 20rpx 10rpx;
			text-align: center;
		}
	}
	
	.fb_content {
      background-color: #fff;
      margin-top: 20rpx;
      textarea {
        padding: 10rpx;
      }
  
      .fb_tool {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 30rpx;
        button{
          margin: 0;
          width: 90rpx;
          height: 90rpx;
          font-size: 60rpx;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 20rpx;
          margin-top: 20rpx;
          color: #ccc;
        }
        .up_img_item{
          margin-left: 20rpx;
		  width: 90rpx;
		  height: 90rpx;
          margin-top: 20rpx;
		  image{
			  height: 100%;
		  }
        }
      }
    }
  
    .from_btn_wrap {
      margin-top: 20rpx;
      display: flex;
      justify-content: flex-end;     
      button{		
        display: flex;
        margin: 0;
        width: 30%;
        font-style: 23rpx;
        justify-content: center;
        align-items: center;
      }
    }
}
</style>