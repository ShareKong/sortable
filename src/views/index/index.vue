<template>
	<div id="index" @mousedown="showStMask" @mouseup="hideStMask">
		<!-- 工具栏 -->
		<left-tool></left-tool>
		<div class="phone">
			<div class="iframe_param">
				<iframe v-if="show_iframe" name="iframe_name" ref="iframe" class="iframe" :src="iframe_url" frameborder="0"></iframe>
				<!-- <div id="iframe" class="iframe" style="width: 413px; height: 736px;"></div> -->
				<div class="st-mask" v-show="isStMask">
					<sortable v-model="sortable_arr" :options="sortable_options" class="sortable" @add="sortableEnd"></sortable>
				</div>
			</div>
		</div>
		<!-- 菜单栏 -->
		<right-menu @save="save" :chang="rightFresh"></right-menu>
	</div>
</template>

<script>
	import LeftTool from '@/components/LeftTool.vue'
	import RightMenu from '@/components/RightMenu.vue'
	
	export default {
		components: {
			LeftTool,
			RightMenu,
		},
		data () {
			return {
				sortable_arr: [],
				show_iframe: true,
				iframe_url: 'http://localhost:8081/#/',
				isStMask: false,
				sortable_options: {
					group: {
						name: 'sort',
						pull: true,
					},
					sort: false,
					animation: 200,
				},
				// 控制菜单栏刷新
				rightFresh: true,
			}
		},
		created() {
			
		},
		mounted() {
			window.addEventListener('message', this.acceptMessage, false);
		},
		methods: {
			// 保存布局
			save(flag) {
				/**
				 * flag: 0 保存布局 1 设置属性数据
				 */
				// this.$refs.iframe.contentWindow.save();
				// window.frames['iframe_name'].save();
				let dat = {};
				
				if(flag == 1) {
					dat = JSON.parse(localStorage.getItem('attr_obj'));
					this.$refs.iframe.contentWindow.postMessage({
						method: 'update',
						data: dat,
					}, '*');
				}
				else {
					this.$refs.iframe.contentWindow.postMessage({
						method: 'layoutSave',
					}, '*');
				}
			},
			// 接受 iframe 中方法
			acceptMessage(event) {
				let dat = event.data;
				switch(dat.method)
				{
					case 'saveSuccess':
						this.saveSuccess();
						break;
					case 'deleteSuccess':
						this.deleteSuccess();
						break;
				}
			},
			// 保存成功回调
			saveSuccess() {
				const _this = this;
				_this.show_iframe = false,
				setTimeout(() => {
					_this.show_iframe = true;
				}, 10)
				this.$notify({
					title: '保存成功',
					type: 'success',
				})
			},
			// 删除组件成功回调
			deleteSuccess() {
				const _this = this;
				_this.show_iframe = false,
				setTimeout(() => {
					_this.show_iframe = true;
				}, 10)
				this.$notify({
					title: '删除成功',
					type: 'success',
				})
			},
			showStMask() {
				this.isStMask = true;
			},
			hideStMask() {
				this.isStMask = false;
			},
			sortableEnd(evt) {
				let data_id = evt.clone.dataset.id;
				let attr_obj = JSON.parse(localStorage.getItem('attr_obj'));
				// console.log(evt)
				evt.item.style.width = 0;
				evt.item.style.height = 0;
				evt.item.style.overflow = 'hidden';
				this.isStMask = false;
				this.rightFresh = !this.rightFresh;
				this.$refs.iframe.contentWindow.postMessage({
					method: 'add-st',
					data: {
						data_id,
						attr_obj,
					}
				}, '*');
			}
		},
	}
</script>

<style lang="scss" scoped>

#index {
	display: flex;
	justify-content: space-between;
	height: 100vh;
	
	>div {
		padding: 20px;
		&:not(phone) {
			width: 35%;
		}
	}
	
	.phone {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #ddd;
		box-shadow: 0 0 10px #999 inset;
		display: flex;
		justify-content: center;
		
		.iframe_param {
			position: relative;
			width: 416px;
			height: 738px;
			box-shadow: 0 0 10px #aaa;
			
			.iframe {
				width: 100%;
				height: 100%;
			}
			
			.st-mask {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				
				.sortable {
					width: 100%;
					height: 100%;
					
					* {
						width: 0;
						height: 0;
						overflow: hidden;
						color: red;
					}
				}
			}
		}		
	}	
}
</style>
