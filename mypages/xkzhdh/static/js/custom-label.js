class CustomLabel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Shadow DOM 结构
    this.shadowRoot.innerHTML = `
      <style>
        span {
          font-weight: bold;
        }
      </style>
      <span><slot>(推荐)</slot></span>
    `;
  }

  connectedCallback() {
    // 监听 slot 内容变化，确保动态更新颜色
    const slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", () => {
      this.updateColor();
    });

    // 初次加载时执行
    this.updateColor();
  }

  updateColor() {
    let color = this.getAttribute("color"); // 获取用户自定义颜色
    const span = this.shadowRoot.querySelector("span");
    const slot = this.shadowRoot.querySelector("slot");

    // 获取 slot 实际的文本内容
    const assignedNodes = slot.assignedNodes();
    let text = assignedNodes.length > 0 ? assignedNodes[0].textContent.trim() : "(推荐)";

    // 强制“推荐”显示红色
    if (!color) {
      if (text.includes("推荐")) {
        color = "#FF0000"; // 默认红色
      } else {
        color = this.getRandomColor(); // 其他情况随机颜色
      }
    }

    span.style.color = color;
  }

  getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

// 注册自定义标签
customElements.define("custom-label", CustomLabel);
