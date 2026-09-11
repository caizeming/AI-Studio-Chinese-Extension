// 词典命中率测试：用实际从 AI Studio 页面抓取的英文文本验证 translateText
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "content.js"), "utf8");
// 只执行 DOM 引擎之前的部分（词典 + 纯翻译函数）
const logic = src.split("if (typeof document !==")[0];
eval(logic);

const samples = [
  // Playground 页面
  "Skip to main content", "Explore", "History", "New app", "My apps",
  "Upgrade to unlock more", "Access higher limits, Pro models, and more.",
  "Link an API key to unlock Antigravity Agent Preview",
  "Antigravity Agent Preview is available via an API key. Link an API key to get started.",
  "Drop files here",
  "This agent can execute code, take real actions, and use large number of tokens. You can stop the agent at any time.",
  "Set up token cap", "Insert images or files", "No API key selected", "Open tools menu",
  "Speech to text", "Share prompt", "New chat",
  // Run settings
  "Reset default settings", "Close run settings panel", "Select primary model",
  "A general-purpose autonomous agent running in a remote, Google-hosted Linux environment.",
  "Selected model", "Select Antigravity agent harness model",
  "Expand or collapse tools", "Expand or collapse environment settings",
  "Each execution spins up an isolated environment where your agent can run code and manage files.",
  "Get SDK code to chat with Gemini", "Developer docs",
  "This model requires a paid API key to use. Please select an API key.",
  // 环境设置
  "Environment", "Type", "New", "Existing", "Sources", "Add sources", "Network", "Add rules",
  "Sources to be mounted in the environment", "Network configuration for the environment",
  "The type of environment to use",
  // 通知设置（aria）
  "Enable applet notifications", "Disable autocomplete suggestions while typing",
  "Submit: Ctrl + Enter Newline: Enter", "Submit: Enter Newline: Shift + Enter",
  // Cookie
  "Google AI Studio uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic.",
  "Learn more", "OK, got it",
  // 工具提示
  "Lets Gemini use code to solve complex tasks", "Use Google Search", "Browse the url context",
  "Filesystem tools are always enabled for this agent",
  // 价格
  "API pricing per 1M tokens. Usage in AI Studio UI is free of charge when no API key is selected",
  "API pricing per 1M tokens. Audio tokens correspond to 25 tokens per second of audio. Equivalent to $0.0368 per minute. Usage in AI Studio UI is free of charge when no API key is selected",
  "API pricing per 1M tokens.",
  "Image output is priced at $120 per 1,000,000 tokens. Output images up to 1024x1024px consume 1120 tokens and are equivalent to $0.134 per image.",
  "Video output price is equivalent to $0.10 per second of video (720p)",
  // 更多操作菜单
  "Already in a new chat", "Temporary chat", "Show conversation without markdown formatting",
  "You need to create and run a prompt in order to share it", "Compare mode",
  "Moves to Google Drive Trash (Permanently deleted after 30 days)",
  // Library 页面
  "My files", "Shared", "Name", "Updated", "Created by you", "Sort",
  // 404 页面
  "Page not found", "Check that the URL was entered correctly and try again", "Go to library",
  // Build 页面
  "An updated flow for using Gemini in your apps",
  "We've improved how AI Studio Build manages your Gemini API usage. Your API key is now attached automatically to your apps. You can view or manage your key in the Secrets panel.",
  "Usage and costs",
  "When sharing your apps with others, API calls count toward your usage limits. If you use paid models, costs may apply. We'll give you a heads-up during setup and before you share if your app could incur costs.",
  "Skip", "Next", "Suggest an app", "Add files",
  "Import a GitHub repository as an app", "Add files from Google Drive",
  "Insert files (text, images, audio, video) into your prompt.",
  "Take a picture and insert it into your prompt.",
  "Build an Android app", "Remix this app", "Create a native app with Kotlin and the Android SDK",
  "Natural-sounding speech with Gemini TTS", "AI music generation with Lyria",
  "Firestore & Auth with Firebase", "Fast image generation & editing with Nano Banana 2",
  "Real-time voice with the Gemini Live API", "Turn images into cinematic video with Veo 3",
  "Access real-time info with Search Grounding", "Studio-quality 4K images with Nano Banana Pro",
  "Access Drive files and folders", "Transform your spreadsheet data", "Manage emails with code",
  "Create & manage events", "Build custom Google Docs workflows", "Integrate your slide decks",
  "Create and manage tasks", "Read and summarize Chat spaces",
  "Collect responses simply & effectively", "Organize ideas and notes",
  "Streamline video meeting workflows", "Sync & manage your contacts",
  // Gallery
  "All apps", "Games and Visualizations", "Multimodal understanding", "Tools and MCP",
  "Code gen", "Developer quickstarts", "API key needed",
  "Gemini 3.8 Flash is here",
  "Gemini 3.8 Flash just launched, bringing noticeable improvements to both output quality and the overall builder experience in Google AI Studio.",
  "Start building",
  // My apps
  "Apps", "By you", "Recents", "By others", "Explore gallery", "Create new app", "Pin",
  // 模型面板
  "Model carousel", "Star model", "Copy to clipboard", "See model card",
  "Our most intelligent Flash model, engineered for long-horizon software engineering, autonomous agents, and complex enterprise workflows.",
  "Our fastest, most cost-effective 3.5 model for high-throughput execution.",
  "Our latest SOTA reasoning model with unprecedented depth and nuance, and powerful multimodal understanding and coding capabilities",
  "A real-time speech-to-speech translation model delivering low latency translation for 70+ languages.",
  "An alias to our latest Pro model which changes over time.",
  "State-of-the-art image generation and editing model.",
  // Settings 菜单
  "User settings", "Other products", "Account status",
  "View AI Studio and Gemini status page",
  // 弯撇号变体
  "What's new", "I'm feeling lucky",
  // 动态文本（前缀/正则）
  "Release date: 9月 2, 2026", "Knowledge cut off: 1月 2025", "Go to step 1", "Go to step 2",
  "4 months ago", "2 hours ago", "1 – 1 of 1", "10 – 20 of 137",
  "All context lengths • Input: $0.30 / Output: $2.50",
  "<=200K tokens • Input: $2.00 / Output: $12.00",
  "Points to gemini-3.8-flash",
  "Created 2026年5月4日",
  "Items per page:",
  // 换行归一的动态文本（引擎 normalizeKey 会把 \n 归一化为空格）
  "Submit: Ctrl + Enter\nNewline: Enter",
  "Submit: Enter\nNewline: Shift + Enter",
  "API pricing per 1M tokens.\nUsage in AI Studio UI is free of charge when no API key is selected",
  "Antigravity Agent Preview",
  "Google Search",
  // 图标按钮 aria-label / 工具提示
  "More options", "Show agent disclaimer", "Scroll left", "Select library view",
  "Open in Drive", "Click to clear search query",
  "Learn more about how Google uses cookies. Opens in a new tab.",
  "Search (Ctrl /)",
];

