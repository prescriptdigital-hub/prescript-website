export interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  author: string
}

export const POSTS: Post[] = [
  {
    slug: "why-nigerian-smes-lose-money-without-automation",
    title: "Why Nigerian SMEs are losing money without automation",
    excerpt: "Most Nigerian business owners know their operations are inefficient. Few know exactly how much that inefficiency costs. We break down the hidden losses - and what automation actually fixes.",
    category: "Automation",
    date: "2025-03-18",
    readTime: "6 min read",
    author: "Prescript Team",
  },
  {
    slug: "ai-changed-customer-support-lagos-ecommerce",
    title: "How AI transformed customer support for a Lagos e-commerce brand",
    excerpt: "Kora Commerce was drowning in 400+ weekly support queries with a 2-person team. Here is exactly how we deployed an AI agent that now handles 83% of queries without human involvement.",
    category: "AI",
    date: "2025-03-05",
    readTime: "8 min read",
    author: "Prescript Team",
  },
  {
    slug: "truth-about-social-media-marketing-nigeria",
    title: "The truth about social media marketing in Nigeria",
    excerpt: "Running ads in Nigeria is not the same as running ads anywhere else. Currency volatility, audience behaviour, and platform nuances all play a role. Here is what actually works.",
    category: "Marketing",
    date: "2025-02-20",
    readTime: "5 min read",
    author: "Prescript Team",
  },
  {
    slug: "building-your-brand-in-africa",
    title: "Building a brand that travels: lessons from African founders",
    excerpt: "When Aso Luxe rebranded, they did not just get a new logo. They got a business asset that opened 14 new stockist relationships. Here is the strategic thinking behind building brands that unlock opportunities.",
    category: "Branding",
    date: "2025-02-08",
    readTime: "7 min read",
    author: "Prescript Team",
  },
  {
    slug: "from-spreadsheets-to-systems-flow-automation",
    title: "From spreadsheets to systems: automation for African businesses",
    excerpt: "Most African businesses are running million-naira operations on Excel and WhatsApp. That is not a criticism - it is a starting point. Here is a practical framework for moving from chaos to clarity.",
    category: "Automation",
    date: "2025-01-28",
    readTime: "9 min read",
    author: "Prescript Team",
  },
  {
    slug: "what-makes-a-good-tech-platform-africa",
    title: "What makes a good tech platform for African businesses",
    excerpt: "Building software for African markets requires different decisions than building for Silicon Valley. Connectivity constraints, payment infrastructure, and user behaviour all matter. Here is our practical framework.",
    category: "Technology",
    date: "2025-01-14",
    readTime: "6 min read",
    author: "Prescript Team",
  },
]

export const CATEGORIES = ["All", "Automation", "AI", "Marketing", "Branding", "Technology"]

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}
