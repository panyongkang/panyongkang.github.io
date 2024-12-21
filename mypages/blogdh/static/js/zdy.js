// 节日主题切换
if (localStorage.getItem('themespring') === '1') {
	document.body.classList.add('themespring');
} else if (matchMedia('(prefers-color-scheme: themespring)').matches) {
	document.body.classList.add('themespring');
}

function switchThemes() {
	var body = document.body;
	if (body.classList.contains('themespring')) {
		document.body.classList.remove('themespring');
		localStorage.setItem('themespring', '0');
		return;
	} else {
		document.body.classList.add('themespring');
		localStorage.setItem('themespring', '1');
		return;
	}
};

// 自由拖拽效果
var sortableLists = document.querySelectorAll('.sortable-list');
sortableLists.forEach(function (sortableList) {
	var sortable = Sortable.create(sortableList, {
		animation: 150,
		handle: '.sortable-item',
		draggable: '.sortable-item',
		onEnd: function (evt) {
			// 获取排序后的列表项
			var items = Array.from(sortableList.children);
			// 创建一个新的文档片段
			var fragment = document.createDocumentFragment();
			// 将排序后的列表项添加到文档片段中
			items.forEach(function (item) {
				fragment.appendChild(item);
			});
			// 清空原有的列表项
			sortableList.innerHTML = '';
			// 将文档片段添加回原来的位置
			sortableList.appendChild(fragment);
		},
	});
});

// 展开收起效果
function toggleList() {
	var listdhsl = document.querySelector('.ZS_box');
	var expandIcon = document.querySelector('.expand-icon');

	listdhsl.classList.toggle('closed');
	expandIcon.textContent = listdhsl.classList.contains('closed') ? '展开➹' : '收起➷';
}