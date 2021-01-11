<template>
	<div class="page-list">
		<div class="title">页面列表</div>
		<ul class="scrollbar">
			<li v-for="(item,index) in page_list" :key="index" @click="changePage(index, item.path, item.type)" :class="{'li-active': index==page_list_index}">{{item.name}}</li>
			
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			page_list: {
				type: Array
			},
			page_list_index: {
				type: Number
			}
		},
		data () {
			return {}
		},
		methods: {
			changePage(index, url, type) {
				this.$emit('changePage', index, url, type)
			},
		}
	}
</script>

<style lang="scss" scoped>
.page-list {
	position: absolute;
	top: 10vh;
	left: 2px;
	width: 200px;
	height: 70vh;
	background-color: #fefefe;
	padding: 10px;
	color: #888;
	box-shadow: 0 0 7px #ccc;

	.title {
		text-align: center;
		font-weight: 600;
		margin-bottom: 15px;
		color: #aaa;
	}

	ul {
		// 34px 是标题的高度
		height: calc(100% - 34px);
		overflow-y: auto;

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
</style>
