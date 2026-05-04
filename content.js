// 1. 扩充版汉化词典 (包含全局搜索栏与快捷命令)
const dictionary = {
  // === 全局搜索栏与快捷命令 ===
  "Start a chat or vibe code an app": "开始聊天或使用 Vibe 编码应用",
  "Vibe code an app": "使用 Vibe 编码应用",
  "Start a chat with a model": "与模型开始聊天",
  "Create an API key": "创建 API 密钥",
  "View keyboard shortcuts": "查看键盘快捷键",
  "Recent activity": "近期活动",
  "Chat session": "聊天会话",

  // === 侧边栏与全局导航 ===
  "Home": "首页",
  "Playground": "游乐场",
  "Build": "构建",
  "Dashboard": "仪表板",
  "Documentation": "文档",
  "View all history": "查看所有历史记录",
  "View all history →": "查看所有历史记录 →",
  "Search": "搜索",
  "What's new": "最新动态",
  "Library": "我的库",
  "Get API key": "获取 API 密钥",
  "API keys": "API 密钥",
  "Billing": "计费与配额",
  "Settings": "设置",
  "Help": "帮助",
  "Sign out": "退出登录",

  // === 顶部导航与产品菜单 ===
  "Products and apps": "产品与应用",
  "Gemini App": "Gemini 应用",
  "Chat with Gemini": "与 Gemini 聊天",
  "Google Antigravity": "Google Antigravity",
  "Our agentic development platform": "我们的智能体开发平台",

  // === Build (构建) 页面与应用库 ===
  "Start": "开始",
  "Gallery": "应用库",
  "Your apps": "你的应用",
  "Build your ideas with Gemini": "使用 Gemini 构建你的想法",
  "your ideas with Gemini": "你的想法", 
  "Describe an app and let Gemini do the rest": "描述一个应用，剩下的交给 Gemini",
  "I'm feeling lucky": "试试手气",
  "Discover and remix app ideas": "发现并二次创作应用创意",
  "Browse the app gallery →": "浏览应用库 →",
  "Start building →": "开始构建 →",
  "Convert text to speech": "文本转语音",
  "Generate music": "生成音乐",
  "Add database and auth": "添加数据库和身份验证",
  "Create & edit images": "创建和编辑图片",
  "Add voice conversations": "添加语音对话",
  "Animate images into video": "将图片转为视频动画",
  "Use Google Search data": "使用 Google 搜索数据",
  "Use Google Maps data": "使用 Google 地图数据",
  "Generate high-quality images": "生成高质量图片",
  "Add Gemini intelligence": "添加 Gemini 智能",
  "Add a Gemini chatbot": "添加 Gemini 聊天机器人",
  "Generate video from text": "从文本生成视频",
  "Control image aspect ratios": "控制图片宽高比",
  "Analyze images": "分析图片",
  "Add low-latency responses": "添加低延迟响应",
  "Analyze video content": "分析视频内容",
  "Transcribe audio": "转录音频",
  "Enable high thinking": "启用深度思考",

  // === 探索模型与智能体 (Explore Google models / Build with Agents) ===
  "Explore Google models": "探索 Google 模型",
  "Build with Agents": "使用智能体构建",
  "Models": "模型",
  "Agents": "智能体",
  "Featured": "精选",
  "Test out our most advanced and newest models.": "体验我们最先进、最新的模型。",
  "Code and Chat": "代码与聊天",
  "Build chatbots, agents, and code with Gemini 3.": "使用 Gemini 3 构建聊天机器人、智能体和代码。",
  "Image Generation": "图像生成",
  "Create and edit images with Nano Banana and Imagen.": "使用 Nano Banana 和 Imagen 创建和编辑图像。",
  "Video Generation": "视频生成",
  "Generate videos with Veo models, our state of the art video generation models.": "使用我们最先进的 Veo 视频生成模型来生成视频。",
  "Speech and Music": "语音与音乐",
  "Explore our text to speech and music generation models.": "探索我们的文本转语音和音乐生成模型。",
  "Real-time": "实时",
  "Real-time voice and video with Live API.": "使用 Live API 进行实时语音和视频。",

  // === 模型选择面板 (Model selection) ===
  "Model selection": "模型选择",
  "Search for a model or agent": "搜索模型或智能体",
  "All": "全部",
  "Images": "图像",
  "Music": "音乐",
  "Live": "实时",

  // === Deep Research 相关 ===
  "Deep Research Preview (Apr-21-2026)": "Deep Research 预览版 (2026年4月21日)",
  "Deep Research Max Preview (Apr-21-2026)": "Deep Research Max 预览版 (2026年4月21日)",
  "Upgrade to unlock Deep Research Preview": "升级以解锁 Deep Research (深度研究) 预览版",
  "Deep Research Preview is only available for paid tier usage. Link a paid API key to access higher rate limits, advanced features, and more.": "Deep Research 预览版仅供付费层级使用。关联付费 API 密钥以获取更高的速率限制、高级功能等。",
  "Link API Key": "关联 API 密钥",
  "Our agent for long-running context gathering & synthesis tasks, optimized for speed and efficiency.": "我们用于长时间上下文收集和综合任务的智能体，针对速度和效率进行了优化。",
  "Our SOTA agent for long-running context gathering & synthesis tasks, optimized for maximum search exhaustiveness and report comprehensiveness.": "我们最先进的智能体，用于长时间的上下文收集和综合任务，针对最大程度的搜索详尽性和报告全面性进行了优化。",

  // === 提示词与主界面文字 ===
  "Create New Prompt": "创建新提示词",
  "Create new prompt": "创建新提示词",
  "Chat prompt": "对话提示词",
  "Freeform prompt": "自由格式提示词",
  "Structured prompt": "结构化提示词",
  "How Can I Help?": "我能帮上什么忙？",
  "Start typing a prompt to see what our agents can do": "开始输入提示词，看看我们的智能体能做些什么",
  "This model is not stable and may not be suitable for production use.": "此模型不稳定，可能不适合在生产环境中使用。",
  "Learn more.": "了解更多。",
  
  // === 聊天对话、顶部菜单与报错信息 ===
  "User": "用户",
  "Agent": "智能体",
  "Temporary chat": "临时聊天",
  "No changes to save": "没有要保存的更改",
  "Make a copy": "创建副本",
  "Raw Mode": "原始模式",
  "Failed to create interaction: permission denied. Please try again.": "创建交互失败：权限被拒绝。请重试。",
  "An internal error has occurred.": "发生内部错误。",
  "Google AI models may make mistakes, so double-check outputs.": "Google AI 模型可能会犯错，请仔细核对输出内容。",

  // === 媒体与文件上传 ===
  "Insert: ": "插入：",
  "Text": "文本",
  "Image": "图片",
  "Video": "视频",
  "Audio": "音频",
  "File": "文件",
  "Folder": "文件夹",
  "Upload to Drive": "上传到云端硬盘",
  "Drive": "云端硬盘",
  "Upload files": "上传文件",
  "Record Audio": "录制音频",
  "Camera": "相机",
  "YouTube Video": "YouTube 视频",
  "Sample Media": "示例媒体",

  // === 通用状态与操作按钮 ===
  "Enabled": "启用",
  "Disabled": "禁用",
  "Run": "运行",
  "Stop": "停止",
  "Save": "保存",
  "Share": "分享",
  "Get code": "获取代码",
  "Get Code": "获取代码",
  "Export": "导出",
  "Rename": "重命名",
  "Delete": "删除",
  "Duplicate": "创建副本",
  "Cancel": "取消",
  "Confirm": "确认",
  "Copy": "复制",

  // === 右侧参数、模型与系统指令 ===
  "Run settings": "运行设置",
  "Model": "模型",
  "Temperature": "温度 (随机性)",
  "Thinking level": "思考级别",
  "Low": "低",
  "Medium": "中",
  "High": "高",
  "Stop sequences": "停止序列",
  "System Instructions": "系统指令",
  "System instructions": "系统指令",
  "Optional tone and style instructions for the model": "模型的可选语气和风格指令",
  "Safety settings": "安全设置",
  "Edit": "编辑",
  "Advanced settings": "高级设置",
  "Top K": "Top K",
  "Top P": "Top P",
  "Maximum output tokens": "最大输出词元数",
  "Tokens": "词元 (Tokens)",
  "Media resolution": "媒体分辨率",
  "Default": "默认",
  "Add stop sequence": "添加停止序列",
  "Add stop...": "添加停止...",
  "Output length": "输出长度",

  // === 右侧 Tools (工具) 列表 ===
  "Tools": "工具",
  "Structured outputs": "结构化输出",
  "Code execution": "代码执行",
  "Function calling": "函数调用",
  "Grounding with Google Search": "基于 Google 搜索",
  "Source: Google Search": "来源：Google 搜索",
  "Grounding with Google Maps": "基于 Google 地图",
  "URL context": "URL 上下文",
  "Thinking summaries": "思考总结",
  "Visualization": "可视化",
  "Collaborative planning": "协同规划",

  // === 安全设置选项 ===
  "Harassment": "骚扰",
  "Hate speech": "仇恨言论",
  "Sexually explicit": "色情内容",
  "Dangerous content": "危险内容",
  "Block none": "不拦截",
  "Block few": "拦截极少",
  "Block some": "拦截部分",
  "Block most": "拦截大部分",

  // === 设置面板 (Settings) ===
  "Theme": "主题",
  "Light": "浅色",
  "Dark": "深色",
  "System": "跟随系统",
  "Submit prompt key": "提交提示词快捷键",
  "Autocomplete": "自动补全",
  "Applet notifications": "应用通知",
  "View status": "查看状态",
  "Terms of service": "服务条款",
  "Privacy policy": "隐私政策",
  "Send feedback": "发送反馈",
  "Billing Support": "计费支持",

  // === API Key 页面 ===
  "Create API key": "创建 API 密钥",
  "Create API key in new project": "在新项目中创建 API 密钥",
  "Search projects": "搜索项目"
};

