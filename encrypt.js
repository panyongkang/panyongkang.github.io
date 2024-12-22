// 执行前先 npm install crypto-js 安装好依赖包
const CryptoJS = require('crypto-js');
// 需要加密的HTML内容
const content = 
`<p>就是你小子想偷看我的小秘密，你已被全程监控！！！</p>
<p>记忆碎片整理中。。。</p>
<p>年代太久远，让我好好回忆一下~</p>
`;
const password = '123123'; // 设置访问密码
// 加密内容
const encryptedContent = CryptoJS.AES.encrypt(content, password).toString();
// 在终端执行 node encrypt.js 命令，返回加密内容
console.log('Encrypted Content: ', encryptedContent);
