<template>
	<div class="left-tool">
		<h2 style="margin-bottom: 20px;">组件</h2>
		<sortable :group="sortable_options.group" class="sortable" :options="sortable_options" @clone="clone">
			<div data-id="st-input">输入框 1</div>
			<div data-id="st-input">输入框 2</div>
			<div data-id="st-input">输入框 3</div>
		</sortable>
		<sortable :group="sortable_options.group" class="sortable" :options="sortable_options" @clone="clone">
			<div data-id="st-botton">按钮</div>
		</sortable>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sortable_options: {
					group: {
						name: 'sort',
						pull: 'clone',
						put: false,
					},
					sort: false,
					animation: 200,
				},
				obj_input: {
					placeholder: '输入内容',
					default: '默认值',
				},
			}
		},
		methods: {
			// 成功拖动组件出去时
			clone(evt) {
				// console.log('LeftTool:', evt);
				let attr_obj = {};
				let data_id = evt.item.dataset.id;
				if(data_id == 'st-input') {
					attr_obj = {
						placeholder: '',
						default: '',
					};
				}
				else if(data_id == 'st-botton') {
					attr_obj = {
						btn_text: '',
					};
				}
				localStorage.setItem('attr_obj', JSON.stringify(attr_obj));
			}
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
				background-color: #409EFF;
				color: white;
				padding: 10px;
				cursor: pointer;
				margin-right: 10px;
				margin-bottom: 10px;
			}
		}
	}
</style>
