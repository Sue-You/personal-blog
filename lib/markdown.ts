import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

// 更新目录路径
const contentDirectory = path.join(process.cwd(), 'content')
const articlesDirectory = path.join(contentDirectory, 'articles')
const imagesDirectory = path.join(contentDirectory, 'images')
const templatesDirectory = path.join(contentDirectory, 'templates')

export interface ArticleMetadata {
  id: string
  title: string
  date: string
  readTime: number
  image: string
  excerpt: string
  category?: string
  tags?: string[]
  wordCount?: number
  lastModified?: string
  slug: string
}

// 生成 URL 友好的 slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// 确保所需目录存在
function ensureDirectories() {
  [articlesDirectory, imagesDirectory, templatesDirectory].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

// 获取文章的字数统计和预计阅读时间
function getArticleStats(content: string) {
  const stats = readingTime(content)
  return {
    wordCount: stats.words,
    readTime: Math.ceil(stats.minutes),
  }
}

// 处理文章图片
function processArticleImages(content: string, slug: string): string {
  // 如果图片是相对路径，转换为绝对路径
  return content.replace(
    /!\[([^\]]*)\]\((?!http|https)([^)]+)\)/g,
    (match, alt, imagePath) => {
      if (imagePath.startsWith('./')) {
        imagePath = imagePath.slice(2)
      }
      if (!imagePath.startsWith('/')) {
        imagePath = `/content/images/${imagePath}`
      }
      return `![${alt}](${imagePath})`
    }
  )
}

export async function getArticleData(slug: string) {
  // 获取所有文章
  const articles = getAllArticles()
  
  // 查找匹配的文章
  const article = articles.find(a => a.slug === slug)
  if (!article) {
    throw new Error('Article not found')
  }

  // 读取文章内容
  const fullPath = path.join(articlesDirectory, `${article.id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // 使用 gray-matter 解析 markdown 文件的元数据部分
  const matterResult = matter(fileContents)
  
  // 获取文章统计信息
  const stats = getArticleStats(matterResult.content)
  
  // 处理文章中的图片路径
  const processedContent = processArticleImages(matterResult.content, slug)

  // 使用 remark 将 markdown 转换为 HTML 字符串
  const processedHtml = await remark()
    .use(html)
    .process(processedContent)
  const contentHtml = processedHtml.toString()

  // 获取文件的最后修改时间
  const fileStats = fs.statSync(fullPath)
  const lastModified = fileStats.mtime.toISOString()

  return {
    ...article,
    contentHtml,
    lastModified,
    ...stats,
  }
}

export function getAllArticles() {
  // 确保所需目录存在
  ensureDirectories()

  // 获取 articles 目录下的所有文件名
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // 移除文件名中的 ".md" 来获取 id
      const id = fileName.replace(/\.md$/, '')

      // 读取 markdown 文件内容
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // 使用 gray-matter 解析 markdown 文件的元数据部分
      const matterResult = matter(fileContents)
      
      // 获取文章统计信息
      const stats = getArticleStats(matterResult.content)
      
      // 获取文件的最后修改时间
      const fileStats = fs.statSync(fullPath)
      const lastModified = fileStats.mtime.toISOString()

      // 确保有 slug
      const slug = matterResult.data.slug || generateSlug(matterResult.data.title)

      return {
        id,
        lastModified,
        ...stats,
        ...matterResult.data,
        slug,
      } as ArticleMetadata
    })

  // 按日期排序
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// 获取文章模板
export function getArticleTemplate(): string {
  const templatePath = path.join(templatesDirectory, 'article.md')
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8')
  }
  return ''
}

// 创建新文章
export function createNewArticle(title: string): string {
  const template = getArticleTemplate()
  const slug = generateSlug(title)
  const filePath = path.join(articlesDirectory, `${slug}.md`)
  
  if (fs.existsSync(filePath)) {
    throw new Error('Article with this title already exists')
  }

  const date = new Date().toISOString().split('T')[0]
  const content = template
    .replace('title: "在这里写入文章标题"', `title: "${title}"`)
    .replace('date: "2024-01-06"', `date: "${date}"`)
    .replace('slug: ""', `slug: "${slug}"`)

  fs.writeFileSync(filePath, content)
  return slug
}

// 按分类获取文章
export function getArticlesByCategory(category: string) {
  const articles = getAllArticles()
  return articles.filter(article => article.category === category)
}

// 获取所有分类
export function getAllCategories() {
  const articles = getAllArticles()
  const categories = new Set(articles.map(article => article.category).filter(Boolean))
  return Array.from(categories)
}

// 获取所有标签
export function getAllTags() {
  const articles = getAllArticles()
  const tags = new Set(articles.flatMap(article => article.tags || []))
  return Array.from(tags)
}

// 按标签获取文章
export function getArticlesByTag(tag: string) {
  const articles = getAllArticles()
  return articles.filter(article => article.tags?.includes(tag))
}

// 搜索文章
export function searchArticles(query: string) {
  const articles = getAllArticles()
  const searchTerm = query.toLowerCase()
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.excerpt.toLowerCase().includes(searchTerm) ||
    article.category?.toLowerCase().includes(searchTerm) ||
    article.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  )
} 