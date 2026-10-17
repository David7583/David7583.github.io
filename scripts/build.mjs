import { featureProduct, productPage } from "./workbench.mjs";
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
const imageSizes = JSON.parse(readFileSync("scripts/image-sizes.json", "utf8"));

// Static HTML is the deliverable. This dependency-free generator keeps shared
// navigation, bilingual content and project pages consistent.
const t = (zh, en) =>
  `<span class="t zh" lang="zh-CN">${zh}</span><span class="t en" lang="en">${en}</span>`;
const gh = "https://github.com/David7583/";
const projects = [
  {
    id: "workbench",
    number: "01",
    name: "Local AI Workbench",
    subtitle: t(
      "让能力组合，让执行有据。",
      "Organize capabilities.<br>Make execution inspectable.",
    ),
    category: "AI SYSTEMS / DESKTOP",
    status: t("可运行源码 · 持续开发", "Runnable source · In development"),
    intro: t(
      "从对话走向任务。一个组织工具、资源与执行规则的本地 AI 工作环境。",
      "From conversation to tasks. A local AI environment for organizing tools, resources and execution rules.",
    ),
    image: "workbench-flow",
    alt: [
      "工作台能力编排界面，五个已完成节点与运行日志",
      "Workbench workflow canvas with five completed nodes and run logs",
    ],
    caption: t(
      "真实运行截图 · 虚构资料样本 · 内置节点执行",
      "Actual run · Fictional sample data · Built-in node execution",
    ),
    repo: "baigong-workbench-frontend",
    tags: "Electron / JavaScript / Python",
    question: t(
      "AI 能调用工具之后，谁决定它可以做什么？",
      "Once AI can use tools, who decides what it may do?",
    ),
    problem: t(
      "把工具放进聊天框还不够。能力需要被发现、连接和配置；执行需要受权限约束，结果需要能够追溯。",
      "Putting tools inside a chat window is only a start. Capabilities need discovery, connections and configuration; execution needs permission boundaries and inspectable results.",
    ),
    approach: t(
      "保留资源、工具、适配器和规范中心等管理框架。节点定义、工作流实例和运行状态分离；用明确的端口和参数契约组织数据流。",
      "Retain a management framework for resources, tools, adapters and governance. Separate capability definitions, workflow instances and run state; organize data flow through explicit ports and parameter contracts.",
    ),
    evidence: t(
      "展示的五节点流程使用虚构家庭资料，依次完成数据输入、年份筛选、字段提取、文本模板和结果输出。画面来自实际运行，不代表通用 PDF 或 OCR 处理已经实现。",
      "The five-node example uses fictional family records: data input, year filtering, field extraction, a text template and result output. This is an actual run, not evidence of general PDF or OCR support.",
    ),
    scope: t(
      "公开源码默认只加载聊天，保留基础管理框架。Windows x64 已有启动验证；其他平台未验证。外部工具与模型需自行配置，远程服务会接收获准发送的请求。",
      "The public source loads chat by default and retains the management framework. Startup has been validated on Windows x64; other platforms are unverified. External tools and models need configuration. Remote services receive requests authorized by the user.",
    ),
    future: t(
      "通用 AI 编排分析、专业插件与更多平台仍需分别验证。下方架构示意用于解释设计，不是功能运行状态。",
      "General AI workflow analysis, specialized plugins and additional platforms need separate validation. The architecture illustration below explains the design, not live execution state.",
    ),
    related: [
      ["baigong/tree/workbench-backend", "配套后端 / Companion backend"],
    ],
  },
  {
    id: "sc-tse",
    number: "02",
    name: "SC-TSE",
    subtitle: t(
      "把空间约束，变成可计算的证据。",
      "Spatial constraints,<br>made computable.",
    ),
    category: "SPATIAL COMPUTATION",
    status: t("Integration MVP", "Integration MVP"),
    intro: t(
      "面向场地与体块的确定性计算：输入结构化约束，返回校验结果与违规依据。",
      "Deterministic computation for sites and blocks. Structured constraints in; validation and violation evidence out.",
    ),
    image: "sc-tse-factory-layout",
    alt: [
      "SC-TSE 场地布局研发输出，显示矩形体块与约束检查",
      "SC-TSE research layout output showing rectangular blocks and constraint checks",
    ],
    caption: t(
      "研发输出 · 合成验证数据 · 不等同于公开 MVP 全部能力",
      "Research output · Synthetic validation data · Broader than the public MVP",
    ),
    repo: "sc-tse",
    tags: "Python / JSON contracts / SVG · DXF",
    question: t(
      "一个布局“看起来可行”，是否真的满足约束？",
      "A layout looks feasible. Does it satisfy the constraints?",
    ),
    problem: t(
      "几何结果需要与计算过程和约束依据同时呈现。只展示最终图形，无法解释哪里通过、哪里受阻，以及为什么。",
      "Geometry needs to be accompanied by its computation and constraint evidence. A final drawing alone cannot explain what passed, what failed or why.",
    ),
    approach: t(
      "将结构化场地、体块和约束接入六节点计算主链，返回运行状态、关键指标与具体违规证据。",
      "Connect structured sites, blocks and constraints to a six-node computation chain, returning run state, key metrics and specific violation evidence.",
    ),
    evidence: t(
      "公开 Integration MVP 支持固定矩形体块的编辑、重新计算和校验。下方地形、剖面、挖填方和自动布局图像来自更广泛的研发实验。",
      "The public integration MVP supports editing, recalculating and validating fixed rectangular blocks. Terrain, sections, earthwork and automatic-layout images below come from broader research experiments.",
    ),
    scope: t(
      "不要把研发图库理解为公开仓库已包含的完整产品。自动布局、地形计算和空间内核界面应分别检查其实现与交付范围。",
      "The research gallery is not a feature list for the public repository. Automatic layout, terrain computation and spatial-kernel interfaces have separate implementation and delivery scopes.",
    ),
    future: t(
      "更广泛的工程计算方向通过原型验证；公开版本以仓库说明和测试为准。",
      "Broader engineering directions are explored through prototypes. The repository documentation and tests define the public version.",
    ),
    related: [],
  },
  {
    id: "yuantu",
    number: "03",
    name: "Yuantu / 源图",
    subtitle: t(
      "每一条结论，都有回到来源的路。",
      "Knowledge with<br>a route back to its source.",
    ),
    category: "KNOWLEDGE INFRASTRUCTURE",
    status: t("研究原型 · 理解层", "Research prototype · Understanding layer"),
    intro: t(
      "为非结构化文本建立可追溯知识层，让定位、语义、事实与关系各司其职。",
      "A traceable knowledge layer for unstructured text, separating location, semantics, facts and relationships.",
    ),
    image: "yuantu-local-ai-workbench-prototype",
    alt: [
      "相关知识工作台原型，展示数据库和任务状态",
      "Related knowledge-workbench prototype showing databases and task status",
    ],
    caption: t(
      "相关观察界面原型 · 并非 Yuantu 仓库发布的 UI",
      "Related observability prototype · Not the UI shipped by Yuantu",
    ),
    repo: "yuantu",
    tags: "SQLite / ChromaDB / DuckDB / Neo4j",
    question: t(
      "模型给出了答案，原始证据在哪里？",
      "The model has an answer. Where is the original evidence?",
    ),
    problem: t(
      "长期累积的政策文档与访谈记录难以检索。让模型直接阅读材料，容易把语义相似当作事实依据。",
      "Accumulated policy documents and interview records are difficult to retrieve. Direct model retrieval can mistake semantic similarity for factual support.",
    ),
    approach: t(
      "保留不可变原始材料。SQLite 定位文本，ChromaDB 负责语义检索，DuckDB 查询事实，Neo4j 表达关系；多条检索路径回到相同的原始依据。",
      "Preserve immutable sources. SQLite locates text, ChromaDB handles semantic retrieval, DuckDB queries facts and Neo4j represents relationships. Multiple retrieval paths lead back to the same evidence.",
    ),
    evidence: t(
      "公开仓库完成四数据库理解层。截图属于相关工作台观察原型，展示这一研究方向的可观察性设计，并不是 Yuantu 的正式交付界面。",
      "The public repository completes the four-database understanding layer. The screenshot is a related observability prototype, illustrating the research direction rather than a shipped Yuantu interface.",
    ),
    scope: t(
      "行动层仍在开发。混合检索不等于事实自动成立；结论仍需要检查来源与适用条件。",
      "The action layer remains in development. Hybrid retrieval does not establish facts automatically; sources and applicable conditions still need review.",
    ),
    future: t(
      "将理解层与受控行动衔接，同时继续保留来源和执行证据。",
      "Connect understanding to controlled action while preserving source and execution evidence.",
    ),
    related: [],
  },
  {
    id: "baigong",
    number: "04",
    name: "Baigong / 百工",
    subtitle: t(
      "从数据到行动，再回到证据。",
      "Data to action.<br>Action to evidence.",
    ),
    category: "DATA & EXECUTION GOVERNANCE",
    status: t("可安装治理链路 Demo", "Installable governance demo"),
    intro: t(
      "一条可追溯的 Data–Action–Data 链路，记录来源、版本、授权和失败信息。",
      "A traceable Data–Action–Data chain recording sources, versions, authorization and failures.",
    ),
    image: "baigong-action-chat-prototype",
    alt: [
      "相关 Action Chat 原型，展示只读查询与运行详情",
      "Related Action Chat prototype showing read-only queries and run details",
    ],
    caption: t(
      "相关交互原型 · 并非 Baigong 发布包的正式界面",
      "Related interaction prototype · Not the interface shipped in Baigong",
    ),
    repo: "baigong",
    tags: "Python / Provenance / Run manifests",
    question: t(
      "一次 AI 操作结束后，能否还原发生了什么？",
      "After an AI action, can we reconstruct what happened?",
    ),
    problem: t(
      "输入版本不明、写入未经确认、错误没有记录，都会让自动化难以检查和复现。",
      "Unknown input versions, unconfirmed writes and unrecorded errors make automation difficult to inspect and reproduce.",
    ),
    approach: t(
      "用稳定对象 ID、来源路径和内容哈希标识输入；用 run ID、版本和完成清单标识执行；对数据库写入和真实模型调用设置显式确认门。",
      "Identify inputs with stable object IDs, source paths and content hashes. Identify execution with run IDs, versions and completion manifests. Gate database writes and real model calls behind explicit confirmation.",
    ),
    evidence: t(
      "公开主分支提供可独立安装、测试的治理流水线 Demo。它与 Workbench 的专用后端分支有关联，但不是同一个交付范围。",
      "The public main branch provides an independently installable and testable governance-pipeline demo. It is related to the dedicated Workbench backend branch, but the delivery scopes differ.",
    ),
    scope: t(
      "这是治理机制的验证链路，不是通用 Agent 产品。相关 Action Chat 原型只用于说明交互方向。",
      "This is a validation chain for governance mechanisms, not a general-purpose agent product. The related Action Chat prototype illustrates the interaction direction only.",
    ),
    future: t(
      "以标准化输入输出和运行记录，为后续能力组合提供基础。",
      "Use standardized inputs, outputs and run records as a foundation for future capability composition.",
    ),
    related: [],
  },
];
function head(title, desc, prefix = "") {
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${title} — Ruixin Yang</title><meta name="description" content="${desc}"><meta property="og:title" content="${title} — Ruixin Yang"><meta property="og:description" content="${desc}"><meta property="og:type" content="website"><meta property="og:image" content="https://david7583.github.io/assets/images/workbench-flow.webp"><link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${prefix}assets/styles.css"><script>${readFileSync("assets/language.js", "utf8")}</script><script defer src="${prefix}assets/app.js"></script></head><body><a class="skip" href="#main">${t("跳到正文", "Skip to content")}</a>`;
}
function header(prefix = "") {
  return `<header class="site-header"><a class="identity" href="${prefix}index.html"><span class="monogram" aria-hidden="true">r<span>y</span><i></i></span><span>Ruixin Yang<span class="identity-sub">ENGINEERING PORTFOLIO</span></span></a><nav aria-label="主要导航" data-label-zh="主要导航" data-label-en="Main navigation"><a href="${prefix}index.html#work">${t("项目", "Work")}</a><a href="${prefix}index.html#about">${t("关于", "About")}</a><a href="${prefix}resume.html">${t("简历", "Résumé")} <span aria-hidden="true">↗</span></a><a class="header-github" href="${gh.slice(0, -1)}">GitHub <span aria-hidden="true">↗</span></a><button class="language" type="button" aria-label="Switch to English">EN</button></nav></header>`;
}
function footer(prefix = "") {
  return `<footer><a href="${prefix}index.html">Ruixin Yang <span aria-hidden="true">↗</span></a><p>${t("在约束中构建，在证据中迭代。", "Built with constraints. Refined through evidence.")}</p><span class="mono">SHANGHAI / ${t("上海", "CHINA")}</span></footer><dialog class="lightbox" aria-labelledby="lightbox-caption"><button class="close-lightbox" type="button">${t("关闭", "Close")} ×</button><img alt=""><p id="lightbox-caption"></p><a class="text-link original-image" href="#main" target="_blank" rel="noopener">${t("新窗口打开原图", "Open full-resolution image")} ↗</a></dialog></body></html>`;
}
function image(p, prefix = "", priority = false) {
  return `<figure><a class="image-link" href="${prefix}assets/images/${p.image}.webp" data-zoom><img src="${prefix}assets/images/${p.image}.webp" srcset="${prefix}assets/images/${p.image}-800.webp 800w, ${prefix}assets/images/${p.image}.webp ${imageSizes[p.image][0]}w" sizes="${!prefix && !priority ? "(max-width: 700px) calc(100vw - 44px), 650px" : "(max-width: 700px) calc(100vw - 44px), (max-width: 1000px) 90vw, 1200px"}" width="${imageSizes[p.image][0]}" height="${imageSizes[p.image][1]}" alt="${p.alt[0]}" data-alt-en="${p.alt[1]}" data-alt-zh="${p.alt[0]}" ${priority ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"><span class="zoom-mark" aria-hidden="true">↗</span></a><figcaption>${p.caption}</figcaption></figure>`;
}
function buttons(p, prefix = "") {
  return `<div class="actions"><a class="button primary" href="${prefix}projects/${p.id}.html">${t("查看项目", "Explore project")} <span aria-hidden="true">↗</span></a><a class="text-link" href="${gh + p.repo}">${t("源码", "Source")} / GitHub ↗</a></div>`;
}
function diagram() {
  return `<div class="system-figure" aria-hidden="true"><svg viewBox="0 0 520 440" fill="none"><defs><pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" stroke="#bbbfbb" stroke-width=".5"/></pattern></defs><rect width="520" height="440" fill="url(#grid)"/><g stroke="#abb0ac"><path d="M20 220h480M260 20v400"/><circle cx="260" cy="220" r="175" stroke-dasharray="3 6"/><path d="m260 45 175 175-175 175L85 220z"/></g><g stroke="#2449ca" stroke-width="2"><path class="flow-line" d="M110 118h150v102h150M110 322h150V220M260 220v102h150"/><path d="M260 90v52M234 116h52"/></g><g fill="#f7f6f2" stroke="#2449ca"><rect x="48" y="88" width="130" height="60" rx="2"/><rect x="48" y="292" width="130" height="60" rx="2"/><rect x="342" y="190" width="130" height="60" rx="2"/><rect x="342" y="292" width="130" height="60" rx="2"/></g><rect x="219" y="179" width="82" height="82" rx="2" fill="#2449ca"/><g font-family="monospace" font-size="12" fill="#2449ca"><text x="62" y="112">01 / SOURCES</text><text x="62" y="132">data + context</text><text x="62" y="316">02 / RULES</text><text x="62" y="336">constraints</text><text x="356" y="214">03 / EXECUTE</text><text x="356" y="234">bounded action</text><text x="356" y="316">04 / EVIDENCE</text><text x="356" y="336">trace + verify</text></g><g fill="#fff"><path d="M244 204h12v12h-12zm20 0h12v12h-12zm-20 20h12v12h-12zm20 0h12v12h-12z"/></g><g fill="#2449ca"><circle cx="260" cy="118" r="4"/><circle cx="260" cy="322" r="4"/></g><text x="22" y="414" font-family="monospace" font-size="11" fill="#545c60">RY — SYSTEM STUDIES / FIG. 01</text></svg><div class="figure-label">${t("概念结构 · 非运行界面", "Concept structure · Not a running interface")}</div></div>`;
}
const feature = projects[0];
const home =
  head(
    "Engineering systems, with evidence",
    "Ruixin Yang · AI workbenches, spatial computation and traceable knowledge infrastructure. 开源项目与工程原型。",
  ) +
  header() +
  `<main id="main" tabindex="-1"><section class="hero wrap"><div class="hero-copy"><p class="eyebrow"><span class="blue-dot"></span>${t("独立开发 · 空间计算 · AI 治理", "INDEPENDENT DEVELOPMENT · SPATIAL COMPUTATION · AI GOVERNANCE")}</p><h1>${t("让复杂系统<br>有迹可循。", "Complex systems.<br><em>Clear evidence.</em>")}</h1><p class="hero-intro">${t("我是 Ruixin Yang。我构建 AI 工作环境、空间计算工具与知识基础设施，把规则、来源和验证放进软件。", "I’m Ruixin Yang. I build AI work environments, spatial computing tools and knowledge infrastructure—with rules, provenance and verification built in.")}</p><div class="actions"><a class="button primary" href="#work">${t("探索代表项目", "Explore selected work")} <span aria-hidden="true">↓</span></a><a class="text-link" href="resume.html">${t("查看简历", "View résumé")} ↗</a></div></div>${diagram()}<div class="hero-foot"><span class="mono">ENGINEERING × DIGITAL LABORATORY</span><a href="#work">${t("从想法，到可检查的成果", "FROM IDEAS TO INSPECTABLE OUTCOMES")} ↓</a></div></section><section id="work" class="work wrap"><div class="section-heading"><p class="eyebrow">01 / SELECTED WORK</p><h2>${t("以项目，说明方法。", "The work explains<br>the approach.")}</h2><p>${t("可运行的代码、真实的界面，以及明确的实现边界。", "Runnable code, real interfaces and explicit implementation boundaries.")}</p></div>${featureProduct({ image, feature, buttons })}${projects
    .slice(1)
    .map(
      (p) =>
        `<article class="project-row"><div class="project-description"><p class="eyebrow">${p.number} / ${p.category}</p><h3>${p.name}</h3><p class="project-statement">${p.subtitle}</p><p>${p.intro}</p><span class="status">${p.status}</span>${buttons(p)}<p class="tech mono">${p.tags}</p></div>${image(p)}</article>`,
    )
    .join(
      "",
    )}</section><section class="method" id="method"><div class="wrap"><div class="section-heading"><p class="eyebrow">02 / ENGINEERING METHOD</p><h2>${t("不止是结果。<br>也关心结果从何而来。", "Beyond the output.<br>Back to the evidence.")}</h2><p>${t("这些项目共享同一个问题：怎样让系统的行为更清楚、更可控、更容易检查？", "A shared question across these projects: how can a system’s behavior become clearer, more controlled and easier to inspect?")}</p></div><div class="principles">${[
    [
      "01",
      "保留来源",
      "Preserve the source",
      "原始数据与派生结果分开；结论能够定位到依据。",
      "Keep source data separate from derived results; make evidence locatable.",
    ],
    [
      "02",
      "明确契约",
      "Define the contract",
      "用结构化输入、输出与约束，减少隐含假设。",
      "Reduce implicit assumptions through structured inputs, outputs and constraints.",
    ],
    [
      "03",
      "限制行动",
      "Bound the action",
      "加载、连接与执行分别管理，写入需要明确授权。",
      "Manage loading, connections and execution separately; require authorization for writes.",
    ],
    [
      "04",
      "留下证据",
      "Leave a trace",
      "保留版本、运行状态和错误，让下一次改进有据可依。",
      "Record versions, run state and errors so the next iteration has evidence.",
    ],
  ]
    .map(
      (a) =>
        `<details ${a[0] === "01" ? "open" : ""}><summary><span class="mono">${a[0]}</span><h3>${t(a[1], a[2])}</h3><span class="expand" aria-hidden="true">+</span></summary><p>${t(a[3], a[4])}</p></details>`,
    )
    .join(
      "",
    )}</div></div></section><section class="about wrap" id="about"><div><p class="eyebrow">03 / ABOUT & CONTACT</p><h2>${t("构建工具，<br>连接想法与现实。", "Building the tools<br>between ideas<br>and reality.")}</h2><a class="button primary" href="resume.html">${t("项目简历", "Project résumé")} ↗</a></div><div class="about-copy"><p class="lead">${t("Ruixin Yang，数字治理与空间计算方向的开源工具开发者。", "Ruixin Yang, an open-source developer working across digital governance and spatial computation.")}</p><p>${t("卡迪夫大学硕士校友，现居上海。关注可追溯知识基础设施、AI 数据与执行治理，以及工程空间数据原型。", "MSc alumnus of Cardiff University, based in Shanghai. My focus spans traceable knowledge infrastructure, AI data and execution governance, and engineering spatial-data prototypes.")}</p><p class="skills">Python · SQLite · DuckDB · ChromaDB · Neo4j<br>HTML / CSS / JavaScript · JSON · SVG / DXF</p><div class="contact-links"><a href="mailto:y23666176@gmail.com">y23666176@gmail.com <span>↗</span></a><a href="${gh.slice(0, -1)}">GitHub / David7583 <span>↗</span></a><a href="mailto:1138133645@qq.com">1138133645@qq.com <span>↗</span></a></div><details class="wechat"><summary>${t("微信联系方式", "WeChat contact")}</summary><p>15203793739</p></details></div></section><section class="supporting wrap"><p class="eyebrow">FURTHER EXPLORATION</p><a href="${gh}text-governance-pipeline"><span>Text Governance Pipeline</span><span>${t("策略驱动的文本结构治理", "Policy-driven text-structure governance")} ↗</span></a><a href="${gh}text-governance-tool"><span>Text Governance Tool</span><span>${t("结构单元与决策记录", "Structured units and decision records")} ↗</span></a></section></main>` +
  footer();
