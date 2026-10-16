// This describes an explanatory model, never a backend execution result.
export const steps = [
  {
    name: ["文件读取", "Read files"],
    verb: "READ",
    type: "files → text",
    description: [
      "从获准访问的资料开始，保留每份文件的来源标识。",
      "Start with authorized materials and retain a source identifier for each file.",
    ],
    input: [
      "虚构样本：三份家庭资料摘录",
      "Fictional sample: three family-record excerpts",
    ],
    output: ["带来源的文本片段", "Text fragments with source references"],
    sample: [
      "note-1988.txt →「1988 年搬入新家」",
      "note-1988.txt → “Moved into a new home in 1988”",
    ],
    boundary: [
      "仅解释数据入口；本页面不读取你的文件。",
      "Explains the input boundary only. This page does not read your files.",
    ],
  },
  {
    name: ["信息提取", "Extract information"],
    verb: "EXTRACT",
    type: "text → records",
    description: [
      "将日期、事件和来源组织成结构化条目，保留尚不确定的信息。",
      "Organize dates, events and sources into structured records, preserving uncertainty.",
    ],
    input: ["文本片段与来源标识", "Text fragments and source identifiers"],
    output: ["日期、事件、依据字段", "Date, event and evidence fields"],
    sample: [
      "{ year: 1988, event: 搬家, source: note-1988 }",
      "{ year: 1988, event: moving, source: note-1988 }",
    ],
    boundary: [
      "通用 PDF / OCR 需要适用的解析能力；此处不表示已实现。",
      "General PDF / OCR requires suitable parsers; this illustration does not claim they are implemented.",
    ],
  },
  {
    name: ["智能分类", "Classify records"],
    verb: "CLASSIFY",
    type: "records → categories",
    description: [
      "按规则或配置的模型提出类别，区分分类建议与已核实事实。",
      "Suggest categories using rules or a configured model; keep suggestions separate from verified facts.",
    ],
    input: ["事件条目与类别定义", "Event records and a category definition"],
    output: ["带候选类别的条目", "Records with candidate categories"],
    sample: ["搬家 → 生活变迁 · 待核实", "Moving → Life changes · To verify"],
    boundary: [
      "语义分类是概念步骤，需要模型、配置与授权，不在网页调用 AI。",
      "Semantic classification is conceptual and needs a model, configuration and authorization. This page calls no AI.",
    ],
  },
  {
    name: ["时间整理", "Arrange in time"],
    verb: "ORDER",
    type: "categories → timeline",
    description: [
      "按明确日期排列；缺少日期的条目单独保留，不补写未知时间。",
      "Order records by known dates. Keep undated items separate rather than inventing dates.",
    ],
    input: ["分类条目与日期字段", "Categorized records and date fields"],
    output: [
      "时间顺序与待核实列表",
      "Chronological order and a verification list",
    ],
    sample: [
      "1988 搬家 → 2003 毕业 → 2020 团聚",
      "1988 Moving → 2003 Graduation → 2020 Reunion",
    ],
    boundary: [
      "示意值全部为虚构数据，不是实际家庭历史。",
      "All illustrative values are fictional, not actual family history.",
    ],
  },
  {
    name: ["结果输出", "Output results"],
    verb: "OUTPUT",
    type: "timeline → artifact",
    description: [
      "形成可阅读的时间线，同时保留来源、参数与执行记录的关联。",
      "Produce a readable timeline while retaining references to sources, parameters and run records.",
    ],
    input: ["时间线与来源引用", "Timeline and source references"],
    output: [
      "可阅读结果与追溯信息",
      "Readable result and traceability information",
    ],
    sample: [
      "时间线 + 来源引用 + 待核实条目",
      "Timeline + source references + items to verify",
    ],
    boundary: [
      "这是说明终点，不代表执行成功或文件已保存。",
      "This is the end of the explanation, not a successful execution or a saved file.",
    ],
  },
];
export const architecture = [
  {
    number: "01",
    name: ["模型接入", "Model access"],
    status: ["需配置与授权", "Configuration & permission"],
    text: [
      "通过 AI 总控连接已登记模型；远程服务会接收获准发送的请求。",
      "Connect registered models through AI control. Remote providers receive authorized requests.",
    ],
    source: "frontend/local_ai_workbench/runtime/workbench_workflows_v0002.cjs",
  },
  {
    number: "02",
    name: ["工具与资产", "Tools & assets"],
    status: ["已有管理框架", "Management framework exists"],
    text: [
      "扫描、加载和卸载能力；适配器目录保留真实来源、版本及契约引用。",
      "Scan, load and unload capabilities. The adapter catalog preserves real sources, versions and contracts.",
    ],
    source:
      "frontend/local_ai_workbench/runtime/workbench_adapter_catalog_v0001.cjs",
  },
  {
    number: "03",
    name: ["能力编排", "Capability composition"],
    status: ["内置流程已有实测", "Built-in flow demonstrated"],
    text: [
      "节点、端口和参数构成工作流；本地校验与可选 AI 分析分离。",
      "Nodes, ports and parameters form workflows. Local validation is separate from optional AI analysis.",
    ],
    source: "frontend/local_ai_workbench/workspace/workflow_graph_v0001.mjs",
  },
  {
    number: "04",
    name: ["任务执行", "Task execution"],
    status: ["依赖执行与取消接口", "Dependency execution & cancellation"],
    text: [
      "按依赖传递数据，记录节点状态、输入输出与错误；支持取消请求。",
      "Pass data by dependency and record node state, inputs, outputs and errors; support cancellation requests.",
    ],
    source: "frontend/local_ai_workbench/runtime/workbench_workflows_v0002.cjs",
  },
  {
    number: "05",
    name: ["规范与权限", "Governance & permissions"],
    status: ["受管理入口约束", "Managed-entry constraints"],
    text: [
      "管理入口检查规范与授权。加载能力不授予新的执行权限，也不保证所有旧工具都已覆盖。",
      "Managed entry points check rules and authorization. Loading grants no new execution rights and does not imply coverage of every legacy tool.",
    ],
    source:
      "frontend/local_ai_workbench/runtime/workbench_governance_v0002.cjs",
  },
  {
    number: "06",
    name: ["数据与追溯", "Data & traceability"],
    status: ["版本与运行记录", "Versions & run records"],
    text: [
      "持久化工作流与运行记录，用版本、来源哈希及运行标识连接结果和过程。",
      "Persist workflows and runs; connect outputs to their process using versions, source hashes and run IDs.",
    ],
    source: "frontend/local_ai_workbench/runtime/workbench_workflows_v0002.cjs",
  },
];
export function nextStep(index, delta) {
  return Math.max(0, Math.min(steps.length - 1, index + delta));
}
export const t = (zh, en) =>
  `<span class="t zh" lang="zh-CN">${zh}</span><span class="t en" lang="en">${en}</span>`;
export function panelContent(index) {
  const step = steps[index];
  return `<div class="node-panel-heading"><span class="mono">0${index + 1} / ${step.verb}</span><h3>${t(...step.name)}</h3></div><p>${t(...step.description)}</p><dl class="node-contract"><div><dt>${t("示意输入", "Illustrative input")}</dt><dd>${t(...step.input)}</dd></div><div><dt>${t("示意输出", "Illustrative output")}</dt><dd>${t(...step.output)}</dd></div></dl><div class="sample-record"><span class="mono">${t("虚构样本", "FICTIONAL SAMPLE")}</span><p>${t(...step.sample)}</p></div><p class="node-boundary">${t(...step.boundary)}</p>`;
}
