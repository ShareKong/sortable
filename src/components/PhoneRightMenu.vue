<template>
	<div class="right-menu">
		<div class="menu" @click="back">
			<el-popover trigger="hover" placement="right" content="后退一步" :close-delay="0">
				<img slot="reference" class="img-icon" src="@/assets/icom-img/back.png" alt="">
			</el-popover>
		</div>
		<div class="menu" @click="advance">
			<el-popover trigger="hover" placement="right" content="前进一步" :close-delay="0">
				<img slot="reference" class="img-icon" src="@/assets/icom-img/advance.png" alt="">
			</el-popover>
		</div>
		<div class="menu" @click="refreshPhone">
			<el-popover trigger="hover" placement="right" content="刷新页面" :close-delay="0">
				<img slot="reference" class="img-icon" src="@/assets/icom-img/refresh.png" alt="">
			</el-popover>
		</div>
		<div class="menu" @click="deleteComp">
			<el-popover trigger="hover" placement="right" content="删除该组件" :close-delay="0">
				<img slot="reference" class="img-icon" src="@/assets/icom-img/delete.png" alt="">
			</el-popover>
		</div>
		<!-- <div class="menu" @click="addPage">
			<img class="img-icon" src="@/assets/icom-img/add.png" alt="" title="添加新页面">
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
			// 后退
			back() {
				this.$emit('backData');
			},
			// 前进
			advance() {
				this.$emit('advance');
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
		width: 45px;
		height: 45px;
		transition: all 0.5s;
		
		.img-icon {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
