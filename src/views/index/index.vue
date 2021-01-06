<template>
	<div id="index" @mousedown="showStMask" @mouseup="hideStMask">
		<!-- 工具栏 -->
		<left-tool></left-tool>
		<div class="phone">
			<!-- 页面列表 -->
			<div class="page-list">
				<div class="title">页面列表</div>
				<ul>
					<li v-for="(item,index) in page_list" :key="index" @click="changePage(index, item.path)" :class="{'li-active': index==page_list_index}">{{item.name}}</li>
				</ul>
			</div>
			<!-- 模拟手机 -->
			<div class="iframe_param">
				<iframe v-if="show_iframe" name="iframe_name" ref="iframe" class="iframe" :src="iframe_url" frameborder="0"></iframe>
				<div class="st-mask" v-show="isStMask">
					<sortable v-model="sortable_arr" :options="sortable_options" class="sortable" @add="sortableEnd"></sortable>
				</div>
				<!-- 鼠标点击的箭头 -->
				<img v-if="scroll_y" @dblclick="leftArrowDb" class="left-arrow" :style="{'top':scroll_y+'px'}" src="../../assets/icom-img/left-arrow.png" alt="">
			</div>
			<!-- 中间右侧操作栏 -->
			<phone-right-menu @refreshPhone="refreshPhone" @deleteComp="deleteComp"></phone-right-menu>
		</div>
		<!-- 菜单栏 -->
		<right-menu @save="save" :chang="rightFresh" :init_attr="init_attr"></right-menu>
		
		<!-- 提示弹框 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" style="width: 100%;">
			<span>检测到您改变了页面布局，是否保存？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisibleConfirm(0)">取 消</el-button>
				<el-button type="primary" @click="dialogVisibleConfirm(1)">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import CompList from '../../common/st-data.js'
	import LeftTool from '@/components/LeftTool.vue'
	import RightMenu from '@/components/RightMenu.vue'
	import PhoneRightMenu from '@/components/PhoneRightMenu.vue'
	
	export default {
		components: {
			LeftTool,
			RightMenu,
			PhoneRightMenu,
		},
		data() {
			return {
				sortable_arr: [],
				show_iframe: true,
				iframe_url: '',
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
				page_list: [],
				// 控制当前显示的页面列表中的样式
				page_list_index: 0,
				// 标识iframe当前页面是否改变
				is_page_change: false,
				dialogVisible: false,
				// iframe要跳转下一个页面路径
				next_page_path: '',
				// iframe要跳转下一个页面在页面列表的坐标
				next_page_index: 0,
				// 初始化 右侧 组件属性设置对象
				init_attr: false,
				// 标识鼠标点击的元素距离顶部的高度
				scroll_y: 0,
			}
		},
		mounted() {
			this.getPageList();
			window.addEventListener('message', this.acceptMessage, false);
		},
		methods: {
			// 获取页面列表
			getPageList() {
				const _this = this;
				this.$axios.get('http://thinkphp/get_data').then(res => {
					_this.changePage(0, res.data[0].path);
					_this.page_list = res.data;
				})
			},
			// 保存布局
			save(flag) {
				/**
				 * flag: 0 保存布局 1 设置属性数据
				 */
				// this.$refs.iframe.contentWindow.save();
				// window.frames['iframe_name'].save();
				let dat = {};

				if (flag == 1) {
					dat = JSON.parse(localStorage.getItem('attr_obj'));
					this.$refs.iframe.contentWindow.postMessage({
						method: 'update',
						data: dat,
					}, '*');
				} else {
					this.$refs.iframe.contentWindow.postMessage({
						method: 'layoutSave',
					}, '*');
				}
			},
			// 监听 iframe 中方法
			acceptMessage(event) {
				let dat = event.data;
				switch (dat.method) {
					case 'saveSuccess':
						this.saveSuccess();
						break;
					case 'saveFail':
						this.saveFail();
						break;
					case 'deleteSuccess':
						this.deleteSuccess();
						break;
					case 'deleteFail':
						this.deleteFail();
						break;
					case 'pageLayoutChange':
						this.pageLayoutChange(dat.data);
						break;
					case 'activeGetUnique':
						this.activeGetUnique(dat.data);
						break;
					case 'getScrollY':
						this.getScrollY(dat.data);
						break;
				}
			},
			// 保存成功回调
			saveSuccess() {
				const _this = this;
				console.log('is_page_change', this.page_list[this.page_list_index])
				if(this.is_page_change) {
					this.is_page_change = false;
					this.page_list_index = this.next_page_index;
					setTimeout(() => {
						_this.changePage(_this.next_page_index||_this.page_list_index, _this.next_page_path||_this.page_list[_this.page_list_index].path);
					}, 100)
				}
				this.$notify({
					title: '保存成功',
					type: 'success',
				})
				this.refreshPhone();
				this.hideLeftArrow();
			},
			// 保存失败回调
			saveFail() {
				console.log('保存失败')
				this.refreshPhone();
				this.$notify({
					title: '保存失败',
					type: 'error',
				})
				this.hideLeftArrow();
			},
			// 删除组件成功回调
			deleteSuccess() {
				// this.refreshPhone();
				this.$notify({
					title: '删除成功',
					type: 'success',
				})
				this.hideLeftArrow();
			},
			// 删除组件失败回调
			deleteFail() {
				// this.refreshPhone();
				this.$notify({
					title: '删除失败',
					type: 'error',
				})
				this.hideLeftArrow();
			},
			// 监听 iframe 页面布局改变
			pageLayoutChange(data) {
				// console.log('布局改变: ', data)
				this.is_page_change = data.flag;
				this.hideLeftArrow();
			},
			// 刷新页面
			refreshPhone() {
				console.log('重新加载页面')
				const _this = this;
				_this.show_iframe = false;
				_this.initRightAttr();
				setTimeout(() => {
					_this.show_iframe = true;
				}, 10)
				this.hideLeftArrow();
			},
			// 显示遮罩
			showStMask() {
				this.isStMask = true;
			},
			// 隐藏遮罩
			hideStMask() {
				this.isStMask = false;
			},
			// 监听组件被拉入 iframe 中
			sortableEnd(evt) {
				let data_sorts = evt.clone.dataset.sorts;
				let attr_obj = {};
				// let attr_obj = JSON.parse(localStorage.getItem('attr_obj'));
				// console.log(evt)
				for(let k in CompList)
				{
					if(CompList[k].sorts == data_sorts) {
						attr_obj = CompList[k];
						break;
					}
				}
				// console.log(attr_obj)
				// 让组件移动到 iframe 上之后隐藏
				evt.item.style.width = 0;
				evt.item.style.height = 0;
				evt.item.style.overflow = 'hidden';
				// 让组件移动到 iframe 上之后隐藏 end
				this.isStMask = false;
				// this.rightFresh = !this.rightFresh;
				this.is_page_change = true;
				this.$refs.iframe.contentWindow.postMessage({
					method: 'add-st',
					data: {
						attr_obj,
					}
				}, '*');
				this.hideLeftArrow();
			},
			// 切换页面
			changePage(index, url) {
				if(this.is_page_change) {
					this.dialogVisible = true;
					this.next_page_index = index;
					this.next_page_path = url;
					return;
				}
				this.initRightAttr();
				this.page_list_index = index;
				this.iframe_url = url;
				this.next_page_index = '';
				this.next_page_path = '';
				this.hideLeftArrow();
			},
			// 弹框确定取消按钮
			dialogVisibleConfirm(flag) {
				// flag: 1 保存布局 0 不保存
				this.dialogVisible = false;
				if(flag == 1) {
					this.save(0);
				}
				else {
					this.is_page_change = false;
					this.changePage(this.next_page_index, this.next_page_path);
				}
			},
			// 鼠标点击 iframe 中组件获取该组件的 unique
			activeGetUnique(data) {
				// console.log('fu:', data);
				let item = data.item;
				localStorage.setItem('attr_obj', JSON.stringify(item));
				this.rightFresh = !this.rightFresh;
				// console.log(item);
			},
			// 通过 unique 删除 iframe 组件
			deleteComp() {
				this.initRightAttr();
				this.$refs.iframe.contentWindow.postMessage({
					method: 'deleteCompUnique'
				}, '*');
				this.hideLeftArrow();
			},
			// 初始化右侧属性设置框
			initRightAttr() {
				this.init_attr = !this.init_attr;
			},
			// 接收鼠标点击的位置
			getScrollY(data) {
				this.scroll_y = data.scroll_y + 19;
			},
			// 隐藏指向鼠标点击的向左箭头
			hideLeftArrow() {
				this.scroll_y = 0;
			},
			// 双击标志的向左箭头隐藏
			leftArrowDb() {
				this.scroll_y = 0;
			},
			
		},
	}
