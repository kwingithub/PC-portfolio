# 内容编辑指南

所有资料在 `dist/content.js` 中编辑。修改后保存、刷新本地预览即可；线上更新另见 [发布指南](DEPLOYMENT.md)。网页不提供编辑入口。

## 个人资料与联系方式

保留文件开头的 `window.PORTFOLIO =` 和末尾的 `;`。修改已有字段，不要把下面的片段粘贴到文件末尾。

- `name`：显示姓名，目前为 `KW`。
- `password`：入场密码，目前为 `2000`，仅为互动效果。
- `introduction`、`location`：简介、所在地；不需要的文字保持 `""`。
- `contacts.hongKong`：填写完整的 `+852` 电话。
- `contacts.mainland`：填写完整的 `+86` 电话。
- `contacts.email`：填写邮箱地址，不加 `mailto:`。

联系方式留空时显示待补充。不要填入示例电话号码。

## 新增一件作品

1. 在 `dist/assets/projects/` 下新建作品文件夹，例如 `market-study/`。
2. 放入封面 `cover.jpg` 和报告 `report.pdf`。
3. 在 `projects` 数组里新增以下对象，或替换已有占位对象。

```js
{
  id: 'market-study',
  category: 'research',
  type: { 'zh-CN': '行业研究', 'zh-TW': '行業研究', en: 'Industry Research' },
  title: { 'zh-CN': '我的研究报告', 'zh-TW': '我的研究報告', en: 'My Research Report' },
  demo: false,
  summary: '用一两句话介绍研究问题与核心结论。',
  process: ['研究方法与资料来源', '分析过程与主要发现'],
  outcome: '我承担的工作与最终成果。',
  image: 'assets/projects/market-study/cover.jpg',
  url: 'assets/projects/market-study/report.pdf'
}
```

相邻作品对象之间使用逗号分隔。删除作品时，删除完整对象及多余逗号；没有作品时可保留 `projects: []`。

| 字段 | 作用 |
| --- | --- |
| `id` | 唯一标识，使用英文小写与连字符，不与其他作品重复 |
| `category` | `research` 放入研究文件夹；`visual` 放入视听文件夹 |
| `type` | 左侧菜单的分组名称；同一分组使用相同字符串或完全相同的三语对象 |
| `title` | 菜单和右侧内容的标题 |
| `demo` | 真实作品设置为 `false`，去除示例标识 |
| `summary` | 简介，普通文本 |
| `process` | 过程条目数组，不需要时填 `[]` |
| `outcome` | 个人贡献或成果，不需要时填 `''` |
| `image` | 一张封面图的相对路径，可省略或留空 |
| `url` | 完整作品文件或外部链接，会在新标签页打开 |

菜单顺序跟随数组顺序。进入文件夹后默认显示第一件作品，左侧菜单自动生成。现有占位数据中的 `subtitle`、`year` 为保留字段，当前详情界面不显示。

当前详情展示文字与一张封面；PDF、视频或完整作品通过 `url` 打开。长视频可填写已有视频托管页面的 `https://` 链接。

## 路径写法

所有网站资源路径都以 `dist/index.html` 所在目录为起点：

```js
image: 'assets/projects/market-study/cover.jpg' // 正确
url: 'https://example.com/my-project'          // 外部作品页
```

不要写 `dist/assets/...`、`/assets/...` 或自己电脑的 `/Users/...` 路径。开头的 `/` 会让 GitHub 项目网站跳过仓库子路径，导致资源找不到。文件名大小写必须完全一致。

建议按作品保存最终展示文件，设计源文件、草稿、原始音视频放在项目目录外。现有图标名和许可文件保持原样。

## 简历、经历与技能

把简历放到 `dist/assets/resume/kw-resume.pdf`，填写：

```js
resumeUrl: 'assets/resume/kw-resume.pdf',
experience: [
  { period: '2025–2026', title: '经历名称', description: '职责与成果' }
],
skills: ['研究分析', '视觉设计']
```

以上为填写格式，不代表真实经历。经历和技能可继续保留空数组。

## 三语言文字

每个支持文本的字段可填字符串，也可填：

```js
{ 'zh-CN': '个人简介', 'zh-TW': '個人簡介', en: 'About me' }
```

支持作品标题、分组、简介、过程的每一条、成果、经历、技能、歌曲名称与作者等。路径、`id`、`category` 和联系方式使用字符串。

优先显示当前语言；缺失时回退到简体，再回退英文。只写普通字符串会在三种语言中显示同一份内容。系统按钮翻译在 `dist/i18n.js`，日常更新作品无需修改它。

## 音乐

把 MP3 与可选封面放进 `dist/assets/audio/`，修改 `music.tracks`：

```js
music: {
  tracks: [
    {
      title: '歌曲名称',
      artist: '作者',
      src: 'assets/audio/my-track.mp3',
      cover: 'assets/audio/my-cover.jpg'
    }
  ]
}
```

没有封面时 `cover` 填 `''`。增加歌曲对象后，菜单与切歌按钮会自动更新。若暂时不放音乐，设 `music: { tracks: [] }`，并移走不准备公开的音频文件。

浏览器不能直接播放 `.ncm`。已有 `ditto.mp3` 可供本地预览；可选导入工具的用法是：

```sh
node scripts/import-ncm.cjs "/完整路径/歌曲.ncm" "/完整路径/临时输出文件夹"
```

导入后选择网页可播放的音频，改成简洁文件名再放入 `assets/audio/`，不要把原始 NCM 或导入元数据上传。公开使用音乐前请确认相应授权，详见 [素材说明](../THIRD_PARTY_NOTICES.md)。

## 保存后检查

- 运行 `node scripts/serve.cjs`，登录后打开修改过的文件夹与链接。
- 切换简、繁、英，以及大字号，确认文字与菜单显示正常。
- 修改后页面空白时，检查引号、逗号、括号；可运行 `node --check dist/content.js` 检查语法。
- 文件路径正确但线上没有更新时，确认已提交、推送，并再次手动发布。
