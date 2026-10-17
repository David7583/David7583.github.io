# 设计说明 / Design rationale

## 定位与结构

以“工程档案室”为视觉线索：纸色背景、深墨文字、蓝色操作与编号、细线索引、直接呈现的真实软件截图。图形表达来源、规则、执行和证据之间的关系，不以粒子、霓虹或无意义的三维模型替代内容。

首页路径：个人定位 → 四项目快速索引 → Local AI Workbench 重点展示 → SC-TSE / Yuantu / Baigong → 工程方法 → 教育、简历和联系。四个项目有独立案例页面，按问题、方法、实现证据、范围限制、继续探索组织。简历复用现有公开背景，只增加已核实项目说明，不添加任职、学历时间、学科、客户、奖项或成果指标。

The visual language is an engineering archive: warm paper, dark ink, blue actions, numbered indexes and real software captures. Each project separates implemented capabilities, research prototypes and future work. The homepage is a concise route into evidence, rather than the complete technical archive.

## 视觉规范

| 项目 | 决策 |
|---|---|
| 颜色 | Paper `#f7f6f2`, ink `#202822`, muted `#626861`, blue `#2449ca`, line `#d1d4ca` |
| 字体 | 系统 Arial / Segoe UI / Microsoft YaHei；编号使用系统等宽字体，无字体下载或第三方字体追踪 |
| 栅格 | 最大 1440px，桌面非对称双栏；700px 以下单栏；手机项目索引为双列 |
| 间距 | 22px 手机外边距，桌面自适应；段落、项目与章节使用不同层级间隔 |
| 标题 | 大标题与正文区别明确；避免旧版过重、过紧的大字号堆叠；中英分别实测 |
| 图像 | 保留原始内容与比例；WebP 800px / 全尺寸响应式选择；延迟加载次要图像；可查看原图 |
| 动效 | 仅按钮轻微位移、图片轻微缩放、原生滚动；无自动轮播、加载屏、滚动劫持 |
| 无障碍 | 语义结构、跳过导航、可见焦点、原生 details/dialog、Escape 返回焦点、语言与图片替代文本同步；减少动效偏好关闭变换及平滑滚动 |

没有迁移框架。静态 HTML 已适合 GitHub Pages，交付无需服务器 API、账户、数据库或前端运行库。构建脚本只用 Node 标准库生成六页 HTML；Lighthouse 与 Prettier 是开发工具，不发送给访客。

## 参考研究与限制

研究日期：2026-10-16。本节区分可核实的官方资料和本项目的设计判断。

| 来源与代表作品 | 实际取得的资料 | 本项目采用的判断 |
|---|---|---|
| [Awwwards 动态栅格目录](https://www.awwwards.com/websites/dynamic-grid-layout-examples/)；[Maël Ruffini Portfolio 2025](https://www.awwwards.com/sites/mael-ruffini-portfolio-2025) | 官方目录可读取；具体作品页面在工具中多次超时，仅获取页面标题，未完成视觉交互研究 | 将栅格节奏、排版和留白作为评价维度；不声称复现或完整研究该站动效 |
| [Webby 2025 Best Home Page: AW Portfolio](https://winners.webbyawards.com/2025/websites-and-mobile-sites/features-design/best-home-page/332383/aw-portfolio)；[作品站](https://wodniack.dev/) | 官方获奖信息和作品的公开文本结构可核实，包括角色定位、About/Work/Contact、对比度入口和项目索引 | 首屏清楚说明角色，让项目与联系路径直接可达；没有复制二进制装饰、照片、文案或动效 |
| [FWA 官方 RSS](https://thefwa.com/rss/)；[Carter Ogunsola Portfolio 2026](https://thefwa.com/cases/carter-ogunsola-portfolio-2026) | RSS 中可核实作品与印刷工作室主题描述；FWA 动态详情页未返回可用正文 | 采用一致的主题隐喻；本项目自主选择工程档案与系统结构，不复制印刷机交互 |
| [W3C WCAG Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) | 语义、键盘、焦点、对比度和重排原则 | 用于检查清单；自动评分不是完整 WCAG 合规认证 |
| [web.dev reduced motion](https://web.dev/articles/prefers-reduced-motion) | 系统减少动效偏好与 CSS 媒体查询原则 | 动效不是获取信息的前提；禁用非必要位移和缩放 |

没有下载或使用以上参考作品的图像、字体、代码、音频或视频。没有声称达到某个奖项评级。

## 两轮实际视觉迭代

1. **初稿 → 第一轮修改**：实际查看 1440×1000 桌面和 390×844 手机截图。结构图占据较多首屏高度，项目入口仍偏后；统一声明的图片比例会产生潜在加载位移。缩小桌面结构图、加入四项目首屏索引、逐图使用实际尺寸。随后检查 834×1112 平板和 320px 窄屏。见 [初稿](screenshots/round1-desktop.webp)、[修改后平板](screenshots/round2-tablet.webp)。初稿长截图中未进入视口的 lazy 图像未加载，空色块不是模拟截图或最终状态。
2. **第一轮 → 第二轮修改**：手机概念图继续延迟真实项目信息；注释偏小，中心三角形容易被误认成播放按钮。手机首页移除装饰性概念图，保留详情中的完整图示；放大图注、保留全部主导航、用模块符号替换三角形；增加响应式图像和原图入口。语言按钮可访问名称也改为包含可见文字。最终再次检查中英文、桌面/平板/手机，36 个页面/语言/视口组合无横向溢出。

## 与原站的主要差异

| 原站 | 新设计 |
|---|---|
| 大段单页项目说明，三项目权重相近 | 首页精选 + 四个独立案例；Workbench 成为重点 |
| Workbench 作为相关原型截图出现 | 单独介绍真实能力编排与公开源码边界 |
| 首屏主要是巨大标题和数量统计 | 角色、技术方向、简历、GitHub 和四项目索引 |
| 项目多图与说明混合 | 明确区分实际运行、相关原型、更广泛研发和概念结构 |
| 简历独立切换样式 | 全站共享语言选择，支持分享语言 URL 和打印 |
| 原 PNG 直接加载 | WebP / srcset / 正确比例 / 次要图片延迟加载 |
| 缺少工程验收记录 | 本地 Lighthouse、链接检查、三视口截图、仅检查不发布的 CI |

## 待确认或后续工作

- 保留既有“卡迪夫大学硕士校友、上海”信息，不扩展学科、年份、雇佣经历。若需更完整招聘简历，由本人提供已确认内容。
- 未嵌入之前宣传片：其中配音使用权尚未完全确认，且大视频不适合直接进入网站普通源码。当前使用不含音频的真实 UI 截图。
- 未测试真实 iOS Safari / Android 设备及辅助技术用户；浏览器视口检查和 Lighthouse 不替代这些验收。
- 合并与正式 Pages 发布仍需本人批准；本分支不增加独立云服务或外部账户授权。
