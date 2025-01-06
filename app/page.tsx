import { Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAllArticles } from "@/lib/markdown"

export default function Home() {
  const articles = getAllArticles()
  const featuredArticles = articles.slice(0, 3)
  const latestArticles = articles.slice(3, 6)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            Sue For You
          </Link>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full bg-muted/50 border-0 pl-8"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
              <Image
                src="/avatar.png"
                alt="Profile"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-muted to-background dark:from-neutral-800 dark:to-neutral-950"
          style={{
            backgroundImage: "url('/banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 max-w-3xl">
            Hi, I'm Sue. I write about tech, design and life.
          </h1>
          <div className="w-full max-w-xl flex gap-2">
            <Input
              type="search"
              placeholder="Search for articles"
              className="bg-background/60 border-0"
            />
            <Button>Go</Button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-8">Latest</h2>
          <div className="space-y-6">
            {latestArticles.map((article) => (
              <ArticleListItem key={article.id} {...article} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

interface Article {
  id: string
  slug: string
  title: string
  readTime: number
  image: string
  date: string
  excerpt: string
}

function ArticleCard({ slug, title, readTime, image }: Article) {
  return (
    <Link href={`/articles/${slug}`} className="group rounded-lg overflow-hidden bg-card">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{readTime} min read</p>
        <Button variant="secondary" className="w-full">
          Read More
        </Button>
      </div>
    </Link>
  )
}

function ArticleListItem({ slug, title, readTime, date }: Article) {
  return (
    <Link 
      href={`/articles/${slug}`}
      className="flex items-center justify-between py-4 border-b border-border hover:bg-muted/50 px-4 -mx-4"
    >
      <div>
        <h3 className="font-medium">{title}</h3>
        <time className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
      <p className="text-sm text-muted-foreground">{readTime} min read</p>
    </Link>
  )
}

