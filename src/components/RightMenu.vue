<template>
	<div class="right-menu">
		<div class="title">属性设置</div>
		<!-- 组件属性 -->
		<div class="attributes">
			<div class="tip" v-if="!(Object.keys(attr_obj)).length">暂无可设属性</div>
			<el-form v-else>
				<template v-for="(item,index) in attr_obj">
					<el-form-item label="提示内容" :key="index" v-if="index=='placeholder'">
						<el-input v-model="attr_obj.placeholder" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="按钮文字" :key="index" v-if="index=='btn_text'">
						<el-input v-model="attr_obj.btn_text" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="默认值" :key="index" v-if="index=='default'">
						<el-input v-model="attr_obj.default" placeholder="请输入内容"></el-input>
					</el-form-item>
				</template>
				<el-button type="danger" @click="update">更新属性值</el-button>
			</el-form>
		</div>
		<el-button @click="save" type="primary" class="save">保存布局</el-button>
	</div>
</template>

<script>
	export default {
		props: {
			chang: Boolean,
			init_attr: Boolean,
		},
		data () {
			return {
				attr_obj: {},
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