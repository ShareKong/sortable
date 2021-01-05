
const list = [
	// 输入框
	{
		sorts: 'st-input',
		name: '输入框',
		// 提示内容
		placeholder: '',
		// 默认值
		value: '',
	},
	// 按钮
	{
		sorts: 'st-button',
		name: '按钮',
		// 按钮文字
		button_text: '',
		// 字体颜色
		text_color: '',
		// 背景颜色
		background_color: '',
	},
	// banner
	{
		sorts: 'st-swiper',
		name: 'Banner',
	},
	// 搜索框
	{
		sorts: 'st-search',
		name: '搜索框',
	},
	// 表单
	{
		sorts: 'st-form',
		name: 'Form 表单',
		// 导入的时候，系统会自动生成新的且唯一的 id
		child_id: -1,
		child: [
			// 子 sortable 盒子
		]
	},
	// 应用列表
	{
		sorts: 'st-applys',
		name: '应用列表',
		// 排版方式
		direction: 'horizontal'
	},
]

export default list