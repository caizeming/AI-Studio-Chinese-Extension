// =====================================================================
// Google AI Studio 界面汉化扩展 content.js
//
// 翻译引擎特性：
//   1. 精确词典匹配（撇号自动归一化，' 与 ' 互通；保留首尾空白）
//   2. 前缀规则：处理 "Release date: 9月 2, 2026" 这类动态拼接文本
//   3. 正则规则：处理相对时间、分页、价格行等动态文本（仅限短文本，避免误伤对话内容）
//   4. token 兜底替换：Input:/Output: 等无法整句匹配的片段
//   5. 属性翻译：placeholder / aria-label / title / data-tooltip
//   6. characterData 监听：Angular 重新渲染把文本改回英文后自动重译
//   7. 防重复/防循环：已含中文的文本直接跳过
//
// 文件结构：词典与规则在前（无 DOM 依赖，可用 Node.js 单独测试），DOM 引擎在后。
// =====================================================================

// ==================== 1. 精确匹配词典 ====================
const dictionary = {
  // === 全局搜索栏与快捷命令 ===
  "Start a chat or vibe code an app": "开始聊天或使用 Vibe 编码应用",
  "Vibe code an app": "使用 Vibe 编码应用",
  "Start a chat with a model": "与模型开始聊天",
  "Create an API key": "创建 API 密钥",
  "View keyboard shortcuts": "查看键盘快捷键",
  "Recent activity": "近期活动",
  "Chat session": "聊天会话",
  "Vibe coding session": "Vibe 编码会话",

  // === 侧边栏与全局导航 ===
  "Home": "首页",
  "Playground": "游乐场",
  "Explore": "探索",
  "History": "历史记录",
  "Build": "构建",
  "New app": "新应用",
  "My apps": "我的应用",
  "Gallery": "应用库",
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
  "Collapse navigation menu": "折叠导航菜单",
  "Upgrade to unlock more": "升级以解锁更多",
  "Access higher limits, Pro models, and more.": "获取更高配额、Pro 模型等。",
  "View more actions": "更多操作",

  // === 顶部导航与产品菜单 ===
  "Products and apps": "产品与应用",
  "Gemini App": "Gemini 应用",
  "Chat with Gemini": "与 Gemini 聊天",
  "Google Antigravity": "Google Antigravity",
  "Our agentic development platform": "我们的智能体开发平台",

  // === 通用状态与提示 ===
  "Page not found": "页面未找到",
  "Check that the URL was entered correctly and try again": "请检查 URL 输入是否正确后重试",
  "Go to library": "前往媒体库",
  "Google AI Studio uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic.": "Google AI Studio 使用 Google 的 Cookie 来提供和改进服务并分析流量。",
  "OK, got it": "知道了",
  "Learn more": "了解更多",
  "Learn more.": "了解更多。",
  "Skip to main content": "跳转到主要内容",
  "Loading": "加载中",
  "Error": "错误",
  "Warning": "警告",

  // === Playground 主界面 ===
  "Share prompt": "分享提示词",
  "New chat": "新对话",
  "New Chat": "新对话",
  "Already in a new chat": "已在新对话中",
  "Link an API key to unlock Antigravity Agent Preview": "关联 API 密钥以解锁 Antigravity Agent Preview",
  "Antigravity Agent Preview is available via an API key. Link an API key to get started.": "Antigravity Agent Preview 需通过 API 密钥使用，关联一个 API 密钥即可开始。",
  "Link API Key": "关联 API 密钥",
  "Drop files here": "将文件拖放到此处",
  "Enter a prompt": "输入提示词",
  "This agent can execute code, take real actions, and use large number of tokens. You can stop the agent at any time.": "此智能体可以执行代码、执行真实操作并消耗大量词元。你可以随时停止它。",
  "Set up token cap": "设置词元上限",
  "Collapse agent disclaimer": "折叠智能体提示",
  "Insert images or files": "插入图片或文件",
  "No API key selected": "未选择 API 密钥",
  "Open tools menu": "打开工具菜单",
  "Speech to text": "语音转文本",
  "Scroll right": "向右滚动",
  "You need to create and run a prompt in order to share it": "需要先创建并运行提示词才能分享",

  // === Tools 菜单与提示 ===
  "Tools": "工具",
  "Lets Gemini use code to solve complex tasks": "让 Gemini 用代码解决复杂任务",
  "Use Google Search": "使用 Google 搜索",
  "Browse the url context": "浏览 URL 上下文",
  "Filesystem tools": "文件系统工具",
  "Filesystem tools are always enabled for this agent": "此智能体始终启用文件系统工具",
  "Remove Code execution": "移除代码执行",
  "Remove Grounding with Google Search": "移除 Google 搜索 Grounding",
  "Remove URL context": "移除 URL 上下文",
  "Remove Filesystem tools": "移除文件系统工具",

  // === Run settings 面板 ===
  "Run settings": "运行设置",
  "Reset default settings": "重置默认设置",
  "Close run settings panel": "关闭运行设置面板",
  "Select primary model": "选择主模型",
  "A general-purpose autonomous agent running in a remote, Google-hosted Linux environment.": "在 Google 托管的远程 Linux 环境中运行的通用自主智能体。",
  "Selected model": "已选模型",
  "Select Antigravity agent harness model": "选择 Antigravity 智能体框架模型",
  "Expand or collapse tools": "展开或折叠工具",
  "Expand or collapse environment settings": "展开或折叠环境设置",
  "Environment": "环境",
  "Each execution spins up an isolated environment where your agent can run code and manage files.": "每次执行都会启动一个隔离环境，你的智能体可在其中运行代码和管理文件。",
  "Type": "类型",
  "New": "新建",
  "Existing": "现有",
  "Sources": "来源",
  "Add sources": "添加来源",
  "Network": "网络",
  "Add rules": "添加规则",
  "Source:": "来源：",
  "Source: Google Search": "来源：Google 搜索",
  "Sources to be mounted in the environment": "要挂载到环境中的来源",
  "Network configuration for the environment": "环境的网络配置",
  "The type of environment to use": "要使用的环境类型",
  "This model requires a paid API key to use. Please select an API key.": "此模型需要付费 API 密钥才能使用。请选择一个 API 密钥。",
  "Get SDK code to chat with Gemini": "获取与 Gemini 对话的 SDK 代码",
  "Developer docs": "开发者文档",

  // === API 价格说明 ===
  "API pricing per 1M tokens.": "按每 100 万词元计费的 API 价格。",
  "API pricing per 1M tokens. Usage in AI Studio UI is free of charge when no API key is selected": "按每 100 万词元计费的 API 价格。未选择 API 密钥时，在 AI Studio 界面中使用免费。",
  "API pricing per 1M tokens. Audio tokens correspond to 25 tokens per second of audio. Equivalent to $0.0368 per minute. Usage in AI Studio UI is free of charge when no API key is selected": "按每 100 万词元计费的 API 价格。音频词元按每秒 25 个词元计算，约合每分钟 $0.0368。未选择 API 密钥时，在 AI Studio 界面中使用免费。",
  "Image output is priced at $120 per 1,000,000 tokens. Output images up to 1024x1024px consume 1120 tokens and are equivalent to $0.134 per image.": "图像输出按每 100 万词元 $120 计费。不超过 1024x1024px 的输出图片消耗 1120 词元，约合每张 $0.134。",
  "Video output price is equivalent to $0.10 per second of video (720p)": "视频输出价格约合每秒 $0.10（720p）",

  // === 提示词与主界面文字 ===
  "Create New Prompt": "创建新提示词",
  "Create new prompt": "创建新提示词",
  "Chat prompt": "对话提示词",
  "Freeform prompt": "自由格式提示词",
  "Structured prompt": "结构化提示词",
  "How Can I Help?": "我能帮上什么忙？",
  "Start typing a prompt to see what our agents can do": "开始输入提示词，看看我们的智能体能做些什么",
  "This model is not stable and may not be suitable for production use.": "此模型不稳定，可能不适合在生产环境中使用。",

  // === 聊天对话、顶部菜单与报错信息 ===
  "User": "用户",
  "Agent": "智能体",
  "Temporary chat": "临时聊天",
  "No changes to save": "没有要保存的更改",
  "Make a copy": "创建副本",
  "Raw Mode": "原始模式",
  "Compare mode": "对比模式",
  "Show conversation without markdown formatting": "显示不带 Markdown 格式的对话",
  "Moves to Google Drive Trash (Permanently deleted after 30 days)": "移入 Google 云端硬盘回收站（30 天后永久删除）",
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
  "Add files": "添加文件",
  "Add files from Google Drive": "从 Google 云端硬盘添加文件",
  "Import a GitHub repository as an app": "导入 GitHub 仓库作为应用",
  "Insert files (text, images, audio, video) into your prompt.": "将文件（文本、图片、音频、视频）插入提示词。",
  "Take a picture and insert it into your prompt.": "拍照并插入提示词。",

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
  "Skip": "跳过",
  "Next": "下一步",
  "Back": "上一步",
  "Done": "完成",
  "Pin": "置顶",
  "Remix": "二次创作",
  "Remix this app": "二次创作此应用",
  "Copy to clipboard": "复制到剪贴板",
  "Sort": "排序",
  "Items per page:": "每页显示：",

  // === 右侧参数、模型与系统指令 ===
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
  "Structured outputs": "结构化输出",
  "Code execution": "代码执行",
  "Function calling": "函数调用",
  "Grounding with Google Search": "基于 Google 搜索",
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
  "User settings": "用户设置",
  "Other products": "其他产品",
  "Account status": "账号状态",
  "View AI Studio and Gemini status page": "查看 AI Studio 和 Gemini 状态页面",
  "Enable applet notifications": "启用应用通知",
  "Disable applet notifications": "禁用应用通知",
  "Enable autocomplete suggestions while typing": "输入时启用自动补全建议",
  "Disable autocomplete suggestions while typing": "输入时禁用自动补全建议",
  "Disable autocomplete suggestions": "禁用自动补全建议",
  "Submit: Ctrl + Enter Newline: Enter": "提交：Ctrl + Enter　换行：Enter",
  "Submit: Enter Newline: Shift + Enter": "提交：Enter　换行：Shift + Enter",

  // === API Key 页面 ===
  "Create API key in new project": "在新项目中创建 API 密钥",
  "Search projects": "搜索项目",

  // === Library / 历史记录页面 ===
  "My files": "我的文件",
  "Shared": "已共享",
  "Name": "名称",
  "Updated": "更新时间",
  "Created by you": "你创建的",
  "Recent": "最近",
  "Recents": "最近",

  // === Build (构建) 页面与应用库 ===
  "Start": "开始",
  "Your apps": "你的应用",
  "Apps": "应用",
  "By you": "我创建的",
  "By others": "他人创建的",
  "Explore gallery": "浏览应用库",
  "Create new app": "创建新应用",
  "Suggest an app": "推荐一个应用",
  "Build your ideas with Gemini": "使用 Gemini 构建你的想法",
  "your ideas with Gemini": "你的想法",
  "Describe an app and let Gemini do the rest": "描述一个应用，剩下的交给 Gemini",
  "I'm feeling lucky": "试试手气",
  "I'm feeling lucky.": "试试手气。",
  "Discover and remix app ideas": "发现并二次创作应用创意",
  "Browse the app gallery →": "浏览应用库 →",
  "Browse the app gallery": "浏览应用库",
  "Start building →": "开始构建 →",
  "Start building": "开始构建",
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
  "Build an Android app": "构建 Android 应用",
  "Create a native app with Kotlin and the Android SDK": "使用 Kotlin 和 Android SDK 创建原生应用",

  // === Build 能力卡片描述 ===
  "Natural-sounding speech with Gemini TTS": "使用 Gemini TTS 生成自然语音",
  "AI music generation with Lyria": "使用 Lyria 进行 AI 音乐生成",
  "Firestore & Auth with Firebase": "Firebase 的 Firestore 与身份验证",
  "Fast image generation & editing with Nano Banana 2": "使用 Nano Banana 2 快速生成和编辑图片",
  "Real-time voice with the Gemini Live API": "使用 Gemini Live API 进行实时语音",
  "Turn images into cinematic video with Veo 3": "使用 Veo 3 将图片转为电影感视频",
  "Access real-time info with Search Grounding": "通过搜索 Grounding 获取实时信息",
  "Access real-time info with Maps Grounding": "通过地图 Grounding 获取实时信息",
  "Studio-quality 4K images with Nano Banana Pro": "使用 Nano Banana Pro 生成影棚级 4K 图片",
  "The best Gemini model is chosen automatically": "自动选择最合适的 Gemini 模型",
  "Context-aware chat powered by Gemini": "由 Gemini 驱动的上下文感知聊天",
  "Text-to-video generation with Veo 3": "使用 Veo 3 进行文生视频",
  "Choose exact image aspect ratios": "选择精确的图片宽高比",
  "Upload & understand images with Gemini 3.1 Pro": "使用 Gemini 3.1 Pro 上传并理解图片",
  "Lightning-fast responses with Gemini 3.1 Flash-Lite": "使用 Gemini 3.1 Flash-Lite 获得闪电般的快速响应",
  "Summarize & extract info from video with Gemini 3.1 Pro": "使用 Gemini 3.1 Pro 汇总和提取视频信息",
  "Audio transcription with Gemini 3.5 Transcribe": "使用 Gemini 3.5 Transcribe 转录音频",
  "Extended reasoning for complex queries with Gemini 3.1 Pro": "使用 Gemini 3.1 Pro 对复杂查询进行深度推理",

  // === Google 集成描述（Build 页集成卡片） ===
  "Access Drive files and folders": "访问云端硬盘文件和文件夹",
  "Transform your spreadsheet data": "转换你的电子表格数据",
  "Manage emails with code": "用代码管理邮件",
  "Create & manage events": "创建和管理活动",
  "Build custom Google Docs workflows": "构建自定义 Google 文档工作流",
  "Integrate your slide decks": "集成你的演示文稿",
  "Create and manage tasks": "创建和管理任务",
  "Read and summarize Chat spaces": "读取和汇总 Chat 空间",
  "Collect responses simply & effectively": "简单高效地收集回复",
  "Organize ideas and notes": "整理想法和笔记",
  "Streamline video meeting workflows": "简化视频会议工作流",
  "Sync & manage your contacts": "同步和管理联系人",

  // === Build 新手引导弹窗 ===
  "An updated flow for using Gemini in your apps": "在应用中使用 Gemini 的全新流程",
  "We've improved how AI Studio Build manages your Gemini API usage. Your API key is now attached automatically to your apps. You can view or manage your key in the Secrets panel.": "我们改进了 AI Studio Build 管理 Gemini API 用量的方式。你的 API 密钥现在会自动关联到应用，可在 Secrets 面板中查看或管理。",
  "Usage and costs": "用量与费用",
  "When sharing your apps with others, API calls count toward your usage limits. If you use paid models, costs may apply. We'll give you a heads-up during setup and before you share if your app could incur costs.": "与他人分享应用时，API 调用计入你的用量限额。使用付费模型可能产生费用。如果应用可能产生费用，我们会在设置过程中和分享前提醒你。",

  // === Gallery 应用库 ===
  "All apps": "全部应用",
  "Games and Visualizations": "游戏与可视化",
  "Multimodal understanding": "多模态理解",
  "Tools and MCP": "工具与 MCP",
  "Code gen": "代码生成",
  "Developer quickstarts": "开发者快速入门",
  "API key needed": "需要 API 密钥",
  "Gemini 3.8 Flash is here": "Gemini 3.8 Flash 闪亮登场",
  "Gemini 3.8 Flash just launched, bringing noticeable improvements to both output quality and the overall builder experience in Google AI Studio.": "Gemini 3.8 Flash 刚刚发布，在输出质量和 Google AI Studio 的整体构建体验上都有显著提升。",

  // === 模型选择面板 ===
  "Model selection": "模型选择",
  "Model carousel": "模型轮播",
  "Search for a model or agent": "搜索模型或智能体",
  "Star model": "收藏模型",
  "See model card": "查看模型卡片",
  "All": "全部",
  "Featured": "精选",
  "Images": "图像",
  "Music": "音乐",
  "Live": "实时",
  "Paid": "付费",

  // === 主要模型描述 ===
  "Our most intelligent Flash model, engineered for long-horizon software engineering, autonomous agents, and complex enterprise workflows.": "我们最智能的 Flash 模型，专为长周期软件工程、自主智能体和复杂企业工作流而设计。",
  "Our fastest, most cost-effective 3.5 model for high-throughput execution.": "我们速度最快、性价比最高的 3.5 型号，适合高吞吐量任务。",
  "Our latest SOTA reasoning model with unprecedented depth and nuance, and powerful multimodal understanding and coding capabilities": "我们最新的 SOTA 推理模型，具备前所未有的深度和细腻度，以及强大的多模态理解和编码能力",
  "A real-time speech-to-speech translation model delivering low latency translation for 70+ languages.": "实时语音到语音翻译模型，为 70 多种语言提供低延迟翻译。",
  "Our most cost-efficient model, optimized for high-volume agentic tasks, translation, and simple data processing.": "我们最具成本效益的模型，针对大批量智能体任务、翻译和简单数据处理优化。",
  "Our legacy Flash model, providing baseline speed and intelligence.": "我们的旧版 Flash 模型，提供基准速度和智能。",
  "Our smallest and most cost effective image generation and editing model, built for at scale usage.": "我们最小、最具性价比的图像生成与编辑模型，专为大规模使用而构建。",
  "Pro-level visual intelligence with Flash-speed efficiency and reality-grounded generation capabilities.": "专业级视觉智能，兼具 Flash 级速度与基于现实的生成能力。",
  "State-of-the-art image generation and editing model.": "最先进的图像生成与编辑模型。",
  "Our specialized, high-accuracy speech-to-text model optimized for processing pre-recorded files and static payloads. Engineered to deliver deep, structured transcripts with rich archival metadata.": "我们专用的高精度语音转文本模型，针对预录制文件和静态负载优化，可提供带有丰富归档元数据的深度结构化转录。",
  "Our ultra-low latency, real-time streaming speech-to-text model. Engineered to transcribe live audio inputs on-the-fly with rapid-fire textual updates.": "我们的超低延迟实时流式语音转文本模型，可实时转录音频输入并快速输出文本。",
  "An alias to our latest Pro model which changes over time.": "指向我们最新 Pro 模型的别名，会随时间变化。",
  "An alias to our latest Flash model which changes over time.": "指向我们最新 Flash 模型的别名，会随时间变化。",
  "An alias to our latest Flash-Lite model which changes over time.": "指向我们最新 Flash-Lite 模型的别名，会随时间变化。",
  "Embodied reasoning model delivering advanced video understanding, spatial reasoning, multi-step tool orchestration, and multi-robot collaboration for robotics tasks.": "具身推理模型，为机器人任务提供先进的视频理解、空间推理、多步骤工具编排和多机器人协作。",
  "Production-ready generative video with keyframe control and scene extension. Bring text, image, and video references to life, seamlessly extend scenes up to 30 seconds, and upscale outputs up to 4K.": "支持关键帧控制和场景扩展的生产级视频生成。让文本、图片和视频参考焕发生机，可无缝将场景扩展至 30 秒，并将输出放大至 4K。",

  // === 相对时间 ===
  "just now": "刚刚",
  "a minute ago": "1 分钟前",
  "an hour ago": "1 小时前",
  "yesterday": "昨天"
};

