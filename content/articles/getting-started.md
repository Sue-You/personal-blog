---
title: "开始使用个人博客"
date: "2024-01-06"
readTime: 5
image: "/content/images/getting-started.jpg"
excerpt: "了解如何使用这个个人博客系统,轻松管理和发布你的文章"
category: "教程"
tags:
  - "入门指南"
  - "博客"
  - "写作"
slug: "getting-started"
---

# 开始使用个人博客

欢迎使用这个个人博客系统! 这篇文章将指导你如何使用这个系统来管理和发布你的文章。

## 创建新文章

创建新文章非常简单,只需要在 `content/articles` 目录下创建一个新的 Markdown 文件即可。每个文章都需要包含以下部分:

### 1. 文章元数据

在文件开头使用 YAML frontmatter 格式添加文章的元数据:

```markdown
---
title: "文章标题"
date: "发布日期"
readTime: 预计阅读时间(分钟)
image: "封面图片路径"
excerpt: "文章摘要"
category: "分类名称"
tags:
  - "标签1"
  - "标签2"
slug: "url-friendly-name"  # 可选
---
```

### 2. 文章内容

文章内容使用 Markdown 格式编写,支持以下功能:

#### 2.1 文本格式化

- **粗体** 和 *斜体*
- ~~删除线~~
- `代码`

#### 2.2 列表

有序列表:
1. 第一项
2. 第二项
3. 第三项

无序列表:
- 项目一
- 项目二
- 项目三

#### 2.3 引用

> 这是一段引用文字
> 可以包含多行

#### 2.4 代码块

```javascript
// 代码示例
function hello() {
  console.log("Hello, World!");
}
```

#### 2.5 图片

你可以在文章中插入图片:

![示例图片](/content/images/example.jpg)

### 3. 图片管理

文章相关的图片应该放在 `content/images` 目录下,然后在文章中使用相对路径引用:

- 文章封面图片: `/content/images/your-image.jpg`
- 文章内容图片: 同样使用 `/content/images/your-image.jpg`

## 最佳实践

1. **文件命名**: 使用英文小写字母、数字和连字符,避免使用空格和特殊字符
2. **图片优化**: 上传图片前进行适当压缩,建议使用 JPG 或 WebP 格式
3. **内容组织**: 使用适当的标题层级组织文章内容
4. **标签管理**: 使用准确的标签,便于文章分类和检索

## 结语

现在你已经了解了如何使用这个博客系统。开始创作吧! 