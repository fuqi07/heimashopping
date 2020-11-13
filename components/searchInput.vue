<template>
  <view class="search_input">
  	<navigator url="/pages/search/index" class="search_content">
  		搜索
  	</navigator>
  </view>
</template>

<script>

</script>

<style lang="scss" scoped>
.search_input{
	height: 90rpx;
	padding: 10rpx;
	background-color: $color;
	.search_content{
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border-radius: 15rpx;
		color: #666;
	}
}
</style>