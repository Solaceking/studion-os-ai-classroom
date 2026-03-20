# Studion OS AI Classroom

Studion OS 的多智能体课堂生成引擎。

## 仓库定位

该仓库聚焦课堂核心引擎：

- 课程大纲 -> 场景生成流水线
- 多智能体课堂回放
- 幻灯片/测验/交互场景/PBL
- 导出 PPTX / HTML 资源包

当前分支已移除社区与 OpenClaw 相关内容，以减少产品负担。

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 10

### 安装

```bash
pnpm install
```

### 配置

```bash
cp .env.example .env.local
```

在 `.env.local` 中至少配置一个模型提供商 API Key。

### 启动

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)。

### 生产构建

```bash
pnpm build && pnpm start
```

## 与 Studion UI 对接的核心接口

- `POST /api/generate-classroom`
- `GET /api/generate-classroom/{jobId}`
- `GET /api/classroom?id={classroomId}`
- `GET /api/health`

详细方案见 `docs/STUDION-UI-INTEGRATION.md`。

## License

AGPL-3.0（继承上游许可）。
