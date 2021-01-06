<template>
	<div class="right-menu">
		<div class="menu" @click="back">
			<img class="img-icon img-icon-circle" src="@/assets/icom-img/back.png" alt="" title="返回上一步">
		</div>
		<div class="menu" @click="refreshPhone">
			<img class="img-icon img-icon-circle" src="@/assets/icom-img/refresh.png" alt="" title="刷新页面">
		</div>
		<div class="menu" @click="deleteComp">
			<img class="img-icon img-icon-circle" src="@/assets/icom-img/delete.png" alt="" title="删除该组件">
		</div>
		<!-- <div class="menu" @click="addPage">
			<img class="img-icon img-icon-circle" src="@/assets/icom-img/add.png" alt="" title="添加新页面">
		</div> -->
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			// 刷新 iframe
			refreshPhone() {
				this.$emit('refreshPhone');
			},
			// 删除选中的组件
			deleteComp() {
				this.$emit('deleteComp');
			},
			// 返回上一步
			back() {
				this.$emit('backData');
			},
			// 添加新页面
			addPage() {
				
			},
			
		},
		
	}
</script>

<style lang="scss" scoped>

.right-menu {
	position: absolute;
	top: 10vh;
	right: 2px;
	width: 100px;
	height: 70vh;
	padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
	// background-color: white;
	box-shadow: none !important;

	>* {
		box-shadow: 0 0 10px #999;
		cursor: pointer;
		margin-bottom: 15px;
	}
	
	.menu {
		position: relative;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		overflow: hidden;
		transition: all 0.5s;
		&::after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background-color: #409EFF;
			opacity: 0.3;
			transition: all 0.2s;
			transform: scale(0);
			border-radius: 50%;
		}
		&:hover {
			&::after {
				transform: scale(1);
			}
		}
		
		
		.img-icon {
			width: 100%;
			height: 100%;
			&-circle {
				border-radius: 50%;
			}
		}
	}
}
</style>
