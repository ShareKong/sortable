<template>
	<div class="left-tool">
		<h2 class="title">组件</h2>
		<sortable :group="sortable_options.group" class="sortable scrollbar" :options="sortable_options">
			<template v-for="(item, index) in comp_list">
				<div :data-sorts="item.sorts" :key="index" class="comp" v-if="item.type.indexOf(page_type) > -1">
					<div class="img">
						<img :src="item.img_url" alt="无图片">
					</div>
					<span>{{item.name}}</span>
				</div>
			</template>
		</sortable>
		
		<!-- 添加新组件弹框 -->
		<!-- <el-dialog title="添加组件" :visible.sync="dialogVisible" width="30%" style="width: 100%;">
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
		</el-dialog> -->
	</div>
</template>

<script>
	import CompList from '../common/st-data.js'
	
	export default {
		props: {
			page_type: {
				type: String
			}
		},
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
		// watch: {
		// 	page_type() {
		// 		this.$forceUpdate();
		// 	}
		// },
		mounted() {
			this.comp_list = CompList;
		},
		methods: {
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
		width: 350px;
		flex-shrink: 0;
		height: 100%;
		margin-bottom: 50px;
		
		.title {
			margin-bottom: 30px;
			text-align: center;
			color: #777;
		}
		
			
		.sortable {
			max-height: calc(100% - 61px);
			// border: 1px solid #eee;
			display: flex;
			flex-wrap: wrap;
			align-content: flex-start;
			overflow-y: auto;
		
			>div {
				border: 1px solid #f1f1f1;
				width: 100px;
				height: 100px;
				color: #777;
				padding: 10px;
				cursor: pointer;
				transition: all 0.5s;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				&:hover {
					border: 1px solid rgba(64, 158, 255, .5);
					background-color: rgba(64, 158, 255, .1);
				}
			}
			
			.comp {
				
				.img {
					width: 30px;
					height: 20px;
					margin-bottom: 10px;
					overflow: hidden;
					text-align: center;
					
					>img {
						max-width: 100%;
						max-height: 100%;
					}
				}
				
				>span {
					display: inline-block;
					width: 100%;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
		}

		.add-comp {
			padding: 20px;
			border-radius: 10px;
			margin-bottom: 30px;
			padding-bottom: 10px;
		}
	}
</style>
