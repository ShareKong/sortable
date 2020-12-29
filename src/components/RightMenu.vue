<template>
	<div class="right-menu">
		<el-button @click="save" type="primary" class="save">保存布局</el-button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		methods: {
			save() {
				this.$emit('save');
			}
		}
	}
</script>

<style lang="scss">
.right-menu {
	width: 100%;
	position: relative;
}

.save {
	position: absolute;
	width: 90%;
	bottom: 20px;
	left: 5%;
}

</style>