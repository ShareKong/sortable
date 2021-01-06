<template>
	<div class="left-tool">
		<h2 style="margin-bottom: 20px;">组件</h2>
		<sortable :group="sortable_options.group" class="sortable" :options="sortable_options" @clone="clone">
			<template v-for="(item, index) in comp_list">
				<div :data-sorts="item.sorts" :key="index">{{item.name}}</div>
			</template>
			
			<div class="add fixed" @click="showAddComp" title="添加新组件">
				<img src="../assets/icom-img/add.png" alt="" class="img">
			</div>
		</sortable>
		<!-- 		<sortable :group="sortable_options.group" class="sortable" :options="sortable_options" @clone="clone">
			<div data-id="st-botton">按钮</div>
		</sortable> -->
		
		<!-- 添加新组件弹框 -->
		<el-dialog title="添加组件" :visible.sync="dialogVisible" width="30%" style="width: 100%;">
			<div class="add-comp">
				<el-form :label-position="'right'" label-width="120px">
					<el-form-item label="组件名称">
						<el-input v-model="form.name" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="组件 data-sorts">
						<el-input v-model="form.sorts" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-button type="success" @click="addComp">添加</el-button>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import CompList from '../common/st-data.js'
	
	export default {
		data() {
			return {
				comp_list: [],
				sortable_options: {
					group: {
						name: 'sort',
						pull: 'clone',
						put: false,
					},
					sort: false,
					animation: 200,
					filter: '.fixed'
				},
				// 添加新组件数据
				form: {
					sorts: '',
					name: ''
				},
				dialogVisible: false,
			}
		},
		mounted() {
			this.comp_list = CompList;
		},
		methods: {
			// 成功拖动组件出去时
			clone() {
				// console.log('LeftTool:', evt);
				// let attr_obj = {};
				// let data_id = evt.item.dataset.id;
				
				// for(let k in this.comp_list)
				// {
				// 	if(this.comp_list[k].data_id == data_id) {
				// 		attr_obj = this.comp_list[k];
				// 	}
				// }
				// console.log(attr_obj);
				// localStorage.setItem('attr_obj', JSON.stringify(attr_obj));
			},
			// 显示添加组件弹框
			showAddComp() {
				this.dialogVisible = true;
			},
			// 添加新组件
			addComp() {
				if(!(this.form.sorts && this.form.name)) {
					this.$message({
						showClose: true,
						message: '请填写完整',
						type: 'warning'
					})
				}
				else {
					this.dialogVisible = false;
					this.comp_list.push(this.form);
				}
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.left-tool {

		.sortable {
			border: 1px solid #ddd;
			padding: 20px;
			border-radius: 10px;
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 30px;
			padding-bottom: 10px;

			>div {
				// background-color: #409EFF;
				border: 1px solid rgba(64, 158, 255, .5);
				background-color: rgba(64, 158, 255, .2);
				color: #777;
				padding: 10px;
				cursor: pointer;
				margin-right: 10px;
				margin-bottom: 10px;

				&:hover {
					border: 1px solid rgba(64, 158, 255, .8);
					background-color: rgba(64, 158, 255, .4);
				}
			}

			.add {
				width: 43px;
				height: 43px;
				border: none;
				background-color: transparent;
				transition: all 0.5s;

				.img {
					height: 100%;
					width: 100%;
					transform: scale(1.5);
					// &:hover {
					// 	border: none;
					// 	background-color: transparent;
					// }
				}
			}
		}

		.add-comp {
			// border: 1px solid #ddd;
			padding: 20px;
			border-radius: 10px;
			margin-bottom: 30px;
			padding-bottom: 10px;
		}
	}
</style>
