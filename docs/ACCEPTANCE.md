# 验收记录 / Acceptance record

日期：2026-10-16。分支：`feature/portfolio-redesign`。基线：`332bc529279bd37f76cff1b35eee234ebb71180e`。

## 可运行交付

六个静态页面：首页、四个项目案例、项目简历。全站共享中英文切换；图片可放大并打开原图；简历有浏览器打印入口；原生折叠说明支持键盘。所有 HTML 与资源支持 GitHub Pages 直接发布，不依赖 SPA 路由回退、服务器 API 或模型服务。

本地运行：`npm run preview`，访问 `http://127.0.0.1:4173`。检查：`npm run build && npm test`。

## 功能验收

| 检查 | 结果与证据 |
|---|---|
| 页面与本地引用 | `npm test`：六页通过，111 个内部资源/链接/锚点引用通过 |
| 外部项目链接 | 8 个实际公开 GitHub URL 均 HTTP 200；[原始结果](evidence/external-links.json) |
| 响应式 | 六页 × 中英文 × 390/834/1440 三视口，共 36 次；无横向溢出，无已完成加载但损坏的可见图片；[记录](evidence/page-matrix.json) |
| 额外窄屏检查 | 首页 320px 英文检查通过；不代表所有设备实测 |
| 语言切换 | 点击与 Enter 切换均生效；HTML lang、可见内容、图片替代文本和导航标签同步 |
| 跨页与刷新 | 简历 → 首页、刷新后保持英文；URL 可显式选择语言；存储不可用有异常回退 |
| 图片 dialog | 打开真实图像、正确图注；Escape 关闭并返回原图片链接焦点；另提供新窗口原图入口 |
| 折叠说明 | 原生 summary 的 Enter 展开实际验证通过 |
| 跳过导航 | 锚点到 main，增加 `tabindex=-1` 使正文可接收焦点 |
| 焦点和动效 | 可见焦点实际截图检查；CSS 包含减少动效规则。未修改用户系统偏好；未声称完成辅助技术用户测试 |
| 控制台 | 本地浏览器最终检查无页面 error 日志 |
| 简历打印 | 按钮、处理器和打印样式存在；未自动生成或宣称审核过新增 PDF 简历 |
| 图像 | 正确原比例，800px/全尺寸 WebP 响应式；四幅首页截图实际滚动/聚焦后均成功加载 |
| 安全 | 没有新增凭据、数据库、真实家庭数据、音视频大文件；`.audit/`、密钥类型、数据库与媒体文件被忽略 |
| CI | 独立分支构建、生成一致性与测试；没有部署步骤，没有 Pages/contents 写权限 |

## Lighthouse 13.5.0

Windows 本地 Chrome Headless；手机使用 Lighthouse 默认配置，桌面使用官方 `desktop-config`。测试本地预览，**不是线上真实用户性能数据**。完整 HTML/JSON 报告在本机 `.audit/lighthouse/`；可提交的摘要见 [JSON](evidence/lighthouse-summary.json)。

| 页面 | 性能 | 无障碍 | 最佳实践 | SEO | FCP | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---|---|---|---|
| 首页中文 / mobile | 100 | 100 | 100 | 100 | 0.9s | 1.4s | 0 | 0ms |
| 首页英文 / desktop | 100 | 100 | 100 | 100 | 0.2s | 0.4s | 0 | 0ms |
| Workbench 英文 / mobile | 100 | 100 | 100 | 100 | 0.9s | 1.3s | 0 | 0ms |
| 简历中文 / mobile | 100 | 100 | 100 | 100 | 0.9s | 1.1s | 0 | 0ms |

初检发现语言按钮可见文本 `EN` 不包含在可访问名称中，已修复并复测。最初桌面运行只切换视口却沿用了手机节流，得分 84；最终使用 Lighthouse 官方完整桌面配置，不将配置差异伪称为性能优化收益。另完成响应式图片、正确尺寸和减少阻塞语言脚本请求等实际优化。

保留的建议包括 CSS 压缩、缓存、进一步图片优化与资源请求链。源码 CSS 为便于维护而格式化；GitHub Pages 的压缩、缓存与实际网络条件应在获准发布后重新测量。自动得分不代表全面 WCAG 认证。

## 截图与视觉迭代

- [原站首屏](screenshots/before.webp)
- [初稿桌面](screenshots/round1-desktop.webp) → [第一轮后平板](screenshots/round2-tablet.webp) → [第二轮后手机](screenshots/round3-mobile.webp)
- [最终桌面中文](screenshots/final-desktop-zh.webp) / [英文](screenshots/final-desktop-en.webp)
- [最终平板中文](screenshots/final-tablet-zh.webp) / [英文](screenshots/final-tablet-en.webp)
- [最终手机中文](screenshots/final-mobile-zh.webp) / [英文](screenshots/final-mobile-en.webp)
- [完整首页](screenshots/final-desktop-full.webp) / [Workbench 详情](screenshots/final-workbench.webp)

截图来自实际浏览器渲染，配置视口为 1440×1000、834×1112、390×844；截图可见内容宽度可能不包含滚动条。详细修改依据见 [设计记录](DESIGN.md)。

## 30 秒内容路径

1. 首屏阅读姓名、空间计算 / AI 治理方向及一句项目定位。
2. 从快速索引打开 Local AI Workbench；查看真实运行图和功能范围。
3. 点击 GitHub 获取源码，或回首页打开简历与联系入口。

这是设计的导航路径，尚未用真实招聘者进行计时用户研究；不声称已经证明所有访客的理解速度。

## 发布边界

检查前 Pages 来源为 `main /`。本次只推送功能分支和 Draft PR，不合并、不发布 Release、不修改 Pages 设置。最终 GitHub 状态和 CI 结果以 PR 检查为准。正式上线需要所有者批准。