// 不应被翻译的内容（防误伤检查）
const noTranslate = [
  "gemini-3.8-flash", "serein1346790@gmail.com", "Google AI Studio",
  "Gemini 3.8 Flash", "Nano Banana Pro", "Lyria 3.5",
];

let hit = 0, miss = [];
for (const s of samples) {
  const r = translateText(s);
  if (r !== null && !containsChinese(s)) {
    if (!containsChinese(r)) { miss.push(`[译文无中文] ${s} -> ${r}`); continue; }
    hit++;
  } else if (r === null) {
    miss.push(s);
  }
}

let falsePositive = [];
for (const s of noTranslate) {
  const r = translateText(s);
  if (r !== null) falsePositive.push(`${s} -> ${r}`);
}

console.log(`命中率: ${hit}/${samples.length} (${(hit / samples.length * 100).toFixed(1)}%)`);
if (miss.length) {
  console.log("\n未翻译:");
  miss.forEach((s) => console.log("  - " + s));
}
if (falsePositive.length) {
  console.log("\n误翻译(不应翻而翻了):");
  falsePositive.forEach((s) => console.log("  - " + s));
}

// 动态文本效果展示
console.log("\n动态文本效果:");
["Release date: 9月 2, 2026", "4 months ago", "1 – 1 of 1",
 "All context lengths • Input: $0.30 / Output: $2.50",
 "Points to gemini-3.8-flash", "Go to step 2", "Created 2026年5月4日"].forEach((s) => {
  console.log(`  "${s}" -> "${translateText(s)}"`);
});
