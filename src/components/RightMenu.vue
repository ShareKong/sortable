<!-- 
	当前是改变组件属性值，则移动端项目自动改变；
	若想要使用按钮进行设置，则去掉 设置属性值 按钮注释，并且注释 watch 和 computed 中监听组件属性值改变的方法；
	反之亦然
 -->

<template>
	<div class="right-menu">
		<div class="title">{{is_set_page?'页面':'属性'}}设置</div>
		<!-- 页面设置 -->
		<div class="page-set" v-if="is_set_page">
			<el-form label-width="80px">
				<el-form-item label="页面名称">
					<el-input v-model="page_info.page_name" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label="背景颜色">
					<div class="flex">
						<el-color-picker v-model="page_info.page_background_color" class="mr-2"></el-color-picker>
						<el-input v-model="page_info.page_background_color" placeholder="例如: #FFFFFF"></el-input>
					</div>
				</el-form-item>
				<el-form-item label="页面类型">
					<div>{{page_info.type}}</div>
				</el-form-item>
				<el-button type="success" @click="setPageInfo">保存</el-button>
			</el-form>
		</div>
		<!-- 组件属性 -->
		<div class="attributes" v-else>
			<div class="tip">{{attr_obj.name}}</div>
			<div class="tip" v-if="!is_show">暂无可设属性</div>
			<el-form v-else label-width="80px" class="form scrollbar">
				<template v-for="(item,index) in attr_obj">
					<el-form-item label="提示内容" :key="index" v-if="index=='placeholder'">
						<el-input v-model="attr_obj.placeholder" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="按钮文字" :key="index" v-if="index=='button_text'">
						<el-input v-model="attr_obj.button_text" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="主题类型" :key="index" v-if="index=='theme_type'">
						<el-radio v-model="attr_obj.theme_type" label="default">default</el-radio>
						<el-radio v-model="attr_obj.theme_type" label="primary">primary</el-radio>
						<el-radio v-model="attr_obj.theme_type" label="error">error</el-radio>
						<el-radio v-model="attr_obj.theme_type" label="warning">warning</el-radio>
						<el-radio v-model="attr_obj.theme_type" label="success">success</el-radio>
						<el-radio v-model="attr_obj.theme_type" label="info">info</el-radio>
					</el-form-item>
					<el-form-item label="按钮尺寸" :key="index" v-if="index=='button_size'">
						<el-radio v-model="attr_obj.button_size" label="default">默认</el-radio>
						<el-radio v-model="attr_obj.button_size" label="medium">中等</el-radio>
						<el-radio v-model="attr_obj.button_size" label="mini">迷你</el-radio>
					</el-form-item>
					<el-form-item label="按钮形状" :key="index" v-if="index=='button_shape'">
						<el-radio v-model="attr_obj.button_shape" label="square">直角</el-radio>
						<el-radio v-model="attr_obj.button_shape" label="circle">圆角</el-radio>
					</el-form-item>
					<el-form-item label="是否镂空" :key="index" v-if="index=='button_plain'">
						<el-radio v-model="attr_obj.button_plain" label="false">否</el-radio>
						<el-radio v-model="attr_obj.button_plain" label="true">是</el-radio>
					</el-form-item>
					<el-form-item label="默认值" :key="index" v-if="index=='default_value'">
						<el-input v-model="attr_obj.default_value" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="排列方式" :key="index" v-if="index=='direction'">
						<el-select v-model="attr_obj.direction" placeholder="请选择">
							<el-option label="水平" value="horizontal"></el-option>
							<el-option label="垂直" value="vertical"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="滚动模式" :key="index" v-if="index=='notice_scroll'">
						<el-radio v-model="attr_obj.notice_scroll" label="horizontal">水平</el-radio>
						<el-radio v-model="attr_obj.notice_scroll" label="vertical">垂直</el-radio>
					</el-form-item>
					<el-form-item label="是否衔接" :key="index" v-if="index=='notice_join'">
						<el-radio v-model="attr_obj.notice_join" label="false">否</el-radio>
						<el-radio v-model="attr_obj.notice_join" label="true">是</el-radio>
					</el-form-item>
					<!-- 商品列表 -->
					<el-form-item label="列表样式" :key="index" v-if="index=='list_type'">
						<el-radio-group v-model="attr_obj.list_type" fill="#9bcdff" size="mini">
							<el-radio-button label="list-type-1" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/list-type-1.png" alt="">
							</el-radio-button>
							<el-radio-button label="list-type-2" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/list-type-2.png" alt="">
							</el-radio-button>
							<el-radio-button label="list-type-3" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/list-type-3.png" alt="">
							</el-radio-button>
							<el-radio-button label="list-type-4" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/list-type-4.png" alt="">
							</el-radio-button>
							<el-radio-button label="list-type-5" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/list-type-5.png" alt="">
							</el-radio-button>
							<el-radio-button label="list-type-6" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/list-type-6.png" alt="">
							</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="商品样式" :key="index" v-if="index=='shop_type'">
						<el-radio-group v-model="attr_obj.shop_type" fill="#9bcdff" size="mini">
							<el-radio label="shop-type-1" border class="mb-1">无边透明底</el-radio>
							<el-radio label="shop-type-2" border class="mb-1">无边白底</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="角的样式" :key="index" v-if="index=='shop_shape'">
						<el-radio-group v-model="attr_obj.shop_shape" fill="#9bcdff" size="mini">
							<el-radio-button label="square" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/square.png" alt="">
							</el-radio-button>
							<el-radio-button label="circle" border>
								<img class="icon-shop-list" src="../assets/icon-right-menu/circle.png" alt="">
							</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="商品名称" :key="index" v-if="index=='is_show_title'">
						<el-switch v-model="attr_obj.is_show_title"></el-switch>
						<small class="tip">是否显示商品名称</small>
					</el-form-item>
					<el-form-item label="商品描述" :key="index" v-if="index=='is_show_description'">
						<el-switch v-model="attr_obj.is_show_description"></el-switch>
						<small class="tip">是否显示商品描述</small>
					</el-form-item>
					<el-form-item label="商品价格" :key="index" v-if="index=='is_show_price'">
						<el-switch v-model="attr_obj.is_show_price"></el-switch>
						<small class="tip">是否显示商品价格</small>
					</el-form-item>
					<el-form-item label="按钮颜色" :key="index" v-if="index=='button_type'">
						<el-radio v-model="attr_obj.button_type" label="default">default</el-radio>
						<el-radio v-model="attr_obj.button_type" label="primary">primary</el-radio>
						<el-radio v-model="attr_obj.button_type" label="error">error</el-radio>
						<el-radio v-model="attr_obj.button_type" label="warning">warning</el-radio>
						<el-radio v-model="attr_obj.button_type" label="success">success</el-radio>
						<el-radio v-model="attr_obj.button_type" label="info">info</el-radio>
					</el-form-item>
					<!-- 商品列表 end -->
					
				</template>
				<!-- <el-button type="danger" @click="update" v-if="is_show">设置属性值</el-button> -->
			</el-form>
		</div>
	</div>
