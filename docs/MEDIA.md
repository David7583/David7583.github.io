# Product film integration / 产品影片接入

The current public-safe build shows a real screenshot and **Film awaiting publication**. It does not show a fake play button or request an MP4. A 60-second local film exists, but the earlier media audit leaves its generated voice publication rights unresolved. Local playback testing does not clear those rights.

当前源码保留真实截图封面和“影片待发布”。已有本地成片的配音发布许可仍需确认；本地验证不构成发布授权。没有把成片或私人 QA 页面提交到仓库。

## Replace the film / 替换方式

After rights are confirmed and the owner approves publication:

1. Put the approved H.264/AAC MP4 on an approved HTTPS media host, or use a separately approved release asset. Do not create a formal Release just to fill this slot. The URL must return playable video, not an HTML preview page.
2. Edit `content/workbench-media.json`. `src` accepts a root-relative project asset path such as `media/product.mp4`, or an absolute HTTPS URL. Paths starting with `/`, `..`, HTTP and unreviewed media are rejected. Relative paths are resolved correctly from the product subpage.
3. Keep `durationSeconds: 60` and `type: "video/mp4"`. Set `rightsReviewed: true` **only after the review actually completes**. This flag is a publishing safeguard, not evidence of a license grant or a duration probe.
4. Add accurate WebVTT captions when available: `{ "src": "assets/captions/product.zh.vtt", "lang": "zh" }`, and the corresponding `en` track. Do not invent a transcript. Cross-origin tracks require CORS from the caption and media hosts; the generated video sets `crossorigin="anonymous"` when a track is remote.
5. Run `npm run build` and `npm test`. Preview both languages, play/pause, seek, change volume, enter/exit fullscreen, inspect captions and test failure recovery. Submit the configuration change for review on a feature branch.

先确认影片授权及所有者发布决定，再填写已托管的 HTTPS 直链；也支持项目内 `media/…` 路径用于本地验证。字幕支持中英文 WebVTT。不要填写不存在的下载地址，也不要把 `rightsReviewed` 当作自动生成的授权证明。公开源文件仍忽略 MP4；若日后采用其他资源交付方式，应单独审查部署步骤。

## Loading behavior / 加载行为

- Home links to the product film section; it embeds no video.
- The product page initially renders only the poster and a play button when a reviewed source is configured. `preload="none"` and `data-source` keep both video and caption `src` unset until user interaction.
- Native controls provide playback, seeking, volume and fullscreen. There is no autoplay, third-party iframe or player dependency.
- Playback errors expose a bilingual retry message. The architecture guide remains independent of video and of the Workbench backend.
- Browser restrictions, third-party host availability and mobile fullscreen behavior remain environment-dependent. Test the final hosted URL before approval.

## Encoding / 编码建议

For an already licensed source, a typical optimization command is:

```sh
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -r 30 -c:a aac -b:a 128k -movflags +faststart product.mp4
ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,r_frame_rate -of json product.mp4
```

Keep the intended 1920×1080, 30 fps, approximately 60-second result; inspect any source with different dimensions before changing it. The website does not require FFmpeg at runtime. HTTP byte ranges improve seeking; the local preview server supports HEAD, ranges and proper MP4/WebVTT/ES module MIME types.

## Local QA / 本地验收隔离

`media/qa/`, `.audit/` and all MP4/audio files are ignored by Git. During this task, a local-only fixture reused the shipped player module with the existing 60-second film. The public configuration remained empty. Test fixtures, videos and raw logs are not deployment artifacts.
