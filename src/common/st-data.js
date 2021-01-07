/**
 * child_id 默认值都设为 -1
 */

/**
 * 当前默认组件：
{
	sorts:
	name:
	img_url: // 为组件的图片，后期换成图标
	type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
}
 */

let list = [
	// 输入框
	{
		sorts: 'st-input',
		name: '输入框',
		// 提示内容
		placeholder: '',
		// 默认值
		value: '',
		img_url: require('@/assets/icon-component/st-input.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
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
		img_url: require('@/assets/icon-component/st-button.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
	},
	// banner
	{
		sorts: 'st-swiper',
		name: 'Banner',
		img_url: require('@/assets/icon-component/st-swiper.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
	},
	// 搜索框
	{
		sorts: 'st-search',
		name: '搜索框',
		img_url: require('@/assets/icon-component/st-search.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
	},
	// 表单
	{
		sorts: 'st-form',
		name: 'Form 表单',
		// 导入的时候，系统会自动生成新的且唯一的 id
		child_id: -1,
		level: 2,
		img_url: require('@/assets/icon-component/st-form.png'),
		type: ['index', 'article_list', 'pic_list', 'us'],
		child: [
			// 子 sortable 盒子
			{
				"sorts": 1,
				"disable": false
			},
			{
				"sorts": 2,
				"disable": false
			},
			{
				"sorts": 3,
				"disable": false
			},
			{
				"sorts": 4,
				"disable": false
			},
			{
				"sorts": 5,
				"disable": false
			},
			{
				"sorts": 6,
				"disable": false
			}
		]
	},
	// 应用列表
	{
		sorts: 'st-applys',
		name: '应用列表',
		// 排版方式
		direction: 'horizontal',
		img_url: require('@/assets/icon-component/st-applys.png'),
		type: ['index', 'cover', 'article', 'article_list', 'pic_list', 'us'],
	},
]

// 测试的组件
let test = [
	{
		sorts: 'st-t1',
		name: '测-cover1',
		type: ['cover'],
	},
	{
		sorts: 'st-t2',
		name: '测-cover2',
		type: ['cover'],
	},
	{
		sorts: 'st-t3',
		name: '测-index1',
		type: ['index'],
	},
	{
		sorts: 'st-t4',
		name: '测-index2',
		type: ['index'],
	},
	{
		sorts: 'st-t5',
		name: '测-ale1',
		type: ['article'],
	},
	{
		sorts: 'st-t6',
		name: '测-ale2',
		type: ['article'],
	},
	{
		sorts: 'st-t7',
		name: '测-ale_t1',
		type: ['article_list'],
	},
	{
		sorts: 'st-t8',
		name: '测-ale_t2',
		type: ['article_list'],
	},
	{
		sorts: 'st-t9',
		name: '测-pic_t1',
		type: ['pic_list'],
	},
	{
		sorts: 'st-t10',
		name: '测-pic_t2',
		type: ['pic_list'],
	},
	{
		sorts: 'st-t11',
		name: '测-us1',
		type: ['us'],
	},
	{
		sorts: 'st-t12',
		name: '测-us2',
		type: ['us'],
	},
	{
		sorts: 'st-t13',
		name: '测-ind/co',
		type: ['index', 'cover'],
	},
	{
		sorts: 'st-t14',
		name: '测-pic/ale',
		type: ['pic_list', 'article'],
	},
	{
		sorts: 'st-t15',
		name: '测-co/ale_t',
		type: ['cover', 'article_list'],
	},
	{
		sorts: 'st-t16',
		name: '测-us/ind',
		type: ['us', 'index'],
	}
]
list = list.concat(test);
// 测试的组件 end

export default list