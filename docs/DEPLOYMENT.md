# 上传 GitHub 与发布 GitHub Pages

本指南使用 GitHub Actions 发布 `dist/`。配置文件已准备好；这里的命令与网页操作由你执行。上传代码与发布网站是两个步骤。

## 1. 使用整理后的目录

使用 `kw-portfolio-github` 文件夹，或解压同名 ZIP 后得到的文件夹作为后续工作目录。不要上传 ZIP 文件本身，也不要上传外层 `sites/` 文件夹。

这份目录已排除旧 `.git/` 历史、`.openai/` 平台配置、`.DS_Store` 与旧部署包；保留网站、脚本、文档、素材许可和 `.github/` 工作流。原来的 `still-online` 目录是迁移前保留副本，两份不会自动同步；开始使用 GitHub 后，请统一在新目录里编辑。

Finder 默认隐藏点开头的文件，按 `Command+Shift+.` 可以看到 `.github/` 和 `.gitignore`。通过下面的 Git 命令提交会自动包含这些文件。

## 2. 创建空仓库

在 GitHub 登录，点击右上角 **+ → New repository**：

- Repository name：建议 `kw-portfolio`。
- 使用 GitHub Free 时，选择 **Public** 可使用 Pages；私有仓库的 Pages 可用性取决于套餐。
- 不勾选自动添加 README、`.gitignore` 或 License，本地已经准备好文档。
- 点击 **Create repository**。

仓库网页会显示自己的 HTTPS 地址，例如 `https://github.com/YOUR_USERNAME/kw-portfolio.git`。[官方仓库导入说明](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

## 3. 上传本地文件

打开终端，输入 `cd `（末尾有空格），把 `kw-portfolio-github` 文件夹拖入终端，再按回车。确认目录里能看到 `README.md` 和 `dist/`。

以下命令只在这份新目录首次上传时运行。把 `YOUR_USERNAME` 换成自己的 GitHub 用户名；如果仓库名称不同，也要一起替换：

```sh
git init -b main
git add .
git status
git commit -m "Initial portfolio"
git remote add origin https://github.com/YOUR_USERNAME/kw-portfolio.git
git push -u origin main
```

执行 `git commit` 前可通过 `git status` 查看即将上传的文件。提交不会上传；`git push` 才会发送到 GitHub。

若提示缺少 Git 身份，在项目目录内设置后重试提交：

```sh
git config user.name "你的名字"
git config user.email "你的 GitHub 提交邮箱"
```

命令行需先完成 GitHub 身份验证；HTTPS 不接受账户登录密码作为 Git 密码。可按 [GitHub 官方认证指南](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line) 设置凭据。不要把凭据写进项目文件。

## 4. 开启 Pages 并手动发布

1. 打开仓库 **Settings → Pages**。
2. 在 **Build and deployment → Source** 选择 **GitHub Actions**，不需要再创建推荐的模板工作流。
3. 打开仓库 **Actions** 标签页，选择左侧 **Deploy portfolio to GitHub Pages**。
4. 点击 **Run workflow**，选择 `main`，再点击绿色 **Run workflow**。
5. 等待任务成功，打开此次运行里的部署链接，或回到 **Settings → Pages** 点击 **Visit site**。

工作流在默认分支上才会显示手动运行入口。若新仓库提示启用 Actions，请先启用。配置只发布 `dist/`，无需填写构建命令、安装依赖或手动添加部署密钥。请保留文件 `.github/workflows/pages.yml`。[GitHub Pages 发布来源说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[自定义工作流说明](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

普通项目仓库的网址通常为：

```text
https://YOUR_USERNAME.github.io/kw-portfolio/
```

如果希望网址没有仓库名，可把仓库命名为 `YOUR_USERNAME.github.io`；页面会在 `https://YOUR_USERNAME.github.io/`。本项目资源使用相对路径，两种方式都适用。[GitHub Pages 网址规则](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

## 5. 以后更新内容

在同一工作目录编辑 `dist/content.js` 和素材，本地预览确认后：

```sh
git add .
git status
git commit -m "Update portfolio content"
git push
```

然后再次到 **Actions → Deploy portfolio to GitHub Pages → Run workflow**，选择 `main` 发布最新内容。

目前仅设置了手动发布，推送本身不会改变网站。如果今后希望每次推送 `main` 自动发布，将工作流顶部的 `on` 改为：

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

保留下面的 `permissions`、`concurrency` 和 `jobs` 配置。以后以这个 GitHub 工作目录和仓库为准，不要再覆盖回迁移前的旧副本。

## 常见问题

| 现象 | 检查方法 |
| --- | --- |
| 只能看到仓库文件，看不到网站 | 上传代码后还需要开启 Pages 并运行工作流 |
| Actions 中没有 Run workflow | 确认 `.github/workflows/pages.yml` 已在默认分支 `main` 上，且 Actions 已启用 |
| Pages 设置或部署报错 | 确认 Source 为 GitHub Actions，仓库可用 Pages；打开失败步骤查看详情 |
| 网站 404 | 等待发布任务成功，使用 Settings → Pages 给出的完整地址，包含仓库名和末尾 `/` |
| 图标、图片或音乐 404 | 路径不要以 `/` 或 `dist/` 开头，确认文件已提交且大小写一致 |
| 仍显示旧内容 | 确认运行的是最新 `main`，等待成功后强制刷新浏览器 |
| 提示 origin already exists | 说明这不是全新的 Git 目录；先 `git remote -v` 核对地址，不要盲目覆盖 |
| 首次推送被拒绝 | 检查远程是否提前创建了 README 等内容；不要使用强制推送覆盖已有内容 |

入场密码不是访问控制。联系方式、简历与上传的素材都应是准备公开的内容。素材说明见 [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)。
