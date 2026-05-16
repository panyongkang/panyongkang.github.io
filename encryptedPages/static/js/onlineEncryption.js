// 错误提示函数
function showError(msg) {
    const errorElement = document.getElementById("errorMessage") || document.createElement('p');
    errorElement.id = "errorMessage";
    errorElement.textContent = msg;
    document.querySelector(".glass-container")?.appendChild(errorElement);
    setTimeout(() => errorElement.textContent = "", 2000);
}

// 系统配置
const config = {
    encryptedTarget: "U2FsdGVkX18AeVtFpM7Cron544Ve6pS1/og7FvzmUtB79IuFAJ4sM823ISpqv6KP",
    passwordHash: "671c9c967d467efb0d482d9fa73cef157e3f90298e49377d21787d53016e34ef",
    enableFullscreen: true // 全屏功能开关，控制按钮显示
};

// 开发者工具防护开关
const disableDevTools = true;
let hasRedirected = false;
let isExitingFullscreen = false; // 标记是否正在退出全屏

// 防护逻辑
if (disableDevTools) {
    // 快捷键屏蔽
    document.addEventListener('keydown', e => {
        const blockedKeys = new Set(['KeyI', 'KeyJ', 'KeyU', 'KeyS', 'KeyL', 'KeyD']);
        const isBlocked = (
            (e.ctrlKey || e.metaKey) && e.shiftKey && (blockedKeys.has(e.code) || e.code === 'KeyC') ||
            (e.ctrlKey || e.metaKey || e.altKey) && blockedKeys.has(e.code) ||
            e.code === 'F12'
        );
        if (isBlocked) {
            e.preventDefault();
            e.stopPropagation();
            showError('快捷键已被禁用');
        }
    }, { capture: true });

    // 禁用右键菜单
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 鼠标移出窗口时重定向
    document.addEventListener('mouseleave', () => {
        if (hasRedirected || isExitingFullscreen) return;
        hasRedirected = true;
        window.location.replace('about:blank');
    });

    // 页面失去焦点时重定向
    window.addEventListener('blur', () => {
        console.log('Blur event triggered, isExitingFullscreen:', isExitingFullscreen, 'hasRedirected:', hasRedirected);
        if (hasRedirected || isExitingFullscreen) return;
        hasRedirected = true;
        window.location.replace('about:blank');
    });

    // 页面隐藏时重定向（移动端适配）
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && !hasRedirected && !isExitingFullscreen) {
            hasRedirected = true;
            window.location.replace('about:blank');
        }
    });

    // 检测开发者工具打开
    let devToolsWarningShown = false;
    setInterval(() => {
        if (!devToolsWarningShown && (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200)) {
            devToolsWarningShown = true;
            showError('请勿打开开发者工具！页面将重定向。');
            setTimeout(() => window.location.replace('about:blank'), 1000);
        }
    }, 1000);

    // 保持焦点
    setInterval(() => {
        if (!document.hasFocus() && !isExitingFullscreen) {
            const passwordInput = document.getElementById('passwordInput');
            if (passwordInput) {
                passwordInput.focus();
            }
        }
    }, 500);
}

// 防止后退绕过防护
window.addEventListener('popstate', () => {
    if (!hasRedirected) {
        hasRedirected = true;
        document.body.innerHTML = ''; // 清空页面
        window.location.replace('about:blank');
    }
});

// 页面卸载时清空内容
window.addEventListener('unload', () => {
    document.body.innerHTML = '';
});

