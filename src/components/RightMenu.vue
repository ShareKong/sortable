<template>
	<div class="right-menu">
		<div class="title">{{is_set_page?'页面':'属性'}}设置</div>
		<!-- 页面设置 -->
		<div class="page-set" v-if="is_set_page">
			
		</div>
		<!-- 组件属性 -->
		<div class="attributes" v-else>
			<div class="tip">{{attr_obj.name}}</div>
			<div class="tip" v-if="!is_show">暂无可设属性</div>
			<el-form v-else>
				<template v-for="(item,index) in attr_obj">
					<el-form-item label="提示内容" :key="index" v-if="index=='placeholder'">
						<el-input v-model="attr_obj.placeholder" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="按钮文字" :key="index" v-if="index=='button_text'">
						<el-input v-model="attr_obj.button_text" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="按钮类型" :key="index" v-if="index=='button_type'">
						<el-radio v-model="attr_obj.button_type" label="default">default</el-radio>
						<el-radio v-model="attr_obj.button_type" label="primary">primary</el-radio>
						<el-radio v-model="attr_obj.button_type" label="error">error</el-radio>
						<el-radio v-model="attr_obj.button_type" label="warning">warning</el-radio>
						<el-radio v-model="attr_obj.button_type" label="success">success</el-radio>
						<el-radio v-model="attr_obj.button_type" label="info">info</el-radio>
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
					<el-form-item label="按钮是否镂空" :key="index" v-if="index=='button_plain'">
						<el-radio v-model="attr_obj.button_plain" label="false">否</el-radio>
						<el-radio v-model="attr_obj.button_plain" label="true">是</el-radio>
					</el-form-item>
					<el-form-item label="默认值" :key="index" v-if="index=='value'">
						<el-input v-model="attr_obj.value" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="排列方式" :key="index" v-if="index=='direction'">
						<el-select v-model="attr_obj.direction" placeholder="请选择">
							<el-option label="水平" value="horizontal"></el-option>
							<el-option label="垂直" value="vertical"></el-option>
						</el-select>
					</el-form-item>
				</template>
				<el-button type="danger" @click="update" v-if="is_show">设置属性值</el-button>
			</el-form>
		</div>
	</div>
</template>

<script>
	// import CompList from '../common/st-data.js'
	
	export default {
		props: {
			chang: Boolean,
			init_attr: Boolean,
			is_set_page: Boolean,
		},
		data () {
			return {
				attr_obj: {},
			}
		},
		watch: {
			chang: function() {
				this.setAttr();
			},
			init_attr: function() {
				this.initAttrObj();
			},
			is_set_page(n) {
				console.log(n)
			},
		},
		computed: {
			is_show () {
				let arr_len = (Object.keys(this.attr_obj)).length;
				if(arr_len < 4) {
					return false;
				}
				else {
					for(let k in this.attr_obj)
					{
						if(k != 'sorts' && k != 'unique' && k != 'name' && k != 'level' && k != 'child' && k != 'child_id') {
							return true;
						}
					}
				}
				return false;
			}
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
		margin-bottom: 20px;
		
	}
	
	.attributes {
		// border: 1px solid #eee;
		padding: 20px 10px;
		// border-radius: 10px;
		
		.tip {
			text-align: center;
			color: #777;
			font-size: 0.8em;
			margin-bottom: 10px;
		}
	}
}
</style>