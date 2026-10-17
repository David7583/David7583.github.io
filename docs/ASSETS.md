# 素材与内容依据 / Asset provenance

本次不使用获奖站点素材、外部字体、商业音乐、模型生成的人像或虚构运行界面。字体来自访问者操作系统，不分发字体文件。SVG 系统图和 `ry.` 字标由本次页面代码生成，图示明确标注为概念结构。

| 素材 | 来源与用途 | 边界 |
|---|---|---|
| `workbench-flow.webp`（含 800px 版本） | 当前项目已有视频工程中的真实 `result.png` 运行截图 | 使用三条虚构资料；五节点 completed；不包含真实家庭资料；不宣称通用 PDF/OCR 已完成 |
| `workbench-empty.webp`（含 800px 版本） | Workbench 前端仓库 `docs/images/01-empty-workbench.png` | 真实空环境；只默认加载聊天与基础框架 |
| `sc-tse-*.webp`、`engineering-spatial-kernel-prototype.webp` | 原作品集已提交的同名 PNG | 图注保留“更广泛研发”边界，不能推断公开 MVP 含有全部功能 |
| `yuantu-local-ai-workbench-prototype.webp` | 原作品集已提交的同名 PNG | 相关观察原型，不是 Yuantu 仓库正式 UI |
| `baigong-action-chat-prototype.webp` | 原作品集已提交的同名 PNG | 相关交互原型，不是 Baigong 发布包正式界面 |
| 原 `assets/images/*.png` 与 `images/` | 既有公开素材保留 | 作为原始来源，不新增授权或权属声明 |
| `docs/screenshots/*.webp` | 本次浏览器实际渲染的验收截图 | 原始截图只转码压缩，未合成或修改页面内容；包括未完成的中间迭代并有明确标注 |

图片转换只进行等比例缩小与 WebP 编码，没有改变软件内容。所有当前页面图像均有中英替代文本与范围说明。

## 内容核实

- 个人姓名、教育概述、上海、两封邮件和微信：沿用基线 `332bc529279bd37f76cff1b35eee234ebb71180e` 的 `resume.html`，没有新增个人身份信息。
- SC-TSE、Yuantu、Baigong：沿用原站已区分范围的项目说明，并链接各自公开仓库供继续核查。
- Workbench：本地前端源码、安装说明、发布范围与实际五节点运行证据；[前端](https://github.com/David7583/baigong-workbench-frontend)及[配套后端分支](https://github.com/David7583/baigong/tree/workbench-backend)。公开默认状态不等于展示流程已预加载。
- 原型/研究/开发状态为当前检查时的范围描述，不代表项目稳定性或普遍适用性承诺。
- 访问网页本身不调用模型服务。Workbench 的模型和工具运行可能使用远端服务；网站没有“所有数据绝不离开本机”的宣称。

## 2026-10-17 产品展示补充

- 新的五步骤图示、端口、连接、状态及架构层级由 `assets/workbench*` 原生 HTML/CSS/JS 生成，始终标注为交互式架构示意。样本 1988/2003/2020 为说明用途的虚构数据。
- 封面复用实际 `workbench-flow.webp`，没有创建伪软件截图；没有新增第三方图像、字体、音频或模型素材。
- `docs/screenshots/showcase/` 是本轮浏览器截图的 WebP 转码，包含两轮迭代和最终双语三尺寸页面。未修饰其中的界面内容。
- 现有 60 秒本地影片只用于忽略目录中的播放验收，未上传。配音发布许可仍未确认，公共 `content/workbench-media.json` 保持空来源。后续接入见 [MEDIA.md](MEDIA.md)。
- 新增架构文字检查了公开后端分支中的工作流、适配器目录、规范管理和图结构模块，并在页面提供源码链接。完整范围记录见 [工作报告](WORKBENCH_SHOWCASE_REPORT.md)。

### 开发依赖说明

运行网页没有第三方 JS 运行时依赖。开发依赖通过 `package-lock.json` 固定：Lighthouse 13.5.0（Apache-2.0）与 Prettier 3.9.10（MIT），只用于检查和格式化，其传递依赖保留 npm 包自己的许可证。未将 `node_modules`、浏览器二进制或大型视频提交入仓库。未给原仓库擅自增加或更换项目许可证。
