<template>
	<div class="theme-panel" @click.stop="stop">
		<div class="title">主题设置</div>
		<div class="tip">提示：设置主题所有的页面都将生效</div>
		<div class="theme">
			<!-- 分类 -->
			<div class="category">
				<template v-for="(item,index) in category">
					<div class="cate-item" :key="index" :class="{'cate-item-active':index==category_index}" @click="changeCategory(index)">{{item}}</div>
				</template>
			</div>
			<!-- 主题列表 -->
			<div class="theme-list scrollbar">
				<template>
					<div class="theme-item" v-for="(item,index) in theme_list" :key="index" :class="{'theme-item-active':theme_index==index}" @click="choosetheme(index, item.value)">{{item.name}}</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				category: [
					'全部',
					'红色',
					'黄色',
					'绿色',
					'蓝色',
					'紫色',
					'其他',
					'自定义',
				],
				// 模拟数据
				theme_list: [
					{name: '红色', value: '#f00'},
					{name: '蓝色', value: '#00f'},
					{name: '绿色', value: '#0f0'},
				],
				// 当前选中的类型
				category_index: 0,
				// 当前选中的主题
				theme_index: -1,
				// 页面主题内容
				page_theme: {},
			}
		},
		mounted() {
			this.getTheme();
		},
		methods: {
			stop() {
				
			},
			// 切换分类
			changeCategory(index) {
				this.category_index = index;
			},
			// 获取页面主题
			getTheme() {
				const _this = this;
				this.http.getPageTheme().then(res => {
					_this.page_theme = res[0];
					_this.theme_index = _this.theme_list.findIndex((item) => {
						return item.value == res[0].page_theme
					})
				})
			},
			// 选中主题
			choosetheme(index, color) {
				const _this = this;
				this.theme_index = index;
				this.http.setPageTheme({id: this.page_theme.id, 'page_theme': color}).then(res => {
					if(res == 1) {
						this.$message({
							message: '页面主题设置成功',
							type: 'success'
						})
						_this.$emit('updatePageTheme');
					}
					else {
						this.$message({
							message: '页面主题设置失败',
							type: 'error'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.theme-panel {
	width: 400px;
	height: 70vh;
	background-color: #fefefe;
	padding: 10px;
	color: #888;
	box-shadow: 0 0 10px #ccc;
	z-index: 999;
	
	.title {
		text-align: center;
		font-weight: 600;
		margin-bottom: 15px;
		color: #aaa;
	}
	
	.theme {
		height: 100%;
		margin-top: 20px;
		
		.category {
			display: flex;
			flex-wrap: wrap;
			
			.cate-item {
				margin-bottom: 5px;
				border: 1px solid #eee;
				padding: 5px 10px;
				margin-right: 5px;
				border-radius: 5px;
				transition: all 0.3s;
				
				&-active {
					border: 1px solid #409EFF;
					color: #409EFF;
				}
			}
		}
		
		.theme-list {
			width: 100%;
			height: calc(100% - 160px);
			border-top: 1px solid #eee;
			margin-top: 10px;
			padding: 10px 22px;
			display: flex;
			flex-wrap: wrap;
			overflow: auto;
			
			.theme-item {
				width: 100px;
				height: 100px;
				border: 1px solid #eee;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10px;
				margin-bottom: 10px;
				transition: all 0.3s;
				
				&-active {
					position: relative;
					border: 1px solid #409EFF;
					&::before {
						content: "✔";
						position: absolute;
						right: 14px;
						bottom: 20px;
						width: 0;
						height: 0;
						z-index: 999;
						color: white;
					}
					&::after {
						content: "";
						position: absolute;
						right: 0;
						bottom: 0;
						width: 0;
						height: 0;
						border-left: 30px solid transparent;
						border-bottom: 30px solid #409EFF;
					}
				}
			}
		}
	}
}
</style>