// ==================== 2. 前缀规则 ====================
// 处理动态拼接文本，例如 "Release date: 9月 2, 2026"
const prefixRules = [
  ["Release date: ", "发布日期："],
  ["Knowledge cut off: ", "知识截止日期："],
  ["All context lengths", "所有上下文长度"],
  ["Points to ", "指向 "]
];

// ==================== 3. 正则规则 ====================
// 处理相对时间、分页、动态日期等（仅对短文本生效，避免误伤对话内容）
const regexRules = [
  [/^(\d+)\s+seconds?\s+ago$/, (m) => `${m[1]} 秒前`],
  [/^(\d+)\s+minutes?\s+ago$/, (m) => `${m[1]} 分钟前`],
  [/^(\d+)\s+hours?\s+ago$/, (m) => `${m[1]} 小时前`],
  [/^(\d+)\s+days?\s+ago$/, (m) => `${m[1]} 天前`],
  [/^(\d+)\s+weeks?\s+ago$/, (m) => `${m[1]} 周前`],
  [/^(\d+)\s+months?\s+ago$/, (m) => `${m[1]} 个月前`],
  [/^(\d+)\s+years?\s+ago$/, (m) => `${m[1]} 年前`],
  [/^([\d,]+)\s*[–-]\s*([\d,]+)\s+of\s+([\d,]+)$/, (m) => `第 ${m[1]}–${m[2]} 项，共 ${m[3]} 项`],
  [/^Created\s+(\d{4}年.*)$/, (m) => `创建于 ${m[1]}`],
  [/^Go to step\s+(\d+)$/, (m) => `前往步骤 ${m[1]}`]
];

