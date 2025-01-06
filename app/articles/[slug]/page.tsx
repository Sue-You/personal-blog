import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getArticleData, getAllArticles } from '@/lib/markdown'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const article = await getArticleData(params.slug)
    return {
      title: article.title,
      description: article.excerpt,
    }
  } catch {
    return {
      title: 'Article Not Found',
    }
  }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug || article.id,
  }))
}

export default async function ArticlePage({ params }: Props) {
  try {
    const article = await getArticleData(params.slug)

    return (
      <article className="min-h-screen bg-background text-foreground">
        {/* 返回首页链接 */}
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
          >
            ← 返回首页
          </Link>
        </div>

        {/* Article Header */}
        <header className="relative h-[400px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-sm">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{article.readTime} 分钟阅读</span>
              {article.category && (
                <>
                  <span>•</span>
                  <Link 
                    href={`/categories/${article.category}`}
                    className="hover:underline"
                  >
                    {article.category}
                  </Link>
                </>
              )}
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-4">
                {article.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${tag}`}
                    className="px-2 py-1 text-xs bg-white/20 rounded-full hover:bg-white/30"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          </div>
        </div>
      </article>
    )
  } catch {
    notFound()
  }
} 