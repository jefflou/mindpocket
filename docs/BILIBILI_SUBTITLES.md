# Bilibili 字幕集成功能

## 功能概述

MindPocket 现已支持自动提取 B 站视频的字幕内容。当用户添加 B 站视频链接时，系统会自动：
- 获取视频的基本信息（标题、链接）
- 提取视频字幕（如果有）
- 将字幕内容附加到书签的 Markdown 内容中
- 支持字幕搜索和 AI 对话

## 使用方法

### 1. 配置 Bilibili 凭证

由于 B 站字幕 API 需要登录凭证，用户需要先配置自己的 Bilibili Cookie：

1. 打开应用设置对话框（点击用户头像 → 设置）
2. 选择"Bilibili"选项卡
3. 按照页面说明获取以下 Cookie 值：
   - `SESSDATA`
   - `bili_jct`
   - `buvid3`
4. 填入表单并点击"测试"验证
5. 验证成功后点击"保存"

### 2. 添加 B 站视频

配置凭证后，正常添加 B 站视频链接即可：
- 系统会自动检测是否为 B 站视频
- 如果用户已配置凭证，会自动尝试提取字幕
- 字幕内容会附加在视频信息后面

### 3. 字幕格式

字幕以 Markdown 格式存储：

\`\`\`markdown
## 视频字幕

[00:00] 第一句字幕
[00:02] 第二句字幕
...
\`\`\`

## 技术实现

### 数据库 Schema

新增 `bilibili_credentials` 表：
- `id`: 主键
- `user_id`: 用户 ID（外键）
- `sessdata`: 加密存储的 SESSDATA
- `bili_jct`: 加密存储的 bili_jct
- `buvid3`: 设备标识
- `created_at`: 创建时间
- `updated_at`: 更新时间

### API 端点

- `GET /api/bilibili-credentials`: 检查用户是否已配置凭证
- `POST /api/bilibili-credentials`: 保存/更新凭证
- `DELETE /api/bilibili-credentials`: 删除凭证
- `POST /api/bilibili-credentials/test`: 测试凭证有效性

### 核心文件

- `apps/web/db/schema/bilibili-credentials.ts`: 数据库 Schema
- `apps/web/db/queries/bilibili-credentials.ts`: 数据库查询层
- `apps/web/lib/ingest/platforms/bilibili.ts`: B 站平台处理器（字幕提取）
- `apps/web/lib/ingest/pipeline.ts`: 摄取管道（集成字幕功能）
- `apps/web/components/settings/settings-bilibili.tsx`: 设置组件
- `apps/web/components/settings/settings-dialog.tsx`: 设置对话框（集成 Bilibili 选项卡）
- `apps/web/app/api/bilibili-credentials/route.ts`: API 路由

## 安全性

- 所有敏感凭证（SESSDATA、bili_jct）使用 AES-256-GCM 加密存储
- 加密密钥来自环境变量 `BETTER_AUTH_SECRET`
- 凭证仅在服务端使用，不会暴露给客户端
- 用户删除账户时，凭证会自动级联删除

## 限制和注意事项

1. **Cookie 有效期**：Bilibili Cookie 有过期时间，需要定期更新
2. **无字幕视频**：如果视频没有字幕，系统会优雅降级，仅保存视频基本信息
3. **未配置凭证**：如果用户未配置凭证，系统会跳过字幕提取，不影响视频基本信息的摄取
4. **语言选择**：当前优先选择中文字幕，如果没有则使用第一个可用字幕

## 后续优化建议

1. 添加 Cookie 有效性检测和过期提醒
2. 支持用户选择偏好的字幕语言
3. 支持导出 SRT/VTT 格式字幕
4. 保留时间戳信息，支持跳转到特定时间点
5. 为已有的 B 站视频书签批量提取字幕
