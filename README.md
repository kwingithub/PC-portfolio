# KW · Windows XP Portfolio

一台可以开机的千禧年电脑，Y2K复古风格千禧年经济上升期简约风格，也可以是你的个人作品集。
后续修改可以自行添加文件、作品，可以修改名字、音乐等。也可以叫AI干。

纯 HTML、CSS、JavaScript；无需安装依赖或构建。网站没有内容编辑入口，个人资料与作品统一在 `dist/content.js` 中修改。

## 快速开始

安装 Node.js 后，在项目文件夹中打开终端，运行：

```sh
node scripts/serve.cjs
```

浏览器打开 <http://localhost:4173>。默认入场密码为 **2000**，点击密码旁的 `?` 可自动填入。按 `Ctrl+C` 停止服务器。

推荐使用本地服务器预览，支持音乐进度跳转。若端口已占用，macOS / Linux 可运行 `PORT=4174 node scripts/serve.cjs`，再打开对应端口。

## 功能

- XP 风格登录、开机加载、启动音与 CRT 显示器外观。
- 日夜模式：浅色 / 深色外壳；小、中、大字号。
- 简体中文、繁体中文、English；外观与语言偏好保存在浏览器中。
- 个人简介、研究作品、视听作品、简历、联系方式。
- 作品文件夹左侧菜单、右侧内容；可拖动、最小化、最大化窗口。
- iPod 风格音乐播放器，支持播放、暂停、切歌、音量、进度与循环。
- 适配手机与桌面，支持键盘操作和系统减少动态效果设置。

## 文件管理

```text
kw-portfolio-github/
├── README.md                  # 从这里开始
├── .gitignore                 # 排除本机文件、原始音频、旧平台配置
├── .github/workflows/pages.yml # 手动发布 GitHub Pages
├── docs/
│   ├── DEPLOYMENT.md           # 上传 GitHub、发布、后续更新
│   └── EDITING.md              # 个人资料、作品、简历、音乐编辑
├── THIRD_PARTY_NOTICES.md      # 素材来源与许可说明
├── scripts/
│   ├── serve.cjs              # 本地预览服务器
│   └── import-ncm.cjs         # 可选：本地音频导入工具
└── dist/                      # 完整网站；也是 Pages 发布目录
    ├── index.html             # 页面结构
    ├── content.js             # 日常编辑：个人资料和作品
    ├── i18n.js                # 界面三语字典
    ├── app.js                 # 交互逻辑
    ├── style.css              # 基础样式
    ├── xp.css                 # XP、日夜、字号、文件夹样式
    └── assets/
        ├── wallpaper.png
        ├── projects/          # 按作品建子目录，放封面与作品文件
        ├── resume/            # 放简历 PDF
        ├── audio/             # 放网页可播放的音乐与封面
        ├── xp/                # XP 风格图标及许可
        └── icons/             # SVG 图标及许可
```

`dist/` 是直接维护的网页源码，不是可删除的构建缓存。文件夹名称和资源路径区分大小写；新增文件建议使用英文小写与连字符。

## 修改我的内容

打开 [内容编辑指南](docs/EDITING.md)。常用入口：

| 要修改的内容 | 位置 |
| --- | --- |
| 姓名、简介、入场密码 | `dist/content.js` 顶部 |
| +852、+86 电话和邮箱 | `contacts` |
| 研究与视听作品 | `projects` 数组 |
| 简历、经历、技能 | `resumeUrl`、`experience`、`skills` |
| 播放器歌曲 | `music.tracks` 数组 |

目前作品是占位内容，联系方式留空，可自行替换。文本支持普通字符串或三语言对象；不会自动翻译后来添加的内容。

## 放到 GitHub 上

按 [GitHub 上传与发布指南](docs/DEPLOYMENT.md) 操作：

1. 创建空的 GitHub 仓库，推荐命名 `kw-portfolio`。
2. 把本项目完整目录提交到仓库，保留 `.github/` 隐藏文件夹。
3. 在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。
4. 到 **Actions → Deploy portfolio to GitHub Pages → Run workflow** 手动发布。

已附发布配置，只发布 `dist/`。上传代码不会自动发布；以后更新内容后，也需要手动运行工作流。不需要服务器、数据库或额外的部署密钥。

## 使用说明

- 入场密码仅用于互动，写在前端源码里，不能保护私密信息。发布后的网页资料和素材可被访问。
- 音乐在 iPod 内点击播放；开机音在成功登录后播放。若没有声音，请检查网页与设备静音状态。
- 双击窗口标题栏可放大；`Esc` 关闭当前窗口，`Alt+M` 最小化；播放器窗口获得焦点时，空格切换播放状态。
- 素材来源、现有音频与许可见 [第三方素材说明](THIRD_PARTY_NOTICES.md)。
