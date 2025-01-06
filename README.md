# Personal Blog

这是一个使用 Next.js 和 TailwindCSS 构建的个人博客网站。

## 技术栈

- Next.js 13+
- React 18
- TypeScript
- TailwindCSS
- Markdown 支持
- 响应式设计

## 功能特点

- 📝 Markdown 文章支持
- 🎨 使用 TailwindCSS 的现代化设计
- 📱 完全响应式布局
- 🚀 静态页面生成 (SSG)
- 🔍 SEO 优化
- 📸 图片优化

## 开始使用

### 环境要求

- Node.js 16.8 或更高版本
- npm 或 yarn 或 pnpm

### 安装步骤

1. 克隆仓库
```bash
git clone [your-repository-url]
cd personal-blog
```

2. 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 运行开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 生产环境构建

```bash
npm run build
npm run start
# 或
yarn build
yarn start
# 或
pnpm build
pnpm start
```

## 文章编写

1. 在 `content/articles` 目录下创建新的 .md 文件
2. 添加文章的 frontmatter 信息
3. 编写文章内容

## 项目结构

```
personal-blog/
├── app/                # Next.js 13+ App Router
├── components/         # React 组件
├── content/           
│   ├── articles/      # Markdown 文章
│   └── images/        # 文章图片
├── lib/               # 工具函数
├── public/            # 静态资源
└── styles/            # 全局样式
```

## License

MIT 