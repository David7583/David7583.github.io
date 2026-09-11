const translations = {
  zh: {
    skip: '跳到项目', navProjects: '项目', navContact: '联系', resume: 'Resume',
    heroEyebrow: '计算系统 · 数据治理 · 工程原型', heroTitle: '把复杂规则做成<br>可运行、可检查的系统。',
    heroCopy: '我关注空间计算与数字治理：把约束、来源和运行证据放进软件，让结果不只可见，也能被验证。',
    metaCore: '核心项目', metaOpen: '开源仓库', metaShots: '真实运行截图', selectedWork: 'SELECTED WORK', projectsTitle: '核心项目',
    scSummary: '面向场地布局的确定性计算与校验系统。它接收结构化场地、体块和约束，运行布局、连通性、道路与出入口检查，并把通过、阻断与具体违规证据返回给使用者。',
    openImage: '点击查看', openImage2: '点击查看', openImage3: '点击查看',
    scMainCap: '二维厂区布局求解：在 120 × 100 m 场地内放置 5 个功能体块，并输出约束满足状态。', researchOutput: 'SC‑TSE broader R&D output',
    terrainCap: '地形与等高线：显示高程范围、剖面位置与设计标高候选。', sectionsCap: '剖面结果：把现状地形与设计标高放在同一坐标中比较。', earthworkCap: '挖填方结果：输出填挖分布、覆盖率和方量，用于验证工程计算链路。',
    syntheticData: '合成验证数据', syntheticData2: '合成验证数据', syntheticData3: '合成能力验证',
    kernelCap: '空间数据内核：管理点、几何、语义对象及其绑定关系的桌面实验界面。', solverCap: '二维体块求解：从结构化输入搜索可行布局，并输出 SVG、DXF 与校验记录。',
    relatedPrototype: 'related engineering prototype', relatedPrototype2: 'related engineering prototype', relatedPrototype3: 'related engineering prototype', relatedPrototype4: 'related engineering prototype',
    scFact1: '结构化 JSON 输入', scFact2: '六节点计算主链', scFact3: '约束证据回传', viewGithub: '查看 GitHub', viewGithub2: '查看 GitHub', viewGithub3: '查看 GitHub',
    scScope: '范围说明：公开仓库是 Integration MVP，当前支持固定矩形体块的编辑、重算与校验；地形、挖填方、自动布局和空间内核截图展示的是同一研发方向下的更广泛实验结果，不代表公开 MVP 已包含这些界面或全部能力。',
    yuantuSummary: '为政策文档、访谈记录等长期积累的非结构化文本建立可追溯知识层。原始材料保持不变，SQLite、ChromaDB、DuckDB 与 Neo4j 分别负责定位、语义、事实和关系检索，让结论能够回到原始证据。',
    yuantuMainCap: '相关工作台原型把四类存储与任务运行状态放在同一观察界面。', yuantuDetail: '解决的问题：大型模型直接检索长年累积材料时，答案容易失去来源。Yuantu 先定位文本单元，再从语义、事实和关系三个独立维度补充证据，并记录每一步运行信息。',
    yuantuScope: '范围说明：Yuantu 是研究原型，公开仓库完成了四数据库理解层，行动层仍在开发；上图是相关系统观察界面，不是仓库内发布的产品 UI。',
    baigongSummary: '一个本地 Data–Action–Data 演示链路，用于验证 AI 在读取数据、调用能力和写回结果时，输入来自哪里、哪一版本执行、哪些动作获准，以及失败后如何定位。',
    baigongMainCap: '相关 Action Chat 原型展示模型选择、路由判断、只读检索和运行详情。', baigongDetail: '实际输出：稳定对象 ID、来源路径和内容哈希；每次运行的 run ID、版本与完成清单；对数据库写入、真实模型调用等动作设置显式确认门，并用结构化错误保留失败证据。',
    baigongScope: '范围说明：公开仓库是可独立安装测试的治理链路 Demo，不是通用 Agent 产品；上图为相关交互原型，不是 Baigong 发布包中的正式界面。',
    prototypeKicker: 'EVIDENCE INTERFACE', prototypeTitle: '相关工程原型', independentPrototype: 'independent / related prototype', knowledgeTitle: '经验知识工作台', knowledgeCopy: '用于整理工程经验条目，并把知识记录与原始截图来源并置。它体现了“结论可回到原始依据”的设计方向，但无法从公开仓库确认其属于某个正式发布项目，因此单独展示。',
    secondaryKicker: 'SUPPORTING WORK', secondaryTitle: '次级项目', pipelineCopy: '面向文本结构治理的策略驱动流水线仓库；公开仓库未提供 README，因此这里只采用其公开项目描述。', toolCopy: '把非结构化文本转换为可登记结构单元，并为准入、噪声过滤与重要性判断保留可复现的策略决策记录。',
    contactKicker: 'CONTACT', contactTitle: '对空间计算、知识基础设施或 AI 治理感兴趣？', wechat: '微信', copy: '复制', copied: '已复制'
  },
  en: {
    skip: 'Skip to projects', navProjects: 'Projects', navContact: 'Contact', resume: 'Resume',
    heroEyebrow: 'COMPUTATIONAL SYSTEMS · DATA GOVERNANCE · ENGINEERING PROTOTYPES', heroTitle: 'Turning complex rules into<br>systems you can run and inspect.',
    heroCopy: 'I work across spatial computation and digital governance—putting constraints, provenance, and run evidence into software so results can be verified, not merely viewed.',
    metaCore: 'core projects', metaOpen: 'open repositories', metaShots: 'real run captures', selectedWork: 'SELECTED WORK', projectsTitle: 'Core projects',
    scSummary: 'A deterministic computation and validation system for site layouts. It accepts structured sites, blocks, and constraints; runs layout, connectivity, road, and access checks; and returns clear pass, block, and violation evidence.',
    openImage: 'View image', openImage2: 'View image', openImage3: 'View image',
    scMainCap: '2D industrial layout: five functional blocks placed within a 120 × 100 m site, with constraint status reported.', researchOutput: 'SC‑TSE broader R&D output',
    terrainCap: 'Terrain and contours: elevation range, section locations, and a candidate design level.', sectionsCap: 'Sections: existing terrain and the design level compared in the same coordinates.', earthworkCap: 'Cut and fill: spatial distribution, coverage, and volumes that exercise the engineering calculation chain.',
    syntheticData: 'synthetic validation data', syntheticData2: 'synthetic validation data', syntheticData3: 'synthetic capability test',
    kernelCap: 'Spatial data kernel: a desktop experiment for points, geometry, semantic objects, and their bindings.', solverCap: '2D block solving: searches structured inputs for a feasible layout and exports SVG, DXF, and validation records.',
    relatedPrototype: 'related engineering prototype', relatedPrototype2: 'related engineering prototype', relatedPrototype3: 'related engineering prototype', relatedPrototype4: 'related engineering prototype',
    scFact1: 'structured JSON input', scFact2: 'six-node computation chain', scFact3: 'constraint evidence', viewGithub: 'View on GitHub', viewGithub2: 'View on GitHub', viewGithub3: 'View on GitHub',
    scScope: 'Scope note: the public repository is an Integration MVP for editing, rerunning, and validating fixed rectangular blocks. The terrain, earthwork, automatic-layout, and spatial-kernel captures are broader experiments from the same R&D direction; they are not claims about what the public MVP currently ships.',
    yuantuSummary: 'A traceable knowledge layer for accumulated policy documents, interviews, and other heterogeneous text. Original material remains immutable while SQLite, ChromaDB, DuckDB, and Neo4j handle location, semantic, factual, and relational retrieval.',
    yuantuMainCap: 'A related workbench prototype brings four storage axes and task status into one observability surface.', yuantuDetail: 'The problem: answers lose provenance when a large model searches years of source material directly. Yuantu locates a text unit first, adds evidence from three independent axes, and records each pipeline run.',
    yuantuScope: 'Scope note: Yuantu is a research prototype. Its four-database understanding layer is complete, while the action layer remains in development. The image shows a related observability prototype, not a product UI shipped in the repository.',
    baigongSummary: 'A local Data–Action–Data demonstration chain for checking where AI inputs came from, which version ran, which actions were authorized, and how a failed run can be diagnosed.',
    baigongMainCap: 'A related Action Chat prototype exposes model selection, routing, read-only retrieval, and run details.', baigongDetail: 'Outputs include stable object IDs, source paths, and hashes; run IDs, pinned versions, and completion manifests; explicit gates for database writes and real model calls; and structured errors that preserve failure evidence.',
    baigongScope: 'Scope note: the public repository is an independently installable governance-chain demo, not a general Agent product. The image is a related interaction prototype, not an official UI in the Baigong release package.',
    prototypeKicker: 'EVIDENCE INTERFACE', prototypeTitle: 'Related prototype', independentPrototype: 'independent / related prototype', knowledgeTitle: 'Experience knowledge workbench', knowledgeCopy: 'An interface for structuring engineering notes while keeping each record beside its original screenshot evidence. It follows the same traceability direction, but public repositories do not establish a formal project owner, so it is shown separately.',
    secondaryKicker: 'SUPPORTING WORK', secondaryTitle: 'Supporting projects', pipelineCopy: 'A policy-driven repository for text-structure governance. Its public repository currently has no README, so only the public project description is used here.', toolCopy: 'Turns unstructured text into registerable structural units and records reproducible policy decisions for admission, noise filtering, and prominence.',
    contactKicker: 'CONTACT', contactTitle: 'Interested in spatial computation, knowledge infrastructure, or AI governance?', wechat: 'WeChat', copy: 'Copy', copied: 'Copied'
  }
};

