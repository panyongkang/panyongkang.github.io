// 自动创建悬浮层容器
document.addEventListener('DOMContentLoaded', () => {
    let selectionPopup = document.getElementById('selectionPopup');
    if (!selectionPopup) {
        selectionPopup = document.createElement('div');
        selectionPopup.id = 'selectionPopup';

        // 建议默认给它加上隐藏样式，避免刚生成时影响页面布局
        selectionPopup.style.display = 'none';

        // 直接塞进 body 的最后面
        document.body.appendChild(selectionPopup);
    }

    // 搜索引擎数据
    const searchEngines = [
        {
            "name": "抖音",
            "url": "https://www.douyin.com/search/",
            "icon": "https://www.douyin.com/favicon.ico"
        },
        {
            "name": "快手",
            "url": "https://www.kuaishou.com/search/video?searchKey=",
            "icon": "https://www.kuaishou.com/favicon.ico"
        },
        {
            icon: 'https://www.n.cn/favicon.ico',
            name: '纳米AI搜索',
            url: 'https://www.n.cn/search?q='
        },
        {
            icon: 'https://www.bing.com/favicon.ico',
            name: 'Bing',
            url: 'https://www.bing.com/search?q='
        },
        {
            icon: 'https://static.zhihu.com/heifetz/favicon.ico',
            name: '知乎',
            url: 'https://www.zhihu.com/search?q='
        },
        {
            icon: 'https://www.baidu.com/favicon.ico',
            name: '百度',
            url: 'https://www.baidu.com/s?wd='
        },
        {
            icon: 'data:image/x-icon;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///zD9/f2W/f392P39/fn9/f35/f391/39/ZT+/v4uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Cf39/Zn///////////////////////////////////////////39/ZX///8IAAAAAAAAAAAAAAAA/v7+Cf39/cH/////+v35/7TZp/92ul3/WKs6/1iqOv9yuFn/rNWd//j79v///////f39v////wgAAAAAAAAAAP39/Zn/////7PXp/3G3WP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP+Or1j//vDo///////9/f2VAAAAAP///zD/////+vz5/3G3V/9TqDT/WKo6/6LQkf/U6cz/1urO/6rUm/+Zo0r/8IZB//adZ////v7///////7+/i79/f2Y/////4nWzf9Lqkj/Vqo4/9Xqzv///////////////////////ebY//SHRv/0hUL//NjD///////9/f2U/f392v////8sxPH/Ebzt/43RsP/////////////////////////////////4roL/9IVC//i1jf///////f391/39/fr/////Cr37/wW8+/+16/7/////////////////9IVC//SFQv/0hUL/9IVC//SFQv/3pnX///////39/fn9/f36/////wu++/8FvPv/tuz+//////////////////SFQv/0hUL/9IVC//SFQv/0hUL/96p7///////9/f35/f392/////81yfz/CrL5/2uk9v///////////////////////////////////////////////////////f392P39/Zn/////ks/7/zdS7P84Rur/0NT6///////////////////////9/f////////////////////////39/Zb+/v4y//////n5/v9WYu3/NUPq/ztJ6/+VnPT/z9L6/9HU+v+WnfT/Ul7t/+Hj/P////////////////////8wAAAAAP39/Z3/////6Or9/1hj7v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9sdvD////////////9/f2YAAAAAAAAAAD///8K/f39w//////5+f7/paz2/11p7v88Suv/Okfq/1pm7v+iqfX/+fn+///////9/f3B/v7+CQAAAAAAAAAAAAAAAP///wr9/f2d///////////////////////////////////////////9/f2Z/v7+CQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f2Z/f392/39/fr9/f36/f392v39/Zj///8wAAAAAAAAAAAAAAAAAAAAAPAPAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAACAAQAAwAMAAPAPAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/g3+/v5X/f39mf39/cj9/f3q/f39+f39/fn9/f3q/f39yP39/Zn+/v5W////DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f2c/f399f/////////////////////////////////////////////////////9/f31/f39mv7+/iMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/gn9/f2K/f39+////////////////////////////////////////////////////////////////////////////f39+v39/Yf///8IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4k/f390v////////////////////////////////////////////////////////////////////////////////////////////////39/dD///8iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////MP39/er//////////////////////////+r05v+v16H/gsBs/2WxSf9Wqjj/Vqk3/2OwRv99vWX/pdKV/97u2P////////////////////////////39/ej+/v4vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f3q/////////////////////+v15/+Pxnv/VKk2/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/36+Z//d7tf///////////////////////39/ej///8iAAAAAAAAAAAAAAAAAAAAAAAAAAD///8K/f390//////////////////////E4bn/XKw+/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1apN/+x0pv///////////////////////39/dD///8IAAAAAAAAAAAAAAAAAAAAAP39/Yv/////////////////////sdij/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/YKU1/8qOPv/5wZ////////////////////////39/YcAAAAAAAAAAAAAAAD+/v4l/f39+////////////////8Lgt/9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9utlT/n86N/7faqv+426v/pdKV/3u8ZP9UqDX/U6g0/3egN//jiUH/9IVC//SFQv/82MP//////////////////f39+v7+/iMAAAAAAAAAAP39/Z3////////////////q9Ob/W6w+/1OoNP9TqDT/U6g0/1OoNP9nskz/zOXC/////////////////////////////////+Dv2v+osWP/8YVC//SFQv/0hUL/9IVC//WQVP/++fb//////////////////f39mgAAAAD+/v4O/f399v///////////////4LHj/9TqDT/U6g0/1OoNP9TqDT/dblc//L58P/////////////////////////////////////////////8+v/3p3f/9IVC//SFQv/0hUL/9IVC//rIqf/////////////////9/f31////DP7+/ln////////////////f9v7/Cbz2/zOwhv9TqDT/U6g0/2KwRv/v9+z///////////////////////////////////////////////////////738//1kFT/9IVC//SFQv/0hUL/9plg///////////////////////+/v5W/f39nP///////////////4jf/f8FvPv/Bbz7/yG1s/9QqDz/vN2w//////////////////////////////////////////////////////////////////rHqP/0hUL/9IVC//SFQv/0hUL//vDn//////////////////39/Zn9/f3L////////////////R878/wW8+/8FvPv/Bbz7/y7C5P/7/fr//////////////////////////////////////////////////////////////////ere//SFQv/0hUL/9IVC//SFQv/718H//////////////////f39yP39/ez///////////////8cwvv/Bbz7/wW8+/8FvPv/WNL8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rIqv/////////////////9/f3q/f39+v///////////////we9+/8FvPv/Bbz7/wW8+/993P3///////////////////////////////////////SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+cGf//////////////////39/fn9/f36////////////////B737/wW8+/8FvPv/Bbz7/33c/f//////////////////////////////////////9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/6xaX//////////////////f39+f39/e3///////////////8cwvv/Bbz7/wW8+/8FvPv/WdP8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//vVv//////////////////9/f3q/f39y////////////////0bN/P8FvPv/Bbz7/wW8+/8hrvn/+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////39/cj9/f2c////////////////ht/9/wW8+/8FvPv/FZP1/zRJ6/+zuPf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////f39mf7+/lr////////////////d9v7/B7n7/yB38f81Q+r/NUPq/0hV7P/u8P3////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v5X////D/39/ff///////////////9tkPT/NUPq/zVD6v81Q+r/NUPq/2Fs7//y8v7////////////////////////////////////////////09f7//////////////////////////////////////////////////f399f7+/g0AAAAA/f39n////////////////+Tm/P89Suv/NUPq/zVD6v81Q+r/NUPq/1Bc7f/IzPn/////////////////////////////////x8v5/0xY7P+MlPP////////////////////////////////////////////9/f2cAAAAAAAAAAD+/v4n/f39/P///////////////7W69/81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9ZZe7/k5v0/6609/+vtff/lJv0/1pm7v81Q+r/NUPq/zVD6v+GjvL//v7//////////////////////////////f39+/7+/iQAAAAAAAAAAAAAAAD9/f2N/////////////////////6Cn9f81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v+BivL////////////////////////////9/f2KAAAAAAAAAAAAAAAAAAAAAP7+/gv9/f3V/////////////////////7W69/8+S+v/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/P0zr/7q/+P///////////////////////f390v7+/gkAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3r/////////////////////+Xn/P94gfH/NkTq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NkTq/3Z/8f/l5/z///////////////////////39/er+/v4kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f3r///////////////////////////k5vz/nqX1/2p08P9IVez/OEbq/zdF6v9GU+z/aHLv/5qh9f/i5Pz////////////////////////////9/f3q////MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3V/////////////////////////////////////////////////////////////////////////////////////////////////f390v7+/iQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wr9/f2N/f39/P///////////////////////////////////////////////////////////////////////////f39+/39/Yv+/v4JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4n/f39n/39/ff//////////////////////////////////////////////////////f399v39/Z3+/v4lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Dv7+/lr9/f2c/f39y/39/e39/f36/f39+v39/ez9/f3L/f39nP7+/ln+/v4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AA///AAD//AAAP/gAAB/wAAAP4AAAB8AAAAPAAAADgAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAAcAAAAPAAAAD4AAAB/AAAA/4AAAf/AAAP/8AAP//wAP/',
            name: 'Google',
            url: 'https://www.google.com/search?q='
        },
        {
            icon: 'data:image/x-icon;base64,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',
            name: 'DuckDuckGo',
            url: 'https://duckduckgo.com/?q='
        },
        {
            icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNiAwQzcuMTYgMCAwIDcuMTYgMCAxNkMwIDIzLjA4IDQuNTggMjkuMDYgMTAuOTQgMzEuMThDMTEuNzQgMzEuMzIgMTIuMDQgMzAuODQgMTIuMDQgMzAuNDJDMTIuMDQgMzAuMDQgMTIuMDIgMjguNzggMTIuMDIgMjcuNDRDOCAyOC4xOCA2Ljk2IDI2LjQ2IDYuNjQgMjUuNTZDNi40NiAyNS4xIDUuNjggMjMuNjggNSAyMy4zQzQuNDQgMjMgMy42NCAyMi4yNiA0Ljk4IDIyLjI0QzYuMjQgMjIuMjIgNy4xNCAyMy40IDcuNDQgMjMuODhDOC44OCAyNi4zIDExLjE4IDI1LjYyIDEyLjEgMjUuMkMxMi4yNCAyNC4xNiAxMi42NiAyMy40NiAxMy4xMiAyMy4wNkM5LjU2IDIyLjY2IDUuODQgMjEuMjggNS44NCAxNS4xNkM1Ljg0IDEzLjQyIDYuNDYgMTEuOTggNy40OCAxMC44NkM3LjMyIDEwLjQ2IDYuNzYgOC44MiA3LjY0IDYuNjJDNy42NCA2LjYyIDguOTggNi4yIDEyLjA0IDguMjZDMTMuMzIgNy45IDE0LjY4IDcuNzIgMTYuMDQgNy43MkMxNy40IDcuNzIgMTguNzYgNy45IDIwLjA0IDguMjZDMjMuMSA2LjE4IDI0LjQ0IDYuNjIgMjQuNDQgNi42MkMyNS4zMiA4LjgyIDI0Ljc2IDEwLjQ2IDI0LjYgMTAuODZDMjUuNjIgMTEuOTggMjYuMjQgMTMuNCAyNi4yNCAxNS4xNkMyNi4yNCAyMS4zIDIyLjUgMjIuNjYgMTguOTQgMjMuMDZDMTkuNTIgMjMuNTYgMjAuMDIgMjQuNTIgMjAuMDIgMjYuMDJDMjAuMDIgMjguMTYgMjAgMjkuODggMjAgMzAuNDJDMjAgMzAuODQgMjAuMyAzMS4zNCAyMS4xIDMxLjE4QzI3LjQyIDI5LjA2IDMyIDIzLjA2IDMyIDE2QzMyIDcuMTYgMjQuODQgMCAxNiAwVjBaIiBmaWxsPSIjMjQyOTJFIi8+Cjwvc3ZnPgo=',
            name: 'GitHub',
            url: 'https://github.com/search?q='
        },
        {
            icon: 'data:image/x-icon;base64,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/wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKI7g8kgPTvJID0/ySA89sggO8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKA9TQkgPPII4DzLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////wAAD/8AAA//P//P/z//z/8wAM//MADP/z//z/8/4E//+AB///AAf//wBD//8OA///+AH//+AA//+AQH//gYA//8cAP//8CD//+BB///Ag///4wf//+cP///+D////B////4///////////////////////',
            name: 'Stack Overflow',
            url: 'https://stackoverflow.com/search?q='
        },
        {
            icon: '🔗',
            name: '超链接',
            url: null,
            type: 'link' // 用 type 区分
        },
        {
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAABYmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgIHRpZmY6T3JpZW50YXRpb249IjYiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz7UGE7IAAACClBMVEX///9VYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBVYIBzg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79zg79VYIBzg79VYIBzg79zg79VYIBzg79zg79zg79VYIBVYIBVYIBzg79VYIBVYIBzg79VYIBVYIBzg79z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',
            name: '更多',
            url: null,
            type: 'more' // 用 type 区分
        }
    ];

    // 监听鼠标松开事件
    document.addEventListener('mouseup', function () {
        // 获取选中的文本
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        // 如果没有选中文本，则隐藏悬浮层
        if (!selectedText) {
            selectionPopup.style.display = 'none';
            return;
        }

        // 如果有选中内容，则获取选中范围的位置信息
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            // 如果无法获取有效的矩形信息，也隐藏弹窗
            if (!rect || (rect.width === 0 && rect.height === 0)) {
                selectionPopup.style.display = 'none';
                return;
            }

            // 计算弹窗应出现的位置（在所选文本下方，稍作偏移）
            const offsetY = 8; // 在文本下方 8px 处
            const left = rect.left + window.scrollX;
            const top = rect.bottom + window.scrollY + offsetY;

            // 设置弹窗位置
            selectionPopup.style.left = left + 'px';
            selectionPopup.style.top = top + 'px';
            selectionPopup.style.display = 'block';

            // 清空之前的按钮
            selectionPopup.innerHTML = '';

            // 创建并插入各个搜索按钮
            searchEngines.forEach(engine => {
                const btn = document.createElement('a');
                btn.className = 'search-btn';
                btn.title = engine.name; // 鼠标悬停时显示的名称

                // 判断 icon 是否是一个 URL 或 Base64（data:），否则就当作文字/Emoji
                if (
                    engine.icon.startsWith('http://') ||
                    engine.icon.startsWith('https://') ||
                    engine.icon.startsWith('data:')
                ) {
                    // 创建 <img> 标签
                    const img = document.createElement('img');
                    img.src = engine.icon;
                    img.alt = engine.name;
                    btn.appendChild(img);
                } else {
                    // 直接把 icon 当作文字/Emoji
                    btn.textContent = engine.icon;
                }

                // 点击按钮时，打开对应链接
                btn.onclick = function (e) {
                    e.preventDefault(); // 防止默认点击行为
                    //   console.log('点击了按钮：' + engine.name); // 调试日志
                    if (engine.url) {
                        // 拼接搜索链接
                        const finalUrl = engine.url + encodeURIComponent(selectedText);
                        window.open(finalUrl, '_blank');
                    } else if (engine.type === 'link') {
                        // 2. 超链接按钮逻辑（带完美的网址/普通文本 Bing 搜索降级）
                        const trimmedText = selectedText.trim();
                        const urlPattern = /^(https?:\/\/)?([a-z0-9\u4e00-\u9fa5\-]+\.)+[a-z0-9\u4e00-\u9fa5\-]+(\/[\w\-./?%&=]*)?$/i;

                        if (urlPattern.test(trimmedText)) {
                            let linkUrl = trimmedText;
                            if (!trimmedText.startsWith('http://') && !trimmedText.startsWith('https://')) {
                                linkUrl = 'https://' + trimmedText;
                            }
                            window.open(linkUrl, '_blank');
                        } else {
                            const defaultUrl = 'https://www.bing.com/search?q=' + encodeURIComponent(trimmedText);
                            window.open(defaultUrl, '_blank');
                        }
                    } else if (engine.type === 'more') {
                        // 点击更多，弹出导航大矩阵
                        openNavMatrixPanel(selectedText);
                    }
                };

                selectionPopup.appendChild(btn);
            });
        }
    });

    // 如果点击页面其他地方，且不在悬浮层内部，则隐藏悬浮层
    document.addEventListener('mousedown', function (e) {
        if (!selectionPopup.contains(e.target)) {
            selectionPopup.style.display = 'none';
        }
    });

    // 打开导航大面板
    function openNavMatrixPanel(textFromSelection) {
        // 防重复：如果导航大面板已经打开，直接显示并更新划词
        let modal = document.getElementById('qs-matrix-modal');
        // 优先使用直接传进来的划词文本，其次才考虑其他兜底
        const selectedText = textFromSelection || window.getSelection().toString().trim() || (typeof globalSelectedText !== 'undefined' ? globalSelectedText : '');

        // 1. 如果遮罩 Modal 还不存在，只创建一次外框骨架并绑定全局事件
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'qs-matrix-modal';
            modal.className = 'qs-modal-overlay';

            modal.innerHTML = `
            <div class="qs-matrix-panel">
                <div class="qs-matrix-search">
                    <input type="text" id="qsBigSearchInput" placeholder="输入内容，点击下方引擎直接搜索...">
                    <button class="qs-btn qs-save" id="btnGoToSetting">⚙️ 设置</button>
                    <button class="qs-btn qs-cancel" id="btnMatrixClose">关闭</button>
                </div>
                <div class="qs-matrix-body" id="qsMatrixGrid"></div>
            </div>
        `;
            document.body.appendChild(modal);

            // 按钮及背景点击事件（只需绑定一次）
            document.getElementById('btnMatrixClose').onclick = () => modal.style.display = 'none';

            document.getElementById('btnGoToSetting').onclick = () => {
                modal.style.display = 'none';
                if (typeof openJsonEditorPanel === 'function') openJsonEditorPanel();
            };

            modal.onclick = function (e) {
                if (e.target === modal) modal.style.display = 'none';
            };
        }

        // 2. 显示面板 & 同步划词搜索词
        modal.style.display = 'flex';
        if (selectedText) {
            document.getElementById('qsBigSearchInput').value = selectedText;
        }

        // 3. ✨【核心重绘逻辑】每次打开/退回时，立刻清空并读取最新 localStorage 重新渲染！
        const grid = document.getElementById('qsMatrixGrid');
        grid.innerHTML = ''; // 瞬间清空旧图标

        // 从本地缓存读取最新配置
        const currentConfig = JSON.parse(localStorage.getItem('my_nav_config')) || window.DEFAULT_GLOBAL_CONFIG;

        // 渲染分类引擎
        if (currentConfig && Array.isArray(currentConfig.classifiedEngines)) {
            currentConfig.classifiedEngines.forEach(cat => {
                if (cat.enable === false) return;
                if (!cat.engines || !Array.isArray(cat.engines)) return;

                const col = document.createElement('div');
                col.className = 'qs-matrix-col';

                const title = document.createElement('div');
                title.className = 'qs-matrix-cat-title';
                title.innerText = cat.name;
                col.appendChild(title);

                cat.engines.forEach(engine => {
                    if (engine.enable === false) return;
                    col.appendChild(createMatrixItem(engine));
                });
                grid.appendChild(col);
            });
        }

        // 渲染常用引擎
        if (currentConfig && Array.isArray(currentConfig.frequentEngines)) {
            const col = document.createElement('div');
            col.className = 'qs-matrix-col';

            const title = document.createElement('div');
            title.className = 'qs-matrix-cat-title';
            title.innerText = '常用';
            col.appendChild(title);

            currentConfig.frequentEngines.forEach(engine => {
                if (engine.enable === false) return;
                col.appendChild(createMatrixItem(engine));
            });
            grid.appendChild(col);
        }

        // 生成单格引擎组件
        function createMatrixItem(engine) {
            // ✨ 1. 将默认 SVG 常量直接放在函数最顶部，随时随地可用，绝不会触发“暂时性死区”
            const DEFAULT_SVG_ICON = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="%2394a3b8" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`;

            const item = document.createElement('div');
            item.className = 'qs-matrix-item';
            item.title = `使用 ${engine.name} 搜索`;

            // ✨ 2. 判断 icon 是否有效，无效则使用默认 SVG
            const iconSrc = (engine.icon && engine.icon.trim() !== '') ? engine.icon : DEFAULT_SVG_ICON;

            const img = document.createElement('img');
            img.className = 'qs-matrix-icon';
            img.src = iconSrc;

            // 图片加载失败降级处理
            img.onerror = function () {
                this.src = DEFAULT_SVG_ICON;
            };

            const span = document.createElement('span');
            span.className = 'qs-matrix-name';
            span.textContent = engine.name;

            item.appendChild(img);
            item.appendChild(span);

            item.onclick = () => {
                const keyword = document.getElementById('qsBigSearchInput').value.trim();
                if (engine.url) {
                    const searchUrl = engine.url.replace('%s', encodeURIComponent(keyword));
                    window.open(searchUrl, '_blank');
                }
            };

            return item;
        }
    }
    // JSON编辑器设置
    function openJsonEditorPanel() {
        let modal = document.getElementById('qs-editor-modal');

        // 1. 如果编辑器面板已存在，直接显示并刷入最新的配置文本
        if (modal) {
            modal.style.display = 'flex';
            const currentConfig = JSON.parse(localStorage.getItem('my_nav_config')) || window.DEFAULT_GLOBAL_CONFIG;
            document.getElementById('dynamicJsonTextarea').value = JSON.stringify(currentConfig, null, 4);
        } else {
            // 2. 如果不存在，创建编辑器遮罩骨架
            modal = document.createElement('div');
            modal.id = 'qs-editor-modal';
            modal.className = 'qs-modal-overlay';

            const currentConfig = JSON.parse(localStorage.getItem('my_nav_config')) || window.DEFAULT_GLOBAL_CONFIG;

            modal.innerHTML = `
            <div class="qs-setting-panel">
                <div class="qs-setting-header">⚙️ 全量配置编辑器</div>
                <div class="qs-setting-body">
                    <textarea id="dynamicJsonTextarea" class="qs-setting-textarea" spellcheck="false">${JSON.stringify(currentConfig, null, 4)}</textarea>
                </div>
                <div class="qs-setting-footer">
                    <button class="qs-btn qs-reset" id="dynamicBtnReset">重置出厂</button>
                    <div style="flex: 1;"></div>
                    <button class="qs-btn qs-cancel" id="dynamicBtnCancel">取消</button>
                    <button class="qs-btn qs-save" id="dynamicBtnSave">保存配置</button>
                </div>
            </div>
        `;
            document.body.appendChild(modal);
        }

        // ✨【核心处理】定义统一的“退回导航大面板”函数
        const backToMatrixPanel = () => {
            modal.style.display = 'none'; // 1. 关掉当前的 JSON 编辑器
            if (typeof openNavMatrixPanel === 'function') {
                openNavMatrixPanel();     // 2. 唤醒导航大面板（自动重新读取 localStorage 渲染最新图标）
            }
        };

        // ------------------- 事件绑定区 -------------------

        // 1️⃣ 点击【取消】按钮 -> 退回大面板
        document.getElementById('dynamicBtnCancel').onclick = () => {
            backToMatrixPanel();
        };

        // 2️⃣ 点击【背景磨砂遮罩】 -> 退回大面板
        modal.onclick = function (e) {
            if (e.target === modal) {
                backToMatrixPanel();
            }
        };

        // 3️⃣ 点击【重置出厂】按钮 -> 清空缓存 -> 提示 -> 退回大面板
        document.getElementById('dynamicBtnReset').onclick = () => {
            if (confirm('确定要恢复出厂默认设置吗？你的自定义配置将被清空！')) {
                localStorage.removeItem('my_nav_config'); // 清空本地自定义
                if (typeof initSearchMenu === 'function') initSearchMenu(); // 联动更新划词迷你条
                alert('已成功重置为出厂默认配置！');
                backToMatrixPanel(); // ✨ 关键：重置后立刻退回大面板，大面板当场恢复出厂渲染！
            }
        };

        // 4️⃣ 点击【保存配置】按钮 -> 写入缓存 -> 提示 -> 退回大面板
        document.getElementById('dynamicBtnSave').onclick = () => {
            try {
                const textareaVal = document.getElementById('dynamicJsonTextarea').value;
                const newConfig = JSON.parse(textareaVal);

                localStorage.setItem('my_nav_config', JSON.stringify(newConfig));
                if (typeof initSearchMenu === 'function') initSearchMenu(); // 联动更新划词迷你条

                alert('配置已成功写入本地缓存并实时生效！');
                backToMatrixPanel(); // ✨ 关键：保存后立刻退回大面板，大面板当场加载新修改！
            } catch (e) {
                alert('JSON 格式拼错啦老哥，检查一下逗号或括号！\n错误提示: ' + e.message);
            }
        };
    }
});

