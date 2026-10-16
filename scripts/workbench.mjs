import { readFileSync } from "node:fs";
import {
  steps,
  architecture,
  t,
  panelContent,
} from "../assets/workbench-data.mjs";
export function validateMedia(media) {
  if (media.durationSeconds !== 60)
    throw new Error(
      "The product-film slot is intended for the 60-second film.",
    );
  const safe = (url) =>
    typeof url === "string" &&
    (/^(?:assets|media)\/[\w/.-]+$/.test(url) ||
      /^https:\/\/[^\s"<>]+$/.test(url)) &&
    !url.includes("..");
  if (media.src && (!safe(media.src) || media.rightsReviewed !== true))
    throw new Error(
      "Media needs a safe asset URL and a completed rights review.",
    );
  if (media.type !== "video/mp4")
    throw new Error("Use browser-compatible MP4 (H.264/AAC).");
  if (!Array.isArray(media.captions))
    throw new Error("Captions must be an array.");
  for (const track of media.captions)
    if (!safe(track.src) || !["zh", "en"].includes(track.lang))
      throw new Error("Invalid caption source or language.");
  return media;
}
const media = validateMedia(
  JSON.parse(readFileSync("content/workbench-media.json", "utf8")),
);
const escape = (s) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const asset = (src, prefix) => (src.startsWith("https:") ? src : prefix + src);
export function featureProduct({ image, feature, buttons }) {
  return `<article class="flagship product-feature"><div class="project-top"><span class="eyebrow">01 / FEATURED PRODUCT</span><span class="status">${feature.status}</span></div><div class="feature-heading"><h3>Local AI<br>Workbench<span class="period">.</span></h3><div><p class="feature-statement">${t("让 AI 按规矩运行，<br>让能力自由组合。", "Let AI work within rules.<br>Let capabilities connect.")}</p><p>${feature.intro}</p>${buttons(feature)}</div></div><div class="product-stage"><div class="stage-bar"><span><i></i> LOCAL AI WORKBENCH</span><span>${t("真实软件界面", "ACTUAL SOFTWARE INTERFACE")}</span></div>${image(feature, "", false)}<div class="stage-footer"><a class="film-entry" href="projects/workbench.html#film"><span class="film-symbol" aria-hidden="true">${media.src ? "▶" : "↗"}</span><span><strong>${media.src ? t("观看 60 秒影片", "Watch the 60-second film") : t("60 秒产品影片", "60-second product film")}</strong><small>${media.src ? t("按需播放 · 无自动加载", "On demand · No autoplay") : t("待发布 · 先探索交互示意", "Awaiting publication · Explore the interactive guide")}</small></span></a><a class="stage-explore" href="projects/workbench.html#orchestration">${t("亲手探索编排", "Explore the workflow")} ↗</a></div></div><div class="feature-notes">${[
    [
      "01 / COMPOSE",
      "连接现有能力",
      "Connect existing capabilities",
      "节点、端口与参数组成可编辑的工作流。",
      "Nodes, ports and parameters form editable workflows.",
    ],
    [
      "02 / GOVERN",
      "在明确边界内执行",
      "Act within defined boundaries",
      "加载能力不等于自动取得执行权限。",
      "Loading a capability does not grant execution permission.",
    ],
    [
      "03 / INSPECT",
      "让过程可以追溯",
      "Keep the process inspectable",
      "从节点结果返回运行记录与来源。",
      "Trace node outputs back to runs and sources.",
    ],
  ]
    .map(
      ([num, zh, en, copyZh, copyEn]) =>
        `<div><span class="mono">${num}</span><h4>${t(zh, en)}</h4><p>${t(copyZh, copyEn)}</p></div>`,
    )
    .join(
      "",
    )}</div><p class="scope-inline">${t("源码版默认只加载聊天与基础框架；截图是配置内置节点后的实际运行，使用虚构样本。", "The source edition loads chat and the core framework by default. The capture shows configured built-in nodes using fictional data.")}</p></article>`;
}
function film() {
  const poster = "../assets/images/workbench-flow.webp";
  return `<section id="film" class="product-film product-section"><div class="product-section-title"><div><p class="eyebrow">01 / PRODUCT FILM</p><h2>${t("一分钟，<br>走进工作台。", "One minute.<br>Inside the workbench.")}</h2></div><p>${media.src ? t("从界面、编排到执行，观看完整的产品介绍。影片区分实际运行与概念镜头。", "From interface to composition and execution. The full film distinguishes actual runs from concept sequences.") : t("影片暂未上线。先通过真实界面和下方交互示意了解工作台；视频就绪后将在这里播放。", "The film is not online yet. Explore the real interface and interactive guide below; the video will play here when available.")}</p></div><div class="film-shell ${media.src ? "film-ready" : "film-pending"}"><div class="film-cover"><img src="${poster}" width="1600" height="900" loading="lazy" alt="工作台真实流程界面，影片封面" data-alt-zh="工作台真实流程界面，影片封面" data-alt-en="Actual workflow interface used as the film cover"><div class="film-cover-label"><span class="mono">LOCAL AI WORKBENCH / 01:00</span>${media.src ? `<button class="film-start" type="button"><span aria-hidden="true">▶</span> ${t("播放产品影片", "Play product film")}</button>` : `<span class="film-unavailable">${t("影片待发布", "Film awaiting publication")}</span><a href="#orchestration">${t("先探索交互示意", "Explore the interactive guide")} ↓</a>`}</div></div>${media.src ? `<video hidden controls playsinline preload="none" poster="${poster}" data-product-video data-source="${escape(asset(media.src, "../"))}" aria-label="Local AI Workbench 产品影片" data-label-zh="Local AI Workbench 产品影片" data-label-en="Local AI Workbench product film">${media.captions.map((track) => `<track kind="captions" srclang="${track.lang}" label="${track.lang === "zh" ? "简体中文" : "English"}" data-source="${escape(asset(track.src, "../"))}">`).join("")}</video><p class="film-error" hidden role="alert">${t("影片暂时无法播放，请稍后重试。你仍可以使用下方交互示意。", "The film could not be played. Please try again later; the interactive guide below remains available.")} <button class="film-retry" type="button">${t("重试", "Retry")}</button></p>` : ""}</div><p class="film-note">${t("真实界面封面 · 按需播放 · 不自动加载影片", "Real-interface cover · On-demand playback · No automatic video download")}</p></section>`;
}
function flow() {
  return `<section id="orchestration" class="orchestration product-section"><div class="product-section-title"><div><p class="eyebrow">02 / INTERACTIVE ARCHITECTURE</p><h2>${t("把一个目标，<br>拆成可理解的步骤。", "One goal.<br>Understand every step.")}</h2></div><div><span class="concept-label">${t("交互式架构示意 · 非实际执行", "Interactive architecture · Not an actual execution")}</span><p>${t("示例目标：把家庭资料整理为时间线。点击、悬停或用键盘选择节点，查看输入、输出与能力边界。", "Example goal: turn family records into a timeline. Click, hover or use the keyboard to explore each node’s inputs, outputs and boundaries.")}</p></div></div><div class="flow-lab" data-flow-lab><div class="lab-heading"><span class="mono">COMPOSITION STUDY / 001</span><span class="lab-mode">${t("说明模式 · 无后端调用", "EXPLANATION MODE · NO BACKEND CALLS")}</span></div><ol class="flow-nodes" aria-label="工作流步骤" data-label-zh="工作流步骤" data-label-en="Workflow steps">${steps.map((step, i) => `<li class="flow-node ${i === 0 ? "is-active" : ""}" data-index="${i}"><button type="button" class="node-select" data-node="${i}" aria-pressed="${i === 0}" aria-controls="node-details"><span class="node-top"><span class="mono">0${i + 1}</span><span class="node-state">${i === 0 ? t("当前步骤", "Current step") : t("待浏览", "To explore")}</span></span><span class="node-name">${t(...step.name)}</span><span class="node-type">${step.type}</span><span class="node-port port-in" aria-hidden="true"></span><span class="node-port port-out" aria-hidden="true"></span></button><span class="node-wire" aria-hidden="true"><i></i></span></li>`).join("")}</ol><div class="flow-toolbar"><div class="flow-navigation"><button type="button" data-flow-prev disabled>${t("上一步", "Previous")}</button><button type="button" data-flow-next>${t("下一步", "Next")} →</button></div><p class="flow-counter" role="status" aria-live="polite" aria-atomic="true">${t("当前讲解", "Exploring")} <span data-step-count>01 / 05</span></p><a class="flow-detail-link" href="#node-details">${t("查看当前节点说明", "Read this node’s details")} ↓</a><div class="flow-tour"><button type="button" data-flow-tour aria-pressed="false">${t("开始导览", "Start guided tour")}</button><button type="button" data-flow-reset>${t("重置", "Reset")}</button></div></div><p class="reduced-note" hidden>${t("已遵循减少动效偏好；请使用上一步、下一步或直接选择节点。", "Reduced-motion preference respected. Use Previous, Next or select a node directly.")}</p><section class="node-panel" id="node-details" tabindex="-1" aria-label="节点说明" data-label-zh="节点说明" data-label-en="Node explanation">${panelContent(0)}</section><div class="flow-legend"><span><i class="legend-current"></i>${t("当前讲解", "Current step")}</span><span><i class="legend-visited"></i>${t("已浏览", "Explored")}</span><p>${t("全部样本为虚构数据；高亮和连线仅表达说明顺序，不代表任务成功。", "All sample data is fictional. Highlights and links explain the sequence, not task success.")}</p></div></div><noscript><p>${t("交互需要 JavaScript。概念步骤说明：", "JavaScript enables the interaction. Concept steps:")}</p><ol>${steps.map((step) => `<li><strong>${t(...step.name)}</strong> — ${t(...step.description)} ${t(...step.boundary)}</li>`).join("")}</ol></noscript></section>`;
}
function architectureSection() {
  return `<section id="architecture" class="product-section architecture-section"><div class="product-section-title"><div><p class="eyebrow">03 / UNDER THE SURFACE</p><h2>${t("自由组合，<br>不意味着没有边界。", "Flexible composition.<br>Explicit boundaries.")}</h2></div><p>${t("前端负责呈现与交互，后端负责能力接入、校验与执行。以下模块来自当前代码；状态说明与源码可以一并检查。", "The frontend presents and coordinates interaction; the backend integrates, validates and executes capabilities. These modules are grounded in current code, with scope notes and source links.")}</p></div><div class="architecture-map"><div class="architecture-rail"><span>${t("桌面前端", "DESKTOP FRONTEND")}</span><i aria-hidden="true">↓</i><span>${t("受管理接口", "MANAGED INTERFACE")}</span><i aria-hidden="true">↓</i><span>${t("能力与记录", "CAPABILITIES & RECORDS")}</span></div><div class="architecture-modules">${architecture.map((a) => `<details><summary><span class="mono">${a.number}</span><span><strong>${t(...a.name)}</strong><small>${t(...a.status)}</small></span><span aria-hidden="true">+</span></summary><div><p>${t(...a.text)}</p><a class="text-link" href="https://github.com/David7583/baigong/blob/workbench-backend/${a.source}">${t("检查实现", "Inspect implementation")} ↗</a></div></details>`).join("")}</div></div><aside class="architecture-boundary"><strong>${t("仍需配置与验证", "Still needs configuration & validation")}</strong><p>${t("专业插件、通用语义编排分析和其他操作系统需要单独验收。AI 建议不等于已确认事实；外部模型或工具可能把获准的数据发送至远程服务。", "Specialized plugins, general semantic workflow analysis and other operating systems need separate acceptance. AI suggestions are not confirmed facts. External models or tools may send authorized data to remote services.")}</p></aside></section>`;
}
export function productPage({ head, header, footer, image, feature }) {
  return (
    head(
      "Local AI Workbench",
      "Local AI Workbench：真实界面、交互式能力编排说明与源码获取。Real interface, interactive architecture and source access.",
      "../",
    ).replace(
      "</head>",
      '<link rel="stylesheet" href="../assets/workbench.css"><script type="module" src="../assets/workbench.js"></script></head>',
    ) +
    header("../") +
    `<main id="main" tabindex="-1" class="product-page"><section class="product-hero wrap"><a class="back-link" href="../index.html#work">← ${t("返回作品集", "Back to portfolio")}</a><div class="product-hero-heading"><div><p class="eyebrow">FEATURED PRODUCT / LOCAL AI SYSTEMS</p><h1>Local AI<br>Workbench<span class="period">.</span></h1></div><div><p class="product-promise">${t("让 AI 按规矩运行，<br>让能力自由组合。", "Let AI work within rules.<br>Let capabilities connect.")}</p><p>${feature.intro}</p><div class="actions"><a class="button primary" href="#orchestration">${t("探索能力编排", "Explore the workflow")} ↓</a><a class="text-link" href="#film">${media.src ? t("观看 60 秒影片", "Watch the 60-second film") : t("60 秒影片 · 待发布", "60-second film · Coming later")} ↗</a></div></div></div><div class="product-release"><span class="status">${t("可运行源码 · 持续开发", "Runnable source · In development")}</span><span class="mono">0.7.0-chat.1 / WINDOWS x64</span><a href="#get-started">${t("源码与安装", "Source & setup")} ↗</a></div><div class="product-stage hero-stage"><div class="stage-bar"><span><i></i> WORKSPACE / COMPOSITION</span><span>${t("真实运行 · 虚构样本", "ACTUAL RUN · FICTIONAL SAMPLE")}</span></div>${image(feature, "../", true)}</div><nav class="product-nav" aria-label="产品页面章节" data-label-zh="产品页面章节" data-label-en="Product sections"><a href="#film">01 ${t("产品影片", "Film")}</a><a href="#orchestration">02 ${t("交互编排", "Workflow")}</a><a href="#architecture">03 ${t("技术架构", "Architecture")}</a><a href="#get-started">04 ${t("获取项目", "Get started")}</a></nav></section><div class="wrap product-body">${film()}${flow()}${architectureSection()}<section class="product-evidence product-section"><div><p class="eyebrow">FROM ILLUSTRATION TO EVIDENCE</p><h2>${t("示意解释理念。<br>实录说明边界。", "The guide explains the idea.<br>The capture shows the scope.")}</h2><p>${feature.evidence}</p><p>${t("右侧为空工作台的实际默认界面。新下载的源码不会预装演示资料或专业插件。", "The capture shows the actual default empty workbench. A fresh source checkout does not preload demo records or specialized plugins.")}</p></div>${image({ image: "workbench-empty", alt: ["只加载聊天的空工作台", "Empty workbench with only chat loaded"], caption: t("真实界面 · 默认只加载聊天与基础框架", "Actual interface · Chat and core framework by default") }, "../")}</section><section id="get-started" class="product-download product-section"><div><p class="eyebrow">04 / GET STARTED</p><h2>${t("从源码开始，<br>建立你的工作环境。", "Start with the source.<br>Build your environment.")}</h2><p>${t("前后端配套使用。当前提供源码，尚无独立安装包；模型服务需要自行配置。", "Use the frontend with its companion backend. Source is available; there is no standalone installer. Configure your own model service.")}</p><div class="download-facts"><span>0.7.0-chat.1</span><a href="https://github.com/David7583/baigong-workbench-frontend/blob/main/LICENSE">Apache-2.0 ↗</a><span>Windows x64</span></div></div><div class="download-links"><a href="https://github.com/David7583/baigong-workbench-frontend"><span><small>01 / FRONTEND</small><strong>${t("获取前端源码", "Get frontend source")}</strong></span><span>↗</span></a><a href="https://github.com/David7583/baigong/tree/workbench-backend"><span><small>02 / BACKEND</small><strong>${t("获取配套后端", "Get companion backend")}</strong></span><span>↗</span></a><a href="https://github.com/David7583/baigong-workbench-frontend#readme"><span><small>03 / DOCUMENTATION</small><strong>${t("安装与使用文档", "Installation & usage")}</strong></span><span>↗</span></a><p>${t("在 GitHub 使用 Code → Download ZIP，或按 README 克隆。后端请选择 workbench-backend 分支，而非 main。", "Use Code → Download ZIP on GitHub, or clone as described in the README. Choose the workbench-backend branch for the backend, not main.")}</p></div></section><nav class="next-project" aria-label="更多项目" data-label-zh="更多项目" data-label-en="More projects"><span class="eyebrow">${t("继续探索其他方向", "EXPLORE OTHER DIRECTIONS")}</span><a href="sc-tse.html">SC-TSE <span>↗</span></a></nav></div></main>` +
    footer("../")
  );
}
