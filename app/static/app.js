const I18N = {
  zh: {
    appSubtitle: "图形化设计 Freqtrade 策略文件：用三步引导选择策略起点，高级设计细节默认折叠；本应用只生成策略文件，不执行回测。",
    langLabel: "Language",
    helpModeLabel: "Explanation mode",
    themeLabel: "Theme",
    brief: "Brief",
    detailed: "Detailed",
    light: "Light",
    dark: "Dark",
    outputDir: "输出目录：",
    chooseOutput: "选择输出路径",
    manualOutputPath: "手动输入输出路径",
    manualOutputPlaceholder: "/app/data/my-strategies 或 freqtrade/user_data/strategies",
    manualOutputHelp: "Olares 中建议先在 Strategy Builder 内生成并下载，再上传到目标 Freqtrade 应用；相对路径会自动解析到 /app/data。",
    search: "搜索",
    category: "分类",
    regime: "行情",
    tag: "标签",
    favoritesOnly: "只看收藏",
    recentFirst: "最近使用优先",
    step1: "1. 选择市场假设",
    step2: "2. 参数配置",
    step3: "3. 代码预览",
    step4: "4. 已生成策略",
    step5: "5. 版本历史",
    notes: "备注",
    notesPlaceholder: "可选：记录用途、假设或版本说明",
    saveNewVersion: "保存为新版本",
    overwrite: "覆盖同名文件",
    preview: "预览代码",
    generate: "生成并保存",
    refresh: "刷新列表",
    filename: "文件名",
    template: "模板",
    version: "版本",
    size: "大小",
    updated: "更新时间",
    actions: "操作",
    view: "查看",
    delete: "删除",
    versions: "版本",
    noStrategies: "暂无策略文件。",
    noVersions: "请选择一个策略查看版本历史。",
    noResults: "没有符合筛选条件的策略模板。",
    noTemplate: "请先选择一个策略模板。",
    notGenerated: "未生成",
    loading: "加载中...",
    previewing: "正在生成预览...",
    previewOk: "预览成功",
    generating: "正在保存策略文件...",
    generateOk: "策略文件已保存",
    generatedTo: "已保存到",
    selectedDir: "已切换输出路径",
    confirmDelete: "确定删除这个策略文件吗？",
    all: "全部",
    clearTag: "清除标签筛选",
    traditionalMode: "传统策略",
    selfBuildMode: "自组策略",
    traditionalBadge: "传统",
    selfBuildBadge: "自组",
    traditionalModeDesc: "使用整理好的经典模板，适合快速开始。",
    selfBuildModeDesc: "逐步配置 Entry crossover、Exit crossover 和 Filters。",
    modeOverviewTraditionalTitle: "传统策略",
    modeOverviewTraditionalBody: "适合希望快速开始的用户。你可以从均线、均值回归、突破等经典模板中选择一个稳妥的起点。",
    modeOverviewCustomTitle: "自组策略",
    modeOverviewCustomBody: "这一版支持多种构成方法：crossover、threshold、breakout、score-based、regime switch、volatility adaptive、confirmation layer、exit composer，以及信号堆叠 builder。",
    modeOverviewCustomExample: "示例包含经典金叉和多信号动量确认策略。",
    customBuilderBadge: "模块化自组",
    customBuilderTitle: "自组策略",
    customBuilderBody: "本版本新增确认层、退出逻辑、信号堆叠等构建器，仍然只生成策略文件，不执行回测。",
    summaryTitle: "策略摘要",
    summaryMode: "模式",
    summaryTemplate: "模板",
    summaryOutput: "输出文件",
    summaryEntry: "入场模块",
    summaryExit: "出场模块",
    summaryFilters: "过滤器",
    summaryNoFilters: "未启用额外过滤器",
    summaryGeneral: "配置概览",
    designBoardTitle: "策略设计板",
    designEntry: "入场逻辑",
    designExit: "退出逻辑",
    designRisk: "风险层",
    designWeakness: "潜在弱点",
    developmentNotes: "开发提示",
    activeModules: "启用模块",
    autoPreviewHint: "代码预览只会在点击“预览代码”或“显示代码预览”后显示。",
    detailTitle: "策略说明",
    principleTitle: "原理说明",
    categoryTitle: "分类",
    regimeTitle: "适用行情",
    riskTitle: "风险等级",
    tagsTitle: "标签",
    fieldMeaningTitle: "参数说明",
    numberMeaningTitle: "当前值含义",
    tuningHintTitle: "调参提示",
    guideKicker1: "步骤 01",
    guideKicker2: "步骤 02",
    guideKicker3: "步骤 03",
    guideTitle1: "选择市场假设",
    guideTitle2: "选择信号风格",
    guideTitle3: "选择谨慎程度",
    guideBody1: "先判断你是在设计趋势、震荡、突破，还是自适应策略。",
    guideBody2: "选择 crossover、均值回归、突破、打分或行情切换信号。",
    guideBody3: "系统会推荐合适模板；高级确认层和退出层默认折叠。",
    folderTitle: "选择输出路径",
    roots: "可选根目录",
    useDir: "使用此目录",
    download: "下载文件",
    downloadPreview: "下载预览",
    showPreview: "显示代码预览",
    hidePreview: "隐藏代码预览",
    previewHiddenTitle: "代码预览已隐藏",
    previewHiddenBody: "点击“显示代码预览”后再查看生成的 Python 文件，避免代码区占据页面空间。",
    batchTitle: "批量生成（可选）",
    batchEnabled: "启用批量模式",
    addSweep: "+ 添加参数扫描",
    batchPreview: "预览批量结果",
    batchGenerate: "批量生成",
    sweepField: "参数",
    sweepStart: "起始值",
    sweepEnd: "结束值",
    sweepStep: "步长",
    remove: "删除",
    batchEmpty: "请至少添加一个参数扫描。",
    batchPreviewOk: "批量预览完成",
    batchGenerateOk: "批量生成完成",
    batchCount: "预计生成数量",
    workbenchKicker: "Guided mode",
    workbenchTitle: "Guided Strategy Selection",
    workbenchSubtitle: "先定义策略假设、行情环境、信号结构、确认层和风险层，再选择模板并选择谨慎程度。",
    workbenchMarket: "你在设计什么市场环境？",
    workbenchSignal: "你想用什么信号风格？",
    workbenchConfirmation: "3. 确认层",
    workbenchRisk: "你希望策略多谨慎？",
    workbenchApply: "推荐并选择模板",
    workbenchClear: "清除引导选择",
    workbenchRecommendationEmpty: "选择三步条件后，我会推荐 2–4 个适合的模板。",
    workbenchRecommendation: "推荐模板",
    workbenchRecommended: "推荐",
    workbenchNoMatch: "没有完全匹配的模板，我会保留最接近的可用起点。",
    logicSummaryTitle: "策略逻辑摘要",
    logicSuitable: "适用行情",
    logicStructure: "信号结构",
    logicConfirmations: "确认层",
    logicExitModules: "退出模块",
    logicSensitivity: "敏感度参数",
    logicRiskControl: "风险控制",
    logicOverfit: "调参风险",
    simpleBestFor: "适合",
    simpleEntry: "如何入场",
    simpleExit: "如何退出",
    simpleKnobs: "主要旋钮",
    simpleWatch: "注意事项",
    advancedDetails: "显示高级设计细节",
    advancedDetailsClose: "隐藏高级设计细节",
    advancedGuidedSummary: "显示高级筛选：确认层",
    riskPreferenceHelp: "这不是绩效评分，只用于推荐更合适的策略设计起点。",
    marketHelp: "不确定时可以选择“全部”，然后从推荐模板开始。",
    signalHelp: "趋势、均值回归、突破、打分和行情切换代表不同策略假设。",
    categoryLabels: { trend: "趋势", mean_reversion: "均值回归", breakout: "突破", grid: "网格", momentum: "动量", custom: "自定义构建", literature: "文献" },
    regimeLabels: { trending: "趋势行情", ranging: "震荡行情", breakout: "突破行情", intraday_range: "日内震荡", adaptive: "自适应" },
    riskLabels: { low: "低风险", medium: "中风险", high: "高风险" },
    beginnerRecommend: "不确定？推荐简单起点",
    comparisonTitle: "推荐模板比较",
    compareTemplate: "模板",
    compareBestFor: "适合",
    compareEntry: "入场风格",
    compareExit: "退出风格",
    compareComplexity: "复杂度",
    compareRisk: "谨慎程度",
    qualityAuditTitle: "设计审查",
    designClarity: "清晰度",
    signalType: "信号类型",
    mainDependency: "主要依赖",
    bestUserLevel: "适合用户",
    riskStrictness: "风险严格度",
    presetTitle: "Preset 起点",
    presetBody: "选择简单、平衡、防守、保守、激进或探索型参数起点。Preset 不是优化结果，只是减少手动配置压力。",
    presetBalanced: "平衡：使用模板默认值",
    presetConservative: "保守：更平滑、更严格、更少噪声",
    presetAggressive: "激进：更敏感、更快响应",
    applyPreset: "应用 preset",
    presetApplied: "已应用 preset。请检查参数后再生成策略。",
    draftNoteTitle: "策略草稿说明",
    draftNotePrefix: "这个文件的设计目的",
    simpleStartNote: "建议先从简单模板开始，确认入场和退出逻辑后再增加过滤器。",
    groupLabels: { identity: "基础信息", general: "通用设置", data: "数据要求", signal: "信号设置", execution: "执行假设", entry: "入场设置", exit: "退出设置", parameters: "核心参数", score: "信号打分", filters: "确认 / 过滤器", risk: "风险与退出", pullback: "回撤模块", squeeze: "波动压缩模块", confirmation: "确认模块", risk_layer: "风险层", volatility: "波动率模块", liquidity: "流动性", regime: "行情环境", logic: "逻辑组合", quality: "入场质量" },
  },
  en: {
    appSubtitle: "Design Freqtrade strategy files visually with a three-step guided mode; advanced design details stay folded by default. This app only generates strategy files.",
    langLabel: "Language",
    helpModeLabel: "Explanation mode",
    themeLabel: "Theme",
    brief: "Brief",
    detailed: "Detailed",
    light: "Light",
    dark: "Dark",
    outputDir: "Output folder:",
    chooseOutput: "Choose output folder",
    manualOutputPath: "Manual output path",
    manualOutputPlaceholder: "/app/data/my-strategies or freqtrade/user_data/strategies",
    manualOutputHelp: "In Olares, generate inside Strategy Builder, then download and upload the .py file into the target Freqtrade app. Relative output paths are resolved under /app/data.",
    search: "Search",
    category: "Category",
    regime: "Market",
    tag: "Tag",
    favoritesOnly: "Favorites only",
    recentFirst: "Recent first",
    step1: "1. Choose strategy template",
    step2: "2. Configure parameters",
    step3: "3. Code preview",
    step4: "4. Generated strategies",
    step5: "5. Version history",
    notes: "Notes",
    notesPlaceholder: "Optional: use case, assumptions, or version notes",
    saveNewVersion: "Save as new version",
    overwrite: "Overwrite existing file",
    preview: "Preview code",
    generate: "Generate and save",
    refresh: "Refresh list",
    filename: "Filename",
    template: "Template",
    version: "Version",
    size: "Size",
    updated: "Updated",
    actions: "Actions",
    view: "View",
    delete: "Delete",
    versions: "Versions",
    noStrategies: "No strategy files yet.",
    noVersions: "Choose a strategy to inspect version history.",
    noResults: "No matching templates.",
    noTemplate: "Choose market hypothesis first.",
    notGenerated: "Not generated",
    loading: "Loading...",
    previewing: "Generating preview...",
    previewOk: "Preview ready",
    generating: "Saving strategy file...",
    generateOk: "Strategy file saved",
    generatedTo: "Saved to",
    selectedDir: "Output folder updated",
    confirmDelete: "Delete this strategy file?",
    all: "All",
    clearTag: "Clear tag filter",
    traditionalMode: "Traditional strategies",
    selfBuildMode: "Custom builder",
    traditionalBadge: "Traditional",
    selfBuildBadge: "Custom",
    traditionalModeDesc: "Use curated classic templates for a fast start.",
    selfBuildModeDesc: "Configure Entry crossover, Exit crossover, and Filters step by step.",
    modeOverviewTraditionalTitle: "Traditional strategies",
    modeOverviewTraditionalBody: "Best for users who want a quick and stable starting point. Choose from trend, mean reversion, breakout, and other curated templates.",
    modeOverviewCustomTitle: "Custom builder",
    modeOverviewCustomBody: "This version supports several construction methods, including crossover, threshold, breakout, score-based, regime-switch, volatility-adaptive, confirmation-layer, exit-composer, and signal-stack builders.",
    modeOverviewCustomExample: "Examples now include classic golden cross and multi-signal momentum confirmation.",
    customBuilderBadge: "Modular custom",
    customBuilderTitle: "Custom Builder",
    customBuilderBody: "This version adds confirmation-layer, exit-logic, and signal-stack builders while still only generating strategy files and never running backtests.",
    summaryTitle: "Strategy summary",
    summaryMode: "Mode",
    summaryTemplate: "Template",
    summaryOutput: "Output file",
    summaryEntry: "Entry block",
    summaryExit: "Exit block",
    summaryFilters: "Filters",
    summaryNoFilters: "No extra filters enabled",
    summaryGeneral: "Configuration overview",
    designBoardTitle: "Strategy design board",
    designEntry: "Entry logic",
    designExit: "Exit logic",
    designRisk: "Risk layer",
    designWeakness: "Potential weakness",
    developmentNotes: "Development notes",
    activeModules: "Active modules",
    autoPreviewHint: "Code preview appears only after you click Preview code or Show code preview.",
    detailTitle: "Strategy description",
    principleTitle: "Principle",
    categoryTitle: "Category",
    regimeTitle: "Best regime",
    riskTitle: "Risk level",
    tagsTitle: "Tags",
    fieldMeaningTitle: "Field meaning",
    numberMeaningTitle: "Current value means",
    tuningHintTitle: "Tuning hint",
    guideKicker1: "Step 01",
    guideKicker2: "Step 02",
    guideKicker3: "Step 03",
    guideTitle1: "Choose market hypothesis",
    guideTitle2: "Choose signal style",
    guideTitle3: "Choose caution level",
    guideBody1: "Start by choosing the market assumption: trend, range, breakout, or adaptive.",
    guideBody2: "Choose a signal style such as crossover, mean reversion, breakout, score, or regime switch.",
    guideBody3: "The app recommends suitable templates while advanced details stay folded by default.",
    folderTitle: "Choose output folder",
    roots: "Available roots",
    useDir: "Use this folder",
    download: "Download file",
    downloadPreview: "Download preview",
    showPreview: "Show code preview",
    hidePreview: "Hide code preview",
    previewHiddenTitle: "Code preview is hidden",
    previewHiddenBody: "Click “Show code preview” to inspect the generated Python file only when needed.",
    batchTitle: "Batch generation (optional)",
    batchEnabled: "Enable batch mode",
    addSweep: "+ Add parameter sweep",
    batchPreview: "Preview batch",
    batchGenerate: "Generate batch",
    sweepField: "Field",
    sweepStart: "Start",
    sweepEnd: "End",
    sweepStep: "Step",
    remove: "Remove",
    batchEmpty: "Add at least one sweep row first.",
    batchPreviewOk: "Batch preview ready",
    batchGenerateOk: "Batch generation complete",
    batchCount: "Estimated files",
    workbenchKicker: "Guided mode",
    workbenchTitle: "Guided Strategy Selection",
    workbenchSubtitle: "Answer three simple questions first; advanced design details are folded by default to reduce clutter.",
    workbenchMarket: "What market are you designing for?",
    workbenchSignal: "What signal style do you want?",
    workbenchConfirmation: "3. Confirmation layer",
    workbenchRisk: "How cautious should it be?",
    workbenchApply: "Recommend and select",
    workbenchClear: "Clear guided choices",
    workbenchRecommendationEmpty: "Choose the three conditions and I will recommend 2–4 suitable templates.",
    workbenchRecommendation: "Recommended template",
    workbenchRecommended: "Recommended",
    workbenchNoMatch: "No exact match; I will keep the closest available starting point.",
    logicSummaryTitle: "Strategy logic summary",
    logicSuitable: "Suitable market",
    logicStructure: "Signal structure",
    logicConfirmations: "Confirmation layers",
    logicExitModules: "Exit modules",
    logicSensitivity: "Sensitivity controls",
    logicRiskControl: "Risk control",
    logicOverfit: "Tuning risk",
    simpleBestFor: "Best for",
    simpleEntry: "How it enters",
    simpleExit: "How it exits",
    simpleKnobs: "Main knobs",
    simpleWatch: "Things to watch",
    advancedDetails: "Show advanced design details",
    advancedDetailsClose: "Hide advanced design details",
    advancedGuidedSummary: "Show advanced filter: confirmation layer",
    riskPreferenceHelp: "This is not a performance score; it only helps choose a suitable design starting point.",
    marketHelp: "If unsure, choose All and start from the recommended templates.",
    signalHelp: "Trend, mean reversion, breakout, score, and regime switch express different hypotheses.",
    categoryLabels: { trend: "Trend", mean_reversion: "Mean reversion", breakout: "Breakout", grid: "Grid", momentum: "Momentum", custom: "Custom builder", literature: "Literature" },
    regimeLabels: { trending: "Trending", ranging: "Ranging", breakout: "Breakout", intraday_range: "Intraday range", adaptive: "Adaptive" },
    riskLabels: { low: "Low risk", medium: "Medium risk", high: "High risk" },
    beginnerRecommend: "Not sure? Recommend a simple start",
    comparisonTitle: "Recommended template comparison",
    compareTemplate: "Template",
    compareBestFor: "Best for",
    compareEntry: "Entry style",
    compareExit: "Exit style",
    compareComplexity: "Complexity",
    compareRisk: "Risk preference",
    qualityAuditTitle: "Design review",
    designClarity: "Clarity",
    signalType: "Signal type",
    mainDependency: "Main dependency",
    bestUserLevel: "Best user level",
    riskStrictness: "Risk strictness",
    presetTitle: "Preset starting point",
    presetBody: "Choose a simple, balanced, defensive, conservative, aggressive, or exploratory starting point. Presets are not optimized results.",
    presetBalanced: "Balanced: use template defaults",
    presetConservative: "Conservative: smoother, stricter, and less noisy",
    presetAggressive: "Aggressive: more sensitive and faster to react",
    applyPreset: "Apply preset",
    presetApplied: "Preset applied. Review the parameters before generating.",
    draftNoteTitle: "Strategy draft note",
    draftNotePrefix: "Purpose of this draft",
    simpleStartNote: "Start with a simple template, verify entry and exit logic, and add filters only after the first draft is clear.",
    groupLabels: { identity: "Identity", general: "General", data: "Data Requirements", signal: "Signal", execution: "Execution Assumptions", entry: "Entry settings", exit: "Exit settings", parameters: "Core parameters", score: "Signal scoring", filters: "Filters", risk: "Risk layer", pullback: "Pullback module", squeeze: "Squeeze breakout module", confirmation: "Confirmation module", risk_layer: "Risk layer", volatility: "Volatility module", liquidity: "Liquidity", logic: "Logic composition", quality: "Entry quality" },
  }
};

const TAG_HELP = {
  crossover: { zh: "通过两条指标线交叉来定义信号。", en: "Signals are defined by one indicator line crossing another." },
  ema: { zh: "指数移动平均，对新价格更敏感。", en: "Exponential moving average, more responsive to recent prices." },
  golden_cross: { zh: "经典趋势信号，短期均线上穿长期均线。", en: "Classic trend signal where a shorter average crosses above a longer one." },
  builder: { zh: "可自由配置的策略构建模板。", en: "A configurable template meant for custom strategy building." },
  threshold: { zh: "阈值触发逻辑，不依赖交叉。", en: "Threshold-triggered logic that does not require a crossover." },
  score: { zh: "多个信号加权打分后再决定入场。", en: "Multiple signals are weighted into a total score before entry." },
  regime: { zh: "先判断行情环境，再决定是否启用策略。", en: "Checks the market environment before enabling a strategy." },
  multi_signal: { zh: "多个确认信号共同决定交易。", en: "Several confirmation signals are combined before trading." },
  filters: { zh: "额外过滤条件，用来减少低质量信号。", en: "Additional conditions used to filter out lower-quality signals." },
  pullback: { zh: "顺势策略中的回撤再入场逻辑。", en: "A continuation setup that waits for a pullback before re-entry." },
  squeeze: { zh: "波动收缩后等待价格突破。", en: "Waits for volatility compression before a directional breakout." },
  layered: { zh: "多层确认后才触发信号。", en: "Requires several confirmation layers before triggering a signal." },
  risk_layer: { zh: "独立风险退出层，不改变入场逻辑。", en: "A separate risk-exit layer that does not change the entry logic." },
  adaptive: { zh: "根据环境或波动状态动态调整逻辑。", en: "Adapts logic based on market state or volatility." },
};

const WORKBENCH_OPTIONS = {
  market: [
    ["", { zh: "全部", en: "All" }],
    ["trending", { zh: "趋势行情", en: "Trending" }],
    ["ranging", { zh: "震荡行情", en: "Ranging" }],
    ["breakout", { zh: "突破行情", en: "Breakout" }],
    ["adaptive", { zh: "自适应/多环境", en: "Adaptive / multi-regime" }],
  ],
  signal: [
    ["", { zh: "全部", en: "All" }],
    ["trend", { zh: "趋势 / crossover", en: "Trend / crossover" }],
    ["mean_reversion", { zh: "均值回归", en: "Mean reversion" }],
    ["breakout", { zh: "突破 / channel", en: "Breakout / channel" }],
    ["score", { zh: "打分 / voting", en: "Score / voting" }],
    ["regime", { zh: "行情切换", en: "Regime switch" }],
  ],
  confirmation: [
    ["", { zh: "不限", en: "Any" }],
    ["volume", { zh: "成交量确认", en: "Volume confirmation" }],
    ["rsi", { zh: "RSI 确认", en: "RSI confirmation" }],
    ["adx", { zh: "ADX 趋势强度", en: "ADX strength" }],
    ["volatility", { zh: "波动率 / ATR", en: "Volatility / ATR" }],
    ["squeeze", { zh: "波动压缩", en: "Volatility compression" }],
  ],
  risk: [
    ["", { zh: "不限", en: "Any" }],
    ["low", { zh: "更谨慎", en: "More cautious" }],
    ["medium", { zh: "平衡", en: "Balanced" }],
    ["high", { zh: "更激进", en: "More aggressive" }],
  ],
};

const SELF_BUILD_STUDIO_OPTIONS = {
  recipe: [
    ["starter", { zh: "Starter：先生成简单 v1", en: "Starter: simple v1" }],
    ["trend_pullback", { zh: "趋势回撤配方", en: "Trend pullback recipe" }],
    ["momentum_breakout", { zh: "动量突破配方", en: "Momentum breakout recipe" }],
    ["range_recovery", { zh: "震荡反弹配方", en: "Range recovery recipe" }],
    ["volatility_guarded_trend", { zh: "波动保护趋势", en: "Volatility-guarded trend" }],
    ["hybrid_score", { zh: "混合打分配方", en: "Hybrid scoring recipe" }],
    ["futures_long_short", { zh: "期货多空配方", en: "Futures long-short recipe" }],
    ["market_router", { zh: "市场状态路由配方", en: "Market-state router recipe" }],
    ["confirmation_stack", { zh: "确认栈配方", en: "Confirmation stack recipe" }],
    ["exit_priority", { zh: "退出优先级配方", en: "Exit priority recipe" }],
    ["defensive_volatility", { zh: "防御波动守门配方", en: "Defensive volatility guard recipe" }],
    ["scenario_guard", { zh: "场景守门配方", en: "Scenario guard recipe" }],
    ["preset_pack", { zh: "Preset Pack 配方", en: "Preset pack recipe" }],
    ["proxy_confirmation", { zh: "多周期代理确认配方", en: "Proxy confirmation recipe" }],
    ["deconfliction", { zh: "信号冲突消解配方", en: "Signal deconfliction recipe" }],
    ["alpha_stack", { zh: "Alpha Stack 配方", en: "Alpha stack recipe" }],
    ["liquidity_guard", { zh: "Liquidity Guard 配方", en: "Liquidity guard recipe" }],
    ["risk_budget", { zh: "Risk Budget 配方", en: "Risk budget recipe" }],
    ["staged_entry", { zh: "多阶段入场配方", en: "Staged entry recipe" }],
    ["handoff_ready", { zh: "Freqtrade Handoff 配方", en: "Freqtrade handoff recipe" }],
    ["futures_bias", { zh: "期货偏向路由配方", en: "Futures bias router recipe" }],
  ],
  base: [
    ["trend", { zh: "趋势 / EMA", en: "Trend / EMA" }],
    ["momentum", { zh: "动量 / MACD", en: "Momentum / MACD" }],
    ["recovery", { zh: "反弹 / RSI recovery", en: "Recovery / RSI" }],
    ["breakout", { zh: "突破 / channel", en: "Breakout / channel" }],
    ["hybrid", { zh: "混合 / component matrix", en: "Hybrid / component matrix" }],
    ["futures", { zh: "期货 / long-short", en: "Futures / long-short" }],
  ],
  confirmation: [
    ["light", { zh: "轻确认：少量过滤", en: "Light: few filters" }],
    ["balanced", { zh: "平衡确认：默认推荐", en: "Balanced: default" }],
    ["strict", { zh: "严格确认：更少信号", en: "Strict: fewer signals" }],
    ["volatility_aware", { zh: "波动感知：重点过滤 ATR", en: "Volatility-aware" }],
  ],
  exit: [
    ["opposite_signal", { zh: "反向信号退出", en: "Opposite signal" }],
    ["trend_trailing", { zh: "趋势跟踪退出", en: "Trend trailing" }],
    ["atr_protective", { zh: "ATR 保护退出", en: "ATR protective" }],
    ["composite", { zh: "组合退出", en: "Composite" }],
  ],
  risk: [
    ["simple", { zh: "简单：少组件", en: "Simple: fewer modules" }],
    ["balanced", { zh: "平衡：推荐起点", en: "Balanced starting point" }],
    ["cautious", { zh: "谨慎：更强过滤", en: "Cautious: stronger filters" }],
    ["exploratory", { zh: "探索：组件矩阵", en: "Exploratory: component matrix" }],
  ],
};

const STRATEGY_RECIPE_GALLERY = [
  {
    id: "starter_simple_trend",
    title: { zh: "Starter Simple Trend", en: "Starter Simple Trend" },
    bestFor: { zh: "第一次生成自组策略，先保持入场和退出逻辑清楚。", en: "First self-build draft where entry and exit logic should stay easy to explain." },
    entry: { zh: "使用一个主趋势信号，并只加入轻量确认。", en: "Use one primary trend signal with a light confirmation layer." },
    exit: { zh: "优先使用反向信号或简单趋势减弱退出。", en: "Prefer opposite-signal or simple trend-weakness exits." },
    risk: { zh: "适合做 v1 起点，不建议一开始打开太多过滤器。", en: "Best as a v1 starting point; avoid too many filters at first." },
    builderKey: "self_build_playbook_builder",
    studio: { recipe: "starter", base: "trend", confirmation: "light", exit: "opposite_signal", risk: "simple" }
  },
  {
    id: "trend_pullback_balanced",
    title: { zh: "Trend Pullback Balanced", en: "Trend Pullback Balanced" },
    bestFor: { zh: "趋势行情里等待回撤后再入场。", en: "Trending markets where entries wait for pullbacks." },
    entry: { zh: "趋势方向为主，RSI 或价格回撤作为入场质量过滤。", en: "Trend direction is primary, with RSI or price pullback as entry quality filter." },
    exit: { zh: "使用趋势减弱、反向信号或组合退出。", en: "Use trend weakening, opposite signal, or composite exits." },
    risk: { zh: "核心风险是回撤过浅或过滤太多导致信号很少。", en: "Main risk is shallow pullbacks or too many filters reducing signal frequency." },
    builderKey: "strategy_recipe_wizard_builder",
    studio: { recipe: "trend_pullback", base: "recovery", confirmation: "balanced", exit: "composite", risk: "balanced" }
  },
  {
    id: "momentum_breakout_guarded",
    title: { zh: "Momentum Breakout Guarded", en: "Momentum Breakout Guarded" },
    bestFor: { zh: "突破行情或波动扩张后的动量延续。", en: "Breakout markets or momentum continuation after volatility expansion." },
    entry: { zh: "要求突破信号，同时用成交量、ADX 或波动状态确认。", en: "Require breakout signal with volume, ADX, or volatility-state confirmation." },
    exit: { zh: "使用 ATR 保护或组合退出，避免假突破后长期停留。", en: "Use ATR protective or composite exits to avoid staying in failed breakouts." },
    risk: { zh: "重点关注假突破和过窄的突破窗口。", en: "Watch false breakouts and overly narrow breakout windows." },
    builderKey: "futures_breakout_guard_builder",
    studio: { recipe: "momentum_breakout", base: "breakout", confirmation: "strict", exit: "atr_protective", risk: "cautious" }
  },
  {
    id: "range_recovery_defensive",
    title: { zh: "Range Recovery Defensive", en: "Range Recovery Defensive" },
    bestFor: { zh: "震荡行情中的超卖反弹草稿。", en: "Oversold-recovery drafts in ranging markets." },
    entry: { zh: "用 RSI / Bollinger recovery 作为入场主逻辑，并避免追涨。", en: "Use RSI / Bollinger recovery as the main entry idea and avoid chasing." },
    exit: { zh: "价格回到中性区间或动量衰减时退出。", en: "Exit when price returns to neutral or momentum deteriorates." },
    risk: { zh: "不适合单边下跌行情，需要趋势保护或波动过滤。", en: "Not suitable for one-way selloffs without trend guards or volatility filters." },
    builderKey: "signal_quality_gate_builder",
    studio: { recipe: "range_recovery", base: "recovery", confirmation: "balanced", exit: "composite", risk: "cautious" }
  },
  {
    id: "volatility_guarded_trend",
    title: { zh: "Volatility-Guarded Trend", en: "Volatility-Guarded Trend" },
    bestFor: { zh: "趋势存在但波动不稳定的行情。", en: "Trending markets with unstable volatility." },
    entry: { zh: "先确认趋势，再用 ATR / 波动率过滤入场质量。", en: "Confirm trend first, then use ATR / volatility filters to control entry quality." },
    exit: { zh: "优先使用 ATR 保护退出和波动 cutoff。", en: "Prefer ATR protective exits and volatility cutoffs." },
    risk: { zh: "需要检查入场 ATR 上限和硬退出阈值之间是否留有空间。", en: "Review the gap between entry ATR ceiling and hard exit threshold." },
    builderKey: "adaptive_confirmation_router_builder",
    studio: { recipe: "volatility_guarded_trend", base: "trend", confirmation: "volatility_aware", exit: "atr_protective", risk: "cautious" }
  },
  {
    id: "futures_long_short_momentum",
    title: { zh: "Futures Long-Short Momentum", en: "Futures Long-Short Momentum" },
    bestFor: { zh: "期货工作流中需要多空结构草稿。", en: "Futures workflows that need a long-short strategy draft." },
    entry: { zh: "分别构建 enter_long 和 enter_short 动量条件。", en: "Create separate enter_long and enter_short momentum conditions." },
    exit: { zh: "分别管理多头和空头退出逻辑。", en: "Keep long-side and short-side exit logic separate." },
    risk: { zh: "杠杆、保证金、交易所设置仍必须在 Freqtrade 中处理。", en: "Leverage, margin, and exchange settings still belong inside Freqtrade." },
    builderKey: "futures_long_short_momentum_builder",
    studio: { recipe: "futures_long_short", base: "futures", confirmation: "balanced", exit: "composite", risk: "cautious" }
  }
  ,{
    id: "market_state_router_playbook",
    title: { zh: "Market State Router Playbook", en: "Market State Router Playbook" },
    bestFor: { zh: "不确定趋势、震荡或突破哪一种状态占优时。", en: "When it is unclear whether trend, range, or breakout state is dominant." },
    entry: { zh: "先判断市场状态，再选择趋势、反弹或突破路径。", en: "Detect market state first, then route to trend, recovery, or breakout path." },
    exit: { zh: "使用路径化退出和 ATR 保护。", en: "Use path-specific exits and ATR protection." },
    risk: { zh: "适合做本周新增的多环境自组基线。", en: "Useful as a new multi-regime self-build baseline." },
    builderKey: "market_state_router_builder",
    studio: { recipe: "market_router", base: "hybrid", confirmation: "balanced", exit: "composite", risk: "balanced" }
  },
  {
    id: "confirmation_stack_quality",
    title: { zh: "Confirmation Stack Quality", en: "Confirmation Stack Quality" },
    bestFor: { zh: "想把多个确认层做成清楚分数，而不是硬编码所有条件。", en: "When several confirmation layers should become an explainable score." },
    entry: { zh: "主触发 + 确认栈达到分数阈值。", en: "Primary trigger plus confirmation stack score threshold." },
    exit: { zh: "确认分衰减、趋势减弱或 ATR 保护退出。", en: "Exit on score deterioration, trend weakness, or ATR protection." },
    risk: { zh: "避免一开始打开太多 gate。", en: "Avoid enabling too many gates at first." },
    builderKey: "confirmation_stack_builder",
    studio: { recipe: "confirmation_stack", base: "hybrid", confirmation: "strict", exit: "composite", risk: "balanced" }
  },
  {
    id: "exit_priority_stack",
    title: { zh: "Exit Priority Stack", en: "Exit Priority Stack" },
    bestFor: { zh: "入场逻辑已经清楚，但退出逻辑需要更有层次。", en: "When entry logic is clear but exit logic needs better structure." },
    entry: { zh: "趋势 + RSI + ADX + 成交量入场。", en: "Trend + RSI + ADX + volume entry." },
    exit: { zh: "保护性退出、趋势退出、动量退出按优先级组织。", en: "Protective, trend, and momentum exits are organized by priority." },
    risk: { zh: "适合展示本周退出层升级。", en: "Useful for showing this week's exit-layer upgrade." },
    builderKey: "exit_priority_stack_builder",
    studio: { recipe: "exit_priority", base: "trend", confirmation: "balanced", exit: "composite", risk: "cautious" }
  },
  {
    id: "defensive_volatility_guard",
    title: { zh: "Defensive Volatility Guard", en: "Defensive Volatility Guard" },
    bestFor: { zh: "波动不稳定但仍希望顺势入场。", en: "Unstable volatility where trend entries still need quality control." },
    entry: { zh: "趋势信号后通过波动、成交量、距离和强度守门。", en: "Trend signal must pass volatility, volume, distance, and strength gates." },
    exit: { zh: "趋势反转、极端波动或 RSI 衰减退出。", en: "Exit on trend reversal, excessive volatility, or RSI deterioration." },
    risk: { zh: "这是偏防御的自组策略起点。", en: "This is a defensive self-build starting point." },
    builderKey: "defensive_volatility_guard_builder",
    studio: { recipe: "defensive_volatility", base: "trend", confirmation: "volatility_aware", exit: "atr_protective", risk: "cautious" }
  },
  {
    id: "scenario_guard_playbook",
    title: { zh: "Scenario Guard Playbook", en: "Scenario Guard Playbook" },
    bestFor: { zh: "希望把正常、压力、反弹和突破场景分清楚的策略草稿。", en: "Drafts that need clearer normal, stress, recovery, and breakout scenario handling." },
    entry: { zh: "根据主场景选择趋势、反弹或突破入场，并用成交量和波动率守门。", en: "Route to trend, recovery, or breakout entries and guard them with volume and volatility." },
    exit: { zh: "通道、趋势、动量和 ATR 保护共同退出。", en: "Use channel, trend, momentum, and ATR protective exits." },
    risk: { zh: "先选择一个主场景，不要一开始同时微调所有场景。", en: "Choose one primary scenario first instead of tuning every scenario immediately." },
    builderKey: "scenario_guard_builder",
    studio: { recipe: "scenario_guard", base: "hybrid", confirmation: "volatility_aware", exit: "composite", risk: "cautious" }
  },
  {
    id: "preset_pack_router",
    title: { zh: "Preset Pack Router", en: "Preset Pack Router" },
    bestFor: { zh: "想从同一结构生成 simple、balanced、defensive 版本。", en: "Users who want simple, balanced, and defensive versions from one structure." },
    entry: { zh: "用 preset_pack 控制入场严格度。", en: "Use preset_pack to control entry strictness." },
    exit: { zh: "质量分数衰减、趋势反转或 ATR 保护退出。", en: "Exit on quality-score decay, trend reversal, or ATR protection." },
    risk: { zh: "Preset 是设计起点，不是优化结果。", en: "Presets are design starting points, not optimized settings." },
    builderKey: "preset_pack_router_builder",
    studio: { recipe: "preset_pack", base: "hybrid", confirmation: "balanced", exit: "composite", risk: "balanced" }
  },
  {
    id: "proxy_confirmation_trend",
    title: { zh: "Proxy Confirmation Trend", en: "Proxy Confirmation Trend" },
    bestFor: { zh: "想要类似高周期确认，但不想引入 informative pair 的趋势草稿。", en: "Trend drafts that want higher-timeframe-like confirmation without informative pairs." },
    entry: { zh: "本周期趋势信号需要长窗口 proxy 趋势或确认分数支持。", en: "Local trend entries require long-window proxy trend or confirmation-score support." },
    exit: { zh: "本周期趋势破坏、proxy 破坏或 ATR 过高退出。", en: "Exit on local trend break, proxy break, or excessive ATR." },
    risk: { zh: "Proxy 不是实际高周期数据，只是长窗口锚点。", en: "The proxy is not true higher-timeframe data; it is a long-window anchor." },
    builderKey: "multitimeframe_proxy_confirmation_builder",
    studio: { recipe: "proxy_confirmation", base: "trend", confirmation: "balanced", exit: "trend_trailing", risk: "balanced" }
  },
  {
    id: "signal_deconfliction_score",
    title: { zh: "Signal Deconfliction Score", en: "Signal Deconfliction Score" },
    bestFor: { zh: "趋势、动量、过热、波动和距离信号经常互相冲突的策略草稿。", en: "Drafts where trend, momentum, overheat, volatility, and distance signals often conflict." },
    entry: { zh: "正向分数减去冲突分数后达到净分阈值才入场。", en: "Enter only when positive score minus conflict score reaches the net-score threshold." },
    exit: { zh: "趋势反转、RSI 衰减或 ATR 过高退出。", en: "Exit on trend reversal, RSI deterioration, or excessive ATR." },
    risk: { zh: "权重越多越要保持解释清楚。", en: "The more weights are used, the more important it is to keep the design explainable." },
    builderKey: "signal_deconfliction_builder",
    studio: { recipe: "deconfliction", base: "hybrid", confirmation: "strict", exit: "composite", risk: "cautious" }
  }

];

Object.assign(I18N.zh, {
  strategyLibraryHelper: "这里是 Strategy Library：只读取已生成策略和 metadata，用于管理、clone、比较和导出，不运行策略。",
  design: "设计",
  metadata: "Metadata",
  clone: "Clone",
  exportPackage: "导出包",
  diff: "Diff",
  diffPrevious: "对比上一版",
  noMetadata: "这个策略没有 metadata，可能是手工放入输出目录的文件。",
  metadataTitle: "策略 metadata",
  diffTitle: "策略版本差异",
  cloneLoaded: "已从已有策略载入参数。请检查 strategy_name，并建议勾选“保存为新版本”。",
  exportStarted: "已开始导出策略包。",
  readinessCheck: "导入检查",
  readinessStarted: "已生成导入前检查。",
  codeQualityCheck: "代码质量",
  codeQualityStarted: "已生成代码质量报告。",
  changedParameters: "变化参数",
  designImpact: "设计影响",
  noDiff: "没有发现参数变化。",
  checklistTitle: "生成前检查",
  clearLibraryDetail: "清空详情",
  libraryDetailTitle: "Strategy Library Detail",
  libraryDetailSubtitle: "查看 metadata、版本差异、clone payload 和导出包信息。",
  selectStrategyDetail: "请选择一个已生成策略。",
  baseName: "基础名",
  builderVersion: "Builder 版本",
  marketRegime: "市场环境",
  riskLevel: "风险风格",
  userNote: "用户备注",
  reviewReport: "审阅报告",
  editDocumentation: "编辑文档备注",
  documentationTitle: "策略文档备注",
  researchNote: "研究备注",
  changeNote: "修改备注",
  externalTestingNote: "外部测试备注",
  saveDocumentation: "保存文档备注",
  documentationSaved: "文档备注已保存。",
  reviewScope: "这是一份设计层面的审阅，不包含回测、收益、夏普、回撤或交易建议。",
  strategyPurpose: "策略目的",
  marketAssumption: "市场假设",
  entryLogic: "入场逻辑",
  exitLogic: "退出逻辑",
  riskLogic: "风险逻辑",
  mainParameters: "主要参数",
  designStrengths: "设计优点",
  designRisks: "设计风险 / 注意事项",
  externalReviewChecklist: "外部测试前检查",
  markdownReport: "Markdown 报告",
  librarySearch: "搜索策略库",
  includeArchived: "显示归档",
  exportSelected: "导出选中",
  selected: "选择",
  curation: "整理",
  editCuration: "编辑整理状态",
  curationStatus: "策略状态",
  reviewStatus: "审阅状态",
  libraryTags: "策略标签",
  curationNote: "整理备注",
  archived: "已归档",
  saveCuration: "保存整理状态",
  curationSaved: "策略库整理状态已保存。",
  archive: "归档",
  unarchive: "取消归档",
  bulkExportStarted: "已开始导出选中策略集合。",
  noSelectedStrategies: "请先选择至少一个策略。",
  statusAll: "全部状态",
  reviewAll: "全部审阅",
  statusDraft: "Draft",
  statusReview: "Review",
  statusReady: "Ready",
  statusParked: "Parked",
  reviewNotReviewed: "Not reviewed",
  reviewNeedsReview: "Needs review",
  reviewReviewed: "Reviewed",

  studioKicker: "Self-Build Studio",
  studioTitle: "更智能的自组策略引导",
  studioSubtitle: "选择策略配方、基础信号、确认强度、退出风格和风险姿态，系统会推荐更合适的自组 Builder，并尽量自动落到参数表单。",
  studioRecipe: "策略配方",
  studioBase: "基础信号",
  studioConfirm: "确认强度",
  studioExit: "退出风格",
  studioRisk: "风险姿态",
  studioApply: "应用自组引导",
  studioEmpty: "选择自组偏好后，这里会给出推荐 builder 和设计建议。",
  studioRecommendationTitle: "自组推荐",
  studioDesignTip: "设计建议",
  studioApplied: "已应用自组引导。请检查参数，然后再预览或生成策略。",
  studioNoBuilder: "没有找到合适的自组 builder。",
});
Object.assign(I18N.en, {
  strategyLibraryHelper: "This is the Strategy Library: it only reads generated strategies and metadata for management, cloning, comparison, and export. It does not run strategies.",
  design: "Design",
  metadata: "Metadata",
  clone: "Clone",
  exportPackage: "Export",
  diff: "Diff",
  diffPrevious: "Diff previous",
  noMetadata: "This strategy has no metadata. It may have been placed in the output directory manually.",
  metadataTitle: "Strategy metadata",
  diffTitle: "Strategy version diff",
  cloneLoaded: "Loaded parameters from the existing strategy. Review strategy_name and consider enabling 'save as new version'.",
  exportStarted: "Strategy package export started.",
  readinessCheck: "Readiness",
  readinessStarted: "Strategy readiness check generated.",
  codeQualityCheck: "Code quality",
  codeQualityStarted: "Code quality report generated.",
  changedParameters: "Changed parameters",
  designImpact: "Design impact",
  noDiff: "No parameter changes found.",
  checklistTitle: "Pre-generation checklist",
  clearLibraryDetail: "Clear detail",
  libraryDetailTitle: "Strategy Library Detail",
  libraryDetailSubtitle: "View metadata, version differences, clone payloads, and export package information.",
  selectStrategyDetail: "Select a generated strategy.",
  baseName: "Base name",
  builderVersion: "Builder version",
  marketRegime: "Market",
  riskLevel: "Risk style",
  userNote: "User note",
  reviewReport: "Review report",
  editDocumentation: "Edit documentation",
  documentationTitle: "Strategy documentation notes",
  researchNote: "Research note",
  changeNote: "Change note",
  externalTestingNote: "External testing note",
  saveDocumentation: "Save documentation",
  documentationSaved: "Documentation notes saved.",
  reviewScope: "This is a design-level review. It does not include backtests, returns, Sharpe, drawdown, or trading advice.",
  strategyPurpose: "Strategy purpose",
  marketAssumption: "Market assumption",
  entryLogic: "Entry logic",
  exitLogic: "Exit logic",
  riskLogic: "Risk logic",
  mainParameters: "Main parameters",
  designStrengths: "Design strengths",
  designRisks: "Design risks / things to watch",
  externalReviewChecklist: "Before external testing",
  markdownReport: "Markdown report",
  librarySearch: "Search library",
  includeArchived: "Show archived",
  exportSelected: "Export selected",
  selected: "Select",
  curation: "Curation",
  editCuration: "Edit curation",
  curationStatus: "Strategy status",
  reviewStatus: "Review status",
  libraryTags: "Library tags",
  curationNote: "Curation note",
  archived: "Archived",
  saveCuration: "Save curation",
  curationSaved: "Library curation saved.",
  archive: "Archive",
  unarchive: "Unarchive",
  bulkExportStarted: "Selected strategy collection export started.",
  noSelectedStrategies: "Select at least one strategy first.",
  statusAll: "All statuses",
  reviewAll: "All reviews",
  statusDraft: "Draft",
  statusReview: "Review",
  statusReady: "Ready",
  statusParked: "Parked",
  reviewNotReviewed: "Not reviewed",
  reviewNeedsReview: "Needs review",
  reviewReviewed: "Reviewed",

  studioKicker: "Self-Build Studio",
  studioTitle: "Smarter Self-Build Guidance",
  studioSubtitle: "Choose a recipe, base signal, confirmation strictness, exit style, and risk posture; the app recommends a suitable self-build builder and maps the choices into the form when possible.",
  studioRecipe: "Strategy recipe",
  studioBase: "Base signal",
  studioConfirm: "Confirmation strictness",
  studioExit: "Exit style",
  studioRisk: "Risk posture",
  studioApply: "Apply self-build guidance",
  studioEmpty: "Choose self-build preferences and this area will show recommended builders and design guidance.",
  studioRecommendationTitle: "Self-build recommendation",
  studioDesignTip: "Design tip",
  studioApplied: "Self-build guidance applied. Review parameters before previewing or generating the strategy.",
  studioNoBuilder: "No suitable self-build builder found.",
});

Object.assign(I18N.zh, {
  recipeGalleryKicker: "Recipe Gallery",
  recipeGalleryTitle: "策略配方库",
  recipeGallerySubtitle: "先选择一个高层策略想法，再应用到 Self-Build Studio。它不会运行回测，只帮助你选择更清楚的构建起点。",
  recipeBestFor: "适合",
  recipeEntryIdea: "入场想法",
  recipeExitIdea: "退出想法",
  recipeRiskNote: "注意事项",
  recipeApply: "应用配方",
  recipeApplied: "配方已应用到 Self-Build Studio，并选择了推荐 Builder。请检查参数后再生成。",
  parameterCoachTitle: "参数教练",
  parameterCoachSensitivity: "影响信号敏感度",
  parameterCoachConfirmation: "影响确认严格度",
  parameterCoachRisk: "影响风险控制",
  parameterCoachGeneral: "其他关键参数",
  presetSimple: "简单：少组件、容易解释",
  presetDefensive: "防守：更强确认和风险保护",
  presetExploratory: "探索：适合自组策略草稿"
});

Object.assign(I18N.en, {
  recipeGalleryKicker: "Recipe Gallery",
  recipeGalleryTitle: "Strategy Recipe Gallery",
  recipeGallerySubtitle: "Choose a higher-level strategy idea first, then apply it to the Self-Build Studio. This does not run backtests; it helps you choose a clearer construction starting point.",
  recipeBestFor: "Best for",
  recipeEntryIdea: "Entry idea",
  recipeExitIdea: "Exit idea",
  recipeRiskNote: "Things to watch",
  recipeApply: "Apply recipe",
  recipeApplied: "Recipe applied to the Self-Build Studio and the recommended builder was selected. Review parameters before generating.",
  parameterCoachTitle: "Parameter coach",
  parameterCoachSensitivity: "Controls signal sensitivity",
  parameterCoachConfirmation: "Controls confirmation strictness",
  parameterCoachRisk: "Controls risk handling",
  parameterCoachGeneral: "Other key parameters",
  presetSimple: "Simple: fewer modules, easier to explain",
  presetDefensive: "Defensive: stronger confirmation and risk guards",
  presetExploratory: "Exploratory: useful for self-build drafts"
});



Object.assign(I18N.zh, {
  literatureMode: "文献策略",
  literatureBadge: "文献",
  literatureModeDesc: "从文献启发的策略想法开始，先理解假设，再生成可导入 Freqtrade 的策略草稿。",
  modeOverviewLiteratureTitle: "文献策略入口",
  modeOverviewLiteratureBody: "这里放置由常见研究思路启发的策略草稿，例如时间序列动量、波动率管理、短期反转、突破确认、流动性保护和市场状态切换。它们不是论文复现，也不包含收益承诺。",
  mainEntryKicker: "推荐入口",
  mainEntryTitle: "先选一个简单路径",
  mainEntrySubtitle: "从文献策略、引导构建、自组策略或 Freqtrade 导出流程开始，而不是一次显示所有高级模块。",
  entryLiteratureTitle: "文献策略",
  entryLiteratureBody: "从文章/研究思路启发的策略草稿开始。",
  entryLiteratureBtn: "打开文献策略",
  entryGuidedTitle: "引导式构建",
  entryGuidedBody: "回答三个问题，系统推荐合适模板。",
  entryGuidedBtn: "使用引导构建",
  entrySelfTitle: "自组策略 Studio",
  entrySelfBody: "组合信号、确认层、退出和风险模块。",
  entrySelfBtn: "打开自组 Studio",
  entryExportTitle: "Freqtrade 导出",
  entryExportBody: "在这里生成，下载后手动导入 Freqtrade。",
  entryExportBtn: "查看导出流程",
  literatureKicker: "文献策略入口",
  literatureTitle: "文献启发的策略草稿",
  literatureSubtitle: "这些不是论文复现或收益承诺，而是把常见文献式策略想法转化为可审阅、可生成的 Freqtrade 草稿。",
  literatureViewAll: "查看全部文献策略",
  literatureOpen: "使用这个文献策略",
  literatureCaution: "提示：生成后仍需在 Freqtrade 中自行检查和回测。",
  allStrategyModes: "全部策略",
  resetFilters: "显示全部",
  filterSummary: "当前显示 {visible} / {total} 个模板",
  filterSummaryActive: "已启用筛选：{filters}",
  dashboardTotal: "全部模板",
  dashboardVisible: "当前可见",
  dashboardLiterature: "文献策略",
  dashboardSelfBuild: "自组模块",
  dashboardTraditional: "传统策略",
  modeOverviewAllTitle: "全部策略总览",
  modeOverviewAllBody: "这里可以一次查看传统策略、自组 Builder 和文献策略。点击“显示全部”会清除搜索、分类、标签、收藏、最近使用和引导筛选。",
  step1: "1. 选择策略入口",
  customBuilderTitle: "自组策略",
  customBuilderBody: "本版本保留自组策略能力，同时新增更清楚的首页入口和文献策略入口。",
});
Object.assign(I18N.en, {
  literatureMode: "Literature strategies",
  literatureBadge: "Literature",
  literatureModeDesc: "Start from research-inspired strategy ideas, understand the assumption first, then generate a Freqtrade-ready strategy draft.",
  modeOverviewLiteratureTitle: "Literature Strategy Entry",
  modeOverviewLiteratureBody: "This section contains strategy drafts inspired by common research-style ideas such as time-series momentum, volatility management, short-term reversal, breakout confirmation, liquidity guarding, and regime switching. They are not paper replications and do not contain performance claims.",
  mainEntryKicker: "Recommended entry",
  mainEntryTitle: "Choose one simple path",
  mainEntrySubtitle: "Start from Literature Strategies, Guided Builder, Self-Build Studio, or Freqtrade Export instead of facing every advanced module at once.",
  entryLiteratureTitle: "Literature Strategies",
  entryLiteratureBody: "Start from article- and research-inspired strategy drafts.",
  entryLiteratureBtn: "Open Literature Strategies",
  entryGuidedTitle: "Guided Builder",
  entryGuidedBody: "Answer three questions and get recommended templates.",
  entryGuidedBtn: "Use Guided Builder",
  entrySelfTitle: "Self-Build Studio",
  entrySelfBody: "Combine signals, confirmations, exits, and risk modules.",
  entrySelfBtn: "Open Self-Build Studio",
  entryExportTitle: "Freqtrade Export",
  entryExportBody: "Generate here, then download and manually import into Freqtrade.",
  entryExportBtn: "View Export Flow",
  literatureKicker: "Literature Strategy Entry",
  literatureTitle: "Research-inspired strategy drafts",
  literatureSubtitle: "These are not paper replications or profit claims. They translate common literature-style strategy ideas into reviewable, generatable Freqtrade drafts.",
  literatureViewAll: "View all literature strategies",
  literatureOpen: "Use this literature strategy",
  literatureCaution: "Reminder: review and backtest externally inside Freqtrade after generation.",
  allStrategyModes: "All strategies",
  resetFilters: "Show all",
  filterSummary: "Showing {visible} / {total} templates",
  filterSummaryActive: "Active filters: {filters}",
  dashboardTotal: "All templates",
  dashboardVisible: "Visible now",
  dashboardLiterature: "Literature",
  dashboardSelfBuild: "Self-build",
  dashboardTraditional: "Traditional",
  modeOverviewAllTitle: "All Strategy Overview",
  modeOverviewAllBody: "Browse traditional strategies, custom builders, and literature strategies together. Show all clears search, category, tag, favorite, recent, and guided filters.",
  step1: "1. Choose strategy entry",
  customBuilderTitle: "Custom Builder",
  customBuilderBody: "This version keeps the self-build system while adding a simpler home entry and a dedicated literature strategy entrance.",
});

const state = {
  lang: localStorage.getItem('sb_lang') || ((navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en'),
  helpMode: localStorage.getItem('sb_help_mode') || 'brief',
  theme: localStorage.getItem('sb_theme') || 'light',
  strategyMode: (localStorage.getItem('sb_strategy_mode') !== null ? localStorage.getItem('sb_strategy_mode') : 'literature'),
  templates: [],
  selectedTemplate: null,
  favorites: new Set(JSON.parse(localStorage.getItem('sb_favorites') || '[]')),
  recent: JSON.parse(localStorage.getItem('sb_recent') || '[]'),
  outputRoots: [],
  currentOutputDir: '',
  folderBrowserPath: '',
  disclaimer: null,
  lastPreview: null,
  selectedBaseName: null,
  autoPreviewTimer: null,
  isPreviewVisible: false,
  workbench: JSON.parse(localStorage.getItem('sb_workbench') || '{"market":"","signal":"","confirmation":"","risk":""}'),
  selfBuildStudio: JSON.parse(localStorage.getItem('sb_self_build_studio') || '{"recipe":"starter","base":"trend","confirmation":"balanced","exit":"composite","risk":"balanced"}'),
  strategyRows: [],
  selectedLibraryFiles: new Set(),
  libraryFilters: { search:"", status:"", review:"", tag:"", includeArchived:false },
  exportTarget: localStorage.getItem('sb_export_target') || 'generic',
};

const qs = (id) => document.getElementById(id);
const qsa = (sel) => Array.from(document.querySelectorAll(sel));
const t = (k) => I18N[state.lang]?.[k] ?? I18N.en?.[k] ?? k;
const tl = (obj) => obj ? (obj[state.lang] || obj.en || obj.zh || '') : '';
function strategyModeLabel(mode){
  if(mode === '') return t('allStrategyModes');
  if(mode === 'self_build') return t('selfBuildMode');
  if(mode === 'literature') return t('literatureMode');
  return t('traditionalMode');
}
function strategyModeBadge(tpl){
  if(tpl.strategy_mode === 'self_build') return t('selfBuildBadge');
  if(tpl.strategy_mode === 'literature') return t('literatureBadge');
  return t('traditionalBadge');
}
function strategyModeDesc(tpl){
  if(tpl.strategy_mode === 'self_build') return t('selfBuildModeDesc');
  if(tpl.strategy_mode === 'literature') return t('literatureModeDesc');
  return t('traditionalModeDesc');
}

if(!["", "low", "medium", "high", "exit", "risk_layer", "atr", "volatility_cutoff"].includes(state.workbench.risk || "")) {
  state.workbench.risk = "";
}
const savePrefs = () => {
  localStorage.setItem('sb_lang', state.lang);
  localStorage.setItem('sb_help_mode', state.helpMode);
  localStorage.setItem('sb_theme', state.theme);
  localStorage.setItem('sb_strategy_mode', state.strategyMode);
  localStorage.setItem('sb_favorites', JSON.stringify([...state.favorites]));
  localStorage.setItem('sb_recent', JSON.stringify(state.recent));
  localStorage.setItem('sb_workbench', JSON.stringify(state.workbench));
  localStorage.setItem('sb_self_build_studio', JSON.stringify(state.selfBuildStudio));
  localStorage.setItem('sb_export_target', state.exportTarget || 'generic');
};
function tagHelp(tag){ return tl(TAG_HELP[tag]) || tag; }
function applyTheme(){ document.body.setAttribute('data-theme', state.theme); }
async function fetchJSON(url, options={}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!res.ok) {
    let detail = 'Request failed';
    try { const data = await res.json(); detail = data.detail || data.message || JSON.stringify(data); } catch {}
    throw new Error(detail);
  }
  return res.json();
}
function setMessage(msg, isError=false){ const box=qs('message'); if(!box) return; box.textContent=msg||''; box.className='message'+(msg? ' visible':'')+(isError?' error':''); }
function renderWarnings(warnings=[]){ const box=qs('warnings'); if(!box) return; box.innerHTML = warnings.length ? warnings.map(w=>`<div class="warning-item">${escapeHTML(w)}</div>`).join('') : ''; }
function humanSize(bytes){ if(!bytes && bytes!==0) return '-'; const units=['B','KB','MB']; let i=0; let n=bytes; while(n>=1024 && i<units.length-1){ n/=1024; i++; } return `${n.toFixed(i?1:0)} ${units[i]}`; }
function formatTime(ts){ if(!ts) return '-'; try { return new Date(ts*1000 || ts).toLocaleString(); } catch { return '-'; } }
function downloadBlob(filename, content){ const blob = new Blob([content], {type:'text/plain;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href), 1000); }
async function downloadResponseBlob(url, options={}, fallbackName='download.zip'){ const res=await fetch(url,{ headers:{'Content-Type':'application/json'}, ...options }); if(!res.ok){ let detail='Download failed'; try{ const data=await res.json(); detail=data.detail || JSON.stringify(data); }catch{} throw new Error(detail); } const blob=await res.blob(); const disposition=res.headers.get('Content-Disposition') || ''; const match=/filename=\"?([^\";]+)\"?/i.exec(disposition); const filename=match ? match[1] : fallbackName; const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); }
function optionText(value, group){ const dict = I18N[state.lang][group] || {}; return dict[value] || value; }
function categoryMeaning(c){ return optionText(c,'categoryLabels'); }
function regimeMeaning(r){ return optionText(r,'regimeLabels'); }
function riskMeaning(r){ return optionText(r,'riskLabels'); }
function localOptionLabel(item){ return tl(item[1]); }
function populateWorkbenchOptions(){
  const mapping = { market:'workbench-market', signal:'workbench-signal', confirmation:'workbench-confirmation', risk:'workbench-risk' };
  Object.entries(mapping).forEach(([key,id])=>{
    const el=qs(id); if(!el) return;
    const current=state.workbench[key] || '';
    el.innerHTML=(WORKBENCH_OPTIONS[key] || []).map(item=>`<option value="${item[0]}">${localOptionLabel(item)}</option>`).join('');
    el.value=current;
  });
}
function workbenchText(tpl){
  return [tpl.key, tpl.category, tpl.market_regime, tpl.risk_level, ...(tpl.tags||[]), ...(tpl.confirmation_layers||[]), ...(tpl.exit_modules||[])].join(' ').toLowerCase();
}
function signalMatches(tpl, signal, text, tags){
  if(!signal) return true;
  if(signal==='trend') return tpl.category==='trend' || tags.has('crossover') || text.includes('trend');
  if(signal==='mean_reversion') return tpl.category==='mean_reversion' || text.includes('reversion') || text.includes('rsi');
  if(signal==='breakout') return tpl.category==='breakout' || tags.has('breakout') || text.includes('breakout') || text.includes('channel');
  if(signal==='score') return tags.has('score') || tags.has('multi_signal') || text.includes('score') || text.includes('voting') || text.includes('boolean');
  if(signal==='regime') return tags.has('regime') || text.includes('regime') || text.includes('adaptive');
  return true;
}
function marketMatches(tpl, market, tags){
  if(!market) return true;
  if(market==='ranging') return tpl.market_regime==='ranging' || tpl.market_regime==='intraday_range';
  if(market==='adaptive') return tpl.market_regime==='adaptive' || tags.has('regime') || tags.has('adaptive');
  return tpl.market_regime===market;
}
function confirmationMatches(text, tags, confirmation){
  if(!confirmation) return true;
  if(confirmation==='adx') return text.includes('adx') || text.includes('strength');
  if(confirmation==='rsi') return text.includes('rsi');
  if(confirmation==='volume') return text.includes('volume') || tags.has('volume');
  if(confirmation==='volatility') return text.includes('atr') || text.includes('volatility') || tags.has('adaptive');
  if(confirmation==='squeeze') return text.includes('squeeze') || text.includes('compression') || tags.has('squeeze');
  return true;
}
function riskMatches(tpl, text, tags, risk){
  if(!risk) return true;
  if(['low','medium','high'].includes(risk)) return tpl.risk_level===risk;
  // Legacy advanced-risk values from previous versions are still understood.
  if(risk==='exit') return text.includes('exit') || tpl.key.includes('exit');
  if(risk==='risk_layer') return text.includes('risk') || tags.has('risk_layer');
  if(risk==='atr') return text.includes('atr') || text.includes('volatility');
  if(risk==='volatility_cutoff') return text.includes('volatility') || text.includes('cutoff');
  return true;
}
function templateMatchesWorkbench(tpl){
  const wb=state.workbench || {};
  const tags=new Set(tpl.tags || []);
  const text=workbenchText(tpl);
  return marketMatches(tpl, wb.market, tags)
    && signalMatches(tpl, wb.signal, text, tags)
    && confirmationMatches(text, tags, wb.confirmation)
    && riskMatches(tpl, text, tags, wb.risk);
}
function scoreTemplateForWorkbench(tpl){
  const wb=state.workbench || {};
  const tags=new Set(tpl.tags || []);
  const text=workbenchText(tpl);
  let score=0;
  if(wb.market && marketMatches(tpl, wb.market, tags)) score += 4;
  if(wb.signal && signalMatches(tpl, wb.signal, text, tags)) score += 4;
  if(wb.confirmation && confirmationMatches(text, tags, wb.confirmation)) score += 2;
  if(wb.risk && riskMatches(tpl, text, tags, wb.risk)) score += 2;
  if(tpl.strategy_mode === 'self_build') score += 1;
  if(tags.has('builder')) score += 1;
  return score;
}
function recommendedTemplates(limit=4){
  const any=Object.values(state.workbench || {}).some(Boolean);
  if(!any) return [];
  return [...state.templates]
    .map(tpl=>({tpl, score: scoreTemplateForWorkbench(tpl)}))
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score || (b.tpl.strategy_mode==='self_build')-(a.tpl.strategy_mode==='self_build'))
    .slice(0,limit)
    .map(x=>x.tpl);
}
function readWorkbenchFromUI(){
  state.workbench={
    market: qs('workbench-market')?.value || '',
    signal: qs('workbench-signal')?.value || '',
    confirmation: qs('workbench-confirmation')?.value || '',
    risk: qs('workbench-risk')?.value || '',
  };
  savePrefs();
}
function applyWorkbenchFilters(){
  readWorkbenchFromUI();
  const recs=recommendedTemplates(4);
  const matched=state.templates.filter(templateMatchesWorkbench);
  const first=recs[0] || matched[0];
  if(first){
    state.strategyMode = first.strategy_mode;
    state.selectedTemplate = first;
    savePrefs();
  }
  applyI18N();
  renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary(); renderWorkbenchRecommendation();
}
function clearWorkbenchFilters(){
  state.workbench={market:'', signal:'', confirmation:'', risk:''};
  savePrefs(); populateWorkbenchOptions(); renderWorkbenchRecommendation(); renderTemplateList();
}
function markRecent(key){ state.recent=[key,...state.recent.filter(x=>x!==key)].slice(0,20); savePrefs(); }
function toggleFavorite(key){ if(state.favorites.has(key)) state.favorites.delete(key); else state.favorites.add(key); savePrefs(); renderTemplateList(); }

function inferFieldExplanation(field, value) {
  const baseHelp = tl(field.help);
  const name = field.name.toLowerCase();
  let numberMeaning = '';
  let tuningHint = '';
  if (field.type === 'int' || field.type === 'float') {
    numberMeaning = state.lang === 'zh' ? `当前值 ${value} 会直接作为策略参数输入。` : `The current value ${value} is used directly as a strategy parameter.`;
    if(name.includes('fast') || name.includes('short')) {
      tuningHint = state.lang === 'zh' ? '更小通常更敏感、反应更快，但噪声更多；更大则更平滑但更滞后。' : 'Smaller values usually react faster but add noise; larger values are smoother but slower.';
    } else if(name.includes('slow') || name.includes('long') || name.includes('trend') || name.includes('regime')) {
      tuningHint = state.lang === 'zh' ? '更大通常让趋势判断更稳定，但会更慢确认行情变化。' : 'Larger values usually stabilize trend/regime detection but confirm changes more slowly.';
    } else if(name.includes('rsi') || name.includes('threshold') || name.includes('min') || name.includes('max')) {
      tuningHint = state.lang === 'zh' ? '阈值越窄，信号越挑剔，也越容易过度贴合历史样本。' : 'Narrower thresholds make signals more selective and easier to overfit to historical samples.';
    } else if(name.includes('volume')) {
      tuningHint = state.lang === 'zh' ? '成交量确认可以减少低参与度信号，但设置过严会显著减少入场机会。' : 'Volume confirmation can filter thin signals, but strict settings may reduce entry frequency.';
    } else if(name.includes('atr') || name.includes('volatility')) {
      tuningHint = state.lang === 'zh' ? 'ATR/波动率参数主要影响风险过滤和保护性退出速度。' : 'ATR/volatility parameters mostly affect risk filters and protective exit speed.';
    } else if(name.includes('stoploss')) {
      tuningHint = state.lang === 'zh' ? '更紧的 stoploss 可以限制单次亏损，但可能更频繁地被正常波动打出。' : 'A tighter stoploss limits single-trade downside but can be hit more often by normal noise.';
    } else if(name.includes('roi')) {
      tuningHint = state.lang === 'zh' ? 'ROI 目标越高，退出越不容易触发；不要把它理解成预期收益。' : 'A higher ROI target makes profit exits harder to trigger; it is not an expected return.';
    } else {
      tuningHint = state.lang === 'zh' ? '调整前建议先确认它影响的是信号敏感度、确认层，还是风险控制。' : 'Before tuning, identify whether it affects sensitivity, confirmation, or risk control.';
    }
  } else if (field.type === 'bool') {
    numberMeaning = state.lang === 'zh' ? `当前设置为 ${value ? '开启' : '关闭'}。` : `This option is currently ${value ? 'enabled' : 'disabled'}.`;
    tuningHint = state.lang === 'zh' ? '开启模块会让逻辑更严格；如果同时开启太多过滤器，策略可能很少入场。' : 'Enabling modules makes logic stricter; too many filters may make entries rare.';
  } else if (field.type === 'select') {
    numberMeaning = state.lang === 'zh' ? `当前选择为 ${value}。` : `The current choice is ${value}.`;
    tuningHint = state.lang === 'zh' ? '切换选项通常会改变策略假设，而不只是改变参数强弱。' : 'Changing this option often changes the strategy hypothesis, not just parameter strength.';
  }
  return { baseHelp, numberMeaning, tuningHint };
}
function fieldHelpHTML(field, value){
  if (state.helpMode === 'brief') return '';
  const info = inferFieldExplanation(field, value);
  return [
    info.baseHelp ? `<div class="field-note-summary"><strong>${t('fieldMeaningTitle')}:</strong> ${info.baseHelp}</div>` : '',
    info.numberMeaning ? `<div class="field-note-meaning"><strong>${t('numberMeaningTitle')}:</strong> ${info.numberMeaning}</div>` : '',
    info.tuningHint ? `<div class="field-note-tuning"><strong>${t('tuningHintTitle')}:</strong> ${info.tuningHint}</div>` : ''
  ].join('');
}

function applyI18N(){
  qs('app-subtitle').textContent=t('appSubtitle');
  qs('hero-eyebrow').textContent='Strategy Builder · Workbench';
  qs('hero-pill-1').textContent='Templates';
  qs('hero-pill-2').textContent='Custom Builder';
  qs('hero-pill-3').textContent=state.lang==='zh' ? '模块构建' : 'Modular Builder';
  qs('lang-switch-label').textContent=t('langLabel');
  qs('help-mode-label').textContent=t('helpModeLabel');
  qs('theme-label').textContent=t('themeLabel');
  qs('brief-help-btn').textContent=t('brief'); qs('detailed-help-btn').textContent=t('detailed');
  qs('light-theme-btn').textContent=t('light'); qs('dark-theme-btn').textContent=t('dark');
  qs('label-output-dir').textContent=t('outputDir'); qs('choose-output-btn').textContent=t('chooseOutput'); if(qs('manual-output-path-label')) qs('manual-output-path-label').textContent=t('manualOutputPath'); if(qs('manual-output-path-help')) qs('manual-output-path-help').textContent=t('manualOutputHelp'); if(qs('manual-output-path')) qs('manual-output-path').placeholder=t('manualOutputPlaceholder');
  qs('filter-search-label').textContent=t('search'); qs('filter-category-label').textContent=t('category'); qs('filter-regime-label').textContent=t('regime'); qs('filter-tag-label').textContent=t('tag');
  qs('favorites-only-label').textContent=t('favoritesOnly'); qs('recent-first-label').textContent=t('recentFirst'); qs('template-search').placeholder=t('search');
  qs('step1-title').textContent=t('step1'); qs('step2-title').textContent=t('step2'); qs('step3-title').textContent=t('step3'); qs('step4-title').textContent=t('step4'); qs('versions-title').textContent=t('step5');
  qs('guide-kicker-1').textContent=t('guideKicker1'); qs('guide-kicker-2').textContent=t('guideKicker2'); qs('guide-kicker-3').textContent=t('guideKicker3');
  qs('guide-title-1').textContent=t('guideTitle1'); qs('guide-title-2').textContent=t('guideTitle2'); qs('guide-title-3').textContent=t('guideTitle3');
  qs('guide-body-1').textContent=t('guideBody1'); qs('guide-body-2').textContent=t('guideBody2'); qs('guide-body-3').textContent=t('guideBody3');
  if(qs('workbench-kicker')) qs('workbench-kicker').textContent=t('workbenchKicker');
  if(qs('workbench-title')) qs('workbench-title').textContent=t('workbenchTitle');
  if(qs('workbench-subtitle')) qs('workbench-subtitle').textContent=t('workbenchSubtitle');
  if(qs('workbench-market-label')) qs('workbench-market-label').textContent=t('workbenchMarket');
  if(qs('workbench-signal-label')) qs('workbench-signal-label').textContent=t('workbenchSignal');
  if(qs('workbench-confirmation-label')) qs('workbench-confirmation-label').textContent=t('workbenchConfirmation');
  if(qs('workbench-risk-label')) qs('workbench-risk-label').textContent=t('workbenchRisk');
  if(qs('workbench-market-help')) qs('workbench-market-help').textContent=t('marketHelp');
  if(qs('workbench-signal-help')) qs('workbench-signal-help').textContent=t('signalHelp');
  if(qs('workbench-risk-help')) qs('workbench-risk-help').textContent=t('riskPreferenceHelp');
  if(qs('advanced-guided-summary')) qs('advanced-guided-summary').textContent=t('advancedGuidedSummary');
  if(qs('apply-workbench-btn')) qs('apply-workbench-btn').textContent=t('workbenchApply');
  if(qs('clear-workbench-btn')) qs('clear-workbench-btn').textContent=t('workbenchClear');
  if(qs('beginner-recommend-btn')) qs('beginner-recommend-btn').textContent=t('beginnerRecommend');
  if(qs('studio-kicker')) qs('studio-kicker').textContent=t('studioKicker');
  if(qs('studio-title')) qs('studio-title').textContent=t('studioTitle');
  if(qs('studio-subtitle')) qs('studio-subtitle').textContent=t('studioSubtitle');
  if(qs('studio-recipe-label')) qs('studio-recipe-label').textContent=t('studioRecipe');
  if(qs('studio-base-label')) qs('studio-base-label').textContent=t('studioBase');
  if(qs('studio-confirm-label')) qs('studio-confirm-label').textContent=t('studioConfirm');
  if(qs('studio-exit-label')) qs('studio-exit-label').textContent=t('studioExit');
  if(qs('studio-risk-label')) qs('studio-risk-label').textContent=t('studioRisk');
  if(qs('studio-apply-btn')) qs('studio-apply-btn').textContent=t('studioApply');
  if(qs('recipe-gallery-kicker')) qs('recipe-gallery-kicker').textContent=t('recipeGalleryKicker');
  if(qs('recipe-gallery-title')) qs('recipe-gallery-title').textContent=t('recipeGalleryTitle');
  if(qs('recipe-gallery-subtitle')) qs('recipe-gallery-subtitle').textContent=t('recipeGallerySubtitle');
  renderRecipeGallery();
  if(qs('preset-title')) qs('preset-title').textContent=t('presetTitle');
  if(qs('preset-body')) qs('preset-body').textContent=t('presetBody');
  if(qs('apply-preset-btn')) qs('apply-preset-btn').textContent=t('applyPreset');
  populatePresetOptions();
  populateWorkbenchOptions();
  renderWorkbenchRecommendation();
  if(qs('all-mode-btn')) qs('all-mode-btn').textContent=t('allStrategyModes'); qs('traditional-mode-btn').textContent=t('traditionalMode'); qs('self-build-mode-btn').textContent=t('selfBuildMode'); if(qs('literature-mode-btn')) qs('literature-mode-btn').textContent=t('literatureMode'); if(qs('reset-template-filters-btn')) qs('reset-template-filters-btn').textContent=t('resetFilters');
  qs('notes-label').textContent=t('notes'); qs('notes').placeholder=t('notesPlaceholder'); qs('save-new-version-label').textContent=t('saveNewVersion'); qs('overwrite-label').textContent=t('overwrite');
  qs('preview-btn').textContent=t('preview'); qs('generate-btn').textContent=t('generate'); qs('refresh-strategies').textContent=t('refresh');
  qs('download-preview-btn').textContent=t('downloadPreview'); qs('download-generated-btn').textContent=t('download');
  qs('toggle-preview-panel-btn').textContent=state.isPreviewVisible ? t('hidePreview') : t('showPreview');
  qs('preview-collapsed-title').textContent=t('previewHiddenTitle'); qs('preview-collapsed-body').textContent=t('previewHiddenBody');
  qs('batch-title').textContent=t('batchTitle'); qs('batch-enabled-label').textContent=t('batchEnabled'); qs('add-sweep-btn').textContent=t('addSweep'); qs('batch-preview-btn').textContent=t('batchPreview'); qs('batch-generate-btn').textContent=t('batchGenerate');
  if(qs('library-helper')) qs('library-helper').textContent=t('strategyLibraryHelper');
  if(qs('th-select')) qs('th-select').textContent=t('selected');
  qs('th-filename').textContent=t('filename'); qs('th-template').textContent=t('template'); qs('th-version').textContent=t('version');
  if(qs('th-design')) qs('th-design').textContent=t('design');
  if(qs('th-note')) qs('th-note').textContent=t('notes');
  qs('th-updated').textContent=t('updated'); qs('th-actions').textContent=t('actions');
  qs('versions-empty').textContent=t('noVersions'); qs('vth-version').textContent=t('version'); qs('vth-filename').textContent=t('filename'); qs('vth-updated').textContent=t('updated'); qs('vth-notes').textContent=t('notes');
  if(qs('vth-actions')) qs('vth-actions').textContent=t('actions');
  if(qs('library-detail-title')) qs('library-detail-title').textContent=t('libraryDetailTitle');
  if(qs('library-detail-subtitle')) qs('library-detail-subtitle').textContent=t('libraryDetailSubtitle');
  if(qs('clear-library-detail-btn')) qs('clear-library-detail-btn').textContent=t('clearLibraryDetail');
  populateLibraryFilters();
  qs('folder-modal-title').textContent=t('folderTitle'); qs('folder-roots-title').textContent=t('roots'); qs('confirm-folder-btn').textContent=t('useDir');
  qsa('.lang-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.lang===state.lang));
  qsa('.help-mode-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.helpMode===state.helpMode));
  qsa('.theme-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.theme===state.theme));

  if(qs('main-entry-kicker')) qs('main-entry-kicker').textContent=t('mainEntryKicker');
  if(qs('main-entry-title')) qs('main-entry-title').textContent=t('mainEntryTitle');
  if(qs('main-entry-subtitle')) qs('main-entry-subtitle').textContent=t('mainEntrySubtitle');
  if(qs('entry-literature-title')) qs('entry-literature-title').textContent=t('entryLiteratureTitle');
  if(qs('entry-literature-body')) qs('entry-literature-body').textContent=t('entryLiteratureBody');
  if(qs('entry-literature-btn')) qs('entry-literature-btn').textContent=t('entryLiteratureBtn');
  if(qs('entry-guided-title')) qs('entry-guided-title').textContent=t('entryGuidedTitle');
  if(qs('entry-guided-body')) qs('entry-guided-body').textContent=t('entryGuidedBody');
  if(qs('entry-guided-btn')) qs('entry-guided-btn').textContent=t('entryGuidedBtn');
  if(qs('entry-self-title')) qs('entry-self-title').textContent=t('entrySelfTitle');
  if(qs('entry-self-body')) qs('entry-self-body').textContent=t('entrySelfBody');
  if(qs('entry-self-btn')) qs('entry-self-btn').textContent=t('entrySelfBtn');
  if(qs('entry-export-title')) qs('entry-export-title').textContent=t('entryExportTitle');
  if(qs('entry-export-body')) qs('entry-export-body').textContent=t('entryExportBody');
  if(qs('entry-export-btn')) qs('entry-export-btn').textContent=t('entryExportBtn');
  if(qs('literature-kicker')) qs('literature-kicker').textContent=t('literatureKicker');
  if(qs('literature-title')) qs('literature-title').textContent=t('literatureTitle');
  if(qs('literature-subtitle')) qs('literature-subtitle').textContent=t('literatureSubtitle');
  if(qs('literature-view-all-btn')) qs('literature-view-all-btn').textContent=t('literatureViewAll');
  renderLiteratureStrategyCenter();

  qsa('.strategy-mode-btn').forEach(btn=>btn.classList.toggle('active', btn.dataset.strategyMode===state.strategyMode));
  if (!state.lastPreview) qs('code-filename').textContent=t('notGenerated');
  renderModeOverview();
  renderSelfBuildStudioRecommendation();
  renderStrategySummary();
}

function visibleTemplates(){
  const q=(qs('template-search').value||'').toLowerCase().trim();
  const category=qs('category-filter').value; const regime=qs('regime-filter').value; const tag=qs('tag-filter').value;
  const favOnly=qs('favorites-only').checked; const recentFirst=qs('recent-first').checked;
  let arr=state.templates.filter(tpl=>{
    const hay=[tl(tpl.label),tl(tpl.description),tl(tpl.principle),...(tpl.tags||[])].join(' ').toLowerCase();
    if(q && !hay.includes(q)) return false;
    if(state.strategyMode && tpl.strategy_mode!==state.strategyMode) return false;
    if(!templateMatchesWorkbench(tpl)) return false;
    if(category && tpl.category!==category) return false;
    if(regime && tpl.market_regime!==regime) return false;
    if(tag && !(tpl.tags||[]).includes(tag)) return false;
    if(favOnly && !state.favorites.has(tpl.key)) return false;
    return true;
  });
  if(recentFirst){ arr.sort((a,b)=>{ const ai=state.recent.indexOf(a.key); const bi=state.recent.indexOf(b.key); return (ai===-1?999:ai) - (bi===-1?999:bi); }); }
  return arr;
}
function fillFilterOptions(){
  const cats=[...new Set(state.templates.map(t=>t.category))];
  const regs=[...new Set(state.templates.map(t=>t.market_regime))];
  const tags=[...new Set(state.templates.flatMap(t=>t.tags||[]))].sort();
  qs('category-filter').innerHTML=`<option value="">${t('all')}</option>`+cats.map(c=>`<option value="${c}">${optionText(c,'categoryLabels')}</option>`).join('');
  qs('regime-filter').innerHTML=`<option value="">${t('all')}</option>`+regs.map(r=>`<option value="${r}">${optionText(r,'regimeLabels')}</option>`).join('');
  qs('tag-filter').innerHTML=`<option value="">${t('all')}</option>`+tags.map(tag=>`<option value="${tag}">${tag}</option>`).join('');
}
function renderModeOverview(){
  const box=qs('mode-overview'); if(!box) return;
  const isAll=state.strategyMode==='';
  const isCustom=state.strategyMode==='self_build';
  const isLiterature=state.strategyMode==='literature';
  const title = isAll ? t('modeOverviewAllTitle') : (isLiterature ? t('modeOverviewLiteratureTitle') : (isCustom ? t('modeOverviewCustomTitle') : t('modeOverviewTraditionalTitle')));
  const body = isAll ? t('modeOverviewAllBody') : (isLiterature ? t('modeOverviewLiteratureBody') : (isCustom ? t('modeOverviewCustomBody') : t('modeOverviewTraditionalBody')));
  box.innerHTML=`<div class="mode-overview-head"><strong>${title}</strong></div>
    <p>${body}</p>
    ${isAll ? `<div class="mode-overview-builder"><span class="badge mode-badge">${t('dashboardTotal')}</span><strong>${state.templates.length}</strong><p>${t('filterSummary').replace('{visible}', visibleTemplates().length).replace('{total}', state.templates.length)}</p></div>` : ''}
    ${isCustom ? `<div class="mode-overview-extra">${t('modeOverviewCustomExample')}</div><div class="mode-overview-builder"><span class="badge mode-badge">${t('customBuilderBadge')}</span><strong>${t('customBuilderTitle')}</strong><p>${t('customBuilderBody')}</p></div>` : ''}
    ${isLiterature ? `<div class="mode-overview-builder"><span class="badge mode-badge">${t('literatureBadge')}</span><strong>${t('literatureTitle')}</strong><p>${t('literatureSubtitle')}</p></div>` : ''}`;
}
function renderActiveTagChip(){
  const chip=qs('active-tag-chip'); const tag=qs('tag-filter').value;
  if(!tag){ chip.classList.add('hidden'); chip.innerHTML=''; return; }
  chip.classList.remove('hidden'); chip.innerHTML=`<span class="active-tag">${t('tag')}: ${tag}</span> <button type="button" id="clear-tag-btn">${t('clearTag')}</button>`;
  qs('clear-tag-btn').onclick=()=>{ qs('tag-filter').value=''; renderActiveTagChip(); renderTemplateList(); };
}

function activeTemplateFilterLabels(){
  const labels=[];
  const q=(qs('template-search')?.value||'').trim(); if(q) labels.push(`${t('search')}: ${q}`);
  const category=qs('category-filter')?.value||''; if(category) labels.push(`${t('category')}: ${optionText(category,'categoryLabels')}`);
  const regime=qs('regime-filter')?.value||''; if(regime) labels.push(`${t('regime')}: ${optionText(regime,'regimeLabels')}`);
  const tag=qs('tag-filter')?.value||''; if(tag) labels.push(`${t('tag')}: ${tag}`);
  if(qs('favorites-only')?.checked) labels.push(t('favoritesOnly'));
  if(qs('recent-first')?.checked) labels.push(t('recentFirst'));
  if(state.strategyMode) labels.push(strategyModeLabel(state.strategyMode));
  if(Object.values(state.workbench || {}).some(Boolean)) labels.push(state.lang==='zh' ? '引导筛选' : 'Guided filters');
  return labels;
}
function renderTemplateDashboard(rows=null){
  const box=qs('template-dashboard'); if(!box || !state.templates) return;
  const visible = rows || visibleTemplates();
  const counts = {
    total: state.templates.length,
    visible: visible.length,
    literature: state.templates.filter(t=>t.strategy_mode==='literature').length,
    selfBuild: state.templates.filter(t=>t.strategy_mode==='self_build').length,
    traditional: state.templates.filter(t=>t.strategy_mode==='traditional').length,
  };
  box.innerHTML=`<div class="dashboard-pill"><span>${t('dashboardVisible')}</span><strong>${counts.visible}</strong></div>
    <div class="dashboard-pill"><span>${t('dashboardTotal')}</span><strong>${counts.total}</strong></div>
    <div class="dashboard-pill"><span>${t('dashboardLiterature')}</span><strong>${counts.literature}</strong></div>
    <div class="dashboard-pill"><span>${t('dashboardSelfBuild')}</span><strong>${counts.selfBuild}</strong></div>
    <div class="dashboard-pill"><span>${t('dashboardTraditional')}</span><strong>${counts.traditional}</strong></div>`;
}
function renderTemplateFilterSummary(rows=null){
  const box=qs('template-filter-summary'); if(!box) return;
  const visible = rows || visibleTemplates();
  const base = t('filterSummary').replace('{visible}', visible.length).replace('{total}', state.templates.length);
  const labels = activeTemplateFilterLabels();
  box.innerHTML = labels.length ? `${base}<br><span>${t('filterSummaryActive').replace('{filters}', labels.join(' · '))}</span>` : base;
  renderTemplateDashboard(visible);
}
function clearTemplateFilters(){
  if(qs('template-search')) qs('template-search').value='';
  if(qs('category-filter')) qs('category-filter').value='';
  if(qs('regime-filter')) qs('regime-filter').value='';
  if(qs('tag-filter')) qs('tag-filter').value='';
  if(qs('favorites-only')) qs('favorites-only').checked=false;
  if(qs('recent-first')) qs('recent-first').checked=false;
  state.workbench={market:'', signal:'', confirmation:'', risk:''};
  state.strategyMode='';
  savePrefs();
  populateWorkbenchOptions();
  renderWorkbenchRecommendation();
  const visible=visibleTemplates();
  state.selectedTemplate = visible[0] || null;
  renderActiveTagChip();
  applyI18N();
  renderTemplateList();
  renderExplainer();
  renderForm();
  renderStrategySummary();
  setMessage(t('resetFilters'));
}

function populateSelfBuildStudioOptions(){
  const mapping = {
    recipe: 'studio-design-recipe',
    base: 'studio-base-signal',
    confirmation: 'studio-confirmation-bundle',
    exit: 'studio-exit-style',
    risk: 'studio-risk-posture',
  };
  Object.entries(mapping).forEach(([key,id])=>{
    const el=qs(id); if(!el) return;
    const current=state.selfBuildStudio[key] || (SELF_BUILD_STUDIO_OPTIONS[key]?.[0]?.[0] || '');
    el.innerHTML=(SELF_BUILD_STUDIO_OPTIONS[key] || []).map(item=>`<option value="${item[0]}">${localOptionLabel(item)}</option>`).join('');
    el.value=current;
  });
}
function readSelfBuildStudioFromUI(){
  state.selfBuildStudio={
    recipe: qs('studio-design-recipe')?.value || 'starter',
    base: qs('studio-base-signal')?.value || 'trend',
    confirmation: qs('studio-confirmation-bundle')?.value || 'balanced',
    exit: qs('studio-exit-style')?.value || 'composite',
    risk: qs('studio-risk-posture')?.value || 'balanced',
  };
  savePrefs();
}
function scoreTemplateForSelfBuildStudio(tpl){
  if(tpl.strategy_mode !== 'self_build') return -100;
  const s=state.selfBuildStudio || {};
  const text=workbenchText(tpl);
  const tags=new Set(tpl.tags || []);
  let score=0;
  if(tags.has('builder')) score += 2;
  if(s.recipe === 'starter' && (tpl.key === 'self_build_playbook_builder' || text.includes('starter'))) score += 7;
  if(s.recipe === 'trend_pullback' && (tpl.key === 'strategy_recipe_wizard_builder' || text.includes('pullback') || text.includes('recipe'))) score += 6;
  if(s.recipe === 'momentum_breakout' && (tpl.key === 'strategy_recipe_wizard_builder' || text.includes('breakout') || text.includes('momentum'))) score += 6;
  if(s.recipe === 'range_recovery' && (tpl.key === 'strategy_recipe_wizard_builder' || text.includes('recovery') || text.includes('rsi'))) score += 6;
  if(s.recipe === 'volatility_guarded_trend' && (tpl.key === 'adaptive_confirmation_router_builder' || tpl.key === 'strategy_recipe_wizard_builder' || text.includes('volatility'))) score += 7;
  if(s.recipe === 'hybrid_score' && (tpl.key === 'self_build_playbook_builder' || tpl.key === 'component_matrix_builder' || text.includes('score'))) score += 7;
  if(s.recipe === 'futures_long_short' && (tags.has('futures') || text.includes('futures') || text.includes('short'))) score += 10;
  if(s.recipe === 'market_router' && (tpl.key === 'market_state_router_builder' || text.includes('router') || text.includes('regime'))) score += 12;
  if(s.recipe === 'confirmation_stack' && (tpl.key === 'confirmation_stack_builder' || text.includes('confirmation') || text.includes('score'))) score += 12;
  if(s.recipe === 'exit_priority' && (tpl.key === 'exit_priority_stack_builder' || text.includes('exit') || tags.has('risk_layer'))) score += 12;
  if(s.recipe === 'defensive_volatility' && (tpl.key === 'defensive_volatility_guard_builder' || text.includes('defensive') || text.includes('volatility'))) score += 12;
  if(s.recipe === 'scenario_guard' && (tpl.key === 'scenario_guard_builder' || text.includes('scenario') || text.includes('guard'))) score += 14;
  if(s.recipe === 'preset_pack' && (tpl.key === 'preset_pack_router_builder' || text.includes('preset') || text.includes('router'))) score += 14;
  if(s.recipe === 'proxy_confirmation' && (tpl.key === 'multitimeframe_proxy_confirmation_builder' || text.includes('proxy') || text.includes('multi_timeframe'))) score += 14;
  if(s.recipe === 'deconfliction' && (tpl.key === 'signal_deconfliction_builder' || text.includes('deconfliction') || text.includes('conflict'))) score += 14;
  if(s.recipe === 'alpha_stack' && (tpl.key === 'weekly_alpha_stack_builder' || text.includes('alpha') || text.includes('score'))) score += 16;
  if(s.recipe === 'liquidity_guard' && (tpl.key === 'liquidity_participation_guard_builder' || text.includes('liquidity') || text.includes('volume'))) score += 16;
  if(s.recipe === 'risk_budget' && (tpl.key === 'adaptive_risk_budget_builder' || text.includes('budget') || text.includes('risk'))) score += 16;
  if(s.recipe === 'staged_entry' && (tpl.key === 'multi_stage_entry_builder' || text.includes('stage') || text.includes('workflow'))) score += 16;
  if(s.recipe === 'handoff_ready' && (tpl.key === 'strategy_handoff_ready_builder' || text.includes('handoff') || text.includes('readiness'))) score += 16;
  if(s.recipe === 'futures_bias' && (tpl.key === 'futures_bias_router_builder' || text.includes('futures') || text.includes('short'))) score += 16;
  if(s.base === 'trend' && (text.includes('trend') || text.includes('ema') || tags.has('crossover'))) score += 4;
  if(s.base === 'momentum' && (text.includes('momentum') || text.includes('macd') || text.includes('score'))) score += 4;
  if(s.base === 'recovery' && (text.includes('rsi') || text.includes('pullback') || text.includes('recovery'))) score += 4;
  if(s.base === 'breakout' && (text.includes('breakout') || text.includes('channel') || text.includes('squeeze'))) score += 4;
  if(s.base === 'hybrid' && (text.includes('component') || text.includes('matrix') || text.includes('boolean') || text.includes('score'))) score += 5;
  if(s.base === 'futures' && (tags.has('futures') || tags.has('long_short') || text.includes('short'))) score += 8;
  if(s.confirmation === 'strict' && (text.includes('confirmation') || text.includes('layer') || text.includes('matrix'))) score += 3;
  if(s.confirmation === 'volatility_aware' && (text.includes('volatility') || text.includes('atr') || tags.has('adaptive'))) score += 3;
  if(s.exit === 'composite' && (text.includes('composite') || text.includes('exit') || tags.has('risk_layer'))) score += 3;
  if(s.exit === 'atr_protective' && (text.includes('atr') || text.includes('volatility'))) score += 3;
  if(s.risk === 'cautious' && (text.includes('risk') || text.includes('quality') || text.includes('confirmation'))) score += 3;
  if(s.risk === 'exploratory' && (text.includes('matrix') || text.includes('component') || text.includes('score'))) score += 4;
  if(['guided_signal_blender_builder','component_matrix_builder','entry_exit_workflow_builder','strategy_recipe_wizard_builder','adaptive_confirmation_router_builder','signal_quality_gate_builder','self_build_playbook_builder','futures_long_short_momentum_builder','futures_breakout_guard_builder','futures_risk_guard_builder','market_state_router_builder','confirmation_stack_builder','exit_priority_stack_builder','defensive_volatility_guard_builder','scenario_guard_builder','preset_pack_router_builder','multitimeframe_proxy_confirmation_builder','signal_deconfliction_builder','weekly_alpha_stack_builder','liquidity_participation_guard_builder','adaptive_risk_budget_builder','strategy_handoff_ready_builder','multi_stage_entry_builder','futures_bias_router_builder'].includes(tpl.key)) score += 5;
  return score;
}
function recommendedSelfBuildTemplates(limit=3){
  return [...state.templates]
    .map(tpl=>({tpl, score: scoreTemplateForSelfBuildStudio(tpl)}))
    .filter(x=>x.score>0)
    .sort((a,b)=>b.score-a.score)
    .slice(0,limit)
    .map(x=>x.tpl);
}
function studioDesignTip(){
  const s=state.selfBuildStudio || {};
  if(state.lang === 'zh'){
    if(s.recipe === 'starter') return '建议先用 starter 生成一个容易解释的 v1，然后 clone 出 v2 增加确认层。';
    if(s.recipe === 'volatility_guarded_trend') return '波动保护趋势配方适合不稳定行情，请重点检查 max_entry_atr_pct 与 hard_atr_pct 的间距。';
    if(s.recipe === 'hybrid_score') return '混合打分很灵活，但建议先固定权重，只调 min_entry_score。';
    if(s.recipe === 'futures_long_short') return '期货多空配方需要在 Freqtrade 中单独处理杠杆、保证金和交易所配置；Strategy Builder 只生成策略文件。';
    if(s.recipe === 'scenario_guard') return '场景守门适合把本周策略假设写得更清楚：先选一个主场景，再逐步比较压力/突破/反弹版本。';
    if(s.recipe === 'preset_pack') return 'Preset Pack 适合一次生成可比较的 simple、balanced、defensive 版本，但 preset 不是优化结果。';
    if(s.recipe === 'proxy_confirmation') return '多周期 proxy 只是长窗口锚点，不是真实 informative pair；适合保持模板简单。';
    if(s.recipe === 'deconfliction') return '信号消解适合正向信号和风险信号冲突较多的草稿，请重点检查净分阈值。';
    if(s.recipe === 'alpha_stack') return 'Alpha Stack 适合展示本周新增的多信号打分能力，先固定权重，再调最低分数。';
    if(s.recipe === 'liquidity_guard') return 'Liquidity Guard 适合更谨慎的入场草稿，请重点检查成交量倍数和最大 K 线范围。';
    if(s.recipe === 'risk_budget') return 'Risk Budget 用风险预算决定严格程度，建议从 balanced 开始。';
    if(s.recipe === 'staged_entry') return '多阶段入场适合把 setup、trigger、confirmation 分开解释。';
    if(s.recipe === 'handoff_ready') return 'Handoff Ready 更适合作为 Freqtrade 导入前的干净策略草稿。';
    if(s.recipe === 'futures_bias') return 'Futures Bias Router 会生成多空结构，但杠杆和执行仍然属于 Freqtrade。';
    if(s.risk === 'exploratory') return '建议先使用组件矩阵，但只打开三到四个组件；否则很容易变成难以解释的参数堆叠。';
    if(s.confirmation === 'strict') return '严格确认会减少入场机会。建议先生成 balanced 版本，再 clone 出 strict 版本比较设计差异。';
    if(s.exit === 'atr_protective') return 'ATR 保护退出适合波动不稳定市场，但要检查 hard_atr_pct 是否明显高于入场 ATR 上限。';
    return '建议先保持主信号清楚，再逐步增加确认层和退出层。每次只改一个设计维度。';
  }
  if(s.recipe === 'starter') return 'Start with an easy-to-explain v1, then clone v2 to add confirmations.';
  if(s.recipe === 'volatility_guarded_trend') return 'For volatility-guarded trend recipes, review the gap between max_entry_atr_pct and hard_atr_pct.';
  if(s.recipe === 'hybrid_score') return 'Hybrid scoring is flexible, but keep weights fixed first and only tune min_entry_score.';
  if(s.recipe === 'futures_long_short') return 'Futures long-short recipes still require leverage, margin, and exchange settings inside Freqtrade; Strategy Builder only generates the strategy file.';
  if(s.recipe === 'scenario_guard') return "Scenario guard is useful for making this week's strategy assumptions explicit: start with one primary scenario, then compare stress/breakout/recovery versions.";
  if(s.recipe === 'preset_pack') return 'Preset Pack is useful for comparable simple, balanced, and defensive versions; presets are not optimization results.';
  if(s.recipe === 'proxy_confirmation') return 'Multi-timeframe proxy is only a long-window anchor, not a true informative pair; it keeps the template simple.';
  if(s.recipe === 'deconfliction') return 'Signal deconfliction is useful when positive signals conflict with risk signals. Review the net-score threshold carefully.';
  if(s.recipe === 'alpha_stack') return "Alpha Stack showcases this week's multi-signal scoring upgrade. Keep weights fixed first, then tune the minimum score.";
  if(s.recipe === 'liquidity_guard') return 'Liquidity Guard is useful for more cautious entries. Review volume multiplier and maximum candle range.';
  if(s.recipe === 'risk_budget') return 'Risk Budget changes strictness through a risk-budget profile. Start from balanced.';
  if(s.recipe === 'staged_entry') return 'Staged Entry separates setup, trigger, and confirmation so the design is easier to explain.';
  if(s.recipe === 'handoff_ready') return 'Handoff Ready is a clean draft intended for Freqtrade import review.';
  if(s.recipe === 'futures_bias') return 'Futures Bias Router generates long/short structure, but leverage and execution remain in Freqtrade.';
  if(s.risk === 'exploratory') return 'Use the component matrix, but start with only three or four active modules; otherwise the strategy becomes hard to explain.';
  if(s.confirmation === 'strict') return 'Strict confirmation reduces entry frequency. Generate a balanced version first, then clone a stricter version for design comparison.';
  if(s.exit === 'atr_protective') return 'ATR protective exits fit unstable volatility, but make sure hard_atr_pct is clearly above the entry ATR ceiling.';
  return 'Keep the primary signal clear first, then add confirmation and exit layers gradually. Change only one design dimension at a time.';
}
function recipeText(obj){ return tl(obj) || ''; }
function renderRecipeGallery(){
  const root=qs('recipe-gallery-list'); if(!root) return;
  root.innerHTML = STRATEGY_RECIPE_GALLERY.map(recipe => {
    return `<article class="recipe-card" data-recipe-id="${recipe.id}">
      <div class="recipe-card-head">
        <strong>${recipeText(recipe.title)}</strong>
        <span class="badge mode-badge">${recipe.studio.recipe}</span>
      </div>
      <div class="recipe-grid-small">
        <div><span>${t('recipeBestFor')}</span><p>${recipeText(recipe.bestFor)}</p></div>
        <div><span>${t('recipeEntryIdea')}</span><p>${recipeText(recipe.entry)}</p></div>
        <div><span>${t('recipeExitIdea')}</span><p>${recipeText(recipe.exit)}</p></div>
        <div><span>${t('recipeRiskNote')}</span><p>${recipeText(recipe.risk)}</p></div>
      </div>
      <button type="button" class="ghost-btn recipe-apply-btn" data-recipe-apply="${recipe.id}">${t('recipeApply')}</button>
    </article>`;
  }).join('');
  root.querySelectorAll('[data-recipe-apply]').forEach(btn => {
    btn.onclick = () => applyRecipeGalleryItem(btn.dataset.recipeApply);
  });
}
function applyRecipeGalleryItem(recipeId){
  const recipe = STRATEGY_RECIPE_GALLERY.find(x => x.id === recipeId);
  if(!recipe) return;
  state.selfBuildStudio = { ...state.selfBuildStudio, ...recipe.studio };
  savePrefs();
  populateSelfBuildStudioOptions();
  const tpl = state.templates.find(x => x.key === recipe.builderKey) || recommendedSelfBuildTemplates(1)[0];
  if(tpl){
    state.strategyMode = 'self_build';
    state.selectedTemplate = tpl;
    applyI18N();
    renderTemplateList();
    renderExplainer();
    renderForm();
    renderStrategySummary();
    applySelfBuildStudioDefaultsToForm();
  } else {
    renderSelfBuildStudioRecommendation();
  }
  setMessage(t('recipeApplied'));
}
function parameterCoachHTML(tpl){
  const fields = (tpl.fields || []).filter(f => !['strategy_name','export_plot_config'].includes(f.name));
  if(!fields.length) return '';
  const buckets = { sensitivity: [], confirmation: [], risk: [], general: [] };
  fields.forEach(f => {
    const n = f.name.toLowerCase();
    const item = `<li><strong>${tl(f.label)}</strong><span>${tl(f.help)}</span></li>`;
    if(n.includes('fast') || n.includes('slow') || n.includes('window') || n.includes('period') || n.includes('threshold')) buckets.sensitivity.push(item);
    else if(n.includes('confirm') || n.includes('filter') || n.includes('adx') || n.includes('volume') || n.includes('score') || n.includes('gate')) buckets.confirmation.push(item);
    else if(n.includes('stoploss') || n.includes('roi') || n.includes('risk') || n.includes('atr') || n.includes('exit')) buckets.risk.push(item);
    else buckets.general.push(item);
  });
  const block = (title, arr) => arr.length ? `<div class="parameter-coach-bucket"><h5>${title}</h5><ul>${arr.slice(0,4).join('')}</ul></div>` : '';
  return `<details class="parameter-coach"><summary>${t('parameterCoachTitle')}</summary><div class="parameter-coach-grid">
    ${block(t('parameterCoachSensitivity'), buckets.sensitivity)}
    ${block(t('parameterCoachConfirmation'), buckets.confirmation)}
    ${block(t('parameterCoachRisk'), buckets.risk)}
    ${block(t('parameterCoachGeneral'), buckets.general)}
  </div></details>`;
}
function renderSelfBuildStudioRecommendation(){
  const box=qs('studio-recommendation'); if(!box) return;
  const recs=recommendedSelfBuildTemplates(3);
  if(!recs.length){ box.textContent=t('studioEmpty'); return; }
  box.innerHTML=`<div class="recommendation-title">${t('studioRecommendationTitle')}</div>` + recs.map((tpl,idx)=>`
    <button type="button" class="recommendation-chip" data-studio-key="${tpl.key}">
      <span>${idx+1}. ${tl(tpl.label)}</span>
      <small>${tl(tpl.signal_structure) || tl(tpl.description)}</small>
    </button>`).join('') + `<div class="studio-tip"><strong>${t('studioDesignTip')}:</strong> ${studioDesignTip()}</div>`;
  box.querySelectorAll('[data-studio-key]').forEach(btn=>{
    btn.onclick=()=>selectSelfBuildStudioTemplate(btn.dataset.studioKey, false);
  });
}
function selectSelfBuildStudioTemplate(key=null, applyDefaults=true){
  readSelfBuildStudioFromUI();
  const recs=recommendedSelfBuildTemplates(3);
  const tpl=state.templates.find(x=>x.key === (key || recs[0]?.key));
  if(!tpl) return setMessage(t('studioNoBuilder'), true);
  state.strategyMode='self_build';
  state.selectedTemplate=tpl;
  savePrefs();
  applyI18N(); renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary();
  if(applyDefaults) applySelfBuildStudioDefaultsToForm();
  setMessage(t('studioApplied'));
}
function applySelfBuildStudioDefaultsToForm(){
  const s=state.selfBuildStudio || {};
  const mappings={
    strategy_recipe: { starter:'starter', trend:'trend_pullback', momentum:'momentum_breakout', recovery:'range_recovery', breakout:'momentum_breakout', hybrid:'hybrid_score', futures:'futures_long_short', market_router:'market_router', confirmation_stack:'confirmation_stack', exit_priority:'exit_priority', defensive_volatility:'defensive_volatility', scenario_guard:'scenario_guard', preset_pack:'preset_pack', proxy_confirmation:'proxy_confirmation', deconfliction:'deconfliction' },
    playbook_mode: { starter:'starter', trend:'quality_first', momentum:'quality_first', recovery:'starter', breakout:'breakout_first', hybrid:'full_score' },
    base_signal: { trend:'trend', recovery:'recovery', breakout:'breakout', momentum:'trend', hybrid:'trend' },
    trigger_signal: { trend:'ema_trend', recovery:'rsi_recovery', breakout:'breakout', momentum:'ema_trend', hybrid:'ema_trend' },
    router_strictness: { light:'balanced', balanced:'balanced', strict:'strict', volatility_aware:'volatility_first' },
    confirmation_profile: { light:'light', balanced:'balanced', strict:'strict', volatility_aware:'volatility_aware' },
    primary_signal: { trend:'ema_trend', momentum:'macd_momentum', recovery:'rsi_recovery', breakout:'channel_breakout', hybrid:'ema_trend' },
    base_signal: { trend:'ema_trend', recovery:'rsi_recovery', breakout:'channel_breakout', momentum:'ema_trend', hybrid:'ema_trend' },
    entry_workflow: { trend:'trend_pullback', recovery:'momentum_recovery', breakout:'breakout_quality', momentum:'momentum_recovery', hybrid:'trend_pullback' },
    confirmation_bundle: { light:'light', balanced:'balanced', strict:'strict', volatility_aware:'volatility_aware' },
    exit_bundle: { opposite_signal:'opposite_signal', trend_trailing:'trend_trailing', atr_protective:'atr_protective', composite:'composite' },
    exit_mode: { opposite_signal:'opposite_signal', trend_trailing:'trend_break', atr_protective:'composite', composite:'composite' },
    exit_priority: { opposite_signal:'fast_protection', trend_trailing:'let_trend_breathe', atr_protective:'balanced', composite:'balanced' },
    scenario_mode: { scenario_guard:'adaptive', trend:'adaptive', recovery:'recovery_guard', breakout:'breakout_guard' },
    preset_pack: { preset_pack:'balanced', starter:'simple', trend_pullback:'balanced', defensive_volatility:'defensive' },
    proxy_mode: { proxy_confirmation:'hybrid_proxy', trend:'proxy_required', hybrid:'score_proxy' },
    min_net_score: { deconfliction:3, alpha_stack:4 },
    risk_budget_profile: { risk_budget:'balanced', defensive_volatility:'defensive' },
    entry_stage_mode: { staged_entry:'setup_then_trigger', breakout:'setup_then_trigger', trend:'trend_setup' },
    handoff_profile: { handoff_ready:'freqtrade_import', starter:'simple_import' },
    trade_direction: { futures_bias:'long_short' },
  };
  Object.entries(mappings).forEach(([field, dict])=>{
    const el=qs(field); if(!el) return;
    let source = s.base;
    if(field === 'strategy_recipe' || field === 'playbook_mode') source = s.recipe || 'starter';
    else if(field === 'confirmation_profile' || field === 'router_strictness' || field.includes('confirmation')) source = s.confirmation;
    else if(field.includes('exit')) source = s.exit;
    const val=dict[source];
    if(val !== undefined){ el.value=val; el.dispatchEvent(new Event('change', {bubbles:true})); }
  });
  if(s.confirmation === 'strict'){
    ['use_adx_confirmation','use_volume_confirmation','use_trend_guard','use_rsi_confirmation','use_strength_component','use_volume_component'].forEach(id=>{ const el=qs(id); if(el && el.type==='checkbox'){ el.checked=true; el.dispatchEvent(new Event('change',{bubbles:true})); }});
  }
  if(s.confirmation === 'volatility_aware'){
    ['use_volatility_filter','use_volatility_component','use_low_volatility_filter'].forEach(id=>{ const el=qs(id); if(el && el.type==='checkbox'){ el.checked=true; el.dispatchEvent(new Event('change',{bubbles:true})); }});
  }
  if(qs('notes')){
    qs('notes').value = state.lang === 'zh'
      ? `Self-Build Studio: ${s.recipe || "starter"} / ${s.base} / ${s.confirmation} / ${s.exit} / ${s.risk}`
      : `Self-Build Studio: ${s.recipe || "starter"} / ${s.base} / ${s.confirmation} / ${s.exit} / ${s.risk}`;
  }
}
function topKnobs(tpl){
  return (tpl.fields || [])
    .filter(f=>!['strategy_name','timeframe','export_plot_config'].includes(f.name))
    .slice(0,5)
    .map(f=>tl(f.label))
    .filter(Boolean)
    .join(' · ');
}
function simpleStrategyCardHTML(tpl){
  const best = tl(tpl.suitable_market) || regimeMeaning(tpl.market_regime);
  const entry = tl(tpl.entry_logic) || tl(tpl.signal_structure) || tl(tpl.description);
  const exit = tl(tpl.exit_logic) || (state.lang==='zh' ? '由模板退出条件、ROI 和 stoploss 共同定义。' : 'Defined by template exits, ROI, and stoploss.');
  const watch = tl(tpl.weakness) || tl(tpl.overfit_notes);
  return `<section class="simple-strategy-card">
    <div class="simple-card-row"><span>${t('simpleBestFor')}</span><p>${best}</p></div>
    <div class="simple-card-row"><span>${t('simpleEntry')}</span><p>${entry}</p></div>
    <div class="simple-card-row"><span>${t('simpleExit')}</span><p>${exit}</p></div>
    <div class="simple-card-row"><span>${t('simpleKnobs')}</span><p>${topKnobs(tpl) || '-'}</p></div>
    <div class="simple-card-row soft"><span>${t('simpleWatch')}</span><p>${watch}</p></div>
  </section>`;
}
function designBoardHTML(tpl){
  const cards = [];
  const items = [
    [t('logicStructure'), tl(tpl.signal_structure)],
    [t('designRisk'), tl(tpl.risk_logic)],
    [t('logicSensitivity'), tl(tpl.sensitivity_notes)],
    [t('logicRiskControl'), tl(tpl.risk_control_notes)],
    [t('logicOverfit'), tl(tpl.overfit_notes)],
    [t('developmentNotes'), tl(tpl.development_notes)],
  ];
  if((tpl.confirmation_layers||[]).length) cards.push(`<div class="design-card"><strong>${t('logicConfirmations')}</strong><p>${tpl.confirmation_layers.join(' · ')}</p></div>`);
  if((tpl.exit_modules||[]).length) cards.push(`<div class="design-card"><strong>${t('logicExitModules')}</strong><p>${tpl.exit_modules.join(' · ')}</p></div>`);
  items.forEach(([title, body]) => {
    if(body) cards.push(`<div class="design-card"><strong>${title}</strong><p>${body}</p></div>`);
  });
  if(!cards.length) return '';
  return `<details class="design-board folded-design-board"><summary>${t('advancedDetails')}</summary><div class="design-card-grid">${cards.join('')}</div></details>`;
}
function buildField(field, value){
  const wrap=document.createElement('div'); wrap.className='field'+(field.type==='bool'?' bool-field':'');
  if(field.type==='bool'){
    const row=document.createElement('label'); row.className='checkbox-line field-checkbox-line';
    const input=document.createElement('input'); input.type='checkbox'; input.id=field.name; input.checked=Boolean(value ?? field.default);
    const text=document.createElement('span'); text.textContent=tl(field.label); row.append(input,text); wrap.appendChild(row);
    const note=document.createElement('div'); note.className='field-note-card'; note.innerHTML=fieldHelpHTML(field,input.checked); note.classList.toggle('hidden', state.helpMode==='brief' || !note.innerHTML.trim()); wrap.appendChild(note);
    input.addEventListener('change',()=>{ note.innerHTML=fieldHelpHTML(field,input.checked); note.classList.toggle('hidden', state.helpMode==='brief' || !note.innerHTML.trim()); renderStrategySummary(); scheduleAutoPreview(); });
    return wrap;
  }
  const label=document.createElement('label'); label.htmlFor=field.name; label.textContent=tl(field.label); wrap.appendChild(label);
  let input;
  if(field.type==='select'){ input=document.createElement('select'); (field.options||[]).forEach(opt=>{ const o=document.createElement('option'); o.value=opt; o.textContent=opt; if((value ?? field.default)===opt) o.selected=true; input.appendChild(o); }); }
  else { input=document.createElement('input'); input.type=field.type==='str'?'text':'number'; input.value=value ?? field.default ?? ''; if(['int','float'].includes(field.type)){ if(field.min!==null && field.min!==undefined) input.min=field.min; if(field.max!==null && field.max!==undefined) input.max=field.max; input.step=field.type==='int'?'1':'any'; } }
  input.id=field.name; input.name=field.name; wrap.appendChild(input);
  const note=document.createElement('div'); note.className='field-note-card'; const update=()=>{ const currentValue = field.type==='int'? parseInt(input.value || field.default,10): field.type==='float'? parseFloat(input.value || field.default): input.value; note.innerHTML=fieldHelpHTML(field,currentValue); note.classList.toggle('hidden', state.helpMode==='brief' || !note.innerHTML.trim()); renderStrategySummary(); scheduleAutoPreview(); }; update(); input.addEventListener('input',update); input.addEventListener('change',update); wrap.appendChild(note);
  return wrap;
}
function collectValues(){
  const values={}; if(!state.selectedTemplate) return values;
  state.selectedTemplate.fields.forEach(field=>{ const el=qs(field.name); if(!el) return; if(field.type==='bool') values[field.name]=Boolean(el.checked); else if(field.type==='int') values[field.name]=parseInt(el.value,10); else if(field.type==='float') values[field.name]=parseFloat(el.value); else values[field.name]=el.value; });
  return values;
}
function scheduleAutoPreview(){ /* Code preview is intentionally user-triggered in v1.2.07. */ return; }


function setPreviewVisibility(visible){
  state.isPreviewVisible = !!visible;
  const panel = qs('preview-panel');
  const main = document.querySelector('.main-grid');
  const note = qs('preview-collapsed-note');
  const meta = qs('code-meta');
  const code = qs('code-preview');

  if(panel) {
    panel.classList.toggle('preview-hidden', !state.isPreviewVisible);
    panel.setAttribute('aria-expanded', state.isPreviewVisible ? 'true' : 'false');
  }
  if(main) main.classList.toggle('preview-hidden-grid', !state.isPreviewVisible);

  // Hard-toggle actual DOM nodes. This prevents cached CSS or theme styles
  // from accidentally showing the code block when preview is supposed to be hidden.
  if(note) {
    note.hidden = state.isPreviewVisible;
    note.style.display = state.isPreviewVisible ? 'none' : 'block';
  }
  [meta, code].forEach(el => {
    if(!el) return;
    el.hidden = !state.isPreviewVisible;
    el.style.display = state.isPreviewVisible ? '' : 'none';
  });

  const btn = qs('toggle-preview-panel-btn');
  if(btn) {
    btn.textContent = state.isPreviewVisible ? t('hidePreview') : t('showPreview');
    btn.setAttribute('aria-expanded', state.isPreviewVisible ? 'true' : 'false');
  }
}
function togglePreviewVisibility(){ setPreviewVisibility(!state.isPreviewVisible); }
function numericSweepFields(){
  if(!state.selectedTemplate) return [];
  return (state.selectedTemplate.fields || []).filter(f => (f.type === 'int' || f.type === 'float') && !['minimal_roi','stoploss'].includes(f.name));
}
function sweepRows(){ return Array.from(document.querySelectorAll('.sweep-row')); }
function renderSweepRow(defaultField=null){
  const fields = numericSweepFields();
  const selected = defaultField || fields[0]?.name || '';
  const row = document.createElement('div');
  row.className = 'sweep-row';
  row.innerHTML = `
    <select class="sweep-field" aria-label="${t('sweepField')}">${fields.map(f=>`<option value="${f.name}" ${f.name===selected?'selected':''}>${tl(f.label)} (${f.name})</option>`).join('')}</select>
    <input class="sweep-start" type="number" step="any" placeholder="${t('sweepStart')}" />
    <input class="sweep-end" type="number" step="any" placeholder="${t('sweepEnd')}" />
    <input class="sweep-step" type="number" step="any" placeholder="${t('sweepStep')}" />
    <button type="button" class="remove-sweep-btn">${t('remove')}</button>`;
  row.querySelector('.remove-sweep-btn').onclick = () => { row.remove(); updateBatchSummary(''); };
  qs('batch-rows').appendChild(row);
  return row;
}
function resetBatchRows(){ const box=qs('batch-rows'); if(box) box.innerHTML=''; updateBatchSummary(''); }
function updateBatchSummary(html){ const box=qs('batch-summary'); if(box) box.innerHTML = html || ''; }
function ensureBatchRow(){ if(!sweepRows().length) renderSweepRow(); }
function toggleBatchMode(){ const enabled=qs('batch-enabled').checked; qs('batch-container').classList.toggle('hidden', !enabled); if(enabled) ensureBatchRow(); }
function collectSweeps(){
  const rows = sweepRows();
  if(!rows.length) throw new Error(t('batchEmpty'));
  return rows.map(row => ({
    field_name: row.querySelector('.sweep-field').value,
    start: Number(row.querySelector('.sweep-start').value),
    end: Number(row.querySelector('.sweep-end').value),
    step: Number(row.querySelector('.sweep-step').value),
  })).filter(x => x.field_name && Number.isFinite(x.start) && Number.isFinite(x.end) && Number.isFinite(x.step));
}
async function batchPreview(){
  try{
    const sweeps = collectSweeps();
    if(!sweeps.length) throw new Error(t('batchEmpty'));
    const payload={ template_key:state.selectedTemplate.key, values:collectValues(), sweeps, output_dir:state.currentOutputDir, notes:qs('notes').value.trim() };
    const data=await fetchJSON('/api/batch-preview',{method:'POST', body:JSON.stringify(payload)});
    updateBatchSummary(`<strong>${t('batchCount')}: ${data.count}</strong><div class="batch-files">${data.items.slice(0,12).map(x=>`<code>${x.filename}</code>`).join('')}</div>${data.count>12?'<div class="muted">...</div>':''}`);
    renderWarnings(data.warnings || []);
    setMessage(t('batchPreviewOk'));
  }catch(e){ setMessage(e.message,true); }
}
async function batchGenerate(){
  try{
    const sweeps = collectSweeps();
    if(!sweeps.length) throw new Error(t('batchEmpty'));
    const payload={ template_key:state.selectedTemplate.key, values:collectValues(), sweeps, output_dir:state.currentOutputDir, notes:qs('notes').value.trim(), overwrite:qs('overwrite').checked, max_items:100 };
    const data=await fetchJSON('/api/batch-generate',{method:'POST', body:JSON.stringify(payload)});
    updateBatchSummary(`<strong>${t('batchGenerateOk')}: ${data.count}</strong><div class="batch-files">${data.items.slice(0,12).map(x=>`<code>${x.filename}</code>`).join('')}</div>${data.count>12?'<div class="muted">...</div>':''}`);
    renderWarnings(data.warnings || []);
    setMessage(`${t('batchGenerateOk')} · ${data.count}`);
    await refreshStrategies();
  }catch(e){ setMessage(e.message,true); }
}


function statusLabel(value){ return ({draft:t('statusDraft'), review:t('statusReview'), ready:t('statusReady'), parked:t('statusParked')})[value || 'draft'] || value || 'draft'; }
function reviewLabel(value){ return ({not_reviewed:t('reviewNotReviewed'), needs_review:t('reviewNeedsReview'), reviewed:t('reviewReviewed')})[value || 'not_reviewed'] || value || 'not_reviewed'; }
function populateLibraryFilters(){
  const status=qs('library-status-filter');
  if(status) status.innerHTML=`<option value="">${t('statusAll')}</option><option value="draft">${t('statusDraft')}</option><option value="review">${t('statusReview')}</option><option value="ready">${t('statusReady')}</option><option value="parked">${t('statusParked')}</option>`;
  const review=qs('library-review-filter');
  if(review) review.innerHTML=`<option value="">${t('reviewAll')}</option><option value="not_reviewed">${t('reviewNotReviewed')}</option><option value="needs_review">${t('reviewNeedsReview')}</option><option value="reviewed">${t('reviewReviewed')}</option>`;
  if(qs('library-search')) qs('library-search').placeholder=t('librarySearch');
  if(qs('library-tag-filter')) qs('library-tag-filter').placeholder=t('libraryTags');
  if(qs('include-archived-label')) qs('include-archived-label').textContent=t('includeArchived');
  if(qs('bulk-export-btn')) qs('bulk-export-btn').textContent=t('exportSelected');
}
function readLibraryFilters(){
  state.libraryFilters = {
    search: (qs('library-search')?.value || '').toLowerCase().trim(),
    status: qs('library-status-filter')?.value || '',
    review: qs('library-review-filter')?.value || '',
    tag: (qs('library-tag-filter')?.value || '').toLowerCase().trim(),
    includeArchived: Boolean(qs('library-include-archived')?.checked),
  };
}
function filteredStrategyRows(rows=state.strategyRows){
  const f=state.libraryFilters || {};
  return (rows || []).filter(row=>{
    const tags=(row.library_tags || []).map(x=>String(x).toLowerCase());
    const hay=[row.filename,row.template_key,tl(row.template_label),row.notes,row.curation_note,row.market_regime,row.risk_level,...tags].join(' ').toLowerCase();
    if(!f.includeArchived && row.archived) return false;
    if(f.search && !hay.includes(f.search)) return false;
    if(f.status && (row.curation_status || 'draft') !== f.status) return false;
    if(f.review && (row.review_status || 'not_reviewed') !== f.review) return false;
    if(f.tag && !tags.some(tag=>tag.includes(f.tag))) return false;
    return true;
  });
}
function libraryTagPills(tags=[]){ return tags.length ? tags.map(tag=>`<span class="library-tag">${escapeHTML(tag)}</span>`).join('') : '<span class="muted">-</span>'; }
function curationBadgeHTML(row){
  return `<div class="curation-badges"><span class="status-pill status-${escapeHTML(row.curation_status || 'draft')}">${escapeHTML(statusLabel(row.curation_status))}</span><span class="status-pill review-${escapeHTML(row.review_status || 'not_reviewed')}">${escapeHTML(reviewLabel(row.review_status))}</span>${row.archived ? `<span class="status-pill archived-pill">${t('archived')}</span>` : ''}</div>${libraryTagPills(row.library_tags || [])}`;
}
function toggleStrategySelection(filename, checked){ if(checked) state.selectedLibraryFiles.add(filename); else state.selectedLibraryFiles.delete(filename); }
async function deleteStrategy(filename){ if(!confirm(t('confirmDelete'))) return; await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}?output_dir=${encodeURIComponent(state.currentOutputDir)}`, {method:'DELETE'}); await refreshStrategies(); if(state.selectedBaseName) await loadVersions(state.selectedBaseName); }
async function loadDisclaimer(){ state.disclaimer=await fetchJSON('/api/disclaimer'); qs('disclaimer-title').textContent=tl(state.disclaimer.title); qs('disclaimer-body').textContent=tl(state.disclaimer.body); }
async function loadTemplateData(){ const selected=state.selectedTemplate?.key; state.templates=await fetchJSON('/api/templates'); fillFilterOptions(); state.selectedTemplate=state.templates.find(x=>x.key===selected) || visibleTemplates()[0] || state.templates[0] || null; renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary(); renderWorkbenchRecommendation(); renderWeeklyMajorUpdate(); renderLiteratureStrategyCenter(); renderPuzzleBuilder(); }
async function currentOutputDir(){ const data=await fetchJSON('/api/current-output-dir'); state.currentOutputDir=data.output_dir; qs('active-output-dir').textContent=data.output_dir; }
async function loadOutputRoots(){ state.outputRoots=await fetchJSON('/api/output-roots'); }
async function openFolderModal(){
  qs('folder-modal').classList.remove('hidden');
  const manual = qs('manual-output-path');
  if(manual) manual.value = state.currentOutputDir || '';
  const rootList=qs('folder-root-list');
  rootList.innerHTML='';
  state.outputRoots.forEach(root=>{
    const item=document.createElement('div');
    item.className='folder-item';
    item.textContent=root.label;
    item.title=root.path;
    item.onclick=async()=>{
      state.folderBrowserPath=root.path;
      if(manual) manual.value=root.path;
      await renderFolderBrowser(root.path);
      qsa('#folder-root-list .folder-item').forEach(x=>x.classList.remove('active'));
      item.classList.add('active');
    };
    rootList.appendChild(item);
  });
  const start=state.currentOutputDir || state.outputRoots[0]?.path;
  if(start){ state.folderBrowserPath=start; await renderFolderBrowser(start); }
}
function closeFolderModal(){ qs('folder-modal').classList.add('hidden'); }
async function renderFolderBrowser(path){
  const data=await fetchJSON(`/api/fs/list?path=${encodeURIComponent(path)}`);
  state.folderBrowserPath=data.path;
  qs('folder-current-path').textContent=data.path;
  const manual = qs('manual-output-path');
  if(manual) manual.value=data.path;
  const children=qs('folder-children');
  children.innerHTML='';
  data.children.forEach(child=>{
    const item=document.createElement('div');
    item.className='folder-item';
    item.textContent=child.name;
    item.title=child.path;
    item.onclick=async()=>renderFolderBrowser(child.path);
    children.appendChild(item);
  });
  qs('folder-up-btn').onclick=async()=>{ if(data.parent) await renderFolderBrowser(data.parent); };
}
async function confirmFolderSelection(){
  const typed = (qs('manual-output-path')?.value || '').trim();
  const chosen = typed || state.folderBrowserPath;
  const data=await fetchJSON(`/api/current-output-dir?output_dir=${encodeURIComponent(chosen)}`);
  state.currentOutputDir=data.output_dir;
  qs('active-output-dir').textContent=data.output_dir;
  closeFolderModal();
  setMessage(t('selectedDir'));
  await refreshStrategies();
}


function inferTemplateAudit(tpl){
  const text = workbenchText(tpl);
  const tags = new Set(tpl.tags || []);
  const conditionCount = (tpl.fields || []).filter(f => !['strategy_name','timeframe','minimal_roi','stoploss','export_plot_config'].includes(f.name)).length;
  const filterCount = (tpl.confirmation_layers || []).length + (tpl.exit_modules || []).length;
  let clarity = conditionCount <= 4 ? 'Simple' : conditionCount <= 9 ? 'Moderate' : 'Advanced';
  if(tpl.strategy_mode === 'self_build' && conditionCount > 10) clarity = 'Advanced';
  let signal = categoryMeaning(tpl.category);
  if(tags.has('regime') || text.includes('regime')) signal = state.lang==='zh' ? '行情切换 / 自适应' : 'Regime / adaptive';
  if(tags.has('score') || text.includes('score') || text.includes('boolean')) signal = state.lang==='zh' ? '组合打分 / 逻辑组合' : 'Score / logic composition';
  let dependency = 'MA';
  if(text.includes('rsi')) dependency = 'RSI';
  if(text.includes('macd')) dependency = 'MACD';
  if(text.includes('adx')) dependency = 'ADX';
  if(text.includes('atr') || text.includes('volatility')) dependency = 'ATR / Volatility';
  if(text.includes('bollinger') || text.includes('squeeze')) dependency = 'Bollinger / Bandwidth';
  if(text.includes('volume') || tags.has('volume')) dependency += ' + Volume';
  const user = clarity === 'Simple' ? (state.lang==='zh' ? '新手友好' : 'Beginner-friendly') : clarity === 'Moderate' ? (state.lang==='zh' ? '中级用户' : 'Intermediate') : (state.lang==='zh' ? '高级用户' : 'Advanced');
  const risk = tpl.risk_level === 'low' ? (state.lang==='zh' ? '偏谨慎' : 'Cautious') : tpl.risk_level === 'high' ? (state.lang==='zh' ? '偏激进' : 'Aggressive') : (state.lang==='zh' ? '平衡' : 'Balanced');
  const strictness = filterCount >= 5 ? (state.lang==='zh' ? '严格' : 'Strict') : filterCount >= 2 ? (state.lang==='zh' ? '中等' : 'Moderate') : (state.lang==='zh' ? '灵活' : 'Flexible');
  return { clarity, signal, dependency, user, risk, strictness };
}
function auditPillsHTML(tpl){
  const a = inferTemplateAudit(tpl);
  return `<div class="audit-pills"><span class="audit-pill">${t('designClarity')}: ${a.clarity}</span><span class="audit-pill">${t('mainDependency')}: ${a.dependency}</span><span class="audit-pill">${t('riskStrictness')}: ${a.strictness}</span></div>`;
}
function comparisonTableHTML(recs){
  if(!recs.length) return '';
  const rows = recs.map(tpl => {
    const a = inferTemplateAudit(tpl);
    const entry = tl(tpl.entry_logic) || tl(tpl.signal_structure) || tl(tpl.description);
    const exit = tl(tpl.exit_logic) || (state.lang==='zh' ? '模板退出 + ROI / stoploss' : 'Template exit + ROI / stoploss');
    return `<tr data-compare-key="${tpl.key}"><td><button type="button" class="table-select-btn" data-recommend-key="${tpl.key}">${tl(tpl.label)}</button></td><td>${tl(tpl.suitable_market) || regimeMeaning(tpl.market_regime)}</td><td>${a.signal}</td><td>${exit}</td><td>${a.clarity}</td><td>${a.risk}</td></tr>`;
  }).join('');
  return `<div class="comparison-wrap"><div class="comparison-title">${t('comparisonTitle')}</div><table class="comparison-table"><thead><tr><th>${t('compareTemplate')}</th><th>${t('compareBestFor')}</th><th>${t('compareEntry')}</th><th>${t('compareExit')}</th><th>${t('compareComplexity')}</th><th>${t('compareRisk')}</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
function renderWorkbenchRecommendation(){
  const box=qs('workbench-recommendation'); if(!box) return;
  const any=Object.values(state.workbench || {}).some(Boolean);
  if(!any){ box.textContent=t('workbenchRecommendationEmpty'); return; }
  const recs=recommendedTemplates(4);
  if(!recs.length){ box.textContent=t('workbenchNoMatch'); return; }
  box.innerHTML=`<div class="recommendation-title">${t('workbenchRecommendation')}</div>` + recs.map((tpl,idx)=>`
    <button type="button" class="recommendation-chip" data-recommend-key="${tpl.key}">
      <span>${idx+1}. ${tl(tpl.label)}</span>
      <small>${inferTemplateAudit(tpl).clarity} · ${riskMeaning(tpl.risk_level)}</small>
    </button>`).join('') + comparisonTableHTML(recs);
  box.querySelectorAll('[data-recommend-key]').forEach(btn=>{
    btn.onclick=()=>{
      const tpl=state.templates.find(x=>x.key===btn.dataset.recommendKey);
      if(!tpl) return;
      state.strategyMode=tpl.strategy_mode;
      state.selectedTemplate=tpl;
      savePrefs();
      applyI18N(); renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary();
    };
  });
}
function beginnerRecommendSimpleStart(){
  state.workbench = { market:'trending', signal:'trend', confirmation:'', risk:'low' };
  savePrefs(); populateWorkbenchOptions();
  const preferred = ['ema_rsi_pullback','ema_crossover','double_sma_trend','flex_crossover_builder'];
  state.selectedTemplate = preferred.map(k=>state.templates.find(t=>t.key===k)).find(Boolean) || state.templates[0] || null;
  if(state.selectedTemplate) state.strategyMode = state.selectedTemplate.strategy_mode;
  setMessage(t('simpleStartNote'));
  applyI18N(); renderWorkbenchRecommendation(); renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary();
}
function renderTemplateList(){
  const root=qs('template-list'); root.innerHTML='';
  const rows=visibleTemplates();
  renderTemplateFilterSummary(rows);
  if(!rows.length){ root.innerHTML=`<div class="muted empty-state">${t('noResults')}</div>`; return; }
  rows.forEach(tpl=>{
    const card=document.createElement('div');
    card.className='template-card'+(state.selectedTemplate?.key===tpl.key?' active':'');
    card.dataset.key=tpl.key;
    const star=state.favorites.has(tpl.key)?'★':'☆';
    const audit=inferTemplateAudit(tpl);
    const badges=[
      `<span class="badge mode-badge">${strategyModeBadge(tpl)}</span>`,
      `<span class="badge">${optionText(tpl.category,'categoryLabels')}</span>`,
      `<span class="badge">${optionText(tpl.market_regime,'regimeLabels')}</span>`,
      `<span class="badge audit-badge">${audit.clarity}</span>`,
      ...(tpl.tags||[]).slice(0,3).map(tag=>`<span class="badge tag-badge" data-tag="${tag}" title="${tagHelp(tag)}">${tag}</span>`)
    ].join('');
    card.innerHTML=`<button type="button" class="favorite-btn" data-fav="${tpl.key}">${star}</button><div><div class="title-row"><div class="title">${tl(tpl.label)}</div></div><div class="desc">${tl(tpl.description)}</div><div class="template-badges">${badges}</div><div class="template-flow-preview"><span>${tl(tpl.entry_logic) || tl(tpl.signal_structure) || tl(tpl.description)}</span><b>→</b><span>${(tpl.confirmation_layers||[]).slice(0,2).join(' + ') || strategyModeBadge(tpl)}</span><b>→</b><span>${(tpl.exit_modules||[]).slice(0,2).join(' + ') || t('designExit')}</span></div><div class="template-audit-line">${t('mainDependency')}: ${audit.dependency} · ${t('bestUserLevel')}: ${audit.user}</div></div><img src="${tpl.image}" alt="${tl(tpl.label)}" />`;
    card.querySelector('.favorite-btn').onclick=(e)=>{ e.stopPropagation(); toggleFavorite(tpl.key); };
    card.querySelectorAll('.tag-badge').forEach(el=> el.onclick=(e)=>{ e.stopPropagation(); qs('tag-filter').value=el.dataset.tag; renderActiveTagChip(); renderTemplateList(); });
    card.onclick=()=>{ state.selectedTemplate=tpl; markRecent(tpl.key); resetBatchRows(); renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary(); qs('code-filename').textContent=t('notGenerated'); qs('code-version').textContent=''; qs('code-preview').textContent=''; qs('download-preview-btn').disabled=true; qs('download-generated-btn').disabled=true; scheduleAutoPreview(); };
    root.appendChild(card);
  });
}
function strategyDraftNote(tpl, values={}){
  const market = tl(tpl.suitable_market) || regimeMeaning(tpl.market_regime);
  const entry = tl(tpl.entry_logic) || tl(tpl.signal_structure) || tl(tpl.description);
  const knobs = topKnobs(tpl) || Object.keys(values).filter(k=>!['strategy_name','timeframe','export_plot_config'].includes(k)).slice(0,5).join(' · ');
  if(state.lang === 'zh') return `${t('draftNotePrefix')}：面向${market}，使用“${entry}”作为主要入场想法。主要需要关注的参数是 ${knobs || '-'}；生成后请在外部系统中检查和回测。`;
  return `${t('draftNotePrefix')}: Designed for ${market}, using “${entry}” as the main entry idea. Main knobs: ${knobs || '-'}; review and backtest externally after generation.`;
}
function qualityAuditHTML(tpl){
  const a=inferTemplateAudit(tpl);
  return `<section class="quality-audit-card"><h4>${t('qualityAuditTitle')}</h4><div class="quality-grid"><div><span>${t('designClarity')}</span><strong>${a.clarity}</strong></div><div><span>${t('signalType')}</span><strong>${a.signal}</strong></div><div><span>${t('mainDependency')}</span><strong>${a.dependency}</strong></div><div><span>${t('bestUserLevel')}</span><strong>${a.user}</strong></div><div><span>${t('riskStrictness')}</span><strong>${a.strictness}</strong></div></div></section>`;
}
function populatePresetOptions(){
  const sel=qs('preset-select'); if(!sel) return;
  const current=sel.value || 'balanced';
  sel.innerHTML=`<option value="simple">${t('presetSimple')}</option><option value="balanced">${t('presetBalanced')}</option><option value="defensive">${t('presetDefensive')}</option><option value="conservative">${t('presetConservative')}</option><option value="aggressive">${t('presetAggressive')}</option><option value="exploratory">${t('presetExploratory')}</option>`;
  sel.value=current;
}
function clampNumber(v, min, max){
  if(min !== null && min !== undefined) v = Math.max(v, Number(min));
  if(max !== null && max !== undefined) v = Math.min(v, Number(max));
  return v;
}
function presetValue(field, preset){
  const name=field.name.toLowerCase();
  const d=field.default;
  const defensive = preset==='conservative' || preset==='defensive';
  const aggressive = preset==='aggressive' || preset==='exploratory';
  if(preset==='balanced') return d;
  if(preset==='simple'){
    if(field.type==='bool' && (name.includes('confirmation') || name.includes('filter') || name.includes('guard') || name.includes('component'))) return false;
    return d;
  }
  if(name==='stoploss') return defensive ? Math.min(-0.08, Number(d)*1.15) : Math.max(-0.05, Number(d)*0.7);
  if(name==='minimal_roi') return defensive ? Math.max(0.015, Number(d)*0.85) : Math.min(0.12, Number(d)*1.2);
  if(field.type==='bool'){
    if(name.includes('confirmation') || name.includes('filter') || name.includes('guard')) return defensive ? true : Boolean(d);
    if(name.includes('component')) return preset==='exploratory' ? true : Boolean(d);
    return Boolean(d);
  }
  if(field.type==='select') return d;
  if(field.type==='int' || field.type==='float'){
    let v=Number(d);
    if(!Number.isFinite(v)) return d;
    if(name.includes('fast') || name.includes('short')) v = defensive ? v*1.15 : v*0.85;
    else if(name.includes('slow') || name.includes('long') || name.includes('trend') || name.includes('macro')) v = defensive ? v*1.2 : v*0.9;
    else if(name.includes('volume') || name.includes('adx') || name.includes('confirm') || name.includes('min_score') || name.includes('min_confirmations')) v = defensive ? v*1.1 : v*0.9;
    else if(name.includes('max') || name.includes('ceiling')) v = defensive ? v*0.95 : v*1.05;
    else if(name.includes('window') || name.includes('period')) v = defensive ? v*1.15 : v*0.9;
    v=clampNumber(v, field.min, field.max);
    return field.type==='int' ? Math.round(v) : Number(v.toFixed(4));
  }
  return d;
}
function applySelectedPreset(){
  if(!state.selectedTemplate) return;
  const preset=qs('preset-select')?.value || 'balanced';
  state.selectedTemplate.fields.forEach(field=>{
    const el=qs(field.name); if(!el) return;
    const val=presetValue(field,preset);
    if(field.type==='bool') el.checked=Boolean(val); else el.value=val;
    el.dispatchEvent(new Event(field.type==='bool' ? 'change' : 'input', { bubbles:true }));
  });
  renderStrategySummary();
  setMessage(t('presetApplied'));
}
function renderForm(){
  const container=qs('field-container'); container.innerHTML=''; if(!state.selectedTemplate) return;
  const presetPanel=qs('preset-panel'); if(presetPanel) presetPanel.classList.remove('hidden');
  populatePresetOptions();
  const groups={}; state.selectedTemplate.fields.forEach(f=>{ (groups[f.group] ||= []).push(f); });
  const preferredGroups = ['identity','general','entry','parameters','filters','confirmation','score','logic','quality','regime','volatility','exit','risk','risk_layer'];
  const orderedGroups = [...preferredGroups.filter(group => groups[group]), ...Object.keys(groups).filter(group => !preferredGroups.includes(group))];
  const openGroups = new Set(['identity','general','entry','parameters']);
  orderedGroups.forEach(group=>{
    if(!groups[group]) return;
    const sec=document.createElement('details'); sec.className='field-group field-group-details'; sec.open=openGroups.has(group);
    const summary=document.createElement('summary'); summary.className='field-group-title'; summary.textContent=optionText(group,'groupLabels'); sec.appendChild(summary);
    const grid=document.createElement('div'); grid.className='field-grid'; groups[group].forEach(f=>grid.appendChild(buildField(f,f.default))); sec.appendChild(grid); container.appendChild(sec);
  });
}
function renderStrategySummary(){
  const box=qs('strategy-summary'); if(!box) return; if(!state.selectedTemplate){ box.classList.add('empty'); box.innerHTML=''; const pp=qs('preset-panel'); if(pp) pp.classList.add('hidden'); return; }
  const tpl=state.selectedTemplate; const values=collectValues(); const filename=`${values.strategy_name || tpl.key}.py`;
  const rows=[`<div class="summary-row"><span>${t('summaryMode')}</span><strong>${strategyModeLabel(tpl.strategy_mode)}</strong></div>`,`<div class="summary-row"><span>${t('summaryTemplate')}</span><strong>${tl(tpl.label)}</strong></div>`,`<div class="summary-row"><span>${t('summaryOutput')}</span><code>${filename}</code></div>`];
  if(tl(tpl.suitable_market)) rows.push(`<div class="summary-row"><span>${t('logicSuitable')}</span><strong>${tl(tpl.suitable_market)}</strong></div>`);
  if(tl(tpl.signal_structure)) rows.push(`<div class="summary-row"><span>${t('logicStructure')}</span><strong>${tl(tpl.signal_structure)}</strong></div>`);
  const focus=[]; (tpl.fields||[]).slice(0,8).forEach(f=>{ if(['strategy_name','export_plot_config'].includes(f.name)) return; const v=values[f.name]; if(v!==undefined && v!==null && v!=='') focus.push(`${tl(f.label)}: ${v}`); });
  rows.push(`<div class="summary-row"><span>${t('summaryGeneral')}</span><strong>${focus.join(' · ') || '-'}</strong></div>`);
  rows.push(`<div class="summary-hint">${t('autoPreviewHint')}</div>`);
  const draft = `<section class="draft-note"><strong>${t('draftNoteTitle')}</strong><p>${strategyDraftNote(tpl, values)}</p></section>`;
  box.classList.remove('empty'); box.innerHTML=`<h3>${t('summaryTitle')}</h3><div class="summary-grid">${rows.join('')}</div>${draft}`;
}


function escapeHTML(value){
  return String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}
function localFromDict(obj){ return obj ? (obj[state.lang] || obj.en || obj.zh || '') : ''; }
function setLibraryDetail(html){ const box=qs('library-detail-content'); if(!box) return; box.classList.remove('muted'); box.innerHTML=html || `<span class="muted">${t('selectStrategyDetail')}</span>`; }
function renderChecklist(checks=[]){
  if(!checks.length) return '';
  const items = checks.map(c => `<li class="checklist-item ${c.ok ? 'ok' : 'warn'}"><span>${c.ok ? '✓' : '!'}</span>${escapeHTML(localFromDict(c.label) || c.key)}</li>`).join('');
  return `<section class="library-card"><h4>${t('checklistTitle')}</h4><ul class="design-checklist">${items}</ul></section>`;
}
function metadataHTML(filename, meta){
  if(!meta || !Object.keys(meta).length) return `<section class="library-card"><h4>${t('metadataTitle')}</h4><p class="muted">${t('noMetadata')}</p></section>`;
  const draft = localFromDict(meta.strategy_draft_notes) || '-';
  const docs = meta.documentation_notes || {};
  const cur = meta.curation || {};
  const audit = meta.template_quality_audit || {};
  const rows = [
    [t('filename'), filename],
    [t('template'), meta.template_key || '-'],
    [t('baseName'), meta.base_name || '-'],
    [t('version'), meta.version || '-'],
    [t('builderVersion'), meta.builder_version || '-'],
    [t('marketRegime'), meta.market_regime || '-'],
    [t('riskLevel'), meta.risk_level || '-'],
    [t('designClarity'), audit.design_clarity || '-'],
    [t('bestUserLevel'), audit.recommended_user_level || '-'],
    [t('curationStatus'), statusLabel(cur.curation_status)],
    [t('reviewStatus'), reviewLabel(cur.review_status)],
    [t('libraryTags'), (cur.library_tags || []).join(', ') || '-'],
    [t('archived'), cur.archived ? 'true' : 'false'],
    [t('curationNote'), cur.curation_note || '-'],
    [t('userNote'), meta.notes || '-'],
  ].map(([k,v]) => `<div class="meta-row"><span>${escapeHTML(k)}</span><strong>${escapeHTML(v)}</strong></div>`).join('');
  const docBlock = `<div class="draft-note"><strong>${t('documentationTitle')}</strong><p><b>${t('researchNote')}:</b> ${escapeHTML(docs.research_note || '-')}</p><p><b>${t('changeNote')}:</b> ${escapeHTML(docs.change_note || '-')}</p><p><b>${t('externalTestingNote')}:</b> ${escapeHTML(docs.external_testing_note || '-')}</p></div>`;
  return `<section class="library-card"><h4>${t('metadataTitle')}</h4><div class="metadata-grid">${rows}</div><div class="draft-note"><strong>${t('draftNoteTitle')}</strong><p>${escapeHTML(draft)}</p></div>${docBlock}</section>${renderChecklist(meta.design_checklist || [])}<details class="metadata-json"><summary>Raw metadata JSON</summary><pre>${escapeHTML(JSON.stringify(meta, null, 2))}</pre></details>`;
}
async function viewMetadata(filename){
  const data = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/metadata?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  setLibraryDetail(metadataHTML(filename, data.metadata));
}
function diffHTML(data){
  const rows = (data.changed_parameters || []).map(ch => `<tr><td><code>${escapeHTML(ch.field)}</code></td><td>${escapeHTML(JSON.stringify(ch.left))}</td><td>${escapeHTML(JSON.stringify(ch.right))}</td><td>${escapeHTML(ch.design_impact)}</td></tr>`).join('');
  const body = rows || `<tr><td colspan="4" class="muted">${t('noDiff')}</td></tr>`;
  const impact = localFromDict(data.impact_summary || {});
  return `<section class="library-card"><h4>${t('diffTitle')}</h4><p class="muted"><code>${escapeHTML(data.left_filename)}</code> → <code>${escapeHTML(data.right_filename)}</code></p><p>${escapeHTML(localFromDict(data.summary))}</p>${impact ? `<p class="design-impact-summary">${escapeHTML(impact)}</p>` : ''}<table class="comparison-table diff-table"><thead><tr><th>${t('changedParameters')}</th><th>Left</th><th>Right</th><th>${t('designImpact')}</th></tr></thead><tbody>${body}</tbody></table></section>`;
}
async function diffStrategies(leftFilename, rightFilename){
  const data = await fetchJSON(`/api/strategy-diff?left_filename=${encodeURIComponent(leftFilename)}&right_filename=${encodeURIComponent(rightFilename)}&output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  setLibraryDetail(diffHTML(data));
}
function listItemsHTML(items=[]){
  if(!items.length) return '<p class="muted">-</p>';
  return `<ul>${items.map(x=>`<li>${escapeHTML(localFromDict(x) || x)}</li>`).join('')}</ul>`;
}
function reviewHTML(data){
  const r = data.review || {};
  const paramRows = (r.main_parameters || []).map(row => `<tr><td><code>${escapeHTML(row.name)}</code></td><td>${escapeHTML(localFromDict(row.label) || row.name)}</td><td>${escapeHTML(row.value)}</td><td>${escapeHTML(localFromDict(row.explanation))}</td></tr>`).join('');
  return `<section class="library-card review-card"><h4>${t('reviewReport')}</h4><p class="muted">${t('reviewScope')}</p><div class="review-grid"><div><strong>${t('strategyPurpose')}</strong><p>${escapeHTML(localFromDict(r.strategy_purpose))}</p></div><div><strong>${t('marketAssumption')}</strong><p>${escapeHTML(localFromDict(r.market_assumption))}</p></div><div><strong>${t('entryLogic')}</strong><p>${escapeHTML(localFromDict(r.entry_logic))}</p></div><div><strong>${t('exitLogic')}</strong><p>${escapeHTML(localFromDict(r.exit_logic))}</p></div><div><strong>${t('riskLogic')}</strong><p>${escapeHTML(localFromDict(r.risk_logic))}</p></div></div><h4>${t('mainParameters')}</h4><table class="comparison-table diff-table"><thead><tr><th>Field</th><th>Label</th><th>Value</th><th>${t('designImpact')}</th></tr></thead><tbody>${paramRows || `<tr><td colspan="4" class="muted">-</td></tr>`}</tbody></table><h4>${t('designStrengths')}</h4>${listItemsHTML(r.design_strengths || [])}<h4>${t('designRisks')}</h4>${listItemsHTML(r.design_risks || [])}<h4>${t('externalReviewChecklist')}</h4>${listItemsHTML(r.external_review_checklist || [])}<details class="metadata-json"><summary>${t('markdownReport')}</summary><pre>${escapeHTML(data.markdown || '')}</pre></details></section>`;
}
async function viewReview(filename){
  const data = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/review?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  setLibraryDetail(reviewHTML(data));
}
function documentationEditorHTML(filename, notes={}){
  return `<section class="library-card documentation-editor"><h4>${t('documentationTitle')}</h4><label>${t('researchNote')}<textarea id="doc-research-note" rows="3">${escapeHTML(notes.research_note || '')}</textarea></label><label>${t('changeNote')}<textarea id="doc-change-note" rows="3">${escapeHTML(notes.change_note || '')}</textarea></label><label>${t('externalTestingNote')}<textarea id="doc-external-testing-note" rows="3">${escapeHTML(notes.external_testing_note || '')}</textarea></label><button type="button" id="save-documentation-btn">${t('saveDocumentation')}</button></section>`;
}
async function editDocumentation(filename){
  const metaResp = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/metadata?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  setLibraryDetail(documentationEditorHTML(filename, metaResp.metadata?.documentation_notes || {}));
  const btn = qs('save-documentation-btn');
  if(btn){
    btn.onclick = async () => {
      const payload = {
        research_note: qs('doc-research-note')?.value || '',
        change_note: qs('doc-change-note')?.value || '',
        external_testing_note: qs('doc-external-testing-note')?.value || '',
      };
      const updated = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/documentation?output_dir=${encodeURIComponent(state.currentOutputDir)}`, {method:'POST', body:JSON.stringify(payload)});
      setMessage(t('documentationSaved'));
      await refreshStrategies();
      setLibraryDetail(metadataHTML(filename, updated.metadata));
    };
  }
}
function applyValuesToForm(values){
  if(!state.selectedTemplate || !values) return;
  state.selectedTemplate.fields.forEach(field => {
    const el = qs(field.name); if(!el || !(field.name in values)) return;
    if(field.type === 'bool') el.checked = Boolean(values[field.name]); else el.value = values[field.name];
    el.dispatchEvent(new Event(field.type === 'bool' ? 'change' : 'input', { bubbles: true }));
  });
}
async function cloneStrategy(filename){
  const data = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/clone-payload?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  const tpl = state.templates.find(x => x.key === data.template_key);
  if(!tpl) return setMessage(`Template not found: ${data.template_key}`, true);
  state.selectedTemplate = tpl;
  state.strategyMode = tpl.strategy_mode;
  savePrefs();
  renderTemplateList(); renderExplainer(); renderForm();
  applyValuesToForm(data.values);
  if(qs('notes')) qs('notes').value = data.notes ? `${data.notes}\nCloned from ${filename}` : `Cloned from ${filename}`;
  if(qs('save-as-new-version')) qs('save-as-new-version').checked = true;
  renderStrategySummary();
  setMessage(t('cloneLoaded'));
  setLibraryDetail(`<section class="library-card"><h4>${t('clone')}</h4><p>${escapeHTML(t('cloneLoaded'))}</p><pre>${escapeHTML(JSON.stringify(data, null, 2))}</pre></section>`);
}

function currentExportTarget(){
  const el = qs('freqtrade-export-target');
  if(el) state.exportTarget = el.value || 'generic';
  savePrefs();
  return state.exportTarget || 'generic';
}
async function showReadinessCheck(filename){
  const target = currentExportTarget();
  const data = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/readiness?output_dir=${encodeURIComponent(state.currentOutputDir)}&export_target=${encodeURIComponent(target)}`);
  const scores = data.readiness_scores || {};
  const scoreRows = Object.keys(scores).map(k => `<div class="metadata-row"><strong>${escapeHTML(k.replace(/_/g,' '))}</strong><span>${escapeHTML(scores[k])}</span></div>`).join('');
  const rows = (data.checks || []).map(c => `<li><strong>${c.ok ? '✓' : '!'}</strong> ${escapeHTML(c.label)} — <span class="muted">${escapeHTML(c.detail || '')}</span></li>`).join('');
  const warnings = (data.warnings || []).map(w => `<li>${escapeHTML(w)}</li>`).join('');
  const quality = data.code_quality ? `<p><strong>Code quality:</strong> ${escapeHTML(data.code_quality.status || '')} (${escapeHTML(data.code_quality.score || 0)}/${escapeHTML(data.code_quality.max_score || 0)})</p>` : '';
  setLibraryDetail(`<section class="library-card"><h4>${t('readinessCheck')}: ${escapeHTML(filename)}</h4><p>${escapeHTML(data.summary || '')}</p><p><strong>Target:</strong> ${escapeHTML((data.export_target || {}).label || target)}</p><p><strong>Upload folder:</strong> <code>${escapeHTML((data.export_target || {}).folder || '')}</code></p>${quality}${scoreRows ? `<div class="metadata-grid">${scoreRows}</div>` : ''}<ul>${rows}</ul>${warnings ? `<h5>Notes</h5><ul>${warnings}</ul>` : ''}</section>`);
  setMessage(t('readinessStarted'));
}
async function showCodeQualityCheck(filename){
  const target = currentExportTarget();
  const data = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/code-quality?output_dir=${encodeURIComponent(state.currentOutputDir)}&export_target=${encodeURIComponent(target)}`);
  const rows = (data.checks || []).map(c => `<li><strong>${c.ok ? '✓' : '!'}</strong> ${escapeHTML(c.label)} — <span class="muted">${escapeHTML(c.detail || '')}</span></li>`).join('');
  const notes = (data.notes || []).map(w => `<li>${escapeHTML(w)}</li>`).join('');
  setLibraryDetail(`<section class="library-card"><h4>${t('codeQualityCheck')}: ${escapeHTML(filename)}</h4><p><strong>Status:</strong> ${escapeHTML(data.status || '')} (${escapeHTML(data.score || 0)}/${escapeHTML(data.max_score || 0)})</p><p><strong>Target:</strong> ${escapeHTML((data.export_target || {}).label || target)}</p><ul>${rows}</ul>${notes ? `<h5>Notes</h5><ul>${notes}</ul>` : ''}<details class="metadata-json"><summary>Markdown report</summary><pre>${escapeHTML(data.markdown || '')}</pre></details></section>`);
  setMessage(t('codeQualityStarted'));
}


async function showScenarioPlan(filename){
  const target = currentExportTarget();
  const data = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/scenario-plan?output_dir=${encodeURIComponent(state.currentOutputDir)}&export_target=${encodeURIComponent(target)}`);
  setLibraryDetail(`<section class="library-card"><h4>${t('scenarioPlan')}: ${escapeHTML(filename)}</h4><details class="metadata-json" open><summary>Markdown report</summary><pre>${escapeHTML(data.markdown || '')}</pre></details></section>`);
  setMessage(t('scenarioStarted'));
}
async function showTuningGuide(filename){
  const data = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/tuning-guide?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  setLibraryDetail(`<section class="library-card"><h4>${t('tuningGuide')}: ${escapeHTML(filename)}</h4><details class="metadata-json" open><summary>Markdown report</summary><pre>${escapeHTML(data.markdown || '')}</pre></details></section>`);
  setMessage(t('tuningStarted'));
}

function exportStrategyPackage(filename){
  const target = currentExportTarget();
  const url = `/api/strategies/${encodeURIComponent(filename)}/export?output_dir=${encodeURIComponent(state.currentOutputDir)}&export_target=${encodeURIComponent(target)}`;
  window.open(url, '_blank');
  setMessage(t('exportStarted'));
}
function curationEditorHTML(filename, meta={}){
  const c = meta.curation || {};
  const tags = (c.library_tags || []).join(', ');
  return `<section class="library-card curation-editor"><h4>${t('editCuration')}</h4>
    <label>${t('curationStatus')}<select id="curation-status"><option value="draft">${t('statusDraft')}</option><option value="review">${t('statusReview')}</option><option value="ready">${t('statusReady')}</option><option value="parked">${t('statusParked')}</option></select></label>
    <label>${t('reviewStatus')}<select id="curation-review"><option value="not_reviewed">${t('reviewNotReviewed')}</option><option value="needs_review">${t('reviewNeedsReview')}</option><option value="reviewed">${t('reviewReviewed')}</option></select></label>
    <label>${t('libraryTags')}<input id="curation-tags" type="text" value="${escapeHTML(tags)}" placeholder="trend, conservative, btc" /></label>
    <label>${t('curationNote')}<textarea id="curation-note" rows="3">${escapeHTML(c.curation_note || '')}</textarea></label>
    <label class="checkbox-line"><input type="checkbox" id="curation-archived" ${c.archived ? 'checked' : ''}/> <span>${t('archived')}</span></label>
    <button type="button" id="save-curation-btn">${t('saveCuration')}</button>
  </section>`;
}
async function editCuration(filename){
  const metaResp = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/metadata?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  setLibraryDetail(curationEditorHTML(filename, metaResp.metadata || {}));
  const c = (metaResp.metadata || {}).curation || {};
  if(qs('curation-status')) qs('curation-status').value = c.curation_status || 'draft';
  if(qs('curation-review')) qs('curation-review').value = c.review_status || 'not_reviewed';
  const btn=qs('save-curation-btn');
  if(btn){ btn.onclick=async()=>{
    const payload={
      curation_status: qs('curation-status')?.value || 'draft',
      review_status: qs('curation-review')?.value || 'not_reviewed',
      library_tags: (qs('curation-tags')?.value || '').split(/[,;\s]+/).filter(Boolean),
      curation_note: qs('curation-note')?.value || '',
      archived: Boolean(qs('curation-archived')?.checked),
    };
    const updated=await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/curation?output_dir=${encodeURIComponent(state.currentOutputDir)}`, {method:'POST', body:JSON.stringify(payload)});
    setMessage(t('curationSaved'));
    await refreshStrategies();
    setLibraryDetail(metadataHTML(filename, updated.metadata));
  }; }
}
async function archiveStrategy(filename, archived){
  const metaResp = await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/metadata?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  const c = (metaResp.metadata || {}).curation || {};
  const payload={
    curation_status: c.curation_status || 'draft',
    review_status: c.review_status || 'not_reviewed',
    library_tags: c.library_tags || [],
    curation_note: c.curation_note || '',
    archived: Boolean(archived),
  };
  await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}/curation?output_dir=${encodeURIComponent(state.currentOutputDir)}`, {method:'POST', body:JSON.stringify(payload)});
  await refreshStrategies();
  setMessage(archived ? t('archive') : t('unarchive'));
}
async function exportSelectedStrategies(){
  const filenames=[...state.selectedLibraryFiles];
  if(!filenames.length) return setMessage(t('noSelectedStrategies'), true);
  try{
    await downloadResponseBlob(`/api/strategies/bulk-export?output_dir=${encodeURIComponent(state.currentOutputDir)}`, {method:'POST', body:JSON.stringify({filenames, export_target: currentExportTarget()})}, 'strategy_collection_export.zip');
    setMessage(t('bulkExportStarted'));
  }catch(e){ setMessage(e.message, true); }
}
function renderStrategiesTable(rows){
  const body=qs('strategy-table-body'); body.innerHTML='';
  const visible=filteredStrategyRows(rows || []);
  if(!visible.length){ body.innerHTML=`<tr><td colspan="8" class="muted">${t('noStrategies')}</td></tr>`; return; }
  visible.forEach(row=>{
    const design = [row.design_clarity, row.market_regime, row.risk_level].filter(Boolean).join(' · ') || '-';
    const doc = row.documentation_notes || {};
    const note = row.curation_note || row.notes || doc.change_note || doc.research_note || localFromDict(row.draft_note) || '-';
    const checked = state.selectedLibraryFiles.has(row.filename) ? 'checked' : '';
    const tr=document.createElement('tr');
    tr.className = row.archived ? 'archived-row' : '';
    tr.innerHTML=`<td><input type="checkbox" data-select-file="${escapeHTML(row.filename)}" ${checked}/></td><td><code>${escapeHTML(row.filename)}</code></td><td>${escapeHTML(tl(row.template_label) || row.template_key || '-')}</td><td>v${escapeHTML(row.version || 1)}</td><td>${escapeHTML(design)}<div class="curation-cell">${curationBadgeHTML(row)}</div></td><td class="note-cell">${escapeHTML(note)}</td><td>${formatTime(row.updated_at)}</td><td><div class="table-actions"><button type="button" data-view="${escapeHTML(row.filename)}">${t('view')}</button><button type="button" data-review="${escapeHTML(row.filename)}">${t('reviewReport')}</button><button type="button" data-curation="${escapeHTML(row.filename)}">${t('editCuration')}</button><button type="button" data-docs="${escapeHTML(row.filename)}">${t('editDocumentation')}</button><button type="button" data-meta="${escapeHTML(row.filename)}">${t('metadata')}</button><button type="button" data-clone="${escapeHTML(row.filename)}">${t('clone')}</button><button type="button" data-readiness="${escapeHTML(row.filename)}">${t('readinessCheck')}</button><button type="button" data-quality="${escapeHTML(row.filename)}">${t('codeQualityCheck')}</button><button type="button" data-scenario="${escapeHTML(row.filename)}">${t('scenarioPlan')}</button><button type="button" data-tuning="${escapeHTML(row.filename)}">${t('tuningGuide')}</button><button type="button" data-export="${escapeHTML(row.filename)}">${t('exportPackage')}</button><button type="button" data-archive="${escapeHTML(row.filename)}">${row.archived ? t('unarchive') : t('archive')}</button><button type="button" data-versions="${escapeHTML(row.base_name || row.class_name)}">${t('versions')}</button><button type="button" data-delete="${escapeHTML(row.filename)}">${t('delete')}</button></div></td>`;
    tr.querySelector('[data-select-file]').onchange=(e)=>toggleStrategySelection(row.filename,e.target.checked);
    tr.querySelector('[data-view]').onclick=()=>viewStrategy(row.filename,row.base_name||row.class_name,row.version||1);
    tr.querySelector('[data-review]').onclick=()=>viewReview(row.filename);
    tr.querySelector('[data-curation]').onclick=()=>editCuration(row.filename);
    tr.querySelector('[data-docs]').onclick=()=>editDocumentation(row.filename);
    tr.querySelector('[data-meta]').onclick=()=>viewMetadata(row.filename);
    tr.querySelector('[data-clone]').onclick=()=>cloneStrategy(row.filename);
    if(tr.querySelector('[data-readiness]')) tr.querySelector('[data-readiness]').onclick=()=>showReadinessCheck(row.filename);
    if(tr.querySelector('[data-quality]')) tr.querySelector('[data-quality]').onclick=()=>showCodeQualityCheck(row.filename);
    if(tr.querySelector('[data-scenario]')) tr.querySelector('[data-scenario]').onclick=()=>showScenarioPlan(row.filename);
    if(tr.querySelector('[data-tuning]')) tr.querySelector('[data-tuning]').onclick=()=>showTuningGuide(row.filename);
    tr.querySelector('[data-export]').onclick=()=>exportStrategyPackage(row.filename);
    tr.querySelector('[data-archive]').onclick=()=>archiveStrategy(row.filename, !row.archived);
    tr.querySelector('[data-versions]').onclick=()=>loadVersions(row.base_name||row.class_name);
    tr.querySelector('[data-delete]').onclick=()=>deleteStrategy(row.filename);
    body.appendChild(tr);
  });
}
async function loadVersions(baseName){
  state.selectedBaseName=baseName;
  const rows=await fetchJSON(`/api/versions/${encodeURIComponent(baseName)}?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  state.currentVersions = rows;
  const wrap=qs('versions-table-wrap'); const body=qs('versions-table-body'); const empty=qs('versions-empty');
  body.innerHTML='';
  if(!rows.length){ wrap.classList.add('hidden'); empty.classList.remove('hidden'); empty.textContent=t('noVersions'); return; }
  wrap.classList.remove('hidden'); empty.classList.add('hidden');
  rows.forEach((row, idx)=>{
    const prev = idx > 0 ? rows[idx-1] : null;
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>v${escapeHTML(row.version)}</td><td><code>${escapeHTML(row.filename)}</code></td><td>${formatTime(row.updated_at)}</td><td>${escapeHTML(row.notes || '-')}</td><td><div class="table-actions"><button type="button" data-view-version>${t('view')}</button><button type="button" data-review-version>${t('reviewReport')}</button><button type="button" data-docs-version>${t('editDocumentation')}</button><button type="button" data-meta-version>${t('metadata')}</button>${prev ? `<button type="button" data-diff-version>${t('diffPrevious')}</button>` : ''}<button type="button" data-readiness-version>${t('readinessCheck')}</button><button type="button" data-quality-version>${t('codeQualityCheck')}</button><button type="button" data-scenario-version>${t('scenarioPlan')}</button><button type="button" data-tuning-version>${t('tuningGuide')}</button><button type="button" data-export-version>${t('exportPackage')}</button></div></td>`;
    tr.querySelector('[data-view-version]').onclick=()=>viewStrategy(row.filename,row.base_name,row.version);
    tr.querySelector('[data-review-version]').onclick=()=>viewReview(row.filename);
    tr.querySelector('[data-docs-version]').onclick=()=>editDocumentation(row.filename);
    tr.querySelector('[data-meta-version]').onclick=()=>viewMetadata(row.filename);
    if(prev) tr.querySelector('[data-diff-version]').onclick=()=>diffStrategies(prev.filename, row.filename);
    if(tr.querySelector('[data-readiness-version]')) tr.querySelector('[data-readiness-version]').onclick=()=>showReadinessCheck(row.filename);
    if(tr.querySelector('[data-quality-version]')) tr.querySelector('[data-quality-version]').onclick=()=>showCodeQualityCheck(row.filename);
    if(tr.querySelector('[data-scenario-version]')) tr.querySelector('[data-scenario-version]').onclick=()=>showScenarioPlan(row.filename);
    if(tr.querySelector('[data-tuning-version]')) tr.querySelector('[data-tuning-version]').onclick=()=>showTuningGuide(row.filename);
    tr.querySelector('[data-export-version]').onclick=()=>exportStrategyPackage(row.filename);
    body.appendChild(tr);
  });
}
async function previewCode(silent=false){
  if(!state.selectedTemplate) return silent?null:setMessage(t('noTemplate'),true);
  if(!silent){ setPreviewVisibility(true); setMessage(t('previewing')); }
  try {
    const payload={ template_key:state.selectedTemplate.key, values:collectValues(), output_dir:state.currentOutputDir, save_as_new_version:qs('save-as-new-version').checked, notes:qs('notes').value.trim() };
    const data=await fetchJSON('/api/preview',{method:'POST', body:JSON.stringify(payload)});
    state.lastPreview=data; qs('code-filename').textContent=data.filename; qs('code-version').textContent=`v${data.version}`; qs('code-preview').textContent=data.code; qs('download-preview-btn').disabled=false; qs('download-generated-btn').disabled=false;
    renderWarnings(data.warnings || []);
    if(data.design_checklist) setLibraryDetail(renderChecklist(data.design_checklist));
    if(!silent) setMessage(t('previewOk'));
  } catch(e){ if(!silent) setMessage(e.message,true); }
}
async function generateCode(){
  if(!state.selectedTemplate) return setMessage(t('noTemplate'),true);
  setMessage(t('generating'));
  try {
    const payload={ template_key:state.selectedTemplate.key, values:collectValues(), output_dir:state.currentOutputDir, save_as_new_version:qs('save-as-new-version').checked, notes:qs('notes').value.trim(), overwrite:qs('overwrite').checked };
    const data=await fetchJSON('/api/generate',{method:'POST', body:JSON.stringify(payload)});
    state.lastPreview=data; qs('code-filename').textContent=data.filename; qs('code-version').textContent=`v${data.version}`; qs('code-preview').textContent=data.code; qs('download-preview-btn').disabled=false; qs('download-generated-btn').disabled=false;
    setMessage(`${t('generateOk')} · ${t('generatedTo')}: ${data.saved_to}`); renderWarnings(data.warnings || []);
    await refreshStrategies(); await loadVersions(data.base_name); await viewMetadata(data.filename);
  } catch(e){ setMessage(e.message,true); }
}

async function viewStrategy(filename, baseName=null, version=null){
  const data=await fetchJSON(`/api/strategies/${encodeURIComponent(filename)}?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  setPreviewVisibility(true);
  qs('code-filename').textContent=data.filename;
  qs('code-version').textContent=version?`v${version}`:'';
  qs('code-preview').textContent=data.source;
  if(baseName) loadVersions(baseName);
}
async function refreshStrategies(){
  const rows=await fetchJSON(`/api/strategies?output_dir=${encodeURIComponent(state.currentOutputDir)}`);
  state.strategyRows=rows;
  readLibraryFilters();
  renderStrategiesTable(rows);
  renderWeeklyMajorUpdate();
}

function bindEvents(){
  qsa('.lang-btn').forEach(btn=>btn.onclick=async()=>{ state.lang=btn.dataset.lang; savePrefs(); applyI18N(); populateSelfBuildStudioOptions(); await loadDisclaimer(); fillFilterOptions(); renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary(); await refreshStrategies(); if(state.selectedBaseName) await loadVersions(state.selectedBaseName); });
  qsa('.help-mode-btn').forEach(btn=>btn.onclick=()=>{ state.helpMode=btn.dataset.helpMode; savePrefs(); applyI18N(); renderExplainer(); renderForm(); renderStrategySummary(); });
  qsa('.theme-btn').forEach(btn=>btn.onclick=()=>{ state.theme=btn.dataset.theme; savePrefs(); applyTheme(); applyI18N(); });
  qsa('.strategy-mode-btn').forEach(btn=>btn.onclick=()=>{ state.strategyMode=btn.dataset.strategyMode || ''; savePrefs(); const visible=visibleTemplates(); if(!visible.some(x=>x.key===state.selectedTemplate?.key)) { state.selectedTemplate=visible[0] || null; resetBatchRows(); } applyI18N(); renderModeOverview(); renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary(); scheduleAutoPreview(); });
  ['template-search','category-filter','regime-filter','tag-filter','favorites-only','recent-first'].forEach(id=>{ qs(id).addEventListener('input',()=>{ renderActiveTagChip(); renderModeOverview(); renderTemplateList(); }); qs(id).addEventListener('change',()=>{ renderActiveTagChip(); renderModeOverview(); renderTemplateList(); }); });
  ['workbench-market','workbench-signal','workbench-confirmation','workbench-risk'].forEach(id=>{ const el=qs(id); if(el) el.addEventListener('change',()=>{ readWorkbenchFromUI(); renderWorkbenchRecommendation(); renderTemplateList(); }); });
  ['studio-design-recipe','studio-base-signal','studio-confirmation-bundle','studio-exit-style','studio-risk-posture'].forEach(id=>{ const el=qs(id); if(el) el.addEventListener('change',()=>{ readSelfBuildStudioFromUI(); renderSelfBuildStudioRecommendation(); }); });
  if(qs('apply-workbench-btn')) qs('apply-workbench-btn').onclick=applyWorkbenchFilters;
  if(qs('clear-workbench-btn')) qs('clear-workbench-btn').onclick=clearWorkbenchFilters;
  if(qs('beginner-recommend-btn')) qs('beginner-recommend-btn').onclick=beginnerRecommendSimpleStart;
  if(qs('studio-apply-btn')) qs('studio-apply-btn').onclick=()=>selectSelfBuildStudioTemplate(null, true);
  if(qs('apply-preset-btn')) qs('apply-preset-btn').onclick=applySelectedPreset;
  if(qs('reset-template-filters-btn')) qs('reset-template-filters-btn').onclick=clearTemplateFilters;
  qs('preview-btn').onclick=()=>previewCode(false); qs('toggle-preview-panel-btn').onclick=togglePreviewVisibility; qs('generate-btn').onclick=generateCode; qs('refresh-strategies').onclick=refreshStrategies; ['library-search','library-status-filter','library-review-filter','library-tag-filter','library-include-archived'].forEach(id=>{ const el=qs(id); if(el){ el.addEventListener('input',()=>{ readLibraryFilters(); renderStrategiesTable(state.strategyRows); }); el.addEventListener('change',()=>{ readLibraryFilters(); renderStrategiesTable(state.strategyRows); }); }}); if(qs('bulk-export-btn')) qs('bulk-export-btn').onclick=exportSelectedStrategies; if(qs('clear-library-detail-btn')) qs('clear-library-detail-btn').onclick=()=>setLibraryDetail(`<span class="muted">${t('selectStrategyDetail')}</span>`); qs('choose-output-btn').onclick=openFolderModal; qs('close-folder-modal').onclick=closeFolderModal; qs('confirm-folder-btn').onclick=confirmFolderSelection; qs('download-preview-btn').onclick=()=>{ if(state.lastPreview?.code) downloadBlob(state.lastPreview.filename || 'strategy.py', state.lastPreview.code); }; qs('download-generated-btn').onclick=()=>{ if(state.lastPreview?.code) downloadBlob(state.lastPreview.filename || 'strategy.py', state.lastPreview.code); };
  if(qs('freqtrade-export-target')){ qs('freqtrade-export-target').value = state.exportTarget || 'generic'; qs('freqtrade-export-target').onchange=()=>{ state.exportTarget = qs('freqtrade-export-target').value || 'generic'; savePrefs(); }; }
  qs('batch-enabled').onchange=toggleBatchMode; qs('add-sweep-btn').onclick=()=>renderSweepRow(); qs('batch-preview-btn').onclick=batchPreview; qs('batch-generate-btn').onclick=batchGenerate;
}



const WEEKLY_MAJOR_TRACKS = [
  {
    id: 'alpha_stack',
    title: {zh:'Alpha Stack 快速草稿', en:'Alpha Stack Quick Draft'},
    body: {zh:'把趋势、动量、成交量、波动保护组合成一个清楚的打分型自组策略。', en:'Combine trend, momentum, volume, and volatility guard into a clear score-based self-build draft.'},
    recipe:'alpha_stack', base:'hybrid', confirmation:'strict', exit:'composite', risk:'balanced', builderKey:'weekly_alpha_stack_builder'
  },
  {
    id: 'liquidity_guard',
    title: {zh:'Liquidity Guard 入场质量', en:'Liquidity Guard Entry Quality'},
    body: {zh:'强调成交量、K线幅度、ATR 和距离过滤，适合更谨慎的入场草稿。', en:'Focus on volume, candle range, ATR, and distance filters for more cautious entry drafts.'},
    recipe:'liquidity_guard', base:'trend', confirmation:'volatility_aware', exit:'atr_protective', risk:'cautious', builderKey:'liquidity_participation_guard_builder'
  },
  {
    id: 'risk_budget',
    title: {zh:'Risk Budget 自适应风险层', en:'Risk Budget Adaptive Layer'},
    body: {zh:'用 defensive / balanced / growth 风险预算组织入场、退出和波动保护。', en:'Organize entry, exit, and volatility protection through defensive / balanced / growth risk budgets.'},
    recipe:'risk_budget', base:'hybrid', confirmation:'balanced', exit:'composite', risk:'balanced', builderKey:'adaptive_risk_budget_builder'
  },
  {
    id: 'staged_entry',
    title: {zh:'Multi-Stage Entry 多阶段入场', en:'Multi-Stage Entry Workflow'},
    body: {zh:'先建立 setup，再等待 trigger 和 confirmation，适合更像流程图的策略设计。', en:'Build setup first, then wait for trigger and confirmation; useful for workflow-like strategy design.'},
    recipe:'staged_entry', base:'breakout', confirmation:'balanced', exit:'trend_trailing', risk:'balanced', builderKey:'multi_stage_entry_builder'
  },
  {
    id: 'handoff_ready',
    title: {zh:'Freqtrade Handoff Ready', en:'Freqtrade Handoff Ready'},
    body: {zh:'偏向干净、可解释、容易导入 Freqtrade 的策略草稿和导出说明。', en:'A cleaner, explainable draft designed for easier Freqtrade handoff and export review.'},
    recipe:'handoff_ready', base:'trend', confirmation:'light', exit:'opposite_signal', risk:'simple', builderKey:'strategy_handoff_ready_builder'
  },
  {
    id: 'futures_bias',
    title: {zh:'Futures Bias Router', en:'Futures Bias Router'},
    body: {zh:'为 futures 工作流准备多空偏向路由，但杠杆和执行仍在 Freqtrade 中处理。', en:'Prepare long/short bias routing for futures workflows while leverage and execution stay inside Freqtrade.'},
    recipe:'futures_bias', base:'futures', confirmation:'balanced', exit:'composite', risk:'cautious', builderKey:'futures_bias_router_builder'
  }
];

function weeklyText(obj){ return tl(obj) || ''; }
function weeklyTemplateCount(kind){
  if(!state.templates) return 0;
  if(kind === 'self') return state.templates.filter(t => t.strategy_mode === 'self_build').length;
  if(kind === 'future') return state.templates.filter(t => (t.tags || []).includes('futures') || t.supports_futures).length;
  if(kind === 'new') return state.templates.filter(t => (t.tags || []).includes('v1139')).length;
  return state.templates.length;
}
function weeklyStatCard(label, value, note){
  return `<div class="weekly-stat-card"><span>${label}</span><strong>${value}</strong><p>${note}</p></div>`;
}
function renderWeeklyMajorUpdate(){
  const panel = qs('weekly-major-panel'); if(!panel) return;
  if(qs('weekly-major-kicker')) qs('weekly-major-kicker').textContent = t('weeklyMajorKicker');
  if(qs('weekly-major-title')) qs('weekly-major-title').textContent = t('weeklyMajorTitle');
  if(qs('weekly-major-subtitle')) qs('weekly-major-subtitle').textContent = t('weeklyMajorSubtitle');
  const stats = qs('weekly-stats-grid');
  if(stats){
    stats.innerHTML = [
      weeklyStatCard(t('weeklyTotalTemplates'), weeklyTemplateCount('all'), t('weeklyTotalTemplatesNote')),
      weeklyStatCard(t('weeklySelfBuild'), weeklyTemplateCount('self'), t('weeklySelfBuildNote')),
      weeklyStatCard(t('weeklyNewModules'), weeklyTemplateCount('new'), t('weeklyNewModulesNote')),
      weeklyStatCard(t('weeklyGenerated'), (state.strategyRows || []).length, t('weeklyGeneratedNote')),
    ].join('');
  }
  const launch = qs('weekly-launch-grid');
  if(launch){
    launch.innerHTML = WEEKLY_MAJOR_TRACKS.map(track => `<article class="weekly-launch-card" data-weekly-track="${track.id}">
      <div class="weekly-launch-top"><strong>${weeklyText(track.title)}</strong><span>${state.lang === 'zh' ? '当前版本' : 'Current'}</span></div>
      <p>${weeklyText(track.body)}</p>
      <div class="weekly-launch-tags"><span>${track.recipe}</span><span>${track.risk}</span></div>
      <button type="button" class="ghost-btn" data-weekly-apply="${track.id}">${t('weeklyApplyTrack')}</button>
    </article>`).join('');
    launch.querySelectorAll('[data-weekly-apply]').forEach(btn => {
      btn.onclick = () => applyWeeklyLaunchTrack(btn.dataset.weeklyApply);
    });
  }
  const workflow = qs('weekly-workflow-strip');
  if(workflow){
    const steps = [t('weeklyFlow1'), t('weeklyFlow2'), t('weeklyFlow3'), t('weeklyFlow4'), t('weeklyFlow5')];
    workflow.innerHTML = `<div class="weekly-workflow-title">${t('weeklyWorkflowTitle')}</div>` + steps.map((step, idx) => `<div class="weekly-workflow-step"><b>${idx+1}</b><span>${step}</span></div>`).join('');
  }
}
function applyWeeklyLaunchTrack(trackId){
  const track = WEEKLY_MAJOR_TRACKS.find(x => x.id === trackId);
  if(!track) return;
  state.selfBuildStudio = {
    recipe: track.recipe,
    base: track.base,
    confirmation: track.confirmation,
    exit: track.exit,
    risk: track.risk,
  };
  savePrefs();
  populateSelfBuildStudioOptions();
  const tpl = state.templates.find(x => x.key === track.builderKey) || recommendedSelfBuildTemplates(1)[0];
  if(tpl){
    state.strategyMode = 'self_build';
    state.selectedTemplate = tpl;
    savePrefs();
    applyI18N();
    renderTemplateList();
    renderExplainer();
    renderForm();
    renderStrategySummary();
    applySelfBuildStudioDefaultsToForm();
    showLayer('selfbuild', false);
    const builder = qs('builder-panel'); if(builder) builder.scrollIntoView({behavior:'smooth', block:'start'});
    setMessage(t('weeklyTrackApplied'));
  }
}



function selectTemplateAndScroll(key){
  const tpl = state.templates.find(x => x.key === key);
  if(!tpl) return;
  state.strategyMode = tpl.strategy_mode;
  state.selectedTemplate = tpl;
  markRecent(tpl.key);
  savePrefs();
  applyI18N();
  renderTemplateList();
  renderExplainer();
  renderForm();
  renderStrategySummary();
  showLayer(tpl.strategy_mode === 'literature' ? 'literature' : 'build', false);
  const builder = qs('builder-panel');
  if(builder) builder.scrollIntoView({behavior:'smooth', block:'start'});
}
function setModeAndScroll(mode, targetId){
  state.strategyMode = mode;
  savePrefs();
  const visible = state.templates.filter(t => t.strategy_mode === mode);
  if(visible.length) state.selectedTemplate = visible[0];
  applyI18N();
  renderTemplateList();
  renderExplainer();
  renderForm();
  renderStrategySummary();
  const layer = mode === 'literature' ? 'literature' : (mode === 'self_build' ? 'selfbuild' : 'build');
  showLayer(layer, false);
  const target = qs(targetId) || qs('templates-panel');
  if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
}
function bindMainEntryActions(){
  const lit = qs('entry-literature-btn'); if(lit) lit.onclick=()=>setModeAndScroll('literature','literature-strategy-panel');
  const guided = qs('entry-guided-btn'); if(guided) guided.onclick=()=>{ const target=qs('workbench-panel'); if(target) target.scrollIntoView({behavior:'smooth', block:'start'}); };
  const self = qs('entry-self-btn'); if(self) self.onclick=()=>setModeAndScroll('self_build','self-build-studio');
  const exp = qs('entry-export-btn'); if(exp) exp.onclick=()=>{ const target=qs('freqtrade-import-panel'); if(target) target.scrollIntoView({behavior:'smooth', block:'start'}); };
  const viewAll = qs('literature-view-all-btn'); if(viewAll) viewAll.onclick=()=>setModeAndScroll('literature','templates-panel');
}



// Layered page navigation for v1.2.07.
// The goal is to keep the opening screen simple and move advanced panels into deeper pages.
const LAYER_SECTION_IDS = [
  'main-entry-panel',
  'guide-overview-section',
  'disclaimer-banner',
  'literature-strategy-panel',
  'weekly-major-panel',
  'freqtrade-import-panel',
  'workbench-panel',
  'self-build-studio',
  'recipe-gallery-panel',
  'puzzle-builder-panel',
  'filter-section',
  'builder-workspace-section',
  'library-section',
  'library-detail-panel'
];
const LAYER_MAP = {
  home: ['main-entry-panel', 'guide-overview-section', 'disclaimer-banner'],
  literature: ['literature-strategy-panel', 'filter-section', 'builder-workspace-section'],
  guided: ['workbench-panel', 'filter-section', 'builder-workspace-section'],
  selfbuild: ['self-build-studio', 'recipe-gallery-panel', 'filter-section', 'builder-workspace-section'],
  puzzle: ['puzzle-builder-panel'],
  build: ['filter-section', 'builder-workspace-section'],
  library: ['library-section', 'library-detail-panel'],
  export: ['freqtrade-import-panel', 'library-section'],
  updates: ['weekly-major-panel']
};
function layerIntroCopy(layer){
  const zh = {
    home: ['简单入口', '先选一个方向，不要一开始面对所有模块。', 'Start 页面只保留最重要的入口；文献策略、引导构建、自组策略、策略库和导出流程都放到更深一层。'],
    literature: ['文献策略', '从研究启发的策略草稿开始。', '这一层只展示文献启发策略和生成区，帮助用户先理解策略思想，再进入参数配置。'],
    guided: ['引导构建', '回答几个问题，让系统推荐模板。', '适合不确定该选哪个策略的用户。高级确认层默认折叠，降低选择压力。'],
    selfbuild: ['自组策略', '组合信号、确认层、退出层和风险控制。', '适合想定制策略结构的用户；Recipe Gallery 和 Self-Build Studio 放在同一层。'],
    puzzle: ['拼图 Builder', '像少儿编程一样拖拽组件。', '把策略拆成市场假设、入场信号、确认层、退出层、风险层五个积木块，拼好后再转成可生成的 Self-Build 策略。'],
    build: ['策略生成器', '直接浏览模板并生成策略文件。', '适合已经知道要使用哪个模板的用户。'],
    library: ['策略库', '管理已生成策略、版本、metadata 和导出包。', '这一层只处理已经生成的策略，不运行回测或交易。'],
    export: ['Freqtrade 导出', '生成后下载，再手动上传到 Freqtrade。', '这一层说明稳定的 Olares 工作流：Strategy Builder 生成文件，Freqtrade 负责测试和执行。'],
    updates: ['本周更新', '查看最近新增功能。', '这里保留 Command Center 和 quick build tracks，但默认不在首页堆叠展示。']
  };
  const en = {
    home: ['Simple entry', 'Choose one direction first instead of facing every module at once.', 'The Start page keeps only the main choices. Literature strategies, guided builder, self-build studio, library, and export flow live one layer deeper.'],
    literature: ['Literature strategies', 'Start from research-inspired strategy drafts.', 'This layer focuses on literature-inspired ideas and the generation workspace so users can understand the idea before tuning parameters.'],
    guided: ['Guided builder', 'Answer a few questions and let the app recommend templates.', 'This is for users who are not sure which strategy to choose. Advanced confirmation options stay folded by default.'],
    selfbuild: ['Self-build studio', 'Combine signals, confirmations, exits, and risk layers.', 'For users who want to customize the strategy structure. Recipe Gallery and Self-Build Studio are grouped in one layer.'],
    puzzle: ['Puzzle Builder', 'Drag strategy blocks like a beginner coding toy.', 'Break a strategy into five blocks: market idea, entry signal, confirmation, exit, and risk. Then convert the puzzle into a Self-Build strategy draft.'],
    build: ['Strategy builder', 'Browse templates directly and generate strategy files.', 'For users who already know which template they want to use.'],
    library: ['Strategy library', 'Manage generated strategies, versions, metadata, and export packages.', 'This layer only manages generated files. It does not run backtests or trades.'],
    export: ['Freqtrade export', 'Download the strategy, then manually upload it to Freqtrade.', 'This layer explains the stable Olares workflow: Strategy Builder generates files, while Freqtrade handles testing and execution.'],
    updates: ['Weekly update', 'Review newly added features.', 'The Command Center and quick build tracks are still available, but they are not stacked on the opening page.']
  };
  const src = state.lang === 'zh' ? zh : en;
  return src[layer] || src.home;
}
function setLayerIntro(layer){
  const copy = layerIntroCopy(layer);
  const k = qs('layer-intro-kicker'), title = qs('layer-intro-title'), body = qs('layer-intro-body');
  if(k) k.textContent = copy[0];
  if(title) title.textContent = copy[1];
  if(body) body.textContent = copy[2];
}
function showLayer(layer='home', scrollTop=false){
  if(!LAYER_MAP[layer]) layer = 'home';
  state.activeLayer = layer;
  LAYER_SECTION_IDS.forEach(id => { const el = qs(id); if(el) el.classList.add('layer-hidden'); });
  (LAYER_MAP[layer] || []).forEach(id => { const el = qs(id); if(el) el.classList.remove('layer-hidden'); });
  qsa('[data-layer-nav]').forEach(btn => btn.classList.toggle('active', btn.dataset.layerNav === layer));
  setLayerIntro(layer);
  try { localStorage.setItem('strategyBuilderActiveLayer', layer); } catch(e) {}
  if(scrollTop){ const intro = qs('layer-intro') || document.body; intro.scrollIntoView({behavior:'smooth', block:'start'}); }
}
function bindLayeredNavigation(){
  qsa('[data-layer-nav]').forEach(btn => btn.onclick = () => showLayer(btn.dataset.layerNav, true));
  const entries = {
    'entry-literature-btn': ['literature', 'literature'],
    'entry-guided-btn': ['guided', null],
    'entry-self-btn': ['selfbuild', 'self_build'],
    'entry-puzzle-btn': ['puzzle', null],
    'entry-export-btn': ['export', null],
    'literature-view-all-btn': ['literature', 'literature']
  };
  Object.entries(entries).forEach(([id, cfg]) => {
    const el = qs(id); if(!el) return;
    el.onclick = () => { if(cfg[1]) setStrategyModeOnly(cfg[1]); showLayer(cfg[0], true); };
  });
  const saved = localStorage.getItem('strategyBuilderActiveLayer') || 'home';
  showLayer(saved, false);
}
function setStrategyModeOnly(mode){
  state.strategyMode = mode;
  savePrefs();
  const visible = state.templates ? state.templates.filter(t => t.strategy_mode === mode) : [];
  if(visible.length && !visible.some(x => x.key === state.selectedTemplate?.key)) state.selectedTemplate = visible[0];
  renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary();
}
function selectTemplateAndOpenBuilder(key){
  const tpl = state.templates.find(x => x.key === key);
  if(!tpl) return;
  state.strategyMode = tpl.strategy_mode;
  state.selectedTemplate = tpl;
  markRecent(tpl.key);
  savePrefs();
  applyI18N(); renderTemplateList(); renderExplainer(); renderForm(); renderStrategySummary();
  showLayer(tpl.strategy_mode === 'literature' ? 'literature' : 'build', true);
}


// ===== v1.2.10 Easy-first Puzzle Builder / advanced canvas interface =====
const PUZZLE_STAGE_ORDER = ['recipe','timeframe','base','secondary','combiner','confirmation','regime','exit','stop','sizing','execution','risk'];
const PUZZLE_DEFAULT = {
  recipe:'starter', timeframe:'single_timeframe', base:'trend', secondary:'none', combiner:'and',
  confirmation:'balanced', regime:'none', exit:'composite', stop:'atr_stop', sizing:'fixed',
  execution:'market_safe', risk:'balanced'
};
const PUZZLE_PRESETS = {
  simple: { recipe:'starter', timeframe:'single_timeframe', base:'trend', secondary:'none', combiner:'and', confirmation:'light', regime:'none', exit:'opposite_signal', stop:'simple_stop', sizing:'fixed', execution:'market_safe', risk:'balanced' },
  defensive: { recipe:'trend_pullback', timeframe:'higher_timeframe_bias', base:'trend', secondary:'rsi_filter', combiner:'and', confirmation:'strict', regime:'volatility_aware', exit:'atr_protective', stop:'atr_stop', sizing:'volatility_scaled', execution:'spread_guard', risk:'cautious' },
  breakout: { recipe:'momentum_breakout', timeframe:'multi_timeframe', base:'breakout', secondary:'volume', combiner:'and', confirmation:'balanced', regime:'trend_filter', exit:'trailing_exit', stop:'atr_stop', sizing:'fixed', execution:'candle_close', risk:'balanced' },
  adaptive: { recipe:'hybrid_score', timeframe:'multi_timeframe', base:'hybrid', secondary:'adx_strength', combiner:'weighted_score', confirmation:'multi_confirm', regime:'liquidity_guard', exit:'composite', stop:'time_stop', sizing:'confidence_scaled', execution:'spread_guard', risk:'exploratory' }
};
const PUZZLE_LABELS = {
  recipe: { starter:{zh:'Starter 起点',en:'Starter'}, trend_pullback:{zh:'趋势回撤',en:'Trend pullback'}, momentum_breakout:{zh:'动量突破',en:'Momentum breakout'}, range_recovery:{zh:'区间修复',en:'Range recovery'}, hybrid_score:{zh:'混合打分',en:'Hybrid score'}, market_router:{zh:'行情路由',en:'Market router'} },
  timeframe: { single_timeframe:{zh:'单周期',en:'Single timeframe'}, multi_timeframe:{zh:'多周期确认',en:'Multi-timeframe'}, higher_timeframe_bias:{zh:'高周期方向',en:'Higher-timeframe bias'}, session_aware:{zh:'交易时段感知',en:'Session aware'} },
  base: { trend:{zh:'EMA 趋势',en:'EMA trend'}, momentum:{zh:'MACD 动量',en:'MACD momentum'}, recovery:{zh:'RSI 修复',en:'RSI recovery'}, breakout:{zh:'通道突破',en:'Channel breakout'}, hybrid:{zh:'多信号打分',en:'Multi-signal score'} },
  secondary: { none:{zh:'无副信号',en:'No extra signal'}, volume:{zh:'成交量确认',en:'Volume confirmation'}, rsi_filter:{zh:'RSI 过滤',en:'RSI filter'}, adx_strength:{zh:'ADX 强度',en:'ADX strength'}, bollinger_location:{zh:'布林位置',en:'Bollinger location'} },
  combiner: { and:{zh:'AND 同时满足',en:'AND'}, or:{zh:'OR 任一满足',en:'OR'}, weighted_score:{zh:'加权打分',en:'Weighted score'}, priority_router:{zh:'优先级路由',en:'Priority router'} },
  confirmation: { light:{zh:'少确认',en:'Light confirmation'}, balanced:{zh:'平衡确认',en:'Balanced confirmation'}, strict:{zh:'ADX + Volume',en:'ADX + Volume'}, volatility_aware:{zh:'波动过滤',en:'Volatility-aware'}, multi_confirm:{zh:'多层确认',en:'Multi-layer confirmation'} },
  regime: { none:{zh:'不过滤',en:'No regime filter'}, trend_filter:{zh:'只做趋势',en:'Trend-only filter'}, range_filter:{zh:'只做震荡',en:'Range-only filter'}, volatility_aware:{zh:'波动分层',en:'Volatility-aware regime'}, liquidity_guard:{zh:'流动性保护',en:'Liquidity guard'} },
  exit: { opposite_signal:{zh:'反向信号退出',en:'Signal flip exit'}, composite:{zh:'组合退出',en:'Composite exit'}, atr_protective:{zh:'ATR 保护退出',en:'ATR protective exit'}, trailing_exit:{zh:'跟踪退出',en:'Trailing exit'} },
  stop: { simple_stop:{zh:'简单止损',en:'Simple stop'}, atr_stop:{zh:'ATR 止损',en:'ATR stop'}, time_stop:{zh:'时间止损',en:'Time stop'} },
  sizing: { fixed:{zh:'固定仓位',en:'Fixed sizing'}, volatility_scaled:{zh:'波动缩放',en:'Volatility-scaled sizing'}, confidence_scaled:{zh:'信号强度缩放',en:'Confidence-scaled sizing'} },
  execution: { market_safe:{zh:'普通执行',en:'Standard execution'}, spread_guard:{zh:'价差保护',en:'Spread guard'}, candle_close:{zh:'收盘确认',en:'Candle-close confirmation'} },
  risk: { cautious:{zh:'谨慎',en:'Cautious'}, balanced:{zh:'平衡',en:'Balanced'}, exploratory:{zh:'探索',en:'Exploratory'} }
};
const PUZZLE_SLOT_TITLES = {
  recipe:{zh:'市场假设',en:'Market idea'}, timeframe:{zh:'时间框架',en:'Timeframe'}, base:{zh:'主信号',en:'Primary signal'}, secondary:{zh:'副信号',en:'Extra signal'}, combiner:{zh:'组合规则',en:'Combiner'}, confirmation:{zh:'确认层',en:'Confirmation'}, regime:{zh:'行情过滤',en:'Regime filter'}, exit:{zh:'退出层',en:'Exit'}, stop:{zh:'止损层',en:'Stop layer'}, sizing:{zh:'仓位层',en:'Sizing'}, execution:{zh:'执行保护',en:'Execution guard'}, risk:{zh:'风险姿态',en:'Risk posture'}
};
const PUZZLE_DESCRIPTIONS = {
  recipe:{zh:'定义这套策略想捕捉的市场现象。',en:'Defines the market behavior the strategy tries to capture.'},
  timeframe:{zh:'决定信号是否只看当前周期，还是引入高周期/多周期判断。',en:'Determines whether the strategy uses one timeframe or higher/multiple timeframe context.'},
  base:{zh:'主入场信号，是策略最核心的触发来源。',en:'The core entry trigger.'},
  secondary:{zh:'副信号用于减少误触发，也可以保持为空。',en:'Optional second signal to reduce false triggers.'},
  combiner:{zh:'决定主信号和副信号如何合并。',en:'Controls how primary and secondary signals are combined.'},
  confirmation:{zh:'控制入场前需要多少额外确认。',en:'Controls how much confirmation is required before entry.'},
  regime:{zh:'让策略只在某类行情中工作。',en:'Allows the strategy to operate only in selected regimes.'},
  exit:{zh:'决定什么时候主动离场。',en:'Defines active exit logic.'},
  stop:{zh:'价格保护和时间保护。',en:'Adds price or time protection.'},
  sizing:{zh:'决定仓位是否固定，还是随波动/信号强度变化。',en:'Controls whether sizing is fixed or adaptive.'},
  execution:{zh:'控制是否等收盘、检查价差或减少执行噪音。',en:'Controls close confirmation, spread guard, or execution noise reduction.'},
  risk:{zh:'整体风险口味，会影响推荐模板和参数起点。',en:'Overall risk preference used for template recommendation and starting parameters.'}
};
function puzzleState(){
  if(!state.puzzleBuilder){
    try { state.puzzleBuilder = JSON.parse(localStorage.getItem('sb_puzzle_builder') || '{}'); } catch(e) { state.puzzleBuilder = {}; }
  }
  state.puzzleBuilder = { ...PUZZLE_DEFAULT, ...state.puzzleBuilder };
  return state.puzzleBuilder;
}
function puzzleLabel(slot, value){ return tl((PUZZLE_LABELS[slot] || {})[value]) || value || '-'; }
function savePuzzleState(){ try { localStorage.setItem('sb_puzzle_builder', JSON.stringify(puzzleState())); } catch(e) {} }
function setPuzzleBlock(slot, value){
  const s = puzzleState();
  s[slot] = value;
  state.puzzleBuilder = s;
  savePuzzleState();
  renderPuzzleBuilder();
}
function clearPuzzleSlot(slot){
  const s = puzzleState();
  s[slot] = PUZZLE_DEFAULT[slot] || '';
  state.puzzleBuilder = s;
  savePuzzleState();
  renderPuzzleBuilder();
}
function clearPuzzleBuilder(){
  state.puzzleBuilder = { ...PUZZLE_DEFAULT };
  savePuzzleState();
  renderPuzzleBuilder();
}
function applyPuzzlePreset(type){
  state.puzzleBuilder = { ...PUZZLE_DEFAULT, ...(PUZZLE_PRESETS[type] || PUZZLE_PRESETS.simple) };
  savePuzzleState();
  renderPuzzleBuilder();
}
function deriveStudioFromPuzzle(s){
  let recipe = s.recipe || 'starter';
  if(s.regime === 'liquidity_guard') recipe = 'liquidity_guard';
  else if(s.regime === 'volatility_aware' && s.risk === 'cautious') recipe = 'defensive_volatility';
  else if(s.timeframe === 'multi_timeframe') recipe = 'proxy_confirmation';
  else if(s.combiner === 'weighted_score') recipe = 'alpha_stack';
  let base = s.base || 'trend';
  if(s.combiner === 'weighted_score' || s.secondary !== 'none') base = s.base === 'breakout' ? 'breakout' : (s.base === 'recovery' ? 'recovery' : (s.base === 'momentum' ? 'momentum' : 'hybrid'));
  let confirmation = s.confirmation || 'balanced';
  if(confirmation === 'multi_confirm') confirmation = 'strict';
  let exit = s.exit || 'composite';
  if(s.stop === 'atr_stop' && exit === 'opposite_signal') exit = 'atr_protective';
  if(exit === 'trailing_exit') exit = 'atr_protective';
  let risk = s.risk || 'balanced';
  if(s.sizing === 'volatility_scaled' && risk === 'exploratory') risk = 'balanced';
  return { recipe, base, confirmation, exit, risk };
}
function puzzleComplexityScore(s){
  let score = 20;
  if(s.timeframe !== 'single_timeframe') score += 10;
  if(s.secondary !== 'none') score += 10;
  if(['weighted_score','priority_router'].includes(s.combiner)) score += 15;
  if(['strict','volatility_aware','multi_confirm'].includes(s.confirmation)) score += 10;
  if(s.regime !== 'none') score += 10;
  if(['atr_stop','time_stop'].includes(s.stop)) score += 6;
  if(s.sizing !== 'fixed') score += 9;
  if(s.execution !== 'market_safe') score += 6;
  if(s.risk === 'exploratory') score += 4;
  return Math.max(5, Math.min(100, score));
}
function puzzleWarnings(s){
  const warnings=[];
  if(s.risk === 'exploratory' && ['light','balanced'].includes(s.confirmation)) warnings.push(state.lang==='zh'?'探索风险 + 低确认层，容易过度交易。':'Exploratory risk with light confirmation may overtrade.');
  if(s.base === 'breakout' && s.regime === 'range_filter') warnings.push(state.lang==='zh'?'突破主信号 + 震荡过滤可能互相冲突。':'Breakout entry and range-only filter may conflict.');
  if(s.secondary === 'none' && ['weighted_score','priority_router'].includes(s.combiner)) warnings.push(state.lang==='zh'?'没有副信号时，加权/路由组合规则信息不足。':'Weighted/router combiner has limited value without a secondary signal.');
  if(s.sizing !== 'fixed' && s.stop === 'simple_stop') warnings.push(state.lang==='zh'?'自适应仓位最好搭配 ATR 或时间止损。':'Adaptive sizing usually pairs better with ATR or time stops.');
  return warnings;
}
function renderPuzzleBuilder(){
  const board = qs('puzzle-board'); if(!board) return;
  const s = puzzleState();
  PUZZLE_STAGE_ORDER.forEach(slot => {
    const el = board.querySelector(`[data-slot="${slot}"]`); if(!el) return;
    const value = s[slot];
    const title = tl(PUZZLE_SLOT_TITLES[slot]);
    const desc = tl(PUZZLE_DESCRIPTIONS[slot]);
    el.classList.toggle('filled', Boolean(value));
    el.innerHTML = `<span>${title}</span><strong>${puzzleLabel(slot, value)}</strong><em>${desc}</em><button type="button" class="puzzle-slot-clear" data-clear-slot="${slot}" title="clear">×</button>`;
  });
  qsa('.puzzle-block').forEach(block => {
    const current = s[block.dataset.slot];
    block.classList.toggle('active', current === block.dataset.value);
  });
  const filled = PUZZLE_STAGE_ORDER.filter(x=>Boolean(s[x])).length;
  if(qs('puzzle-progress')) qs('puzzle-progress').textContent = `${filled} / ${PUZZLE_STAGE_ORDER.length}`;
  const derived = deriveStudioFromPuzzle(s);
  const score = puzzleComplexityScore(s);
  const warnings = puzzleWarnings(s);
  const logic = qs('puzzle-logic-preview');
  if(logic){
    logic.innerHTML = `<div class="puzzle-logic-card"><span>${state.lang==='zh'?'逻辑预览':'Logic preview'}</span><strong>IF ${puzzleLabel('regime',s.regime)} + ${puzzleLabel('base',s.base)} ${puzzleLabel('combiner',s.combiner)} ${puzzleLabel('secondary',s.secondary)} → ENTER</strong><em>THEN ${puzzleLabel('exit',s.exit)} / ${puzzleLabel('stop',s.stop)} / ${puzzleLabel('execution',s.execution)}</em></div>
      <div class="puzzle-complexity"><span>${state.lang==='zh'?'复杂度':'Complexity'}</span><div class="puzzle-meter"><i style="width:${score}%"></i></div><strong>${score}/100</strong></div>`;
  }
  const summary = qs('puzzle-summary');
  if(summary){
    summary.innerHTML = `<div class="puzzle-summary-grid">
      <div><span>${state.lang==='zh'?'当前拼图':'Current puzzle'}</span><strong>${puzzleLabel('recipe',s.recipe)} → ${puzzleLabel('base',s.base)} → ${puzzleLabel('combiner',s.combiner)} → ${puzzleLabel('risk',s.risk)}</strong></div>
      <div><span>${state.lang==='zh'?'映射到 Self-Build':'Maps to Self-Build'}</span><strong>${puzzleLabel('recipe',derived.recipe)} / ${puzzleLabel('base',derived.base)} / ${puzzleLabel('confirmation',derived.confirmation)} / ${puzzleLabel('exit',derived.exit)} / ${puzzleLabel('risk',derived.risk)}</strong></div>
    </div>
    ${warnings.length ? `<div class="puzzle-warning"><strong>${state.lang==='zh'?'检查提醒':'Checks'}</strong><ul>${warnings.map(w=>`<li>${w}</li>`).join('')}</ul></div>` : `<p>${state.lang==='zh'?'拼图结构目前没有明显冲突。生成 Python 文件前仍需要检查参数和代码预览。':'No obvious structural conflicts. Still review parameters and generated code before use.'}</p>`}`;
  }
  qsa('.puzzle-slot-clear').forEach(btn => btn.onclick = (ev) => { ev.stopPropagation(); clearPuzzleSlot(btn.dataset.clearSlot); });
  syncPuzzleEasyControls();
  renderPuzzleEasyResult();
}
function syncPuzzleToStudioControls(){
  const s = deriveStudioFromPuzzle(puzzleState());
  const mapping = { recipe:'studio-design-recipe', base:'studio-base-signal', confirmation:'studio-confirmation-bundle', exit:'studio-exit-style', risk:'studio-risk-posture' };
  Object.entries(mapping).forEach(([key,id]) => { const el = qs(id); if(el){ el.value = s[key]; el.dispatchEvent(new Event('change', {bubbles:true})); } });
}
function applyPuzzleToBuilder(){
  const s = puzzleState();
  const derived = deriveStudioFromPuzzle(s);
  state.selfBuildStudio = derived;
  try { localStorage.setItem('sb_self_build_studio', JSON.stringify(state.selfBuildStudio)); } catch(e) {}
  populateSelfBuildStudioOptions();
  syncPuzzleToStudioControls();
  selectSelfBuildStudioTemplate(null, true);
  setMessage(state.lang === 'zh' ? '复杂拼图已转成 Self-Build 策略起点。拼图里的高级组件会体现在推荐模板和参数起点中，请检查后再生成。' : 'Advanced puzzle converted into a Self-Build starting point. Advanced blocks influence template recommendation and starting parameters; review before generating.');
  showLayer('selfbuild', true);
}
let puzzleDragPayload = null;
let puzzlePointerDrag = null;
let puzzleSuppressNextClick = false;

function puzzlePayloadFromBlock(block){
  return block ? { slot:block.dataset.slot, value:block.dataset.value, label:block.textContent.trim() } : null;
}
function setPuzzleTransferData(ev, payload){
  if(!ev?.dataTransfer || !payload) return;
  const raw = JSON.stringify(payload);
  try { ev.dataTransfer.setData('application/x-strategy-puzzle', raw); } catch(e) {}
  try { ev.dataTransfer.setData('text/plain', raw); } catch(e) {}
  ev.dataTransfer.effectAllowed = 'copy';
  ev.dataTransfer.dropEffect = 'copy';
}
function readPuzzleTransferData(ev, fallback=null){
  if(ev?.dataTransfer){
    const types = ['application/x-strategy-puzzle','text/plain'];
    for(const type of types){
      try {
        const raw = ev.dataTransfer.getData(type);
        if(raw){
          const parsed = JSON.parse(raw);
          if(parsed?.slot && parsed?.value) return parsed;
        }
      } catch(e) {}
    }
  }
  return fallback || puzzleDragPayload;
}
function clearPuzzleDropTargets(){
  qsa('.puzzle-slot, .puzzle-lane, #puzzle-board').forEach(el => el.classList.remove('drag-over','drop-ready','drop-blocked'));
}
function markPuzzleDropTargets(payload){
  clearPuzzleDropTargets();
  if(!payload?.slot) return;
  qsa('.puzzle-slot').forEach(slot => {
    slot.classList.toggle('drop-ready', slot.dataset.slot === payload.slot);
    slot.classList.toggle('drop-blocked', slot.dataset.slot !== payload.slot);
  });
}
function findPuzzleDropSlot(target, payload){
  if(!target || !payload?.slot) return null;
  const directSlot = target.closest ? target.closest('.puzzle-slot') : null;
  if(directSlot) return directSlot;
  const lane = target.closest ? target.closest('.puzzle-lane') : null;
  if(lane){
    return lane.querySelector(`.puzzle-slot[data-slot="${payload.slot}"]`) || null;
  }
  const board = target.closest ? target.closest('#puzzle-board') : null;
  if(board){
    return board.querySelector(`.puzzle-slot[data-slot="${payload.slot}"]`) || null;
  }
  return null;
}
function placePuzzlePayloadOnTarget(target, payload){
  const slot = findPuzzleDropSlot(target, payload);
  if(!slot){
    setMessage(state.lang === 'zh' ? '没有找到可放置的拼图格子。请拖到对应白色格子，或直接点击组件。' : 'No matching puzzle slot was found. Drop on the matching white slot, or simply click the block.');
    return false;
  }
  if(slot.dataset.slot !== payload.slot){
    slot.classList.add('drop-blocked');
    setMessage(state.lang === 'zh' ? '这个组件不能放进这个格子，请拖到同类格子。' : 'This block belongs to a different slot. Drop it into the matching slot.');
    return false;
  }
  setPuzzleBlock(payload.slot, payload.value);
  setMessage(state.lang === 'zh' ? `已放入：${puzzleLabel(payload.slot, payload.value)}。` : `Added: ${puzzleLabel(payload.slot, payload.value)}.`);
  return true;
}
function handlePuzzleDropEvent(ev, targetOverride=null){
  ev.preventDefault();
  ev.stopPropagation();
  const payload = readPuzzleTransferData(ev);
  const target = targetOverride || ev.target;
  const ok = placePuzzlePayloadOnTarget(target, payload);
  puzzleDragPayload = null;
  clearPuzzleDropTargets();
  return ok;
}
function makePuzzleDragGhost(block, ev){
  const ghost = block.cloneNode(true);
  ghost.classList.add('puzzle-drag-ghost');
  ghost.style.left = '0px';
  ghost.style.top = '0px';
  document.body.appendChild(ghost);
  movePuzzleDragGhost(ghost, ev);
  return ghost;
}
function movePuzzleDragGhost(ghost, ev){
  if(!ghost) return;
  ghost.style.transform = `translate(${ev.clientX + 12}px, ${ev.clientY + 12}px)`;
}
function cleanupPuzzlePointerDrag(){
  if(puzzlePointerDrag?.ghost) puzzlePointerDrag.ghost.remove();
  puzzlePointerDrag = null;
  document.body.classList.remove('puzzle-pointer-dragging');
  clearPuzzleDropTargets();
}
function bindPuzzlePointerDrag(block){
  block.addEventListener('pointerdown', ev => {
    if(ev.button && ev.button !== 0) return;
    const payload = puzzlePayloadFromBlock(block);
    if(!payload) return;
    const startX = ev.clientX;
    const startY = ev.clientY;
    const pointerId = ev.pointerId;
    const onMove = moveEv => {
      if(moveEv.pointerId !== pointerId) return;
      const dist = Math.hypot(moveEv.clientX - startX, moveEv.clientY - startY);
      if(!puzzlePointerDrag && dist > 7){
        puzzleDragPayload = payload;
        puzzlePointerDrag = { payload, ghost: makePuzzleDragGhost(block, moveEv) };
        document.body.classList.add('puzzle-pointer-dragging');
        markPuzzleDropTargets(payload);
      }
      if(puzzlePointerDrag){
        movePuzzleDragGhost(puzzlePointerDrag.ghost, moveEv);
        const el = document.elementFromPoint(moveEv.clientX, moveEv.clientY);
        qsa('.puzzle-slot, .puzzle-lane').forEach(x => x.classList.remove('drag-over'));
        const slot = findPuzzleDropSlot(el, payload);
        if(slot) slot.classList.add('drag-over');
        moveEv.preventDefault();
      }
    };
    const onUp = upEv => {
      if(upEv.pointerId !== pointerId) return;
      document.removeEventListener('pointermove', onMove, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('pointercancel', onCancel, true);
      if(puzzlePointerDrag){
        puzzleSuppressNextClick = true;
        const el = document.elementFromPoint(upEv.clientX, upEv.clientY);
        placePuzzlePayloadOnTarget(el, payload);
        cleanupPuzzlePointerDrag();
        upEv.preventDefault();
        upEv.stopPropagation();
      }
    };
    const onCancel = cancelEv => {
      document.removeEventListener('pointermove', onMove, true);
      document.removeEventListener('pointerup', onUp, true);
      document.removeEventListener('pointercancel', onCancel, true);
      cleanupPuzzlePointerDrag();
    };
    document.addEventListener('pointermove', onMove, true);
    document.addEventListener('pointerup', onUp, true);
    document.addEventListener('pointercancel', onCancel, true);
  }, {passive:false});
}

const PUZZLE_EASY_PRESETS = {
  simple: { recipe:'starter', timeframe:'single_timeframe', base:'trend', secondary:'none', combiner:'and', confirmation:'balanced', regime:'none', exit:'opposite_signal', stop:'simple_stop', sizing:'fixed', execution:'market_safe', risk:'balanced' },
  defensive: { recipe:'trend_pullback', timeframe:'higher_timeframe_bias', base:'trend', secondary:'rsi_filter', combiner:'and', confirmation:'strict', regime:'volatility_aware', exit:'atr_protective', stop:'atr_stop', sizing:'volatility_scaled', execution:'spread_guard', risk:'cautious' },
  breakout: { recipe:'momentum_breakout', timeframe:'multi_timeframe', base:'breakout', secondary:'volume', combiner:'and', confirmation:'balanced', regime:'trend_filter', exit:'trailing_exit', stop:'atr_stop', sizing:'fixed', execution:'candle_close', risk:'balanced' },
  recovery: { recipe:'range_recovery', timeframe:'single_timeframe', base:'recovery', secondary:'rsi_filter', combiner:'and', confirmation:'balanced', regime:'range_filter', exit:'atr_protective', stop:'atr_stop', sizing:'fixed', execution:'market_safe', risk:'balanced' },
  hybrid: { recipe:'hybrid_score', timeframe:'multi_timeframe', base:'hybrid', secondary:'adx_strength', combiner:'weighted_score', confirmation:'multi_confirm', regime:'liquidity_guard', exit:'composite', stop:'time_stop', sizing:'confidence_scaled', execution:'spread_guard', risk:'balanced' },
  liquidity: { recipe:'hybrid_score', timeframe:'single_timeframe', base:'momentum', secondary:'volume', combiner:'and', confirmation:'strict', regime:'liquidity_guard', exit:'atr_protective', stop:'atr_stop', sizing:'volatility_scaled', execution:'spread_guard', risk:'cautious' }
};
function setPuzzleAdvancedVisible(visible){
  const panel = qs('puzzle-builder-panel');
  if(panel) panel.classList.toggle('puzzle-easy-only', !visible);
  try { localStorage.setItem('sb_puzzle_advanced_visible', visible ? '1' : '0'); } catch(e) {}
  const label = state.lang === 'zh' ? (visible ? '收起高级画布' : '显示高级画布') : (visible ? 'Hide advanced canvas' : 'Show advanced canvas');
  ['puzzle-advanced-toggle-btn','puzzle-easy-advanced-btn'].forEach(id => { const btn = qs(id); if(btn) btn.textContent = id === 'puzzle-easy-advanced-btn' ? (state.lang === 'zh' ? (visible ? '收起高级细节' : '我要自己拼细节') : (visible ? 'Hide advanced details' : 'Customize advanced details')) : label; });
}
function activePuzzleEasyPresetKey(){
  const s = puzzleState();
  const same = (a,b) => PUZZLE_STAGE_ORDER.every(k => (a[k] || '') === (b[k] || ''));
  for(const [key,preset] of Object.entries(PUZZLE_EASY_PRESETS)){
    if(same(s, { ...PUZZLE_DEFAULT, ...preset })) return key;
  }
  return '';
}
function applyPuzzleEasyPreset(key, quiet=false){
  state.puzzleBuilder = { ...PUZZLE_DEFAULT, ...(PUZZLE_EASY_PRESETS[key] || PUZZLE_EASY_PRESETS.simple) };
  savePuzzleState();
  syncPuzzleEasyControls();
  renderPuzzleBuilder();
  if(!quiet) setMessage(state.lang === 'zh' ? '已自动拼好一套策略。你可以直接一键转成生成区，或打开高级画布微调。' : 'Puzzle pack applied. Convert it directly, or open the advanced canvas to fine-tune.');
}
function syncPuzzleEasyControls(){
  const s = puzzleState();
  const base = qs('puzzle-easy-base'); if(base) base.value = s.base || 'trend';
  const risk = qs('puzzle-easy-risk'); if(risk) risk.value = s.risk || 'balanced';
  const confirm = qs('puzzle-easy-confirm'); if(confirm) confirm.value = s.confirmation === 'multi_confirm' ? 'strict' : (s.confirmation || 'balanced');
  const active = activePuzzleEasyPresetKey();
  qsa('.puzzle-easy-card').forEach(card => card.classList.toggle('active', card.dataset.easyPreset === active));
}
function updatePuzzleFromEasyControls(){
  const s = puzzleState();
  const base = qs('puzzle-easy-base')?.value || s.base || 'trend';
  const risk = qs('puzzle-easy-risk')?.value || s.risk || 'balanced';
  const confirmation = qs('puzzle-easy-confirm')?.value || s.confirmation || 'balanced';
  const next = { ...s, base, risk, confirmation };
  if(base === 'breakout') Object.assign(next, { recipe:'momentum_breakout', secondary:'volume', combiner:'and', regime:'trend_filter', exit:'trailing_exit', stop:'atr_stop', execution:'candle_close' });
  else if(base === 'recovery') Object.assign(next, { recipe:'range_recovery', secondary:'rsi_filter', combiner:'and', regime:'range_filter', exit:'atr_protective', stop:'atr_stop' });
  else if(base === 'hybrid') Object.assign(next, { recipe:'hybrid_score', secondary:'adx_strength', combiner:'weighted_score', regime: risk === 'cautious' ? 'liquidity_guard' : 'volatility_aware', exit:'composite', stop:'time_stop', sizing:'confidence_scaled', execution:'spread_guard' });
  else if(base === 'momentum') Object.assign(next, { recipe:'momentum_breakout', secondary:'volume', combiner:'and', regime: risk === 'cautious' ? 'liquidity_guard' : 'trend_filter', exit:'atr_protective', stop:'atr_stop' });
  else Object.assign(next, { recipe:'trend_pullback', secondary: risk === 'cautious' ? 'rsi_filter' : 'none', combiner:'and', regime: risk === 'cautious' ? 'volatility_aware' : 'none', exit: risk === 'exploratory' ? 'composite' : 'opposite_signal' });
  if(risk === 'cautious') Object.assign(next, { timeframe:'higher_timeframe_bias', sizing:'volatility_scaled', execution:'spread_guard', stop:'atr_stop' });
  if(risk === 'exploratory') Object.assign(next, { timeframe:'multi_timeframe', sizing:'confidence_scaled' });
  state.puzzleBuilder = { ...PUZZLE_DEFAULT, ...next };
  savePuzzleState();
  renderPuzzleBuilder();
  setMessage(state.lang === 'zh' ? '已根据三个简单选择自动重拼。' : 'Puzzle updated from the three simple choices.');
}
function renderPuzzleEasyResult(){
  const box = qs('puzzle-easy-result');
  if(!box) return;
  const s = puzzleState();
  const derived = deriveStudioFromPuzzle(s);
  const score = puzzleComplexityScore(s);
  box.innerHTML = `<div><span>${state.lang === 'zh' ? '当前结果' : 'Current result'}</span><strong>${puzzleLabel('base', s.base)} + ${puzzleLabel('confirmation', s.confirmation)} + ${puzzleLabel('risk', s.risk)}</strong><em>${state.lang === 'zh' ? '将映射到' : 'Maps to'} ${puzzleLabel('recipe', derived.recipe)} / ${puzzleLabel('exit', derived.exit)} · ${score}/100</em></div>`;
}
function bindPuzzleEasyBuilder(){
  qsa('.puzzle-easy-card').forEach(card => { card.onclick = () => applyPuzzleEasyPreset(card.dataset.easyPreset); });
  ['puzzle-easy-base','puzzle-easy-risk','puzzle-easy-confirm'].forEach(id => { const el = qs(id); if(el) el.onchange = updatePuzzleFromEasyControls; });
  const applyBtn = qs('puzzle-easy-apply-btn'); if(applyBtn) applyBtn.onclick = applyPuzzleToBuilder;
  const resetBtn = qs('puzzle-easy-reset-btn'); if(resetBtn) resetBtn.onclick = () => applyPuzzleEasyPreset('simple');
  const advBtn = qs('puzzle-easy-advanced-btn'); if(advBtn) advBtn.onclick = () => setPuzzleAdvancedVisible(qs('puzzle-builder-panel')?.classList.contains('puzzle-easy-only'));
  const advToggle = qs('puzzle-advanced-toggle-btn'); if(advToggle) advToggle.onclick = () => setPuzzleAdvancedVisible(qs('puzzle-builder-panel')?.classList.contains('puzzle-easy-only'));
  const visible = localStorage.getItem('sb_puzzle_advanced_visible') === '1';
  setPuzzleAdvancedVisible(visible);
  syncPuzzleEasyControls();
  renderPuzzleEasyResult();
}

function bindPuzzleBuilder(){
  qsa('.puzzle-block').forEach(block => {
    block.onclick = (ev) => {
      if(puzzleSuppressNextClick){ puzzleSuppressNextClick = false; ev.preventDefault(); ev.stopPropagation(); return; }
      setPuzzleBlock(block.dataset.slot, block.dataset.value);
      setMessage(state.lang === 'zh' ? `已放入：${puzzleLabel(block.dataset.slot, block.dataset.value)}。` : `Added: ${puzzleLabel(block.dataset.slot, block.dataset.value)}.`);
    };
    block.addEventListener('dragstart', ev => {
      const payload = puzzlePayloadFromBlock(block);
      puzzleDragPayload = payload;
      block.classList.add('dragging');
      setPuzzleTransferData(ev, payload);
      markPuzzleDropTargets(payload);
    });
    block.addEventListener('dragend', () => {
      block.classList.remove('dragging');
      puzzleDragPayload = null;
      clearPuzzleDropTargets();
    });
    bindPuzzlePointerDrag(block);
  });
  qsa('.puzzle-slot').forEach(slot => {
    slot.addEventListener('dragenter', ev => {
      const payload = readPuzzleTransferData(ev);
      if(payload?.slot === slot.dataset.slot){ ev.preventDefault(); slot.classList.add('drag-over'); }
      else if(payload?.slot){ slot.classList.add('drop-blocked'); }
    });
    slot.addEventListener('dragover', ev => {
      const payload = readPuzzleTransferData(ev);
      if(payload?.slot === slot.dataset.slot){ ev.preventDefault(); ev.dataTransfer.dropEffect = 'copy'; slot.classList.add('drag-over'); }
      else if(payload?.slot){ ev.dataTransfer.dropEffect = 'none'; }
    });
    slot.addEventListener('dragleave', () => slot.classList.remove('drag-over'));
    slot.addEventListener('drop', ev => handlePuzzleDropEvent(ev, slot));
    slot.onclick = ev => {
      if(ev.target.closest('.puzzle-slot-clear')) return;
      const payload = puzzleDragPayload;
      if(payload) placePuzzlePayloadOnTarget(slot, payload);
    };
  });
  qsa('.puzzle-lane, #puzzle-board').forEach(area => {
    area.addEventListener('dragover', ev => {
      const payload = readPuzzleTransferData(ev);
      const slot = findPuzzleDropSlot(ev.target, payload);
      if(slot){ ev.preventDefault(); ev.dataTransfer.dropEffect = 'copy'; slot.classList.add('drag-over'); }
    });
    area.addEventListener('dragleave', ev => {
      if(!area.contains(ev.relatedTarget)) qsa('.puzzle-slot').forEach(x => x.classList.remove('drag-over'));
    });
    area.addEventListener('drop', ev => handlePuzzleDropEvent(ev));
  });
  if(qs('puzzle-clear-btn')) qs('puzzle-clear-btn').onclick = clearPuzzleBuilder;
  if(qs('puzzle-preset-simple-btn')) qs('puzzle-preset-simple-btn').onclick = () => applyPuzzlePreset('simple');
  if(qs('puzzle-preset-defensive-btn')) qs('puzzle-preset-defensive-btn').onclick = () => applyPuzzlePreset('defensive');
  if(qs('puzzle-preset-breakout-btn')) qs('puzzle-preset-breakout-btn').onclick = () => applyPuzzlePreset('breakout');
  if(qs('puzzle-preset-adaptive-btn')) qs('puzzle-preset-adaptive-btn').onclick = () => applyPuzzlePreset('adaptive');
  if(qs('puzzle-apply-btn')) qs('puzzle-apply-btn').onclick = applyPuzzleToBuilder;
  if(qs('puzzle-open-builder-btn')) qs('puzzle-open-builder-btn').onclick = () => showLayer('selfbuild', true);
  bindPuzzleEasyBuilder();
  renderPuzzleBuilder();
}

Object.assign(I18N.zh, {
  puzzleNav: '拼图 Builder',
  entryPuzzleTitle: '拼图式策略搭建',
  entryPuzzleBody: '像少儿编程一样拖拽、组合、连接信号、确认、过滤、退出和风险模块。',
  entryPuzzleBtn: '打开拼图 Builder'
});
Object.assign(I18N.en, {
  puzzleNav: 'Puzzle Builder',
  entryPuzzleTitle: 'Puzzle Builder',
  entryPuzzleBody: 'Drag, combine, and connect signal, confirmation, filter, exit, and risk blocks like a beginner coding toy.',
  entryPuzzleBtn: 'Open Puzzle Builder'
});
const _applyI18N_base_v1208 = applyI18N;
applyI18N = function(){
  _applyI18N_base_v1208();
  const puzzleNav = document.querySelector('[data-layer-nav="puzzle"]'); if(puzzleNav) puzzleNav.textContent = t('puzzleNav');
  if(qs('entry-puzzle-title')) qs('entry-puzzle-title').textContent = t('entryPuzzleTitle');
  if(qs('entry-puzzle-body')) qs('entry-puzzle-body').textContent = t('entryPuzzleBody');
  if(qs('entry-puzzle-btn')) qs('entry-puzzle-btn').textContent = t('entryPuzzleBtn');
  if(qs('puzzle-title')) qs('puzzle-title').textContent = state.lang==='zh' ? '先用一键拼图，再按需进入高级画布' : 'Start simple, then open the advanced puzzle canvas';
  if(qs('puzzle-subtitle')) qs('puzzle-subtitle').textContent = state.lang==='zh' ? '默认先用一键拼图包，不用拖拽；需要细节时再打开高级画布。高级模式仍可组合市场假设、时间框架、主信号、副信号、确认、过滤、退出、止损、仓位和执行保护。' : 'Start with one-click puzzle packs; no dragging is required. Open the advanced canvas only when you want fine-grained control over market idea, timeframe, signals, confirmation, filters, exit, stops, sizing, and execution guards.';
  if(qs('puzzle-palette-title')) qs('puzzle-palette-title').textContent = state.lang==='zh' ? '组件库' : 'Block library';
  if(qs('puzzle-palette-subtitle')) qs('puzzle-palette-subtitle').textContent = state.lang==='zh' ? '拖拽或点击组件' : 'Drag or click a block';
  if(qs('puzzle-board-title')) qs('puzzle-board-title').textContent = state.lang==='zh' ? '拼图区' : 'Puzzle board';
  if(qs('puzzle-board-subtitle')) qs('puzzle-board-subtitle').textContent = state.lang==='zh' ? '像流程图一样从左到右、从上到下拼接策略逻辑。' : 'Wire the strategy like a flowchart from left to right and top to bottom.';
  if(qs('puzzle-hint')) qs('puzzle-hint').textContent = state.lang==='zh' ? '提示：可以直接点击组件，也可以拖到白色格子。现在拖到同一栏的白色空白处也会自动放进对应格子。' : 'Tip: click a block, or drag it onto the white slot. Dropping on the white space within the same lane also routes it to the matching slot.';
  if(qs('puzzle-preset-simple-btn')) qs('puzzle-preset-simple-btn').textContent = state.lang==='zh' ? '简单起点' : 'Simple preset';
  if(qs('puzzle-preset-defensive-btn')) qs('puzzle-preset-defensive-btn').textContent = state.lang==='zh' ? '防守起点' : 'Defensive preset';
  if(qs('puzzle-preset-breakout-btn')) qs('puzzle-preset-breakout-btn').textContent = state.lang==='zh' ? '突破起点' : 'Breakout preset';
  if(qs('puzzle-preset-adaptive-btn')) qs('puzzle-preset-adaptive-btn').textContent = state.lang==='zh' ? '复杂起点' : 'Advanced preset';
  if(qs('puzzle-clear-btn')) qs('puzzle-clear-btn').textContent = state.lang==='zh' ? '清空拼图' : 'Clear puzzle';
  if(qs('puzzle-apply-btn')) qs('puzzle-apply-btn').textContent = state.lang==='zh' ? '转成 Self-Build 策略' : 'Convert to Self-Build strategy';
  if(qs('puzzle-open-builder-btn')) qs('puzzle-open-builder-btn').textContent = state.lang==='zh' ? '打开生成区' : 'Open builder workspace';
  if(qs('puzzle-mode-idea')) qs('puzzle-mode-idea').textContent = state.lang==='zh' ? '先选假设' : 'Choose hypothesis';
  if(qs('puzzle-mode-idea-body')) qs('puzzle-mode-idea-body').textContent = state.lang==='zh' ? '趋势、突破、回撤、混合打分' : 'Trend, breakout, pullback, hybrid score';
  if(qs('puzzle-mode-wire')) qs('puzzle-mode-wire').textContent = state.lang==='zh' ? '再接线路' : 'Wire logic';
  if(qs('puzzle-mode-wire-body')) qs('puzzle-mode-wire-body').textContent = state.lang==='zh' ? 'AND / OR / Weighted score' : 'AND / OR / Weighted score';
  if(qs('puzzle-mode-guard')) qs('puzzle-mode-guard').textContent = state.lang==='zh' ? '最后加保护' : 'Add guards';
  if(qs('puzzle-mode-guard-body')) qs('puzzle-mode-guard-body').textContent = state.lang==='zh' ? '确认、过滤、止损、仓位、执行' : 'Confirmation, filters, stops, sizing, execution';
  if(qs('puzzle-easy-title')) qs('puzzle-easy-title').textContent = state.lang==='zh' ? '不用拖拽，先一键选一个策略拼图包' : 'No dragging: start with a one-click puzzle pack';
  if(qs('puzzle-easy-subtitle')) qs('puzzle-easy-subtitle').textContent = state.lang==='zh' ? '点一个卡片，系统自动把 12 个模块拼好；下面只改 3 个关键选择，最后一键转成可生成的 Self-Build 策略。' : 'Pick a card and the app fills the 12 modules. Adjust only three choices, then convert to a Self-Build strategy.';
  if(qs('puzzle-easy-reset-btn')) qs('puzzle-easy-reset-btn').textContent = state.lang==='zh' ? '恢复推荐拼图' : 'Reset recommended puzzle';
  if(qs('puzzle-easy-apply-btn')) qs('puzzle-easy-apply-btn').textContent = state.lang==='zh' ? '一键转成可生成策略' : 'One-click convert to builder';
  if(qs('puzzle-easy-base-label')) qs('puzzle-easy-base-label').textContent = state.lang==='zh' ? '主要想法' : 'Main idea';
  if(qs('puzzle-easy-risk-label')) qs('puzzle-easy-risk-label').textContent = state.lang==='zh' ? '风险口味' : 'Risk style';
  if(qs('puzzle-easy-confirm-label')) qs('puzzle-easy-confirm-label').textContent = state.lang==='zh' ? '确认强度' : 'Confirmation strength';
  setPuzzleAdvancedVisible(localStorage.getItem('sb_puzzle_advanced_visible') === '1');
  renderPuzzleBuilder();
};

async function init(){
  applyTheme();
  applyI18N();
  populateSelfBuildStudioOptions();
  bindEvents();
  bindMainEntryActions();
  bindLayeredNavigation();
  bindPuzzleBuilder();
  setPreviewVisibility(false);
  await currentOutputDir();
  await loadOutputRoots();
  await loadDisclaimer();
  await loadTemplateData();
  showLayer(state.activeLayer || localStorage.getItem('strategyBuilderActiveLayer') || 'home', false);
  renderModeOverview();
  renderStrategySummary();
  scheduleAutoPreview();
  await refreshStrategies();
}

Object.assign(I18N.zh, {
  scenarioPlan: "场景计划",
  scenarioStarted: "已生成策略场景计划。",
  tuningGuide: "调参指南",
  tuningStarted: "已生成参数调试指南。"
});
Object.assign(I18N.en, {
  scenarioPlan: "Scenario plan",
  scenarioStarted: "Strategy scenario plan generated.",
  tuningGuide: "Tuning guide",
  tuningStarted: "Parameter tuning guide generated."
});


Object.assign(I18N.zh, {
  weeklyMajorKicker: "Weekly Major Update",
  weeklyMajorTitle: "Strategy Command Center",
  weeklyMajorSubtitle: "打开应用即可看到本周新增能力：快速策略轨道、策略数量看板、自组模块入口、导出准备流程和更清晰的工作流提示。",
  weeklyTotalTemplates: "模板总数",
  weeklyTotalTemplatesNote: "传统模板 + 自组策略模块",
  weeklySelfBuild: "自组模块",
  weeklySelfBuildNote: "Self-Build Studio 可推荐的模块",
  weeklyNewModules: "本周新增",
  weeklyNewModulesNote: "带 v1139 标签的新模块",
  weeklyGenerated: "已生成策略",
  weeklyGeneratedNote: "当前输出目录中可见的策略文件",
  weeklyApplyTrack: "应用这个轨道",
  weeklyTrackApplied: "已应用 weekly quick track，并选择推荐 Builder。",
  weeklyWorkflowTitle: "Recommended weekly workflow",
  weeklyFlow1: "选择一个 quick track",
  weeklyFlow2: "检查推荐 builder",
  weeklyFlow3: "微调关键参数",
  weeklyFlow4: "生成并运行 readiness / code quality 检查",
  weeklyFlow5: "下载后手动导入 Freqtrade"
});
Object.assign(I18N.en, {
  weeklyMajorKicker: "Weekly Major Update",
  weeklyMajorTitle: "Strategy Command Center",
  weeklyMajorSubtitle: "Visible on app launch: quick strategy tracks, template dashboard, self-build module shortcuts, export-readiness workflow, and clearer weekly workflow guidance.",
  weeklyTotalTemplates: "Total templates",
  weeklyTotalTemplatesNote: "Traditional templates + self-build modules",
  weeklySelfBuild: "Self-build modules",
  weeklySelfBuildNote: "Modules recommended by Self-Build Studio",
  weeklyNewModules: "New this week",
  weeklyNewModulesNote: "New modules tagged v1139",
  weeklyGenerated: "Generated strategies",
  weeklyGeneratedNote: "Strategy files visible in the current output folder",
  weeklyApplyTrack: "Apply this track",
  weeklyTrackApplied: "Weekly quick track applied and recommended builder selected.",
  weeklyWorkflowTitle: "Recommended weekly workflow",
  weeklyFlow1: "Choose a quick track",
  weeklyFlow2: "Review the recommended builder",
  weeklyFlow3: "Tune key parameters",
  weeklyFlow4: "Generate and run readiness / code-quality checks",
  weeklyFlow5: "Download and manually import into Freqtrade"
});

// ===== v1.2.07 Literature references and explanations =====
Object.assign(I18N.zh, {
  literatureInspiredBy: "参考文献",
  literatureExplanationTitle: "文献启发说明",
  literatureImplementationTitle: "如何转成策略草稿",
  literatureOpenReference: "打开来源",
  literatureNoReplication: "说明：这些模板不是论文复现，也不包含收益承诺；它们只是把文献中的策略直觉转成可审阅的 Freqtrade 草稿。",
  literatureRefCount: "篇参考"
});
Object.assign(I18N.en, {
  literatureInspiredBy: "Referenced literature",
  literatureExplanationTitle: "Research-inspired explanation",
  literatureImplementationTitle: "How it becomes a strategy draft",
  literatureOpenReference: "Open source",
  literatureNoReplication: "Note: these templates are not paper replications and do not contain performance claims; they translate literature-style ideas into reviewable Freqtrade drafts.",
  literatureRefCount: "references"
});
function literatureRefs(tpl){ return Array.isArray(tpl?.literature_references) ? tpl.literature_references : []; }
function literatureRefShort(ref){
  const authors = ref.authors || '';
  const year = ref.year ? ` (${ref.year})` : '';
  return `${authors}${year}`.trim() || ref.title || '-';
}
function literatureReferenceSummary(tpl){
  const refs = literatureRefs(tpl);
  if(!refs.length) return '';
  return refs.map(literatureRefShort).slice(0,3).join(' · ');
}
function literatureResearchHTML(tpl){
  if(!tpl || tpl.strategy_mode !== 'literature') return '';
  const refs = literatureRefs(tpl);
  const explanation = tl(tpl.literature_explanation) || '';
  const implementation = tl(tpl.literature_implementation_note) || '';
  const refHTML = refs.length ? `<div class="literature-reference-list">${refs.map(ref => {
    const note = ref.note ? tl(ref.note) : '';
    const source = ref.url ? `<a href="${ref.url}" target="_blank" rel="noopener">${t('literatureOpenReference')}</a>` : '';
    return `<article class="literature-reference-item">
      <strong>${escapeHTML(ref.title || '-')}</strong>
      <span>${escapeHTML([ref.authors, ref.year, ref.venue].filter(Boolean).join(' · '))}</span>
      ${note ? `<p>${escapeHTML(note)}</p>` : ''}
      ${source}
    </article>`;
  }).join('')}</div>` : '';
  return `<section class="literature-research-panel">
    <div class="literature-research-head"><span class="badge mode-badge">${t('literatureBadge')}</span><strong>${t('literatureInspiredBy')}</strong></div>
    ${explanation ? `<div class="literature-research-block"><h4>${t('literatureExplanationTitle')}</h4><p>${escapeHTML(explanation)}</p></div>` : ''}
    ${implementation ? `<div class="literature-research-block"><h4>${t('literatureImplementationTitle')}</h4><p>${escapeHTML(implementation)}</p></div>` : ''}
    ${refHTML}
    <p class="literature-caveat">${t('literatureNoReplication')}</p>
  </section>`;
}
function renderLiteratureStrategyCenter(){
  const grid = qs('literature-grid');
  if(!grid || !state.templates || !state.templates.length) return;
  const items = state.templates.filter(t => t.strategy_mode === 'literature').slice(0, 24);
  if(!items.length){ grid.innerHTML = `<div class="muted">${t('noResults')}</div>`; return; }
  grid.innerHTML = items.map(tpl => {
    const refText = literatureReferenceSummary(tpl);
    const refCount = literatureRefs(tpl).length;
    return `<article class="literature-card literature-card-v1202" data-lit-key="${tpl.key}">
      <div class="literature-card-top"><img src="${tpl.image}" alt="${tl(tpl.label)}"/><div><strong>${tl(tpl.label)}</strong><span>${regimeMeaning(tpl.market_regime)} · ${riskMeaning(tpl.risk_level)}</span></div></div>
      <p>${tl(tpl.description)}</p>
      ${refText ? `<div class="literature-card-refs"><span>${t('literatureInspiredBy')}</span><strong>${escapeHTML(refText)}</strong><em>${refCount} ${t('literatureRefCount')}</em></div>` : ''}
      ${tl(tpl.literature_explanation) ? `<p class="literature-card-explain">${escapeHTML(tl(tpl.literature_explanation))}</p>` : ''}
      <div class="literature-tags">${(tpl.tags||[]).filter(x=>['literature','research_inspired','cited_literature','paper_replication','lead_lag','calendar_spread','microstructure','momentum','reversal','breakout','volatility','liquidity','regime','pca','pairs','carry','residual','factor','cross_sectional','relative_strength','opening_range','squeeze','intraday','funding'].includes(x)).slice(0,5).map(x=>`<span>${x}</span>`).join('')}</div>
      <button type="button" class="ghost-btn" data-lit-open="${tpl.key}">${t('literatureOpen')}</button>
    </article>`;
  }).join('');
  grid.querySelectorAll('[data-lit-open]').forEach(btn=>btn.onclick=()=>selectTemplateAndOpenBuilder(btn.dataset.litOpen));
}
function renderExplainer(){
  const box=qs('strategy-explainer');
  if(!state.selectedTemplate){ box.classList.add('empty'); box.innerHTML=''; return; }
  const tpl=state.selectedTemplate;
  const litBlock = literatureResearchHTML(tpl);
  if(state.helpMode==='brief'){
    box.classList.remove('empty');
    box.innerHTML=`<div class="explainer-brief"><div><h3>${tl(tpl.label)}</h3><div class="mode-hint">${strategyModeDesc(tpl)}</div>${auditPillsHTML(tpl)}</div><img src="${tpl.image}" alt="${tl(tpl.label)}" /></div>${simpleStrategyCardHTML(tpl)}${litBlock}${qualityAuditHTML(tpl)}${parameterCoachHTML(tpl)}${designBoardHTML(tpl)}`;
    return;
  }
  box.classList.remove('empty');
  box.innerHTML=`<h3>${tl(tpl.label)}</h3><img src="${tpl.image}" alt="${tl(tpl.label)}" /><div class="explainer-meta-row"><strong>${t('categoryTitle')}</strong><span>${categoryMeaning(tpl.category)}</span></div><div class="explainer-meta-row"><strong>${t('regimeTitle')}</strong><span>${regimeMeaning(tpl.market_regime)}</span></div><div class="explainer-meta-row"><strong>${t('riskTitle')}</strong><span>${riskMeaning(tpl.risk_level)}</span></div>${auditPillsHTML(tpl)}<p><strong>${t('detailTitle')}</strong> ${tl(tpl.description)}</p><p><strong>${t('principleTitle')}</strong> ${tl(tpl.principle)}</p>${simpleStrategyCardHTML(tpl)}${litBlock}${qualityAuditHTML(tpl)}${parameterCoachHTML(tpl)}${designBoardHTML(tpl)}<div class="explainer-tags"><strong>${t('tagsTitle')}</strong>${(tpl.tags||[]).map(tag=>`<span class="badge tag-badge-inline" title="${tagHelp(tag)}">${tag}</span>`).join('')}</div>`;
}



// ===== v1.2.12 Puzzle Builder Pro: route-map, smart compose, click-first blocks =====
const PUZZLE_PRO_STAGES = [
  {slot:'recipe', step:'01', lane:'Idea'},
  {slot:'timeframe', step:'02', lane:'Data'},
  {slot:'base', step:'03', lane:'Signal'},
  {slot:'secondary', step:'04', lane:'Signal'},
  {slot:'combiner', step:'05', lane:'Logic'},
  {slot:'confirmation', step:'06', lane:'Gate'},
  {slot:'regime', step:'07', lane:'Market'},
  {slot:'exit', step:'08', lane:'Exit'},
  {slot:'stop', step:'09', lane:'Risk'},
  {slot:'sizing', step:'10', lane:'Risk'},
  {slot:'execution', step:'11', lane:'Execution'},
  {slot:'risk', step:'12', lane:'Style'}
];
const PUZZLE_OPTION_NOTES = {
  recipe:{ starter:'最轻量起点，适合先生成第一版。', trend_pullback:'捕捉趋势中的小回撤，逻辑更稳。', momentum_breakout:'适合价格突破区间或通道。', range_recovery:'适合震荡区间里的超跌修复。', hybrid_score:'多个信号共同打分，复杂但更可控。', market_router:'先判断行情，再切换策略分支。' },
  timeframe:{ single_timeframe:'只看当前周期，简单、容易检查。', multi_timeframe:'当前周期 + 高周期共同确认。', higher_timeframe_bias:'只顺着高周期方向做，减少逆势交易。', session_aware:'考虑交易时段，适合日内或高频感知策略。' },
  base:{ trend:'均线趋势信号，最适合入门。', momentum:'MACD/动量类信号，适合强趋势。', recovery:'RSI 超跌修复，适合回撤反弹。', breakout:'通道突破，适合波动扩张。', hybrid:'主信号由多个因子打分。' },
  secondary:{ none:'不加副信号，保持简单。', volume:'成交量确认，降低假突破。', rsi_filter:'用 RSI 避免追高或确认修复。', adx_strength:'用 ADX 确认趋势强度。', bollinger_location:'用布林位置判断价格是否过度偏离。' },
  combiner:{ and:'所有条件同时满足，稳但交易少。', or:'任一条件满足，更活跃但更容易误触发。', weighted_score:'多个信号按分数合成，适合复杂策略。', priority_router:'不同信号按优先级触发，适合行情路由。' },
  confirmation:{ light:'少确认，生成速度快，交易更频繁。', balanced:'默认推荐，确认和机会平衡。', strict:'ADX + Volume 双确认，更稳。', volatility_aware:'根据波动环境过滤入场。', multi_confirm:'多层确认，适合复杂拼图。' },
  regime:{ none:'不过滤行情，最简单。', trend_filter:'只在趋势行情工作。', range_filter:'只在震荡行情工作。', volatility_aware:'避开异常波动或低质量波动。', liquidity_guard:'加入流动性/价差保护，适合更谨慎的实盘前草稿。' },
  exit:{ opposite_signal:'出现反向信号就退出，简单清楚。', composite:'多种退出条件组合。', atr_protective:'用 ATR 保护退出，更稳。', trailing_exit:'盈利后跟踪退出，适合趋势/突破。' },
  stop:{ simple_stop:'简单固定止损。', atr_stop:'随波动变化的止损，推荐。', time_stop:'持仓过久也退出，防止资金占用。' },
  sizing:{ fixed:'固定仓位，最容易审查。', volatility_scaled:'波动高时自动缩小仓位。', confidence_scaled:'信号越强仓位越大，需要更谨慎检查。' },
  execution:{ market_safe:'普通执行，最容易理解。', spread_guard:'价差过大时不交易。', candle_close:'等待 K 线确认，减少盘中噪音。' },
  risk:{ cautious:'更少交易，更重视保护。', balanced:'默认推荐。', exploratory:'更积极，适合实验版本。' }
};
const PUZZLE_COACH_PRESETS = {
  trend_safe:{ recipe:'trend_pullback', timeframe:'higher_timeframe_bias', base:'trend', secondary:'rsi_filter', combiner:'and', confirmation:'strict', regime:'volatility_aware', exit:'atr_protective', stop:'atr_stop', sizing:'volatility_scaled', execution:'spread_guard', risk:'cautious' },
  breakout_active:{ recipe:'momentum_breakout', timeframe:'multi_timeframe', base:'breakout', secondary:'volume', combiner:'and', confirmation:'balanced', regime:'trend_filter', exit:'trailing_exit', stop:'atr_stop', sizing:'fixed', execution:'candle_close', risk:'balanced' },
  dip_recovery:{ recipe:'range_recovery', timeframe:'single_timeframe', base:'recovery', secondary:'rsi_filter', combiner:'and', confirmation:'balanced', regime:'range_filter', exit:'atr_protective', stop:'atr_stop', sizing:'fixed', execution:'market_safe', risk:'balanced' },
  hybrid_guarded:{ recipe:'hybrid_score', timeframe:'multi_timeframe', base:'hybrid', secondary:'adx_strength', combiner:'weighted_score', confirmation:'multi_confirm', regime:'liquidity_guard', exit:'composite', stop:'time_stop', sizing:'confidence_scaled', execution:'spread_guard', risk:'balanced' }
};
function puzzleSlotTitle(slot){ return tl(PUZZLE_SLOT_TITLES[slot]) || slot; }
const PUZZLE_SLOT_NOTE_EN = {
  recipe: "Use this market or research idea as the strategy starting point.",
  timeframe: "Choose how much timeframe context the strategy should use.",
  base: "Use this as the primary entry signal.",
  secondary: "Use this as an optional confirmation or supporting signal.",
  combiner: "Choose how the primary and secondary signals are combined.",
  confirmation: "Choose how strict the entry confirmation should be.",
  regime: "Restrict the strategy to an appropriate market regime.",
  exit: "Choose the active exit behavior.",
  stop: "Choose the protective stop behavior.",
  sizing: "Choose how position size should be determined.",
  execution: "Choose an execution-quality guard.",
  risk: "Choose the overall risk posture for recommendations and starting values."
};
function puzzleUI(zh, en){ return state.lang === 'zh' ? zh : en; }
function puzzleOptionNote(slot, value){
  const zh = (PUZZLE_OPTION_NOTES[slot] || {})[value] || '';
  if(state.lang === 'zh') return zh;
  const label = puzzleLabel(slot, value);
  return `${label}. ${PUZZLE_SLOT_NOTE_EN[slot] || 'Configure this strategy block.'}`;
}
function puzzleOptionValues(slot){ return Object.keys(PUZZLE_LABELS[slot] || {}); }
function puzzleActiveSlot(){
  const saved = state.puzzleActiveSlot || localStorage.getItem('sb_puzzle_active_slot') || 'base';
  return PUZZLE_STAGE_ORDER.includes(saved) ? saved : 'base';
}
function setPuzzleActiveSlot(slot){
  if(!PUZZLE_STAGE_ORDER.includes(slot)) return;
  state.puzzleActiveSlot = slot;
  try { localStorage.setItem('sb_puzzle_active_slot', slot); } catch(e) {}
  renderPuzzleProBuilder();
}
function puzzleApplyChanges(changes, msg){
  state.puzzleBuilder = { ...puzzleState(), ...changes };
  savePuzzleState();
  renderPuzzleBuilder();
  if(msg) setMessage(msg);
}
function puzzleCoverage(s){
  const checks = [
    {key:'entry', ok: Boolean(s.base), label:puzzleUI('入场','Entry')},
    {key:'confirm', ok: s.confirmation !== 'light' || s.secondary !== 'none', label:puzzleUI('确认','Confirmation')},
    {key:'regime', ok: s.regime !== 'none' || s.timeframe !== 'single_timeframe', label:puzzleUI('行情','Regime')},
    {key:'exit', ok: Boolean(s.exit), label:puzzleUI('退出','Exit')},
    {key:'risk', ok: s.stop !== 'simple_stop' || s.risk !== 'exploratory', label:puzzleUI('风险','Risk')},
    {key:'execution', ok: s.execution !== 'market_safe' || s.risk !== 'cautious', label:puzzleUI('执行','Execution')}
  ];
  const score = Math.round(checks.filter(x=>x.ok).length / checks.length * 100);
  return { score, checks };
}
function puzzleStory(s){
  if(state.lang === 'zh'){
    const line1 = `这套拼图先假设市场处于“${puzzleLabel('recipe', s.recipe)}”场景，用“${puzzleLabel('base', s.base)}”作为主入场。`;
    const line2 = s.secondary === 'none' ? '当前没有副信号，因此结构更简单，但抗误触发能力较弱。' : `副信号是“${puzzleLabel('secondary', s.secondary)}”，组合方式是“${puzzleLabel('combiner', s.combiner)}”。`;
    const line3 = `入场前经过“${puzzleLabel('confirmation', s.confirmation)}”和“${puzzleLabel('regime', s.regime)}”，退出/保护为“${puzzleLabel('exit', s.exit)} + ${puzzleLabel('stop', s.stop)}”。`;
    const line4 = `仓位与执行使用“${puzzleLabel('sizing', s.sizing)} / ${puzzleLabel('execution', s.execution)}”，整体风险口味是“${puzzleLabel('risk', s.risk)}”。`;
    return [line1,line2,line3,line4].join(' ');
  }
  const line1 = `This puzzle starts from the “${puzzleLabel('recipe', s.recipe)}” idea and uses “${puzzleLabel('base', s.base)}” as the primary entry signal.`;
  const line2 = s.secondary === 'none' ? 'There is no secondary signal, so the structure is simpler but has less protection against false triggers.' : `The supporting signal is “${puzzleLabel('secondary', s.secondary)}”, combined through “${puzzleLabel('combiner', s.combiner)}”.`;
  const line3 = `Entries pass through “${puzzleLabel('confirmation', s.confirmation)}” and “${puzzleLabel('regime', s.regime)}”; exit protection uses “${puzzleLabel('exit', s.exit)} + ${puzzleLabel('stop', s.stop)}”.`;
  const line4 = `Sizing and execution use “${puzzleLabel('sizing', s.sizing)} / ${puzzleLabel('execution', s.execution)}”, with an overall “${puzzleLabel('risk', s.risk)}” risk posture.`;
  return [line1,line2,line3,line4].join(' ');
}
function puzzleSmartFillChanges(s){
  const next = {};
  if(s.base === 'breakout') Object.assign(next, { recipe:'momentum_breakout', secondary:'volume', combiner:'and', confirmation:s.confirmation==='light'?'balanced':s.confirmation, regime:'trend_filter', exit:'trailing_exit', stop:'atr_stop', execution:'candle_close' });
  else if(s.base === 'recovery') Object.assign(next, { recipe:'range_recovery', secondary:'rsi_filter', combiner:'and', regime:'range_filter', exit:'atr_protective', stop:'atr_stop' });
  else if(s.base === 'momentum') Object.assign(next, { recipe:'momentum_breakout', secondary:'volume', combiner:'and', confirmation:'balanced', regime:s.risk==='cautious'?'liquidity_guard':'trend_filter', exit:'atr_protective', stop:'atr_stop' });
  else if(s.base === 'hybrid') Object.assign(next, { recipe:'hybrid_score', timeframe:'multi_timeframe', secondary:s.secondary==='none'?'adx_strength':s.secondary, combiner:'weighted_score', confirmation:'multi_confirm', regime:s.risk==='cautious'?'liquidity_guard':'volatility_aware', exit:'composite', stop:'time_stop', sizing:'confidence_scaled', execution:'spread_guard' });
  else Object.assign(next, { recipe:'trend_pullback', secondary:s.risk==='cautious'?'rsi_filter':s.secondary, combiner:'and', confirmation:s.risk==='cautious'?'strict':'balanced', regime:s.risk==='cautious'?'volatility_aware':'none', exit:s.risk==='exploratory'?'composite':'opposite_signal', stop:s.risk==='cautious'?'atr_stop':s.stop });
  if(s.risk === 'cautious') Object.assign(next, { timeframe:'higher_timeframe_bias', sizing:'volatility_scaled', execution:'spread_guard', stop:'atr_stop' });
  if(s.risk === 'exploratory') Object.assign(next, { timeframe:'multi_timeframe', confirmation:s.confirmation==='strict'?'balanced':s.confirmation, sizing:'confidence_scaled' });
  return next;
}
function puzzleSuggestionList(s){
  const suggestions = [];
  const add=(zhTitle,enTitle,zhBody,enBody,changes)=>suggestions.push({title:puzzleUI(zhTitle,enTitle),body:puzzleUI(zhBody,enBody),changes});
  if(s.secondary === 'none' && ['weighted_score','priority_router'].includes(s.combiner)) add('给组合规则加一个副信号','Add a secondary signal','加权/路由需要更多信息，否则只是复杂化。','Weighted scoring or routing needs another information source; otherwise it adds complexity without signal diversity.',{secondary:'adx_strength'});
  if(s.base === 'breakout' && s.secondary !== 'volume') add('突破策略加成交量确认','Add volume confirmation','减少假突破，逻辑也更容易解释。','Volume confirmation can reduce false breakouts and keeps the logic easier to explain.',{secondary:'volume', combiner:'and'});
  if(s.risk === 'cautious' && s.execution !== 'spread_guard') add('谨慎版本加入价差保护','Add a spread guard','适合生成更接近实盘前检查的草稿。','This makes a cautious draft more suitable for pre-dry-run review.',{execution:'spread_guard', sizing:'volatility_scaled'});
  if(s.confirmation === 'light' && s.risk !== 'exploratory') add('确认层调到平衡','Use balanced confirmation','新手默认不建议少确认。','Light confirmation is usually not the best beginner default.',{confirmation:'balanced'});
  if(s.regime === 'none' && s.timeframe === 'single_timeframe') add('加一个行情过滤或高周期方向','Add a regime or higher-timeframe filter','让策略不要在所有行情里硬做。','Avoid forcing the strategy to trade in every market condition.',{timeframe:'higher_timeframe_bias', regime:'volatility_aware'});
  if(!suggestions.length) add('结构已经比较完整','The structure is reasonably complete','下一步可以转成 Self-Build 后检查参数和代码预览。','Next, convert it to Self-Build and review the parameters and generated code.',{});
  return suggestions.slice(0,3);
}
function renderPuzzleBlueprintMap(s){
  const map = qs('puzzle-blueprint-map'); if(!map) return;
  const active = puzzleActiveSlot();
  map.innerHTML = PUZZLE_PRO_STAGES.map(item => {
    const value = s[item.slot];
    return `<button type="button" class="puzzle-map-node ${active===item.slot?'active':''}" data-pro-slot="${item.slot}">
      <span>${item.step} · ${item.lane}</span>
      <strong>${puzzleSlotTitle(item.slot)}</strong>
      <em>${puzzleLabel(item.slot, value)}</em>
    </button>`;
  }).join('');
  map.querySelectorAll('[data-pro-slot]').forEach(btn => btn.onclick = () => setPuzzleActiveSlot(btn.dataset.proSlot));
}
function renderPuzzleOptionDeck(s){
  const deck = qs('puzzle-option-deck'); if(!deck) return;
  const slot = puzzleActiveSlot();
  const q = (qs('puzzle-block-search')?.value || '').trim().toLowerCase();
  const values = puzzleOptionValues(slot).filter(value => {
    const label = puzzleLabel(slot,value).toLowerCase();
    const note = puzzleOptionNote(slot, value).toLowerCase();
    return !q || label.includes(q) || note.includes(q) || value.toLowerCase().includes(q);
  });
  const cards = values.map(value => `<button type="button" class="puzzle-option-card ${s[slot]===value?'active':''}" data-pro-option="${value}">
    <span>${s[slot]===value?puzzleUI('当前选择','Current selection'):puzzleUI('可选积木','Available block')}</span>
    <strong>${puzzleLabel(slot,value)}</strong>
    <em>${escapeHTML(puzzleOptionNote(slot, value))}</em>
  </button>`).join('');
  deck.innerHTML = `<div class="puzzle-option-head"><div><span>${puzzleUI('正在编辑','Editing')}</span><strong>${puzzleSlotTitle(slot)}</strong><em>${tl(PUZZLE_DESCRIPTIONS[slot]) || ''}</em></div></div><div class="puzzle-option-grid">${cards || `<p class="muted">${puzzleUI('没有匹配的积木。换个关键词试试。','No matching blocks. Try another keyword.')}</p>`}</div>`;
  deck.querySelectorAll('[data-pro-option]').forEach(btn => btn.onclick = () => setPuzzleBlock(slot, btn.dataset.proOption));
}
function renderPuzzleHealthPanel(s){
  const box = qs('puzzle-health-panel'); if(!box) return;
  const coverage = puzzleCoverage(s);
  const complexity = puzzleComplexityScore(s);
  const derived = deriveStudioFromPuzzle(s);
  const warnings = puzzleWarnings(s);
  const suggestions = puzzleSuggestionList(s);
  const complexityNote = complexity < 45 ? puzzleUI('适合第一版。','Suitable for a first draft.') : complexity < 75 ? puzzleUI('复杂度适中。','Moderate complexity.') : puzzleUI('偏复杂，建议保留清楚注释。','High complexity; keep the generated logic well documented.');
  box.innerHTML = `<div class="puzzle-health-card"><span>${puzzleUI('完整度','Completeness')}</span><strong>${coverage.score}%</strong><div class="puzzle-meter"><i style="width:${coverage.score}%"></i></div><p>${coverage.checks.map(x=>`${x.ok?'✓':'·'} ${x.label}`).join(' / ')}</p></div>
    <div class="puzzle-health-card"><span>${puzzleUI('复杂度','Complexity')}</span><strong>${complexity}/100</strong><div class="puzzle-meter"><i style="width:${complexity}%"></i></div><p>${complexityNote}</p></div>
    <div class="puzzle-health-card"><span>${puzzleUI('生成区映射','Builder mapping')}</span><strong>${puzzleLabel('recipe',derived.recipe)} / ${puzzleLabel('base',derived.base)}</strong><p>${puzzleLabel('confirmation',derived.confirmation)} · ${puzzleLabel('exit',derived.exit)} · ${puzzleLabel('risk',derived.risk)}</p></div>
    <div class="puzzle-health-card puzzle-story-card"><span>${puzzleUI('策略故事','Strategy story')}</span><p>${escapeHTML(puzzleStory(s))}</p></div>
    <div class="puzzle-health-card"><span>${puzzleUI('下一步建议','Next suggestion')}</span><div class="puzzle-suggestion-list">${suggestions.map((x,i)=>`<button type="button" data-suggestion-idx="${i}"><strong>${escapeHTML(x.title)}</strong><em>${escapeHTML(x.body)}</em></button>`).join('')}</div></div>
    ${warnings.length ? `<div class="puzzle-health-card puzzle-warning-card"><span>${puzzleUI('冲突提醒','Conflict warning')}</span><ul>${warnings.map(w=>`<li>${escapeHTML(w)}</li>`).join('')}</ul></div>` : ''}`;
  box.querySelectorAll('[data-suggestion-idx]').forEach(btn => {
    btn.onclick = () => {
      const sug = suggestions[Number(btn.dataset.suggestionIdx)];
      if(sug && Object.keys(sug.changes || {}).length) puzzleApplyChanges(sug.changes, puzzleUI(`已应用建议：${sug.title}`,`Applied suggestion: ${sug.title}`));
      else setMessage(puzzleUI('这套拼图已经比较完整，可以转入 Self-Build 生成区。','This puzzle is reasonably complete and can now be converted to Self-Build.'));
    };
  });
}
function renderPuzzleProBuilder(){
  if(!qs('puzzle-pro-panel')) return;
  const s = puzzleState();
  const select = qs('puzzle-active-slot-select');
  if(select){
    const active = puzzleActiveSlot();
    select.innerHTML = PUZZLE_PRO_STAGES.map(item => `<option value="${item.slot}" ${item.slot===active?'selected':''}>${item.step}. ${puzzleSlotTitle(item.slot)} · ${puzzleLabel(item.slot, s[item.slot])}</option>`).join('');
    select.onchange = () => setPuzzleActiveSlot(select.value);
  }
  qsa('.puzzle-coach-pill').forEach(btn => btn.classList.toggle('active', false));
  renderPuzzleBlueprintMap(s);
  renderPuzzleOptionDeck(s);
  renderPuzzleHealthPanel(s);
}
function bindPuzzleProBuilder(){
  const search = qs('puzzle-block-search'); if(search) search.oninput = () => renderPuzzleProBuilder();
  const fill = qs('puzzle-smart-fill-btn'); if(fill) fill.onclick = () => puzzleApplyChanges(puzzleSmartFillChanges(puzzleState()), puzzleUI('已智能补全当前拼图。','Smart completion applied.'));
  const safe = qs('puzzle-smart-safe-btn'); if(safe) safe.onclick = () => puzzleApplyChanges({risk:'cautious', timeframe:'higher_timeframe_bias', confirmation:'strict', regime:'volatility_aware', stop:'atr_stop', sizing:'volatility_scaled', execution:'spread_guard'}, puzzleUI('已改成更稳妥的结构。','Changed to a safer structure.'));
  const active = qs('puzzle-smart-active-btn'); if(active) active.onclick = () => puzzleApplyChanges({risk:'exploratory', timeframe:'multi_timeframe', confirmation:'balanced', combiner:'or', sizing:'confidence_scaled', execution:'candle_close'}, puzzleUI('已改成更积极的实验结构。','Changed to a more active experimental structure.'));
  const use = qs('puzzle-pro-use-btn'); if(use) use.onclick = applyPuzzleToBuilder;
  const explain = qs('puzzle-explain-btn'); if(explain) explain.onclick = () => setMessage(puzzleStory(puzzleState()));
  qsa('[data-coach-preset]').forEach(btn => {
    btn.onclick = () => {
      const key = btn.dataset.coachPreset;
      puzzleApplyChanges(PUZZLE_COACH_PRESETS[key] || PUZZLE_COACH_PRESETS.trend_safe, puzzleUI('已根据目标生成一套完整拼图。','Generated a complete puzzle for the selected goal.'));
    };
  });
  renderPuzzleProBuilder();
}
const _renderPuzzleBuilder_v1211 = renderPuzzleBuilder;
renderPuzzleBuilder = function(){
  _renderPuzzleBuilder_v1211();
  renderPuzzleProBuilder();
};
const _bindPuzzleBuilder_v1211 = bindPuzzleBuilder;
bindPuzzleBuilder = function(){
  _bindPuzzleBuilder_v1211();
  bindPuzzleProBuilder();
};
Object.assign(I18N.zh, {
  entryPuzzleBody: '像搭积木一样点路线图、选模块、智能补全，再转成可生成的 Freqtrade 策略。'
});
Object.assign(I18N.en, {
  entryPuzzleBody: 'Build strategies like blocks: click the route map, choose modules, smart-fill the structure, then generate a Freqtrade draft.'
});


// ===== v1.2.12 Puzzle Builder Flex: more blocks, undo/redo, import/export, template matching =====
Object.assign(PUZZLE_LABELS.recipe, {
  factor_momentum:{zh:'因子动量',en:'Factor momentum'},
  pairs_reversion:{zh:'配对回归',en:'Pairs reversion'},
  squeeze_expansion:{zh:'挤压扩张',en:'Squeeze expansion'},
  carry_trend:{zh:'Carry + 趋势',en:'Carry + trend'},
  intraday_breakout:{zh:'日内区间突破',en:'Intraday range breakout'}
});
Object.assign(PUZZLE_LABELS.base, {
  mean_reversion:{zh:'均值回归',en:'Mean reversion'},
  vwap_reversion:{zh:'VWAP 回归',en:'VWAP reversion'},
  squeeze_breakout:{zh:'挤压突破',en:'Squeeze breakout'},
  pairs_reversion:{zh:'配对回归代理',en:'Pairs reversion proxy'},
  carry_trend:{zh:'Carry + 趋势',en:'Carry + trend'},
  residual_momentum:{zh:'残差动量',en:'Residual momentum'},
  relative_momentum:{zh:'相对动量',en:'Relative momentum'}
});
Object.assign(PUZZLE_LABELS.secondary, {
  obv_flow:{zh:'OBV 资金流',en:'OBV flow'},
  mfi_flow:{zh:'MFI 资金流',en:'MFI flow'},
  atr_expansion:{zh:'ATR 扩张',en:'ATR expansion'},
  benchmark_strength:{zh:'基准相对强度',en:'Benchmark strength'},
  funding_filter:{zh:'Funding / Basis 过滤',en:'Funding / basis filter'},
  reference_spread:{zh:'参考价差',en:'Reference spread'}
});
Object.assign(PUZZLE_LABELS.combiner, {
  quorum_vote:{zh:'多数投票',en:'Quorum vote'},
  veto_guard:{zh:'一票否决保护',en:'Veto guard'},
  sequential_gate:{zh:'顺序闸门',en:'Sequential gate'}
});
Object.assign(PUZZLE_LABELS.confirmation, {
  signal_quality:{zh:'信号质量评分',en:'Signal-quality score'},
  trend_plus_volume:{zh:'趋势 + 成交量',en:'Trend + volume'},
  double_timeframe:{zh:'双周期确认',en:'Dual-timeframe confirmation'},
  reference_confirm:{zh:'参考资产确认',en:'Reference-asset confirmation'}
});
Object.assign(PUZZLE_LABELS.regime, {
  squeeze_regime:{zh:'低波动挤压',en:'Low-volatility squeeze'},
  choppiness_guard:{zh:'震荡噪声保护',en:'Choppiness guard'},
  funding_regime:{zh:'Funding 状态',en:'Funding regime'},
  session_filter:{zh:'交易时段过滤',en:'Session filter'}
});
Object.assign(PUZZLE_LABELS.exit, {
  mean_reversion_exit:{zh:'回归到均值退出',en:'Mean-reversion exit'},
  breakout_failure_exit:{zh:'突破失败退出',en:'Breakout-failure exit'},
  score_decay_exit:{zh:'分数衰减退出',en:'Score-decay exit'},
  carry_decay_exit:{zh:'Carry 转弱退出',en:'Carry-decay exit'}
});
Object.assign(PUZZLE_LABELS.stop, {
  chandelier_stop:{zh:'Chandelier 止损',en:'Chandelier stop'},
  volatility_cutoff:{zh:'波动熔断',en:'Volatility cutoff'},
  spread_stop:{zh:'价差恶化止损',en:'Spread-widening stop'}
});
Object.assign(PUZZLE_LABELS.sizing, {
  drawdown_throttle:{zh:'回撤降仓',en:'Drawdown throttle'},
  risk_parity_proxy:{zh:'风险平价代理',en:'Risk-parity proxy'},
  signal_bucket:{zh:'信号桶仓位',en:'Signal-bucket sizing'}
});
Object.assign(PUZZLE_LABELS.execution, {
  cooldown_guard:{zh:'冷却期保护',en:'Cooldown guard'},
  gap_guard:{zh:'跳空保护',en:'Gap guard'},
  limit_proxy:{zh:'限价代理',en:'Limit-order proxy'}
});
Object.assign(PUZZLE_LABELS.risk, {
  research_draft:{zh:'研究草稿',en:'Research draft'},
  dryrun_ready:{zh:'Dry-run 准备',en:'Dry-run ready'}
});
Object.assign(PUZZLE_OPTION_NOTES.recipe, {
  factor_momentum:'把文献里的 factor/relative momentum 做成单资产代理。', pairs_reversion:'适合 reference_close 或配对资产数据。', squeeze_expansion:'低波动后等突破。', carry_trend:'趋势与 funding/basis 代理一致才做。', intraday_breakout:'用 rolling range 代理开盘区间突破。'
});
Object.assign(PUZZLE_OPTION_NOTES.base, {
  mean_reversion:'价格偏离后等待修复。', vwap_reversion:'围绕成交均价/均线的回归想法。', squeeze_breakout:'低波动收缩后的向上突破。', pairs_reversion:'参考资产价差偏离后的修复。', carry_trend:'趋势和 carry 代理同时支持方向。', residual_momentum:'剥离基准后的剩余动量。', relative_momentum:'相对基准强度改善。'
});
Object.assign(PUZZLE_OPTION_NOTES.secondary, {
  obv_flow:'用 OBV 近似资金流确认。', mfi_flow:'用 MFI 结合价格与成交量。', atr_expansion:'要求波动开始扩张。', benchmark_strength:'要求相对基准强度支持。', funding_filter:'用于 futures/perpetual 的 funding 或 basis 过滤。', reference_spread:'用于价差/配对类策略。'
});
Object.assign(PUZZLE_OPTION_NOTES.combiner, { quorum_vote:'多个条件达到多数即可。', veto_guard:'任一保护条件失败则不交易。', sequential_gate:'先过环境，再看信号，最后看执行。' });
Object.assign(PUZZLE_OPTION_NOTES.confirmation, { signal_quality:'把确认层看作质量评分。', trend_plus_volume:'趋势与成交量同时确认。', double_timeframe:'短周期信号必须被高周期接受。', reference_confirm:'需要参考资产或 benchmark 同意。' });
Object.assign(PUZZLE_OPTION_NOTES.regime, { squeeze_regime:'只在低波动收缩后寻找机会。', choppiness_guard:'过滤来回震荡噪声。', funding_regime:'只在 carry/funding 环境可接受时工作。', session_filter:'给日内策略保留时段过滤语义。' });
Object.assign(PUZZLE_OPTION_NOTES.exit, { mean_reversion_exit:'价差/指标回到均值就退出。', breakout_failure_exit:'突破失败后快速退出。', score_decay_exit:'多信号分数衰减退出。', carry_decay_exit:'carry 支持消失后退出。' });
Object.assign(PUZZLE_OPTION_NOTES.stop, { chandelier_stop:'趋势类常用的波动跟踪保护。', volatility_cutoff:'波动极端时保护退出。', spread_stop:'价差继续恶化时退出。' });
Object.assign(PUZZLE_OPTION_NOTES.sizing, { drawdown_throttle:'策略回撤时自动降风险。', risk_parity_proxy:'用波动代理调整仓位。', signal_bucket:'把信号强弱分成仓位桶。' });
Object.assign(PUZZLE_OPTION_NOTES.execution, { cooldown_guard:'触发后等待一段时间，避免连续误触发。', gap_guard:'跳空或异常 K 线后暂停。', limit_proxy:'保留限价执行的设计语义。' });
Object.assign(PUZZLE_OPTION_NOTES.risk, { research_draft:'适合先探索概念，必须外部测试。', dryrun_ready:'更偏向 dry-run 前的保护结构。' });
Object.assign(PUZZLE_COACH_PRESETS, {
  factor_momentum:{ recipe:'factor_momentum', timeframe:'multi_timeframe', base:'relative_momentum', secondary:'benchmark_strength', combiner:'sequential_gate', confirmation:'double_timeframe', regime:'trend_filter', exit:'score_decay_exit', stop:'atr_stop', sizing:'volatility_scaled', execution:'candle_close', risk:'balanced' },
  pairs_reversion:{ recipe:'pairs_reversion', timeframe:'single_timeframe', base:'pairs_reversion', secondary:'reference_spread', combiner:'veto_guard', confirmation:'reference_confirm', regime:'range_filter', exit:'mean_reversion_exit', stop:'spread_stop', sizing:'fixed', execution:'spread_guard', risk:'cautious' },
  squeeze_breakout:{ recipe:'squeeze_expansion', timeframe:'multi_timeframe', base:'squeeze_breakout', secondary:'atr_expansion', combiner:'sequential_gate', confirmation:'trend_plus_volume', regime:'squeeze_regime', exit:'breakout_failure_exit', stop:'chandelier_stop', sizing:'signal_bucket', execution:'cooldown_guard', risk:'balanced' },
  carry_trend:{ recipe:'carry_trend', timeframe:'higher_timeframe_bias', base:'carry_trend', secondary:'funding_filter', combiner:'and', confirmation:'trend_plus_volume', regime:'funding_regime', exit:'carry_decay_exit', stop:'volatility_cutoff', sizing:'risk_parity_proxy', execution:'gap_guard', risk:'dryrun_ready' }
});
Object.assign(PUZZLE_EASY_PRESETS, {
  factor: PUZZLE_COACH_PRESETS.factor_momentum,
  pairs: PUZZLE_COACH_PRESETS.pairs_reversion,
  squeeze: PUZZLE_COACH_PRESETS.squeeze_breakout,
  carry: PUZZLE_COACH_PRESETS.carry_trend
});
const _deriveStudioFromPuzzle_v1212 = deriveStudioFromPuzzle;
deriveStudioFromPuzzle = function(s){
  const normalized = { ...s };
  if(['pairs_reversion','mean_reversion','vwap_reversion'].includes(normalized.base)) normalized.base = 'recovery';
  if(['squeeze_breakout','relative_momentum','residual_momentum','carry_trend'].includes(normalized.base)) normalized.base = normalized.base === 'squeeze_breakout' ? 'breakout' : 'momentum';
  if(['quorum_vote','veto_guard','sequential_gate'].includes(normalized.combiner)) normalized.combiner = normalized.combiner === 'quorum_vote' ? 'weighted_score' : 'and';
  if(['signal_quality','trend_plus_volume','double_timeframe','reference_confirm'].includes(normalized.confirmation)) normalized.confirmation = normalized.confirmation === 'double_timeframe' ? 'strict' : 'balanced';
  if(['squeeze_regime','choppiness_guard','funding_regime','session_filter'].includes(normalized.regime)) normalized.regime = normalized.regime === 'squeeze_regime' ? 'volatility_aware' : (normalized.regime === 'choppiness_guard' ? 'range_filter' : 'trend_filter');
  if(['mean_reversion_exit','breakout_failure_exit','score_decay_exit','carry_decay_exit'].includes(normalized.exit)) normalized.exit = normalized.exit === 'score_decay_exit' ? 'composite' : 'atr_protective';
  if(['chandelier_stop','volatility_cutoff','spread_stop'].includes(normalized.stop)) normalized.stop = 'atr_stop';
  if(['drawdown_throttle','risk_parity_proxy','signal_bucket'].includes(normalized.sizing)) normalized.sizing = normalized.sizing === 'signal_bucket' ? 'confidence_scaled' : 'volatility_scaled';
  if(['cooldown_guard','gap_guard','limit_proxy'].includes(normalized.execution)) normalized.execution = normalized.execution === 'limit_proxy' ? 'spread_guard' : 'candle_close';
  if(['research_draft','dryrun_ready'].includes(normalized.risk)) normalized.risk = normalized.risk === 'dryrun_ready' ? 'cautious' : 'balanced';
  const out = _deriveStudioFromPuzzle_v1212(normalized);
  if(s.base === 'pairs_reversion') Object.assign(out, {recipe:'range_recovery', base:'recovery', confirmation:'strict', exit:'atr_protective', risk:'cautious'});
  if(s.base === 'squeeze_breakout') Object.assign(out, {recipe:'momentum_breakout', base:'breakout', confirmation:'balanced', exit:'atr_protective'});
  if(s.base === 'carry_trend') Object.assign(out, {recipe:'futures_bias', base:'momentum', confirmation:'strict', exit:'atr_protective'});
  return out;
};
const PUZZLE_HISTORY_LIMIT = 30;
state.puzzleUndoStack = state.puzzleUndoStack || [];
state.puzzleRedoStack = state.puzzleRedoStack || [];
function puzzleSnapshot(){ return { ...puzzleState() }; }
function puzzleSameState(a,b){ return JSON.stringify(a || {}) === JSON.stringify(b || {}); }
function pushPuzzleUndoSnapshot(){
  const snap = puzzleSnapshot();
  const stack = state.puzzleUndoStack;
  if(!stack.length || !puzzleSameState(stack[stack.length-1], snap)) stack.push(snap);
  if(stack.length > PUZZLE_HISTORY_LIMIT) stack.shift();
  state.puzzleRedoStack = [];
}
function setPuzzleFromSnapshot(snap, msg){
  state.puzzleBuilder = { ...PUZZLE_DEFAULT, ...(snap || {}) };
  savePuzzleState();
  renderPuzzleBuilder();
  if(msg) setMessage(msg);
}
const _setPuzzleBlock_v1212 = setPuzzleBlock;
setPuzzleBlock = function(slot, value){ pushPuzzleUndoSnapshot(); _setPuzzleBlock_v1212(slot, value); renderPuzzleFlexPanel(); };
const _puzzleApplyChanges_v1212 = puzzleApplyChanges;
puzzleApplyChanges = function(changes, msg){ pushPuzzleUndoSnapshot(); _puzzleApplyChanges_v1212(changes, msg); renderPuzzleFlexPanel(); };
const _clearPuzzleBuilder_v1212 = clearPuzzleBuilder;
clearPuzzleBuilder = function(){ pushPuzzleUndoSnapshot(); _clearPuzzleBuilder_v1212(); renderPuzzleFlexPanel(); };
const _applyPuzzlePreset_v1212 = applyPuzzlePreset;
applyPuzzlePreset = function(type){ pushPuzzleUndoSnapshot(); _applyPuzzlePreset_v1212(type); renderPuzzleFlexPanel(); };
const _applyPuzzleEasyPreset_v1212 = applyPuzzleEasyPreset;
applyPuzzleEasyPreset = function(key, quiet=false){ pushPuzzleUndoSnapshot(); _applyPuzzleEasyPreset_v1212(key, quiet); renderPuzzleFlexPanel(); };
function undoPuzzle(){
  if(!state.puzzleUndoStack.length) return setMessage(state.lang==='zh'?'没有可撤销的拼图步骤。':'No puzzle step to undo.');
  state.puzzleRedoStack.push(puzzleSnapshot());
  const prev = state.puzzleUndoStack.pop();
  setPuzzleFromSnapshot(prev, state.lang==='zh'?'已撤销上一步。':'Undone.');
}
function redoPuzzle(){
  if(!state.puzzleRedoStack.length) return setMessage(state.lang==='zh'?'没有可重做的拼图步骤。':'No puzzle step to redo.');
  state.puzzleUndoStack.push(puzzleSnapshot());
  const next = state.puzzleRedoStack.pop();
  setPuzzleFromSnapshot(next, state.lang==='zh'?'已重做。':'Redone.');
}
function copyPuzzleJSON(){
  const raw = JSON.stringify(puzzleState(), null, 2);
  if(navigator.clipboard?.writeText){ navigator.clipboard.writeText(raw).then(()=>setMessage(state.lang==='zh'?'拼图 JSON 已复制。':'Puzzle JSON copied.')).catch(()=>window.prompt('Copy puzzle JSON:', raw)); }
  else window.prompt('Copy puzzle JSON:', raw);
}
function importPuzzleJSON(){
  const raw = window.prompt(state.lang==='zh'?'粘贴 Puzzle JSON':'Paste Puzzle JSON');
  if(!raw) return;
  try{
    const parsed = JSON.parse(raw);
    const valid = {};
    PUZZLE_STAGE_ORDER.forEach(slot => { if(parsed[slot] && PUZZLE_LABELS[slot]?.[parsed[slot]]) valid[slot] = parsed[slot]; });
    if(!Object.keys(valid).length) throw new Error('No valid puzzle slots found');
    pushPuzzleUndoSnapshot();
    setPuzzleFromSnapshot(valid, state.lang==='zh'?'已导入拼图 JSON。':'Puzzle JSON imported.');
  }catch(err){ setMessage((state.lang==='zh'?'JSON 无法导入：':'Could not import JSON: ') + err.message, true); }
}
function randomSafePuzzle(){
  const choices = ['trend_safe','breakout_active','dip_recovery','hybrid_guarded','factor_momentum','pairs_reversion','squeeze_breakout','carry_trend'];
  const key = choices[Math.floor(Math.random()*choices.length)];
  const base = PUZZLE_COACH_PRESETS[key] || PUZZLE_COACH_PRESETS.trend_safe;
  puzzleApplyChanges(base, state.lang==='zh'?'已生成一个新的稳妥组合。':'Generated a new coherent puzzle combination.');
}
function puzzleTemplateScore(tpl, s){
  const tags = new Set(tpl.tags || []);
  let score = 0;
  const add = (cond, n) => { if(cond) score += n; };
  add(tpl.strategy_mode === 'literature', 2);
  add(['relative_momentum','residual_momentum'].includes(s.base) && (tags.has('momentum') || tags.has('factor')), 4);
  add(s.base === 'pairs_reversion' && (tags.has('pairs') || tags.has('mean_reversion')), 5);
  add(s.base === 'squeeze_breakout' && (tags.has('squeeze') || tags.has('breakout') || tpl.category === 'breakout'), 5);
  add(s.base === 'carry_trend' && (tags.has('carry') || tags.has('futures')), 5);
  add(s.base === 'breakout' && (tags.has('breakout') || tpl.category === 'breakout'), 3);
  add(['recovery','mean_reversion','vwap_reversion'].includes(s.base) && (tags.has('reversion') || tpl.category === 'mean_reversion'), 3);
  add(s.regime === 'liquidity_guard' && tags.has('liquidity'), 2);
  add(s.regime === 'volatility_aware' && tags.has('volatility'), 2);
  add(s.secondary === 'volume' && tags.has('volume'), 2);
  return score;
}
function renderPuzzleTemplateMatches(s){
  const items = (state.templates || []).map(tpl => ({tpl, score:puzzleTemplateScore(tpl, s)})).filter(x => x.score > 0).sort((a,b)=>b.score-a.score).slice(0,4);
  if(!items.length) return '<p class="muted">No matching templates loaded yet.</p>';
  return items.map(({tpl,score}) => `<button type="button" class="puzzle-match-card" data-puzzle-match="${tpl.key}"><strong>${escapeHTML(tl(tpl.label))}</strong><span>${strategyModeLabel(tpl.strategy_mode)} · score ${score}</span><em>${escapeHTML(tl(tpl.description))}</em></button>`).join('');
}
function renderPuzzleFlexPanel(){
  const box = qs('puzzle-flex-panel'); if(!box) return;
  const s = puzzleState();
  const specialty = [
    {key:'factor_momentum', title:state.lang==='zh'?'因子动量路线':'Factor momentum route', body:'Relative strength + benchmark confirmation'},
    {key:'pairs_reversion', title:state.lang==='zh'?'配对回归路线':'Pairs reversion route', body:'Reference spread + mean reversion exit'},
    {key:'squeeze_breakout', title:state.lang==='zh'?'挤压突破路线':'Squeeze breakout route', body:'Low volatility + breakout + volume'},
    {key:'carry_trend', title:state.lang==='zh'?'Carry 趋势路线':'Carry trend route', body:'Funding/basis + trend confirmation'}
  ];
  box.innerHTML = `<div class="puzzle-flex-head"><div><strong>${state.lang==='zh'?'灵活拼图扩展':'Flexible puzzle extensions'}</strong><p>${state.lang==='zh'?'选择一个高级研究路线，或从下方匹配模板继续。':'Choose an advanced research route, or continue from a matched template below.'}</p></div><span>${Object.keys(PUZZLE_LABELS.base).length} ${state.lang==='zh'?'主信号':'primary blocks'}</span></div>
    <div class="puzzle-specialty-row">${specialty.map(x=>`<button type="button" data-flex-preset="${x.key}"><strong>${x.title}</strong><em>${x.body}</em></button>`).join('')}</div>
    <div class="puzzle-flex-columns"><section><h4>${state.lang==='zh'?'当前 DNA':'Current DNA'}</h4><div class="puzzle-dna-row"><span>${puzzleLabel('recipe',s.recipe)}</span><span>${puzzleLabel('base',s.base)}</span><span>${puzzleLabel('secondary',s.secondary)}</span><span>${puzzleLabel('combiner',s.combiner)}</span><span>${puzzleLabel('risk',s.risk)}</span></div></section><section><h4>${state.lang==='zh'?'最匹配模板':'Best matching templates'}</h4><div class="puzzle-match-list">${renderPuzzleTemplateMatches(s)}</div></section></div>`;
  box.querySelectorAll('[data-flex-preset]').forEach(btn => btn.onclick = () => puzzleApplyChanges(PUZZLE_COACH_PRESETS[btn.dataset.flexPreset], state.lang==='zh'?'已应用高级研究路线。':'Advanced research route applied.'));
  box.querySelectorAll('[data-puzzle-match]').forEach(btn => btn.onclick = () => selectTemplateAndOpenBuilder(btn.dataset.puzzleMatch));
}
const _renderPuzzleProBuilder_v1212 = renderPuzzleProBuilder;
renderPuzzleProBuilder = function(){ _renderPuzzleProBuilder_v1212(); renderPuzzleFlexPanel(); };
const _bindPuzzleProBuilder_v1212 = bindPuzzleProBuilder;
bindPuzzleProBuilder = function(){
  _bindPuzzleProBuilder_v1212();
  const undo = qs('puzzle-undo-btn'); if(undo) undo.onclick = undoPuzzle;
  const redo = qs('puzzle-redo-btn'); if(redo) redo.onclick = redoPuzzle;
  const copy = qs('puzzle-copy-json-btn'); if(copy) copy.onclick = copyPuzzleJSON;
  const imp = qs('puzzle-import-json-btn'); if(imp) imp.onclick = importPuzzleJSON;
  const rand = qs('puzzle-random-btn'); if(rand) rand.onclick = randomSafePuzzle;
  renderPuzzleFlexPanel();
};
const _updatePuzzleFromEasyControls_v1212 = updatePuzzleFromEasyControls;
updatePuzzleFromEasyControls = function(){
  const base = qs('puzzle-easy-base')?.value;
  if(!['mean_reversion','squeeze_breakout','pairs_reversion','carry_trend'].includes(base)) return _updatePuzzleFromEasyControls_v1212();
  const risk = qs('puzzle-easy-risk')?.value || 'balanced';
  const confirmation = qs('puzzle-easy-confirm')?.value || 'balanced';
  let next = { ...PUZZLE_DEFAULT, base, risk, confirmation };
  if(base === 'mean_reversion') Object.assign(next, { recipe:'range_recovery', secondary:'rsi_filter', combiner:'and', regime:'range_filter', exit:'mean_reversion_exit', stop:'atr_stop', sizing:'fixed', execution:'market_safe' });
  if(base === 'squeeze_breakout') Object.assign(next, PUZZLE_COACH_PRESETS.squeeze_breakout);
  if(base === 'pairs_reversion') Object.assign(next, PUZZLE_COACH_PRESETS.pairs_reversion);
  if(base === 'carry_trend') Object.assign(next, PUZZLE_COACH_PRESETS.carry_trend);
  if(risk === 'cautious') Object.assign(next, { timeframe:'higher_timeframe_bias', sizing:'volatility_scaled', execution:'spread_guard', stop:'atr_stop' });
  if(risk === 'exploratory') Object.assign(next, { timeframe:'multi_timeframe', sizing:'confidence_scaled', risk:'research_draft' });
  pushPuzzleUndoSnapshot();
  state.puzzleBuilder = next;
  savePuzzleState();
  renderPuzzleBuilder();
  setMessage(state.lang === 'zh' ? '已根据扩展选项自动重拼。' : 'Puzzle updated from the extended simple choice.');
};
Object.assign(I18N.zh, { puzzleFlexUpgrade: '更灵活的 Puzzle Builder 已启用：新增高级研究路线、JSON 导入导出、撤销/重做和模板匹配。' });
Object.assign(I18N.en, { puzzleFlexUpgrade: 'More flexible Puzzle Builder enabled: advanced research routes, JSON import/export, undo/redo, and template matching.' });



// v1.2.13 Strategy Doctor + literature family organization.
Object.assign(I18N.en, {
  strategyDoctorNav: "Doctor",
  doctorLayerKicker: "Strategy Doctor",
  doctorLayerTitle: "Check quality, readiness, and literature assumptions before generating code.",
  doctorLayerBody: "This layer explains whether a strategy is beginner-friendly, data-heavy, only a research proxy, or likely to need extra review before Freqtrade testing."
});
Object.assign(I18N.zh, {
  strategyDoctorNav: "策略医生",
  doctorLayerKicker: "Strategy Doctor",
  doctorLayerTitle: "生成代码前检查质量、准备度和文献假设。",
  doctorLayerBody: "这一层解释策略是否适合新手、是否依赖特殊数据、是否只是研究代理，以及在 Freqtrade 测试前是否需要额外审查。"
});
if(typeof LAYER_SECTION_IDS !== 'undefined' && !LAYER_SECTION_IDS.includes('strategy-doctor-panel')) LAYER_SECTION_IDS.push('strategy-doctor-panel');
if(typeof LAYER_MAP !== 'undefined') LAYER_MAP.doctor = ['strategy-doctor-panel'];
const _layerIntroCopy_v1213 = layerIntroCopy;
layerIntroCopy = function(layer){
  if(layer === 'doctor'){
    return state.lang === 'zh'
      ? ['Strategy Doctor', '生成前先看懂策略是否靠谱。', '这里按信号质量、风险控制、过拟合风险、数据难度、Freqtrade 兼容性和新手友好度检查模板，并把文献策略按研究家族重新组织。']
      : ['Strategy Doctor', 'Understand whether a strategy is usable before generating.', 'This page scores signal quality, risk control, overfitting risk, data difficulty, Freqtrade compatibility, and beginner friendliness, while organizing literature strategies by research family.'];
  }
  return _layerIntroCopy_v1213(layer);
};
function doctorFamilyForTemplate(tpl){
  const tags = new Set((tpl.tags || []).map(x => String(x).toLowerCase()));
  const hay = `${tpl.key || ''} ${tpl.category || ''} ${tpl.market_regime || ''} ${tpl.workflow_stage || ''} ${(tpl.tags || []).join(' ')}`.toLowerCase().replace(/-/g,'_');
  const rules = [
    ['Momentum', ['momentum','trend','relative','residual','roc']],
    ['Reversal', ['reversion','mean_reversion','rsi','pairs','spread']],
    ['Breakout', ['breakout','squeeze','channel','opening']],
    ['Volatility', ['volatility','atr','squeeze','bollinger']],
    ['Liquidity / Microstructure', ['liquidity','volume','lead_lag','microstructure','lob']],
    ['Carry / Futures', ['carry','futures','funding','basis']],
    ['Hybrid / Adaptive', ['adaptive','regime','score','router','hybrid']]
  ];
  for(const [family, terms] of rules){ if(terms.some(term => hay.includes(term) || tags.has(term))) return family; }
  return 'Other';
}
function doctorScoresForTemplate(tpl){
  const fieldNames = new Set((tpl.fields || []).map(f => f.name));
  const key = String(tpl.key || '').toLowerCase();
  const workflow = String(tpl.workflow_stage || '').toLowerCase();
  const mode = tpl.strategy_mode || 'traditional';
  const risk = String(tpl.risk_level || 'medium').toLowerCase();
  const scores = { signal:60, risk:50, overfit:60, data:75, freqtrade:70, beginner:65 };
  if(tpl.entry_logic || tpl.signal_structure) scores.signal += 15;
  if((tpl.confirmation_layers || []).length) scores.signal += Math.min(15, (tpl.confirmation_layers || []).length * 4);
  if(fieldNames.has('stoploss') || fieldNames.has('atr_period') || fieldNames.has('max_atr_pct') || tpl.risk_logic) scores.risk += 20;
  if((tpl.exit_modules || []).length || ['exit_window','sell_rsi','exit_z','hard_z'].some(x => fieldNames.has(x))) scores.risk += 15;
  if(risk === 'low'){ scores.beginner += 10; scores.risk += 5; }
  if(risk === 'high'){ scores.beginner -= 15; scores.overfit -= 10; }
  if(mode === 'literature'){ scores.signal += 8; scores.beginner -= 5; }
  if(mode === 'self_build'){ scores.beginner -= 5; scores.overfit -= 5; }
  if(['lead_lag','pairs','carry','cross_sectional','residual','beta'].some(x => key.includes(x) || workflow.includes(x))) scores.data -= 25;
  if(key.includes('proxy') || workflow.includes('proxy')) scores.freqtrade += 10;
  if(['tick','lob','lead_lag_calendar'].some(x => key.includes(x))) scores.freqtrade -= 25;
  if((tpl.fields || []).length > 16){ scores.beginner -= 10; scores.overfit -= 8; }
  if((tpl.fields || []).length <= 8) scores.beginner += 10;
  Object.keys(scores).forEach(k => scores[k] = Math.max(0, Math.min(100, Math.round(scores[k]))));
  scores.overall = Math.round((scores.signal + scores.risk + scores.overfit + scores.data + scores.freqtrade + scores.beginner) / 6);
  return scores;
}
function doctorWarningsForTemplate(tpl, scores){
  const out = [];
  const key = tpl.key || '';
  if(scores.data < 60) out.push('Data requirements need review; this template may require benchmark, reference, futures, spread, or special external columns.');
  if(scores.freqtrade < 60) out.push('Freqtrade compatibility may require extra adapter work or non-standard data.');
  if(key.includes('lead_lag_calendar_spread_feedback')) out.push('Paper replication needs tick-level F1/F2 bid/ask LOB fields; ordinary OHLCV bars are not enough.');
  if(!(tpl.exit_logic || (tpl.exit_modules || []).length)) out.push('Exit logic is not strongly documented; inspect generated code before testing.');
  if(scores.overfit < 55) out.push('Many parameters or research assumptions increase overfitting risk. Start with conservative ranges.');
  return out;
}
function doctorBadge(label, score){
  const cls = score >= 75 ? 'good' : (score >= 55 ? 'medium' : 'weak');
  return `<div class="doctor-score-card ${cls}"><span>${escapeHTML(label)}</span><strong>${score}</strong><div class="doctor-meter"><i style="width:${score}%"></i></div></div>`;
}
function selectedDoctorTemplate(){
  const key = qs('doctor-template-select')?.value || state.doctorSelectedKey || state.selectedTemplate?.key || (state.templates[0]||{}).key;
  return (state.templates || []).find(t => t.key === key) || state.selectedTemplate || (state.templates || [])[0];
}
function renderDoctorTemplateSelect(){
  const sel = qs('doctor-template-select'); if(!sel || !state.templates?.length) return;
  const current = selectedDoctorTemplate()?.key;
  sel.innerHTML = state.templates.map(tpl => `<option value="${escapeHTML(tpl.key)}">${escapeHTML(tl(tpl.label))} · ${escapeHTML(strategyModeLabel(tpl.strategy_mode))}</option>`).join('');
  if(current) sel.value = current;
  sel.onchange = () => { state.doctorSelectedKey = sel.value; renderStrategyDoctorPanel(); };
  const open = qs('doctor-open-builder-btn'); if(open) open.onclick = () => { const tpl = selectedDoctorTemplate(); if(tpl) selectTemplateAndOpenBuilder(tpl.key); };
  const litOnly = qs('doctor-literature-only-btn'); if(litOnly) litOnly.onclick = () => { setStrategyModeOnly('literature'); showLayer('literature', true); };
}
function renderStrategyDoctorPanel(){
  if(!qs('strategy-doctor-panel') || !state.templates?.length) return;
  renderDoctorTemplateSelect();
  const tpl = selectedDoctorTemplate();
  if(!tpl) return;
  renderDoctorScores(tpl);
  renderDoctorSelectedCard(tpl);
  renderDoctorReadinessCard(tpl);
  renderDoctorFamilies();
}
const _loadTemplateData_v1213 = loadTemplateData;
loadTemplateData = async function(){ await _loadTemplateData_v1213(); renderStrategyDoctorPanel(); };
const _renderTemplateList_v1213 = renderTemplateList;
renderTemplateList = function(){ _renderTemplateList_v1213(); renderStrategyDoctorPanel(); };
const _bindLayeredNavigation_v1213 = bindLayeredNavigation;
bindLayeredNavigation = function(){
  _bindLayeredNavigation_v1213();
  const btn = qs('entry-doctor-btn'); if(btn) btn.onclick = () => showLayer('doctor', true);
  const nav = document.querySelector('[data-layer-nav="doctor"]'); if(nav) nav.textContent = state.lang === 'zh' ? '策略医生' : 'Doctor';
};
const _applyI18N_v1213 = applyI18N;
applyI18N = function(){
  _applyI18N_v1213();
  const nav = document.querySelector('[data-layer-nav="doctor"]'); if(nav) nav.textContent = state.lang === 'zh' ? '策略医生' : 'Doctor';
  if(qs('entry-doctor-title')) qs('entry-doctor-title').textContent = state.lang === 'zh' ? '策略医生' : 'Strategy Doctor';
  if(qs('entry-doctor-body')) qs('entry-doctor-body').textContent = state.lang === 'zh' ? '生成代码前检查质量、数据假设和回测准备度。' : 'Check quality, data assumptions, and backtest readiness before generating.';
  if(qs('entry-doctor-btn')) qs('entry-doctor-btn').textContent = state.lang === 'zh' ? '打开策略医生' : 'Open Strategy Doctor';
  if(qs('doctor-title')) qs('doctor-title').textContent = state.lang === 'zh' ? '生成代码前先做策略体检' : 'Review strategy quality before generating code';
  if(qs('doctor-subtitle')) qs('doctor-subtitle').textContent = state.lang === 'zh' ? '检查文献家族、数据要求、代理/复刻状态、Freqtrade 兼容性和新手友好度。' : 'Inspect literature families, data requirements, proxy-vs-replication status, Freqtrade compatibility, and beginner friendliness.';
};


// v1.2.14 AI Paper Lab: upload a paper, call the user's own OpenAI-compatible API,
// and save a locally generated Freqtrade strategy draft. API keys are never stored.
if (typeof LAYER_SECTION_IDS !== 'undefined' && !LAYER_SECTION_IDS.includes('ai-paper-panel')) {
  LAYER_SECTION_IDS.push('ai-paper-panel');
}
if (typeof LAYER_MAP !== 'undefined') {
  LAYER_MAP['ai-paper'] = ['ai-paper-panel'];
}
const _layerIntroCopy_v1214 = layerIntroCopy;
layerIntroCopy = function(layer){
  if(layer === 'ai-paper'){
    if(state.lang === 'zh') return ['AI Paper Lab', '上传论文，用你自己的 API 生成策略草稿。', '为了节省 token，应用只发送压缩后的论文片段，让模型返回短 JSON 蓝图，再在本地生成 Freqtrade Python 文件。API key 不会保存。'];
    return ['AI Paper Lab', 'Upload a paper and use your own API to create a strategy draft.', 'To reduce token usage, the app sends a compact paper excerpt, asks the model for a short JSON blueprint, then generates the Freqtrade Python file locally. API keys are not saved.'];
  }
  return _layerIntroCopy_v1214(layer);
};
const AI_PROVIDER_PRESETS = {
  openai: { model:'gpt-4o-mini', en:'OpenAI Chat Completions with compact JSON output.', zh:'OpenAI Chat Completions，并请求精简 JSON 输出。' },
  deepseek: { model:'deepseek-v4-flash', en:'DeepSeek V4 Flash through the OpenAI-compatible chat endpoint.', zh:'DeepSeek V4 Flash 的 OpenAI 兼容聊天接口。' },
  kimi: { model:'kimi-k2.6', en:'Kimi API through Moonshot. Use a Kimi platform API key, not a consumer membership key.', zh:'通过 Moonshot 调用 Kimi API。请使用 Kimi 开放平台 API key，而不是会员账号 key。' },
  anthropic: { model:'claude-sonnet-5', en:'Claude Messages API with a current Sonnet default; the model field remains editable.', zh:'Claude Messages API，默认使用当前 Sonnet 模型；模型字段可编辑。' },
  gemini: { model:'gemini-3.5-flash-lite', en:'Google Gemini Flash-Lite with minimal thinking and JSON response mode.', zh:'Google Gemini Flash-Lite，使用最小思考等级和 JSON 响应模式。' },
  openrouter: { model:'openrouter/auto-beta', en:'OpenRouter Auto Beta routing. Replace the model slug with any model available to your key.', zh:'OpenRouter Auto Beta 路由。可把模型标识替换成你的 key 可用的任意模型。' },
  custom: { model:'gpt-4o-mini', en:'Public HTTPS OpenAI-compatible chat-completions endpoint. Enter its base URL below.', zh:'公共 HTTPS OpenAI 兼容 chat-completions 接口。请在下方填写 Base URL。' }
};
function aiPaperProviderDefaults(forceModel=false){
  const provider = qs('ai-paper-provider')?.value || 'openai';
  const preset = AI_PROVIDER_PRESETS[provider] || AI_PROVIDER_PRESETS.openai;
  const model = qs('ai-paper-model');
  if(model){
    const priorDefault = model.dataset.defaultModel || '';
    if(forceModel || !model.value.trim() || model.value.trim() === priorDefault) model.value = preset.model;
    model.dataset.defaultModel = preset.model;
    model.placeholder = preset.model;
  }
  const note = qs('ai-paper-provider-note');
  if(note) note.textContent = state.lang === 'zh' ? preset.zh : preset.en;
  const base = qs('ai-paper-base-url');
  if(base){
    const custom = provider === 'custom';
    base.disabled = !custom;
    if(!custom) base.value = '';
  }
}
function renderAIPaperResult(html){
  const box = qs('ai-paper-result'); if(box) box.innerHTML = html;
}
const _bindLayeredNavigation_v1214 = bindLayeredNavigation;
bindLayeredNavigation = function(){
  _bindLayeredNavigation_v1214();
  document.querySelectorAll('[data-entry-action="ai-paper"]').forEach(card => {
    card.onclick = () => showLayer('ai-paper', true);
  });
  const nav = document.querySelector('[data-layer-nav="ai-paper"]');
  if(nav) nav.textContent = state.lang === 'zh' ? 'AI 论文' : 'AI Paper Lab';
  const provider = qs('ai-paper-provider'); if(provider) provider.onchange = aiPaperProviderDefaults;
  const form = qs('ai-paper-form'); if(form) form.onsubmit = submitAIPaperForm;
};
const _applyI18N_v1214 = applyI18N;
applyI18N = function(){
  _applyI18N_v1214();
  const nav = document.querySelector('[data-layer-nav="ai-paper"]');
  if(nav) nav.textContent = state.lang === 'zh' ? 'AI 论文' : 'AI Paper Lab';
};



// ===== v1.2.20 multi-provider AI Paper Lab: consistent localization, AI Paper hardening, and System Check =====
Object.assign(I18N.en, {
  diagnosticsNav: 'System Check', diagnosticsTitle: 'Verify the installation and strategy templates',
  diagnosticsSubtitle: 'Run a quick runtime check or compile every registered template. This does not run a backtest or contact an exchange.',
  diagnosticsQuick: 'Run quick check', diagnosticsDeep: 'Run full template audit', diagnosticsIdle: 'No system check has been run yet.',
  diagnosticsRunning: 'Running system check...', diagnosticsPassed: 'System check passed', diagnosticsNeedsReview: 'System check needs review',
  aiUploadFirst: 'Please upload a paper first.', aiKeyFirst: 'Please enter your API key. It is used once and is not saved.',
  aiGenerating: 'Generating strategy...', aiGeneratingBody: 'Extracting paper text, requesting a compact blueprint, and saving locally generated code.',
  aiSaved: 'Strategy saved', aiPaperIdea: 'Paper idea', aiProxyWarning: 'Freqtrade proxy limitation', aiTokenReduction: 'Token reduction',
  aiOpenLibrary: 'Open in Library', aiFailed: 'Generation failed', aiRetryHint: 'Try a TXT/Markdown excerpt, a smaller input limit, or another supported model.',
  doctorOverall: 'Overall', doctorSignal: 'Signal logic', doctorRisk: 'Risk control', doctorOverfit: 'Overfit safety', doctorData: 'Data ease', doctorFit: 'Freqtrade fit', doctorBeginner: 'Beginner',
  doctorReviewFirst: 'Review first', doctorNoWarning: 'No major template-level warning. Preview and backtest before use.',
  doctorReadiness: 'Backtest readiness checklist', doctorLiteratureOrganization: 'Literature strategy organization', doctorShowLiterature: 'Show literature templates',
});
Object.assign(I18N.zh, {
  diagnosticsNav: '系统检查', diagnosticsTitle: '检查安装状态和全部策略模板',
  diagnosticsSubtitle: '可运行快速环境检查，或编译全部注册模板。这里不会运行回测，也不会连接交易所。',
  diagnosticsQuick: '快速检查', diagnosticsDeep: '完整模板审计', diagnosticsIdle: '尚未运行系统检查。',
  diagnosticsRunning: '正在运行系统检查…', diagnosticsPassed: '系统检查通过', diagnosticsNeedsReview: '系统检查需要处理',
  aiUploadFirst: '请先上传论文。', aiKeyFirst: '请输入 API key。该 key 只用于本次请求，不会保存。',
  aiGenerating: '正在生成策略…', aiGeneratingBody: '正在提取论文文本、请求精简蓝图，并在本地生成和保存代码。',
  aiSaved: '策略已保存', aiPaperIdea: '论文思路', aiProxyWarning: 'Freqtrade 代理实现限制', aiTokenReduction: 'Token 节省',
  aiOpenLibrary: '在策略库中打开', aiFailed: '生成失败', aiRetryHint: '可尝试上传 TXT/Markdown 摘要、降低输入上限，或换用其他支持的模型。',
  doctorOverall: '综合', doctorSignal: '信号逻辑', doctorRisk: '风险控制', doctorOverfit: '过拟合安全', doctorData: '数据易用性', doctorFit: 'Freqtrade 适配', doctorBeginner: '新手友好',
  doctorReviewFirst: '请先检查', doctorNoWarning: '未发现主要模板层面问题。使用前仍需预览并回测。',
  doctorReadiness: '回测准备检查', doctorLiteratureOrganization: '文献策略分类', doctorShowLiterature: '只看文献模板',
});

if(typeof LAYER_SECTION_IDS !== 'undefined' && !LAYER_SECTION_IDS.includes('system-diagnostics-panel')) LAYER_SECTION_IDS.push('system-diagnostics-panel');
if(typeof LAYER_MAP !== 'undefined') LAYER_MAP.diagnostics = ['system-diagnostics-panel'];
const _layerIntroCopy_v1215 = layerIntroCopy;
layerIntroCopy = function(layer){
  if(layer === 'diagnostics') return state.lang === 'zh'
    ? ['系统检查', '检查 Olares 运行环境和策略模板。', '快速检查验证存储和依赖；完整审计会渲染并编译全部模板，但不会执行回测。']
    : ['System Check', 'Verify the Olares runtime and every strategy template.', 'The quick check validates storage and dependencies. The full audit renders and compiles all templates without running backtests.'];
  return _layerIntroCopy_v1215(layer);
};

const EASY_CARD_COPY = {
  simple:{en:['Starter','Cautious trend strategy','EMA trend + simple confirmation + standard exit'],zh:['入门','稳妥趋势策略','EMA 趋势 + 简单确认 + 普通退出']},
  defensive:{en:['Defensive','Fewer trades and false triggers','Higher-timeframe bias + strict confirmation + volatility guard'],zh:['防守','少交易、防误触发','高周期方向 + 严格确认 + 波动保护']},
  breakout:{en:['Breakout','Channel breakout strategy','Breakout + volume + trend filter'],zh:['突破','通道突破策略','突破 + 成交量 + 趋势过滤']},
  recovery:{en:['Pullback','RSI recovery strategy','Oversold recovery + range filter + ATR protection'],zh:['回撤','RSI 修复策略','超跌修复 + 区间过滤 + ATR 保护']},
  hybrid:{en:['Hybrid','Multi-signal scoring strategy','Primary + secondary signal + weighted score'],zh:['混合','多信号打分策略','主信号 + 副信号 + 加权打分']},
  liquidity:{en:['Protected','Liquidity-protected strategy','Signal quality + spread guard + cautious sizing'],zh:['保护','流动性保护策略','信号质量 + 价差保护 + 谨慎仓位']},
};
const COACH_COPY = {
  trend_safe:{en:['Goal','Cautious trend','Fewer false triggers; beginner-friendly'],zh:['我想要','稳妥趋势','少误触发，适合新手']},
  breakout_active:{en:['Goal','Breakout opportunities','More responsive with safeguards'],zh:['我想要','突破机会','更敏感，但有保护']},
  dip_recovery:{en:['Goal','Pullback recovery','Buy weakness turning stronger'],zh:['我想要','回撤修复','买弱转强']},
  hybrid_guarded:{en:['Goal','Multi-signal scoring','Complex but controlled'],zh:['我想要','多信号打分','复杂但可控']},
};
const EASY_OPTION_COPY = {
  'puzzle-easy-base': {
    trend:{en:'Trend following',zh:'趋势跟随'},breakout:{en:'Breakout',zh:'突破'},recovery:{en:'Pullback recovery',zh:'回撤修复'},momentum:{en:'Momentum',zh:'动量'},hybrid:{en:'Multi-signal score',zh:'多信号打分'},mean_reversion:{en:'Mean reversion',zh:'均值回归'},squeeze_breakout:{en:'Squeeze breakout',zh:'挤压突破'},pairs_reversion:{en:'Pairs reversion',zh:'配对回归'},carry_trend:{en:'Carry + trend',zh:'Carry + 趋势'}
  },
  'puzzle-easy-risk': {cautious:{en:'Cautious',zh:'谨慎'},balanced:{en:'Balanced',zh:'平衡'},exploratory:{en:'Exploratory',zh:'探索'}},
  'puzzle-easy-confirm': {light:{en:'Light confirmation',zh:'少确认'},balanced:{en:'Balanced confirmation',zh:'平衡确认'},strict:{en:'Strict confirmation',zh:'严格确认'},volatility_aware:{en:'Volatility-aware',zh:'波动过滤'}},
};
function setLabelPrefix(selector, value){
  const control = document.querySelector(selector);
  const label = control?.closest('label');
  if(!label) return;
  const node = Array.from(label.childNodes).find(x => x.nodeType === Node.TEXT_NODE && x.nodeValue.trim());
  if(node) node.nodeValue = value + "\n              ";
}
function applyReleaseLocalization(){
  document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en-US';
  qsa('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === state.lang));
  const nav = document.querySelector('[data-layer-nav="diagnostics"]'); if(nav) nav.textContent = t('diagnosticsNav');
  if(qs('entry-diagnostics-title')) qs('entry-diagnostics-title').textContent = t('diagnosticsNav');
  if(qs('entry-diagnostics-body')) qs('entry-diagnostics-body').textContent = state.lang === 'zh' ? '检查存储、依赖、模板和生成代码的编译状态。' : 'Verify storage, dependencies, templates, and generated-code compilation.';
  if(qs('entry-diagnostics-btn')) qs('entry-diagnostics-btn').textContent = state.lang === 'zh' ? '打开系统检查' : 'Open System Check';
  if(qs('diagnostics-title')) qs('diagnostics-title').textContent = t('diagnosticsTitle');
  if(qs('diagnostics-subtitle')) qs('diagnostics-subtitle').textContent = t('diagnosticsSubtitle');
  if(qs('diagnostics-quick-btn')) qs('diagnostics-quick-btn').textContent = t('diagnosticsQuick');
  if(qs('diagnostics-deep-btn')) qs('diagnostics-deep-btn').textContent = t('diagnosticsDeep');
  const summary = qs('diagnostics-summary'); if(summary && !summary.dataset.hasResult) summary.textContent = t('diagnosticsIdle');

  qsa('.puzzle-block[data-slot][data-value]').forEach(block => {
    const item = PUZZLE_LABELS?.[block.dataset.slot]?.[block.dataset.value];
    if(item) block.textContent = item[state.lang] || item.en || item.zh || block.dataset.value;
  });
  qsa('[data-easy-preset]').forEach(card => {
    const copy = EASY_CARD_COPY[card.dataset.easyPreset]?.[state.lang]; if(!copy) return;
    const span=card.querySelector('span'), strong=card.querySelector('strong'), em=card.querySelector('em');
    if(span) span.textContent=copy[0]; if(strong) strong.textContent=copy[1]; if(em) em.textContent=copy[2];
  });
  qsa('[data-coach-preset]').forEach(card => {
    const copy = COACH_COPY[card.dataset.coachPreset]?.[state.lang]; if(!copy) return;
    const span=card.querySelector('span'), strong=card.querySelector('strong'), em=card.querySelector('em');
    if(span) span.textContent=copy[0]; if(strong) strong.textContent=copy[1]; if(em) em.textContent=copy[2];
  });
  Object.entries(EASY_OPTION_COPY).forEach(([id, mapping]) => {
    const select=qs(id); if(!select) return;
    Array.from(select.options).forEach(option => { const copy=mapping[option.value]; if(copy) option.textContent=copy[state.lang] || copy.en; });
  });

  if(qs('entry-ai-paper-title')) qs('entry-ai-paper-title').textContent = 'AI Paper Lab';
  if(qs('entry-ai-paper-body')) qs('entry-ai-paper-body').textContent = state.lang === 'zh' ? '上传论文，选择 OpenAI、DeepSeek、Kimi、Claude、Gemini、OpenRouter 或兼容 API 来生成策略草稿。' : 'Upload a paper and choose OpenAI, DeepSeek, Kimi, Claude, Gemini, OpenRouter, or a compatible API to generate a strategy draft.';
  if(qs('entry-ai-paper-btn')) qs('entry-ai-paper-btn').textContent = state.lang === 'zh' ? '打开 AI Paper Lab' : 'Open AI Paper Lab';
  if(qs('ai-paper-title')) qs('ai-paper-title').textContent = state.lang === 'zh' ? '上传论文 → 提取策略蓝图 → 保存新策略' : 'Upload paper → extract strategy blueprint → save as new strategy';
  if(qs('ai-paper-subtitle')) qs('ai-paper-subtitle').textContent = state.lang === 'zh' ? '使用你自己的服务商 API key。Key 只用于本次请求且不会保存。系统在本地压缩论文、让模型返回精简 JSON 蓝图，再在本地生成 Python，以减少 token。' : 'Use your own provider API key. It is used only for this request and is not saved. The app compresses the paper locally, requests compact JSON, and generates Python locally to reduce token usage.';
  setLabelPrefix('#ai-paper-provider', state.lang === 'zh' ? '服务商' : 'Provider');
  setLabelPrefix('#ai-paper-model', state.lang === 'zh' ? '模型' : 'Model');
  setLabelPrefix('#ai-paper-key', state.lang === 'zh' ? 'API key' : 'API key');
  setLabelPrefix('#ai-paper-base-url', state.lang === 'zh' ? '自定义 Base URL（仅 Custom）' : 'Custom base URL (Custom only)');
  setLabelPrefix('#ai-paper-file', state.lang === 'zh' ? '上传论文（PDF/TXT/MD）' : 'Upload paper (PDF/TXT/MD)');
  setLabelPrefix('#ai-paper-max-input', state.lang === 'zh' ? '发送的最大字符数' : 'Max input characters sent');
  setLabelPrefix('#ai-paper-max-output', state.lang === 'zh' ? '最大输出 token' : 'Max output tokens');
  if(qs('ai-paper-submit-btn') && !qs('ai-paper-submit-btn').disabled) qs('ai-paper-submit-btn').textContent = state.lang === 'zh' ? '生成并保存策略' : 'Generate and save strategy';
  aiPaperProviderDefaults(false);

  if(qs('doctor-family-grid')?.previousElementSibling?.querySelector('h3')) qs('doctor-family-grid').previousElementSibling.querySelector('h3').textContent = t('doctorLiteratureOrganization');
  if(qs('doctor-literature-only-btn')) qs('doctor-literature-only-btn').textContent = t('doctorShowLiterature');
}
const _applyI18N_v1215 = applyI18N;
applyI18N = function(){ _applyI18N_v1215(); applyReleaseLocalization(); renderStrategyDoctorPanel(); };

function renderDoctorScores(tpl){
  const box=qs('doctor-score-grid'); if(!box || !tpl) return;
  const scores=doctorScoresForTemplate(tpl);
  box.innerHTML=[doctorBadge(t('doctorOverall'),scores.overall),doctorBadge(t('doctorSignal'),scores.signal),doctorBadge(t('doctorRisk'),scores.risk),doctorBadge(t('doctorOverfit'),scores.overfit),doctorBadge(t('doctorData'),scores.data),doctorBadge(t('doctorFit'),scores.freqtrade),doctorBadge(t('doctorBeginner'),scores.beginner)].join('');
}
function renderDoctorSelectedCard(tpl){
  const box=qs('doctor-selected-card'); if(!box || !tpl) return;
  const scores=doctorScoresForTemplate(tpl), warnings=doctorWarningsForTemplate(tpl,scores);
  const replication=(tpl.workflow_stage||'').includes('replication') || (tpl.key||'').includes('lead_lag_calendar');
  const rep=replication ? (state.lang==='zh'?'论文复刻 / 特殊数据':'paper replication / special data') : (state.lang==='zh'?'研究代理':'research proxy');
  box.innerHTML=`<h3>${escapeHTML(tl(tpl.label))}</h3><p>${escapeHTML(tl(tpl.description))}</p>
    <div class="doctor-meta-row"><span>${escapeHTML(strategyModeLabel(tpl.strategy_mode))}</span><span>${escapeHTML(doctorFamilyForTemplate(tpl))}</span><span>${escapeHTML(rep)}</span></div>
    <ul class="doctor-check-list"><li>${escapeHTML(state.lang==='zh'?'数据要求':'Data requirement')}: ${escapeHTML((tpl.tags||[]).includes('tick_data')?'tick/event data':'OHLCV or documented extra data')}</li><li>${escapeHTML(state.lang==='zh'?'字段数量':'Field count')}: ${(tpl.fields||[]).length}</li><li>${escapeHTML(state.lang==='zh'?'风险层':'Risk layers')}: ${escapeHTML(tl(tpl.risk_logic) || '-')}</li></ul>
    ${warnings.length?`<div class="doctor-warning"><strong>${escapeHTML(t('doctorReviewFirst'))}</strong><ul>${warnings.map(w=>`<li>${escapeHTML(w)}</li>`).join('')}</ul></div>`:`<div class="doctor-ok">${escapeHTML(t('doctorNoWarning'))}</div>`}`;
}
function renderDoctorReadinessCard(tpl){
  const box=qs('doctor-readiness-card'); if(!box || !tpl) return;
  const scores=doctorScoresForTemplate(tpl), fieldCount=(tpl.fields||[]).length;
  const special=scores.data<60?(state.lang==='zh'?'可能需要外部字段或非标准数据。':'Likely needs external columns or non-standard data.'):(state.lang==='zh'?'主要使用常规 OHLCV 数据。':'Mostly ordinary OHLCV-style data.');
  const steps=state.lang==='zh' ? [
    ['预览代码',true,'保存前先使用预览。'],['编译检查',true,'生成后仍需检查参数改动。'],['先做小规模回测',true,'优化前先运行短期 sanity backtest。'],['避免过拟合',scores.overfit>=55,fieldCount>16?'参数较多，使用保守范围。':'参数数量可控。'],['数据假设',scores.data>=60,special],['手动导入 Freqtrade',true,'下载 .py 或导出包后上传到对应 Freqtrade 应用。']
  ] : [
    ['Preview code',true,'Use Preview before saving.'],['Compile check',true,'Verify again after parameter changes.'],['Small backtest first',true,'Run a short sanity backtest before optimization.'],['Avoid overfitting',scores.overfit>=55,fieldCount>16?'Many parameters: use conservative ranges.':'Parameter count is manageable.'],['Data assumption',scores.data>=60,special],['Manual Freqtrade import',true,'Download the .py file or export package, then upload it to the proper Freqtrade app.']
  ];
  box.innerHTML=`<h3>${escapeHTML(t('doctorReadiness'))}</h3><p>${escapeHTML(special)}</p><ul class="doctor-check-list">${steps.map(x=>`<li><strong>${x[1]?'✓':'!'}</strong> ${escapeHTML(x[0])} — <span>${escapeHTML(x[2])}</span></li>`).join('')}</ul><details class="metadata-json"><summary>${state.lang==='zh'?'模板字段':'Template fields'} (${fieldCount})</summary><pre>${escapeHTML((tpl.fields||[]).map(f=>`${f.name}: ${tl(f.label)}`).join('\n'))}</pre></details>`;
}
function renderDoctorFamilies(){
  const box=qs('doctor-family-grid'); if(!box || !state.templates?.length) return;
  const grouped={}; state.templates.filter(x=>x.strategy_mode==='literature').forEach(tpl=>{ const fam=doctorFamilyForTemplate(tpl); (grouped[fam] ||= []).push(tpl); });
  const order=['Momentum','Reversal','Breakout','Volatility','Liquidity / Microstructure','Carry / Futures','Hybrid / Adaptive','Other'];
  box.innerHTML=order.filter(f=>grouped[f]?.length).map(fam=>`<article class="doctor-family-card"><div><strong>${escapeHTML(fam)}</strong><span>${grouped[fam].length} ${state.lang==='zh'?'个策略':'strategies'}</span></div>${grouped[fam].slice(0,6).map(tpl=>`<button type="button" data-doctor-template="${escapeHTML(tpl.key)}"><span>${escapeHTML(tl(tpl.label))}</span><em>${escapeHTML((tpl.workflow_stage||'').includes('replication')||(tpl.key||'').includes('lead_lag_calendar')?(state.lang==='zh'?'论文复刻 / 特殊数据':'paper replication / special data'):(state.lang==='zh'?'研究代理':'research proxy'))}</em></button>`).join('')}${grouped[fam].length>6?`<p class="muted">+${grouped[fam].length-6} ${state.lang==='zh'?'更多':'more'}</p>`:''}</article>`).join('');
  box.querySelectorAll('[data-doctor-template]').forEach(btn=>btn.onclick=()=>{state.doctorSelectedKey=btn.dataset.doctorTemplate;renderStrategyDoctorPanel();});
}

async function runDiagnostics(deep=false){
  const summary=qs('diagnostics-summary'), grid=qs('diagnostics-grid'), quick=qs('diagnostics-quick-btn'), full=qs('diagnostics-deep-btn');
  if(summary){summary.dataset.hasResult='1';summary.textContent=t('diagnosticsRunning');summary.className='diagnostics-summary loading';}
  if(grid) grid.innerHTML=''; if(quick) quick.disabled=true; if(full) full.disabled=true;
  try{
    const data=await fetchJSON(`/api/system/diagnostics?deep=${deep?'true':'false'}`);
    if(summary){summary.textContent=`${data.ok?t('diagnosticsPassed'):t('diagnosticsNeedsReview')} · ${data.template_count} templates · v${data.app_version}`;summary.className=`diagnostics-summary ${data.ok?'ok':'warning'}`;}
    if(grid) grid.innerHTML=(data.checks||[]).map(item=>`<article class="diagnostic-card ${item.ok?'ok':item.level}"><strong>${item.ok?'✓':'!' } ${escapeHTML(item.key.replaceAll('_',' '))}</strong><p>${escapeHTML(item.detail||'')}</p></article>`).join('') + ((data.render_failures||[]).length?`<article class="diagnostic-card error"><strong>${state.lang==='zh'?'模板失败':'Template failures'}</strong><pre>${escapeHTML(JSON.stringify(data.render_failures,null,2))}</pre></article>`:'');
  }catch(error){ if(summary){summary.textContent=error.message||String(error);summary.className='diagnostics-summary error';} }
  finally{ if(quick) quick.disabled=false; if(full) full.disabled=false; }
}

async function submitAIPaperForm(ev){
  ev.preventDefault(); const form=qs('ai-paper-form'), btn=qs('ai-paper-submit-btn'), keyInput=qs('ai-paper-key'); if(!form)return;
  const file=qs('ai-paper-file')?.files?.[0];
  if(!file){renderAIPaperResult(`<div class="doctor-warning"><strong>${escapeHTML(t('aiUploadFirst'))}</strong></div>`);return;}
  if(!keyInput?.value?.trim()){renderAIPaperResult(`<div class="doctor-warning"><strong>${escapeHTML(t('aiKeyFirst'))}</strong></div>`);return;}
  const fd=new FormData(form), activeDir=(qs('active-output-dir')?.textContent||state.currentOutputDir||'').trim(); fd.set('output_dir',activeDir);
  renderAIPaperResult(`<div class="ai-paper-loading"><strong>${escapeHTML(t('aiGenerating'))}</strong><p>${escapeHTML(t('aiGeneratingBody'))}</p></div>`);
  if(btn){btn.disabled=true;btn.textContent=t('aiGenerating');}
  try{
    const response=await fetch('/api/ai-paper/generate',{method:'POST',body:fd}); let data; try{data=await response.json();}catch{data={detail:await response.text()};}
    if(!response.ok)throw new Error(data.detail||t('aiFailed')); await refreshStrategies(); const b=data.blueprint||{};
    renderAIPaperResult(`<div class="doctor-ok"><strong>${escapeHTML(t('aiSaved'))}:</strong> ${escapeHTML(data.filename||'')}</div><div class="ai-paper-blueprint-card"><h3>${escapeHTML(b.strategy_name||data.class_name||'AI Paper Strategy')}</h3><p>${escapeHTML(b.short_description||'')}</p><div class="doctor-meta-row"><span>${escapeHTML(data.provider_label||data.provider||'')}</span><span>${escapeHTML(data.model||'')}</span><span>${escapeHTML(b.family||'hybrid')}</span><span>${escapeHTML(b.timeframe||'15m')}</span><span>${escapeHTML(data.output_dir||'')}</span></div><h4>${escapeHTML(t('aiPaperIdea'))}</h4><p>${escapeHTML(b.paper_idea||'')}</p><h4>${escapeHTML(t('aiProxyWarning'))}</h4><p>${escapeHTML(b.freqtrade_proxy_warning||'')}</p><h4>${escapeHTML(t('aiTokenReduction'))}</h4><p>${Number(data.paper_chars_extracted||0).toLocaleString()} → ${Number(data.compact_chars_sent||0).toLocaleString()} characters</p>${(data.warnings||[]).length?`<ul class="doctor-check-list">${data.warnings.map(w=>`<li>${escapeHTML(w)}</li>`).join('')}</ul>`:''}<button type="button" class="primary" id="ai-paper-open-library-btn">${escapeHTML(t('aiOpenLibrary'))}</button></div>`);
    const open=qs('ai-paper-open-library-btn'); if(open)open.onclick=()=>showLayer('library',true);
  }catch(error){renderAIPaperResult(`<div class="doctor-warning"><strong>${escapeHTML(t('aiFailed'))}</strong><p>${escapeHTML(error.message||String(error))}</p><p class="muted">${escapeHTML(t('aiRetryHint'))}</p></div>`);}
  finally{if(keyInput)keyInput.value='';if(btn){btn.disabled=false;btn.textContent=state.lang==='zh'?'生成并保存策略':'Generate and save strategy';}}
}

const _bindLayeredNavigation_v1215=bindLayeredNavigation;
bindLayeredNavigation=function(){
  _bindLayeredNavigation_v1215();
  document.querySelectorAll('[data-entry-action="diagnostics"]').forEach(card=>card.onclick=()=>showLayer('diagnostics',true));
  const quick=qs('diagnostics-quick-btn'); if(quick)quick.onclick=()=>runDiagnostics(false);
  const full=qs('diagnostics-deep-btn'); if(full)full.onclick=()=>runDiagnostics(true);
  const form=qs('ai-paper-form'); if(form)form.onsubmit=submitAIPaperForm;
  const provider=qs('ai-paper-provider'); if(provider)provider.onchange=()=>aiPaperProviderDefaults(true);
  if(provider)provider.dispatchEvent(new Event('change'));
};

init();