// 工具函数：将 ArrayBuffer 转换为十六进制字符串
function arrayBufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// 解密目标 URL
function decryptTargetURL(password) {
    if (typeof CryptoJS === 'undefined') {
        showError('加密库未加载，请检查文件路径或刷新页面');
        return null;
    }
    try {
        const decrypted = CryptoJS.AES.decrypt(config.encryptedTarget, password);
        const result = decrypted.toString(CryptoJS.enc.Utf8);
        if (!/^https?:\/\//.test(result)) throw new Error('无效 URL');
        return result;
    } catch (error) {
        console.error('解密失败:', error);
        return null;
    }
}

// 核心验证逻辑：验证密码
async function verifyPassword(input) {
    if (input.length < 8 || !/^[a-zA-Z0-9]+$/.test(input)) {
        return false;
    }
    if (input === config.passwordHash) return true;
    try {
        const encoder = new TextEncoder();
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(input));
        return arrayBufferToHex(hashBuffer) === config.passwordHash;
    } catch (error) {
        console.error('哈希计算失败:', error);
        return false;
    }
}

// 初始化逻辑
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const passwordParam = urlParams.get('password');
    const passwordInput = document.getElementById('passwordInput');
    const fullscreenBtn = document.getElementById('fullscreenBtn');

    // 确保输入框清空
    passwordInput.value = '';

    // 清理存储痕迹
    localStorage.clear();
    sessionStorage.clear();

    // 替换历史记录
    history.replaceState(null, '', window.location.pathname);

    // 显示页面
    document.body.classList.add('loaded');

    // 强制聚焦密码输入框
    setTimeout(() => {
        passwordInput.focus();
    }, 0);

    // 全屏按钮逻辑
    if (config.enableFullscreen && document.fullscreenEnabled) {
        fullscreenBtn.classList.remove('hidden');
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().then(() => {
                    fullscreenBtn.textContent = '退出全屏';
                    setTimeout(() => passwordInput.focus(), 0);
                }).catch(err => {
                    console.warn('全屏请求失败:', err);
                    showError('无法进入全屏，请重试');
                });
            } else {
                isExitingFullscreen = true;
                document.exitFullscreen().then(() => {
                    fullscreenBtn.textContent = '全屏';
                    setTimeout(() => {
                        passwordInput.focus();
                        isExitingFullscreen = false;
                    }, 200);
                }).catch(err => {
                    console.warn('退出全屏失败:', err);
                    isExitingFullscreen = false;
                });
            }
        });

        // 监听全屏状态变化（处理 Esc 键退出）
        document.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                isExitingFullscreen = true;
                fullscreenBtn.textContent = '全屏';
                setTimeout(() => {
                    passwordInput.focus();
                    isExitingFullscreen = false;
                }, 200);
            } else {
                fullscreenBtn.textContent = '退出全屏';
                setTimeout(() => passwordInput.focus(), 0);
            }
        });
    }

    // 处理 URL 参数中的密码
    if (passwordParam) {
        history.replaceState(null, '', window.location.pathname);
        handlePasswordValidation(passwordParam);
    }

    // DOM 交互逻辑
    const overlay = document.getElementById("glass-overlay");
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", async () => {
        submitBtn.disabled = true;
        submitBtn.textContent = "验证中...";
        try {
            await handlePasswordValidation(passwordInput.value);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "提交";
        }
    });

    passwordInput.addEventListener("keyup", e => {
        if (e.key === "Enter") submitBtn.click();
    });
});

// 统一验证处理器
async function handlePasswordValidation(input) {
    const trimmedInput = input.trim();
    const isValid = await verifyPassword(trimmedInput);
    if (isValid) {
        const targetURL = decryptTargetURL(trimmedInput);
        if (targetURL) {
            localStorage.clear();
            sessionStorage.clear();
            if (document.fullscreenElement) {
                isExitingFullscreen = true;
                document.exitFullscreen().catch(err => console.warn('退出全屏失败:', err));
            }
            window.location.replace(targetURL);
        } else {
            showError("无法解密目标地址，请检查密码");
            const container = document.querySelector(".glass-container");
            container.classList.add("shake");
            container.addEventListener('animationend', () => container.classList.remove("shake"), { once: true });
        }
    } else {
        showError("验证失败，请检查密码");
        const container = document.querySelector(".glass-container");
        container.classList.add("shake");
        container.addEventListener('animationend', () => container.classList.remove("shake"), { once: true });
    }
}