// A compact project index lets visitors reach the flagship in the first screen.
const projectIndex = `<nav class="project-index" aria-label="代表项目" data-label-zh="代表项目" data-label-en="Selected projects">${projects.map((p) => `<a href="projects/${p.id}.html"><span class="mono">${p.number}</span><span>${p.name}</span><span aria-hidden="true">↗</span></a>`).join("")}</nav>`;
writeFileSync(
  "index.html",
  home
    .replace(/<div class="hero-foot">[\s\S]*?<\/div>/, projectIndex)
    .replace(
      "</head>",
      '<link rel="stylesheet" href="assets/workbench.css"></head>',
    ),
);
mkdirSync("projects", { recursive: true });
for (const p of projects) {
  if (p.id === "workbench") {
    writeFileSync(
      "projects/workbench.html",
      productPage({ head, header, footer, image, feature: p }),
    );
    continue;
  }
  const extras =
    p.id === "sc-tse"
      ? `<div class="research-gallery">${[
          ["sc-tse-terrain-contours", "地形与等高线", "Terrain and contours"],
          ["sc-tse-sections", "现状与设计剖面", "Existing and design sections"],
          ["sc-tse-earthwork", "挖填方实验", "Cut-and-fill experiment"],
          [
            "engineering-spatial-kernel-prototype",
            "空间数据内核原型",
            "Spatial-data kernel prototype",
          ],
          [
            "sc-tse-2d-block-solver-prototype",
            "二维体块求解原型",
            "2D block solver prototype",
          ],
        ]
          .map(([imageName, zh, en]) =>
            image(
              {
                image: imageName,
                alt: [zh, en],
                caption: t(
                  zh + " · 更广泛研发实验",
                  en + " · Broader research experiment",
                ),
              },
              "../",
            ),
          )
          .join("")}</div>`
      : "";
  writeFileSync(
    `projects/${p.id}.html`,
    head(
      p.name,
      `${p.name}: project scope, engineering approach and implementation evidence. 项目范围、工程方法与实现证据。`,
      "../",
    ) +
      header("../") +
      `<main id="main" tabindex="-1" class="case wrap"><a class="back-link" href="../index.html#work">← ${t("所有项目", "All projects")}</a><div class="case-title"><p class="eyebrow">${p.number} / ${p.category}</p><h1>${p.name}</h1><p class="case-subtitle">${p.subtitle}</p><div class="case-meta"><span class="status">${p.status}</span><span class="mono">${p.tags}</span><a class="text-link" href="${gh + p.repo}">GitHub ↗</a></div></div>${image(p, "../", true)}<div class="case-story"><h2>${p.question}</h2><div><p class="lead">${p.problem}</p><h3>${t("工程方法", "Engineering approach")}</h3><p>${p.approach}</p><h3>${t("已经实现与验证", "Implemented and demonstrated")}</h3><p>${p.evidence}</p><aside class="scope"><p class="eyebrow">${t("范围与限制", "SCOPE & LIMITATIONS")}</p><p>${p.scope}</p></aside><h3>${t("继续探索", "Still in exploration")}</h3><p>${p.future}</p><div class="actions"><a class="button primary" href="${gh + p.repo}">${t("查看源码与文档", "Source & documentation")} ↗</a>${p.related.map(([link, label]) => `<a class="text-link" href="${gh + link}">${label} ↗</a>`).join("")}</div></div></div>${extras}<nav class="next-project" aria-label="更多项目" data-label-zh="更多项目" data-label-en="More projects"><span class="eyebrow">${t("下一个项目", "NEXT PROJECT")}</span><a href="${projects[(projects.indexOf(p) + 1) % 4].id}.html">${projects[(projects.indexOf(p) + 1) % 4].name} <span>↗</span></a></nav></main>` +
      footer("../"),
  );
}
writeFileSync(
  "resume.html",
  head(
    "Project résumé",
    "Ruixin Yang: project résumé, technical focus, education and public contact.",
  ) +
    header() +
    `<main id="main" tabindex="-1" class="resume wrap"><div class="resume-heading"><div><p class="eyebrow">PROJECT RÉSUMÉ</p><h1>Ruixin Yang</h1><p class="lead">${t("数字治理 · 空间计算 · 开源工具开发", "Digital governance · Spatial computation · Open-source tools")}</p></div><button class="button primary print" type="button">${t("打印 / 保存 PDF", "Print / Save PDF")} ↗</button></div><section><h2>${t("背景与方向", "Background & focus")}</h2><div><p>${t("卡迪夫大学硕士校友，现居上海。", "MSc alumnus of Cardiff University, based in Shanghai.")}</p><p>${t("可追溯知识基础设施、AI 数据与执行治理、确定性场地布局计算、工程空间数据原型。", "Traceable knowledge infrastructure, AI data and execution governance, deterministic site-layout computation and engineering spatial-data prototypes.")}</p></div></section><section><h2>${t("代表项目", "Selected projects")}</h2><div>${projects.map((p) => `<article><h3><a href="projects/${p.id}.html">${p.name} ↗</a></h3><p>${p.intro}</p><p class="resume-status">${p.status}</p><a class="text-link" href="${gh + p.repo}">${gh + p.repo}</a></article>`).join("")}</div></section><section><h2>${t("技术实践", "Technical practice")}</h2><p>Python · SQLite · DuckDB · ChromaDB · Neo4j · HTML / CSS / JavaScript · JSON contracts · SVG / DXF</p></section><section><h2>${t("联系", "Contact")}</h2><p><a href="mailto:y23666176@gmail.com">y23666176@gmail.com</a><br><a href="mailto:1138133645@qq.com">1138133645@qq.com</a><br><a href="${gh.slice(0, -1)}">github.com/David7583</a><br>${t("微信", "WeChat")} · 15203793739</p></section></main>` +
    footer(),
);
console.log("Generated homepage, four project pages and bilingual résumé.");
