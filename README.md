# Google AI Studio 浏览器汉化插件

这是一个轻量级的 Edge/Chrome 浏览器扩展，用于将 [Google AI Studio](https://aistudio.google.com/) 的英文界面实时翻译为中文。

## 功能特点
* 全局界面汉化（覆盖侧边栏、模型设置、Deep Research 等）。
* 实时动态翻译（支持单页应用的异步加载内容）。
* 支持输入框占位符（Placeholder）翻译。

## 安装说明
1. 下载本项目代码（或在 Releases 中下载 `.zip` 压缩包并解压）。
2. 打开 Edge 浏览器，在地址栏输入 `edge://extensions/`。
3. 在页面左侧/左下角开启 **“开发人员模式”**。
4. 点击 **“加载解压缩的扩展”** 按钮。
5. 选择你刚刚解压的 `AI_Studio_Chinese` 文件夹即可。

## 如何扩充词典？
如果你发现有未翻译的英文，只需打开 `content.js`，在文件开头的 `dictionary` 对象中按照 `"英文": "中文"` 的格式添加即可。保存后在浏览器扩展页面点击“重新加载”即可生效。