// 2. 核心替换函数：遍历节点并替换文本
function translateNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let originalText = node.nodeValue;
    let trimmedText = originalText.trim();
    
    // 处理带图标的按钮文本
    if (trimmedText.startsWith("✦ ")) {
        trimmedText = trimmedText.substring(2).trim();
    }
    
    if (dictionary[trimmedText]) {
      node.nodeValue = originalText.replace(trimmedText, dictionary[trimmedText]);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // 专门处理搜索框的 placeholder 属性
    if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
      if (node.hasAttribute("placeholder")) {
        let placeholderText = node.getAttribute("placeholder").trim();
        if (dictionary[placeholderText]) {
          node.setAttribute("placeholder", dictionary[placeholderText]);
        }
      }
    }
  }
}

// 3. 初始遍历页面现有的 DOM
function translateDOM(rootNode) {
  // 先遍历文本节点
  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walker.nextNode()) {
    translateNode(node);
  }
  
  // 再遍历输入框等元素节点，以翻译 placeholder
  const inputNodes = rootNode.querySelectorAll ? rootNode.querySelectorAll("input, textarea") : [];
  inputNodes.forEach(inputNode => translateNode(inputNode));
}

translateDOM(document.body);

// 4. 监听动态加载的内容 (处理 SPA 网站的关键)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length > 0) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          translateNode(node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          translateDOM(node);
        }
      });
    }
    
    // 监听属性变化，专门抓取后来动态添加的 placeholder
    if (mutation.type === "attributes" && (mutation.attributeName === "placeholder")) {
       translateNode(mutation.target);
    }
  });
});

observer.observe(document.body, { 
  childList: true, 
  subtree: true,
  attributes: true, // 开启属性监听以捕获 placeholder 的变化
  attributeFilter: ['placeholder'] 
});