</template>

<script>
	// import CompList from '../common/st-data.js'
	import publicList from '../common/st-component-public.js'
	
	export default {
		props: {
			chang: Boolean,
			init_attr: Boolean,
			is_set_page: Boolean,
			page_item: Object,
		},
		data () {
			return {
				// 组件属性
				attr_obj: {},
				// 页面类型
				type_list: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
				// 页面信息
				page_info: {},
			}
		},
		watch: {
			chang: function() {
				this.setAttr();
			},
			init_attr: function() {
				this.initAttrObj();
			},
			// 监听组件属性值改变
			is_comp_page(n, o) {
				let old_data = JSON.stringify(o);
				let new_data = JSON.stringify(n);
				// 以下情况不会更新组件属性到 iframe 中：
				// 第一次点击组件时
				// 本次选中的组件和上次选中的组件 unique 不一样时
				// 组件属性没有发生改变时
				if(o.unique && n.unique == o.unique && old_data != new_data)  {
					// 更新组件属性值
					this.update();
				}
			},
			page_item(n) {
				this.page_info = n;
			},
			
		},
		computed: {
			// 判断组件是否有可设属性
			is_show () {
				let arr_len = (Object.keys(this.attr_obj)).length;
				if(arr_len <= publicList.attr_len) {
					return false;
				}
				else {
					for(let k in this.attr_obj)
					{
						if(publicList.public_list.indexOf(k) == -1) {
							return true;
						}
					}
				}
				return false;
			},
			// 监听组件属性值改变
			is_comp_page() {
				let attr_obj = {};
				for(let k in this.attr_obj)
				{
					attr_obj[k] = this.attr_obj[k];
				}
				return attr_obj;
			},
			
		},
		methods: {
			// 设置引入组件的属性
			setAttr() {
				let attr_obj = JSON.parse(localStorage.getItem('attr_obj'));
				this.attr_obj = attr_obj;
				// console.log(attr_obj)
				
				// for(let k in CompList)
				// {
				// 	if(CompList[k].sorts == attr_obj.sorts) {
				// 		this.attr_obj = CompList[k];
				// 	}
				// }
				// 将 unique 放到属性中
				// this.attr_obj.unique = attr_obj.unique;
			},
			// 更新数据
			update() {
				// console.log(this.attr_obj)
				localStorage.setItem('attr_obj', JSON.stringify(this.attr_obj));
				this.$emit('save', 1);
			},
			// 初始化组件属性设置对象
			initAttrObj() {
				this.attr_obj = {};
			},
			// 页面设置信息
			setPageInfo() {
				// console.log(this.page_info)
				this.http.setPageInfo(this.page_info).then(res => {
					if(res == 1) {
						this.$message({
							message: '页面信息设置成功',
							type: 'success'
						})
						this.$emit('setPageSuccess');
					}
					else {
						this.$message({
							message: '页面信息设置失败',
							type: 'error'
						})
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped="scoped">
.right-menu {
	width: 100%;
	position: relative;
	
	.title {
		text-align: center;
		color: #888;
		// margin-bottom: 20px;
	}
	
	.page-set {
		padding: 20px 10px;
	}
	
	.attributes {
		// border: 1px solid #9bcdff;
		padding: 20px 10px;
		// border-radius: 10px;
		
		.tip {
			text-align: center;
			color: #777;
			font-size: 0.8em;
			margin-bottom: 10px;
		}
		
		.form {
			padding-top: 10px;
			max-height: calc(100vh - 200px);
			overflow-y: auto;
		}
		
		.icon-shop-list {
			width: 20px;
			max-height: 100%;
		}
	}
}

.flex {
	display: flex;
}
.mr-2 {
	margin-right: 20px;
}
.mb-1 {
	margin-bottom: 10px;
}
small.tip {
	margin: 0 5px;
	color: #aaa;
}
</style>