// ==================== 4. token 兜底替换 ====================
// 整句匹配失败后，替换句中个别英文 token（无变化则返回 null）
const tokenRules = [
  [/Input:\s*\$/g, "输入：$"],
  [/Output:\s*\$/g, "输出：$"]
];

// ==================== 翻译核心（无 DOM 依赖，可在 Node.js 中单测） ====================

const CJK_RE = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/;
const APOSTROPHE_RE = /[\u2018\u2019']/g;

function containsChinese(s) {
  return CJK_RE.test(s);
}

function normalizeKey(s) {
  return s.replace(APOSTROPHE_RE, "'");
}

// 归一化撇号后的词典（弯撇号 ' 与直撇号 ' 互通）
const dictMap = new Map();
for (const [k, v] of Object.entries(dictionary)) {
  dictMap.set(normalizeKey(k), v);
}

function translateExact(text) {
  return dictMap.get(normalizeKey(text)) || null;
}

function applyTokens(text) {
  let out = text;
  for (const [re, rep] of tokenRules) {
    out = out.replace(re, rep);
  }
  return out === text ? null : out;
}

// 综合翻译入口：返回译文，无法翻译返回 null
function translateText(text) {
  const exact = translateExact(text);
  if (exact !== null) return exact;

  // 前缀规则（短文本限定）
  if (text.length <= 80) {
    for (const [prefix, translation] of prefixRules) {
      if (text.startsWith(prefix)) {
        const rest = text.slice(prefix.length);
        return translation + (applyTokens(rest) || rest);
      }
    }
    // 正则规则（短文本限定）
    for (const [re, fn] of regexRules) {
      const m = text.match(re);
      if (m) return fn(m);
    }
  }

  // token 兜底
  return applyTokens(text);
}

// ==================== DOM 引擎（浏览器专用） ====================

if (typeof document !== "undefined") {

  const TRANSLATABLE_ATTRS = ["placeholder", "aria-label", "title", "data-tooltip"];
  const ATTR_SELECTOR = TRANSLATABLE_ATTRS.map((a) => `[${a}]`).join(",");
  // 流式回复/长文本会随每次 characterData 变更被反复全量处理，导致 O(n²) 卡顿；
  // 超过此长度的文本视为内容（而非 UI 标签），跳过翻译。
  const MAX_TEXT_LEN = 300;

  function isEditable(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    return el.isContentEditable || /^(TEXTAREA|INPUT)$/.test(el.tagName || "");
  }

  // 翻译单个文本节点（保留首尾空白与图标前缀）
  function translateTextNode(node) {
    const original = node.nodeValue;
    if (!original || !original.trim()) return;
    if (original.length > MAX_TEXT_LEN) return; // 内容文本（流式回复等），跳过
    if (containsChinese(original)) return; // 已是中文（或已被翻译），防循环

    // 用户正在输入/编辑的区域内的文本跳过
    const parent = node.parentNode;
    if (isEditable(parent)) return;

    const core = original.trim();
    const leading = original.slice(0, original.length - original.trimStart().length);
    const trailing = original.slice(original.trimEnd().length);

    // 剥离前导装饰符号（如 "✦ "），翻译后加回
    let icon = "";
    let body = core;
    const iconMatch = body.match(/^(\u2726\s+|\u2726)/);
    if (iconMatch) {
      icon = iconMatch[0];
      body = body.slice(icon.length).trim();
    }

    if (body.length > MAX_TEXT_LEN) return;

    const translated = translateText(body);
    if (translated !== null) {
      node.nodeValue = leading + icon + translated + trailing;
    }
  }

  // 翻译元素的可翻译属性
  function translateElement(el) {
    for (const attr of TRANSLATABLE_ATTRS) {
      if (!el.hasAttribute || !el.hasAttribute(attr)) continue;
      const val = el.getAttribute(attr);
      if (!val || val.length > MAX_TEXT_LEN) continue;
      if (containsChinese(val)) continue;
      const core = val.trim();
      const translated = translateText(core);
      if (translated !== null) {
        el.setAttribute(attr, val.replace(core, translated));
      }
    }
  }

  // 遍历子树：翻译文本节点与带属性的元素
  function translateDOM(rootNode) {
    if (rootNode.nodeType === Node.TEXT_NODE) {
      translateTextNode(rootNode);
      return;
    }
    if (rootNode.nodeType !== Node.ELEMENT_NODE) return;

    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateTextNode(node);

    translateElement(rootNode);
    if (rootNode.querySelectorAll) {
      rootNode.querySelectorAll(ATTR_SELECTOR).forEach(translateElement);
    }
  }

  // 初始遍历页面现有 DOM
  translateDOM(document.body);

  // —— 性能优化：批处理 + 去重 ——
  // 每次 mutation 立即翻译会导致同一批节点被反复处理；改为收集待处理集合，
  // 用 requestAnimationFrame 每帧最多处理一次，且同一节点一帧内只处理一遍。
  const pendingText = new Set();
  const pendingEls = new Set();
  const pendingRoots = new Set();
  let scheduled = false;

  function flush() {
    scheduled = false;
    pendingText.forEach(translateTextNode);
    pendingEls.forEach(translateElement);
    pendingRoots.forEach((root) => {
      if (root.isConnected) translateDOM(root);
    });
    pendingText.clear();
    pendingEls.clear();
    pendingRoots.clear();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(flush);
  }

  // 监听动态内容（SPA 关键）：
  //   childList      — 新增节点
  //   characterData  — Angular 直接改写文本节点（改回英文后自动重译）
  //   attributes     — 动态写入的 placeholder / aria-label / title
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        pendingText.add(mutation.target);
      } else if (mutation.type === "attributes") {
        if (mutation.target && mutation.target.nodeType === Node.ELEMENT_NODE) {
          pendingEls.add(mutation.target);
        }
      } else if (mutation.type === "childList") {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            pendingText.add(node);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            pendingRoots.add(node);
          }
        }
      }
    }
    schedule();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: TRANSLATABLE_ATTRS
  });
}
