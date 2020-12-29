<template>
	<div class="left-tool">
		<h2 style="margin-bottom: 20px;">组件</h2>
		<sortable :group="sortable_options.group" class="sortable" :options="sortable_options">
			<div data-id="st-input">输入框 1</div>
			<div data-id="st-input">输入框 2</div>
			<div data-id="st-input">输入框 3</div>
		</sortable>
		<sortable :group="sortable_options.group" class="sortable" :options="sortable_options">
			<div data-id="st-botton">按钮</div>
		</sortable>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				sortable_options: {
					group: {
						name: 'sort',
						pull: 'clone',
						put: false,
					},
					sort: false,
					animation: 200,
				}
			}
		}
	}
</script>

<style lang="scss">
.left-tool {
	
	.sortable {
		border: 1px solid #67C23A;
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