const imageAlts = {
  'sc-tse-factory-layout.png': {
    zh: 'SC-TSE 生成的厂区二维体块布局，包含生产车间、仓库、办公楼与入口',
    en: 'SC-TSE 2D industrial block layout with production, warehouse, office, and entry areas'
  },
  'sc-tse-terrain-contours.png': {
    zh: 'SC-TSE 合成地形等高线与建筑轮廓结果',
    en: 'SC-TSE synthetic terrain contours with building footprints'
  },
  'sc-tse-sections.png': {
    zh: 'SC-TSE 东西向和南北向地形剖面图',
    en: 'SC-TSE east-west and north-south terrain sections'
  },
  'sc-tse-earthwork.png': {
    zh: 'SC-TSE 场地挖填色谱，标注挖方、填方与净方量',
    en: 'SC-TSE site cut-and-fill map with excavation, fill, and net volumes'
  },
  'engineering-spatial-kernel-prototype.png': {
    zh: '工程空间数据内核桌面原型界面',
    en: 'Desktop prototype for an engineering spatial-data kernel'
  },
  'sc-tse-2d-block-solver-prototype.png': {
    zh: '二维语义体块约束布局求解器桌面原型',
    en: 'Desktop prototype for a 2D semantic block constraint solver'
  },
  'yuantu-local-ai-workbench-prototype.png': {
    zh: 'Local AI Workbench 展示数据端、理解端、行动端与四类存储状态',
    en: 'Local AI Workbench showing data, understanding, action, and four storage-layer states'
  },
  'baigong-action-chat-prototype.png': {
    zh: 'Action Chat 本地会话原型，展示模型、路由、只读检索与运行详情',
    en: 'Action Chat local-session prototype showing model, routing, read-only retrieval, and run details'
  },
  'knowledge-evidence-workbench-prototype.png': {
    zh: '经验知识工作台，展示来源、状态、知识条目与原始依据',
    en: 'Experience knowledge workbench showing sources, status, knowledge records, and original evidence'
  }
};