</script>

<style lang="scss" scoped>
	#index {
		display: flex;
		justify-content: space-between;
		height: 100vh;
		width: 100%;

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

			>div {
				box-shadow: 0 0 10px #999;
			}

			.page-list {
				position: absolute;
				top: 10vh;
				left: 2px;
				width: 150px;
				height: 70vh;
				background-color: white;
				padding: 10px;
				color: #888;

				.title {
					text-align: center;
					font-weight: 600;
					margin-bottom: 15px;
				}

				ul {

					li {
						padding: 8px;
						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						cursor: pointer;
						transition: all 0.5s;
						border: 1px solid white;
						margin-bottom: 2px;

						&:hover {
							border: 1px solid rgba(64,158,255, .3);
							background-color: rgba(64,158,255, .1);
						}
					}

					.li-active {
						border: 1px solid rgba(64,158,255, .3);
						background-color: rgba(64,158,255, .1);
					}
				}
			}

			.iframe_param {
				position: relative;
				width: 416px;
				height: 738px;

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
			
			.left-arrow {
				position: absolute;
				top: 0;
				right: -50px;
				width: 50px;
				height: 50px;
				animation: ant 1.5s linear infinite;
			}
			@keyframes ant {
				0% {
					right: -50px;
				}
				25% {
					right: -53px;
				}
				50% {
					right: -55px;
				}
				75% {
					right: -53px;
				}
				100% {
					right: -50px;
				}
			}
		}
	}
</style>
