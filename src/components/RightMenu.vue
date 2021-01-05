<template>
	<div class="right-menu">
		<div class="title">属性设置</div>
		<!-- 组件属性 -->
		<div class="attributes">
			<div class="tip">{{attr_obj.name}}</div>
			<div class="tip" v-if="(Object.keys(attr_obj)).length <= 3">暂无可设属性</div>
			<el-form v-else>
				<template v-for="(item,index) in attr_obj">
					<el-form-item label="提示内容" :key="index" v-if="index=='placeholder'">
						<el-input v-model="attr_obj.placeholder" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="按钮文字" :key="index" v-if="index=='button_text'">
						<el-input v-model="attr_obj.button_text" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="文字颜色" :key="index" v-if="index=='text_color'">
						<el-color-picker v-model="attr_obj.text_color"></el-color-picker>
					</el-form-item>
					<el-form-item label="背景颜色" :key="index" v-if="index=='background_color'">
						<el-color-picker v-model="attr_obj.background_color"></el-color-picker>
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
				<el-button type="danger" @click="update">设置属性值</el-button>
			</el-form>
		</div>
		<el-button @click="save" type="primary" class="save">保存布局</el-button>
	</div>
</template>

<script>
	// import CompList from '../common/st-data.js'
	
	export default {
		props: {
			chang: Boolean,
			init_attr: Boolean,
		},
		data () {
			return {
				attr_obj: {},
				is_show: false,
			}
		},
		watch: {
			chang: function() {
				// console.log('chang:', n, o);
				this.setAttr();
			},
			init_attr: function() {
				this.initAttrObj();
			},
		},
		methods: {
			save() {
				this.$emit('save');
			},
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
		border: 1px solid #eee;
		padding: 20px 10px;
		border-radius: 10px;
		
		.tip {
			text-align: center;
			color: #777;
			font-size: 0.8em;
			margin-bottom: 10px;
		}
	}
}

.save {
	position: absolute;
	width: 90%;
	bottom: 20px;
	left: 5%;
}

</style>