let lang = localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'zh';
const switcher = document.querySelector('.lang-switch');

function applyLanguage(next) {
  lang = next;
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    const value = translations[lang][node.dataset.i18n];
    if (value !== undefined) node.innerHTML = value;
  });
  document.querySelectorAll('img[src]').forEach((image) => {
    const name = image.getAttribute('src').split('/').pop();
    if (imageAlts[name]) image.alt = imageAlts[name][lang];
  });
  switcher.textContent = lang === 'zh' ? 'EN' : '中';
  switcher.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换到中文');
  switcher.setAttribute('aria-pressed', String(lang === 'en'));
  localStorage.setItem('portfolio-lang', lang);
}

switcher.addEventListener('click', () => applyLanguage(lang === 'zh' ? 'en' : 'zh'));
applyLanguage(lang);

const dialog = document.querySelector('.lightbox');
const dialogImage = dialog.querySelector('img');
const dialogCaption = dialog.querySelector('figcaption');
const closeButton = dialog.querySelector('.lightbox-close');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.lightbox;
    dialogImage.alt = button.querySelector('img').alt;
    dialogCaption.textContent = lang === 'zh' ? button.dataset.titleZh : button.dataset.titleEn;
    dialog.showModal();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const wechatButton = document.querySelector('.wechat-copy');
wechatButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(wechatButton.dataset.copy);
    const state = wechatButton.querySelector('.copy-state');
    state.textContent = translations[lang].copied;
    window.setTimeout(() => { state.textContent = translations[lang].copy; }, 1600);
  } catch {
    window.prompt(lang === 'zh' ? '复制微信号' : 'Copy WeChat ID', wechatButton.dataset.copy);
  }
});
